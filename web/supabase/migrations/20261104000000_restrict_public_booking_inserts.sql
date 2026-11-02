revoke insert on public.booking_requests from public, anon, authenticated;
drop policy if exists "Public can submit booking requests" on public.booking_requests;
