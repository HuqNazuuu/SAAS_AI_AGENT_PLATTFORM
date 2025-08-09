import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/modules/dashboard/ui/dashboard-sidebar'
import { DashboardNavbar } from '@/modules/dashboard/ui/DashboardNavbar'

interface Props {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='flex flex-col h-screen w-screen bg-muted'>
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout
