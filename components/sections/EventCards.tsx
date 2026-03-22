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
  imagePosition?: string
  cta: string
  href: string
}

const weddingCard: EventCard = {
  eyebrow: 'Weddings & Receptions',
  titleStart: 'Weddings &',
  titleItalic: 'Receptions',
  body: 'Three miles from the Provo City Center Temple. Dedicated bride and groom suites, mountain views, and parking for everyone who came.',
  image: '/photos/events-wedding.png',
  imageAlt: 'Couple kissing on The Vale mezzanine — black metal railing, wood panels, and flowing veil',
  imagePosition: 'center 28%',
  cta: 'See wedding photos',
  href: '/gallery?category=weddings',
}

const celebrationCard: EventCard = {
  eyebrow: 'Celebrations',
  titleStart: 'Private',
  titleItalic: 'Celebrations',
  body: 'High ceilings, real kitchen, open dance floor, mountain view. Short blocks from $300.',
  image: '/photos/events-celebration.png',
  imageAlt: 'Family gender reveal at The Vale — confetti and celebration in the open floor space',
  imagePosition: 'center 60%',
  cta: 'See celebration photos',
  href: '/gallery?category=celebrations',
}

const communityCard: EventCard = {
  eyebrow: 'Community & Social',
  titleStart: 'Community &',
  titleItalic: 'Social Events',
  body: 'Seats 100. Works for vendor markets, ticketed events, and everything in between.',
  image: '/photos/events-community.png',
  imageAlt: 'ClubMommy Utah at The Vale — full venue with round tables and 100 guests',
  cta: 'See community photos',
  href: '/gallery?category=community-social',
}

function EventCardLarge({ card }: { card: EventCard }) {
  return (
    // h-full fills the grid cell — matches the combined height of the two stacked right cards
    <div className="card-warm-glass rounded-soft overflow-hidden flex flex-col h-full">
      {/* flex-1 lets the image grow to fill remaining space after the content area; min-h-64 ensures it has height on mobile where no fixed parent height exists */}
      <div className="relative flex-1 min-h-64 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          priority
          className="object-cover scale-[1.12]"
          style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div className="px-6 py-5 flex flex-col gap-3">
        <h3 className="font-sans font-medium text-xl text-neutral-800">
          {card.titleStart}{' '}
          <em className="font-serif font-semibold italic text-gold-600">
            {card.titleItalic}
          </em>
        </h3>
        <p className="font-sans font-regular text-base text-neutral-500">
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
      <div className="relative h-44 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover scale-[1.12]"
          style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div className="px-6 py-5 flex flex-col gap-2">
        <h3 className="font-sans font-medium text-xl text-neutral-800">
          {card.titleStart}{' '}
          <em className="font-serif font-semibold italic text-gold-600">
            {card.titleItalic}
          </em>
        </h3>
        <p className="font-sans font-regular text-base text-neutral-500">
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
          eyebrow="Weddings · Celebrations · Community & Social"
          headline={
            <>
              Every kind of{' '}
              <em className="italic text-gold-600">occasion</em>.
            </>
          }
          body="From weddings to silent discos. The space works because it gets out of the way."
        />

        {/* Mobile layout */}
        <div className="flex flex-col gap-4 md:hidden">
          <EventCardLarge card={weddingCard} />
          <EventCardSmall card={celebrationCard} />
          <EventCardSmall card={communityCard} />
        </div>

        {/* Desktop layout: asymmetric 1.8fr 1fr */}
        <div
          className="hidden md:grid gap-4"
          style={{ gridTemplateColumns: '1.8fr 1fr' }}
        >
          <EventCardLarge card={weddingCard} />
          <div className="flex flex-col gap-4">
            <EventCardSmall card={celebrationCard} />
            <EventCardSmall card={communityCard} />
          </div>
        </div>
      </div>
    </section>
  )
}
