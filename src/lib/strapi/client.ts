const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function isStrapiConfigured() {
  return Boolean(STRAPI_URL);
}

function isConnectionRefused(error: unknown) {
  if (!(error instanceof Error)) return false;
  const cause = error.cause as { code?: string } | undefined;
  return cause?.code === "ECONNREFUSED" || error.message.includes("ECONNREFUSED");
}

export async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!STRAPI_URL) return null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers ?? {}),
  };

  if (STRAPI_TOKEN) {
    (headers as Record<string, string>).Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api${path}`, {
      ...init,
      headers,
      signal: AbortSignal.timeout(4_000),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[strapi] ${path} → HTTP ${response.status}`);
      }
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      if (isConnectionRefused(error)) {
        console.warn(
          "[strapi] CMS offline. Rode `cd cms && npm run develop` ou remova STRAPI_URL do .env.local.",
        );
      } else {
        console.warn(`[strapi] ${path}:`, error instanceof Error ? error.message : error);
      }
    }
    return null;
  }
}

export function getStrapiMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  if (!STRAPI_URL) return url;
  return `${STRAPI_URL}${url}`;
}
