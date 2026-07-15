'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('pages').select('*').eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setSlug(data.slug)
        setContent(data.content || '')
      }
      setLoading(false)
    }
    load()
  }, [id])

  const save = async () => {
    if (!title.trim() || !slug.trim()) {
      setError('Nhập tiêu đề và link')
      return
    }
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: saveError } = await supabase
      .from('pages')
      .update({ title, slug, content, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }
    router.push('/admin/pages')
  }

  if (loading) return <div className="flex justify-center py-20 text-neutral-400">Đang tải...</div>

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="hover:opacity-60">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Chỉnh Sửa Trang</h1>
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
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Link (URL)</Label>
              <Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="font-mono" />
              <p className="text-xs text-neutral-400">URL công khai: /pages/{slug || '...'}</p>
            </div>
            <div className="space-y-2">
              <Label>Nội dung</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} />
              <p className="text-xs text-neutral-400">Xuống dòng sẽ được giữ nguyên khi hiển thị.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={save} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
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
