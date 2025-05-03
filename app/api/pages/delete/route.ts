import {
  dbConnect,
  getUnauthenticatedResponse,
  UserUtils,
  PineconeUtils,
  Pages
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Page } from '@/types'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()
    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/pages')),
        {
          status: 200
        }
      )

    const { pageId } = (await req.json()) as { pageId?: string }

    if (!pageId) throw new Error('No pageId provided in body')

    const pinecone = new PineconeUtils(user)
    const deletedVectors = await pinecone.deletePageVectors(pageId)
    if (!deletedVectors) throw new Error('Could not delete page vectors')

    const page = await Pages.findOneAndDelete<Page>({
      user: user._id,
      _id: pageId
    })

    if (!page) throw new Error('Deletion not acknowledged')

    const apiResponse: APIResponse<{ page: Page }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Page Removed',
        description: 'Successfully removed the page'
      },
      page
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/pages/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
