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
    public_url: '/photos/gallery/weddings-1.jpg',
    caption: 'Wedding reception — white florals and geometric pendant lights',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-2.jpg',
    caption: 'Wedding reception — candlelit round tables',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-3.png',
    caption: 'Wedding ceremony at The Vale',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-4.png',
    caption: 'Ceremony under floral arch',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-5.png',
    caption: 'Bridal portrait',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/weddings-6.png',
    caption: 'Bridal portrait — natural window light',
    category: 'weddings',
  },
  {
    public_url: '/photos/gallery/corporate-1.jpg',
    caption: 'The Vale main floor — evening',
    category: 'corporate',
  },
  {
    public_url: '/photos/gallery/corporate-2.jpg',
    caption: 'The Vale main floor — full capacity layout',
    category: 'corporate',
  },
  {
    public_url: '/photos/gallery/celebrations-1.png',
    caption: 'Birthday celebration — balloon arch',
    category: 'celebrations',
  },
  {
    public_url: '/photos/gallery/celebrations-2.png',
    caption: 'Gender reveal party at The Vale',
    category: 'celebrations',
  },
  {
    public_url: '/photos/gallery/celebrations-3.jpg',
    caption: 'Bar and prep area',
    category: 'celebrations',
  },
]

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'celebrations', label: 'Celebrations' },
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
              'h-12 sm:h-[var(--gallery-filter-tab-height)] px-4 border rounded-button',
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

      {/* Masonry grid */}
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
                <span className="font-sans font-light text-sm text-neutral-50">
                  {img.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans font-light text-base text-neutral-400">
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
