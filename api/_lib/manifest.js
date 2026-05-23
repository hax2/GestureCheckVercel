import fs from "node:fs/promises";
import path from "node:path";

const MANIFEST_PATH = path.join(process.cwd(), "all_rating_videos.json");

let cachedManifest;

function slug(title) {
  return String(title || "")
    .replace(/\.[^.]+$/, "")
    .replace(/\.mov$/i, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export async function loadManifest() {
  if (!cachedManifest) {
    const json = await fs.readFile(MANIFEST_PATH, "utf8");
    cachedManifest = JSON.parse(json).map((item, index) => ({
      ...item,
      stimulus_id: item.stimulus_id || `${item.collection || "video"}::${item.title}`,
      video_url: item.video_url || item.video || item.github_pages_path || `assets/rating-videos/${slug(item.title)}.mp4`,
      manifest_index: index,
    }));
  }

  return cachedManifest;
}
