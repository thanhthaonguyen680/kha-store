'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Order, UserProfile } from '@/lib/types'
import { formatPrice, formatDate, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Package, LogOut } from 'lucide-react'

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-neutral-300">Đang tải...</div>}>
      <AccountContent />
    </Suspense>
  )
}

function AccountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'orders' | 'profile'>('orders')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const successOrder = searchParams.get('success')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      const [profileRes, ordersRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('orders').select('*, items:order_items(*)').eq('user_id', user.id).order('created_at', { ascending: false }),
      ])
      setProfile(profileRes.data)
      setOrders(ordersRes.data || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <div className="animate-pulse text-neutral-300">Đang tải...</div>
      </div>
    )
  }

  const statusBadge = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'destructive' | 'info' | 'default'> = {
      delivered: 'success', shipped: 'info', confirmed: 'info',
      processing: 'warning', pending: 'warning', cancelled: 'destructive', refunded: 'destructive',
    }
    return <Badge variant={map[status] || 'default'}>{ORDER_STATUS_LABELS[status] || status}</Badge>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {successOrder && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 mb-8 text-sm">
          ✓ Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Tài Khoản</h1>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4" />
          Đăng Xuất
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setTab('orders')}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors ${tab === 'orders' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
            >
              <Package className="w-4 h-4" />
              Đơn Hàng
            </button>
            <button
              onClick={() => setTab('profile')}
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors ${tab === 'profile' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
            >
              <User className="w-4 h-4" />
              Hồ Sơ
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {tab === 'orders' && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Lịch Sử Đơn Hàng</h2>
              {orders.length === 0 ? (
                <div className="text-center py-16 text-neutral-400">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Chưa có đơn hàng nào</p>
                  <Button className="mt-4" onClick={() => router.push('/products')}>
                    Mua Sắm Ngay
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-neutral-200 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-sm">{order.order_number}</p>
                          <p className="text-xs text-neutral-400">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="flex gap-2">
                          {statusBadge(order.status)}
                          <Badge variant={order.payment_status === 'paid' ? 'success' : 'warning'}>
                            {PAYMENT_STATUS_LABELS[order.payment_status]}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-600">
                          {(order.items?.length || 0)} sản phẩm
                        </p>
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'profile' && profile && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Thông Tin Cá Nhân</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Họ và tên</Label>
                  <Input defaultValue={profile.full_name || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={profile.email} disabled className="bg-neutral-50" />
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input defaultValue={profile.phone || ''} />
                </div>
                <Button>Lưu Thay Đổi</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
