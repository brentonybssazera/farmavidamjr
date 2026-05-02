
create or replace function public.update_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin new.updated_at = now(); return new; end;
$$;

revoke execute on function public.update_updated_at() from public, anon, authenticated;
