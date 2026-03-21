import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin — The Vale',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userEmail: string | undefined

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    userEmail = user?.email ?? undefined
  } catch {
    // Not critical
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col font-sans">
      <AdminNav userEmail={userEmail} />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
