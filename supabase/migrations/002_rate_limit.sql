-- Rate limiting for public form API routes (service role only)

create table if not exists public.rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  route text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_events_lookup_idx
  on public.rate_limit_events (ip_hash, route, created_at desc);

alter table public.rate_limit_events enable row level security;
