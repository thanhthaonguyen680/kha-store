'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsImageInput } from '@/components/admin/SettingsImageInput'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['about_title', 'about_image_url', 'about_content'] as const

export default function AboutSettingsPage() {
  const { settings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Trang Giới Thiệu"
        subtitle="Nội dung trang About Us"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Trang Giới Thiệu (About Us)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input value={settings.about_title || ''} onChange={(e) => update('about_title', e.target.value)} placeholder="Về Chúng Tôi" />
            </div>
            <div className="space-y-2">
              <Label>Hình ảnh</Label>
              <SettingsImageInput value={settings.about_image_url || ''} onChange={(v) => update('about_image_url', v)} bucket="settings" />
            </div>
            <div className="space-y-2">
              <Label>Nội dung</Label>
              <Textarea
                value={settings.about_content || ''}
                onChange={(e) => update('about_content', e.target.value)}
                rows={10}
                placeholder="Câu chuyện thương hiệu, sứ mệnh, giá trị cốt lõi..."
              />
              <p className="text-xs text-neutral-400">Xuống dòng sẽ được giữ nguyên khi hiển thị. Sau khi lưu, thêm mục menu &quot;About Us&quot; với link &quot;/about&quot; ở trang &quot;Menu Điều Hướng&quot; để hiện lên navbar.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
