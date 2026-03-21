import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your event. No runaround. Pricing is on the site. This goes straight to Bobbi.',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Page hero */}
        <section className="bg-neutral-800 pt-32 pb-20 px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
              Get in touch
            </p>
            <h1 className="font-serif text-5xl text-neutral-50 tracking-tightest mb-6 max-w-xl">
              Tell us about your <em className="italic text-gold-300">event</em>.
            </h1>
            <p className="font-sans font-light text-md text-neutral-50 opacity-70 max-w-md">
              No runaround. Pricing is on the site. This goes straight to Bobbi.
            </p>
          </div>
        </section>

        {/* Two-column section */}
        <section className="bg-neutral-50 py-section px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

              {/* Left: Bobbi intro + contact details */}
              <div>
                {/* Bobbi intro */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Photo placeholder — replace with real photo */}
                    <div className="w-14 h-14 rounded-full bg-neutral-200 flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-base text-neutral-800">Bobbi</p>
                      <p className="font-sans font-light text-sm text-neutral-500">Owner · The Vale</p>
                    </div>
                  </div>
                  <p className="font-sans font-light text-base text-neutral-600 leading-relaxed">
                    Every inquiry comes directly to me. I&apos;ll read what you send, look at the date,
                    and give you a real answer — not a form reply. I respond within one business day.
                  </p>
                </div>

                {/* Response time callout */}
                <div className="border-l-2 border-gold-400 pl-4 mb-10">
                  <p className="font-sans font-light text-sm text-neutral-500">
                    Typical response: same business day or next morning.
                  </p>
                </div>

                <div className="border-t border-rule pt-8 mb-10">
                  <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                    Address
                  </p>
                  <address className="not-italic font-sans font-light text-base text-neutral-800">
                    1078 South 250 East
                    <br />
                    Provo, Utah 84606
                  </address>
                </div>

                <div className="mb-10">
                  <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:8015926287"
                    className="font-sans font-light text-base text-neutral-800 hover:text-gold-600 transition-colors"
                  >
                    801-592-6287
                  </a>
                </div>

                <div className="mb-10">
                  <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:bobbi@valevenue.com"
                    className="font-sans font-light text-base text-neutral-800 hover:text-gold-600 transition-colors"
                  >
                    bobbi@valevenue.com
                  </a>
                </div>

                <div>
                  <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                    Tours
                  </p>
                  <p className="font-sans font-light text-base text-neutral-800">
                    By appointment
                    <br />
                    Monday through Saturday
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile sticky tap-to-call bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-white/10 px-5 py-3 z-50">
        <Link
          href="tel:8015926287"
          className="flex items-center justify-center gap-3 w-full h-12 bg-gold-400 rounded-button font-sans font-semibold text-sm uppercase tracking-btn text-neutral-800"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Call Bobbi · 801-592-6287
        </Link>
      </div>

      <Footer />
    </>
  )
}
