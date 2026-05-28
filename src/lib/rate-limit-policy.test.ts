import { describe, expect, it } from "vitest";
import {
  decideRateLimit,
  hashIp,
  RATE_LIMIT_BLOCKED_MESSAGE,
  RATE_LIMIT_MAX_REQUESTS,
} from "@/lib/rate-limit-policy";

describe("decideRateLimit", () => {
  it("degrades when Supabase is not configured", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: false,
        clientIp: "1.2.3.4",
        recentCount: 0,
        rateLimitRecordInserted: true,
      }),
    ).toEqual({ status: "degraded", reason: "supabase_unconfigured" });
  });

  it("degrades when client IP is missing", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: true,
        clientIp: null,
        recentCount: 0,
        rateLimitRecordInserted: true,
      }),
    ).toEqual({ status: "degraded", reason: "missing_ip" });
  });

  it("degrades when count query fails", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: true,
        clientIp: "1.2.3.4",
        recentCount: null,
        rateLimitRecordInserted: true,
      }),
    ).toEqual({ status: "degraded", reason: "count_failed" });
  });

  it("blocks at the request limit", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: true,
        clientIp: "1.2.3.4",
        recentCount: RATE_LIMIT_MAX_REQUESTS,
        rateLimitRecordInserted: true,
      }),
    ).toEqual({ status: "blocked", message: RATE_LIMIT_BLOCKED_MESSAGE });
  });

  it("degrades when rate-limit event insert fails", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: true,
        clientIp: "1.2.3.4",
        recentCount: 0,
        rateLimitRecordInserted: false,
      }),
    ).toEqual({ status: "degraded", reason: "insert_failed" });
  });

  it("allows under the limit with a recorded event", () => {
    expect(
      decideRateLimit({
        supabaseConfigured: true,
        clientIp: "1.2.3.4",
        recentCount: RATE_LIMIT_MAX_REQUESTS - 1,
        rateLimitRecordInserted: true,
      }),
    ).toEqual({ status: "allowed" });
  });
});

describe("hashIp", () => {
  it("is deterministic for the same ip and salt", () => {
    expect(hashIp("203.0.113.1", "test-salt")).toBe(hashIp("203.0.113.1", "test-salt"));
  });

  it("changes when salt changes", () => {
    expect(hashIp("203.0.113.1", "a")).not.toBe(hashIp("203.0.113.1", "b"));
  });
});
