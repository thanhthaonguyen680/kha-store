'use client'

import Link from 'next/link'
import { Share2, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-neutral-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold tracking-[0.3em] mb-4">KHA</h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-neutral-300">{t.footer.explore}</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link href="/products" className="hover:text-white transition-colors">{t.nav.collection}</Link></li>
              <li><Link href="/products?category=ao" className="hover:text-white transition-colors">{t.nav.tops}</Link></li>
              <li><Link href="/products?category=quan" className="hover:text-white transition-colors">{t.nav.bottoms}</Link></li>
              <li><Link href="/products?category=dam-vay" className="hover:text-white transition-colors">{t.nav.dresses}</Link></li>
              <li><Link href="/products?category=phu-kien" className="hover:text-white transition-colors">{t.nav.accessories}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-neutral-300">{t.footer.support}</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link href="/account" className="hover:text-white transition-colors">{t.footer.account}</Link></li>
              <li><a href="mailto:info@kha.vn" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.return_policy}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.size_guide}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t.footer.shipping}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs">{t.footer.copyright}</p>
          <p className="text-neutral-500 text-xs">{t.footer.payment}</p>
        </div>
      </div>
    </footer>
  )
}
