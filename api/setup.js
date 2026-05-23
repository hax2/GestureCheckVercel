import { SCHEMA_SQL, withClient } from "./_lib/db.js";
import { fail, method, ok } from "./_lib/http.js";

export default async function handler(req, res) {
  if (!method(req, res, ["GET", "POST"])) return;

  try {
    const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
    if (url.searchParams.get("confirm") !== "create") {
      fail(res, new Error("Call /api/setup?confirm=create to create or verify database tables."), 400);
      return;
    }

    await withClient((client) => client.query(SCHEMA_SQL));
    ok(res, { message: "Database schema is ready." });
  } catch (error) {
    fail(res, error);
  }
}
