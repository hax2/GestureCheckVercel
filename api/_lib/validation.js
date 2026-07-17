export const SUPPORTED_LANGUAGES = new Set(["en", "de", "it", "ja"]);

export const RATING_KEYS = [
  "iconicity",
  "sensorimotor_imagery",
  "motional_salience_gesture",
  "emotional_salience_facial_expression",
  "gesture_complexity_fit",
  "cultural_familiarity",
  "enactment_potential",
];

export const COMPLETE_RATINGS_SQL = [
  `ratings ?& ARRAY[${RATING_KEYS.map((key) => `'${key}'`).join(", ")}]`,
  ...RATING_KEYS.map((key) => `(ratings->>'${key}') ~ '^[1-5]$'`),
].join(" AND ");

export function requiredString(value, field, maxLength = 300) {
  const normalized = String(value || "").trim();
  if (!normalized) throw new ValidationError(`${field} is required.`);
  if (normalized.length > maxLength) {
    throw new ValidationError(`${field} is too long.`);
  }
  return normalized;
}

export function validateLanguage(value) {
  const language = requiredString(value, "language", 10);
  if (!SUPPORTED_LANGUAGES.has(language)) {
    throw new ValidationError("Unsupported language.");
  }
  return language;
}

export function validateRatings(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("ratings must be an object.");
  }

  const ratings = {};
  for (const key of RATING_KEYS) {
    const score = Number(value[key]);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      throw new ValidationError(`ratings.${key} must be an integer from 1 to 5.`);
    }
    ratings[key] = score;
  }
  return ratings;
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}
