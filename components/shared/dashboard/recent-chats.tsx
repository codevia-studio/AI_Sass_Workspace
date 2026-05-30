"use client";

import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import LinkNext from "next/link";
import { usePathname } from "next/navigation";

const mockChats = [
  { id: "c1", title: "Database Architecture", workspaceId: "w1" },
  { id: "c2", title: "Dative vs Akkusativ", workspaceId: "w2" },
];

interface RecentChatsProps {
  activeWorkspace: string;
}

export function RecentChats({ activeWorkspace }: RecentChatsProps) {
  const pathname = usePathname();

  const filteredChats = mockChats.filter(
    (chat) => chat.workspaceId === activeWorkspace,
  );

  return (
    <div className="mt-6 flex-1 px-1 overflow-y-auto space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/80 pb-2">
        Recent Chats
      </p>
      <div className="space-y-0.5">
        {filteredChats.map((chat) => {
          const isActive = pathname === `/dashboard/chat/${chat.id}`;
          return (
            <LinkNext
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
            </LinkNext>
          );
        })}
      </div>
    </div>
  );
}
