'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

interface InquiryData {
  full_name: string
  email: string
  event_type: string
  guest_count: string
  desired_date: string
  message: string
}

interface SubmitResult {
  success: boolean
  error?: string
}

export async function submitInquiry(data: InquiryData): Promise<SubmitResult> {
  try {
    const cookieStore = await cookies()

    // Use service role key for writes to bypass RLS
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Server component — safe to ignore
            }
          },
        },
      }
    )

    const { error } = await supabase.from('inquiries').insert({
      full_name: data.full_name.trim(),
      email: data.email.trim().toLowerCase(),
      event_type: data.event_type,
      guest_count: data.guest_count || null,
      desired_date: data.desired_date || null,
      message: data.message.trim(),
      status: 'new',
    })

    if (error) {
      return { success: false, error: 'Failed to submit. Please try again.' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit. Please try again.' }
  }
}
