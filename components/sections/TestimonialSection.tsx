interface Testimonial {
  id?: string
  quote: string
  attribution: string
  event_type?: string
  event_date?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'We walked in and just knew. The space, the light, those mountains right outside the windows. We stopped looking at other venues that same afternoon.',
    attribution: 'Sarah & James, Wedding, June 2024',
  },
  {
    quote:
      'Clean, professional, and completely effortless. Our company retreat felt elevated without being over the top.',
    attribution: 'Marcus T., Corporate Retreat, March 2024',
  },
  {
    quote:
      'I cannot believe how the photos turned out. The mountains in the background make every single shot. Our guests are still talking about it.',
    attribution: 'Priya & Aiden, Wedding Reception, September 2024',
  },
]

interface TestimonialSectionProps {
  testimonials?: Testimonial[]
}

export default function TestimonialSection({
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) {
  const [featured, ...rest] = testimonials.length > 0 ? testimonials : defaultTestimonials
  const stripTestimonials = rest.slice(0, 2)

  return (
    <section className="bg-neutral-800 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto">
        {/* Eyebrow + header */}
        <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-300 mb-4">
          What people say
        </p>
        <h2 className="font-serif text-4xl text-neutral-50 tracking-tightest mb-16">
          We walked in and <em className="italic text-gold-300">knew</em>.
        </h2>

        {/* Featured testimonial */}
        {featured && (
          <div className="mb-12">
            <p className="font-serif text-6xl text-gold-400 opacity-30 leading-none mb-4 select-none">
              &ldquo;
            </p>
            <blockquote className="font-serif italic text-xl text-neutral-50 opacity-85 max-w-3xl">
              {featured.quote}
            </blockquote>
            <p className="font-sans text-xs uppercase tracking-stat text-neutral-400 mt-4">
              — {featured.attribution}
            </p>
          </div>
        )}

        {/* Divider */}
        {stripTestimonials.length > 0 && (
          <div className="border-t border-gold-400 opacity-30 mb-12" />
        )}

        {/* Strip testimonials */}
        {stripTestimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {stripTestimonials.map((t, i) => (
              <div key={i}>
                <blockquote className="font-serif italic text-lg text-neutral-50 opacity-70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="font-sans text-xs text-neutral-500 mt-3">
                  — {t.attribution}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Recognition strip — TODO: replace with real badge images once earned */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="font-sans font-light text-[10px] uppercase tracking-eyebrow text-neutral-600 mb-6 text-center">
            As recognized by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: 'Zola', award: 'Best of Zola 2025' },
              { name: 'The Knot', award: "The Knot Best of Weddings '25" },
              { name: 'WeddingWire', award: 'Couples\' Choice 2025' },
            ].map(({ name, award }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1.5 opacity-40"
              >
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="font-serif italic text-[11px] text-neutral-50 text-center leading-tight px-1">
                    {name}
                  </span>
                </div>
                <p className="font-sans font-light text-[10px] text-neutral-400 text-center max-w-[80px] leading-snug">
                  {award}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
