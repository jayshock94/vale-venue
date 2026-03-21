import { Button } from '@/components/ui/Button'

export default function ClosingCTA() {
  return (
    <section className="bg-neutral-800 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto text-center">
        <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-6">
          Schedule a tour
        </p>
        <h2 className="font-serif text-4xl text-neutral-50 tracking-tightest mb-6">
          Ready to see the <em className="italic text-gold-300">space</em>?
        </h2>
        <p className="font-sans font-light text-md text-neutral-50 opacity-70 max-w-md mx-auto mb-10">
          Tours by appointment, Monday through Saturday. The space is
          available — come see it.
        </p>
        <Button href="/contact" variant="gold" size="lg">
          Book the Space
        </Button>
      </div>
    </section>
  )
}
