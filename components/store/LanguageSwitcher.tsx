'use client'

import { useTranslation } from '@/lib/i18n/context'

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => setLocale('vi')}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === 'vi'
            ? 'text-neutral-900 border-b border-neutral-900'
            : 'text-neutral-400 hover:text-neutral-600'
        }`}
      >
        VI
      </button>
      <span className="text-neutral-300">|</span>
      <button
        onClick={() => setLocale('en')}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === 'en'
            ? 'text-neutral-900 border-b border-neutral-900'
            : 'text-neutral-400 hover:text-neutral-600'
        }`}
      >
        EN
      </button>
    </div>
  )
}
