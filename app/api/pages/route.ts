import {
  dbConnect,
  UserUtils,
  getPageParam,
  getUnauthenticatedResponse,
  Pages
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Page } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
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

    const page = getPageParam(req)

    const q = () =>
      Pages.find<Page>({
        user: user._id
      })

    const totalPages = await q().countDocuments()

    const pages = await q()
      .sort({
        createdAt: 'desc'
      })
      .skip((page - 1) * PageLimit)
      .limit(PageLimit)

    const apiResponse: APIResponse<{
      pages: Page[]
      totalPages: number
    }> = {
      success: true,
      pages,
      totalPages
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/pages error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
