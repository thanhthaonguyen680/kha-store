import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Page } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getPage(slug: string): Promise<Page | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('pages').select('*').eq('slug', slug).single()
    return data || null
  } catch {
    return null
  }
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{page.title}</h1>
      {page.content ? (
        <div className="whitespace-pre-line text-neutral-700 leading-relaxed">
          {page.content}
        </div>
      ) : (
        <p className="text-neutral-400">Nội dung đang được cập nhật.</p>
      )}
    </div>
  )
}
