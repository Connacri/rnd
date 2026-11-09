-- Keep one canonical public-read policy; both existing policies had identical predicates.
drop policy if exists "Public read approved candidates" on public.candidates;
