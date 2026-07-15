'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { MenuItem } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkListEditor } from '@/components/admin/LinkListEditor'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['footer_description', 'footer_explore_links', 'footer_support_links', 'footer_copyright', 'footer_payment_text'] as const

export default function FooterSettingsPage() {
  const { settings, setSettings, update, loading, saving, saved, error, save } = useStoreSettings()

  const exploreLinks: MenuItem[] = (settings.footer_explore_links as MenuItem[]) || []
  const supportLinks: MenuItem[] = (settings.footer_support_links as MenuItem[]) || []

  const setExploreLinks = (items: MenuItem[]) => setSettings((prev) => ({ ...prev, footer_explore_links: items }))
  const setSupportLinks = (items: MenuItem[]) => setSettings((prev) => ({ ...prev, footer_support_links: items }))

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Footer"
        subtitle="Nội dung chân trang của cửa hàng"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-3xl">
        <Card>
          <CardHeader><CardTitle>Footer</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Mô tả thương hiệu</Label>
              <Textarea
                value={settings.footer_description || ''}
                onChange={(e) => update('footer_description', e.target.value)}
                rows={3}
                placeholder="Thời trang luxury cao cấp — nơi phong cách gặp gỡ sự tinh tế..."
              />
            </div>
            <div className="space-y-2">
              <Label>Cột &quot;Khám Phá&quot;</Label>
              <LinkListEditor items={exploreLinks} onChange={setExploreLinks} />
            </div>
            <div className="space-y-2">
              <Label>Cột &quot;Hỗ Trợ&quot;</Label>
              <LinkListEditor items={supportLinks} onChange={setSupportLinks} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Copyright</Label>
                <Input value={settings.footer_copyright || ''} onChange={(e) => update('footer_copyright', e.target.value)} placeholder="© 2026 KHA. All rights reserved." />
              </div>
              <div className="space-y-2">
                <Label>Dòng chữ thanh toán</Label>
                <Input value={settings.footer_payment_text || ''} onChange={(e) => update('footer_payment_text', e.target.value)} placeholder="Thanh toán an toàn với..." />
              </div>
            </div>
            <p className="text-xs text-neutral-400">Icon mạng xã hội ở footer lấy từ Instagram/Facebook URL ở trang &quot;Thông Tin Chung&quot;.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
