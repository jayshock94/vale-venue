import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface EventCard {
  eyebrow: string
  titleStart: string
  titleItalic: string
  body: string
  image: string
  imageAlt: string
  cta: string
  href: string
}

const weddingCard: EventCard = {
  eyebrow: 'Weddings & Receptions',
  titleStart: 'Weddings &',
  titleItalic: 'Receptions',
  body: 'The temple ceremony is yours. The reception — where every guest celebrates together — happens here. Three miles from the Provo Temple, with dedicated bride and groom suites, mountain views, and parking for everyone who waited outside.',
  image: 'https://images.unsplash.com/photo-1763553113332-800519753e40?w=800&q=80',
  imageAlt: 'Wedding reception setup at The Vale',
  cta: 'See wedding photos',
  href: '/gallery?category=weddings',
}

const corporateCard: EventCard = {
  eyebrow: 'Corporate',
  titleStart: 'Corporate',
  titleItalic: 'Events',
  body: 'Clean, modern space with full AV. Comfortable for 20, manageable for 100. Half-day packages work well for retreats that don\'t need a full day.',
  image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
  imageAlt: 'Corporate event setup at The Vale',
  cta: 'See corporate photos',
  href: '/gallery?category=corporate',
}

const celebrationCard: EventCard = {
  eyebrow: 'Celebrations',
  titleStart: 'Private',
  titleItalic: 'Celebrations',
  body: 'Every milestone deserves a space that doesn\'t feel rented. High ceilings, real kitchen, mountain view. Birthdays, anniversaries, and small gatherings — ask about short-form blocks for groups under 50.',
  image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  imageAlt: 'Private celebration at The Vale',
  cta: 'See celebration photos',
  href: '/gallery?category=celebrations',
}

function EventCardLarge({ card }: { card: EventCard }) {
  return (
    // h-full fills the grid cell — matches the combined height of the two stacked right cards
    <div className="card-warm-glass rounded-soft overflow-hidden flex flex-col h-full">
      {/* TODO: Replace with real venue photo from Supabase storage */}
      {/* flex-1 lets the image grow to fill remaining space after the content area */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div className="px-6 py-5 flex flex-col gap-3">
        <p className="text-2xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600">
          {card.eyebrow}
        </p>
        <h3 className="font-sans font-medium text-xl text-neutral-800">
          {card.titleStart}{' '}
          <em className="font-serif italic text-gold-600">
            {card.titleItalic}
          </em>
        </h3>
        <p className="font-sans font-light text-base text-neutral-500">
          {card.body}
        </p>
      </div>
      {/* component.event-card CTA row — separated by border-top rule */}
      <div className="border-t border-rule-light px-6 py-3">
        <Link
          href={card.href}
          className="font-sans font-semibold text-2xs uppercase tracking-btn text-gold-600 hover:text-gold-500 transition-colors duration-fast"
        >
          {card.cta} →
        </Link>
      </div>
    </div>
  )
}

function EventCardSmall({ card }: { card: EventCard }) {
  return (
    <div className="card-warm-glass rounded-soft overflow-hidden flex flex-col">
      {/* TODO: Replace with real venue photo from Supabase storage */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div className="px-6 py-5 flex flex-col gap-2">
        <p className="text-2xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600">
          {card.eyebrow}
        </p>
        <h3 className="font-sans font-medium text-xl text-neutral-800">
          {card.titleStart}{' '}
          <em className="font-serif italic text-gold-600" style={{ fontStyle: 'italic' }}>
            {card.titleItalic}
          </em>
        </h3>
        <p className="font-sans font-light text-base text-neutral-500">
          {card.body}
        </p>
      </div>
      {/* component.event-card CTA row */}
      <div className="mt-auto border-t border-rule-light px-6 py-3">
        <Link
          href={card.href}
          className="font-sans font-semibold text-2xs uppercase tracking-btn text-gold-600 hover:text-gold-500 transition-colors duration-fast"
        >
          {card.cta} →
        </Link>
      </div>
    </div>
  )
}

export default function EventCards() {
  return (
    <section className="bg-neutral-50 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto">
        <SectionHeader
          eyebrow="Provo, Utah · Wasatch Mountains"
          headline={
            <>
              Every kind of{' '}
              <em className="italic text-gold-600">occasion</em>.
            </>
          }
          body="From weddings to corporate retreats. The space works because it gets out of the way."
        />

        {/* Mobile layout */}
        <div className="flex flex-col gap-4 md:hidden">
          <EventCardLarge card={weddingCard} />
          <EventCardSmall card={corporateCard} />
          <EventCardSmall card={celebrationCard} />
        </div>

        {/* Desktop layout: asymmetric 1.8fr 1fr */}
        <div
          className="hidden md:grid gap-4"
          style={{ gridTemplateColumns: '1.8fr 1fr' }}
        >
          <EventCardLarge card={weddingCard} />
          <div className="flex flex-col gap-4">
            <EventCardSmall card={corporateCard} />
            <EventCardSmall card={celebrationCard} />
          </div>
        </div>
      </div>
    </section>
  )
}
