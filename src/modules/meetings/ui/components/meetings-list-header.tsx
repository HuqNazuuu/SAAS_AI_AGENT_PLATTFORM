'use client'

import { PlusIcon, XCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useState } from 'react'
import { NewMeetingDialog } from './new-meeting-dialog'
import { MeetingsSearchFilter } from './meeting-search-filter'
import { AgentIdFIlters } from './agent-id-filter'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { DEFAULT_PAGE } from '@/constant'
import { StatusFilter } from './status-filter'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const MeetingListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isAnyFilterMethod =
    !!filters.status || !!filters.search || !!filters.agentId

  const onClearFilters = () => {
    setFilters({
      status: null,
      search: '',
      agentId: '',
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='font-semibold text-2xl'>My Meetings</h5>
          <Button
            className='gap-x-2 p-2'
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className='flex items-center gap-x-2 p-1'>
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFIlters />
            {isAnyFilterMethod && (
              <Button variant='outline' onClick={onClearFilters}>
                <XCircleIcon className='size-4' />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation='horizontal' className='my-[-1.5vh]' />
        </ScrollArea>
      </div>
    </>
  )
}
