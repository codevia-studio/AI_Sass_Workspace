"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Check, Copy, Send, User } from "lucide-react";
import { useState } from "react";

const mockMessages = [
  {
    id: "1",
    role: "user",
    content: "how can i use the supabase in the nextjs applications ",
  },
  {
    id: "2",
    role: "assistant",
    content: `To use Supabase in Next.js (App Router), you need to install the following libraries:
\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js
\`\`\`
Then, create a client for the server and a client for the client to manage authentication and cookies easily.`,
  },
];

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col justify-between gap-4">
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {mockMessages.map((message) => {
          const isAi = message.role === "assistant";
          return (
            <div
              key={message.id}
              className={`flex gap-4 p-4 rounded-xl max-w-3xl transition-colors ${
                isAi
                  ? "bg-muted/50 border border-border/40"
                  : "bg-background ml-auto flex-row-reverse"
              }`}
            >
              <div
                className={`flex size-8 shrink-0 select-none items-center justify-center rounded-lg border text-sm font-medium shadow-sm ${
                  isAi ? "bg-foreground text-background" : "bg-background"
                }`}
              >
                {isAi ? (
                  <Bot className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </div>

              <div className="flex-1 space-y-2 overflow-hidden text-sm leading-relaxed">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-muted-foreground">
                    {isAi ? "Codevia AI" : "You"}
                  </span>
                  {isAi && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-muted-foreground hover:text-foreground"
                      onClick={() => handleCopy(message.content, message.id)}
                    >
                      {copiedId === message.id ? (
                        <Check className="size-3 text-green-500" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  )}
                </div>

                <div className="whitespace-pre-wrap font-normal text-foreground/90">
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4 bg-background">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center rounded-xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring"
        >
          <Input
            placeholder="Type your message here..."
            className="min-h-12 w-full border-0 bg-transparent pl-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              type="submit"
              size="icon"
              className="size-8"
              disabled={!input.trim()}
            >
              <Send className="size-3.5" />
            </Button>
          </div>
        </form>
        <p className="text-[11px] text-center text-muted-foreground mt-2">
          Codevia AI can make mistakes. Verify important code or architectural
          decisions.
        </p>
      </div>
    </div>
  );
}
