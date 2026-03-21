import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn('flex items-center gap-4 w-full', className)}>
      <hr className="flex-1 border-t border-rule" />
      <span className="font-serif italic text-neutral-300 text-base leading-none select-none">
        *
      </span>
      <hr className="flex-1 border-t border-rule" />
    </div>
  )
}
