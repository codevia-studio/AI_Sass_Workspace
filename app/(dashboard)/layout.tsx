import { AppSidebar } from "@/components/shared/dashboard/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden antialiased">
      <AppSidebar />

      <main className="flex-1 flex flex-col h-full bg-muted/20 p-6 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
