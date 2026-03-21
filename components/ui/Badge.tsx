import { cn } from '@/lib/utils'

type BadgeVariant = 'gold' | 'sage' | 'rust' | 'amber' | 'ink'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  gold: 'bg-gold-50 text-gold-600 border-l-[3px] border-gold-400',
  sage: 'bg-sage-50 text-sage-600 border-l-[3px] border-sage-600',
  rust: 'bg-rust-50 text-rust-600 border-l-[3px] border-rust-600',
  amber: 'bg-amber-50 text-amber-400 border-l-[3px] border-amber-400',
  ink: 'bg-neutral-100 text-neutral-700 border-l-[3px] border-neutral-700',
}

export function Badge({
  variant = 'gold',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center pl-2 pr-3 py-0.5 text-2xs tracking-label font-semibold uppercase font-sans rounded-sharp',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
