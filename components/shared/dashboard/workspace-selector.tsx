"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { WorkspaceActions } from "./workspace-actions";
import { WorkspaceCreateModal } from "./workspace-create-modal";

interface Workspace {
  id: string;
  name: string;
  profileId: string;
  createdAt: Date | null;
}

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  activeWorkspace: string;
  setActiveWorkspace: (id: string) => void;
}

export function WorkspaceSelector({
  workspaces,
  activeWorkspace,
  setActiveWorkspace,
}: WorkspaceSelectorProps) {
  const router = useRouter();

  const handleClearActive = () => {
    setActiveWorkspace("");
    router.push("/dashboard");
  };

  return (
    <div className="mt-6 px-1 flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">
          Workspaces
        </p>
        <WorkspaceCreateModal />
      </div>

      <div className="mt-3 space-y-1 flex-1 overflow-y-auto pr-1 text-card-foreground scrollbar-thin">
        {workspaces.length === 0 ? (
          <p className="text-xs text-muted-foreground/60 px-3 py-2 italic">
            No workspaces yet.
          </p>
        ) : (
          workspaces.map((ws) => {
            const isActive = activeWorkspace === ws.id;

            return (
              <div
                key={ws.id}
                className="relative group w-full flex items-center"
              >
                <button
                  onClick={() => {
                    setActiveWorkspace(ws.id);
                    router.push(`/dashboard?workspaceId=${ws.id}`);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between pl-3 pr-8 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent text-left",
                    isActive
                      ? "bg-accent text-accent-foreground border-border shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/40",
                  )}
                >
                  <span className="truncate text-xs">{ws.name}</span>
                </button>

                <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
                  <WorkspaceActions
                    workspace={ws}
                    isActive={isActive}
                    onClearActive={handleClearActive}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
