import { withClient } from "./_lib/db.js";
import { fail, method, ok, readJson } from "./_lib/http.js";

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
    const sessionId = participant.sessionId || participant.session_id || "";

    if (!sessionId) {
      fail(res, new Error("sessionId is required."), 400);
      return;
    }

    const demographics = {
      ...(participant.demographics || payload.demographics || {}),
    };
    delete demographics.geo_country;
    const geoCountry = requestCountry(req);
    if (geoCountry) demographics.geo_country = geoCountry;
    const recruitmentSource = normalizeRecruitmentSource(
      participant.recruitmentSource
        || participant.recruitment_source
        || demographics.recruitment_source,
    );
    if (recruitmentSource) demographics.recruitment_source = recruitmentSource;

    const result = await withClient(async (client) => {
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
          participant.language || payload.language || "",
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
