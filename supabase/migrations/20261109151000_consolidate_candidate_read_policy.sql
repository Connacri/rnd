-- Consolidate the public and admin SELECT paths into one RLS policy.
-- Public visitors see only approved/published/active profiles; admins can review all rows.
drop policy if exists "Admins read submitted candidate profiles" on public.candidates;
drop policy if exists "Public read published candidate profiles" on public.candidates;
drop policy if exists "Public read approved candidates" on public.candidates;
create policy "Read published candidates or admin review"
on public.candidates
for select
to anon, authenticated
using (
  (is_active = true and is_published = true and profile_status = 'approved')
  or (select ((auth.jwt() -> 'app_metadata') ->> 'role')) = 'admin'
);
