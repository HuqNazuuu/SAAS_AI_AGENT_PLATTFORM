'use client'
import { DataTable } from '@/components/data-table'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { column } from './components/columns'
import { EmptyState } from '@/components/empty-state'
import { useRouter } from 'next/navigation'
import { useMeetingsFilters } from '../hooks/use-meetings-filters'
import { DataPagination } from '@/components/DataPagination'

export const MeetingView = () => {
  const trpc = useTRPC()
  const router = useRouter()
  const [filters, setFilters] = useMeetingsFilters()

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  )

  return (
    <div className='flex-1 pb-4 md:px-8 flex flex-col gap-y-4'>
      <DataTable
        data={data.items}
        columns={column}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title='Create your first meeting'
          description='Schedule a meeting to connect with others.Each meeting lets you collabrate, share ideas , and interact with participants in real time'
        />
      )}
    </div>
  )
}

export const MeetingViewError = () => {
  return (
    <ErrorState
      title='Error while Loading Meeting'
      description='Please try again later.'
    />
  )
}

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title='Loading Meeting'
      description='Please wait while we fetch the meetings.'
    />
  )
}
