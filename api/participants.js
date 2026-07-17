import { withClient } from "./_lib/db.js";
import { fail, method, ok, readJson } from "./_lib/http.js";
import {
  requiredString,
  validateLanguage,
  ValidationError,
} from "./_lib/validation.js";

function normalizeCountry(value) {
  const country = String(value || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : "";
}

function requestCountry(req) {
  const header = req.headers["x-vercel-ip-country"];
  return normalizeCountry(Array.isArray(header) ? header[0] : header);
}

function normalizeRecruitmentSource(value) {
  return String(value || "")
    .trim()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .slice(0, 100);
}

export default async function handler(req, res) {
  if (!method(req, res, ["POST"])) return;

  try {
    const payload = await readJson(req);
    const participant = payload.participant || {};
    const sessionId = requiredString(
      participant.sessionId || participant.session_id,
      "sessionId",
      100,
    );
    const assignmentId = requiredString(
      participant.assignmentId || participant.assignment_id,
      "assignmentId",
      100,
    );
    const language = validateLanguage(participant.language || payload.language);

    const suppliedDemographics = participant.demographics || payload.demographics || {};
    if (
      !suppliedDemographics
      || typeof suppliedDemographics !== "object"
      || Array.isArray(suppliedDemographics)
    ) {
      throw new ValidationError("demographics must be an object.");
    }
    const demographics = { ...suppliedDemographics };
    delete demographics.geo_country;
    const geoCountry = requestCountry(req);
    if (geoCountry) demographics.geo_country = geoCountry;
    const recruitmentSource = normalizeRecruitmentSource(
      participant.recruitmentSource
        || participant.recruitment_source
        || demographics.recruitment_source,
    );
    if (recruitmentSource) demographics.recruitment_source = recruitmentSource;
    if (JSON.stringify(demographics).length > 20_000) {
      throw new ValidationError("Demographics payload is too large.");
    }

    const result = await withClient(async (client) => {
      const assignmentResult = await client.query(
        `
          SELECT session_id, language
          FROM gesture_assignments
          WHERE id = $1
        `,
        [assignmentId],
      );
      const assignment = assignmentResult.rows[0];
      if (!assignment) throw new ValidationError("Unknown assignment.");
      if (assignment.session_id !== sessionId) {
        throw new ValidationError("Assignment does not belong to this session.");
      }
      if (assignment.language !== language) {
        throw new ValidationError("Participant language does not match the assignment.");
      }

      await client.query(
        `
          INSERT INTO gesture_participants (
            session_id,
            participant_id,
            language,
            demographics,
            created_at,
            updated_at
          )
          VALUES ($1, $2, $3, $4::jsonb, NOW(), NOW())
          ON CONFLICT (session_id) DO UPDATE SET
            participant_id = EXCLUDED.participant_id,
            language = EXCLUDED.language,
            demographics = gesture_participants.demographics || EXCLUDED.demographics,
            updated_at = NOW()
        `,
        [
          sessionId,
          participant.participantId || participant.participant_id || "",
          language,
          JSON.stringify(demographics),
        ],
      );

      return { session_id: sessionId };
    });

    ok(res, result);
  } catch (error) {
    fail(res, error);
  }
}
