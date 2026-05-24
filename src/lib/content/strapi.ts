import type { ContentImage, FaqItem, NavLink, ServiceItem, SiteContent } from "./types";
import { fallbackContent } from "./fallback";

type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
};

type StrapiEntity<T> = {
  id?: number;
  documentId?: string;
  attributes?: T;
} & T;

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

function getStrapiMediaUrl(media?: StrapiMedia | StrapiEntity<StrapiMedia> | null): string | undefined {
  if (!media) return undefined;

  const data = "attributes" in media && media.attributes ? media.attributes : media;
  const url = "url" in data ? data.url : undefined;

  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  if (!STRAPI_URL) return url;

  return `${STRAPI_URL}${url}`;
}

function getMediaAlt(
  media?: StrapiMedia | StrapiEntity<StrapiMedia> | null,
  fallback = "",
): string {
  if (!media) return fallback;

  const data = "attributes" in media && media.attributes ? media.attributes : media;
  return ("alternativeText" in data && data.alternativeText) || fallback;
}

function toContentImage(
  media: StrapiMedia | StrapiEntity<StrapiMedia> | null | undefined,
  fallback: ContentImage,
): ContentImage {
  const src = getStrapiMediaUrl(media) ?? fallback.src;
  const alt = getMediaAlt(media, fallback.alt);

  return { src, alt };
}

function unwrap<T>(entry?: StrapiEntity<T> | null): T | undefined {
  if (!entry) return undefined;
  if (entry.attributes) return entry.attributes;
  return entry as T;
}

function unwrapList<T>(entries?: Array<StrapiEntity<T>> | null): T[] {
  if (!entries?.length) return [];
  return entries.map((entry) => unwrap(entry)).filter(Boolean) as T[];
}

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!STRAPI_URL) return null;

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}/api${path}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`[strapi] ${path} returned ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[strapi] failed to fetch ${path}`, error);
    return null;
  }
}

type GlobalAttributes = {
  siteName: string;
  siteSubtitle: string;
  navLinks?: Array<{ label: string; href: string }>;
  instagram: string;
  email: string;
  contactTitle: string;
  contactSubtitle: string;
  footerWarning: string;
  footerCvv: string;
  footerEmergency: string;
};

type SectionWithImage = {
  title: string;
  paragraphs?: Array<{ text: string }>;
  description?: string;
  image?: StrapiMedia | StrapiEntity<StrapiMedia>;
};

type ModalityAttributes = SectionWithImage & {
  requirementsTitle: string;
  requirements?: Array<{ text: string }>;
  advantagesTitle: string;
  advantages?: Array<{ text: string }>;
};

type ServicesSectionAttributes = {
  title: string;
  description: string;
};

type ServiceAttributes = {
  title: string;
  subtitle?: string;
  description: string;
  buttonLabel: string;
  order?: number;
  detailsTitle?: string;
  detailsDescription?: string;
  detailsItems?: Array<{ text: string }>;
};

type FaqAttributes = {
  eyebrow: string;
  title: string;
  ctaLabel: string;
};

type FaqItemAttributes = {
  question: string;
  answer: string;
  listItems?: Array<{ text: string }>;
  order?: number;
};

type TestimonialsSectionAttributes = {
  title: string;
};

function mapNavLinks(links?: Array<{ label: string; href: string }>, fallback: NavLink[] = []): NavLink[] {
  if (!links?.length) return fallback;

  return links.map((link) => ({
    name: link.label,
    href: link.href,
  }));
}

function mapParagraphs(paragraphs?: Array<{ text: string }>, fallback: string[] = []): string[] {
  if (!paragraphs?.length) return fallback;
  return paragraphs.map((item) => item.text);
}

function mapTextList(items?: Array<{ text: string }>, fallback: string[] = []): string[] {
  if (!items?.length) return fallback;
  return items.map((item) => item.text);
}

function mapServices(items: ServiceAttributes[] | undefined, fallback: ServiceItem[]): ServiceItem[] {
  if (!items?.length) return fallback;

  return items
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      title: item.title,
      subtitle: item.subtitle || undefined,
      description: item.description,
      buttonLabel: item.buttonLabel,
      details:
        item.detailsTitle && item.detailsItems?.length
          ? {
              title: item.detailsTitle,
              description: item.detailsDescription ?? "",
              items: mapTextList(item.detailsItems),
            }
          : undefined,
    }));
}

function mapFaqItems(items: FaqItemAttributes[] | undefined, fallback: FaqItem[]): FaqItem[] {
  if (!items?.length) return fallback;

  return items
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      question: item.question,
      answer: item.answer,
      listItems: item.listItems?.length ? mapTextList(item.listItems) : undefined,
    }));
}

