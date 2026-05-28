"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8 bg-transparent animate-in fade-in duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-border shadow-inner text-muted-foreground mb-4">
        <LayoutGrid className="h-5 w-5" />
      </div>

      <div className="max-w-sm space-y-2 mb-6">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Welcome to Codevia
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Select an existing workspace from the sidebar or build a new agentic
          environment to start streaming chats.
        </p>
      </div>

      <Button className="h-10 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium text-xs shadow-sm flex items-center justify-center gap-1.5 px-5">
        <Plus className="h-4 w-4" />
        Create First Workspace
      </Button>
    </div>
  );
}
