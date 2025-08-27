import { auth } from '@/lib/auth'
import { CallView } from '@/modules/call/ui/call-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{
    meetingId: string //have to use params to let know that the single meeting's url and this call's url is same.
  }>
}
const page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const { meetingId } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  )
  return (
    <HydrationBoundary>
      <CallView meetingId={meetingId} />
    </HydrationBoundary>
  )
}

export default page
