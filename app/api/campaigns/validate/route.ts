import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const total = Number(request.nextUrl.searchParams.get('total') || 0)

  if (!code) return NextResponse.json({ error: 'Thiếu mã' }, { status: 400 })

  const supabase = await createClient()
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*')
    .eq('code', code)
    .eq('status', 'active')
    .single()

  if (!campaign) return NextResponse.json({ error: 'Mã không hợp lệ' }, { status: 404 })

  const now = new Date()
  if (campaign.end_date && new Date(campaign.end_date) < now) {
    return NextResponse.json({ error: 'Mã đã hết hạn' }, { status: 400 })
  }
  if (campaign.max_uses && campaign.uses_count >= campaign.max_uses) {
    return NextResponse.json({ error: 'Mã đã hết lượt sử dụng' }, { status: 400 })
  }
  if (total < campaign.min_order_value) {
    return NextResponse.json({ error: `Đơn tối thiểu ${campaign.min_order_value.toLocaleString('vi-VN')}₫` }, { status: 400 })
  }

  let discount = 0
  if (campaign.type === 'percentage') discount = Math.round(total * campaign.value / 100)
  else if (campaign.type === 'fixed') discount = campaign.value
  else if (campaign.type === 'free_shipping') discount = 50000

  return NextResponse.json({ discount, campaign_id: campaign.id, name: campaign.name })
}
