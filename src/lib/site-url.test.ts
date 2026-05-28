import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { adminUrl, getSiteUrl } from "@/lib/site-url";

const ENV_KEYS = ["SITE_URL", "URL", "DEPLOY_PRIME_URL", "NODE_ENV"] as const;

describe("getSiteUrl", () => {
  const previous: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      previous[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });

  it("returns empty string in production when no site URL env is set", () => {
    process.env.NODE_ENV = "production";
    expect(getSiteUrl()).toBe("");
  });

  it("returns localhost in development when no site URL env is set", () => {
    process.env.NODE_ENV = "development";
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("strips trailing slash from SITE_URL", () => {
    process.env.NODE_ENV = "production";
    process.env.SITE_URL = "https://example.com/";
    expect(getSiteUrl()).toBe("https://example.com");
  });
});

describe("adminUrl", () => {
  const previous: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      previous[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  });

  it("returns empty string when base URL is unknown", () => {
    process.env.NODE_ENV = "production";
    expect(adminUrl("/admin/contacts")).toBe("");
  });

  it("returns absolute URL when SITE_URL is set", () => {
    process.env.NODE_ENV = "production";
    process.env.SITE_URL = "https://example.com";
    expect(adminUrl("/admin/contacts")).toBe("https://example.com/admin/contacts");
  });
});
