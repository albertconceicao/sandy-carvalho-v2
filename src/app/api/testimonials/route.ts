import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const testimonialSchema = z.object({
  name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  testimonial: z.string().min(10),
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
    const values = testimonialSchema.parse(body);
    const supabase = createSupabaseAdmin();

    const { error } = await supabase.from("testimonials").insert({
      name: values.name,
      rating: values.rating,
      text: values.testimonial,
      status: "pending",
    });

    if (error) {
      console.error("[testimonials] supabase insert failed", error.message);
      return NextResponse.json({ error: "Não foi possível enviar o depoimento." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    console.error("[testimonials] unexpected error", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
