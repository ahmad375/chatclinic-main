import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  dbConnect,
  Documents,
  Pages,
  Questions,
  Tickets,
  UserUtils,
  Videos
} from '@/server'
import { TicketStatus } from '@/enums'
import { DashboardIndexPage } from '@/components/pages'
import { type DashboardToDoListProps } from '@/components/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default async function __DashboardIndexPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user) redirect('/login')

  if(!user.isVerified) redirect('/verify')

  const hasADataSource = !!(
    (await Questions.count({ user: user._id })) ||
    (await Documents.count({ user: user._id })) ||
    (await Pages.count({ user: user._id })) ||
    (await Videos.count({ user: user._id }))
  )

  const hasAResolvedTicket = !!(await Tickets.count({
    user: user._id,
    status: TicketStatus.Resolved
  }))

  const props: DashboardToDoListProps = {
    hasADataSource,
    hasAResolvedTicket
  }

  return <DashboardIndexPage {...props} />
}
