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
// Hover model (gold / ink / outline): translateY(-1px) + box-shadow lift.
//   No ::before state layer — color and elevation are the only signals.
// Active model: translateY(0) + shadow removed. Ink resets to base bg.
// Ghost: text color change + arrow nudge only. No lift, no shadow.
// Arrow nudge requires `group` on the root element — included in base.
const base = [
  'group relative',
  'inline-flex items-center justify-center whitespace-nowrap',
  'font-sans font-semibold uppercase tracking-btn',
  'transition-all duration-fast select-none',
].join(' ')

const variants: Record<Variant, string> = {
  // 8px radius. Warm champagne on cream. Elevation is the hover signal — no color change.
  gold: [
    'rounded-action bg-gold-400 text-neutral-800',
    'hover:shadow-hover hover:-translate-y-px',
    'active:translate-y-0 active:shadow-none',
  ].join(' '),

  // 8px radius. Ink fill, cream text. Lightens on hover, resets on press.
  ink: [
    'rounded-action bg-neutral-800 text-neutral-50',
    'hover:bg-neutral-700 hover:shadow-hover hover:-translate-y-px',
    'active:bg-neutral-800 active:translate-y-0 active:shadow-none',
  ].join(' '),

  // 8px radius. Transparent + stone border by default. Solidifies to ink on hover.
  outline: [
    'rounded-action bg-transparent border border-neutral-300 text-neutral-600',
    'hover:bg-neutral-800 hover:border-neutral-800 hover:text-neutral-50 hover:shadow-hover hover:-translate-y-px',
    'active:translate-y-0 active:shadow-none',
  ].join(' '),

  // No bg, no border. Muted text snaps to ink on hover. No lift.
  ghost: 'bg-transparent text-neutral-500 hover:text-neutral-800',
}

// Heights: sm=40px(h-10), md=48px(h-12), lg=56px(h-14)
// Padding: sm=0 20px(px-5), md=0 28px(px-7), lg=0 36px(px-9)
// Font:    sm=11px(text-2xs), md=12px(text-sm), lg=13px(text-base)
const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-2xs gap-2',
  md: 'h-12 px-7 text-sm  gap-2',
  lg: 'h-14 px-9 text-base gap-2',
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
        <span className="transition-transform duration-fast group-hover:translate-x-1">
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
