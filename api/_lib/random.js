import crypto from "node:crypto";

export function randomId(prefix = "") {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
}

const getPrefix = (title) => {
  const match = String(title || "").match(/^(\d+)_/);
  return match ? match[1] : title;
};

export function weightedSampleWithoutReplacement(items, count) {
  const pool = items.filter((item) => Number(item.weight) > 0);
  const selected = [];
  const selectedPrefixes = new Set();

  while (pool.length && selected.length < count) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let cursor = Math.random() * totalWeight;
    const index = pool.findIndex((item) => {
      cursor -= item.weight;
      return cursor <= 0;
    });

    if (index >= 0) {
      const item = pool.splice(index, 1)[0];
      const prefix = getPrefix(item.title);
      if (!selectedPrefixes.has(prefix)) {
        selected.push(item);
        selectedPrefixes.add(prefix);
      }
    } else {
      break;
    }
  }

  return selected;
}
