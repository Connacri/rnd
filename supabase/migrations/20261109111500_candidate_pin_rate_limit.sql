create table if not exists public.candidate_pin_attempts (
 id text primary key,
 attempts integer not null default 0,
 locked_until timestamptz,
 updated_at timestamptz not null default now()
);
alter table public.candidate_pin_attempts enable row level security;
revoke all on public.candidate_pin_attempts from anon, authenticated;
