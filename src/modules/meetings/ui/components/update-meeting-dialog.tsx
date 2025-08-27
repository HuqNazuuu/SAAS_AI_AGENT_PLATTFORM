import { ResponsiveDialog } from '@/components/responsive-dialog'
import { MeetingForm } from './meeting-form'
import { MeetingGetOne } from '../../server/types'
import { useRouter } from 'next/navigation'

interface UpdateMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title='New Meeting'
      description='Create a new meeting to assist you.'
      onOpenChange={onOpenChange}
      open={open}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
