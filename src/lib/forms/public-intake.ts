import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, type RateLimitRoute } from "@/lib/rate-limit";
import { isSupabaseConfigured } from "@/lib/supabase/server";

type PersistResult = { error: { message: string } | null };

export type PublicFormIntakeConfig<T> = {
  route: RateLimitRoute;
  schema: z.ZodType<T>;
  logPrefix: string;
  insertErrorMessage: string;
  persist: (values: T) => Promise<PersistResult>;
  onSuccess?: (values: T) => void | Promise<void>;
};

export async function handlePublicFormPost<T>(
  request: Request,
  config: PublicFormIntakeConfig<T>,
): Promise<NextResponse> {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado. Verifique as variáveis de ambiente." },
      { status: 503 },
    );
  }

  const rateLimited = await checkRateLimit(request, config.route);
  if (rateLimited) return rateLimited;

  try {
    const body = await request.json();
    const values = config.schema.parse(body);

    const { error } = await config.persist(values);
    if (error) {
      console.error(`[${config.logPrefix}] supabase insert failed`, error.message);
      return NextResponse.json({ error: config.insertErrorMessage }, { status: 500 });
    }

    if (config.onSuccess) {
      void Promise.resolve(config.onSuccess(values)).catch((err) =>
        console.error(`[${config.logPrefix}] post-success hook failed`, err),
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    console.error(`[${config.logPrefix}] unexpected error`, error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
