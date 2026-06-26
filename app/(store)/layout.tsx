export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/store/Navbar'
import { Footer } from '@/components/store/Footer'
import { CartSidebar } from '@/components/store/CartSidebar'
import { LanguageProvider } from '@/lib/i18n/context'
import { createClient } from '@/lib/supabase/server'

async function getStoreNav() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('store_settings').select('logo_url, menu_items').eq('id', 1).single()
    return { logoUrl: data?.logo_url || null, menuItems: data?.menu_items || null }
  } catch {
    return { logoUrl: null, menuItems: null }
  }
}

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const { logoUrl, menuItems } = await getStoreNav()

  return (
    <LanguageProvider>
      <Navbar logoUrl={logoUrl} menuItems={menuItems} />
      <CartSidebar />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  )
}
