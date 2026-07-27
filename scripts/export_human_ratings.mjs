import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

const outputPath = process.argv[2] || "analysis/source/human_ratings.json";
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const ratingKeys = [
  "iconicity",
  "sensorimotor_imagery",
  "motional_salience_gesture",
  "emotional_salience_facial_expression",
  "gesture_complexity_fit",
  "cultural_familiarity",
  "enactment_potential",
];

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  await client.query("BEGIN READ ONLY");

  const responses = await client.query(`
    SELECT
      response_id,
      COALESCE(NULLIF(participant_id, ''), NULLIF(session_id, ''), NULLIF(assignment_id, ''), response_id) AS rater_key,
      language,
      collection,
      source,
      title,
      target_word,
      video_url,
      order_index,
      ratings,
      notes,
      submitted_at
    FROM gesture_responses
    WHERE ratings ?& ARRAY[${ratingKeys.map((key) => `'${key}'`).join(", ")}]
      ${ratingKeys.map((key) => `AND (ratings->>'${key}') ~ '^[1-5]$'`).join("\n      ")}
    ORDER BY submitted_at, response_id
  `);

  const participants = await client.query(`
    SELECT
      COALESCE(NULLIF(participant_id, ''), NULLIF(session_id, ''), session_id) AS rater_key,
      language,
      demographics,
      created_at,
      updated_at
    FROM gesture_participants
    ORDER BY created_at, session_id
  `);

  await client.query("ROLLBACK");

  const payload = {
    exported_at: new Date().toISOString(),
    rating_keys: ratingKeys,
    responses: responses.rows,
    participants: participants.rows,
  };
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload)}\n`, "utf8");
  console.log(
    JSON.stringify({
      output: outputPath,
      responses: responses.rowCount,
      participants: participants.rowCount,
    }),
  );
} catch (error) {
  try {
    await client.query("ROLLBACK");
  } catch {
    // Ignore rollback errors after a failed connection.
  }
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
