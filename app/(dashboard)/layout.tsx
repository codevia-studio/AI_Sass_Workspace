import { AppSidebar } from "@/components/shared/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        <AppSidebar />
        <main className="relative flex flex-1 flex-col overflow-y-auto">
          <header className="flex h-14 items-center gap-4 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Workspace Overview
            </span>
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
