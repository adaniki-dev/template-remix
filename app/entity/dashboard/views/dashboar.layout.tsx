import SocketProvider from '@/providers/socketProvider/socketProvider';
import AddTicketSheet from '@/features/authSupport/components/addTicketSheet';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/dashboard/components/sidebar/appSideBar';
import ErrorBoundaryModal from '@/components/errorBoundary/errorBoundaryModal';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import SendContentSheet from '@/modules/contents/sendContent';
import { AddContentsSheet } from '@/modules/contents/addContentSheet/standalone';
import SheetInstanceList from '@/modules/instances/components/instanceList';
import InstanceQrCodeScan from '@/modules/instances/components/qrcode';

export default async function DashboardLayout({ children }: any) {
  return (
    <SocketProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SuspenseWrapper modal={InstanceQrCodeScan} />
          <SuspenseWrapper modal={SheetInstanceList} />
          <SuspenseWrapper modal={AddContentsSheet} />
          <SuspenseWrapper modal={SendContentSheet} />
          <SuspenseWrapper modal={AddTicketSheet} />
          <SuspenseWrapper modal={ErrorBoundaryModal} />
          <main className=" bg-slate-100/30 h-full transition-all ">
            <div className="pl-4 pt-4">
              <SidebarTrigger className="-ml-1 h-5 w-5 text-slate-400" />
              {children}
            </div>
          </main>
          {/* <RadialMenu /> */}
        </SidebarInset>
      </SidebarProvider>
    </SocketProvider>
  );
}
