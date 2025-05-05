import type { Metadata } from 'next'
import { SignUpPage } from '@/components/pages'
import {
  dbConnect,
  UserUtils,
} from '@/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default async function __SignUpPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (user) return redirect('/dashboard')
  
  return <SignUpPage />
}
