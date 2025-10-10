import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="sticky top-0 z-1 p-4">
          <SidebarTrigger className="hover:bg-blue-50" />
        </div>
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
