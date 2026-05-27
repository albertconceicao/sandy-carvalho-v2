import type { Testimonial } from "@/content/types";
import { createSupabaseAdmin, isSupabaseConfigured } from "./server";
import type { TestimonialRow } from "./types";

function formatTestimonialDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(isoDate));
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    date: formatTestimonialDate(row.created_at),
    rating: row.rating,
    text: row.text,
  };
}

function isMissingTableError(message: string) {
  return (
    message.includes("Could not find the table") ||
    (message.includes("relation") && message.includes("does not exist"))
  );
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[supabase] Depoimentos: configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local",
      );
    }
    return [];
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      if (isMissingTableError(error.message)) {
        console.error(
          "[supabase] Tabela 'testimonials' não existe. Execute supabase/migrations/001_initial.sql no SQL Editor.",
        );
      } else {
        console.error("[supabase] Erro ao buscar depoimentos:", error.message);
      }
      return [];
    }

    return (data ?? []).map(mapTestimonial);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[supabase] Depoimentos indisponíveis:", message);
    return [];
  }
}
