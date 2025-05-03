import { ThreadUtils, UserUtils, dbConnect } from '@/server'
import { toPlainObject } from '@/lib'
import { FrameProvider } from '@/components/providers'
import { FramePage } from '@/components/pages'
import type { FramePageProps } from '@/types'

export default async function __FramePage({
  params: { clientId, thread }
}: FramePageProps) {
  await dbConnect()

  const user = await UserUtils.getUserByClientId(clientId)

  if (!user) return null

  await ThreadUtils.createThread(user, thread)

  return (
    <FrameProvider user={toPlainObject(user)} {...{ thread }}>
      <FramePage />
    </FrameProvider>
  )
}
