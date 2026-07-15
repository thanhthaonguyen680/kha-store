'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsImageInput } from '@/components/admin/SettingsImageInput'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['primary_color', 'secondary_color', 'accent_color', 'font_heading', 'font_body', 'logo_url', 'favicon_url'] as const

export default function ThemeSettingsPage() {
  const { settings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Theme & Giao Diện"
        subtitle="Màu sắc, font chữ, logo của cửa hàng"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Màu Sắc Theme</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Màu chính (nền đen, nút chính)</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primary_color || '#1a1a1a'}
                    onChange={(e) => update('primary_color', e.target.value)}
                    className="w-10 h-10 border border-neutral-300 cursor-pointer"
                  />
                  <Input
                    value={settings.primary_color || ''}
                    onChange={(e) => update('primary_color', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Màu phụ (vàng gold)</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.secondary_color || '#c9a96e'}
                    onChange={(e) => update('secondary_color', e.target.value)}
                    className="w-10 h-10 border border-neutral-300 cursor-pointer"
                  />
                  <Input
                    value={settings.secondary_color || ''}
                    onChange={(e) => update('secondary_color', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Màu nền accent (kem)</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.accent_color || '#f5f0e8'}
                    onChange={(e) => update('accent_color', e.target.value)}
                    className="w-10 h-10 border border-neutral-300 cursor-pointer"
                  />
                  <Input
                    value={settings.accent_color || ''}
                    onChange={(e) => update('accent_color', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Font Chữ</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Font tiêu đề</Label>
                <Input value={settings.font_heading || ''} onChange={(e) => update('font_heading', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Font nội dung</Label>
                <Input value={settings.font_body || ''} onChange={(e) => update('font_body', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Logo & Favicon</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <SettingsImageInput value={settings.logo_url || ''} onChange={(v) => update('logo_url', v)} bucket="settings" />
              </div>
              <div className="space-y-2">
                <Label>Favicon (icon tab trình duyệt)</Label>
                <SettingsImageInput value={settings.favicon_url || ''} onChange={(v) => update('favicon_url', v)} bucket="settings" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader><CardTitle>Preview Theme</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-12 flex items-center justify-center font-bold tracking-widest text-sm"
                style={{ backgroundColor: settings.primary_color, color: '#fff' }}>
                {settings.store_name}
              </div>
              <div className="h-8 flex items-center justify-center text-xs"
                style={{ backgroundColor: settings.secondary_color, color: '#fff' }}>
                Gold Button
              </div>
              <div className="h-12 p-3 text-xs"
                style={{ backgroundColor: settings.accent_color }}>
                Accent Background
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
