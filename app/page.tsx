import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import EventCards from '@/components/sections/EventCards'
import TestimonialSection from '@/components/sections/TestimonialSection'
import PricingTable from '@/components/sections/PricingTable'
import AmenityList from '@/components/sections/AmenityList'
import ClosingCTA from '@/components/sections/ClosingCTA'
import type { PricingPackage } from '@/components/sections/PricingTable'

export const metadata: Metadata = {
  title: 'The Vale — Modern Event Venue in Provo, Utah',
  description:
    'Floor-to-ceiling windows. The Wasatch mountains behind you. A modern event space in Provo, Utah for weddings, corporate events, and private celebrations. Starting at $300.',
}

interface Testimonial {
  id: string
  quote: string
  attribution: string
  event_type?: string
  event_date?: string
}

export default async function Home() {
  let packages: PricingPackage[] = []
  let testimonials: Testimonial[] = []

  try {
    const supabase = await createClient()

    const [packagesResult, testimonialsResult] = await Promise.all([
      supabase
        .from('pricing_packages')
        .select('*')
        .eq('active', true)
        .order('sort_order'),
      supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('sort_order'),
    ])

    if (packagesResult.data) packages = packagesResult.data
    if (testimonialsResult.data) testimonials = testimonialsResult.data
  } catch {
    // Fall through to component defaults
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <EventCards />
        <TestimonialSection testimonials={testimonials} />
        <PricingTable packages={packages} />
        <AmenityList />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
