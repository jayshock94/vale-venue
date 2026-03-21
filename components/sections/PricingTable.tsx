import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

export interface PricingPackage {
  id?: string
  name: string
  time_range: string
  hours: number
  price_mon_wed: number
  price_thursday: number
  price_fri_sat: number
  is_peak?: boolean
  is_featured?: boolean
  active?: boolean
  sort_order?: number
}

const defaultPackages: PricingPackage[] = [
  {
    name: 'Half Day Morning',
    time_range: '8am – 2pm',
    hours: 6,
    price_mon_wed: 1400,
    price_thursday: 1600,
    price_fri_sat: 1900,
    is_peak: false,
    is_featured: false,
  },
  {
    name: 'Half Day Evening',
    time_range: '3pm – 9pm',
    hours: 6,
    price_mon_wed: 2400,
    price_thursday: 2800,
    price_fri_sat: 3400,
    is_peak: false,
    is_featured: false,
  },
  {
    name: 'Full Day',
    time_range: '9am – 10pm',
    hours: 13,
    price_mon_wed: 3000,
    price_thursday: 3400,
    price_fri_sat: 4000,
    is_peak: true,
    is_featured: true,
  },
]

interface PricingTableProps {
  packages?: PricingPackage[]
}

const dayRows = [
  { label: 'Mon – Wed', key: 'price_mon_wed' as const },
  { label: 'Thursday',  key: 'price_thursday' as const },
  { label: 'Fri – Sat', key: 'price_fri_sat' as const },
]

function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const featured = !!pkg.is_featured

  return (
    <div
      className={cn(
        'rounded-soft border flex flex-col',
        featured
          ? 'bg-[var(--pricing-card-featured-bg)] border-[var(--pricing-card-featured-bg)]'
          : 'bg-neutral-0 border-rule'
      )}
    >
      {/* Header block */}
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p
            className={cn(
              'font-sans font-semibold uppercase tracking-eyebrow',
              'text-[length:var(--text-10)]',
              featured ? 'text-gold-300' : 'text-gold-600'
            )}
          >
            {pkg.name}
          </p>
          {pkg.is_featured && (
            <Badge variant="gold">Best value</Badge>
          )}
        </div>

        <p
          className={cn(
            'font-serif text-[length:var(--text-24)]',
            featured ? 'text-neutral-50' : 'text-neutral-800'
          )}
        >
          {pkg.time_range}
        </p>

        <p
          className={cn(
            'font-sans font-light text-[length:var(--text-12)] mt-1',
            featured ? 'text-[rgba(245,240,232,0.45)]' : 'text-neutral-500'
          )}
        >
          {pkg.hours} hours
        </p>
      </div>

      {/* Gold rule */}
      <div
        className="mx-8 border-t"
        style={{
          borderColor: featured
            ? 'var(--pricing-card-rule-color-featured)'
            : 'var(--pricing-card-rule-color)',
        }}
      />

      {/* Price rows */}
      <div className="px-8 py-6 flex flex-col gap-0 flex-1">
        {dayRows.map((row, i) => (
          <div
            key={row.key}
            className={cn(
              'flex items-center justify-between py-3',
              i < dayRows.length - 1 ? 'border-b' : ''
            )}
            style={{
              borderColor: featured
                ? 'rgba(245,240,232,0.10)'
                : 'var(--border-subtle)',
            }}
          >
            <span
              className={cn(
                'font-sans text-[length:var(--text-11)]',
                featured ? 'text-[rgba(245,240,232,0.50)]' : 'text-neutral-500'
              )}
            >
              {row.label}
            </span>
            <span
              className={cn(
                'font-serif text-[length:var(--text-18)]',
                featured ? 'text-neutral-50' : 'text-neutral-800'
              )}
            >
              {formatPrice(pkg[row.key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingTable({
  packages = defaultPackages,
}: PricingTableProps) {
  const activePackages = packages.length > 0 ? packages : defaultPackages

  return (
    <section className="bg-neutral-50 py-section px-5 md:px-page">
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
            Transparent pricing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
            <h2 className="font-serif text-4xl text-neutral-800 tracking-tightest">
              No mystery. No{' '}
              <em className="italic text-gold-600">runaround</em>.
            </h2>
            <p className="font-sans font-light text-md text-neutral-500 mt-4 md:mt-0 flex items-end">
              Every package and price is here because your time matters. No
              quote requests.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePackages.map((pkg) => (
            <PricingCard key={pkg.id || pkg.name} pkg={pkg} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Button href="/contact" variant="gold" size="md">
            Reserve Your Date
          </Button>
        </div>

        {/* Footnote */}
        <p className="font-sans font-light text-[length:var(--text-11)] text-neutral-400 mt-3">
          All packages include full venue access, amenities, and parking.
        </p>

        {/* Micro-event callout — left accent only */}
        <div className="mt-8 border-l-[var(--pricing-callout-accent-width)] border-gold-400 bg-gold-50 pl-5 pr-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-sans font-semibold text-sm text-neutral-800">
              Hosting a birthday or small celebration?
            </p>
            <p className="font-sans font-light text-sm text-neutral-500 mt-1">
              Short-form blocks for gatherings under 50 guests. Tell us your date and we&apos;ll find a time that works.
            </p>
          </div>
          <a
            href="/contact"
            className="font-sans font-semibold text-xs uppercase tracking-btn text-gold-600 hover:text-gold-700 transition-colors whitespace-nowrap"
          >
            Ask about it →
          </a>
        </div>
      </div>
    </section>
  )
}
