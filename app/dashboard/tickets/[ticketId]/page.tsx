import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { UserUtils, dbConnect } from '@/server'
import { DashboardTicketPage } from '@/components/pages'

interface DashboardTicketProps {
  params: { ticketId: string }
}

export const metadata: Metadata = {
  title: 'Loading...'
}

export default async function __DashboardTicketPage({
  params: { ticketId }
}: DashboardTicketProps) {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user)
    return redirect(
      `/login?next=${encodeURIComponent(`/dashboard/tickets/${ticketId}`)}`
    )

  return <DashboardTicketPage {...{ ticketId }} />
}
