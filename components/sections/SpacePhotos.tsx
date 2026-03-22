import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const photos = [
  {
    src: '/photos/gallery/4468019_lg.jpg',
    alt: 'The Vale mezzanine — black metal railing and wood slat walls with natural light',
    position: 'object-center',
    titleStart: 'The',
    titleItalic: 'Mezzanine',
    sub: 'Black metal rail, wood slat walls, and a second level that looks down over the whole room.',
  },
  {
    src: '/photos/gallery/corporate-1.jpg',
    alt: 'The Vale main floor — open polished concrete floor with high ceilings and recessed lighting',
    position: 'object-top',
    titleStart: 'Main',
    titleItalic: 'Floor',
    sub: '4,200 sq ft of polished concrete. 18-foot ceilings. Arrange it however the event needs.',
  },
  {
    src: '/photos/gallery/corporate-2.jpg',
    alt: 'The Vale open floor — polished concrete, high ceilings, and room for 100 guests',
    position: 'object-center',
    titleStart: 'Mountain',
    titleItalic: 'Views',
    sub: 'The west wall is nearly all glass. The Wasatch is right there. No decoration required.',
  },
]

export default function SpacePhotos() {
  return (
    <section className="bg-neutral-50 px-5 md:px-page py-section border-t border-rule-light">
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mb-10">
          <div>
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
              Inside The Vale
            </p>
            <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest">
              The room,{' '}
              <em className="italic text-gold-600">before you</em>.
            </h2>
          </div>
          <p className="font-sans font-regular text-md text-neutral-500 mt-4 md:mt-0 flex items-end">
            18-foot ceilings, a signature mezzanine, and 4,200 sq ft of open floor. The west wall faces the mountains. Nothing is in your way.
          </p>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="card-warm-glass rounded-soft overflow-hidden flex flex-col"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={`object-cover scale-[1.08] ${photo.position}`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="px-5 py-4 flex flex-col gap-1.5">
                <h3 className="font-sans font-semibold text-lg text-neutral-800">
                  {photo.titleStart} {photo.titleItalic}
                </h3>
                <p className="font-sans font-regular text-sm text-neutral-500 leading-relaxed">
                  {photo.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-rule-light">
          <p className="font-sans font-regular text-sm text-neutral-500">
            Floor plan, full photo set, and every room in detail.
          </p>
          <Button href="/gallery?category=the-space" variant="ink" size="md" className="flex-shrink-0">
            See the full space →
          </Button>
        </div>

      </div>
    </section>
  )
}
