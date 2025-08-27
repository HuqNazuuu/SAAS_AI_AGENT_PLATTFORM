import { ResponsiveDialog } from '@/components/responsive-dialog'
import { AgentForm } from './agentForm'
import { AgentGetOne } from '../../server/types'
import { useRouter } from 'next/navigation'

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title='New Agent'
      description='Create a new agent to assist you.'
      onOpenChange={onOpenChange}
      open={open}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
