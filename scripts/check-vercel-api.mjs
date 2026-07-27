import fs from "node:fs";

const required = [
  "api/assignment.js",
  "api/participants.js",
  "api/responses.js",
  "api/setup.js",
  "api/status.js",
  "api/_lib/db.js",
  "api/_lib/http.js",
  "api/_lib/manifest.js",
  "db/schema.sql",
  "public/research-insights-7f3c9a/index.html",
  "public/research-insights-7f3c9a/styles.css",
  "public/research-insights-7f3c9a/app.js",
  "public/research-insights-7f3c9a/data.json",
  "public/research-insights-7f3c9a/gesture_ratings_all_data_and_analysis.xlsx",
  "vercel.json",
  "package.json",
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`Missing required files:\n${missing.join("\n")}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync("public/all_rating_videos.json", "utf8"));
if (!Array.isArray(manifest) || manifest.length === 0) {
  console.error("all_rating_videos.json must contain at least one video.");
  process.exit(1);
}

const analysis = JSON.parse(fs.readFileSync("public/research-insights-7f3c9a/data.json", "utf8"));
if (
  !Array.isArray(analysis.videos) ||
  analysis.videos.length !== manifest.length ||
  !Array.isArray(analysis.overall) ||
  analysis.overall.length !== 21
) {
  console.error("Research dashboard data is incomplete or does not match the manifest.");
  process.exit(1);
}
const analysisTitles = new Set(analysis.videos.map((video) => video.title));
const missingManifestVideos = manifest.filter((video) => !analysisTitles.has(video.title));
if (missingManifestVideos.length) {
  console.error(`Research dashboard is missing ${missingManifestVideos.length} manifest videos.`);
  process.exit(1);
}
const missingAnalysisVideos = analysis.videos.filter((video) => {
  const relativePath = String(video.video_url || "").replace(/^\/+/, "");
  return !relativePath || !fs.existsSync(`public/${relativePath}`);
});
if (missingAnalysisVideos.length) {
  console.error(`Research dashboard has ${missingAnalysisVideos.length} missing video assets.`);
  process.exit(1);
}
if (analysis.videos.some((video) => video.title === "87_Cooking.mp4")) {
  console.error("Verb control 87_Cooking.mp4 must not appear in the noun analysis.");
  process.exit(1);
}

const serializedAnalysis = JSON.stringify(analysis);
const prohibitedFields = ["participant_id", "session_id", "response_id", "rater_code"];
const leakedFields = prohibitedFields.filter((field) => serializedAnalysis.includes(`"${field}"`));
if (leakedFields.length) {
  console.error(`Research dashboard contains prohibited row-level fields: ${leakedFields.join(", ")}`);
  process.exit(1);
}

console.log(
  `Vercel scaffold OK. Manifest videos: ${manifest.length}. Analysis videos: ${analysis.videos.length}.`,
);
