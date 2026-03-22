import { cn } from '@/lib/utils'
import React from 'react'

interface SectionHeaderProps {
  eyebrow: string
  headline: React.ReactNode
  body?: string
  action?: React.ReactNode
  dark?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  headline,
  body,
  action,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'grid gap-y-8 mb-16',
        'grid-cols-1 md:grid-cols-2 md:gap-x-20',
        className
      )}
      style={{ gridTemplateColumns: undefined }}
    >
      {/* Left: eyebrow + headline */}
      <div>
        <p
          className={cn(
            'text-xs font-semibold font-sans uppercase tracking-eyebrow mb-4',
            dark ? 'text-gold-300' : 'text-gold-600'
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            'font-serif font-semibold text-4xl tracking-tightest leading-tight',
            dark ? 'text-neutral-50' : 'text-neutral-800'
          )}
        >
          {headline}
        </h2>
      </div>

      {/* Right: body + action */}
      {(body || action) && (
        <div className="flex flex-col justify-end gap-6">
          {body && (
            <p
              className={cn(
                'font-sans font-regular text-md leading-relaxed',
                dark ? 'text-neutral-50 opacity-70' : 'text-neutral-500'
              )}
            >
              {body}
            </p>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  )
}
