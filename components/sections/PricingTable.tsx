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
        'rounded-soft flex flex-col',
        featured
          ? 'bg-[var(--pricing-card-featured-bg)] border border-[var(--pricing-card-featured-bg)]'
          : 'card-warm-glass'
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
            'font-serif font-semibold text-[length:var(--text-24)]',
            featured ? 'text-neutral-50' : 'text-neutral-800'
          )}
        >
          {pkg.time_range}
        </p>

        <p
          className={cn(
            'font-sans font-regular text-[length:var(--text-12)] mt-1',
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
                'font-serif font-semibold text-[length:var(--text-18)]',
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
            <h2 className="font-serif font-bold text-4xl text-neutral-800 tracking-tightest">
              No mystery. No{' '}
              <em className="italic text-gold-600">runaround</em>.
            </h2>
            <p className="font-sans font-regular text-md text-neutral-500 mt-4 md:mt-0 flex items-end">
              Every package and price is here because your time matters. No
              quote requests.
            </p>
          </div>
        </div>

        {/* Cards + footnote — grouped so footnote reads as a caption for the grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePackages.map((pkg) => (
              <PricingCard key={pkg.id || pkg.name} pkg={pkg} />
            ))}
          </div>
          {/* Footer row — stacks on mobile, side-by-side on sm+ */}
          <div className="border-t border-rule-light pt-4 mt-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans font-regular text-[length:var(--text-11)] text-neutral-400">
              All packages include full venue access, amenities, and parking.
            </p>
            <Button href="/availability" variant="gold" size="md" className="flex-shrink-0">
              Check Availability
            </Button>
          </div>
        </div>

        {/* Micro-event callout */}
        <div className="mt-12 rounded-soft bg-gold-50 border border-gold-100 border-l-[length:var(--pricing-callout-accent-width)] border-l-gold-400 px-7 py-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">

            {/* Content */}
            <div className="flex-1">
              <p className="font-sans font-semibold text-[length:var(--text-10)] uppercase tracking-eyebrow text-gold-600 mb-3">
                Small gatherings
              </p>
              <h3 className="font-serif font-semibold text-[length:var(--text-24)] text-neutral-800 mb-4 leading-snug">
                Hosting under 50 guests?
              </h3>

              {/* Event type tags — help visitors self-identify instantly */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['Birthdays', 'Anniversaries', 'Bridal showers', 'Graduations', 'Baby showers'].map((tag) => (
                  <span
                    key={tag}
                    className="font-sans font-medium text-[length:var(--text-11)] text-gold-700 bg-gold-100 px-3 h-7 inline-flex items-center rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-sans font-regular text-[length:var(--text-14)] text-neutral-500">
                2–4 hour blocks available outside peak windows.
              </p>
              <a
                href="/contact"
                className="mt-3 inline-block font-sans font-semibold text-[length:var(--text-11)] uppercase tracking-btn text-gold-600 hover:text-gold-700 transition-colors duration-[var(--transition-fast)]"
              >
                Tell us your date →
              </a>
            </div>

          </div>
        </div>

        {/* Booking terms — TODO: update with real policy from Bobbi */}
        <div className="mt-8 border-t border-rule pt-8">
          <p className="font-sans font-semibold text-[length:var(--text-10)] uppercase tracking-eyebrow text-neutral-500 mb-4">
            Booking terms
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { term: 'Deposit', detail: '50% due at signing to secure your date.' },
              { term: 'Balance', detail: 'Remaining 50% due 30 days before your event.' },
              { term: 'Cancellations', detail: 'Full deposit refund if cancelled 60+ days out. Non-refundable within 60 days. Rescheduling within 12 months available at no penalty.' },
            ].map(({ term, detail }) => (
              <div key={term}>
                <p className="font-sans font-medium text-[length:var(--text-12)] text-neutral-800 mb-1">{term}</p>
                <p className="font-sans font-regular text-[length:var(--text-13)] text-neutral-500 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
