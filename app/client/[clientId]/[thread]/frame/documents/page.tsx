import { Documents, UserUtils, dbConnect } from '@/server'
import { toPlainObject } from '@/lib'
import { FrameProvider } from '@/components/providers'
import { FrameDocumentsPage } from '@/components/pages'
import type { FramePageProps, Document } from '@/types'

export default async function __FrameDocumentsPage({
  params: { clientId, thread }
}: FramePageProps) {
  await dbConnect()

  const user = await UserUtils.getUserByClientId(clientId)

  if (!user) return null

  const documents = await Documents.find<Document>({
    user: user._id,
    draft: false
  }).sort({
    createdAt: 'desc'
  })

  return (
    <FrameProvider user={toPlainObject(user)} {...{ thread }}>
      <FrameDocumentsPage documents={toPlainObject(documents)} />
    </FrameProvider>
  )
}
