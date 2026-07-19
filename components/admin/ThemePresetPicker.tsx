'use client'

import { Check } from 'lucide-react'

export type ThemePreset = {
  id: string
  name: string
  description: string
  primary: string
  secondary: string
  accent: string
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'classic',
    name: 'Cổ Điển Sang Trọng',
    description: 'Đen & vàng gold — mặc định',
    primary: '#1a1a1a',
    secondary: '#c9a96e',
    accent: '#f5f0e8',
  },
  {
    id: 'noir',
    name: 'Đen Bạc Tối Giản',
    description: 'Tối giản, hiện đại',
    primary: '#0d0d0d',
    secondary: '#b8b8b0',
    accent: '#f2f2f0',
  },
  {
    id: 'emerald',
    name: 'Ngọc Lục Bảo',
    description: 'Xanh rêu & vàng — quý phái',
    primary: '#10261f',
    secondary: '#c9a96e',
    accent: '#f0ede2',
  },
  {
    id: 'valentine',
    name: 'Mùa Tình Yêu',
    description: 'Valentine — đỏ mận & hồng',
    primary: '#5c1a2b',
    secondary: '#e0a8b4',
    accent: '#fdf1f0',
  },
  {
    id: 'tet',
    name: 'Tết Nguyên Đán',
    description: 'Năm mới — đỏ & vàng kim',
    primary: '#7a1f2b',
    secondary: '#d4af37',
    accent: '#fff6e5',
  },
]

interface ThemePresetPickerProps {
  primary?: string
  secondary?: string
  accent?: string
  onApply: (preset: ThemePreset) => void
}

export function ThemePresetPicker({ primary, secondary, accent, onApply }: ThemePresetPickerProps) {
  const isActive = (preset: ThemePreset) =>
    preset.primary === primary && preset.secondary === secondary && preset.accent === accent

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {THEME_PRESETS.map((preset) => {
        const active = isActive(preset)
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            className={`text-left border-2 p-3 transition-colors ${
              active ? 'border-neutral-900' : 'border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <div className="h-8 flex mb-3 overflow-hidden">
              <div className="flex-1" style={{ backgroundColor: preset.primary }} />
              <div className="flex-1" style={{ backgroundColor: preset.secondary }} />
              <div className="flex-1" style={{ backgroundColor: preset.accent }} />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium">{preset.name}</p>
              {active && <Check className="w-3.5 h-3.5 text-neutral-900 flex-shrink-0" />}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{preset.description}</p>
          </button>
        )
      })}
    </div>
  )
}
