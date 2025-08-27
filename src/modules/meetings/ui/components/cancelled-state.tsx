import { EmptyState } from '../../../../components/empty-state'

export const CancelledState = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 py-5 px-4 rounded-lg bg-white'>
      <EmptyState
        image='/cancelled.svg'
        title='Meeting cancelled'
        description='This meeting was cancelled'
      />
    </div>
  )
}
