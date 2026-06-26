import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { createClient } from '@/lib/supabase/server'
import './globals.css'

export const dynamic = 'force-dynamic'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('store_settings')
      .select('store_name, favicon_url')
      .eq('id', 1)
      .single()

    const name = data?.store_name || 'KHA'
    const favicon = data?.favicon_url

    return {
      title: `${name} — Luxury Fashion`,
      description: 'Thời trang luxury cao cấp — nơi phong cách gặp gỡ sự tinh tế.',
      applicationName: name,
      ...(favicon && {
        icons: { icon: favicon, apple: favicon },
      }),
    }
  } catch {
    return {
      title: 'KHA — Luxury Fashion',
      description: 'Thời trang luxury cao cấp — nơi phong cách gặp gỡ sự tinh tế.',
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
