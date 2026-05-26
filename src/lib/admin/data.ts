import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ContactSubmissionRow, TestimonialRow } from "@/lib/supabase/types";

export type TestimonialStatus = TestimonialRow["status"];

const SERVICE_LABELS: Record<string, string> = {
  individual_adolescent: "Psicoterapia individual (adolescentes)",
  individual_adult: "Psicoterapia individual (adultos)",
  couple: "Psicoterapia para casais",
  family: "Psicoterapia para famílias",
  lectures: "Palestras",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  morning: "Manhã",
  afternoon: "Tarde",
  night: "Noite",
};

const THERAPY_BEFORE_LABELS: Record<string, string> = {
  yes: "Sim",
  no: "Não",
};

export function getServiceLabel(service: string) {
  return SERVICE_LABELS[service] ?? service;
}

export function getAvailabilityLabel(availability: string) {
  return AVAILABILITY_LABELS[availability] ?? availability;
}

export function getTherapyBeforeLabel(value: string) {
  return THERAPY_BEFORE_LABELS[value] ?? value;
}

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

export async function getTestimonialsForAdmin(status?: TestimonialStatus | "all") {
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

export async function getContactSubmissions() {
  const supabase = requireSupabase();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ContactSubmissionRow[];
}
