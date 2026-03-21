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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-16">
          {amenities.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-gold-400 mt-1 leading-none flex-shrink-0">
                ●
              </span>
              <span className="font-sans font-light text-base text-neutral-800">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
