import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const CallEnded = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar'>
      <div className='flex flex-1 py-4 px-8 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
          <div className='flex flex-col gap-y-2 text-center'>
            <h6 className='lg:text-4xl text-2xl font-medium'>
              You have ended the call.
            </h6>
            <p className='lg:text-xl text-sm'>
              Summary will appear in a few minutes.
            </p>
          </div>
          <Button asChild>
            <Link href='/meetings' className='lg:w-[25vw]'>
              Back to meetings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
