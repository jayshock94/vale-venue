'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

const sections = [
  {
    label: 'Content',
    items: [
      { href: '/admin', label: 'Dashboard', icon: '◻' },
      { href: '/admin/content', label: 'Content', icon: '✎' },
      { href: '/admin/gallery', label: 'Gallery', icon: '⊞' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/admin/pricing', label: 'Pricing', icon: '$' },
      { href: '/admin/availability', label: 'Availability', icon: '◷' },
      { href: '/admin/inquiries', label: 'Inquiries', icon: '✉' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: '⚙' },
    ],
  },
]

function SidebarItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 text-xs font-sans transition-colors border-l-[3px]',
        isActive
          ? 'border-gold-400 bg-gold-50 text-gold-600 font-medium'
          : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 font-normal'
      )}
    >
      <span className="text-sm w-4 text-center flex-shrink-0">{item.icon}</span>
      {item.label}
    </Link>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[200px] flex-shrink-0 bg-white border-r border-[#E0E0E0] flex flex-col overflow-y-auto">
      <div className="flex flex-col py-4 flex-1">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-4 py-1 text-2xs font-sans font-semibold uppercase tracking-label text-neutral-400">
              {section.label}
            </p>
            {section.items.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                isActive={
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  )
}
