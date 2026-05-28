import { z } from "zod";
import type { TestimonialInsert } from "@/lib/supabase/types";

export const testimonialSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  rating: z
    .number({
      required_error: "Por favor, dê uma nota de 1 a 5 estrelas.",
      invalid_type_error: "Por favor, dê uma nota de 1 a 5 estrelas.",
    })
    .int()
    .min(1, { message: "Por favor, dê uma nota de 1 a 5 estrelas." })
    .max(5),
  testimonial: z.string().min(10, { message: "Seu depoimento deve ter pelo menos 10 caracteres." }),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export function testimonialFormToInsert(values: TestimonialFormValues): TestimonialInsert {
  return {
    name: values.name,
    rating: values.rating,
    text: values.testimonial,
    status: "pending",
  };
}
