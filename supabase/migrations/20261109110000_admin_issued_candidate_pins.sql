-- Candidate access is issued exclusively by an authenticated RND administrator.
-- The candidate-access Edge Function uses the service role after verifying admin app_metadata.
drop policy if exists "Public submit candidate profiles" on public.candidates;
revoke insert on public.candidates from anon, authenticated;
revoke update on public.candidates from anon, authenticated;

-- PIN hashes are server-generated PBKDF2-SHA256 values; public users must never read them.
revoke select (candidate_pin_hash, pin_failed_attempts, pin_locked_until) on public.candidates from anon, authenticated;

-- Candidate photo uploads are scoped to a candidate UUID folder.
drop policy if exists "Public upload candidate photos" on storage.objects;
create policy "Candidate photo upload staging"
on storage.objects for insert to anon, authenticated
with check (
  bucket_id = 'candidate-photos'
  and (storage.foldername(name))[1] = 'submissions'
  and array_length(storage.foldername(name), 1) = 2
);

-- Ensure the bucket retains the required image constraints.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('candidate-photos', 'candidate-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = excluded.allowed_mime_types;
