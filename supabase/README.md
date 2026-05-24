# Supabase — Sandy Carvalho

Banco para **dados enviados pelos visitantes** (formulário de contato e depoimentos).

## 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto.
2. Em **SQL Editor**, execute o arquivo `supabase/migrations/001_initial.sql`.

## 2. Variáveis de ambiente

No `.env.local` da raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

A **service role key** fica em **Project Settings → API**. Use apenas no servidor (API Routes do Next.js). Nunca exponha no client.

## 3. Fluxo de depoimentos

1. Visitante envia depoimento → salvo com `status = pending`
2. Sandy aprova no **Table Editor** do Supabase → muda para `approved`
3. O site lista apenas depoimentos `approved` (via `getApprovedTestimonials`)

## 4. Contatos

Submissões ficam em `contact_submissions`. Consulte no Table Editor ou configure notificações (e-mail/webhook) depois.

## 5. Sem Supabase configurado

- Formulários retornam erro amigável
- Depoimentos exibidos usam fallback em `src/lib/content/fallback.ts`

## Tabelas

| Tabela | Uso |
|--------|-----|
| `contact_submissions` | Formulário "Entre em contato" |
| `testimonials` | Depoimentos enviados (pending → approved) |

## API Routes (Next.js)

- `POST /api/contact`
- `POST /api/testimonials`
