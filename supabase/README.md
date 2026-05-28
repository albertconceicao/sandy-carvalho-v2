# Supabase — Sandy Carvalho

Banco para **dados enviados pelos visitantes** (formulário de contato e depoimentos) e **rate limit** dos formulários.

## 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto.
2. Em **SQL Editor → New query**, execute na ordem:
   - [`migrations/001_initial.sql`](migrations/001_initial.sql)
   - [`migrations/002_rate_limit.sql`](migrations/002_rate_limit.sql)

Sem o passo 1 você verá: `Could not find the table 'public.testimonials'`.  
Sem o passo 2 o rate limit falha em silêncio (formulários continuam funcionando).

## 2. Variáveis de ambiente

Copie [`.env.example`](../.env.example) para `.env.local` na raiz do Next.js.

Mínimo para formulários e painel:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=sua-senha-forte
ADMIN_SESSION_SECRET=string-longa-aleatoria
```

A **service role key** fica em **Project Settings → API**. Use apenas no servidor (API Routes do Next.js). Nunca exponha no client.

Em **produção (Netlify)**, use o mesmo par de variáveis no painel do site.

## 3. Painel admin do site

Acesse **`/admin`** (ex.: `https://sandycarvalho.com.br/admin`).

- Aprovar, rejeitar ou excluir depoimentos
- Ver solicitações de atendimento do formulário de contato
- Link **Blog (Strapi)** no menu (se `STRAPI_ADMIN_URL` estiver configurada no Netlify)

## 4. Fluxo de depoimentos

1. Visitante envia depoimento → salvo com `status = pending`
2. Sandy recebe email (se Resend estiver configurado)
3. Sandy aprova em **`/admin/testimonials`**
4. O site lista apenas depoimentos `approved`

## 5. Contatos

Submissões ficam em `contact_submissions`, aparecem em **`/admin/contacts`**, e disparam email de resumo (com link para o painel e WhatsApp clicável).

## 6. Rate limit

Cada IP pode enviar até **3** formulários por hora (contato e depoimento contam separadamente). Eventos ficam em `rate_limit_events`.

## Tabelas

| Tabela | Uso |
|--------|-----|
| `contact_submissions` | Formulário "Entre em contato" |
| `testimonials` | Depoimentos (pending → approved) |
| `rate_limit_events` | Anti-spam das API routes |

## API Routes (Next.js)

- `POST /api/contact`
- `POST /api/testimonials`

---

## Guia rápido para Sandy

| O que fazer | Onde |
|-------------|------|
| Escrever e publicar artigos do blog | Strapi (link **Blog (Strapi)** no menu do `/admin` ou URL do Strapi Cloud) |
| Ver mensagens de contato | Site → `/admin` → **Contatos** |
| Aprovar depoimentos | Site → `/admin` → **Depoimentos** |

São **dois logins** diferentes (Strapi e senha do `/admin`). O texto completo de um depoimento novo só aparece no painel, não no email.

---

## Deploy (Netlify + Supabase)

1. Rodar as duas migrations no projeto Supabase de **produção**.
2. Configurar no Netlify: `SUPABASE_*`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SITE_URL`, `STRAPI_*`, `RESEND_*` (ver `.env.example`).
3. Verificar domínio no [Resend](https://resend.com) para `RESEND_FROM_EMAIL`.
