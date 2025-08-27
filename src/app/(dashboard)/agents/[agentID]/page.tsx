import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { AgentsViewLoading } from '@/modules/agents/ui/agentsView'
import { AgentIdView, AgentsViewError } from '@/modules/agents/ui/AgnetIdView'

interface Props {
  params: Promise<{ agentID: string }>
}

const Page = async ({ params }: Props) => {
  const { agentID } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentID })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentIdView agentID={agentID} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
