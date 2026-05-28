import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/request-ip";
import {
  decideRateLimit,
  getRateLimitSalt,
  hashIp,
  logDegradedRateLimit,
  RATE_LIMIT_WINDOW_MS,
  type RateLimitResult,
} from "@/lib/rate-limit-policy";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export type RateLimitRoute = "contact" | "testimonials";

export type { RateLimitDegradedReason, RateLimitResult } from "@/lib/rate-limit-policy";

export function rateLimitToResponse(result: RateLimitResult): NextResponse | null {
  if (result.status === "blocked") {
    return NextResponse.json({ error: result.message }, { status: 429 });
  }
  return null;
}

export async function assessRateLimit(
  request: Request,
  route: RateLimitRoute,
): Promise<RateLimitResult> {
  const supabaseConfigured = isSupabaseConfigured();
  const clientIp = getClientIp(request);

  if (!supabaseConfigured) {
    logDegradedRateLimit("supabase_unconfigured");
    return decideRateLimit({
      supabaseConfigured: false,
      clientIp,
      recentCount: 0,
      rateLimitRecordInserted: true,
    });
  }

  if (!clientIp) {
    logDegradedRateLimit("missing_ip");
    return decideRateLimit({
      supabaseConfigured: true,
      clientIp: null,
      recentCount: 0,
      rateLimitRecordInserted: true,
    });
  }

  const ipHash = hashIp(clientIp, getRateLimitSalt());
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const supabase = createSupabaseAdmin();

  const { count, error: countError } = await supabase
    .from("rate_limit_events")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq("route", route)
    .gte("created_at", since);

  if (countError) {
    console.error("[rate-limit] count failed", countError.message);
    logDegradedRateLimit("count_failed", countError.message);
    return { status: "degraded", reason: "count_failed" };
  }

  const recentCount = count ?? 0;

  const blockedCheck = decideRateLimit({
    supabaseConfigured: true,
    clientIp,
    recentCount,
    rateLimitRecordInserted: true,
  });

  if (blockedCheck.status === "blocked") {
    return blockedCheck;
  }

  const { error: insertError } = await supabase.from("rate_limit_events").insert({
    ip_hash: ipHash,
    route,
  });

  const final = decideRateLimit({
    supabaseConfigured: true,
    clientIp,
    recentCount,
    rateLimitRecordInserted: !insertError,
  });

  if (final.status === "degraded" && final.reason === "insert_failed") {
    console.error("[rate-limit] insert failed", insertError?.message);
    logDegradedRateLimit("insert_failed", insertError?.message);
  }

  return final;
}

/** Returns a 429 response when blocked; otherwise null (allowed or degraded). */
export async function checkRateLimit(
  request: Request,
  route: RateLimitRoute,
): Promise<NextResponse | null> {
  const result = await assessRateLimit(request, route);
  return rateLimitToResponse(result);
}
