import fs from "node:fs";
import path from "node:path";

const videoDir = "public/assets/rating-video";
const manifestPath = "public/all_rating_videos.json";

if (!fs.existsSync(videoDir)) {
  console.error(`Directory ${videoDir} does not exist.`);
  process.exit(1);
}

const files = fs.readdirSync(videoDir).filter((f) => f.endsWith(".mp4"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// We want to avoid adding duplicates if the script is run multiple times
const existingTitles = new Set(manifest.map((item) => item.title));

const newItems = [];
for (const file of files) {
  if (existingTitles.has(file)) {
    console.log(`Skipping already existing video: ${file}`);
    continue;
  }

  // Parse filename format, e.g., "72_Ball.mp4"
  const match = file.match(/^\d+_(.+)\.mp4$/);
  if (!match) {
    console.warn(`File ${file} does not match expected format.`);
    continue;
  }

  const targetWord = match[1]; // e.g. "Ball"
  const item = {
    collection: "gesture",
    source: "rating-video",
    title: file,
    target_word: targetWord,
    video_url: `assets/rating-video/${file}`,
    local_path: `public/assets/rating-video/${file}`,
    target_words: {} // Will be populated by translation script
  };

  newItems.push(item);
  console.log(`Adding new control video: ${file} (Target: ${targetWord})`);
}

if (newItems.length > 0) {
  const updatedManifest = [...manifest, ...newItems];
  fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2) + "\n");
  console.log(`Successfully added ${newItems.length} videos to manifest.`);
} else {
  console.log("No new videos to add.");
}
