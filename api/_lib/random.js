import crypto from "node:crypto";

export function randomId(prefix = "") {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
}

export function weightedSampleWithoutReplacement(items, count) {
  const pool = items.filter((item) => Number(item.weight) > 0);
  const selected = [];

  while (pool.length && selected.length < count) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let cursor = Math.random() * totalWeight;
    const index = pool.findIndex((item) => {
      cursor -= item.weight;
      return cursor <= 0;
    });
    selected.push(...pool.splice(index < 0 ? pool.length - 1 : index, 1));
  }

  return selected;
}
