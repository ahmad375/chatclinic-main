import { dbConnect, UserUtils } from '@/server'
import { toPlainObject } from '@/lib'
import { WidgetProvider } from '@/components/providers'
import { WidgetPage } from '@/components/pages'
import type { WidgetPageProps } from '@/types'

export default async function __WidgetPage({
  params: { clientId, thread }
}: WidgetPageProps) {
  await dbConnect()

  const user = await UserUtils.getUserByClientId(clientId)

  if (!user) return null
  if (!user.widgetDetected) await UserUtils.detectWidget(user)

  return (
    <WidgetProvider user={toPlainObject(user)} {...{ thread }}>
      <WidgetPage />
    </WidgetProvider>
  )
}
