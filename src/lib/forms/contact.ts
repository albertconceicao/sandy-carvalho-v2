import { z } from "zod";
import type { ContactSubmissionInsert } from "@/lib/supabase/types";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  whatsapp: z.string().min(10, { message: "WhatsApp inválido." }),
  email: z.string().email({ message: "Email inválido." }),
  service: z.enum(["individual_adolescent", "individual_adult", "couple", "family", "lectures"], {
    errorMap: () => ({ message: "Selecione um serviço." }),
  }),
  reason: z.string().optional(),
  availability: z.enum(["morning", "afternoon", "night"], {
    errorMap: () => ({ message: "Selecione um período." }),
  }),
  therapyBefore: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Selecione uma opção." }),
  }),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function contactFormToInsert(values: ContactFormValues): ContactSubmissionInsert {
  return {
    name: values.name,
    whatsapp: values.whatsapp,
    email: values.email,
    service: values.service,
    reason: values.reason ?? null,
    availability: values.availability,
    therapy_before: values.therapyBefore,
    message: values.message ?? null,
  };
}
