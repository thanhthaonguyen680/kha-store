import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  let name = 'KHA'
  let themeColor = '#1a1a1a'
  let icon = '/favicon.ico'

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('store_settings')
      .select('store_name, primary_color, favicon_url')
      .eq('id', 1)
      .single()
    if (data?.store_name) name = data.store_name
    if (data?.primary_color) themeColor = data.primary_color
    if (data?.favicon_url) icon = data.favicon_url
  } catch {}

  return {
    name: `${name} — Luxury Fashion`,
    short_name: name,
    description: 'Thời trang luxury cao cấp — nơi phong cách gặp gỡ sự tinh tế.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: themeColor,
    icons: [
      { src: icon, sizes: 'any', type: 'image/png' },
    ],
  }
}
