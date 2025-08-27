import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { GeneratedAvatar } from '@/components/generated-avatar'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

interface Props {
  onLogout: () => void
}
export const DadhboardMobile = ({ onLogout }: Props) => {
  const { data } = authClient.useSession()

  return (
    <Drawer>
      <DrawerTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
        {data!.user.image ? (
          <Avatar>
            <AvatarImage src={data!.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data!.user.name}
            variant='initials'
            className='size-9 mr-3'
          />
        )}
        <div className='flex flex-col gap-0.5 ml-2 text-left overflow-hidden flex-1 min-w-0'>
          <p className='text-sm truncate w-full'>{data!.user.name}</p>
          <p className='text-xs truncate w-full'>{data!.user.email}</p>
        </div>
        <ChevronDownIcon className='size-4 shrink-0' />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='items-start'>
          <DrawerTitle className='text-lg truncate '>
            {data!.user.name}
          </DrawerTitle>
          <DrawerTitle className='text-sm truncate font-light'>
            {data!.user.email}
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className='cursor-pointer '>
          <Button
            variant='outline'
            onClick={() => authClient.customer.portal()}
          >
            <CreditCardIcon className='size-4' />
            Billing
          </Button>
          <Button variant='outline' onClick={onLogout}>
            <LogOutIcon className='size-4' />
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
