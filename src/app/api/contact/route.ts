import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(10),
  email: z.string().email(),
  service: z.enum(["individual_adolescent", "individual_adult", "couple", "family", "lectures"]),
  reason: z.string().optional(),
  availability: z.enum(["morning", "afternoon", "night"]),
  therapyBefore: z.enum(["yes", "no"]),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado. Verifique as variáveis de ambiente." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const values = contactSchema.parse(body);
    const supabase = createSupabaseAdmin();

    const { error } = await supabase.from("contact_submissions").insert({
      name: values.name,
      whatsapp: values.whatsapp,
      email: values.email,
      service: values.service,
      reason: values.reason ?? null,
      availability: values.availability,
      therapy_before: values.therapyBefore,
      message: values.message ?? null,
    });

    if (error) {
      console.error("[contact] supabase insert failed", error.message);
      return NextResponse.json({ error: "Não foi possível enviar a mensagem." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    console.error("[contact] unexpected error", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
