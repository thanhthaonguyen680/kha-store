alter table public.store_settings
  add column if not exists hero_title_image_url text,
  add column if not exists hero_images text[] not null default '{}',
  add column if not exists hero_links text[] not null default '{}';
