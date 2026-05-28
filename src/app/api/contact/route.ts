import { contactFormToInsert, contactSchema } from "@/lib/forms/contact";
import { handlePublicFormPost } from "@/lib/forms/public-intake";
import { notifyNewContact } from "@/lib/email/notifications";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  return handlePublicFormPost(request, {
    route: "contact",
    schema: contactSchema,
    logPrefix: "contact",
    insertErrorMessage: "Não foi possível enviar a mensagem.",
    persist: async (values) => {
      const supabase = createSupabaseAdmin();
      return supabase.from("contact_submissions").insert(contactFormToInsert(values));
    },
    onSuccess: (values) => {
      void notifyNewContact({
        name: values.name,
        whatsapp: values.whatsapp,
        email: values.email,
        service: values.service,
      });
    },
  });
}
