alter table public.candidates add column if not exists google_email text;
create unique index if not exists candidates_google_email_uidx
  on public.candidates (lower(google_email))
  where google_email is not null and btrim(google_email) <> '';

create table if not exists public.candidate_access_config (
  id smallint primary key check (id = 1),
  pin_hash text not null,
  pin_lookup text not null,
  updated_at timestamptz not null default now()
);
alter table public.candidate_access_config enable row level security;
revoke all on public.candidate_access_config from anon, authenticated;
