'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import ValeLogo from '@/components/ui/ValeLogo'
import MobileNav from './MobileNav'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/availability', label: 'Availability' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function NavClient() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine if current page has a dark hero (home page)
  const isHeroPage = pathname === '/'
  const isTransparent = isHeroPage && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          isTransparent
            ? 'bg-transparent border-b border-white/[0.08]'
            : 'bg-neutral-50 border-b border-rule'
        )}
      >
        <div className="max-w-content mx-auto px-5 md:px-page h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="The Vale — home">
            <ValeLogo
              className={cn(
                'h-8 w-auto transition-colors duration-300',
                isTransparent ? 'text-neutral-50' : 'text-neutral-800'
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href.split('#')[0]
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-sans font-medium text-xs uppercase tracking-nav transition-colors',
                    active
                      ? isTransparent ? 'text-neutral-50' : 'text-neutral-800'
                      : isTransparent ? 'text-neutral-50/50 hover:text-neutral-50' : 'text-neutral-500 hover:text-neutral-800'
                  )}
                  style={active ? { borderBottom: '1px solid var(--color-gold-400)', paddingBottom: '2px' } : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
            >
              Book Now
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'md:hidden flex flex-col gap-1.5 p-2 rounded-sharp',
                isTransparent ? 'text-neutral-50' : 'text-neutral-800'
              )}
              aria-label="Open navigation"
            >
              <span className="block w-5 h-px bg-current" />
              <span className="block w-5 h-px bg-current" />
              <span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
      />
    </>
  )
}
