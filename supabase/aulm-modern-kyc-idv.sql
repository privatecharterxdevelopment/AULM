-- Run after aulm-modern-admin.sql in the Supabase SQL Editor.
-- Private bucket for UBO passport front/back + selfie. Desk views via signed URLs.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kyc-idv',
  'kyc-idv',
  false,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set
    public = false,
    file_size_limit = 8388608,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

-- Applicants can upload during onboarding. They cannot list or download.
drop policy if exists "kyc idv upload" on storage.objects;
create policy "kyc idv upload"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'kyc-idv'
    and storage.extension(name) in ('jpg', 'jpeg', 'png', 'webp')
  );

drop policy if exists "kyc idv admin read" on storage.objects;
create policy "kyc idv admin read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'kyc-idv' and public.aulm_is_admin());
