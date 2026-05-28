import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ContactSubmissionRow } from "@/lib/supabase/types";

export {
  deleteTestimonial,
  listTestimonialsForAdmin as getTestimonialsForAdmin,
  type TestimonialStatus,
  updateTestimonialStatus,
} from "@/lib/supabase/testimonials-repository";

export function formatAdminDate(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

function requireSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não configurado.");
  }
  return createSupabaseAdmin();
}

export async function getAdminStats() {
  const supabase = requireSupabase();

  const [testimonialsRes, contactsRes, pendingRes] = await Promise.all([
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  if (testimonialsRes.error) throw new Error(testimonialsRes.error.message);
  if (contactsRes.error) throw new Error(contactsRes.error.message);
  if (pendingRes.error) throw new Error(pendingRes.error.message);

  return {
    totalTestimonials: testimonialsRes.count ?? 0,
    pendingTestimonials: pendingRes.count ?? 0,
    totalContacts: contactsRes.count ?? 0,
  };
}

export async function getContactSubmissions() {
  const supabase = requireSupabase();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ContactSubmissionRow[];
}
