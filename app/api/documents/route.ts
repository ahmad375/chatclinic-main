import {
  dbConnect,
  Documents,
  getPageParam,
  getUnauthenticatedResponse,
  UserUtils
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Document } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
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

    const page = getPageParam(req)

    const q = () =>
      Documents.find<Document>({
        user: user._id
      })

    const totalDocuments = await q().countDocuments()

    const documents = await q()
      .sort({
        createdAt: 'desc'
      })
      .skip((page - 1) * PageLimit)
      .limit(PageLimit)

    const apiResponse: APIResponse<{
      documents: Document[]
      totalDocuments: number
    }> = {
      success: true,
      documents,
      totalDocuments
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/documents error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
