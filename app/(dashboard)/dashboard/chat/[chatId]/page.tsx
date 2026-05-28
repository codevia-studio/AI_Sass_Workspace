"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

const mockMessages = [
  {
    id: "1",
    role: "user",
    content:
      "Explain the architectural difference between Prisma and Drizzle ORM.",
  },
  {
    id: "2",
    role: "assistant",
    content: "Drizzle is a TypeScript-first SQL Query Builder...",
  },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full justify-between pb-2 bg-background text-foreground px-16">
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {mockMessages.map((message) => {
          const isAi = message.role === "assistant";
          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 p-5 rounded-2xl max-w-3xl transition-all duration-200 border",
                isAi
                  ? "bg-muted/40 border-border shadow-sm"
                  : "bg-transparent border-transparent ml-auto flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold shadow-sm",
                  isAi
                    ? "bg-foreground text-background border-border"
                    : "bg-muted text-muted-foreground border-border",
                )}
              >
                {isAi ? (
                  <Sparkles className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="flex-1 space-y-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-muted-foreground tracking-wide">
                    {isAi ? "Codevia Engine" : "You"}
                  </span>
                </div>

                <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {isAi ? (
                    <div className="space-y-3">
                      <p>
                        Drizzle ORM is a TypeScript-first SQL Query Builder.
                        Example:
                      </p>

                      <div className="relative mt-2 rounded-xl bg-muted border border-border p-4 font-mono text-xs text-muted-foreground shadow-inner overflow-x-auto">
                        <span className="text-blue-500 dark:text-purple-400">
                          import
                        </span>{" "}
                        {"{ pgTable }"}{" "}
                        <span className="text-blue-500 dark:text-purple-400">
                          from
                        </span>{" "}
                        <span className="text-green-600 dark:text-emerald-400">
                          {"drizzle-orm/pg-core"}
                        </span>
                        ;
                      </div>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="pt-4 bg-background border-t border-border">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center rounded-2xl border border-border bg-card shadow-lg focus-within:border-muted-foreground/40 transition-all duration-200"
        >
          <input
            type="text"
            placeholder="Ask Codevia anything..."
            className="h-14 w-full bg-transparent pl-5 pr-14 text-sm text-foreground placeholder-muted-foreground outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-3">
            <Button
              type="submit"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-xl transition-all duration-200",
                input.trim()
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
