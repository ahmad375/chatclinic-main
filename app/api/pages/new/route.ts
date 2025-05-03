import {
  dbConnect,
  getUnauthenticatedResponse,
  Pages,
  UserUtils,
  PineconeUtils,
  Paywall
} from '@/server'
import { getURLMetadata, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Page } from '@/types'

export const dynamic = 'force-dynamic'
// Allow time for scraping of page content
export const maxDuration = 300

export async function POST(req: Request) {
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

    const paywall = new Paywall(user)
    const canCreatePage = await paywall.canCreatePage()
    if (!canCreatePage.value)
      return new Response(
        JSON.stringify({
          success: false,
          notification: canCreatePage.notification
        } as APIResponse),
        {
          status: 200
        }
      )

    const { url } = (await req.json()) as { url?: string }

    if (!url) throw new Error('No URL provided in body')

    const existingPage = await Pages.findOne<Page>({
      user: user._id,
      url
    })

    if (existingPage)
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'Duplicate Page',
            description: `You have already added a page with the URL "${url}"`
          }
        } as APIResponse),
        {
          status: 200
        }
      )

    const { title, description, image } = await getURLMetadata(url)

    const page = (await Pages.create<Page>({
      user: user._id,
      url,
      title,
      description,
      image
    })) as Page

    if (!page) throw new Error('No page created')

    const pinecone = new PineconeUtils(user)
    const vectorized = await pinecone.vectorizePage(page)

    if (!vectorized) {
      await Pages.deleteOne({
        user: user._id,
        _id: page._id
      })

      throw new Error('Could not vectorize page')
    }

    return new Response(
      JSON.stringify({
        success: true,
        notification: {
          type: 'success',
          title: 'Page Added',
          description: 'Successfully added a new page'
        },
        page,
        nextPath: '/dashboard/pages'
      } as APIResponse<{ page: Page }>),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/pages/new error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
