export function ok(res, payload, status = 200) {
  res.status(status).json({ ok: true, ...payload });
}

export function fail(res, error, status = 500) {
  const message = error && error.message ? error.message : String(error);
  res.status(status).json({ ok: false, error: message });
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString("utf8");
  return body.trim() ? JSON.parse(body) : {};
}

export function method(req, res, allowed) {
  if (allowed.includes(req.method)) return true;
  res.setHeader("Allow", allowed.join(", "));
  fail(res, new Error(`Method ${req.method} is not allowed.`), 405);
  return false;
}
