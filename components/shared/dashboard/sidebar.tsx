"use client";

import { Crown } from "lucide-react";
import * as React from "react";
import { SidebarFooter } from "./sidebar-footer";
import { WorkspaceSelector } from "./workspace-selector";

interface SidebarProps {
  user: {
    id: string;
    email: string | undefined;
    fullName: string;
    avatarUrl: string;
  };
  subscription: {
    planType: string;
    status: string | null;
    creditsAllowed: number;
    creditsUsed: number;
  } | null;
  workspaces: {
    id: string;
    name: string;
    profileId: string;
    createdAt: Date | null;
  }[];
}

export function AppSidebar({ user, subscription, workspaces }: SidebarProps) {
  const planType = subscription?.planType || "free";
  const creditsAllowed = subscription?.creditsAllowed ?? 10;
  const creditsUsed = subscription?.creditsUsed ?? 0;
  const creditsLeft = creditsAllowed - creditsUsed;

  const planConfig = {
    free: {
      label: "Free",
      color: "bg-secondary text-secondary-foreground border border-border",
      icon: null,
    },
    pro: {
      label: "Pro",
      color: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      icon: <Crown className="h-3 w-3 text-blue-500 fill-blue-500 shrink-0" />,
    },
    pro_plus: {
      label: "Pro+",
      color: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      icon: (
        <Crown className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
      ),
    },
    enterprise: {
      label: "Enterprise",
      color: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
      icon: (
        <Crown className="h-3 w-3 text-purple-500 fill-purple-500 shrink-0" />
      ),
    },
  };

  const currentPlan =
    planConfig[planType as keyof typeof planConfig] || planConfig.free;

  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    React.useState<string>("");

  const isSelectedValid = workspaces.some(
    (ws) => ws.id === selectedWorkspaceId,
  );
  const activeWorkspace = isSelectedValid
    ? selectedWorkspaceId
    : workspaces[0]?.id || "";

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-6 text-card-foreground selection:bg-accent">
      <div className="flex items-center gap-2.5 px-2 pb-6 border-b border-border/60">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background shadow-sm">
          <span className="text-xs font-black tracking-tighter">AS</span>
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">
          Codevia Space
        </span>
      </div>

      <WorkspaceSelector
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        setActiveWorkspace={setSelectedWorkspaceId}
      />

      <SidebarFooter
        user={user}
        creditsLeft={creditsLeft}
        creditsAllowed={creditsAllowed}
        currentPlan={currentPlan}
      />
    </div>
  );
}
