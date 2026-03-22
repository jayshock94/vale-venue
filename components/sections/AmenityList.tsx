'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

// ─── Icons (chip) ────────────────────────────────────────────────────────────

function KitchenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 9V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 2v3M8 2v3M12 2v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
function MirrorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <ellipse cx="8" cy="6.5" rx="4" ry="5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 11.5v3M6 14.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
function SuiteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
function SpeakerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 5.5h2.5l4-3v11l-4-3H3V5.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M11 5a3 3 0 0 1 0 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
function TableIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 5h12M5 5v7M11 5v7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}
function ParkingIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 11V5h3a2 2 0 0 1 0 4H6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ViewIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}
function ClimateIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M11.36 4.64l-1.42 1.42M4.22 11.78l-1.42 1.42" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
function DanceFloorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="4" y="4" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <rect x="9" y="4" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <rect x="4" y="9" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <rect x="9" y="9" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

// ─── Detail graphics (SVG illustrations) ─────────────────────────────────────

function KitchenGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Counter */}
      <rect x="10" y="70" width="140" height="14" rx="2" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1.5" />
      <rect x="10" y="84" width="140" height="30" rx="2" fill="var(--color-gold-50)" stroke="var(--color-gold-200)" strokeWidth="1.25" />
      {/* Sink basin */}
      <rect x="30" y="74" width="36" height="8" rx="1.5" fill="var(--color-gold-50)" stroke="var(--color-gold-400)" strokeWidth="1.25" />
      {/* Faucet */}
      <path d="M48 74 L48 66 Q48 62 52 62 L60 62" stroke="var(--color-gold-500)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="62" r="3" fill="var(--color-gold-400)" />
      {/* Refrigerator */}
      <rect x="110" y="20" width="34" height="64" rx="3" fill="var(--color-gold-100)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <line x1="127" y1="20" x2="127" y2="84" stroke="var(--color-gold-300)" strokeWidth="1" />
      <rect x="115" y="36" width="8" height="14" rx="1" fill="var(--color-gold-300)" />
      <rect x="121" y="36" width="8" height="14" rx="1" fill="var(--color-gold-300)" />
      {/* Prep table */}
      <rect x="16" y="20" width="80" height="46" rx="3" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="1.5" />
      <line x1="16" y1="66" x2="96" y2="66" stroke="var(--color-gold-200)" strokeWidth="1" />
      {/* Legs */}
      <line x1="22" y1="66" x2="22" y2="80" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="90" y1="66" x2="90" y2="80" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BrideSuiteGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Vanity counter */}
      <rect x="10" y="72" width="140" height="8" rx="2" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1.25" />
      {/* Mirror 1 */}
      <rect x="18" y="20" width="30" height="50" rx="15" fill="var(--color-gold-50)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <rect x="22" y="24" width="22" height="42" rx="11" fill="var(--color-gold-100)" opacity="0.6" />
      {/* Mirror 2 */}
      <rect x="65" y="20" width="30" height="50" rx="15" fill="var(--color-gold-50)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <rect x="69" y="24" width="22" height="42" rx="11" fill="var(--color-gold-100)" opacity="0.6" />
      {/* Mirror 3 */}
      <rect x="112" y="20" width="30" height="50" rx="15" fill="var(--color-gold-50)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <rect x="116" y="24" width="22" height="42" rx="11" fill="var(--color-gold-100)" opacity="0.6" />
      {/* Sconce lights */}
      <circle cx="50" cy="44" r="4" fill="var(--color-gold-300)" opacity="0.9" />
      <circle cx="97" cy="44" r="4" fill="var(--color-gold-300)" opacity="0.9" />
      {/* Vanity items */}
      <circle cx="35" cy="70" r="4" fill="var(--color-gold-300)" stroke="var(--color-gold-500)" strokeWidth="1" />
      <rect x="55" y="65" width="6" height="7" rx="1" fill="var(--color-gold-400)" />
      {/* Chair */}
      <ellipse cx="80" cy="100" rx="16" ry="8" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1.25" />
      <line x1="68" y1="100" x2="68" y2="112" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="92" y1="100" x2="92" y2="112" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function AVGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Screen */}
      <rect x="20" y="10" width="120" height="76" rx="4" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="2" />
      <rect x="28" y="18" width="104" height="60" rx="2" fill="var(--color-gold-100)" />
      {/* Projector beam */}
      <path d="M80 86 L50 110 L110 110 Z" fill="var(--color-gold-100)" opacity="0.6" />
      {/* Stand */}
      <line x1="80" y1="86" x2="80" y2="100" stroke="var(--color-gold-400)" strokeWidth="2" />
      <line x1="60" y1="100" x2="100" y2="100" stroke="var(--color-gold-400)" strokeWidth="2" strokeLinecap="round" />
      {/* Speaker dots */}
      <circle cx="38" cy="48" r="10" fill="none" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <circle cx="38" cy="48" r="4" fill="var(--color-gold-300)" />
      <circle cx="122" cy="48" r="10" fill="none" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <circle cx="122" cy="48" r="4" fill="var(--color-gold-300)" />
      {/* Mic */}
      <rect x="74" y="32" width="12" height="18" rx="6" fill="none" stroke="var(--color-gold-500)" strokeWidth="1.5" />
      <path d="M68 46c0 6.63 5.37 12 12 12s12-5.37 12-12" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="80" y1="58" x2="80" y2="64" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ClimateGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sun */}
      <circle cx="46" cy="60" r="16" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <path d="M46 36v6M46 78v6M22 60h6M64 60h6M30.1 44.1l4.2 4.2M57.7 71.7l4.2 4.2M30.1 75.9l4.2-4.2M57.7 48.3l4.2-4.2" stroke="var(--color-gold-500)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Snowflake */}
      <line x1="114" y1="36" x2="114" y2="84" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="90" y1="60" x2="138" y2="60" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="97.9" y1="43.9" x2="130.1" y2="76.1" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130.1" y1="43.9" x2="97.9" y2="76.1" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center dots */}
      <circle cx="114" cy="60" r="5" fill="var(--color-gold-300)" />
      <circle cx="114" cy="40" r="3" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" />
      <circle cx="114" cy="80" r="3" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" />
      <circle cx="94" cy="60" r="3" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" />
      <circle cx="134" cy="60" r="3" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" />
      {/* Dividing line */}
      <line x1="80" y1="20" x2="80" y2="100" stroke="var(--color-gold-200)" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  )
}

function ViewsGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Window frame */}
      <rect x="12" y="12" width="136" height="96" rx="3" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="2" />
      {/* Sky */}
      <rect x="14" y="14" width="132" height="60" rx="2" fill="#dbeafe" opacity="0.4" />
      {/* Mountains */}
      <path d="M12 80 L40 38 L68 72 L90 50 L120 80 L148 55 L148 108 L12 108 Z" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 90 L35 68 L55 85 L80 62 L105 85 L130 68 L148 78 L148 108 L12 108 Z" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" strokeLinejoin="round" />
      {/* Window cross */}
      <line x1="80" y1="12" x2="80" y2="108" stroke="var(--color-gold-300)" strokeWidth="2" />
      <line x1="12" y1="60" x2="148" y2="60" stroke="var(--color-gold-300)" strokeWidth="2" />
      {/* Sun */}
      <circle cx="120" cy="36" r="10" fill="var(--color-gold-300)" opacity="0.8" />
    </svg>
  )
}

function GroomGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body/suit */}
      <path d="M55 120 L55 78 L40 68 L50 50 L80 60 L110 50 L120 68 L105 78 L105 120 Z" fill="var(--color-gold-100)" stroke="var(--color-gold-400)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Lapels */}
      <path d="M80 60 L68 78 L80 72 L92 78 L80 60 Z" fill="var(--color-gold-200)" stroke="var(--color-gold-400)" strokeWidth="1" />
      {/* Tie */}
      <path d="M80 66 L76 82 L80 96 L84 82 Z" fill="var(--color-gold-500)" opacity="0.7" />
      {/* Head */}
      <circle cx="80" cy="34" r="18" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="1.5" />
      {/* Boutonniere */}
      <circle cx="92" cy="72" r="4" fill="var(--color-gold-300)" stroke="var(--color-gold-500)" strokeWidth="1" />
    </svg>
  )
}

function TablesGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Center table */}
      <circle cx="80" cy="60" r="22" fill="var(--color-gold-50)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      {/* Chairs around center */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 80 + 32 * Math.cos(rad)
        const cy = 60 + 32 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="6" fill="var(--color-gold-100)" stroke="var(--color-gold-400)" strokeWidth="1.25" />
      })}
      {/* Side table left */}
      <circle cx="30" cy="40" r="14" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="1.25" />
      {[0,90,180,270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 30 + 22 * Math.cos(rad)
        const cy = 40 + 22 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="5" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1" />
      })}
      {/* Side table right */}
      <circle cx="130" cy="80" r="14" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="1.25" />
      {[0,90,180,270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 130 + 22 * Math.cos(rad)
        const cy = 80 + 22 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="5" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1" />
      })}
    </svg>
  )
}

function ParkingGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lot outline */}
      <rect x="12" y="12" width="136" height="96" rx="4" fill="var(--color-gold-50)" stroke="var(--color-gold-200)" strokeWidth="1.5" />
      {/* Parking spots */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={20 + i * 30} y="20" width="22" height="38" rx="2" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1" />
      ))}
      {[0,1,2,3].map(i => (
        <rect key={i} x={20 + i * 30} y="66" width="22" height="38" rx="2" fill="var(--color-gold-100)" stroke="var(--color-gold-300)" strokeWidth="1" />
      ))}
      {/* Lane */}
      <line x1="12" y1="62" x2="148" y2="62" stroke="var(--color-gold-300)" strokeWidth="1" strokeDasharray="6 4" />
      {/* P */}
      <circle cx="134" cy="30" r="14" fill="var(--color-gold-400)" />
      <path d="M129 24v12M129 24h5a3 3 0 0 1 0 6h-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DanceFloorGraphic() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Floor tiles */}
      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 30}
            y={15 + row * 24}
            width="28"
            height="22"
            rx="2"
            fill={(row + col) % 2 === 0 ? 'var(--color-gold-100)' : 'var(--color-gold-50)'}
            stroke="var(--color-gold-200)"
            strokeWidth="1"
          />
        ))
      )}
      {/* Music note */}
      <circle cx="130" cy="72" r="6" fill="var(--color-gold-400)" />
      <line x1="136" y1="72" x2="136" y2="52" stroke="var(--color-gold-400)" strokeWidth="2" />
      <line x1="136" y1="52" x2="148" y2="48" stroke="var(--color-gold-400)" strokeWidth="2" />
      <circle cx="148" cy="62" r="6" fill="var(--color-gold-400)" />
      <line x1="148" y1="48" x2="148" y2="62" stroke="var(--color-gold-400)" strokeWidth="2" />
    </svg>
  )
}

// ─── Amenity data ─────────────────────────────────────────────────────────────

type MediaType = 'image' | 'graphic'

interface Amenity {
  id: string
  label: string
  icon: React.ReactNode
  headline: string
  detail: string
  mediaType: MediaType
  imageSrc?: string
  Graphic?: () => React.ReactElement
}

