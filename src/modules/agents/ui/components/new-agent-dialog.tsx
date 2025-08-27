import { ResponsiveDialog } from '@/components/responsive-dialog'
import { AgentForm } from './agentForm'

interface NewAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
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
      />
    </ResponsiveDialog>
  )
}
