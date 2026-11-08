-- Public candidate photo bucket. Public reads are intentional for approved campaign portraits.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('candidate-photos', 'candidate-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public candidate profile submissions with moderation-only publication.
-- PIN hashes and lockout metadata are never readable through the public Data API.

drop policy if exists "Public submit candidate profiles" on public.candidates;
create policy "Public submit candidate profiles"
on public.candidates for insert to anon, authenticated
with check (
  profile_status = 'pending'
  and is_published = false
  and is_active = true
  and candidate_number is null
  and candidate_pin_hash ~ '^[0-9a-f]{64}$'
  and pin_failed_attempts = 0
  and pin_locked_until is null
  and submitted_at is not null
);

drop policy if exists "Public upload candidate photos" on storage.objects;
create policy "Public upload candidate photos"
on storage.objects for insert to anon, authenticated
with check (
  bucket_id = 'candidate-photos'
  and (storage.foldername(name))[1] = 'submissions'
);

revoke select on public.candidates from anon, authenticated;
grant select (
  id, name, photo_url, candidate_number, profession, education_level,
  diplomas, experience, skills, motivation, profile_status, is_published,
  submitted_at, is_active, created_at, updated_at, role, party, biography, sort_order
) on public.candidates to anon, authenticated;

grant insert (
  name, photo_url, profession, education_level, diplomas, experience,
  skills, motivation, profile_status, is_published, is_active,
  candidate_pin_hash, pin_failed_attempts, pin_locked_until, submitted_at
) on public.candidates to anon, authenticated;
