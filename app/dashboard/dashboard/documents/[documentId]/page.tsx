import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { UserUtils, dbConnect } from '@/server'
import { DashboardDocumentPage } from '@/components/pages'

interface DashboardDocumentProps {
  params: { documentId: string }
}

export const metadata: Metadata = {
  title: 'Loading...'
}

export default async function __DashboardDocumentPage({
  params: { documentId }
}: DashboardDocumentProps) {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user)
    return redirect(
      `/login?next=${encodeURIComponent(`/dashboard/documents/${documentId}`)}`
    )

  return <DashboardDocumentPage {...{ documentId }} />
}
