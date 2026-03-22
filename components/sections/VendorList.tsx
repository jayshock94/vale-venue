'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Vendor {
  name: string
  note: string
  href?: string
}

interface VendorCategory {
  label: string
  vendors: Vendor[]
}

// TODO: Replace with real vendor names and links — update via admin or directly in this file
const categories: VendorCategory[] = [
  {
    label: 'Photography',
    vendors: [
      { name: 'Sarah Chen Photography', note: 'Wedding + portrait' },
      { name: 'Oak & Ivory Photography', note: 'Wedding + editorial' },
    ],
  },
  {
    label: 'Catering',
    vendors: [
      { name: 'Provisions by The Table', note: 'Full-service catering' },
      { name: 'Canyon Catering Co.', note: 'Catering + rentals' },
    ],
  },
  {
    label: 'Florals',
    vendors: [
      { name: 'Blush & Bloom Studio', note: 'Wedding florals' },
      { name: 'Wild Stem Floral', note: 'Organic + garden style' },
    ],
  },
  {
    label: 'DJ & Entertainment',
    vendors: [
      { name: 'Soundtrack Events', note: 'DJ + lighting' },
      { name: 'Peak Sound DJ', note: 'Weddings + corporate' },
    ],
  },
]

const allVendors = categories.flatMap((cat) =>
  cat.vendors.map((v) => ({ ...v, category: cat.label }))
)

const MOBILE_INITIAL = 3

export default function VendorList() {
  const [showAll, setShowAll] = useState(false)
  const mobileVendors = showAll ? allVendors : allVendors.slice(0, MOBILE_INITIAL)

  return (
    <section className="bg-neutral-50 py-section px-5 md:px-page border-t border-rule">
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mb-12">
          <div>
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
              Trusted vendors
            </p>
            <h2 className="font-serif font-semibold text-4xl text-neutral-800 tracking-tightest">
              People who know the{' '}
              <em className="italic text-gold-600">space</em>.
            </h2>
          </div>
          <p className="font-sans font-regular text-md text-neutral-500 mt-4 md:mt-0 flex items-end">
            We don&apos;t require you to use anyone on this list. These vendors have worked here and know the room.
          </p>
        </div>

        {/* Mobile flat list */}
        <div className="md:hidden">
          <div className="flex flex-col">
            {mobileVendors.map((vendor, i) => (
              <div
                key={vendor.name}
                className={`flex items-center justify-between py-4 ${i < mobileVendors.length - 1 ? 'border-b border-rule-light' : ''}`}
              >
                <div className="flex flex-col gap-0.5">
                  {vendor.href ? (
                    <Link
                      href={vendor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium text-[length:var(--text-14)] text-neutral-800 hover:text-gold-600 transition-colors duration-[var(--transition-fast)]"
                    >
                      {vendor.name}
                    </Link>
                  ) : (
                    <p className="font-sans font-medium text-[length:var(--text-14)] text-neutral-800">
                      {vendor.name}
                    </p>
                  )}
                  <p className="font-sans font-regular text-[length:var(--text-12)] text-neutral-400">
                    {vendor.category} · {vendor.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-5 w-full py-3 font-sans font-medium text-[length:var(--text-13)] text-neutral-500 border border-rule-light rounded-soft hover:text-neutral-800 hover:border-neutral-300 transition-colors duration-[var(--transition-fast)]"
            >
              Show all vendors ({allVendors.length})
            </button>
          )}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.label}>
              <p className="font-sans font-semibold text-[length:var(--text-10)] uppercase tracking-eyebrow text-gold-600 mb-4">
                {category.label}
              </p>
              <div className="flex flex-col gap-4">
                {category.vendors.map((vendor) => (
                  <div key={vendor.name} className="flex flex-col gap-0.5">
                    {vendor.href ? (
                      <Link
                        href={vendor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans font-medium text-[length:var(--text-14)] text-neutral-800 hover:text-gold-600 transition-colors duration-[var(--transition-fast)]"
                      >
                        {vendor.name}
                      </Link>
                    ) : (
                      <p className="font-sans font-medium text-[length:var(--text-14)] text-neutral-800">
                        {vendor.name}
                      </p>
                    )}
                    <p className="font-sans font-regular text-[length:var(--text-12)] text-neutral-400">
                      {vendor.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="font-sans font-regular text-[length:var(--text-12)] text-neutral-400 mt-10 pt-8 border-t border-rule-light">
          Have a vendor you love? Bring them. The kitchen is open to any licensed caterer.
        </p>

      </div>
    </section>
  )
}
