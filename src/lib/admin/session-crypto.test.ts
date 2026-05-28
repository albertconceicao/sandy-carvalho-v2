import { describe, expect, it } from "vitest";
import {
  createSessionToken,
  SESSION_MAX_AGE_MS,
  verifyAdminPassword,
  verifySessionToken,
} from "@/lib/admin/session-crypto";

const SECRET = "test-session-secret";

describe("session token", () => {
  it("creates a token that verifies before expiry", () => {
    const now = 1_700_000_000_000;
    const token = createSessionToken(SECRET, now);
    expect(verifySessionToken(token, SECRET, now)).toBe(true);
    expect(verifySessionToken(token, SECRET, now + SESSION_MAX_AGE_MS - 1)).toBe(true);
  });

  it("rejects expired tokens", () => {
    const now = 1_700_000_000_000;
    const token = createSessionToken(SECRET, now);
    expect(verifySessionToken(token, SECRET, now + SESSION_MAX_AGE_MS + 1)).toBe(false);
  });

  it("rejects tampered tokens", () => {
    const token = createSessionToken(SECRET);
    expect(verifySessionToken(`${token}x`, SECRET)).toBe(false);
    expect(verifySessionToken(token, "wrong-secret")).toBe(false);
  });
});

describe("verifyAdminPassword", () => {
  it("accepts matching passwords", () => {
    expect(verifyAdminPassword("sandy-admin", "sandy-admin")).toBe(true);
  });

  it("rejects wrong passwords and length mismatches", () => {
    expect(verifyAdminPassword("wrong", "sandy-admin")).toBe(false);
    expect(verifyAdminPassword("short", "much-longer-password")).toBe(false);
    expect(verifyAdminPassword("any", "")).toBe(false);
  });
});
