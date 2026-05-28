import type { Testimonial } from "@/content/types";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { TestimonialInsert, TestimonialRow } from "@/lib/supabase/types";

export type TestimonialStatus = TestimonialRow["status"];

function requireSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não configurado.");
  }
  return createSupabaseAdmin();
}

function isMissingTableError(message: string) {
  return (
    message.includes("Could not find the table") ||
    (message.includes("relation") && message.includes("does not exist"))
  );
}

function formatPublicDate(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(isoDate));
}

function mapToPublicTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    date: formatPublicDate(row.created_at),
    rating: row.rating,
    text: row.text,
  };
}

export async function submitPendingTestimonial(insert: TestimonialInsert) {
  const supabase = requireSupabase();
  return supabase.from("testimonials").insert(insert);
}

/** Fail-soft: returns [] when Supabase is off or the query errors. */
export async function listApprovedTestimonials(): Promise<Testimonial[]> {
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

    return (data ?? []).map(mapToPublicTestimonial);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[supabase] Depoimentos indisponíveis:", message);
    return [];
  }
}

export async function listTestimonialsForAdmin(status?: TestimonialStatus | "all") {
  const supabase = requireSupabase();

  let query = supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateTestimonialStatus(id: string, status: TestimonialStatus) {
  const supabase = requireSupabase();

  const { error } = await supabase.from("testimonials").update({ status }).eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteTestimonial(id: string) {
  const supabase = requireSupabase();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
