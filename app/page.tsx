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
import FaqAccordion from '@/components/sections/FaqAccordion'
import VendorList from '@/components/sections/VendorList'
import ClosingCTA from '@/components/sections/ClosingCTA'
import type { PricingPackage } from '@/components/sections/PricingTable'
import type { Faq } from '@/components/sections/FaqAccordion'

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
  let faqs: Faq[] = []

  try {
    const supabase = await createClient()

    const [packagesResult, testimonialsResult, faqsResult] = await Promise.all([
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
      supabase
        .from('faqs')
        .select('*')
        .eq('active', true)
        .order('sort_order'),
    ])

    if (packagesResult.data) packages = packagesResult.data
    if (testimonialsResult.data) testimonials = testimonialsResult.data
    if (faqsResult.data) faqs = faqsResult.data
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
        <VendorList />
        {/* FAQ — catering policy + common questions surfaced before closing CTA */}
        <section className="bg-neutral-50 py-section px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
              <div>
                <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
                  Before you ask
                </p>
                <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest">
                  Good <em className="italic text-gold-600">questions</em>.
                </h2>
              </div>
              <p className="font-sans font-regular text-md text-neutral-500 mt-4 md:mt-0 flex items-end">
                The answers people want before they pick up the phone.
              </p>
            </div>
            <div className="mt-12">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
