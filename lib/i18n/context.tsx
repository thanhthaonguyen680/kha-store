'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Locale } from './translations'

type TranslationKeys = typeof translations.vi

interface LanguageContextType {
  locale: Locale
  t: TranslationKeys
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'vi',
  t: translations.vi,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi')

  useEffect(() => {
    const saved = localStorage.getItem('kha-locale') as Locale
    if (saved === 'vi' || saved === 'en') setLocaleState(saved)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('kha-locale', newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale] as TranslationKeys, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
