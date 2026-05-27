export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">
        Welcome to AI Sass Workspace
      </h1>
      <p className="text-muted-foreground max-w-md">
        Select a chat from the sidebar or create a new workspace to start
        organizing your AI workflows.
      </p>
    </div>
  );
}
