import { createHash } from "crypto";

export const RATE_LIMIT_MAX_REQUESTS = 3;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export type RateLimitDegradedReason =
  | "supabase_unconfigured"
  | "missing_ip"
  | "count_failed"
  | "insert_failed";

export type RateLimitResult =
  | { status: "allowed" }
  | { status: "blocked"; message: string }
  | { status: "degraded"; reason: RateLimitDegradedReason };

export const RATE_LIMIT_BLOCKED_MESSAGE =
  "Muitas tentativas. Tente novamente em cerca de uma hora.";

export function hashIp(ip: string, salt: string) {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getRateLimitSalt() {
  return process.env.RATE_LIMIT_SALT ?? process.env.ADMIN_SESSION_SECRET ?? "rate-limit";
}

/**
 * Pure policy: maps observed facts to allow, block, or fail-open (degraded).
 */
export function decideRateLimit(input: {
  supabaseConfigured: boolean;
  clientIp: string | null;
  recentCount: number | null;
  rateLimitRecordInserted: boolean;
  maxRequests?: number;
}): RateLimitResult {
  const maxRequests = input.maxRequests ?? RATE_LIMIT_MAX_REQUESTS;

  if (!input.supabaseConfigured) {
    return { status: "degraded", reason: "supabase_unconfigured" };
  }

  if (!input.clientIp) {
    return { status: "degraded", reason: "missing_ip" };
  }

  if (input.recentCount === null) {
    return { status: "degraded", reason: "count_failed" };
  }

  if (input.recentCount >= maxRequests) {
    return { status: "blocked", message: RATE_LIMIT_BLOCKED_MESSAGE };
  }

  if (!input.rateLimitRecordInserted) {
    return { status: "degraded", reason: "insert_failed" };
  }

  return { status: "allowed" };
}

export function logDegradedRateLimit(reason: RateLimitDegradedReason, detail?: string) {
  const suffix = detail ? `: ${detail}` : "";
  console.warn(`[rate-limit] degraded (${reason})${suffix}`);
}
