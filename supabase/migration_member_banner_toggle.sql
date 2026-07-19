alter table public.store_settings
  add column if not exists member_banner_enabled boolean not null default true;
