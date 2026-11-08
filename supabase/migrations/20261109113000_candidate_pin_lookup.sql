alter table public.candidates add column if not exists candidate_pin_lookup text;
create unique index if not exists candidates_candidate_pin_lookup_uidx on public.candidates(candidate_pin_lookup) where candidate_pin_lookup is not null;
revoke select (candidate_pin_lookup) on public.candidates from anon, authenticated;