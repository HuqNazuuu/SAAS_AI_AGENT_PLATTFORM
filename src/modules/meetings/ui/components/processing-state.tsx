import { EmptyState } from '../../../../components/empty-state'

export const ProcessingState = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-8 py-5 px-4 rounded-lg bg-white'>
      <EmptyState
        image='/processing.svg'
        title='Meeting completed.'
        description='This meeting was completed, a summary will appear soon.'
      />
    </div>
  )
}