const amenities: Amenity[] = [
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <KitchenIcon />,
    headline: 'Full kitchen & prep area',
    detail: 'Commercial-grade prep surfaces, refrigeration, and counter workspace. Bring any caterer you like. We provide the infrastructure, they bring the skill. No catering exclusivity.',
    mediaType: 'graphic',
    Graphic: KitchenGraphic,
  },
  {
    id: 'bride-suite',
    label: 'Bride suite',
    icon: <MirrorIcon />,
    headline: 'Bride vanity & dressing suite',
    detail: 'Private room with full-length mirror, vanity lighting, and comfortable seating for your bridal party. Get ready on-site and arrive to your reception already calm.',
    mediaType: 'graphic',
    Graphic: BrideSuiteGraphic,
  },
  {
    id: 'views',
    label: 'Mountain views',
    icon: <ViewIcon />,
    headline: 'Floor-to-ceiling Wasatch views',
    detail: 'The west wall is nearly all glass. The Wasatch Mountains are the backdrop. No decoration required. Best during golden hour, which lines up well with most reception timelines.',
    mediaType: 'graphic',
    Graphic: ViewsGraphic,
  },
  {
    id: 'av',
    label: 'AV system',
    icon: <SpeakerIcon />,
    headline: 'Built-in audio + visual',
    detail: 'In-ceiling speakers throughout, drop-down projector and screen, wireless microphone, and HDMI connectivity. Plug in your playlist, run a slideshow, or connect a DJ. The room is wired for it.',
    mediaType: 'graphic',
    Graphic: AVGraphic,
  },
  {
    id: 'groom-suite',
    label: 'Groom suite',
    icon: <SuiteIcon />,
    headline: 'Groom suite & dressing area',
    detail: 'A separate, quiet space for the groom and groomsmen. Own entrance, own mirror, own seating. No hallway crossings before the ceremony.',
    mediaType: 'graphic',
    Graphic: GroomGraphic,
  },
  {
    id: 'tables',
    label: 'Tables & chairs',
    icon: <TableIcon />,
    headline: 'Tables & chairs for 100',
    detail: '4,200 sq ft main floor. Round banquet tables and cushioned chairs included. Seats 100, up to 150 for a flowing reception. Standard arrangements available or tell us how you want the room set.',
    mediaType: 'graphic',
    Graphic: TablesGraphic,
  },
  {
    id: 'parking',
    label: 'Free parking',
    icon: <ParkingIcon />,
    headline: 'On-site parking for 40+ vehicles',
    detail: 'Surface lot with 40+ spaces, free for all guests. Three miles from the Provo Temple. Easy for guests coming straight from a ceremony.',
    mediaType: 'graphic',
    Graphic: ParkingGraphic,
  },
  {
    id: 'climate',
    label: 'Climate control',
    icon: <ClimateIcon />,
    headline: 'Full climate control',
    detail: 'Independent HVAC throughout the venue. Comfortable in Utah summers and winters alike. You set the temperature. No fighting with a building manager.',
    mediaType: 'graphic',
    Graphic: ClimateGraphic,
  },
  {
    id: 'dance-floor',
    label: 'Dance floor',
    icon: <DanceFloorIcon />,
    headline: 'Open dance floor',
    detail: 'The main floor clears easily for dancing. Tables arrange around the perimeter and the center opens up. No awkward layout compromises. Works for weddings, birthdays, and any event where the dancing matters.',
    mediaType: 'graphic',
    Graphic: DanceFloorGraphic,
  },
]

const PRIORITY_COUNT = 4

