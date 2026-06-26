'use client'

import { useTranslation } from '@/lib/i18n/context'

interface ProductSortProps {
  current?: string
}

export function ProductSort({ current = 'newest' }: ProductSortProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-neutral-500 uppercase tracking-wider">{t.products.sort}</label>
      <select
        defaultValue={current}
        onChange={(e) => {
          const url = new URL(window.location.href)
          url.searchParams.set('sort', e.target.value)
          window.location.href = url.toString()
        }}
        className="text-sm border border-neutral-300 px-2 py-1 focus:outline-none"
      >
        <option value="newest">{t.products.sort_newest}</option>
        <option value="price_asc">{t.products.sort_price_asc}</option>
        <option value="price_desc">{t.products.sort_price_desc}</option>
      </select>
    </div>
  )
}
