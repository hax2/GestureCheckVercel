import fs from "node:fs";

const required = [
  "api/assignment.js",
  "api/participants.js",
  "api/responses.js",
  "api/status.js",
  "api/_lib/db.js",
  "api/_lib/http.js",
  "api/_lib/manifest.js",
  "db/schema.sql",
  "vercel.json",
  "package.json",
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`Missing required files:\n${missing.join("\n")}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync("all_rating_videos.json", "utf8"));
if (!Array.isArray(manifest) || manifest.length === 0) {
  console.error("all_rating_videos.json must contain at least one video.");
  process.exit(1);
}

console.log(`Vercel API scaffold OK. Manifest videos: ${manifest.length}`);
