'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['store_name', 'contact_email', 'contact_phone', 'address', 'social_instagram', 'social_facebook'] as const

export default function GeneralSettingsPage() {
  const { settings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Thông Tin Chung"
        subtitle="Thông tin cửa hàng và mạng xã hội"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle>Thông Tin Cửa Hàng</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tên cửa hàng</Label>
              <Input value={settings.store_name || ''} onChange={(e) => update('store_name', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email liên hệ</Label>
                <Input value={settings.contact_email || ''} onChange={(e) => update('contact_email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input value={settings.contact_phone || ''} onChange={(e) => update('contact_phone', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Textarea value={settings.address || ''} onChange={(e) => update('address', e.target.value)} rows={2} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Mạng Xã Hội</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input value={settings.social_instagram || ''} onChange={(e) => update('social_instagram', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input value={settings.social_facebook || ''} onChange={(e) => update('social_facebook', e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
