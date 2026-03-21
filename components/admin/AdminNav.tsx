'use client'

import { signOut } from '@/app/actions/auth'

interface AdminNavProps {
  pageTitle?: string
  userEmail?: string
}

export default function AdminNav({ pageTitle, userEmail }: AdminNavProps) {
  return (
    <header className="h-[var(--admin-nav-height)] bg-neutral-0 border-b border-admin-border flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: logo */}
      <div className="flex items-center gap-2">
        <span className="font-sans font-medium text-sm text-neutral-800">
          The Vale
        </span>
        <span className="font-sans text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-sharp">
          Admin
        </span>
        {pageTitle && (
          <>
            <span className="text-neutral-300 text-xs mx-1">/</span>
            <span className="font-sans text-xs text-neutral-500">{pageTitle}</span>
          </>
        )}
      </div>

      {/* Right: user + sign out */}
      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="font-sans text-xs text-neutral-500 hidden sm:block">
            {userEmail}
          </span>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="font-sans text-xs text-neutral-500 hover:text-neutral-800 transition-colors uppercase tracking-btn"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
