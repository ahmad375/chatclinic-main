import type { Metadata } from 'next'
import { LogInPage } from '@/components/pages'
import {
  dbConnect,
  UserUtils,
} from '@/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Log In'
}

export default async function __LogInPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (user) {
    if(user.isVerified){
      return redirect('/dashboard')
    }else {
      return redirect('/verify')
    }
  }
  
  return <LogInPage />
}
