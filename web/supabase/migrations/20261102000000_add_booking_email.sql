alter table public.booking_requests
  add column if not exists email text;

alter table public.booking_requests
  add constraint booking_requests_email_format
  check (
    email is null
    or (
      char_length(email) <= 254
      and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    )
  );
