import { cookies } from "next/headers";
import {
  createSessionToken,
  SESSION_MAX_AGE_MS,
  verifyAdminPassword as verifyPassword,
  verifySessionToken,
} from "@/lib/admin/session-crypto";

const SESSION_COOKIE = "admin_session";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSessionSecret());
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value || !verifySessionToken(value, getSessionSecret())) {
    return null;
  }
  return { authenticated: true as const };
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function verifyAdminPassword(password: string) {
  return verifyPassword(password, process.env.ADMIN_PASSWORD ?? "");
}
