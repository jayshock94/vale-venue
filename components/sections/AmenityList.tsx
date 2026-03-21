'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

interface Amenity {
  id: string
  label: string
  icon: React.ReactNode
  headline: string
  detail: string
}

function KitchenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 9V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 2v3M8 2v3M12 2v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function MirrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <ellipse cx="8" cy="6.5" rx="4" ry="5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 11.5v3M6 14.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function SuiteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 5.5h2.5l4-3v11l-4-3H3V5.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M11 5a3 3 0 0 1 0 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function TableIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 5h12M5 5v7M11 5v7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function ParkingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 11V5h3a2 2 0 0 1 0 4H6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ViewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function ClimateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M11.36 4.64l-1.42 1.42M4.22 11.78l-1.42 1.42" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

const amenities: Amenity[] = [
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <KitchenIcon />,
    headline: 'Full kitchen & prep area',
    detail: 'Commercial-grade prep surfaces, refrigeration, and counter workspace. Bring any caterer you like — we provide the infrastructure, they bring the skill. No catering exclusivity.',
  },
  {
    id: 'bride-suite',
    label: 'Bride suite',
    icon: <MirrorIcon />,
    headline: 'Bride vanity & dressing suite',
    detail: 'Private room with full-length mirror, vanity lighting, and comfortable seating for your bridal party. Get ready on-site and arrive to your reception already calm.',
  },
  {
    id: 'groom-suite',
    label: 'Groom suite',
    icon: <SuiteIcon />,
    headline: 'Groom suite & dressing area',
    detail: 'A separate, quiet space for the groom and groomsmen — own entrance, own mirror, own seating. No hallway crossings before the ceremony.',
  },
  {
    id: 'av',
    label: 'AV system',
    icon: <SpeakerIcon />,
    headline: 'Built-in audio + visual',
    detail: 'In-ceiling speakers throughout, wireless microphone inputs, and HDMI display connectivity. Plug in your playlist, run a slideshow, or connect a DJ — the room is wired for it.',
  },
  {
    id: 'tables',
    label: 'Tables & chairs',
    icon: <TableIcon />,
    headline: 'Tables & chairs for 100',
    detail: 'Round banquet tables and cushioned chairs for up to 100 guests, included in every package. Standard layouts available — or tell us how you want the room arranged.',
  },
  {
    id: 'parking',
    label: 'Free parking',
    icon: <ParkingIcon />,
    headline: 'On-site parking for 40+ vehicles',
    detail: 'Surface lot with 40+ spaces, free for all guests. Three miles from the Provo Temple — straightforward for anyone arriving straight from a ceremony.',
  },
  {
    id: 'views',
    label: 'Mountain views',
    icon: <ViewIcon />,
    headline: 'Floor-to-ceiling Wasatch views',
    detail: 'The west wall is nearly all glass. The Wasatch Mountains are the backdrop — no decoration required. Best during golden hour, which lines up well with most reception timelines.',
  },
  {
    id: 'climate',
    label: 'Climate control',
    icon: <ClimateIcon />,
    headline: 'Full climate control',
    detail: 'Independent HVAC throughout the venue. Comfortable in Utah summers and winters alike. You set the temperature — no fighting with a building manager.',
  },
]

export default function AmenityList() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeAmenity = amenities.find((a) => a.id === activeId) ?? null

  function handleChip(id: string) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="bg-neutral-50 py-section px-5 md:px-page border-t border-rule">
      <div className="max-w-content mx-auto">
        <SectionHeader
          eyebrow="What's included"
          headline={
            <>
              Everything you <em className="italic text-gold-600">need</em>.
            </>
          }
          body="Every package includes all of the below — no add-on fees."
        />

        {/* Chip grid */}
        <div className="flex flex-wrap gap-2.5">
          {amenities.map((amenity) => {
            const active = activeId === amenity.id
            return (
              <button
                key={amenity.id}
                onClick={() => handleChip(amenity.id)}
                aria-expanded={active}
                aria-controls={`amenity-detail-${amenity.id}`}
                className={cn(
                  'flex items-center gap-2 px-[18px] rounded-full border',
                  'font-sans font-medium text-[length:var(--text-13)]',
                  'transition-all duration-[var(--transition-fast)]',
                  'h-[var(--amenity-chip-height)]',
                  active
                    ? 'bg-[var(--amenity-chip-bg-active)] border-[var(--amenity-chip-border-active)] text-neutral-800'
                    : 'bg-transparent border-rule text-neutral-600 hover:border-neutral-400 hover:text-neutral-800'
                )}
              >
                <span
                  className={cn(
                    'flex-shrink-0 transition-colors duration-[var(--transition-fast)]',
                    active ? 'text-[var(--amenity-chip-icon-active)]' : 'text-neutral-400'
                  )}
                >
                  {amenity.icon}
                </span>
                {amenity.label}
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div
          className={cn(
            'mt-4 overflow-hidden transition-all duration-[var(--transition-slow)]',
            activeAmenity ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{ minHeight: activeAmenity ? undefined : 0 }}
        >
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              id={`amenity-detail-${amenity.id}`}
              role="region"
              aria-label={amenity.label}
              className={cn(
                'bg-neutral-0 border border-rule-light rounded-soft px-6 py-5',
                'flex items-start gap-4',
                activeId === amenity.id ? 'block' : 'hidden'
              )}
            >
              <span className="text-gold-500 flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center">
                {amenity.icon}
              </span>
              <div>
                <p className="font-sans font-semibold text-[length:var(--text-15)] text-neutral-800">
                  {amenity.headline}
                </p>
                <p className="font-sans font-light text-[length:var(--text-14)] text-neutral-500 mt-1 leading-relaxed">
                  {amenity.detail}
                </p>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="ml-auto flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors duration-[var(--transition-fast)] p-1 -mr-1"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Catering note */}
        <p className="mt-10 pt-8 border-t border-rule font-sans font-light text-sm text-neutral-500">
          <span className="font-medium text-neutral-700">Catering:</span>{' '}
          Your caterer, your choice. We provide the kitchen — who cooks is entirely up to you.
        </p>
      </div>
    </section>
  )
}
