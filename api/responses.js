import { withClient } from "./_lib/db.js";
import { fail, method, ok, readJson } from "./_lib/http.js";
import { randomId } from "./_lib/random.js";

function normalizeResponses(payload) {
  if (Array.isArray(payload.responses)) return payload.responses;
  if (payload.response) return [payload.response];
  if (payload.title && payload.ratings) return [payload];
  return [];
}

function responseId(response, participant) {
  return response.response_id || [
    response.participant_id || participant.participantId || "anonymous",
    response.session_id || participant.sessionId || "session",
    response.collection || "video",
    response.title || "untitled",
  ].join("::");
}

export default async function handler(req, res) {
  if (!method(req, res, ["POST"])) return;

  try {
    const payload = await readJson(req);
    const participant = payload.participant || {};
    const responses = normalizeResponses(payload);

    if (!responses.length) {
      fail(res, new Error("Payload contains no responses."), 400);
      return;
    }

    const result = await withClient(async (client) => {
      let inserted = 0;
      let updated = 0;

      for (const response of responses) {
        const id = responseId(response, participant);
        const values = [
          id,
          response.assignment_id || payload.assignment_id || participant.assignmentId || "",
          response.participant_id || participant.participantId || "",
          response.session_id || participant.sessionId || "",
          response.language || participant.language || payload.language || "",
          response.collection || "",
          response.source || "",
          response.title || "",
          response.target_word || "",
          response.video_url || "",
          Number.isFinite(Number(response.order_index)) ? Number(response.order_index) : null,
          JSON.stringify(response.ratings || {}),
          response.notes || "",
          response.submitted_at || response.saved_at || new Date().toISOString(),
          JSON.stringify(payload),
        ];

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
          values,
        );

        if (upsert.rows[0] && upsert.rows[0].inserted) inserted += 1;
        else updated += 1;
      }

      return { inserted_rows: inserted, updated_rows: updated, submission_id: randomId("submission") };
    });

    ok(res, result);
  } catch (error) {
    fail(res, error);
  }
}
