import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import { UnexpectedErrorText } from '@/lib'
import { clientPromise, dbConnect, Users, UserUtils, SendEmail } from '..'
import { nanoid } from 'nanoid'
import { Plan } from '@/enums'
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error(UnexpectedErrorText)

        await dbConnect()
        const { email, password } = credentials

        const user = await Users.findOne({ email })

        if (!user)
          throw new Error('No such user exists. Please create an account.')

        if (!(await bcrypt.compare(password, user.password)))
          throw new Error('The password you entered is incorrect.')

        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  debug: false,
  secret: process.env.APP_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60
  },
  cookies: {
    sessionToken: {
      name: 'data',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
        domain: process.env.NEXTAUTH_DOMAIN!
      }
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'azure-ad') {
        console.log('========provider id========', account.providerAccountId)
        await dbConnect()
        const { email, name, image } = profile || {}
        console.log(`======signIn Callback profile======`, profile)
        // Check if the user already exists in the database
        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
          // User does not exist, create a new user
          const clientId = nanoid()
          const recoverToken = nanoid()
          const password = nanoid()

          const signUpResponse = await UserUtils.signUp(
            {
              name,
              email,
              website: '',
              tos: Date.now(),
              tosUserAgent: 'Sign Up with Google',
              clientId,
              plan: Plan.Free,
              customerId: '',
              recoverToken
            },
            password
          )
          const email_Content = `
            Dear ${name},
      
            We are thrilled to have you on board with Chat Clinic AI! Thank you for signing up.
      
            Please click the link below to verify your email:
            ${process.env.NEXT_PUBLIC_APP_URI}/isverified?email=${encodeURIComponent((email || "").toLowerCase())}&token=${encodeURIComponent(recoverToken)}
          
            If you have any questions or need assistance, please don't hesitate to reach out to our support team at hello@chatclinicai.com
          
            We look forward to providing you with a great experience!
          
            Best regards,
            Chat Clinic AI Team
          `
    
          const subject = '🎉Welcome to ChatClinic'
          await SendEmail.mailSender(email!, subject, email_Content)
          console.log('======gmail signup response======', signUpResponse)
          // console.log('======gmail signup response json======', response.json())
          if(!signUpResponse.success)
            return false
          return true
        }

        return true
      }
      return true // Do different verification for other providers
    },
    // session({ session, token }) {
    //   // Return a cookie value as part of the session
    //   // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
    //   console.log(`1111111`)
    //   console.log(`======session======`, session)
    //   console.log(`======token======`, token)
    //   return session
    // }
  }
}
