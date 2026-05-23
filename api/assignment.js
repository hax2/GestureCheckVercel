import { withTransaction } from "./_lib/db.js";
import { fail, method, ok } from "./_lib/http.js";
import { loadManifest } from "./_lib/manifest.js";
import { randomId, weightedSampleWithoutReplacement } from "./_lib/random.js";

const DEFAULT_ASSIGNMENT_SIZE = 20;
const DEFAULT_TARGET_QUOTA = 20;
const SUPPORTED_LANGUAGES = new Set(["en", "de", "it"]);

function positiveInteger(value, fallback, max = 100) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function assignmentWeight(completed, targetQuota) {
  if (completed < targetQuota) {
    const missing = targetQuota - completed;
    return (missing + 1) * (missing + 1);
  }

  // Once everything is at quota, continue collection while still preferring
  // items with fewer ratings.
  return 1 / (completed - targetQuota + 2);
}

export default async function handler(req, res) {
  if (!method(req, res, ["GET"])) return;

  try {
    const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
    const language = SUPPORTED_LANGUAGES.has(url.searchParams.get("lang"))
      ? url.searchParams.get("lang")
      : "en";
    const count = positiveInteger(url.searchParams.get("count"), DEFAULT_ASSIGNMENT_SIZE, 50);
    const targetQuota = positiveInteger(url.searchParams.get("target_quota"), DEFAULT_TARGET_QUOTA, 200);
    const participantId = url.searchParams.get("participant_id") || "";
    const sessionId = url.searchParams.get("session_id") || randomId("session");

    const manifest = await loadManifest();

    const result = await withTransaction(async (client) => {
      await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [`assignment:${language}`]);

      const countsResult = await client.query(
        `
          SELECT title, COUNT(*)::int AS completed_count
          FROM gesture_responses
          WHERE language = $1
          GROUP BY title
        `,
        [language],
      );
      const completedCounts = new Map(
        countsResult.rows.map((row) => [row.title, Number(row.completed_count) || 0]),
      );

      const weighted = manifest.map((item) => {
        const completed = completedCounts.get(item.title) || 0;
        return {
          ...item,
          completed_count: completed,
          target_quota: targetQuota,
          weight: assignmentWeight(completed, targetQuota),
        };
      });

      const selected = weightedSampleWithoutReplacement(weighted, count)
        .sort(() => Math.random() - 0.5)
        .map(({ weight, ...item }, orderIndex) => ({ ...item, order_index: orderIndex }));

      const assignmentId = randomId("assignment");
      await client.query(
        `
          INSERT INTO gesture_assignments (
            id,
            participant_id,
            session_id,
            language,
            requested_count,
            target_quota,
            assigned_titles,
            created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, NOW())
        `,
        [
          assignmentId,
          participantId,
          sessionId,
          language,
          count,
          targetQuota,
          JSON.stringify(selected.map((item) => item.title)),
        ],
      );

      return {
        assignment_id: assignmentId,
        session_id: sessionId,
        language,
        target_quota: targetQuota,
        total_videos: manifest.length,
        videos: selected,
      };
    });

    ok(res, result);
  } catch (error) {
    fail(res, error);
  }
}
