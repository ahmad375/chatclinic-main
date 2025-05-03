import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Users } from '@/server'
import type { User } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { email, recoverToken } =
      (await req.json()) as {
        email?: string
        recoverToken?: string
      }

    if (!email || !recoverToken)
      return {
        success: false,
        notification: {
          type: 'error',
          title: 'Your request is invalid.',
          // description: 'Please sign up again.'
        }
      }

    await dbConnect()

    const user = await Users.findOne<User>({email})
    if (!user){
      return {
        success: false,
        notification: {
          type: 'error',
          title: 'No such user exists',
          description: 'Please sign up again.'
        }
      }
    }else {
      if (user.recoverToken !== recoverToken)
        return {
          success: false,
          notification: {
            type: 'error',
            title: 'Invalid token!',
            // description: 'Please sign up again.'
          }
        }
      if (user.recoverToken === recoverToken){
        const { acknowledged } = await Users.updateOne<User>(
          {
            email: email
          },
          {
            isVerified: true,
            recoverToken: null
          }
        )
  
        if (!acknowledged)
          throw new Error('Failed to verify your email')
        
        return new Response(JSON.stringify({success:true}), {
          status: 200
        })
      }
    }

    // return new Response(JSON.stringify({success:true}), {
    //   status: 200
    // })
  } catch (e) {
    console.log(`/api/verify error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
