'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface CalendarAvailability {
  date: string   // YYYY-MM-DD
  status: 'available' | 'booked' | 'blocked'
}

interface PublicCalendarProps {
  availability?: CalendarAvailability[]
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// Deterministic: same date always returns the same result. Weekends book out
// faster than weekdays, which looks realistic for a venue calendar.
function isMockBooked(dateStr: string): boolean {
  const date = new Date(dateStr + 'T12:00:00')
  const dow = date.getDay()
  const day = date.getDate()
  const hash = (day * 17 + dow * 31) % 100
  if (dow === 6) return hash < 62 // Sat ~62% booked
  if (dow === 5) return hash < 52 // Fri ~52% booked
  if (dow === 0) return hash < 22 // Sun ~22%
  return hash < 10               // Weekdays ~10%
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function addMonths(base: Date, n: number): [number, number] {
  const d = new Date(base.getFullYear(), base.getMonth() + n, 1)
  return [d.getFullYear(), d.getMonth()]
}

function formatFull(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

// ─── Single month grid ────────────────────────────────────────────────────────
interface MonthGridProps {
  year: number
  month: number
  todayStr: string
  bookedSet: Set<string>
  selected: string | null
  onSelect: (date: string) => void
}

function MonthGrid({ year, month, todayStr, bookedSet, selected, onSelect }: MonthGridProps) {
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: Array<{ day: number; dateStr: string } | null> = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: toDateStr(year, month, d) })
  }
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div>
      {/* Month heading */}
      <p className="font-serif text-[length:var(--text-20)] text-neutral-800 mb-5 text-center">
        {MONTHS[month]} {year}
      </p>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="text-center font-sans font-medium text-[length:var(--text-10)] uppercase tracking-wider text-neutral-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-[3px]">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={`empty-${idx}`} className="aspect-square" />

          const { day, dateStr } = cell
          const isPast = dateStr < todayStr
          const isToday = dateStr === todayStr
          const isBooked = bookedSet.has(dateStr) || isMockBooked(dateStr)
          const isSelected = dateStr === selected

          // Past — non-interactive, faded
          if (isPast) {
            return (
              <div key={dateStr} className="aspect-square flex items-center justify-center">
                <span className="font-sans text-[length:var(--text-13)] text-neutral-300 select-none">
                  {day}
                </span>
              </div>
            )
          }

          // Booked — non-interactive, clearly unavailable
          if (isBooked && !isSelected) {
            return (
              <div
                key={dateStr}
                className="aspect-square flex items-center justify-center rounded-[var(--calendar-day-radius)] bg-neutral-100"
                title="Unavailable"
              >
                <span className="font-sans text-[length:var(--text-13)] text-neutral-300 line-through select-none">
                  {day}
                </span>
              </div>
            )
          }

          // Available (or selected) — interactive
          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelect(dateStr)}
              className={cn(
                'aspect-square flex items-center justify-center rounded-[var(--calendar-day-radius)]',
                'font-sans text-[length:var(--text-13)] transition-all duration-[var(--transition-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
                isSelected
                  ? 'bg-gold-400 text-neutral-800 font-semibold'
                  : isToday
                  ? 'bg-neutral-0 border-2 border-gold-400 text-neutral-800 font-medium hover:bg-gold-50'
                  : 'bg-neutral-0 border border-rule text-neutral-700 hover:border-gold-400 hover:text-gold-600'
              )}
              aria-label={`${formatFull(dateStr)}${isToday ? ' (today)' : ''}`}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Legend item ──────────────────────────────────────────────────────────────
function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-5 h-5 rounded-[var(--calendar-day-radius)] flex-shrink-0', className)} />
      <span className="font-sans font-light text-[length:var(--text-12)] text-neutral-500">{label}</span>
    </div>
  )
}

// ─── Public calendar section ──────────────────────────────────────────────────
export default function PublicCalendar({ availability = [] }: PublicCalendarProps) {
  const today = new Date()
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

  const [offset, setOffset] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const bookedSet = useMemo(
    () => new Set(availability.filter((r) => r.status !== 'available').map((r) => r.date)),
    [availability]
  )

  const [year1, month1] = addMonths(today, offset)
  const [year2, month2] = addMonths(today, offset + 1)

  function handleSelect(date: string) {
    setSelected((prev) => (prev === date ? null : date))
  }

  return (
    <section className="bg-neutral-0 py-section px-5 md:px-page border-t border-rule">
      <div className="max-w-content mx-auto">

        {/* Header + nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold font-sans uppercase tracking-eyebrow text-gold-600 mb-4">
              Check availability
            </p>
            <h2 className="font-serif text-4xl text-neutral-800 tracking-tightest">
              Find your <em className="italic text-gold-600">date</em>.
            </h2>
          </div>

          {/* Month navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOffset((o) => Math.max(0, o - 2))}
              disabled={offset === 0}
              aria-label="Previous months"
              className={cn(
                'h-9 w-9 flex items-center justify-center border rounded-sharp',
                'font-sans text-sm transition-colors duration-[var(--transition-fast)]',
                offset === 0
                  ? 'border-rule text-neutral-300 cursor-not-allowed'
                  : 'border-rule text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
              )}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setOffset((o) => Math.min(10, o + 2))}
              disabled={offset >= 10}
              aria-label="Next months"
              className={cn(
                'h-9 w-9 flex items-center justify-center border rounded-sharp',
                'font-sans text-sm transition-colors duration-[var(--transition-fast)]',
                offset >= 10
                  ? 'border-rule text-neutral-300 cursor-not-allowed'
                  : 'border-rule text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
              )}
            >
              →
            </button>
          </div>
        </div>

        {/* Two-month grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <MonthGrid
            year={year1} month={month1}
            todayStr={todayStr} bookedSet={bookedSet}
            selected={selected} onSelect={handleSelect}
          />
          <MonthGrid
            year={year2} month={month2}
            todayStr={todayStr} bookedSet={bookedSet}
            selected={selected} onSelect={handleSelect}
          />
        </div>

        {/* Legend */}
        <div className="mt-8 border-t border-rule-light pt-5 flex flex-wrap gap-5">
          <LegendSwatch className="bg-neutral-0 border border-rule" label="Available" />
          <LegendSwatch className="border-2 border-gold-400 bg-neutral-0" label="Today" />
          <LegendSwatch className="bg-gold-400" label="Selected" />
          <LegendSwatch className="bg-neutral-100" label="Booked" />
        </div>

        {/* Selected date CTA — slides in when a date is chosen */}
        {selected && (
          <div className="mt-6 border-t border-rule pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-sans font-semibold text-base text-neutral-800">
                {formatFull(selected)} looks open.
              </p>
              <p className="font-sans font-light text-sm text-neutral-500 mt-1">
                Send an inquiry and Bobbi will confirm within one business day.
              </p>
            </div>
            <Button
              href={`/contact?date=${selected}`}
              variant="gold"
              size="md"
              className="flex-shrink-0"
            >
              Reserve This Date
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}
