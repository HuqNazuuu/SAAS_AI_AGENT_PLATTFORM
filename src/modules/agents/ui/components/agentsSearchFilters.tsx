import { Input } from '@/components/ui/input'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import { SearchIcon } from 'lucide-react'

export const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters()

  return (
    <div className='relative'>
      <Input
        className='h-9 bg-white w-[200px]'
        placeholder='Filter by name'
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className='size-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}
