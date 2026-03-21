import Image from 'next/image'

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

// TODO: Replace href values with direct links to each individual Instagram post
const instagramPosts = [
  {
    id: 'post-1',
    src: '/instagram/ig-1.jpg',
    alt: 'Wedding reception at The Vale — white florals and geometric pendant lights',
  },
  {
    id: 'post-2',
    src: '/instagram/ig-2.jpg',
    alt: 'Wedding reception at The Vale — pink florals and candlelit round tables',
  },
  {
    id: 'post-3',
    src: '/instagram/ig-3.png',
    alt: 'Wedding ceremony at The Vale — couple at the altar',
  },
  {
    id: 'post-4',
    src: '/instagram/ig-4.png',
    alt: 'Bride portrait at The Vale — natural light through the windows',
  },
  {
    id: 'post-5',
    src: '/instagram/ig-5.jpg',
    alt: 'The Vale bar and prep area — marble counter with pendant lights',
  },
  {
    id: 'post-6',
    src: '/instagram/ig-6.png',
    alt: 'Birthday celebration at The Vale — balloon arch setup',
  },
]

const INSTAGRAM_URL = 'https://www.instagram.com/thevaleprovout/'
const INSTAGRAM_HANDLE = '@thevaleprovout'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

const badges = [
  { name: 'Zola', award: 'Best of Zola 2025' },
  { name: 'The Knot', award: "Best of Weddings '25" },
  { name: 'WeddingWire', award: "Couples' Choice 2025" },
]

interface TestimonialSectionProps {
  testimonials?: Testimonial[]
}

export default function TestimonialSection({
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) {
  const all = testimonials.length > 0 ? testimonials : defaultTestimonials
  const [featured, ...secondaries] = all

  return (
    <section className="bg-neutral-800 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-16 md:gap-20 items-start">

          {/* ── LEFT: Testimonials + Badges ── */}
          <div>
            <p className="font-sans font-semibold text-xs uppercase tracking-eyebrow text-gold-300 mb-8">
              What people say
            </p>

            {/* Featured quote */}
            {featured && (
              <div className="mb-10">
                <p className="font-serif text-5xl text-gold-400 opacity-20 leading-none mb-3 select-none">
                  &ldquo;
                </p>
                <blockquote className="font-serif italic text-2xl md:text-3xl text-neutral-50 leading-snug tracking-tightest">
                  {featured.quote}
                </blockquote>
                <p className="font-sans text-xs uppercase tracking-stat text-neutral-400 mt-5">
                  — {featured.attribution}
                </p>
              </div>
            )}

            {/* Secondary quotes */}
            {secondaries.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-6">
                {secondaries.map((t, i) => (
                  <div key={i} className="opacity-45">
                    <p className="font-serif italic text-sm text-neutral-200 leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-stat text-neutral-500 mt-2">
                      — {t.attribution}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Recognition strip — TODO: replace with real badge images once earned */}
            <div className="border-t border-white/10 mt-10 pt-8">
              <p className="font-sans font-light text-[10px] uppercase tracking-eyebrow text-neutral-600 mb-5">
                As recognized by
              </p>
              <div className="flex items-center gap-6 opacity-30">
                {badges.map(({ name, award }) => (
                  <div key={name} className="flex flex-col gap-1">
                    <span className="font-serif italic text-[11px] text-neutral-50 leading-tight">
                      {name}
                    </span>
                    <span className="font-sans font-light text-[10px] text-neutral-400 leading-snug">
                      {award}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Instagram ── */}
          <div>
            {/* Profile header */}
            <div className="flex items-center justify-between mb-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-gold-300 transition-colors duration-[var(--transition-fast)]"
              >
                <InstagramIcon />
                <span className="font-sans font-medium text-xs text-neutral-300">
                  {INSTAGRAM_HANDLE}
                </span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-semibold text-[10px] uppercase tracking-btn text-neutral-500 hover:text-gold-300 transition-colors duration-[var(--transition-fast)]"
              >
                Follow →
              </a>
            </div>

            {/* Desktop: 2×3 image grid */}
            <div className="hidden md:grid grid-cols-2 gap-1.5">
              {instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden rounded-soft group"
                  aria-label={`View ${post.alt} on Instagram`}
                >
                  <Image
                    src={post.src}
                    alt={post.alt}
                    fill
                    className="object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
                    sizes="190px"
                  />
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-[var(--transition-default)] flex items-center justify-center">
                    <span className="text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-default)]">
                      <InstagramIcon />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden -mx-5">
              <div
                className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 snap-start overflow-hidden rounded-soft group"
                    style={{ width: '180px', height: '180px' }}
                    aria-label={`View ${post.alt} on Instagram`}
                  >
                    <Image
                      src={post.src}
                      alt={post.alt}
                      fill
                      className="object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
                      sizes="180px"
                    />
                    <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-[var(--transition-default)] flex items-center justify-center">
                      <span className="text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-default)]">
                        <InstagramIcon />
                      </span>
                    </div>
                  </a>
                ))}

                {/* View all card */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 snap-start rounded-soft border border-white/10 hover:border-gold-400/40 transition-colors duration-[var(--transition-fast)] flex flex-col items-center justify-center gap-3"
                  style={{ width: '180px', height: '180px' }}
                >
                  <span className="text-neutral-500">
                    <InstagramIcon />
                  </span>
                  <p className="font-sans font-medium text-[10px] uppercase tracking-btn text-neutral-500 text-center px-4">
                    View all on Instagram
                  </p>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
