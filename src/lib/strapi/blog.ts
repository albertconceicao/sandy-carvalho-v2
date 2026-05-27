import { getStrapiMediaUrl, isStrapiConfigured, strapiFetch } from "./client";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover?: {
    src: string;
    alt: string;
  };
  publishedAt: string;
};

type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
};

type StrapiPostAttributes = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: unknown;
  publishedAt?: string;
  createdAt?: string;
  cover?:
    | StrapiMedia
    | { data?: { attributes?: StrapiMedia } | StrapiMedia | null }
    | null;
};

type StrapiEntity<T> = {
  id?: number;
  documentId?: string;
  attributes?: T;
} & T;

function unwrap<T>(entry?: StrapiEntity<T> | null): T | undefined {
  if (!entry) return undefined;
  if (entry.attributes) return entry.attributes;
  return entry as T;
}

function getCover(media: StrapiPostAttributes["cover"], title: string) {
  if (!media) return undefined;

  let data: StrapiMedia | undefined;

  if ("data" in media && media.data) {
    const nested = media.data;
    data =
      typeof nested === "object" && nested && "attributes" in nested
        ? unwrap(nested as StrapiEntity<StrapiMedia>)
        : unwrap(nested as StrapiEntity<StrapiMedia>);
  } else {
    data = unwrap(media as StrapiEntity<StrapiMedia>);
  }

  const src = getStrapiMediaUrl(data?.url);
  if (!src) return undefined;

  return {
    src,
    alt: data?.alternativeText || title,
  };
}

function normalizeContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && typeof block === "object" && "children" in block) {
          const children = (block as { children?: Array<{ text?: string }> }).children;
          return children?.map((child) => child.text ?? "").join("") ?? "";
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  }
  return "";
}

function mapPost(entry: StrapiEntity<StrapiPostAttributes>): BlogPost | null {
  const post = unwrap(entry);
  if (!post?.slug || !post.title) return null;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: normalizeContent(post.content),
    cover: getCover(post.cover, post.title),
    publishedAt: post.publishedAt ?? post.createdAt ?? new Date().toISOString(),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isStrapiConfigured()) return [];

  const response = await strapiFetch<{ data: Array<StrapiEntity<StrapiPostAttributes>> }>(
    "/posts?status=published&sort=publishedAt:desc&populate=cover",
  );

  if (!response?.data?.length) return [];

  return response.data.map(mapPost).filter((post): post is BlogPost => post !== null);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isStrapiConfigured()) return null;

  const response = await strapiFetch<{ data: Array<StrapiEntity<StrapiPostAttributes>> }>(
    `/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&status=published&populate=cover`,
  );

  const fromFilter = response?.data?.[0];
  if (fromFilter) {
    const mapped = mapPost(fromFilter);
    if (mapped) return mapped;
  }

  // Fallback: alguns ambientes Strapi 5 falham no filtro por slug via REST
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
