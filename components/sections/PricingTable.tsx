import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
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

export default function PricingTable({
  packages = defaultPackages,
}: PricingTableProps) {
  const activePackages =
    packages.length > 0 ? packages : defaultPackages

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

        {/* Table — bordered container anchors it to the page */}
        <div className="w-full border border-rule rounded-soft overflow-hidden">
          <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-neutral-100 border-b-2 border-neutral-300">
                <th
                  className="text-left font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4"
                  style={{ width: '1fr' }}
                >
                  Package
                </th>
                <th
                  className="text-left font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4"
                  style={{ width: '70px' }}
                >
                  Hours
                </th>
                <th
                  className="text-right font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4"
                  style={{ width: '100px' }}
                >
                  Mon–Wed
                </th>
                <th
                  className="text-right font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4"
                  style={{ width: '100px' }}
                >
                  Thursday
                </th>
                <th
                  className="text-right font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4"
                  style={{ width: '110px' }}
                >
                  Fri–Sat
                </th>
              </tr>
            </thead>
            <tbody>
              {activePackages.map((pkg, index) => (
                <tr
                  key={pkg.id || pkg.name}
                  className={`border-b border-rule ${
                    index % 2 === 0 ? 'bg-neutral-0' : 'bg-neutral-50'
                  } ${pkg.is_peak ? 'relative' : ''}`}
                >
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-medium text-base text-neutral-800">
                          {pkg.name}
                        </span>
                        {pkg.is_featured && (
                          <Badge variant="gold">Best value</Badge>
                        )}
                      </div>
                      <span className="font-sans font-light text-sm text-neutral-400">
                        {pkg.time_range}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-sans text-sm text-neutral-500">
                      {pkg.hours} hrs
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`font-serif ${
                        pkg.is_peak
                          ? 'font-semibold text-xl text-gold-400'
                          : 'text-lg text-neutral-800'
                      }`}
                    >
                      {formatPrice(pkg.price_mon_wed)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`font-serif ${
                        pkg.is_peak
                          ? 'font-semibold text-xl text-gold-400'
                          : 'text-lg text-neutral-800'
                      }`}
                    >
                      {formatPrice(pkg.price_thursday)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`font-serif ${
                        pkg.is_peak
                          ? 'font-semibold text-xl text-gold-400'
                          : 'text-lg text-neutral-800'
                      }`}
                    >
                      {formatPrice(pkg.price_fri_sat)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Decision-moment CTA — appears right after the user has seen all prices */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-sans font-light text-sm text-neutral-500">
            All packages include full venue access, amenities, and parking.
          </p>
          <Button href="/contact" variant="gold" size="md">
            Reserve Your Date
          </Button>
        </div>

        {/* Micro-event callout — secondary audience, visually warm and distinct from the table */}
        <div className="mt-6 border border-gold-200 bg-gold-50 rounded-soft px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
