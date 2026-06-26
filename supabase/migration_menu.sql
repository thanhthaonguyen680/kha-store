alter table public.store_settings
  add column if not exists menu_items jsonb default '[
    {"label": "Bộ Sưu Tập", "label_en": "Collection", "href": "/products"},
    {"label": "Áo", "label_en": "Tops", "href": "/products?category=ao"},
    {"label": "Quần", "label_en": "Bottoms", "href": "/products?category=quan"},
    {"label": "Đầm & Váy", "label_en": "Dresses & Skirts", "href": "/products?category=dam-vay"},
    {"label": "Phụ Kiện", "label_en": "Accessories", "href": "/products?category=phu-kien"}
  ]'::jsonb;
