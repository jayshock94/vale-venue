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

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 text-neutral-400" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 text-neutral-400" aria-hidden="true">
      <path d="M2 3a1 1 0 0 1 1-1h2.5l1 3-1.5 1a8 8 0 0 0 3 3l1-1.5 3 1V11a1 1 0 0 1-1 1C6 12 2 7.5 2 3z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 text-neutral-400" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 4.5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 text-neutral-400" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="11" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 7h13M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; dateTo?: string }>
}) {
  const { date, dateTo } = await searchParams
  return (
    <>
      <Nav />
      <main className="flex-1 pb-24 md:pb-0">

        {/* Two-column body — form visible on load, no hero re-introduction */}
        <section className="bg-neutral-50 pt-32 pb-section px-5 md:px-page">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 md:gap-20 items-start">

              {/* Left — heading + Bobbi + contact details */}
              <div className="order-1 md:order-1">

                {/* Page heading */}
                <div className="mb-10">
                  <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
                    Get in touch
                  </p>
                  <h1 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest mb-3">
                    Tell us about your{' '}
                    <em className="italic text-gold-600">event</em>.
                  </h1>
                  <p className="font-sans font-regular text-base text-neutral-500">
                    No runaround. Pricing is on the site. This goes straight to Bobbi.
                  </p>
                </div>

                {/* Bobbi block */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-5">
                    {/* Monogram avatar — gold ring, serif initial */}
                    <div className="w-14 h-14 rounded-full ring-2 ring-gold-400 ring-offset-2 ring-offset-neutral-50 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-xl text-gold-600 select-none">B</span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-base text-neutral-800">Bobbi</p>
                      <p className="font-sans font-regular text-sm text-neutral-500">Owner · The Vale</p>
                    </div>
                  </div>

                  <p className="font-sans font-regular text-base text-neutral-600 leading-relaxed mb-4">
                    Every inquiry comes directly to me. I&apos;ll read what you send, check the date,
                    and give you a real answer. Not a form reply.
                  </p>

                  <p className="font-sans font-medium text-sm text-gold-600">
                    Typical response: same day or next morning.
                  </p>
                </div>

                {/* Contact details */}
                <div className="border-t border-rule pt-8 flex flex-col gap-6">

                  <div className="flex items-start gap-3">
                    <LocationIcon />
                    <div>
                      <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                        Address
                      </p>
                      <address className="not-italic font-sans font-regular text-base text-neutral-800 leading-relaxed">
                        1078 South 250 East<br />
                        Provo, Utah 84606
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneIcon />
                    <div>
                      <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:8015926287"
                        className="font-sans font-regular text-base text-neutral-800 hover:text-gold-600 transition-colors duration-[var(--transition-fast)]"
                      >
                        801-592-6287
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <EmailIcon />
                    <div>
                      <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:bobbi@valevenue.com"
                        className="font-sans font-regular text-base text-neutral-800 hover:text-gold-600 transition-colors duration-[var(--transition-fast)]"
                      >
                        bobbi@valevenue.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarIcon />
                    <div>
                      <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                        Tours
                      </p>
                      <p className="font-sans font-regular text-base text-neutral-800 leading-relaxed">
                        By appointment<br />
                        Monday through Saturday
                      </p>
                    </div>
                  </div>


                </div>
              </div>

              {/* Right — Form card */}
              <div className="order-2 md:order-2 card-warm-glass rounded-soft px-5 py-8 md:px-8 md:py-10">
                <ContactForm defaultDate={date} defaultEndDate={dateTo} />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Mobile sticky tap-to-call */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-white/10 px-5 py-3 z-50">
        <Link
          href="tel:8015926287"
          className="flex items-center justify-center gap-3 w-full h-12 bg-gold-400 rounded-sharp font-sans font-semibold text-sm uppercase tracking-btn text-neutral-800"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call Bobbi · 801-592-6287
        </Link>
      </div>

      <Footer />
    </>
  )
}
