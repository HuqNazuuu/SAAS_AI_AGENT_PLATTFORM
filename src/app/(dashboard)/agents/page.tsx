import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from '@/modules/agents/ui/agentsView'
import { AgentsListHeader } from '@/modules/agents/ui/components/agetsListHeader'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { loadSearchParams } from '@/modules/agents/hooks/use-agent-filter-server'
import { SearchParams } from 'nuqs'

interface Props {
  searchParams: Promise<SearchParams>
}

const page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const filters = await loadSearchParams(searchParams)
  if (!session) {
    redirect('/sign-in')
  }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AgentsListHeader />
      <ErrorBoundary fallback={<AgentsViewError />}>
        <Suspense fallback={<AgentsViewLoading />}>
          <AgentsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}

export default page
