import { Button } from '@/components/ui/Button'

export default function ClosingCTA() {
  return (
    <section className="bg-neutral-800 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto text-center">
        <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
          Schedule a tour
        </p>
        <h2 className="font-serif font-semibold text-4xl text-neutral-50 tracking-tightest mb-6">
          You know the price. Come see the{' '}
          <em className="italic text-gold-300">space</em>.
        </h2>
        <p className="font-sans font-regular text-md text-neutral-50 opacity-70 max-w-md mx-auto mb-10">
          Tours by appointment, Monday through Saturday. Bobbi will walk you
          through — no pressure, no sales pitch.
        </p>

        {/* Bobbi attribution */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full ring-1 ring-gold-400/40 bg-neutral-700 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-base text-gold-300 select-none">B</span>
          </div>
          <p className="font-sans font-regular text-sm text-neutral-50 opacity-50">
            Every inquiry goes directly to Bobbi. Typical reply: same day.
          </p>
        </div>

        <Button href="/contact" variant="gold" size="lg">
          Book the Space
        </Button>
      </div>
    </section>
  )
}
