'use client'

import { useRef, useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SettingsImageInputProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
  bucket?: string
}

export function SettingsImageInput({
  value,
  onChange,
  placeholder = 'https://...',
  bucket = 'settings',
}: SettingsImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
      onChange(data.publicUrl)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload thất bại')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex-shrink-0 gap-1.5"
        >
          {uploading
            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải...</>
            : <><Upload className="w-3.5 h-3.5" /> Từ máy</>
          }
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) uploadFile(file)
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {value && value.startsWith('http') && (
        <div className="w-20 h-20 bg-neutral-100 overflow-hidden border border-neutral-200">
          <img src={value} alt="preview" className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  )
}
