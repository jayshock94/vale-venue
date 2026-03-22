import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PricingTable from '@/components/sections/PricingTable'
import AmenityList from '@/components/sections/AmenityList'
import VendorList from '@/components/sections/VendorList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import ClosingCTA from '@/components/sections/ClosingCTA'
import type { PricingPackage } from '@/components/sections/PricingTable'
import type { Faq } from '@/components/sections/FaqAccordion'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for The Vale event venue in Provo, Utah. Half-day and full-day packages starting at $1,400. No quote requests.',
}

export default async function PricingPage() {
  let packages: PricingPackage[] = []
  let faqs: Faq[] = []

  try {
    const supabase = await createClient()
    const [packagesResult, faqsResult] = await Promise.all([
      supabase
        .from('pricing_packages')
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
    if (faqsResult.data) faqs = faqsResult.data
  } catch {
    // Fall through to defaults
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Page hero */}
        <section className="bg-neutral-800 pt-32 pb-20 px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
              Transparent pricing
            </p>
            <h1 className="font-serif font-semibold text-5xl text-neutral-50 tracking-tightest mb-6 max-w-xl">
              Pricing that makes{' '}
              <em className="italic text-gold-300">sense</em>.
            </h1>
            <p className="font-sans font-regular text-md text-neutral-50 opacity-70 max-w-md">
              Half-day and full-day packages. Every price is on the page. No
              quote requests.
            </p>
          </div>
        </section>

        <PricingTable packages={packages} hideHeader />
        <AmenityList />
        <VendorList />

        {/* FAQ section */}
        <section className="bg-neutral-50 py-section px-5 md:px-page border-t border-rule">
          <div className="max-w-content mx-auto">
            <div className="mb-12">
              <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
                Common questions
              </p>
              <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest">
                Got <em className="italic text-gold-600">questions</em>?
              </h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
