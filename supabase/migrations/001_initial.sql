-- Tabelas para dados enviados pelo site (Supabase)

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  email text not null,
  service text not null,
  reason text,
  availability text not null,
  therapy_before text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating integer not null check (rating between 1 and 5),
  text text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists testimonials_status_created_at_idx
  on public.testimonials (status, created_at desc);

alter table public.contact_submissions enable row level security;
alter table public.testimonials enable row level security;

-- Sem policies públicas: inserts/leituras passam pela API Next.js com service role.
