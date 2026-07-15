'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewPagePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title))
  }, [title, slugTouched])

  const save = async () => {
    if (!title.trim() || !slug.trim()) {
      setError('Nhập tiêu đề và link')
      return
    }
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: saveError } = await supabase.from('pages').insert({ title, slug, content })
    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }
    router.push('/admin/pages')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="hover:opacity-60">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Thêm Trang Mới</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 mb-6">{error}</div>
      )}

      <div className="max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Nội Dung Trang</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề *</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chính Sách Đổi Trả" />
            </div>
            <div className="space-y-2">
              <Label>Link (URL)</Label>
              <Input
                value={slug}
                onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }}
                placeholder="chinh-sach-doi-tra"
                className="font-mono"
              />
              <p className="text-xs text-neutral-400">URL công khai: /pages/{slug || '...'}</p>
            </div>
            <div className="space-y-2">
              <Label>Nội dung</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} placeholder="Nội dung trang..." />
              <p className="text-xs text-neutral-400">Xuống dòng sẽ được giữ nguyên khi hiển thị.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={save} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu Trang'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/admin/pages')}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
