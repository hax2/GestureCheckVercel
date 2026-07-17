import { withTransaction } from "./_lib/db.js";
import { fail, method, ok, readJson } from "./_lib/http.js";
import { loadManifest } from "./_lib/manifest.js";
import { randomId } from "./_lib/random.js";
import {
  requiredString,
  validateLanguage,
  validateRatings,
  ValidationError,
} from "./_lib/validation.js";

function normalizeResponses(payload) {
  if (Array.isArray(payload.responses)) return payload.responses;
  if (payload.response) return [payload.response];
  if (payload.title && (payload.ratings || payload.skipped)) return [payload];
  return [];
}

function requestCountry(req) {
  const header = req.headers["x-vercel-ip-country"];
  const country = String(Array.isArray(header) ? header[0] : header || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : "";
}

function submittedAt(response) {
  const value = response.submitted_at || response.saved_at;
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export default async function handler(req, res) {
  if (!method(req, res, ["POST"])) return;

  try {
    const payload = await readJson(req);
    const participant = payload.participant || {};
    const responses = normalizeResponses(payload);
    if (!responses.length || responses.length > 50) {
      throw new ValidationError("Payload must contain between 1 and 50 responses.");
    }

    const assignmentId = requiredString(
      payload.assignment_id || participant.assignmentId || responses[0]?.assignment_id,
      "assignment_id",
      100,
    );
    const sessionId = requiredString(
      participant.sessionId || participant.session_id || responses[0]?.session_id,
      "session_id",
      100,
    );
    const language = validateLanguage(
      participant.language || payload.language || responses[0]?.language,
    );
    const manifest = await loadManifest();
    const manifestByTitle = new Map(manifest.map((item) => [item.title, item]));
    const geoCountry = requestCountry(req);
    const storedPayload = geoCountry
      ? { ...payload, server_metadata: { geo_country: geoCountry } }
      : payload;

    const result = await withTransaction(async (client) => {
      const assignmentResult = await client.query(
        `
          SELECT id, participant_id, session_id, language, assigned_titles
          FROM gesture_assignments
          WHERE id = $1
          FOR UPDATE
        `,
        [assignmentId],
      );
      const assignment = assignmentResult.rows[0];
      if (!assignment) throw new ValidationError("Unknown assignment.");
      if (assignment.session_id !== sessionId) {
        throw new ValidationError("Assignment does not belong to this session.");
      }
      if (assignment.language !== language) {
        throw new ValidationError("Response language does not match the assignment.");
      }

      const assignedTitles = Array.isArray(assignment.assigned_titles)
        ? assignment.assigned_titles
        : [];
      const assignedSet = new Set(assignedTitles);
      const seenTitles = new Set();
      let inserted = 0;
      let updated = 0;

      for (const response of responses) {
        const title = requiredString(response.title, "title", 300);
        if (!assignedSet.has(title)) {
          throw new ValidationError(`Video "${title}" is not part of this assignment.`);
        }
        if (seenTitles.has(title)) {
          throw new ValidationError(`Video "${title}" appears more than once.`);
        }
        seenTitles.add(title);

        const item = manifestByTitle.get(title);
        if (!item) throw new ValidationError(`Video "${title}" is not in the manifest.`);

        const skipped = response.skipped === true;
        if (skipped && response.skip_reason !== "video_error") {
          throw new ValidationError("Skipped videos require the video_error reason.");
        }
        const ratings = skipped ? {} : validateRatings(response.ratings);
        const participantId = String(assignment.participant_id || "").trim().slice(0, 200);
        const collection = item.collection || "";
        const existingResult = await client.query(
          `
            SELECT response_id
            FROM gesture_responses
            WHERE assignment_id = $1
              AND title = $2
            ORDER BY received_at DESC
            LIMIT 1
          `,
          [assignmentId, title],
        );
        const id = existingResult.rows[0]?.response_id || `${assignmentId}::${title}`;
        const notes = String(response.notes || "").trim().slice(0, 2000);
        const targetWord = item.target_words?.[language] || item.target_word || title;
        const videoUrl = item.video_url
          || item.video
          || item.github_pages_path
          || response.video_url
          || "";
        const orderIndex = assignedTitles.indexOf(title);
        const rawPayload = {
          ...storedPayload,
          response_status: skipped ? "skipped_video_error" : "completed",
        };

        const upsert = await client.query(
          `
            INSERT INTO gesture_responses (
              response_id,
              assignment_id,
              participant_id,
              session_id,
              language,
              collection,
              source,
              title,
              target_word,
              video_url,
              order_index,
              ratings,
              notes,
              submitted_at,
              raw_payload,
              received_at
            )
            VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
              $11, $12::jsonb, $13, $14::timestamptz, $15::jsonb, NOW()
            )
            ON CONFLICT (response_id) DO UPDATE SET
              assignment_id = EXCLUDED.assignment_id,
              participant_id = EXCLUDED.participant_id,
              session_id = EXCLUDED.session_id,
              language = EXCLUDED.language,
              collection = EXCLUDED.collection,
              source = EXCLUDED.source,
              title = EXCLUDED.title,
              target_word = EXCLUDED.target_word,
              video_url = EXCLUDED.video_url,
              order_index = EXCLUDED.order_index,
              ratings = EXCLUDED.ratings,
              notes = EXCLUDED.notes,
              submitted_at = EXCLUDED.submitted_at,
              raw_payload = EXCLUDED.raw_payload,
              received_at = NOW()
            RETURNING (xmax = 0) AS inserted
          `,
          [
            id,
            assignmentId,
            participantId,
            sessionId,
            language,
            collection,
            item.source || "",
            title,
            targetWord,
            videoUrl,
            orderIndex,
            JSON.stringify(ratings),
            notes,
            submittedAt(response),
            JSON.stringify(rawPayload),
          ],
        );

        if (upsert.rows[0]?.inserted) inserted += 1;
        else updated += 1;
      }

      return {
        inserted_rows: inserted,
        updated_rows: updated,
        submission_id: randomId("submission"),
      };
    });

    ok(res, result);
  } catch (error) {
    fail(res, error);
  }
}
