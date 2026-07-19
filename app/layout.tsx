import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

const DEFAULT_HEADING_FONT = 'Playfair Display'
const DEFAULT_BODY_FONT = 'Inter'

const isValidHexColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(value)

const isValidFontName = (value: unknown): value is string =>
  typeof value === 'string' && /^[a-zA-Z0-9 ]{1,60}$/.test(value)

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

async function getThemeSettings() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('store_settings')
      .select('primary_color, secondary_color, accent_color, font_heading, font_body')
      .eq('id', 1)
      .single()

    return {
      primary: isValidHexColor(data?.primary_color) ? data.primary_color : '#1a1a1a',
      secondary: isValidHexColor(data?.secondary_color) ? data.secondary_color : '#c9a96e',
      accent: isValidHexColor(data?.accent_color) ? data.accent_color : '#f5f0e8',
      fontHeading: isValidFontName(data?.font_heading) ? data.font_heading : DEFAULT_HEADING_FONT,
      fontBody: isValidFontName(data?.font_body) ? data.font_body : DEFAULT_BODY_FONT,
    }
  } catch {
    return { primary: '#1a1a1a', secondary: '#c9a96e', accent: '#f5f0e8', fontHeading: DEFAULT_HEADING_FONT, fontBody: DEFAULT_BODY_FONT }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getThemeSettings()

  const customFonts = [
    theme.fontHeading !== DEFAULT_HEADING_FONT && theme.fontHeading,
    theme.fontBody !== DEFAULT_BODY_FONT && theme.fontBody,
  ].filter((f): f is string => Boolean(f))

  const googleFontsHref = customFonts.length
    ? `https://fonts.googleapis.com/css2?${customFonts
        .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}`)
        .join('&')}&display=swap`
    : null

  const themeStyle = `:root {
    --color-brand-primary: ${theme.primary};
    --color-brand-secondary: ${theme.secondary};
    --color-brand-accent: ${theme.accent};
    ${theme.fontHeading !== DEFAULT_HEADING_FONT ? `--font-heading: '${theme.fontHeading}', serif;` : ''}
    ${theme.fontBody !== DEFAULT_BODY_FONT ? `--font-body: '${theme.fontBody}', sans-serif;` : ''}
  }`

  return (
    <html lang="vi" className={`h-full ${playfair.variable} ${inter.variable}`}>
      {googleFontsHref && (
        <head>
          <link rel="stylesheet" href={googleFontsHref} />
        </head>
      )}
      <body className="min-h-full">
        {children}
        <Analytics />
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </body>
    </html>
  )
}
