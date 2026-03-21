'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface NavLink {
  href: string
  label: string
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLink[]
  pathname: string
}

export default function MobileNav({
  isOpen,
  onClose,
  navLinks,
  pathname,
}: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-800/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-neutral-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex flex-col leading-none">
            <span className="font-serif italic text-xl text-neutral-50">
              The Vale
            </span>
            <span className="font-sans font-light text-2xs uppercase tracking-nav text-neutral-400">
              at ten seventy-eight
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-50 transition-colors p-2"
            aria-label="Close navigation"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="stroke-current"
            >
              <path d="M1 1l16 16M17 1L1 17" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-5 py-8 gap-2 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'font-sans font-medium text-sm uppercase tracking-nav py-3 border-b border-white/10 transition-colors',
                pathname === link.href.split('#')[0]
                  ? 'text-neutral-50'
                  : 'text-neutral-400 hover:text-neutral-50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-5 pb-8">
          <Button href="/contact" variant="gold" size="lg" className="w-full" onClick={onClose}>
            Book the Space
          </Button>
        </div>
      </div>
    </div>
  )
}
