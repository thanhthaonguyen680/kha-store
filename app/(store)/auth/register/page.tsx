'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  full_name: z.string().min(2, 'Nhập họ tên'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: 'Mật khẩu không khớp',
  path: ['confirm'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-semibold mb-2">Kiểm Tra Email</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Chúng tôi đã gửi link xác nhận đến email của bạn. Vui lòng kiểm tra hộp thư.
          </p>
          <Button variant="brand" asChild><Link href="/auth/login">Đăng Nhập</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-[0.3em]">KHA</Link>
          <h1 className="text-xl font-semibold mt-6 mb-2">Tạo Tài Khoản</h1>
          <p className="text-sm text-neutral-500">Tham gia cộng đồng LUXE</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Họ và tên</Label>
            <Input {...register('full_name')} />
            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Mật khẩu</Label>
            <Input type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Xác nhận mật khẩu</Label>
            <Input type="password" {...register('confirm')} />
            {errors.confirm && <p className="text-red-500 text-xs">{errors.confirm.message}</p>}
          </div>
          <Button variant="brand" type="submit" className="w-full" disabled={loading}>
            {loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản'}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="text-neutral-900 underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}
