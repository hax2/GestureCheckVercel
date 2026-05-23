import { withClient } from "./_lib/db.js";
import { fail, method, ok } from "./_lib/http.js";
import { loadManifest } from "./_lib/manifest.js";

export default async function handler(req, res) {
  if (!method(req, res, ["GET"])) return;

  try {
    const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
    const language = url.searchParams.get("lang") || "en";
    const targetQuota = Number.parseInt(url.searchParams.get("target_quota") || "20", 10);
    const manifest = await loadManifest();

    const rows = await withClient(async (client) => {
      const result = await client.query(
        `
          SELECT title, COUNT(*)::int AS completed_count
          FROM gesture_responses
          WHERE language = $1
          GROUP BY title
        `,
        [language],
      );
      return result.rows;
    });

    const counts = new Map(rows.map((row) => [row.title, Number(row.completed_count) || 0]));
    const status = manifest.map((item) => {
      const completed = counts.get(item.title) || 0;
      return {
        title: item.title,
        target_word: item.target_word || item.title,
        language,
        completed_count: completed,
        target_quota: targetQuota,
        remaining_to_quota: Math.max(targetQuota - completed, 0),
      };
    });

    ok(res, {
      language,
      target_quota: targetQuota,
      gestures: status,
      total_completed_ratings: status.reduce((sum, item) => sum + item.completed_count, 0),
      at_or_above_quota: status.filter((item) => item.completed_count >= targetQuota).length,
    });
  } catch (error) {
    fail(res, error);
  }
}
