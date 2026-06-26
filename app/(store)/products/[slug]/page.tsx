'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Heart, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/store/ProductCard'
import { useCart } from '@/store/cart'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('slug', params.slug)
        .eq('status', 'active')
        .single()

      if (data) {
        setProduct(data)
        const { data: rel } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('status', 'active')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .limit(4)
        setRelated(rel || [])
      }
      setLoading(false)
    }
    load()
  }, [params.slug])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="animate-pulse text-neutral-300">Đang tải...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500 mb-6">Không tìm thấy sản phẩm</p>
        <Button asChild><Link href="/products">Quay Lại</Link></Button>
      </div>
    )
  }

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Quay Lại
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <ShoppingBag className="w-20 h-20" />
              </div>
            )}
            {discount > 0 && (
              <Badge variant="gold" className="absolute top-4 left-4">
                -{discount}%
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square bg-neutral-100 overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-neutral-900' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          {product.category && (
            <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">
              {product.category.name}
            </p>
          )}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-neutral-400 line-through text-lg">
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-neutral-600 leading-relaxed mb-8">{product.description}</p>
          )}

          {product.stock > 0 ? (
            <p className="text-sm text-green-600 mb-6">✓ Còn hàng ({product.stock} sản phẩm)</p>
          ) : (
            <p className="text-sm text-red-500 mb-6">✗ Hết hàng</p>
          )}

          {product.stock > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Số Lượng:</span>
                <div className="flex items-center border border-neutral-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => addItem(product, quantity)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Thêm Vào Giỏ
                </Button>
                <Button size="lg" variant="outline" className="w-12">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          <div className="mt-8 pt-8 border-t border-neutral-200 space-y-3 text-sm text-neutral-600">
            <p>🚚 Miễn phí vận chuyển cho đơn từ 2.000.000₫</p>
            <p>↩️ Đổi trả trong 30 ngày</p>
            <p>🔒 Thanh toán bảo mật SSL</p>
            {product.sku && <p className="text-neutral-400">SKU: {product.sku}</p>}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">Sản Phẩm Liên Quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
