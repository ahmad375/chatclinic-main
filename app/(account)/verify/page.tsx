import type { Metadata } from 'next'
import { VerificationPage } from '@/components/pages'
import { UserUtils, dbConnect } from '@/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Please verify...'
}

export default async function __VerificationPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user) redirect('/login')

  if(user.isVerified) redirect('/dashboard')
  
  return <VerificationPage email={user?.email} />
}