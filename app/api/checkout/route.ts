import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      items, shipping_address, payment_method,
      subtotal, shipping_fee, discount, total,
      notes, promo_code,
    } = body

    if (!items?.length || !shipping_address || !payment_method) {
      return NextResponse.json({ error: 'Thiếu thông tin đơn hàng' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const orderNumber = generateOrderNumber()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user?.id || null,
        status: 'pending',
        payment_status: payment_method === 'cod' ? 'pending' : 'pending',
        payment_method,
        subtotal,
        shipping_fee,
        discount,
        total,
        shipping_address,
        notes: notes || null,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    await supabase.from('order_items').insert(
      items.map((item: {
        product_id: string
        quantity: number
        price: number
        product_name: string
        product_image: string | null
      }) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        product_name: item.product_name,
        product_image: item.product_image,
      }))
    )

    // Decrement stock
    for (const item of items) {
      try {
        await supabase.rpc('decrement_stock', {
          p_product_id: item.product_id,
          p_quantity: item.quantity,
        })
      } catch {}
    }

    // Update campaign usage
    if (promo_code) {
      try {
        const { data: camp } = await supabase.from('campaigns').select('uses_count').eq('code', promo_code).single()
        if (camp) {
          await supabase.from('campaigns').update({ uses_count: camp.uses_count + 1 }).eq('code', promo_code)
        }
      } catch {}
    }

    // Payment redirect
    if (payment_method === 'stripe') {
      return NextResponse.json({
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/stripe?order_id=${order.id}`,
        order_id: order.id,
      })
    }

    if (payment_method === 'vnpay') {
      return NextResponse.json({
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/vnpay?order_id=${order.id}`,
        order_id: order.id,
      })
    }

    // COD or MoMo: return order directly
    return NextResponse.json({ order_id: order.id, order_number: orderNumber })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Lỗi tạo đơn hàng' }, { status: 500 })
  }
}
