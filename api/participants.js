import { withClient } from "./_lib/db.js";
import { fail, method, ok, readJson } from "./_lib/http.js";

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
            demographics = EXCLUDED.demographics,
            updated_at = NOW()
        `,
        [
          sessionId,
          participant.participantId || participant.participant_id || "",
          participant.language || payload.language || "",
          JSON.stringify(participant.demographics || payload.demographics || {}),
        ],
      );

      return { session_id: sessionId };
    });

    ok(res, result);
  } catch (error) {
    fail(res, error);
  }
}
