import SignInView from '@/modules/auth/ui/SignInView'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    redirect('/')
  }
  return <SignInView />
}

export default page
