'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Lightbox from './Lightbox'

export interface GalleryImage {
  id?: string
  public_url: string
  caption?: string
  category?: string
  sort_order?: number
}

const placeholderImages: GalleryImage[] = [
  {
    public_url: '/photos/gallery/weddings-1.png',
    caption: 'Reception dinner — candlelit long table with string lights',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-2.png',
    caption: 'Sweetheart table — boho florals and natural light',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-3.png',
    caption: 'Couple on The Vale mezzanine',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-4.png',
    caption: 'First kiss under the greenery arch',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-5.png',
    caption: 'First dance under string lights',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-6.png',
    caption: 'Couple walking down the aisle',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/community-1.png',
    caption: 'ClubMommy Utah — full venue at capacity',
    category: 'community-social',
  },
  {
    public_url: '/photos/gallery/community-2.png',
    caption: 'Evening event under string lights',
    category: 'community-social',
  },
  {
    public_url: '/photos/gallery/celebrations-1.png',
    caption: 'Birthday celebration — balloon arch and high chair',
    category: 'celebrations',
  },
  {
    public_url: '/photos/gallery/celebrations-2.png',
    caption: 'Girls birthday party — pink balloon arch',
    category: 'celebrations',
  },
  {
    public_url: '/photos/gallery/celebrations-3.png',
    caption: 'Race car birthday — custom cake and cookies',
    category: 'celebrations',
  },
]

const tabs = [
  { value: 'all',            label: 'All' },
  { value: 'weddings',       label: 'Weddings' },
  { value: 'celebrations',   label: 'Celebrations' },
  { value: 'community-social', label: 'Community & Social' },
  { value: 'the-space',      label: 'The Space' },
]

interface GalleryGridProps {
  images?: GalleryImage[]
  defaultCategory?: string
}

export default function GalleryGrid({ images, defaultCategory = 'all' }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState(defaultCategory)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const sourceImages = (images && images.length > 0) ? images : placeholderImages

  const filtered =
    activeTab === 'all'
      ? sourceImages
      : sourceImages.filter((img) => img.category === activeTab)

  return (
    <>
      {/* Filter tabs — component.gallery-filter: bordered controls, filled active state */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'h-12 sm:h-[var(--gallery-filter-tab-height)] px-4 border rounded-soft',
              'font-sans font-semibold text-2xs uppercase tracking-btn',
              'whitespace-nowrap flex-shrink-0 transition-colors duration-fast',
              activeTab === tab.value
                ? 'bg-neutral-800 border-neutral-800 text-neutral-50'
                : 'bg-transparent border-rule text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* The Space — coming soon */}
      {activeTab === 'the-space' && (
        <div className="py-24 flex flex-col items-center text-center">
          <p className="font-sans font-semibold text-xs uppercase tracking-eyebrow text-gold-600 mb-4">
            Coming soon
          </p>
          <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest mb-4">
            Still being built.
          </h2>
          <p className="font-sans font-regular text-base text-neutral-500 max-w-sm">
            Floor plan, full photo set, and a room-by-room walkthrough. Check back soon.
          </p>
        </div>
      )}

      {/* Masonry grid */}
      {activeTab !== 'the-space' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map((img, index) => (
            <div
              key={img.id || img.public_url}
              className="mb-3 break-inside-avoid cursor-pointer group relative overflow-hidden rounded-soft"
              onClick={() => setLightboxIndex(index)}
            >
              {/* TODO: Replace with real venue photos from Supabase storage */}
              <Image
                src={img.public_url}
                alt={img.caption || 'The Vale event space'}
                width={800}
                height={600}
                className="w-full object-cover rounded-soft transition-transform duration-slow group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-neutral-800/0 group-hover:bg-neutral-800/40 transition-all duration-slow flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="font-sans font-regular text-sm text-neutral-50">
                    {img.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'the-space' && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans font-regular text-base text-neutral-400">
            No photos in this category yet.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
