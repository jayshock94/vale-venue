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
    public_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    caption: 'Wedding reception',
    category: 'weddings',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    caption: 'Corporate event',
    category: 'corporate',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    caption: 'Private celebration',
    category: 'celebrations',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    caption: 'Ceremony setup',
    category: 'weddings',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    caption: 'Banquet hall',
    category: 'celebrations',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    caption: 'Conference setup',
    category: 'corporate',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    caption: 'Mountain view windows',
    category: 'weddings',
  },
  {
    public_url: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=80',
    caption: 'Anniversary dinner',
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
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const sourceImages = (images && images.length > 0) ? images : placeholderImages

  const filtered =
    activeTab === 'all'
      ? sourceImages
      : sourceImages.filter((img) => img.category === activeTab)

  return (
    <>
      {/* Filter tabs */}
      <div className="flex items-center gap-6 mb-8 border-b border-rule pb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'font-sans font-medium text-xs uppercase tracking-nav whitespace-nowrap pb-4 -mb-4 border-b-2 transition-colors',
              activeTab === tab.value
                ? 'text-neutral-800 border-neutral-800'
                : 'text-neutral-400 border-transparent hover:text-neutral-600'
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
