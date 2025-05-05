import type { Metadata } from 'next'
import { PricingPage } from '@/components/pages'
import { redirect } from 'next/navigation'
import { dbConnect, UserUtils } from '@/server'

export const metadata: Metadata = {
  title: 'Pricing',
  description: ''
}

export default async function __PricingPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()
  // return redirect('https://chatclinicai.com/pricing');

  return <PricingPage isLoggedInUser={!!user} />
}
