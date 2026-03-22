import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-800 flex items-end">
      {/* Background image */}
      <Image
        src="/photos/gallery/vale outside photo.png"
        alt="The Vale exterior — modern white building with the Wasatch mountains behind it"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-5 md:px-page pb-12 md:pb-20 pt-32">
        <div
          className="grid grid-cols-1 gap-12 md:gap-18"
          style={{ gridTemplateColumns: undefined }}
        >
          {/* Desktop asymmetric grid */}
          <div className="md:grid md:gap-18" style={{ gridTemplateColumns: '1fr 320px' }}>
            {/* Left: headline */}
            <div className="flex flex-col justify-end">
              <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-4">
                Provo, Utah
              </p>
              <h1 className="font-serif font-semibold text-5xl md:text-6xl text-neutral-50 tracking-tightest leading-tight">
                Elevate your event.
              </h1>
            </div>

            {/* Right: sub-copy + CTAs */}
            <div className="flex flex-col justify-end gap-5 md:gap-8 mt-5 md:mt-0">
              <p className="font-sans font-regular text-md text-neutral-50 opacity-80">
                A sleek, modern venue nestled at the base of the Wasatch Mountains.
              </p>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3">
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
