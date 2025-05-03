import {
  dbConnect,
  Questions,
  getUnauthenticatedResponse,
  UserUtils,
  PineconeUtils,
  Paywall
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Question } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()
    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/questions')),
        {
          status: 200
        }
      )

    const paywall = new Paywall(user)
    const canCreateQuestion = await paywall.canCreateQuestion()
    if (!canCreateQuestion.value)
      return new Response(
        JSON.stringify({
          success: false,
          notification: canCreateQuestion.notification
        } as APIResponse)
      )

    const { question: __question, answer } = (await req.json()) as {
      question?: string
      answer?: string
    }

    if (!__question || !answer) throw new Error('Bad body')

    const question = (await Questions.create<Question>({
      user: user._id,
      question: __question,
      answer
    })) as Question

    if (!question) throw new Error('No question created')

    const pinecone = new PineconeUtils(user)
    const vectorized = await pinecone.vectorizeQuestion(question)

    if (!vectorized) {
      // must delete question that was just created

      await Questions.deleteOne({
        user: user._id,
        _id: question._id
      })

      throw new Error('Could not vectorize question/answer pair')
    }

    const apiResponse: APIResponse<{ question: Question }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Question Created',
        description: 'Successfully created a new question'
      },
      question,
      nextPath: '/dashboard/questions'
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/questions/new error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
