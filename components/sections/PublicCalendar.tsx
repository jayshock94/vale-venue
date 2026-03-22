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
function isMockBooked(dateStr: string): boolean {
  const date = new Date(dateStr + 'T12:00:00')
  const dow = date.getDay()
  const day = date.getDate()
  const hash = (day * 17 + dow * 31) % 100
  if (dow === 6) return hash < 62
  if (dow === 5) return hash < 52
  if (dow === 0) return hash < 22
  return hash < 10
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
function addMonths(base: Date, n: number): [number, number] {
  const d = new Date(base.getFullYear(), base.getMonth() + n, 1)
  return [d.getFullYear(), d.getMonth()]
}
function offsetFromBase(base: Date, year: number, month: number) {
  return (year - base.getFullYear()) * 12 + (month - base.getMonth())
}
function formatShort(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}
function formatLong(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronDown({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Nav button ───────────────────────────────────────────────────────────────
function NavBtn({
  onClick, disabled, label, children,
}: { onClick: () => void; disabled: boolean; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'h-9 w-9 flex items-center justify-center border rounded-sharp',
        'transition-colors duration-[var(--transition-fast)]',
        disabled
          ? 'border-rule text-neutral-300 cursor-not-allowed'
          : 'border-rule text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
      )}
    >
      {children}
    </button>
  )
}

// ─── Month/year picker ────────────────────────────────────────────────────────
// M3-inspired: shows all 12 months for the selected year. Navigate years
// with chevrons. Past months disabled.
interface PickerProps {
  currentYear: number
  currentMonth: number
  today: Date
  onSelect: (year: number, month: number) => void
  onClose: () => void
}

function MonthYearPicker({ currentYear, currentMonth, today, onSelect, onClose }: PickerProps) {
  const [pickerYear, setPickerYear] = useState(currentYear)
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const maxYear = todayYear + 3

  return (
    <div className="max-w-xs mx-auto py-2">
      {/* Year navigation */}
      <div className="flex items-center justify-between mb-6">
        <NavBtn
          onClick={() => setPickerYear((y) => Math.max(todayYear, y - 1))}
          disabled={pickerYear <= todayYear}
          label="Previous year"
        >
          <ChevronLeft />
        </NavBtn>
        <span className="font-serif font-semibold text-[length:var(--text-24)] text-neutral-800 select-none">
          {pickerYear}
        </span>
        <NavBtn
          onClick={() => setPickerYear((y) => Math.min(maxYear, y + 1))}
          disabled={pickerYear >= maxYear}
          label="Next year"
        >
          <ChevronRight />
        </NavBtn>
      </div>

      {/* Month grid — 3 × 4 */}
      <div className="grid grid-cols-3 gap-2">
        {MONTHS_SHORT.map((name, i) => {
          const isPast = pickerYear === todayYear && i < todayMonth
          const isActive = pickerYear === currentYear && i === currentMonth
          return (
            <button
              key={name}
              type="button"
              disabled={isPast}
              onClick={() => { onSelect(pickerYear, i); onClose() }}
              className={cn(
                'h-10 rounded-sharp font-sans font-semibold text-[length:var(--text-11)] uppercase tracking-btn',
                'transition-colors duration-[var(--transition-fast)]',
                isActive
                  ? 'bg-gold-400 text-neutral-800'
                  : isPast
                  ? 'text-neutral-300 cursor-not-allowed'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              {name}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 block mx-auto font-sans text-[length:var(--text-12)] text-neutral-400 hover:text-neutral-600 transition-colors duration-[var(--transition-fast)]"
      >
        Cancel
      </button>
    </div>
  )
}

// ─── Single month grid ────────────────────────────────────────────────────────
interface MonthGridProps {
  year: number
  month: number
  todayStr: string
  bookedSet: Set<string>
  rangeStart: string | null
  rangeEnd: string | null
  onSelect: (date: string) => void
  onMonthClick: () => void
}

function MonthGrid({
  year, month, todayStr, bookedSet,
  rangeStart, rangeEnd, onSelect, onMonthClick,
}: MonthGridProps) {
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
      {/* Clickable month heading — M3: tap to open year/month picker */}
      <button
        type="button"
        onClick={onMonthClick}
        className="w-full flex items-center justify-center gap-1.5 mb-5 group"
        aria-label={`Jump to a different month (currently ${MONTHS[month]} ${year})`}
      >
        <span className="font-serif font-semibold text-[length:var(--text-20)] text-neutral-800 group-hover:text-gold-600 transition-colors duration-[var(--transition-fast)]">
          {MONTHS[month]} {year}
        </span>
        <span className="text-neutral-400 group-hover:text-gold-600 transition-colors duration-[var(--transition-fast)] mt-0.5">
          <ChevronDown />
        </span>
      </button>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center font-sans font-medium text-[length:var(--text-10)] uppercase tracking-wider text-neutral-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-[3px]">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={`e-${idx}`} className="aspect-square" />

          const { day, dateStr } = cell
          const isPast = dateStr < todayStr
          const isToday = dateStr === todayStr
          const isBooked = bookedSet.has(dateStr) || isMockBooked(dateStr)
          const isStart = dateStr === rangeStart
          const isEnd = dateStr === rangeEnd
          const isSelected = isStart || isEnd
          const inRange = !!(
            rangeStart && rangeEnd &&
            dateStr > rangeStart && dateStr < rangeEnd
          )

          if (isPast) {
            return (
              <div key={dateStr} className="aspect-square flex items-center justify-center">
                <span className="font-sans text-[length:var(--text-13)] text-neutral-300 select-none">{day}</span>
              </div>
            )
          }

          if (isBooked && !isSelected && !isToday) {
            return (
              <div key={dateStr} className="aspect-square flex items-center justify-center rounded-[var(--calendar-day-radius)] bg-neutral-100">
                <span className="font-sans text-[length:var(--text-13)] text-neutral-300 line-through select-none">{day}</span>
              </div>
            )
          }

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelect(dateStr)}
              aria-label={`${formatLong(dateStr)}${isToday ? ' (today)' : ''}${isStart ? ' (range start)' : ''}${isEnd ? ' (range end)' : ''}`}
              aria-pressed={isSelected}
              className={cn(
                'aspect-square flex items-center justify-center',
                'font-sans text-[length:var(--text-13)] transition-all duration-[var(--transition-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
                isSelected
                  ? 'rounded-[var(--calendar-day-radius)] bg-gold-400 text-neutral-800 font-semibold'
                  : inRange
                  ? 'bg-gold-100 text-neutral-800'
                  : isToday
                  ? 'rounded-[var(--calendar-day-radius)] bg-neutral-0 border-2 border-gold-400 text-neutral-800 font-medium hover:bg-gold-50'
                  : 'rounded-[var(--calendar-day-radius)] bg-neutral-0 border border-rule text-neutral-700 hover:border-gold-400 hover:text-gold-600'
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Legend swatch ────────────────────────────────────────────────────────────
function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-5 h-5 rounded-[var(--calendar-day-radius)] flex-shrink-0', className)} />
      <span className="font-sans font-regular text-[length:var(--text-12)] text-neutral-500">{label}</span>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function PublicCalendar({ availability = [] }: PublicCalendarProps) {
  const today = new Date()
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

  const [offset, setOffset] = useState(0)

  // M3 range selection: tap once = start, tap again (later date) = end
  const [rangeStart, setRangeStart] = useState<string | null>(null)
  const [rangeEnd, setRangeEnd] = useState<string | null>(null)

  // Month/year picker: which month's heading was tapped
  const [showPicker, setShowPicker] = useState(false)
  const [pickerBase, setPickerBase] = useState<[number, number]>([
    today.getFullYear(), today.getMonth(),
  ])

  const bookedSet = useMemo(
    () => new Set(availability.filter((r) => r.status !== 'available').map((r) => r.date)),
    [availability]
  )

  const [year1, month1] = addMonths(today, offset)
  const [year2, month2] = addMonths(today, offset + 1)

  function handleSelect(date: string) {
    // If no start, or both already set → start fresh
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date)
      setRangeEnd(null)
      return
    }
    // Start set, no end
    if (date === rangeStart) {
      setRangeStart(null) // deselect
    } else if (date < rangeStart) {
      setRangeStart(date) // clicked before start → shift start
    } else {
      setRangeEnd(date) // valid end
    }
  }

  function handleMonthClick(year: number, month: number) {
    setPickerBase([year, month])
    setShowPicker(true)
  }

  function handlePickerSelect(year: number, month: number) {
    const newOffset = offsetFromBase(today, year, month)
    setOffset(Math.max(0, newOffset))
  }

  // CTA messaging
  const hasRange = rangeStart && rangeEnd
  const hasStart = !!rangeStart

  const ctaLabel = hasRange
    ? `${formatShort(rangeStart!)} – ${formatShort(rangeEnd!)} looks open.`
    : hasStart
    ? `${formatLong(rangeStart!)} looks open.`
    : null

  const contactHref = hasRange
    ? `/contact?date=${rangeStart}&dateTo=${rangeEnd}`
    : `/contact?date=${rangeStart}`

  const MAX_OFFSET = 22 // ~24 months total, covers most wedding planning horizons

  return (
    <section id="availability" className="bg-neutral-50 py-section px-5 md:px-page border-t border-rule">
      <div className="max-w-content mx-auto">

        {/* Month nav */}
        <div className="flex justify-end mb-10">
          <div className="flex items-center gap-2">
            <NavBtn
              onClick={() => setOffset((o) => Math.max(0, o - 2))}
              disabled={offset === 0}
              label="Previous months"
            >
              <ChevronLeft />
            </NavBtn>
            <NavBtn
              onClick={() => setOffset((o) => Math.min(MAX_OFFSET, o + 2))}
              disabled={offset >= MAX_OFFSET}
              label="Next months"
            >
              <ChevronRight />
            </NavBtn>
          </div>
        </div>

        {/* Month/year picker overlay — M3-style inline replacement */}
        {showPicker ? (
          <div className="border border-rule rounded-soft bg-neutral-0 px-6 py-6 mb-8">
            <MonthYearPicker
              currentYear={pickerBase[0]}
              currentMonth={pickerBase[1]}
              today={today}
              onSelect={handlePickerSelect}
              onClose={() => setShowPicker(false)}
            />
          </div>
        ) : (
          <>
            {/* Two-month grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <MonthGrid
                year={year1} month={month1}
                todayStr={todayStr} bookedSet={bookedSet}
                rangeStart={rangeStart} rangeEnd={rangeEnd}
                onSelect={handleSelect}
                onMonthClick={() => handleMonthClick(year1, month1)}
              />
              <MonthGrid
                year={year2} month={month2}
                todayStr={todayStr} bookedSet={bookedSet}
                rangeStart={rangeStart} rangeEnd={rangeEnd}
                onSelect={handleSelect}
                onMonthClick={() => handleMonthClick(year2, month2)}
              />
            </div>

            {/* Legend */}
            <div className="mt-8 border-t border-rule-light pt-5 flex flex-wrap gap-5">
              <LegendSwatch className="bg-neutral-0 border border-rule" label="Available" />
              <LegendSwatch className="border-2 border-gold-400 bg-neutral-0" label="Today" />
              <LegendSwatch className="bg-gold-400" label="Selected" />
              <LegendSwatch className="bg-gold-100 border border-gold-200" label="Your range" />
              <LegendSwatch className="bg-neutral-100" label="Booked" />
            </div>
          </>
        )}

        {/* Reserve CTA — always visible, enriched when a date is selected */}
        {!showPicker && (
          <div className="mt-6 border-t border-rule pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {ctaLabel ? (
                <>
                  <p className="font-sans font-semibold text-base text-neutral-800">
                    {ctaLabel}
                  </p>
                  <p className="font-sans font-regular text-sm text-neutral-500 mt-1">
                    Send an inquiry and Bobbi will confirm within one business day.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-sans font-semibold text-base text-neutral-800">
                    Ready to reserve?
                  </p>
                  <p className="font-sans font-regular text-sm text-neutral-500 mt-1">
                    Select a date above or reach out and Bobbi will check availability for you.
                  </p>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {(rangeStart || rangeEnd) && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => { setRangeStart(null); setRangeEnd(null) }}
                >
                  Clear
                </Button>
              )}
              <Button href={contactHref} variant="gold" size="md">
                Request Your Date
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
