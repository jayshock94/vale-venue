import { cn } from '@/lib/utils'

type StatusVariant = 'new' | 'responded' | 'booked' | 'declined' | 'available' | 'blocked'

interface StatusFlagProps {
  status: StatusVariant
  className?: string
}

const statusConfig: Record<StatusVariant, { label: string; classes: string }> = {
  new: { label: 'New', classes: 'bg-amber-50 text-amber-800 border-l-[3px] border-amber-400' },
  responded: { label: 'Responded', classes: 'bg-sage-50 text-sage-600 border-l-[3px] border-sage-600' },
  booked: { label: 'Booked', classes: 'bg-sage-50 text-sage-800 border-l-[3px] border-sage-800' },
  declined: { label: 'Declined', classes: 'bg-rust-50 text-rust-600 border-l-[3px] border-rust-600' },
  available: { label: 'Available', classes: 'bg-neutral-100 text-neutral-600 border-l-[3px] border-neutral-400' },
  blocked: { label: 'Blocked', classes: 'bg-neutral-800 text-neutral-50 border-l-[3px] border-neutral-600' },
}

export function StatusFlag({ status, className }: StatusFlagProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center pl-2 pr-3 py-0.5 text-2xs tracking-label font-semibold uppercase font-sans rounded-sharp',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  )
}
