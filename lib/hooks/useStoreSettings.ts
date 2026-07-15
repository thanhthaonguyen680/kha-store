'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StoreSettings } from '@/lib/types'

const DEFAULT_SETTINGS: Partial<StoreSettings> = {
  store_name: 'LUXE',
  primary_color: '#1a1a1a',
  secondary_color: '#c9a96e',
  accent_color: '#f5f0e8',
  font_heading: 'Playfair Display',
  font_body: 'Inter',
  hero_title: 'Luxury Redefined',
  hero_subtitle: 'Discover timeless elegance in every piece',
}

export function useStoreSettings() {
  const [settings, setSettings] = useState<Partial<StoreSettings>>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('store_settings').select('*').eq('id', 1).single()
        if (data) setSettings(data)
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const update = (key: keyof StoreSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const save = useCallback(async (fields: (keyof StoreSettings)[]) => {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const payload: Record<string, unknown> = { id: 1, updated_at: new Date().toISOString() }
    fields.forEach((field) => { payload[field] = settings[field] ?? null })

    const { error: saveError } = await supabase.from('store_settings').upsert(payload)

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    await Promise.all([
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: '/' }) }),
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: '/products' }) }),
    ])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [settings])

  return { settings, setSettings, update, loading, saving, saved, error, save }
}
