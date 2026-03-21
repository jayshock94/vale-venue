'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StatusFlag } from '@/components/ui/StatusFlag'
import { formatShortDate } from '@/lib/utils'

export interface Inquiry {
  id: string
  full_name: string
  email: string
  event_type: string
  desired_date?: string
  message?: string
  status: 'new' | 'responded' | 'booked' | 'declined'
  created_at: string
}

interface InquiriesTableProps {
  initialInquiries: Inquiry[]
}

const statusOptions: Array<Inquiry['status']> = [
  'new',
  'responded',
  'booked',
  'declined',
]

export default function InquiriesTable({ initialInquiries }: InquiriesTableProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof Inquiry>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const sorted = [...inquiries].sort((a, b) => {
    const av = a[sortField] ?? ''
    const bv = b[sortField] ?? ''
    const cmp = String(av).localeCompare(String(bv))
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: keyof Inquiry) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      )
    }
  }

  const exportCsv = () => {
    const headers = ['Name', 'Email', 'Event Type', 'Desired Date', 'Submitted', 'Status', 'Message']
    const rows = inquiries.map((inq) => [
      inq.full_name,
      inq.email,
      inq.event_type,
      inq.desired_date || '',
      formatShortDate(inq.created_at),
      inq.status,
      (inq.message || '').replace(/,/g, ' '),
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'inquiries.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const SortIcon = ({ field }: { field: keyof Inquiry }) => (
    <span className={`ml-1 ${sortField === field ? 'text-neutral-800' : 'text-neutral-300'}`}>
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div>
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-sans text-sm text-neutral-500">
          {inquiries.length} inquiries
        </p>
        <button
          onClick={exportCsv}
          className="font-sans text-xs font-medium uppercase tracking-btn text-neutral-600 hover:text-neutral-800 border border-neutral-300 rounded-sharp px-4 py-2 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-neutral-0 border border-admin-border rounded-admin overflow-hidden">
        <table className="w-full">
          <thead className="bg-admin-page border-b border-admin-border">
            <tr>
              {(
                [
                  { field: 'full_name', label: 'Name' },
                  { field: 'event_type', label: 'Event' },
                  { field: 'desired_date', label: 'Date' },
                  { field: 'created_at', label: 'Submitted' },
                  { field: 'status', label: 'Status' },
                ] as Array<{ field: keyof Inquiry; label: string }>
              ).map(({ field, label }) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className="text-left font-sans font-medium text-xs uppercase tracking-wider text-neutral-500 py-3 px-4 cursor-pointer hover:text-neutral-800 transition-colors"
                >
                  {label}
                  <SortIcon field={field} />
                </th>
              ))}
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-divider">
            {sorted.map((inq) => (
              <>
                <tr
                  key={inq.id}
                  onClick={() =>
                    setExpandedId(expandedId === inq.id ? null : inq.id)
                  }
                  className="cursor-pointer hover:bg-admin-alt transition-colors"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-sans font-medium text-sm text-neutral-800">
                        {inq.full_name}
                      </p>
                      <p className="font-sans text-xs text-neutral-400">
                        {inq.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-600">
                    {inq.event_type}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-600">
                    {inq.desired_date ? formatShortDate(inq.desired_date) : '—'}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-500">
                    {formatShortDate(inq.created_at)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusFlag status={inq.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-neutral-300 text-xs">
                      {expandedId === inq.id ? '▲' : '▼'}
                    </span>
                  </td>
                </tr>
                {expandedId === inq.id && (
                  <tr key={`${inq.id}-expanded`}>
                    <td colSpan={6} className="px-4 py-4 bg-admin-alt border-b border-admin-border">
                      <div className="flex flex-col gap-4">
                        {inq.message && (
                          <div>
                            <p className="font-sans font-semibold text-xs uppercase tracking-label text-neutral-400 mb-1">
                              Message
                            </p>
                            <p className="font-sans font-light text-sm text-neutral-700">
                              {inq.message}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <p className="font-sans font-semibold text-xs uppercase tracking-label text-neutral-400">
                            Update status:
                          </p>
                          <div className="flex gap-2">
                            {statusOptions.map((s) => (
                              <button
                                key={s}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateStatus(inq.id, s)
                                }}
                                className={`font-sans text-xs px-3 py-1 rounded-sharp border transition-colors ${
                                  inq.status === s
                                    ? 'bg-neutral-800 text-neutral-50 border-neutral-800'
                                    : 'border-neutral-300 text-neutral-500 hover:border-neutral-800 hover:text-neutral-800'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-sans text-sm text-neutral-400">No inquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
