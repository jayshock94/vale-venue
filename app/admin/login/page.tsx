'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        {/* Card */}
        <div className="bg-white border border-[#E0E0E0] rounded-admin p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <p className="font-sans font-medium text-sm text-neutral-800 mb-0.5">
              The Vale
            </p>
            <p className="font-sans text-xs text-neutral-400 uppercase tracking-label">
              Admin Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-sans font-semibold text-xs uppercase tracking-label text-neutral-500 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#F8F8F8] border border-[#E0E0E0] rounded-admin px-3 py-2 font-sans text-sm text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-neutral-400"
                placeholder="admin@valevenue.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block font-sans font-semibold text-xs uppercase tracking-label text-neutral-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#F8F8F8] border border-[#E0E0E0] rounded-admin px-3 py-2 font-sans text-sm text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-neutral-400"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-rust-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-800 text-neutral-50 font-sans font-semibold text-xs uppercase tracking-btn py-3 rounded-sharp hover:bg-neutral-700 transition-colors active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
