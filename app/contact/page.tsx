import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'

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
              {/* Contact info */}
              <div>
                <div className="mb-10">
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

                <div className="mb-10">
                  <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
                    Tours
                  </p>
                  <p className="font-sans font-light text-base text-neutral-800">
                    By appointment
                    <br />
                    Monday through Saturday
                  </p>
                </div>

                <div className="border-t border-rule pt-8">
                  <p className="font-sans font-light text-sm text-neutral-500">
                    Bobbi responds within one business day.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
