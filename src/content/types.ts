export type ContentImage = {
  src: string;
  alt: string;
};

export type ServiceItem = {
  title: string;
  subtitle?: string;
  description: string;
  buttonLabel: string;
  details?: {
    title: string;
    description: string;
    items: string[];
  };
};

export type FaqItem = {
  question: string;
  answer: string;
  listItems?: string[];
};

export type NavLink = {
  name: string;
  href: string;
};

export type Testimonial = {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
};

export type SiteContent = {
  global: {
    siteName: string;
    siteSubtitle: string;
    navLinks: NavLink[];
    instagram: string;
    email: string;
    contactTitle: string;
    contactSubtitle: string;
    footerWarning: string;
    footerCvv: string;
    footerEmergency: string;
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    image: ContentImage;
  };
  about: {
    title: string;
    paragraphs: string[];
    image: ContentImage;
  };
  approach: {
    title: string;
    paragraphs: string[];
    image: ContentImage;
  };
  modality: {
    title: string;
    description: string;
    requirementsTitle: string;
    requirements: string[];
    advantagesTitle: string;
    advantages: string[];
    image: ContentImage;
  };
  services: {
    title: string;
    description: string;
    items: ServiceItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    ctaLabel: string;
    items: FaqItem[];
  };
  testimonials: {
    title: string;
  };
};
