'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Megaphone, Palette, ExternalLink, LogOut, UserPlus,
  Building2, LayoutTemplate, Menu, PanelBottom, Info, MessageSquare, CreditCard, FileText,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Sản Phẩm', icon: Package },
  { href: '/admin/orders', label: 'Đơn Hàng', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Khách Hàng', icon: Users },
  { href: '/admin/leads', label: 'Khách Hàng Tiềm Năng', icon: UserPlus },
  { href: '/admin/campaigns', label: 'Chiến Dịch', icon: Megaphone },
  { href: '/admin/pages', label: 'Trang Nội Dung', icon: FileText },
]

const SETTINGS_NAV = [
  { href: '/admin/settings', label: 'Theme & Giao Diện', icon: Palette },
  { href: '/admin/settings/general', label: 'Thông Tin Chung', icon: Building2 },
  { href: '/admin/settings/homepage', label: 'Trang Chủ', icon: LayoutTemplate },
  { href: '/admin/settings/menu', label: 'Menu Điều Hướng', icon: Menu },
  { href: '/admin/settings/footer', label: 'Footer', icon: PanelBottom },
  { href: '/admin/settings/about', label: 'Trang Giới Thiệu', icon: Info },
  { href: '/admin/settings/popup', label: 'Popup', icon: MessageSquare },
  { href: '/admin/settings/payment', label: 'Thanh Toán', icon: CreditCard },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close the drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-neutral-900 text-white flex items-center justify-between px-4 h-14">
        <Link href="/admin" className="text-lg font-bold tracking-[0.3em]">KHA</Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -mr-2 text-neutral-300 hover:text-white"
          aria-label="Mở menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`w-60 bg-neutral-900 text-white flex flex-col min-h-screen fixed left-0 top-0 z-50 transition-transform duration-200 lg:translate-x-0 lg:z-20 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-xl font-bold tracking-[0.3em]">KHA</Link>
            <p className="text-xs text-neutral-400 mt-1">Admin Dashboard</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active ? 'bg-[#c9a96e] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}

          <p className="px-6 pt-5 pb-2 text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
            Cài Đặt
          </p>
          {SETTINGS_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active ? 'bg-[#c9a96e] text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-neutral-800 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Xem Store
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-6 py-3 text-sm text-neutral-400 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Đăng Xuất
          </button>
        </div>
      </aside>
    </>
  )
}
