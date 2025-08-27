import Image from 'next/image'
import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk'

interface Props {
  onLeave: () => void
  meetingName: string
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className='flex flex-col justify-between p-4 h-full text-white'>
      <div className='rounded-full bg-[#101213] p-4 flex items-center gap-4'>
        <div className='flex items-center justify-center p-1 bg-white/10 rounded-full w-fit'>
          <Image src='/logo.svg' width={22} height={22} alt='logo' />
        </div>
        <h4 className='text-base'>{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div>
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  )
}
