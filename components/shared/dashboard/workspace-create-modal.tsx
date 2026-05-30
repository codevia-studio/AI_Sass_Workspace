"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createWorkspace } from "@/lib/actions/workspace";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

interface WorkspaceCreateModalProps {
  children?: React.ReactNode;
}

export function WorkspaceCreateModal({ children }: WorkspaceCreateModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isCreating) return;

    try {
      setIsCreating(true);

      const result = await createWorkspace(name);

      if (result.success && result.data) {
        setName("");
        setIsOpen(false);

        router.refresh();
      } else {
        alert(result.error || "Failed to create workspace");
      }
    } catch (error) {
      console.error("Error in workspace creation modal:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-foreground rounded-md"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-popover border border-border rounded-2xl max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-foreground text-base font-semibold">
              Create Workspace
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Create a new space to organize your AI chats and projects.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="workspace-name"
                className="text-xs text-muted-foreground font-medium"
              >
                Workspace Name
              </label>
              <Input
                id="workspace-name"
                placeholder="e.g., Next.js Saas, German Study"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-border h-9 text-xs"
                maxLength={30}
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border-border text-xs h-9"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl text-xs h-9 bg-primary text-primary-foreground font-medium"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
