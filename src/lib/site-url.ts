export function getSiteUrl() {
  const raw =
    process.env.SITE_URL ?? process.env.URL ?? process.env.DEPLOY_PRIME_URL ?? "";
  const trimmed = raw.replace(/\/$/, "");
  if (trimmed) return trimmed;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "";
}

export function adminUrl(path: string) {
  const base = getSiteUrl();
  if (!base) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
