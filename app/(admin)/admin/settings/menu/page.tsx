'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { MenuItem } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkListEditor } from '@/components/admin/LinkListEditor'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['menu_items'] as const

export default function MenuSettingsPage() {
  const { settings, setSettings, loading, saving, saved, error, save } = useStoreSettings()

  const menuItems: MenuItem[] = (settings.menu_items as MenuItem[]) || []
  const setMenuItems = (items: MenuItem[]) => setSettings((prev) => ({ ...prev, menu_items: items }))

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Menu Điều Hướng"
        subtitle="Các mục hiển thị trên thanh điều hướng của cửa hàng"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-3xl">
        <Card>
          <CardHeader><CardTitle>Menu Điều Hướng</CardTitle></CardHeader>
          <CardContent>
            <LinkListEditor items={menuItems} onChange={setMenuItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
