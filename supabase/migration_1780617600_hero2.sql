-- Run this in Supabase SQL Editor to add second hero fields
alter table public.store_settings
  add column if not exists hero2_title text,
  add column if not exists hero2_subtitle text,
  add column if not exists hero2_image_url text,
  add column if not exists hero2_cta text;
