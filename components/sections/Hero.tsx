import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-800 flex items-end">
      {/* Background image */}
      {/* TODO: Replace with real venue photo from Supabase storage */}
      <Image
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
        alt="The Vale event space interior"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-5 md:px-page pb-20 pt-32">
        <div
          className="grid grid-cols-1 gap-12 md:gap-18"
          style={{ gridTemplateColumns: undefined }}
        >
          {/* Desktop asymmetric grid */}
          <div className="md:grid md:gap-18" style={{ gridTemplateColumns: '1fr 320px' }}>
            {/* Left: headline */}
            <div className="flex flex-col justify-end">
              <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
                Provo, Utah · Wasatch Mountains
              </p>
              <h1 className="font-serif text-5xl md:text-6xl text-neutral-50 tracking-tightest leading-tight">
                Clean lines. Mountain{' '}
                <em className="italic text-gold-300">backdrop</em>. Everything
                else is yours.
              </h1>
            </div>

            {/* Right: sub-copy + CTAs */}
            <div className="flex flex-col justify-end gap-8 mt-10 md:mt-0">
              <p className="font-sans font-light text-md text-neutral-50 opacity-80">
                Floor-to-ceiling windows. A modern building set against the
                Wasatch mountains. Weddings, corporate events, and private
                celebrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="gold" size="lg">
                  Book the Space
                </Button>
                <Button href="/availability" variant="ink" size="lg">
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
