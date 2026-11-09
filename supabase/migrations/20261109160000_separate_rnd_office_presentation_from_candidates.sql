alter table public.candidates
  add column if not exists is_office_profile boolean not null default false;

-- This legacy row is the bureau's public presentation identity, not an individual candidate.
update public.candidates
set is_office_profile = true,
    google_email = null,
    profile_status = 'draft',
    is_published = false,
    is_active = true
where lower(trim(name)) = lower('Zenasni Nabil');

create index if not exists candidates_candidate_profiles_idx
  on public.candidates (created_at desc)
  where is_office_profile = false;
