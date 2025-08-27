import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'

interface Props {
  agentID: string
  agentName: string
  onEdit: () => void
  onRemove: () => void
}

export const AgentIdViewHeader = ({
  agentID,
  agentName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className='flex items-center justify-between my-4 mx-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link href='/agents'>My Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-foreground text-xl font-medium [&>svg]:size-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className='font-medium text-xl text-foreground'
            >
              <Link href={`/agents/${agentID}`}>{agentName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/*without modal={false} ,the dialog that this dropdown opens cause the website to get unClickable*/}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='gap-5 w-[100px]'>
          <DropdownMenuItem
            onClick={onEdit}
            className='flex items-center gap-2'
          >
            <PencilIcon className='size-4 text-black flex flex-col' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
            className='flex items-center gap-2'
          >
            <TrashIcon className='size-4 text-black' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
