import bcrypt from 'bcryptjs'
import { getServerSession, type Session } from 'next-auth'
import { UnexpectedErrorNotification } from '@/lib'
import type { APIResponse, SignUpResponse, User } from '@/types'
import { authOptions, Users, stripe } from '..'

export class UserUtils {
  private static SaltRounds = 12

  private static stripPassword(user: User | null): User | null {
    try {
      if (!user) throw new Error()

      // don't save or anything, just remove
      user.password = ''

      return user
    } catch {
      return null
    }
  }

  public static async signUp(
    user: Partial<Pick<
      User,
      'name' | 'email' | 'website' | 'tos' | 'tosUserAgent' | 'clientId' | 'plan' | 'customerId' | 'recoverToken'
    >>,
    plainTextPassword: string
  ): Promise<APIResponse<SignUpResponse>> {
    try {
      if(!user.email) throw new Error()
      const email = user.email.toLowerCase()

      if (await Users.findOne<User>({ email }))
        return {
          success: false,
          notification: {
            type: 'error',
            title: 'User Already Exists',
            description: 'Please log in with your email & password'
          }
        }

      const customer = await stripe.customers.create({
        email,
        name: user.name
      })

      console.log("==========customer=========", customer)
      // const subscription = await stripe.subscriptions.create({
      //   customer: customer.id,
      //   items: [
      //     {
      //       price: process.env.NEXT_PUBLIC_FREE_PRICE_ID!
      //     }
      //   ]
      // })

      const password = await bcrypt.hash(
        plainTextPassword,
        UserUtils.SaltRounds
      )

      const newUser: Partial<User> = {
        ...user,
        // ensure lower case email
        email,
        password,
        customerId: user.customerId!==''? user.customerId: customer.id,
        // subscriptionId: subscription.id
      }

      const createdUser = this.stripPassword(await Users.create<User>(newUser))

      if (!createdUser) throw new Error('Could not create database user')

      return {
        success: true,
        user: createdUser,
        nextPath: '/dashboard'
      }
    } catch (e) {
      console.log(`UserUtils.signUp error: ${e}`)
      return {
        success: false,
        notification: UnexpectedErrorNotification
      }
    }
  }

  public static async updatePassword(
    userId: User['_id'],
    plainTextPassword: string
  ): Promise<boolean> {
    try {
      const password = await bcrypt.hash(
        plainTextPassword,
        UserUtils.SaltRounds
      )

      const { acknowledged } = await Users.updateOne<User>(
        {
          _id: userId
        },
        {
          password,
          recoverToken: null
        }
      )

      if (!acknowledged)
        throw new Error('Failed to acknowledged password update')

      return true
    } catch (e) {
      console.log(`UserUtils.updatePassword error: ${e}`)
      return false
    }
  }

  public static async getUserByClientId(
    clientId: string
  ): Promise<User | null> {
    try {
      return this.stripPassword(
        await Users.findOne<User>({
          clientId
        })
      )
    } catch {
      return null
    }
  }

  public static async getUserFromSession(
    session?: Session | null
  ): Promise<User | null> {
    try {
      if (!session?.user?.email) throw new Error('No session/user/user email')

      return this.stripPassword(
        await Users.findOne<User>({
          email: session.user.email
        })
      )
    } catch {
      return null
    }
  }

  public static async getAuthenticatedUser(): Promise<User | null> {
    try {
      const session = await getServerSession(authOptions)
      return await this.getUserFromSession(session)
    } catch {
      return null
    }
  }

  public static async detectWidget(user: User): Promise<void> {
    try {
      await Users.updateOne(
        {
          _id: user._id
        },
        {
          widgetDetected: true
        }
      )
    } catch (e) {
      console.log(`UserUtils.detectWidget error: ${e}`)
    }
  }
}
