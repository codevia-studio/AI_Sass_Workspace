"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Sparkles, User } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-2xl space-y-8 pb-10 bg-background text-foreground animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          System Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Configure your Codevia workspace preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground pb-2 border-b border-border">
            <User className="h-4 w-4" />
            <h2 className="text-xs font-semibold uppercase tracking-wider">
              Account Profile
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-medium">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Ali Sadeghi"
                className="w-full h-10 rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:border-muted-foreground/40 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wider">
                Plan & Usage
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
              Free Tier
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <p className="font-medium text-foreground">
              Available Message Credits
            </p>
            <span className="font-mono text-base font-bold text-foreground">
              7 / 10
            </span>
          </div>
          <Button className="w-full h-10 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium text-xs shadow-sm flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 fill-current" /> Upgrade to Pro
            Model
          </Button>
        </div>
      </div>
    </div>
  );
}
