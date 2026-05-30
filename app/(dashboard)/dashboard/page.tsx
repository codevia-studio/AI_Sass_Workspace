"use client";

import { WorkspaceCreateModal } from "@/components/shared/dashboard/workspace-create-modal";
import { Button } from "@/components/ui/button";
import { createChat, getChats } from "@/lib/actions/chat";
import {
  ArrowRight,
  LayoutGrid,
  Loader2,
  MessageSquare,
  MessageSquarePlus,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

interface Chat {
  id: string;
  title: string;
  workspaceId: string;
  createdAt: Date;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeWorkspaceId = searchParams.get("workspaceId") || "";

  const [chatsList, setChatsList] = React.useState<Chat[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [isCreatingTop, setIsCreatingTop] = React.useState<boolean>(false);
  const [isCreatingCenter, setIsCreatingCenter] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const loadWorkspaceChats = async () => {
      if (!activeWorkspaceId) {
        setChatsList([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getChats(activeWorkspaceId);

        const formattedData = data.map((c) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }));

        setChatsList(formattedData);
      } catch (error) {
        console.error("Failed to load chats inside effect:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkspaceChats();
  }, [activeWorkspaceId]);

  const handleCreateChatTop = async () => {
    if (!activeWorkspaceId || isCreatingTop || isCreatingCenter) return;

    try {
      setIsCreatingTop(true);
      const res = await createChat(activeWorkspaceId, "Fresh Analytics Stream");
      if (res.success && res.data) {
        router.push(`/dashboard/chat/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
    {
      setIsCreatingTop(false);
    }
  };

  const handleCreateChatCenter = async () => {
    if (!activeWorkspaceId || isCreatingTop || isCreatingCenter) return;

    try {
      setIsCreatingCenter(true);
      const res = await createChat(activeWorkspaceId, "Fresh Analytics Stream");
      if (res.success && res.data) {
        router.push(`/dashboard/chat/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
    {
      setIsCreatingCenter(false);
    }
  };

  const anyCreating = isCreatingTop || isCreatingCenter;

  if (activeWorkspaceId) {
    return (
      <div className="flex flex-1 justify-center bg-transparent h-full overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col pt-12 px-8 pb-16 animate-in fade-in duration-300">
          <div className="flex items-end justify-between pb-6 border-b border-border/40 mb-10 shrink-0">
            <div className="space-y-1">
              <h1 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-foreground/80" />
                Workspace Dashboard
              </h1>
              <p className="text-xs text-muted-foreground/80">
                Manage your ongoing streams, pinned reference contexts, and
                quick sessions.
              </p>
            </div>

            {chatsList.length > 0 && (
              <Button
                onClick={handleCreateChatTop}
                disabled={anyCreating}
                variant="outline"
                className="h-8 rounded-lg border-border/60 font-medium text-xs shadow-sm flex items-center gap-1.5 px-3 transition-colors hover:bg-accent"
              >
                {isCreatingTop ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <MessageSquarePlus className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                New AI Chat
              </Button>
            )}
          </div>

          <div className="w-full flex-1 flex flex-col min-h-0">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center py-20">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/50" />
              </div>
            ) : chatsList.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-16">
                <div className="max-w-md w-full text-center space-y-5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground/70 shadow-sm">
                    <MessageSquare className="h-4 w-4" />
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-xs font-medium text-foreground tracking-tight">
                      No chats in this workspace yet
                    </h2>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Kickstart your agentic flow by creating your very first
                      conversational thread or orchestration layer.
                    </p>
                  </div>

                  <Button
                    onClick={handleCreateChatCenter}
                    disabled={anyCreating}
                    className="h-8 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 shadow-sm flex items-center justify-center gap-1.5 mx-auto px-4"
                  >
                    {isCreatingCenter ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                    Create Fresh Thread
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 px-1">
                  Recent Threads
                </h3>
                <div className="border border-border/40 rounded-xl bg-background divide-y divide-border/30 overflow-hidden shadow-sm">
                  {chatsList.map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/dashboard/chat/${chat.id}`}
                      className="flex items-center justify-between p-3.5 bg-transparent hover:bg-accent/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-foreground transition-colors shrink-0" />
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                          {chat.title}
                        </span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground/0 -translate-x-2 group-hover:opacity-100 group-hover:text-muted-foreground/60 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center bg-background h-full overflow-y-auto">
      <div className="max-w-md w-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm text-muted-foreground/80 mb-5">
          <LayoutGrid className="h-4 w-4" />
        </div>

        <div className="space-y-1.5 mb-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Welcome to Codevia
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Select an existing workspace from the sidebar or build a new agentic
            environment to start streaming chats.
          </p>
        </div>

        <WorkspaceCreateModal>
          <Button className="h-9 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-medium text-xs shadow-sm flex items-center justify-center gap-1.5 px-4">
            <Plus className="h-3.5 w-3.5" />
            Create First Workspace
          </Button>
        </WorkspaceCreateModal>
      </div>
    </div>
  );
}
