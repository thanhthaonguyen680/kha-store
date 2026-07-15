'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsImageInput } from '@/components/admin/SettingsImageInput'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = [
  'hero_badge', 'hero_title_image_url', 'hero_title', 'hero_subtitle', 'hero_image_url', 'banner_text',
  'hero2_title', 'hero2_subtitle', 'hero2_image_url', 'hero2_cta',
] as const

export default function HomepageSettingsPage() {
  const { settings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Trang Chủ"
        subtitle="Hero chính và banner thứ 2 của trang chủ"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle>Trang Chủ (Hero)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Badge text (dòng nhỏ phía trên tiêu đề)</Label>
              <Input value={settings.hero_badge || ''} onChange={(e) => update('hero_badge', e.target.value)} placeholder="Bộ Sưu Tập Mới 2026" />
            </div>
            <div className="space-y-2">
              <Label>Ảnh tiêu đề Hero (logo PNG — ưu tiên hơn chữ)</Label>
              <SettingsImageInput value={settings.hero_title_image_url || ''} onChange={(v) => update('hero_title_image_url', v)} bucket="settings" />
              <p className="text-xs text-neutral-400">Upload ảnh logo PNG nền trong suốt. Nếu để trống sẽ dùng chữ bên dưới.</p>
            </div>
            <div className="space-y-2">
              <Label>Tiêu đề Hero (chữ — dùng khi không có ảnh)</Label>
              <Input value={settings.hero_title || ''} onChange={(e) => update('hero_title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phụ đề Hero</Label>
              <Input value={settings.hero_subtitle || ''} onChange={(e) => update('hero_subtitle', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Hình ảnh Hero</Label>
              <SettingsImageInput value={settings.hero_image_url || ''} onChange={(v) => update('hero_image_url', v)} bucket="settings" />
            </div>
            <div className="space-y-2">
              <Label>Banner thông báo (ví dụ: FREE SHIP đơn trên 2tr)</Label>
              <Input value={settings.banner_text || ''} onChange={(e) => update('banner_text', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Hero Banner Thứ 2 (Split Layout)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input value={settings.hero2_title || ''} onChange={(e) => update('hero2_title', e.target.value)} placeholder="New Season Collection" />
            </div>
            <div className="space-y-2">
              <Label>Phụ đề</Label>
              <Textarea value={settings.hero2_subtitle || ''} onChange={(e) => update('hero2_subtitle', e.target.value)} rows={2} placeholder="Mô tả ngắn..." />
            </div>
            <div className="space-y-2">
              <Label>Hình ảnh Hero 2</Label>
              <SettingsImageInput value={settings.hero2_image_url || ''} onChange={(v) => update('hero2_image_url', v)} bucket="settings" />
            </div>
            <div className="space-y-2">
              <Label>Text nút CTA</Label>
              <Input value={settings.hero2_cta || ''} onChange={(e) => update('hero2_cta', e.target.value)} placeholder="Khám Phá Ngay" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
