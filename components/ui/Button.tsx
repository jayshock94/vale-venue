import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Variant = 'gold' | 'ink' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  arrow?: boolean
  className?: string
  children: React.ReactNode
  target?: string
  rel?: string
}

// component.button — vale-design-system.json
//
// State layer pattern (Material 3):
//   overflow-hidden clips the ::before overlay to the button's rounded corners.
//   The overlay is opacity-0 by default and fades in on hover/active.
//   Each variant sets --btn-sl to the correct hover state layer via an
//   arbitrary Tailwind property class, e.g. [--btn-sl:var(--btn-sl-hover-light)].
//   The active state always uses var(--btn-sl-active) regardless of variant.
//   Base background-color never changes — only the overlay changes.
//   No rgba values in this file — all values reference CSS vars from globals.css.
const base = [
  'relative overflow-hidden',
  'inline-flex items-center justify-center whitespace-nowrap',
  'font-sans font-semibold uppercase tracking-btn rounded-button',
  'transition-all duration-fast active:scale-[0.97] select-none',
  // ::before state layer overlay
  "before:content-[''] before:absolute before:inset-0",
  'before:bg-[var(--btn-sl)] before:opacity-0 before:pointer-events-none',
  'before:transition-opacity before:duration-fast',
  'hover:before:opacity-100',
  'active:before:opacity-100 active:before:bg-[var(--btn-sl-active)]',
].join(' ')

const variants: Record<Variant, string> = {
  // hover overlay: white 12% over gold
  gold: '[--btn-sl:var(--btn-sl-hover-light)] bg-gold-400 text-neutral-800',
  // hover overlay: white 8% over ink
  ink: '[--btn-sl:var(--btn-sl-hover-dark)] bg-neutral-800 text-neutral-50',
  // hover overlay: white 12% over transparent; border darkens
  outline:
    '[--btn-sl:var(--btn-sl-hover-light)] bg-transparent border border-neutral-300 text-neutral-600 hover:border-neutral-800',
  // no hover overlay — text color is the sole hover signal
  ghost: 'bg-transparent text-neutral-500 hover:text-neutral-800',
}

// Heights: sm=36px(h-9), md=40px(h-10), lg=48px(h-12)
// Padding: sm=0 20px(px-5), md=0 32px(px-8), lg=0 40px(px-10)
// Font:    sm=11px(text-2xs), md=12px(text-sm), lg=13px(text-base)
const sizes: Record<Size, string> = {
  sm: 'h-9  px-5  text-2xs  gap-2',
  md: 'h-10 px-8  text-sm   gap-2',
  lg: 'h-12 px-10 text-base gap-2',
}

export function Button({
  variant = 'ink',
  size = 'md',
  href,
  arrow = false,
  className,
  children,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      {children}
      {arrow && variant === 'ghost' && (
        <span className="transition-transform duration-fast group-hover:translate-x-[var(--btn-ghost-arrow-nudge)]">
          →
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
