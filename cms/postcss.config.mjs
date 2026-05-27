/**
 * Strapi Cloud builds from cms/ but PostCSS walks up to the monorepo root
 * and would load ../postcss.config.mjs (Tailwind for Next.js).
 * This file stops that lookup and keeps the admin build self-contained.
 */
export default {
  plugins: {},
};
