import { SectionHeader } from '@/components/ui/SectionHeader'

const amenities = [
  'Kitchen and food prep area',
  'Bride vanity and dressing suite',
  'Groom suite and dressing area',
  'Audio visual amenities',
  'Tables and chairs for 100 guests',
  'Parking for 40+ vehicles',
]

export default function AmenityList() {
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
        />

        {/* component.amenity — divide-rule-light creates bottom rule on each row */}
        <ul className="divide-y divide-rule-light">
          {amenities.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 min-h-[var(--amenity-item-min-height)] py-3"
            >
              {/* Checkmark — component.amenity.check-color */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="flex-shrink-0 text-gold-400 stroke-current"
                aria-hidden="true"
              >
                <path
                  d="M2.5 8.5l3.5 3.5 7.5-8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-sans font-normal text-sm text-neutral-800">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 pt-8 border-t border-rule font-sans font-light text-sm text-neutral-500">
          <span className="font-medium text-neutral-700">Catering:</span> Your caterer, your choice.
          We provide the kitchen and food prep area — who cooks is entirely up to you.
        </p>
      </div>
    </section>
  )
}
