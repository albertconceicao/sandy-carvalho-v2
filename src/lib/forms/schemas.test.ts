import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/forms/contact";
import { testimonialSchema } from "@/lib/forms/testimonial";

describe("contactSchema", () => {
  const valid = {
    name: "Maria Silva",
    whatsapp: "(31) 99999-9999",
    email: "maria@example.com",
    service: "individual_adult" as const,
    availability: "morning" as const,
    therapyBefore: "no" as const,
  };

  it("accepts a minimal valid payload", () => {
    expect(contactSchema.parse(valid)).toEqual(valid);
  });

  it("rejects short names", () => {
    expect(() => contactSchema.parse({ ...valid, name: "A" })).toThrow();
  });
});

describe("testimonialSchema", () => {
  const valid = {
    name: "João Souza",
    rating: 5,
    testimonial: "Excelente profissional, recomendo muito.",
  };

  it("accepts a valid testimonial", () => {
    expect(testimonialSchema.parse(valid)).toEqual(valid);
  });

  it("rejects missing rating", () => {
    expect(() => testimonialSchema.parse({ name: valid.name, testimonial: valid.testimonial })).toThrow();
  });

  it("rejects short testimonial text", () => {
    expect(() => testimonialSchema.parse({ ...valid, testimonial: "curto" })).toThrow();
  });
});
