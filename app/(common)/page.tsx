import { IndexPage } from '@/components/pages'
import { redirect } from 'next/navigation'
import { dbConnect, UserUtils } from '@/server'

export default async function __IndexPage() {
  await dbConnect()

  const user = await UserUtils.getAuthenticatedUser()

  if (!user) return redirect('/login')

  // return redirect('https://chatclinicai.com');
  return <IndexPage isLoggedInUser={!!user} />
}
