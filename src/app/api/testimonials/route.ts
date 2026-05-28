import { testimonialFormToInsert, testimonialSchema } from "@/lib/forms/testimonial";
import { handlePublicFormPost } from "@/lib/forms/public-intake";
import { notifyNewTestimonial } from "@/lib/email/notifications";
import { submitPendingTestimonial } from "@/lib/supabase/testimonials-repository";

export async function POST(request: Request) {
  return handlePublicFormPost(request, {
    route: "testimonials",
    schema: testimonialSchema,
    logPrefix: "testimonials",
    insertErrorMessage: "Não foi possível enviar o depoimento.",
    persist: async (values) => submitPendingTestimonial(testimonialFormToInsert(values)),
    onSuccess: (values) => {
      void notifyNewTestimonial({
        name: values.name,
        rating: values.rating,
      });
    },
  });
}
