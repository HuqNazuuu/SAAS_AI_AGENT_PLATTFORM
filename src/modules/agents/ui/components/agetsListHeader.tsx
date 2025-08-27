'use client'

import { PlusIcon, XCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NewAgentDialog } from './new-agent-dialog'
import { useState } from 'react'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import { AgentSearchFilter } from './agentsSearchFilters'
import { DEFAULT_PAGE } from '@/constant'

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentFilters()
  const [isOpen, setIsOpen] = useState(false)

  const isAnyFilterModified = !!filters.search

  const onClearFilters = () => {
    setFilters({
      search: '',
      page: DEFAULT_PAGE,
    })
  }
  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='font-semibold text-2xl'>My Agents</h5>
          <Button className='gap-x-2 p-2' onClick={() => setIsOpen(true)}>
            <PlusIcon />
            Create Agent
          </Button>
        </div>
        <div className='flex items-center gap-x-2 p-1'>
          <AgentSearchFilter />
          {isAnyFilterModified && (
            <Button variant='outline' size='sm' onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
