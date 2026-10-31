create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 20),
  service text not null check (
    service in (
      'Delivery services',
      'Shopping & groceries',
      'Queueing & bill payments',
      'Parcel pickup & drop-off'
    )
  ),
  pickup_location text check (pickup_location is null or char_length(pickup_location) <= 200),
  dropoff_location text check (dropoff_location is null or char_length(dropoff_location) <= 200),
  shopping_list text check (
    shopping_list is null or char_length(btrim(shopping_list)) between 3 and 1500
  ),
  budget_kes numeric(12, 2) check (budget_kes is null or budget_kes between 0 and 999999999),
  office_name text check (office_name is null or char_length(btrim(office_name)) between 2 and 150),
  bill_details text check (
    bill_details is null or char_length(btrim(bill_details)) between 3 and 1200
  ),
  parcel_details text check (
    parcel_details is null or char_length(btrim(parcel_details)) between 3 and 1000
  ),
  preferred_time timestamptz,
  details text check (details is null or char_length(btrim(details)) between 3 and 1500),
  privacy_acknowledged boolean not null default false check (privacy_acknowledged),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  check (
    service not in ('Delivery services', 'Parcel pickup & drop-off')
    or (
      nullif(btrim(pickup_location), '') is not null
      and nullif(btrim(dropoff_location), '') is not null
    )
  ),
  check (service <> 'Delivery services' or details is not null),
  check (service <> 'Shopping & groceries' or shopping_list is not null),
  check (
    service <> 'Queueing & bill payments'
    or (office_name is not null and bill_details is not null)
  ),
  check (service <> 'Parcel pickup & drop-off' or parcel_details is not null)
);

alter table public.booking_requests enable row level security;

revoke all on public.booking_requests from anon, authenticated;
grant insert on public.booking_requests to anon;

drop policy if exists "Public can submit booking requests" on public.booking_requests;
create policy "Public can submit booking requests"
  on public.booking_requests
  for insert
  to anon
  with check (
    status = 'pending'
    and privacy_acknowledged
  );
