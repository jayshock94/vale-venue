import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PublicCalendar from '@/components/sections/PublicCalendar'
import ClosingCTA from '@/components/sections/ClosingCTA'
import type { CalendarAvailability } from '@/components/sections/PublicCalendar'

export const metadata: Metadata = {
  title: 'Availability',
  description:
    'Check open dates at The Vale event venue in Provo, Utah. Select a date to start your reservation.',
}

export default async function AvailabilityPage() {
  let availability: CalendarAvailability[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('availability')
      .select('date, status')
      .order('date')
    if (data) availability = data
  } catch {
    // Fall through to calendar defaults
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Page hero */}
        <section className="bg-neutral-800 pt-32 pb-20 px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
              Check availability
            </p>
            <h1 className="font-serif text-5xl text-neutral-50 tracking-tightest mb-6 max-w-xl">
              Find your{' '}
              <em className="italic text-gold-300">date</em>.
            </h1>
            <p className="font-sans font-regular text-md text-neutral-50 opacity-70 max-w-md">
              Tap a date to start your reservation. Saturdays book fast — if you see your date open, reach out now.
            </p>
          </div>
        </section>

        <PublicCalendar availability={availability} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
