import { UserUtils, dbConnect } from '@/server'
import { toPlainObject } from '@/lib'
import { FrameProvider } from '@/components/providers'
import { FrameLiveChatPage } from '@/components/pages'
import type { FramePageProps, Document } from '@/types'

export default async function __FrameDocumentsPage({
  params: { clientId, thread }
}: FramePageProps) {
  await dbConnect()

  const user = await UserUtils.getUserByClientId(clientId)

  if (!user) return null

  return (
    <FrameProvider user={toPlainObject(user)} {...{ thread }}>
      <FrameLiveChatPage />
    </FrameProvider>
  )
}
