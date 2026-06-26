'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/store/ProductCard'
import { EditorialCard } from '@/components/store/EditorialCard'
import { useTranslation } from '@/lib/i18n/context'
import { Product } from '@/lib/types'

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80'
const DEFAULT_HERO2_IMG = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80'

interface HomeContentProps {
  featuredProducts: Product[]
  newArrivals: Product[]
  heroBadge?: string | null
  heroImageUrl?: string | null
  heroTitleImageUrl?: string | null
  heroTitle?: string | null
  heroSubtitle?: string | null
  hero2ImageUrl?: string | null
  hero2Title?: string | null
  hero2Subtitle?: string | null
  hero2Cta?: string | null
}

export function HomeContent({
  featuredProducts,
  newArrivals,
  heroBadge,
  heroImageUrl,
  heroTitleImageUrl,
  heroTitle,
  heroSubtitle,
  hero2ImageUrl,
  hero2Title,
  hero2Subtitle,
  hero2Cta,
}: HomeContentProps) {
  const { t } = useTranslation()

  return (
    <>
      {/* ── Hero 1 ── Full viewport dark overlay */}
      <section className="relative h-[90vh] bg-neutral-900 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${heroImageUrl || DEFAULT_HERO}')` }}
        />
        <div className="relative text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4">{heroBadge || t.hero.badge}</p>
          {heroTitleImageUrl ? (
            <div className="mb-6 flex justify-center">
              <img
                src={heroTitleImageUrl}
                alt="logo"
                className="max-h-40 md:max-h-56 w-auto object-contain drop-shadow-lg"
              />
            </div>
          ) : (
            <h1
              className="text-7xl md:text-9xl mb-6 leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              {heroTitle || 'kha.'}
            </h1>
          )}
          {heroSubtitle && (
            <p className="text-neutral-300 text-2xl mb-10 max-w-md mx-auto" style={{ fontFamily: 'MrDeHaviland, cursive' }}>
              {heroSubtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link href="/products">{t.hero.cta}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-neutral-900"
              asChild
            >
              <Link href="/products?featured=true">{t.hero.featured_btn}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">{t.sections.featured_label}</p>
              <h2 className="text-3xl font-bold">{t.sections.featured_title}</h2>
            </div>
            <Link href="/products?featured=true" className="text-sm tracking-widest uppercase border-b border-neutral-900 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors">
              {t.sections.view_all}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Hero 2 ── Split layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Text side */}
        <div className="bg-[#f5f0e8] flex items-center justify-center px-12 py-20 order-2 lg:order-1">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4">
              {t.hero.badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {hero2Title || 'New Season\nCollection'}
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {hero2Subtitle || 'Những thiết kế mới nhất cho mùa này — tinh tế, sang trọng và đầy cá tính.'}
            </p>
            <Button size="lg" asChild>
              <Link href="/products">{hero2Cta || t.hero.cta}</Link>
            </Button>
          </div>
        </div>
        {/* Image side */}
        <div className="relative min-h-[50vh] lg:min-h-full order-1 lg:order-2 overflow-hidden">
          <Image
            src={hero2ImageUrl || DEFAULT_HERO2_IMG}
            alt="Collection"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Editorial New Arrivals ── Full-body lookbook style */}
      {newArrivals.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">{t.sections.new_label}</p>
              <h2 className="text-3xl font-bold">{t.sections.new_title}</h2>
            </div>
            <Link href="/products" className="text-sm tracking-widest uppercase border-b border-neutral-900 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors">
              {t.sections.view_all}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.slice(0, 6).map((product) => (
              <EditorialCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Member Banner ── */}
      <section className="py-24 bg-neutral-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-4">{t.banner.label}</p>
          <h2 className="text-4xl font-bold mb-6">{t.banner.title1}<br />{t.banner.title2}</h2>
          <p className="text-neutral-400 mb-8">{t.banner.subtitle}</p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/auth/register">{t.banner.cta}</Link>
          </Button>
        </div>
      </section>

      {/* ── Empty state ── */}
      {featuredProducts.length === 0 && newArrivals.length === 0 && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto px-4">
            <p className="text-neutral-400 mb-6">{t.empty.no_products}</p>
            <Button asChild>
              <Link href="/admin">{t.empty.go_admin}</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
