import {
    dbConnect,
    UserUtils,
    getUnauthenticatedResponse,
    Users
  } from '@/server'
  import { UnexpectedErrorResponse } from '@/lib'
  import type { User, APIResponse } from '@/types'
  
  export const dynamic = 'force-dynamic'
  
  export async function POST(req: Request) {
    try {
      await dbConnect()
  
      const user = await UserUtils.getAuthenticatedUser()
  
      if (!user)
        return new Response(
          JSON.stringify(getUnauthenticatedResponse('/dashboard/profile')),
          {
            status: 200
          }
        )
  
      const { new_name } = (await req.json()) as { new_name: string }
  
      if (!new_name) throw new Error(`The username can't be empty`)
  
      const updatedUser = await Users.findOneAndUpdate<User>(
        {
          _id: user._id
        },
        {
          name: new_name
        },
        {
          new: true
        }
      )
  
      if (!updatedUser) throw new Error('Could not update user')
  
      const apiResponse: APIResponse = {
        success: true,
        notification: {
          type: 'success',
          title: 'Updated your name',
          description: "Successfully updated your username"
        },
        // user: updatedUser
      }
  
      return new Response(JSON.stringify(apiResponse), {
        status: 200
      })
    } catch (e) {
      console.log(`/api/user/profile/updateUserName error: ${e}`)
      return new Response(JSON.stringify(UnexpectedErrorResponse), {
        status: 200
      })
    }
  }
  