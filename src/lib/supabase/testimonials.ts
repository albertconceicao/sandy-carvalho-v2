import { fallbackTestimonials } from "@/lib/content/fallback";
import type { Testimonial } from "@/lib/content/types";
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

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return fallbackTestimonials;
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[supabase] failed to fetch testimonials", error.message);
      return fallbackTestimonials;
    }

    if (!data?.length) {
      return fallbackTestimonials;
    }

    return data.map(mapTestimonial);
  } catch (error) {
    console.warn("[supabase] testimonials unavailable", error);
    return fallbackTestimonials;
  }
}
