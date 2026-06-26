import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

async function getDashboardStats() {
  try {
    const supabase = await createClient()

    const [products, orders, customers, revenue] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }).eq('status', 'active'),
      supabase.from('orders').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'customer'),
      supabase.from('orders').select('total').eq('payment_status', 'paid'),
    ])

    const totalRevenue = (revenue.data || []).reduce((sum, o) => sum + (o.total || 0), 0)

    return {
      products: products.count || 0,
      orders: orders.count || 0,
      customers: customers.count || 0,
      revenue: totalRevenue,
    }
  } catch {
    return { products: 0, orders: 0, customers: 0, revenue: 0 }
  }
}

async function getRecentOrders() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    return data || []
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const [stats, recentOrders] = await Promise.all([getDashboardStats(), getRecentOrders()])

  const statCards = [
    { label: 'Doanh Thu', value: formatPrice(stats.revenue), icon: TrendingUp, color: 'text-[#c9a96e]' },
    { label: 'Đơn Hàng', value: stats.orders.toString(), icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Sản Phẩm', value: stats.products.toString(), icon: Package, color: 'text-green-500' },
    { label: 'Khách Hàng', value: stats.customers.toString(), icon: Users, color: 'text-purple-500' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-orange-100 text-orange-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Tổng quan hoạt động cửa hàng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-500">{label}</span>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Đơn Hàng Gần Đây</CardTitle>
            <Link href="/admin/orders" className="text-sm text-[#c9a96e] hover:underline">
              Xem tất cả →
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length === 0 ? (
            <p className="text-center py-8 text-neutral-400 text-sm">Chưa có đơn hàng nào</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Mã ĐH</th>
                  <th className="text-left px-6 py-3">Tổng tiền</th>
                  <th className="text-left px-6 py-3">Trạng thái</th>
                  <th className="text-left px-6 py-3">Thanh toán</th>
                  <th className="text-left px-6 py-3">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium hover:text-[#c9a96e]">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-neutral-400">
                      {new Date(order.created_at).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
