create table if not exists public.booking_rate_limits (
  ip_hash text primary key check (ip_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  attempts integer not null check (attempts > 0)
);

create index if not exists booking_rate_limits_window_started_at_idx
  on public.booking_rate_limits (window_started_at);

alter table public.booking_rate_limits enable row level security;
revoke all on public.booking_rate_limits from public, anon, authenticated, service_role;

create or replace function public.consume_booking_rate_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  allowed boolean;
begin
  if p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid booking rate limit key';
  end if;

  insert into public.booking_rate_limits (ip_hash, window_started_at, attempts)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update
  set
    window_started_at = case
      when public.booking_rate_limits.window_started_at <= now() - interval '10 minutes'
        then now()
      else public.booking_rate_limits.window_started_at
    end,
    attempts = case
      when public.booking_rate_limits.window_started_at <= now() - interval '10 minutes'
        then 1
      else public.booking_rate_limits.attempts + 1
    end
  returning attempts <= 5 into allowed;

  delete from public.booking_rate_limits
  where ip_hash in (
    select ip_hash
    from public.booking_rate_limits
    where window_started_at < now() - interval '1 day'
    order by window_started_at
    limit 100
  );

  return allowed;
end;
$$;

revoke all on function public.consume_booking_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_booking_rate_limit(text) to service_role;

notify pgrst, 'reload schema';
