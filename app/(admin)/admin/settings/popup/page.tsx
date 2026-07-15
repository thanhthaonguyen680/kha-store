'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['popup_enabled', 'popup_title', 'popup_description'] as const

export default function PopupSettingsPage() {
  const { settings, setSettings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Popup Thu Thập Khách Hàng"
        subtitle="Popup thu thập tên và số điện thoại khách ghé thăm"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Popup Thu Thập Khách Hàng</CardTitle>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.popup_enabled || false}
                  onChange={(e) => setSettings((prev) => ({ ...prev, popup_enabled: e.target.checked }))}
                  className="w-4 h-4 accent-[#c9a96e] cursor-pointer"
                />
                Bật popup
              </label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input
                value={settings.popup_title || ''}
                onChange={(e) => update('popup_title', e.target.value)}
                placeholder="Ưu Đãi Dành Riêng Cho Bạn"
              />
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                value={settings.popup_description || ''}
                onChange={(e) => update('popup_description', e.target.value)}
                rows={3}
                placeholder="Để lại thông tin để nhận ưu đãi mới nhất từ chúng tôi."
              />
            </div>
            <p className="text-xs text-neutral-400">Popup hiện 1 lần mỗi phiên truy cập, thu thập tên và số điện thoại. Xem danh sách tại mục &quot;Khách Hàng Tiềm Năng&quot;.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
