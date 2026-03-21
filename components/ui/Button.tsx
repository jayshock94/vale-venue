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

const base =
  'inline-flex items-center justify-center font-sans font-semibold uppercase tracking-btn rounded-sharp transition-all duration-default active:scale-[0.97] select-none'

const variants: Record<Variant, string> = {
  gold: 'bg-gold-400 text-neutral-800 hover:bg-gold-600 hover:text-neutral-50',
  ink: 'bg-neutral-800 text-neutral-50 hover:bg-neutral-700',
  outline:
    'bg-transparent border border-neutral-300 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 hover:border-neutral-800',
  ghost: 'bg-transparent text-neutral-500 hover:text-neutral-800',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 gap-1.5',
  md: 'text-xs px-6 py-3 gap-2',
  lg: 'text-sm px-8 py-4 gap-2',
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
        <span className="transition-transform duration-fast group-hover:translate-x-0.5">
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
