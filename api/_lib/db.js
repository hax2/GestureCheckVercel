import pg from "pg";

const { Pool } = pg;

let pool;
let schemaReady;

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS gesture_assignments (
  id text PRIMARY KEY,
  participant_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  language text NOT NULL,
  requested_count integer NOT NULL,
  target_quota integer NOT NULL DEFAULT 20,
  assigned_titles jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gesture_assignments_language_created_idx
  ON gesture_assignments (language, created_at DESC);

CREATE TABLE IF NOT EXISTS gesture_responses (
  response_id text PRIMARY KEY,
  assignment_id text NOT NULL DEFAULT '',
  participant_id text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT '',
  language text NOT NULL,
  collection text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  title text NOT NULL,
  target_word text NOT NULL DEFAULT '',
  video_url text NOT NULL DEFAULT '',
  order_index integer,
  ratings jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text NOT NULL DEFAULT '',
  submitted_at timestamptz NOT NULL,
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gesture_responses_language_title_idx
  ON gesture_responses (language, title);

CREATE INDEX IF NOT EXISTS gesture_responses_assignment_idx
  ON gesture_responses (assignment_id);

CREATE TABLE IF NOT EXISTS gesture_participants (
  session_id text PRIMARY KEY,
  participant_id text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT '',
  demographics jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
`;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false },
      max: 3,
    });
  }

  return pool;
}

export async function withClient(callback) {
  const client = await getPool().connect();
  try {
    await ensureSchema(client);
    return await callback(client);
  } finally {
    client.release();
  }
}

export async function withTransaction(callback) {
  return withClient(async (client) => {
    await client.query("BEGIN");
    try {
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  });
}

async function ensureSchema(client) {
  if (!schemaReady) {
    schemaReady = client.query(SCHEMA_SQL);
  }
  await schemaReady;
}
