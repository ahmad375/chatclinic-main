import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { dbConnect, UserUtils } from '@/server'
import { DashboardDocumentsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Documents'
}

export default async function __DashboardDocumentsPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user)
    return redirect(`/login?next=${encodeURIComponent('/dashboard/documents')}`)

  return <DashboardDocumentsPage />
}