export default function AmenityList() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const priorityAmenities = amenities.slice(0, PRIORITY_COUNT)
  const extraAmenities = amenities.slice(PRIORITY_COUNT)
  const visibleExtras = showAll ? extraAmenities : []
  const activeAmenity = amenities.find((a) => a.id === activeId) ?? null

  function handleChip(id: string) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  function handleViewMore() {
    setShowAll((prev) => {
      if (prev && activeAmenity && extraAmenities.some(a => a.id === activeAmenity.id)) {
        setActiveId(null)
      }
      return !prev
    })
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
          body="Every package includes all of the below. No add-on fees."
        />

        {/* Chip grid */}
        <div className="flex flex-wrap gap-2.5">
          {priorityAmenities.map((amenity) => (
            <Chip
              key={amenity.id}
              amenity={amenity}
              active={activeId === amenity.id}
              onClick={() => handleChip(amenity.id)}
            />
          ))}

          {visibleExtras.map((amenity) => (
            <Chip
              key={amenity.id}
              amenity={amenity}
              active={activeId === amenity.id}
              onClick={() => handleChip(amenity.id)}
            />
          ))}

          {/* View more / less toggle */}
          <button
            onClick={handleViewMore}
            className={cn(
              'flex items-center gap-2 px-[18px] rounded-full border h-[var(--amenity-chip-height)]',
              'font-sans font-medium text-[length:var(--text-13)]',
              'transition-all duration-[var(--transition-fast)]',
              'border-dashed border-gold-300 text-gold-600 hover:border-gold-500 hover:bg-gold-50'
            )}
          >
            {showAll ? 'Show less' : `+${extraAmenities.length} more`}
          </button>
        </div>

        {/* Detail panel */}
        {activeAmenity && (
          <div className="mt-5 card-warm-glass rounded-soft overflow-hidden">
            <div className="flex flex-col sm:flex-row">

              {/* Media — image or graphic */}
              <div className="relative sm:w-56 sm:flex-shrink-0 h-48 sm:h-auto bg-gold-50 flex items-center justify-center p-6">
                {activeAmenity.mediaType === 'image' && activeAmenity.imageSrc ? (
                  <Image
                    src={activeAmenity.imageSrc}
                    alt={activeAmenity.headline}
                    fill
                    className="object-cover"
                    sizes="224px"
                  />
                ) : activeAmenity.Graphic ? (
                  <div className="w-full h-full max-w-[160px] max-h-[120px] mx-auto">
                    <activeAmenity.Graphic />
                  </div>
                ) : null}
              </div>

              {/* Text */}
              <div className="flex-1 px-6 py-5 flex flex-col justify-center gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans font-semibold text-[length:var(--text-15)] text-neutral-800">
                      {activeAmenity.headline}
                    </p>
                    <p className="font-sans font-regular text-[length:var(--text-14)] text-neutral-500 mt-1.5 leading-relaxed">
                      {activeAmenity.detail}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveId(null)}
                    className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors w-10 h-10 -mr-2 -mt-1 flex items-center justify-center"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Catering note */}
        <div className="mt-10 pt-8 border-t border-rule flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3v5a6 6 0 0 0 12 0V3" stroke="var(--color-gold-600)" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M9 14v3M6 17h6" stroke="var(--color-gold-600)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="font-sans font-semibold text-xs uppercase tracking-label text-gold-600 mb-1">
              Catering
            </p>
            <p className="font-sans text-base text-neutral-800">
              Your caterer, your choice.{' '}
              <span className="font-regular text-neutral-500">
                We provide the kitchen. Who cooks is entirely up to you.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Chip({ amenity, active, onClick }: { amenity: Amenity; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-expanded={active}
      className={cn(
        'flex items-center gap-2 px-[18px] rounded-full border',
        'font-sans font-medium text-[length:var(--text-13)]',
        'transition-all duration-[var(--transition-fast)]',
        'h-[var(--amenity-chip-height)]',
        active
          ? 'bg-[var(--amenity-chip-bg-active)] border-[var(--amenity-chip-border-active)] text-neutral-800'
          : 'bg-gold-50 border-gold-200 text-neutral-700 hover:border-gold-400 hover:bg-gold-100'
      )}
    >
      <span className={cn(
        'flex-shrink-0 transition-colors duration-[var(--transition-fast)]',
        active ? 'text-gold-600' : 'text-gold-500'
      )}>
        {amenity.icon}
      </span>
      {amenity.label}
    </button>
  )
}