export async function fetchSiteContentFromStrapi(): Promise<SiteContent | null> {
  if (!STRAPI_URL) return null;

  const [
    globalRes,
    heroRes,
    aboutRes,
    approachRes,
    modalityRes,
    servicesSectionRes,
    servicesRes,
    faqSectionRes,
    faqItemsRes,
    testimonialsSectionRes,
  ] = await Promise.all([
    strapiFetch<{ data: StrapiEntity<GlobalAttributes> }>("/global?populate=*"),
    strapiFetch<{ data: StrapiEntity<SectionWithImage & { subtitle?: string; primaryCta?: string; secondaryCta?: string }> }>(
      "/hero?populate=image",
    ),
    strapiFetch<{ data: StrapiEntity<SectionWithImage> }>("/about?populate[image]=*&populate[paragraphs]=*"),
    strapiFetch<{ data: StrapiEntity<SectionWithImage> }>("/approach?populate[image]=*&populate[paragraphs]=*"),
    strapiFetch<{ data: StrapiEntity<ModalityAttributes> }>(
      "/modality?populate[image]=*&populate[requirements]=*&populate[advantages]=*",
    ),
    strapiFetch<{ data: StrapiEntity<ServicesSectionAttributes> }>("/services-section"),
    strapiFetch<{ data: Array<StrapiEntity<ServiceAttributes>> }>(
      "/services?sort=order:asc&populate=*",
    ),
    strapiFetch<{ data: StrapiEntity<FaqAttributes> }>("/faq-section"),
    strapiFetch<{ data: Array<StrapiEntity<FaqItemAttributes>> }>("/faq-items?sort=order:asc&populate=listItems"),
    strapiFetch<{ data: StrapiEntity<TestimonialsSectionAttributes> }>("/testimonials-section"),
  ]);

  const global = unwrap(globalRes?.data);
  const hero = unwrap(heroRes?.data);
  const about = unwrap(aboutRes?.data);
  const approach = unwrap(approachRes?.data);
  const modality = unwrap(modalityRes?.data);
  const servicesSection = unwrap(servicesSectionRes?.data);
  const services = unwrapList(servicesRes?.data);
  const faqSection = unwrap(faqSectionRes?.data);
  const faqItems = unwrapList(faqItemsRes?.data);
  const testimonialsSection = unwrap(testimonialsSectionRes?.data);
  console.log({global})
  console.log({hero})

  if (!global || !hero) return null;

  return {
    global: {
      siteName: global.siteName ?? fallbackContent.global.siteName,
      siteSubtitle: global.siteSubtitle ?? fallbackContent.global.siteSubtitle,
      navLinks: mapNavLinks(global.navLinks, fallbackContent.global.navLinks),
      instagram: global.instagram ?? fallbackContent.global.instagram,
      email: global.email ?? fallbackContent.global.email,
      contactTitle: global.contactTitle ?? fallbackContent.global.contactTitle,
      contactSubtitle: global.contactSubtitle ?? fallbackContent.global.contactSubtitle,
      footerWarning: global.footerWarning ?? fallbackContent.global.footerWarning,
      footerCvv: global.footerCvv ?? fallbackContent.global.footerCvv,
      footerEmergency: global.footerEmergency ?? fallbackContent.global.footerEmergency,
    },
    hero: {
      title: hero.title ?? fallbackContent.hero.title,
      subtitle: hero.subtitle ?? fallbackContent.hero.subtitle,
      primaryCta: hero.primaryCta ?? fallbackContent.hero.primaryCta,
      secondaryCta: hero.secondaryCta ?? fallbackContent.hero.secondaryCta,
      image: toContentImage(hero.image, fallbackContent.hero.image),
    },
    about: {
      title: about?.title ?? fallbackContent.about.title,
      paragraphs: mapParagraphs(about?.paragraphs, fallbackContent.about.paragraphs),
      image: toContentImage(about?.image, fallbackContent.about.image),
    },
    approach: {
      title: approach?.title ?? fallbackContent.approach.title,
      paragraphs: mapParagraphs(approach?.paragraphs, fallbackContent.approach.paragraphs),
      image: toContentImage(approach?.image, fallbackContent.approach.image),
    },
    modality: {
      title: modality?.title ?? fallbackContent.modality.title,
      description: modality?.description ?? fallbackContent.modality.description,
      requirementsTitle: modality?.requirementsTitle ?? fallbackContent.modality.requirementsTitle,
      requirements: mapTextList(modality?.requirements, fallbackContent.modality.requirements),
      advantagesTitle: modality?.advantagesTitle ?? fallbackContent.modality.advantagesTitle,
      advantages: mapTextList(modality?.advantages, fallbackContent.modality.advantages),
      image: toContentImage(modality?.image, fallbackContent.modality.image),
    },
    services: {
      title: servicesSection?.title ?? fallbackContent.services.title,
      description: servicesSection?.description ?? fallbackContent.services.description,
      items: mapServices(services, fallbackContent.services.items),
    },
    faq: {
      eyebrow: faqSection?.eyebrow ?? fallbackContent.faq.eyebrow,
      title: faqSection?.title ?? fallbackContent.faq.title,
      ctaLabel: faqSection?.ctaLabel ?? fallbackContent.faq.ctaLabel,
      items: mapFaqItems(faqItems, fallbackContent.faq.items),
    },
    testimonials: {
      title: testimonialsSection?.title ?? fallbackContent.testimonials.title,
    },
  };
}
