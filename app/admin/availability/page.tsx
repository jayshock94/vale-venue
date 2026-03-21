import { createClient } from '@/lib/supabase/server'
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar'

export const metadata = {
  title: 'Availability — Admin',
}

interface AvailabilityRecord {
  id?: string
  date: string
  status: 'available' | 'booked' | 'blocked'
  note?: string
}

export default async function AvailabilityPage() {
  let availability: AvailabilityRecord[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('availability')
      .select('*')
      .order('date')
    if (data) availability = data
  } catch {
    // Fall through
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
          Availability
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Click dates to cycle through: available → booked → blocked.
        </p>
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded-admin p-6">
        <AvailabilityCalendar initialData={availability} />
      </div>
    </div>
  )
}
