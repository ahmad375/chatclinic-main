import { Documents, UserUtils, dbConnect } from '@/server'
import { toPlainObject } from '@/lib'
import { FrameProvider } from '@/components/providers'
import { FrameDocumentPage } from '@/components/pages'
import type { FrameDocumentPageProps, Document } from '@/types'

export default async function __FrameDocumentPage({
  params: { clientId, thread, documentId }
}: FrameDocumentPageProps) {
  await dbConnect()

  const user = await UserUtils.getUserByClientId(clientId)

  if (!user) return null

  const document = await Documents.findOne<Document>({
    user: user._id,
    _id: documentId
  })

  if (!document) return null

  return (
    <FrameProvider user={toPlainObject(user)} {...{ thread }}>
      <FrameDocumentPage document={toPlainObject(document)} />
    </FrameProvider>
  )
}
