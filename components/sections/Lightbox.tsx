'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { type GalleryImage } from './GalleryGrid'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const prev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }, [currentIndex, images.length, onNavigate])

  const next = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const current = images[currentIndex]
  if (!current) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-800/95"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 text-neutral-400 hover:text-neutral-50 transition-colors p-2"
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current">
          <path d="M2 2l16 16M18 2L2 18" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-4 z-10 text-neutral-400 hover:text-neutral-50 transition-colors p-4"
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current">
          <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative z-10 max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4">
        <div className="relative w-full max-h-[75vh] overflow-hidden rounded-soft">
          <Image
            src={current.public_url}
            alt={current.caption || 'Gallery image'}
            width={1200}
            height={800}
            className="object-contain max-h-[75vh] w-auto mx-auto"
            style={{ maxHeight: '75vh' }}
          />
        </div>
        {current.caption && (
          <p className="font-sans font-light text-sm text-neutral-400 text-center">
            {current.caption}
          </p>
        )}

        {/* Dot indicators */}
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex ? 'bg-gold-400' : 'bg-neutral-600'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-4 z-10 text-neutral-400 hover:text-neutral-50 transition-colors p-4"
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current">
          <path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
