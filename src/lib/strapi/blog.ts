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
  content: string;
  publishedAt?: string;
  cover?: StrapiMedia | { data?: { attributes?: StrapiMedia } | null };
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

  const data =
    "data" in media && media.data
      ? unwrap(media.data as StrapiEntity<StrapiMedia>)
      : unwrap(media as StrapiEntity<StrapiMedia>);

  const src = getStrapiMediaUrl(data?.url);
  if (!src) return undefined;

  return {
    src,
    alt: data?.alternativeText || title,
  };
}

function mapPost(entry: StrapiEntity<StrapiPostAttributes>): BlogPost | null {
  const post = unwrap(entry);
  if (!post?.slug || !post.title) return null;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    cover: getCover(post.cover, post.title),
    publishedAt: post.publishedAt ?? new Date().toISOString(),
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

  const post = response?.data?.[0];
  if (!post) return null;

  return mapPost(post);
}
