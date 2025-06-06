import { UnexpectedErrorResponse } from '@/lib'
import { dbConnect, Users } from '@/server'
import type { User } from '@/types'
import bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { email, deviceToken } =
      (await req.json()) as Partial<User>

    if (!email || !deviceToken )
      throw new Error('Bad body')

    await dbConnect()
    const user = await Users.findOne({ email }) as User

    if (!user)
      return new Response(JSON.stringify({
        success: false,
        error: 'No such user exists.'
      }), {
        status: 200
      })

		await Users.updateOne(
			{
				_id: user._id
			},
			{
				deviceToken: deviceToken
			}
		)

    const token = sign(
      {
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      }
    );
    
    return new Response(JSON.stringify({
      success:true,
      token
    }), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/auth/login_social error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}