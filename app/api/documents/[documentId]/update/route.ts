import {
  dbConnect,
  Documents,
  getUnauthenticatedResponse,
  PineconeUtils,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Document } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
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

    const { title, subtitle, content, plainContent, draft } =
      (await req.json()) as Pick<
        Document,
        'title' | 'subtitle' | 'content' | 'plainContent' | 'draft'
      >

    if (draft === false && !(title && subtitle && content && plainContent))
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'Document Publish Failed',
            description:
              'Could not publish the document as it is missing required fields'
          }
        }),
        {
          status: 200
        }
      )

    // Vectorize, delete previous
    // use title, subtitle, content
    // to create a partial document, so we can only update upon successful vectorization
    if (draft === false) {
      const pinecone = new PineconeUtils(user)

      // Delete previous if applicable
      await pinecone.deleteDocumentVectors(document._id.toString())

      // Vectorize updated document
      const vectorized = await pinecone.vectorizeDocument({
        _id: document._id,
        title,
        subtitle,
        content,
        plainContent
      } as Document)

      if (!vectorized) throw new Error('Could not vectorize document')
    }

    const updateResponse = await Documents.updateOne<Document>(
      {
        user: user._id,
        _id: document._id
      },
      {
        title,
        subtitle,
        content,
        plainContent,
        draft
      }
    )

    if (!updateResponse.acknowledged) {
      const failedUpdateApiResponse: APIResponse = {
        success: false,
        notification: {
          type: 'error',
          title: 'Document Update Failed',
          description: 'Temporarily unable to update the document'
        }
      }
      return new Response(JSON.stringify(failedUpdateApiResponse), {
        status: 200
      })
    }

    const apiResponse: APIResponse =
      draft === false
        ? {
            success: true,
            notification: {
              type: 'success',
              title: 'Document Published',
              description: `Successfully published the document titled "${document.title}"`
            },
            nextPath: '/dashboard/documents'
          }
        : {
            success: true
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
