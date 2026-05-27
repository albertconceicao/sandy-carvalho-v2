# Supabase — Sandy Carvalho

Banco para **dados enviados pelos visitantes** (formulário de contato e depoimentos).

## 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto.
2. Em **SQL Editor → New query**, cole e execute todo o conteúdo de [`migrations/001_initial.sql`](migrations/001_initial.sql).

Sem esse passo você verá: `Could not find the table 'public.testimonials'`.

## 2. Variáveis de ambiente

No `.env.local` da raiz:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

A **service role key** fica em **Project Settings → API**. Use apenas no servidor (API Routes do Next.js). Nunca exponha no client.

## 3. Painel admin

No `.env.local`, defina também:

```env
ADMIN_PASSWORD=sua-senha-forte
```

Acesse **`/admin`** no site (em desenvolvimento: `http://localhost:9002/admin`). Lá você pode:

- Aprovar, rejeitar ou excluir depoimentos
- Ver todas as solicitações de atendimento do formulário de contato

## 4. Fluxo de depoimentos

1. Visitante envia depoimento → salvo com `status = pending`
2. Sandy aprova no painel **`/admin/testimonials`** (ou no Table Editor do Supabase)
3. O site lista apenas depoimentos `approved` (via `getApprovedTestimonials`)

## 5. Contatos

Submissões ficam em `contact_submissions` e aparecem em **`/admin/contacts`**.

## 6. Sem Supabase configurado ou sem depoimentos aprovados

- Formulários retornam erro amigável se o Supabase não estiver configurado
- A seção de depoimentos na home lista apenas registros com `status = approved` no banco; se não houver nenhum, mostra uma mensagem placeholder

## Tabelas

| Tabela | Uso |
|--------|-----|
| `contact_submissions` | Formulário "Entre em contato" |
| `testimonials` | Depoimentos enviados (pending → approved) |

## API Routes (Next.js)

- `POST /api/contact`
- `POST /api/testimonials`
