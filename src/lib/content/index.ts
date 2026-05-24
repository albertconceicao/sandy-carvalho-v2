import { fallbackContent } from "./fallback";
import { fetchSiteContentFromStrapi } from "./strapi";
import type { SiteContent } from "./types";

export type { SiteContent, Testimonial, FaqItem, ServiceItem } from "./types";
export { fallbackContent, fallbackTestimonials } from "./fallback";

export async function getSiteContent(): Promise<SiteContent> {
  const strapiContent = await fetchSiteContentFromStrapi();
  return strapiContent ?? fallbackContent;
}
