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

    const { ratingRows, countryRows, geoCountryRows, recruitmentRows } = await withClient(async (client) => {
      const ratingsResult = await client.query(
        `
          SELECT title, COUNT(*)::int AS completed_count
          FROM gesture_responses
          WHERE language = $1
          GROUP BY title
        `,
        [language],
      );
      const completedResult = await client.query(
        `
          WITH assignment_targets AS (
            SELECT
              assignment.*,
              (
                SELECT COUNT(DISTINCT COALESCE(
                  SUBSTRING(assigned_title FROM '^([0-9]+)_'),
                  assigned_title
                ))::int
                FROM jsonb_array_elements_text(assignment.assigned_titles) AS titles(assigned_title)
              ) AS expected_response_count
            FROM gesture_assignments AS assignment
            WHERE assignment.language = $1
          ),
          completed_assignments AS (
            SELECT
              assignment.id,
              COALESCE(NULLIF(participant.demographics->>'country_of_residence', ''), 'unknown') AS country_code,
              COALESCE(NULLIF(participant.demographics->>'geo_country', ''), 'unknown') AS geo_country_code,
              COALESCE(NULLIF(participant.demographics->>'recruitment_source', ''), 'unspecified') AS recruitment_source
            FROM assignment_targets AS assignment
            LEFT JOIN gesture_participants AS participant
              ON participant.session_id = assignment.session_id
            JOIN gesture_responses AS response
              ON response.assignment_id = assignment.id
            GROUP BY assignment.id, assignment.expected_response_count, participant.demographics
            HAVING COUNT(DISTINCT response.response_id) >= assignment.expected_response_count
          )
          SELECT 'country' AS grouping, country_code AS value, COUNT(*)::int AS completed_participants
          FROM completed_assignments
          GROUP BY country_code
          UNION ALL
          SELECT 'geo_country' AS grouping, geo_country_code AS value, COUNT(*)::int AS completed_participants
          FROM completed_assignments
          GROUP BY geo_country_code
          UNION ALL
          SELECT 'recruitment_source' AS grouping, recruitment_source AS value, COUNT(*)::int AS completed_participants
          FROM completed_assignments
          GROUP BY recruitment_source
          ORDER BY grouping, value
        `,
        [language],
      );
      const grouped = (name) => {
        const valueKey = name === "recruitment_source"
          ? "recruitment_source"
          : name === "geo_country"
            ? "geo_country_code"
            : "country_code";
        return completedResult.rows
          .filter((row) => row.grouping === name)
          .map((row) => ({
            [valueKey]: row.value,
            completed_participants: Number(row.completed_participants) || 0,
          }));
      };
      return {
        ratingRows: ratingsResult.rows,
        countryRows: grouped("country"),
        geoCountryRows: grouped("geo_country"),
        recruitmentRows: grouped("recruitment_source"),
      };
    });

    const counts = new Map(ratingRows.map((row) => [row.title, Number(row.completed_count) || 0]));
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
      completed_participants_by_country: countryRows,
      completed_participants_by_geo_country: geoCountryRows,
      completed_participants_by_recruitment_source: recruitmentRows,
    });
  } catch (error) {
    fail(res, error);
  }
}
