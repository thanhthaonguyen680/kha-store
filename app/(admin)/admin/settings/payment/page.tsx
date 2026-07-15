'use client'

import { useStoreSettings } from '@/lib/hooks/useStoreSettings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsImageInput } from '@/components/admin/SettingsImageInput'
import { SettingsPageHeader } from '@/components/admin/SettingsPageHeader'

const FIELDS = ['bank_name', 'bank_account_number', 'bank_account_holder', 'bank_qr_url', 'paypal_account'] as const

export default function PaymentSettingsPage() {
  const { settings, update, loading, saving, saved, error, save } = useStoreSettings()

  if (loading) return <div className="text-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <SettingsPageHeader
        title="Thanh Toán"
        subtitle="Thông tin chuyển khoản và PayPal hiển thị ở trang thanh toán"
        saving={saving}
        saved={saved}
        error={error}
        onSave={() => save([...FIELDS])}
      />

      <div className="max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Thông Tin Thanh Toán</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-neutral-400">Hiển thị cho khách khi chọn &quot;Chuyển khoản ngân hàng&quot; hoặc &quot;PayPal&quot; ở trang thanh toán.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên ngân hàng</Label>
                <Input value={settings.bank_name || ''} onChange={(e) => update('bank_name', e.target.value)} placeholder="Vietcombank" />
              </div>
              <div className="space-y-2">
                <Label>Số tài khoản</Label>
                <Input value={settings.bank_account_number || ''} onChange={(e) => update('bank_account_number', e.target.value)} placeholder="0123456789" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Chủ tài khoản</Label>
              <Input value={settings.bank_account_holder || ''} onChange={(e) => update('bank_account_holder', e.target.value)} placeholder="NGUYEN VAN A" />
            </div>
            <div className="space-y-2">
              <Label>Mã QR chuyển khoản (tùy chọn)</Label>
              <SettingsImageInput value={settings.bank_qr_url || ''} onChange={(v) => update('bank_qr_url', v)} bucket="settings" />
              <p className="text-xs text-neutral-400">Ảnh QR từ app ngân hàng (VietQR, mã QR tài khoản...). Nếu để trống, chỉ hiện thông tin STK ở trên.</p>
            </div>
            <div className="space-y-2">
              <Label>Tài khoản PayPal (email hoặc paypal.me link)</Label>
              <Input value={settings.paypal_account || ''} onChange={(e) => update('paypal_account', e.target.value)} placeholder="paypal.me/khaoffical" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
