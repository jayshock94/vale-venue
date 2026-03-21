import { createClient } from '@/lib/supabase/server'
import InquiriesTable from '@/components/admin/InquiriesTable'
import type { Inquiry } from '@/components/admin/InquiriesTable'

export const metadata = {
  title: 'Inquiries — Admin',
}

export default async function InquiriesPage() {
  let inquiries: Inquiry[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) inquiries = data
  } catch {
    // Fall through
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
          Inquiries
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          All venue inquiries. Click a row to expand and update status.
        </p>
      </div>
      <InquiriesTable initialInquiries={inquiries} />
    </div>
  )
}
