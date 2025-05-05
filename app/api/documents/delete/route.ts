import {
  dbConnect,
  Documents,
  getUnauthenticatedResponse,
  UserUtils,
  PineconeUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Document } from '@/types'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()
    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/documents')),
        {
          status: 200
        }
      )

    const { documentId } = (await req.json()) as { documentId?: string }

    if (!documentId) throw new Error('No documentId provided in body')

    const pinecone = new PineconeUtils(user)
    const deletedVectors = await pinecone.deleteDocumentVectors(documentId)
    if (!deletedVectors) throw new Error('Could not delete document vectors')

    const document = await Documents.findOneAndDelete<Document>({
      user: user._id,
      _id: documentId
    })

    if (!document) throw new Error('Deletion not acknowledged')

    const apiResponse: APIResponse<{ document: Document }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Document Deleted',
        description: `Successfully deleted the document titled "${document.title}"`
      },
      document
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/documents/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
