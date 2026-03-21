import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatusFlag } from '@/components/ui/StatusFlag'
import { formatShortDate } from '@/lib/utils'

interface Inquiry {
  id: string
  full_name: string
  email: string
  event_type: string
  desired_date?: string
  status: 'new' | 'responded' | 'booked' | 'declined'
  created_at: string
}

interface StatCardProps {
  label: string
  value: string | number
  href: string
}

function StatCard({ label, value, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-white border border-[#E0E0E0] rounded-admin p-5 hover:border-neutral-400 transition-colors block"
    >
      <p className="font-sans font-semibold text-xs uppercase tracking-label text-neutral-400 mb-2">
        {label}
      </p>
      <p className="font-sans font-medium text-3xl text-neutral-800">{value}</p>
    </Link>
  )
}

const quickActions = [
  { label: 'View Inquiries', href: '/admin/inquiries', desc: 'Review and respond' },
  { label: 'Edit Content', href: '/admin/content', desc: 'Update site copy' },
  { label: 'Manage Gallery', href: '/admin/gallery', desc: 'Upload and arrange photos' },
  { label: 'Set Availability', href: '/admin/availability', desc: 'Block and open dates' },
]

export default async function AdminDashboard() {
  let recentInquiries: Inquiry[] = []
  let totalCount = 0
  let newCount = 0
  let bookedCount = 0

  try {
    const supabase = await createClient()

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const [recentResult, totalResult, newResult, bookedResult] = await Promise.all([
      supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10),
      supabase.from('inquiries').select('id', { count: 'exact', head: true }),
      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new')
        .gte('created_at', oneWeekAgo.toISOString()),
      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'booked')
        .gte('created_at', oneMonthAgo.toISOString()),
    ])

    if (recentResult.data) recentInquiries = recentResult.data
    totalCount = totalResult.count ?? 0
    newCount = newResult.count ?? 0
    bookedCount = bookedResult.count ?? 0
  } catch {
    // Fall through
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-xl text-neutral-800 mb-1">
          Dashboard
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          Overview of The Vale venue activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total inquiries" value={totalCount} href="/admin/inquiries" />
        <StatCard label="New this week" value={newCount} href="/admin/inquiries" />
        <StatCard label="Booked this month" value={bookedCount} href="/admin/inquiries" />
      </div>

      {/* Recent inquiries */}
      <div className="bg-white border border-[#E0E0E0] rounded-admin overflow-hidden mb-10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0E0E0]">
          <h2 className="font-sans font-medium text-sm text-neutral-800">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="font-sans text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            View all →
          </Link>
        </div>
        <table className="w-full">
          <thead className="bg-[#F8F8F8]">
            <tr>
              {['Name', 'Event', 'Desired Date', 'Submitted', 'Status'].map((h) => (
                <th
                  key={h}
                  className="text-left font-sans font-medium text-xs uppercase tracking-wider text-neutral-400 py-2.5 px-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {recentInquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center font-sans text-sm text-neutral-400">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#FAFAFA]">
                  <td className="py-3 px-4 font-sans text-sm text-neutral-800">
                    {inq.full_name}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-500">
                    {inq.event_type}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-500">
                    {inq.desired_date ? formatShortDate(inq.desired_date) : '—'}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-neutral-400">
                    {formatShortDate(inq.created_at)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusFlag status={inq.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-sans font-medium text-sm text-neutral-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white border border-[#E0E0E0] rounded-admin p-4 hover:border-neutral-400 transition-colors"
            >
              <p className="font-sans font-medium text-sm text-neutral-800 mb-1">
                {action.label}
              </p>
              <p className="font-sans text-xs text-neutral-400">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
