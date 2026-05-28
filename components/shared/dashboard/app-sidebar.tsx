"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-togle";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { LogOut, MessageSquare, Plus, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const mockWorkspaces = [
  { id: "w1", name: "AI Course Platform" },
  { id: "w2", name: "Personal Language Hub" },
];

const mockChats = [
  { id: "c1", title: "Database Architecture", workspaceId: "w1" },
  { id: "c2", title: "Dative vs Akkusativ", workspaceId: "w2" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [activeWorkspace, setActiveWorkspace] = React.useState("w1");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await createClient().auth.signOut();
      if (error) throw error;

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-6 text-card-foreground selection:bg-accent">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 px-2 pb-6 border-b border-border/60">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background shadow-sm">
          <span className="text-xs font-black tracking-tighter">CV</span>
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">
          Codevia
        </span>
      </div>

      {/* Workspace Selector */}
      <div className="mt-6 px-1">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">
          Workspaces
        </p>
        <div className="mt-2 space-y-1">
          {mockWorkspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                activeWorkspace === ws.id
                  ? "bg-accent text-accent-foreground border border-border shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/40",
              )}
            >
              <span className="truncate">{ws.name}</span>
              {activeWorkspace === ws.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/*  Active Chats */}
      <div className="mt-6 flex-1 px-1 overflow-y-auto space-y-1">
        <div className="flex items-center justify-between pb-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80">
            Recent Chats
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-foreground rounded-md"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="space-y-0.5">
          {mockChats
            .filter((chat) => chat.workspaceId === activeWorkspace)
            .map((chat) => {
              const isActive = pathname === `/dashboard/chat/${chat.id}`;
              return (
                <Link
                  key={chat.id}
                  href={`/dashboard/chat/${chat.id}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/20",
                  )}
                >
                  <MessageSquare
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="truncate text-xs">{chat.title}</span>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto pt-4 border-t border-border space-y-2 px-1">
        {/* Credit Badge */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wallet className="h-3.5 w-3.5" />
            <span>Usage Limit</span>
          </div>
          <span className="font-mono font-semibold text-foreground">
            7 / 10 Credits
          </span>
        </div>

        {/* Settings & Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors h-9",
              pathname === "/dashboard/settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>

          <div className="text-muted-foreground hover:text-foreground [&>button]:h-9 [&>button]:w-9 [&>button]:rounded-xl [&>button]:border-border [&>button]:bg-transparent hover:[&>button]:bg-accent/40">
            <ThemeToggle />
          </div>
        </div>

        {/* Logout Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-9">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-popover border border-border rounded-2xl max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground text-base font-semibold">
                Confirm Sign Out
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground text-xs">
                Are you sure you want to log out of your Codevia account?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-2">
              <AlertDialogCancel className="rounded-xl border-border bg-transparent text-muted-foreground hover:bg-accent text-xs h-9">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs h-9"
              >
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
