'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const HomeView = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (!session) {
    return <div className='flex items-center text-center text-4xl'></div>
  }
  return (
    <div className='flex flex-col p-4 gap-y-4'>
      <p>Logged in as {session?.user.name}</p>
      <Button
        className='bg-primary text-primary-foreground'
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push('/sign-in'),
            },
          })
        }}
      >
        Sign Out
      </Button>
    </div>
  )
}
