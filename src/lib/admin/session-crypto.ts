import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(secret: string, now = Date.now()) {
  const expiresAt = now + SESSION_MAX_AGE_MS;
  const payload = JSON.stringify({ exp: expiresAt });
  const signature = signPayload(payload, secret);
  return Buffer.from(JSON.stringify({ payload, signature })).toString("base64url");
}

export function verifySessionToken(value: string, secret: string, now = Date.now()) {
  try {
    const { payload, signature } = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
      payload: string;
      signature: string;
    };

    const expected = signPayload(payload, secret);
    const a = Buffer.from(signature, "hex");
    const b = Buffer.from(expected, "hex");

    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return false;
    }

    const { exp } = JSON.parse(payload) as { exp: number };
    return typeof exp === "number" && exp > now;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string, expected: string) {
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
