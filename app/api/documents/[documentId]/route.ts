import {
  dbConnect,
  Documents,
  getUnauthenticatedResponse,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Document } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  { params: { documentId } }: { params: { documentId: string } }
) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(
          getUnauthenticatedResponse(`/dashboard/documents/${documentId}`)
        ),
        {
          status: 200
        }
      )

    const document = await Documents.findOne<Document>({
      user: user._id,
      _id: documentId
    })

    if (!document) {
      const notFoundAPIResponse: APIResponse = {
        success: false,
        notification: {
          type: 'error',
          title: 'Document Not Found',
          description: 'The document you are looking for does not exist'
        },
        nextPath: '/dashboard/documents'
      }
      return new Response(JSON.stringify(notFoundAPIResponse), {
        status: 200
      })
    }

    const apiResponse: APIResponse<{
      document: Document
    }> = {
      success: true,
      document
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/documents/[documentId] error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
