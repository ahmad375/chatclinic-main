import { redirect } from 'next/navigation'
import { UserUtils, dbConnect } from '@/server'
import { toPlainObject } from '@/lib'
import { ChatwizardScript } from '@/components/scripts'
import { ElementsProvider } from '@/components/providers'
import { DashboardLayout } from '@/components/layouts'
import type { LayoutProps } from '@/types'

export default async function __DashboardLayout({ children }: LayoutProps) {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user) redirect('/login')

  if (!user.isVerified) redirect('/verify')

  return user && user.isVerified ? (
    <>
      {/* <ChatwizardScript /> */}
      <ElementsProvider>
        <DashboardLayout user={toPlainObject(user)}>{children}</DashboardLayout>
      </ElementsProvider>
    </>
  ) : null
}
