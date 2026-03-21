'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type DayStatus = 'available' | 'booked' | 'blocked'

interface AvailabilityRecord {
  id?: string
  date: string
  status: DayStatus
  note?: string
}

interface AvailabilityCalendarProps {
  initialData: AvailabilityRecord[]
}

const statusCycle: Record<DayStatus, DayStatus> = {
  available: 'booked',
  booked: 'blocked',
  blocked: 'available',
}

const statusColors: Record<DayStatus, string> = {
  available: 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100',
  booked: 'bg-gold-400 text-neutral-800 hover:bg-gold-500',
  blocked: 'bg-neutral-800 text-neutral-50 hover:bg-neutral-700',
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function AvailabilityCalendar({ initialData }: AvailabilityCalendarProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [availability, setAvailability] = useState<Record<string, DayStatus>>(() => {
    const map: Record<string, DayStatus> = {}
    initialData.forEach((r) => { map[r.date] = r.status })
    return map
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1) }
    else setMonth(month - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1) }
    else setMonth(month + 1)
  }

  const toggleDay = useCallback((dateStr: string) => {
    setAvailability((prev) => {
      const current = prev[dateStr] || 'available'
      const next = statusCycle[current]
      if (next === 'available') {
        const updated = { ...prev }
        delete updated[dateStr]
        return updated
      }
      return { ...prev, [dateStr]: next }
    })
    setSaved(false)
  }, [])

  const saveChanges = async () => {
    setSaving(true)
    const supabase = createClient()

    const records = Object.entries(availability).map(([date, status]) => ({
      date,
      status,
    }))

    // Upsert all records
    for (const record of records) {
      await supabase
        .from('availability')
        .upsert(record, { onConflict: 'date' })
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const cells: Array<{ day: number | null; dateStr: string | null }> = []
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: null, dateStr: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: getDateString(year, month, d) })
  }

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="font-sans text-sm text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-1 border border-neutral-300 rounded-sharp"
        >
          ←
        </button>
        <h3 className="font-sans font-medium text-sm text-neutral-800">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="font-sans text-sm text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-1 border border-neutral-300 rounded-sharp"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center font-sans text-2xs font-medium uppercase tracking-wider text-neutral-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {cells.map((cell, idx) => {
          if (!cell.day || !cell.dateStr) {
            return <div key={`empty-${idx}`} />
          }
          const status = availability[cell.dateStr] || 'available'
          const isToday =
            cell.dateStr ===
            getDateString(today.getFullYear(), today.getMonth(), today.getDate())
          return (
            <button
              key={cell.dateStr}
              onClick={() => toggleDay(cell.dateStr!)}
              className={cn(
                'aspect-square flex items-center justify-center font-sans text-xs rounded-sharp transition-colors border',
                statusColors[status],
                isToday ? 'border-gold-400' : 'border-transparent'
              )}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        {(Object.keys(statusColors) as DayStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={cn(
                'w-4 h-4 rounded-sharp border border-neutral-200',
                status === 'available' ? 'bg-neutral-100' :
                status === 'booked' ? 'bg-gold-400' : 'bg-neutral-800'
              )}
            />
            <span className="font-sans text-xs text-neutral-500 capitalize">
              {status}
            </span>
          </div>
        ))}
        <p className="font-sans text-xs text-neutral-400">
          Click to cycle: available → booked → blocked
        </p>
      </div>

      {/* Save */}
      <button
        onClick={saveChanges}
        disabled={saving}
        className={cn(
          'font-sans font-semibold text-xs uppercase tracking-btn px-6 py-3 rounded-sharp transition-colors',
          saved
            ? 'bg-sage-600 text-white'
            : 'bg-neutral-800 text-neutral-50 hover:bg-neutral-700',
          saving ? 'opacity-60 cursor-not-allowed' : ''
        )}
      >
        {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  )
}
