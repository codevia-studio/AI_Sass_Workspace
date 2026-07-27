import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ChatInterface } from "./_components/chat-interface";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

interface FormattedMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  if (!chatId) {
    notFound();
  }

  const currentChat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
  });

  if (!currentChat) {
    notFound();
  }

  const initialMessagesList = await db.query.messages.findMany({
    where: eq(messages.chatId, chatId),
    orderBy: [asc(messages.createdAt)],
  });

  const formattedMessages: FormattedMessage[] = initialMessagesList.map(
    (msg) => {
      const safeRole: "user" | "assistant" =
        msg.role === "user" || msg.role === "assistant" ? msg.role : "user";

      return {
        id: msg.id,
        role: safeRole,
        content: msg.content,
      };
    },
  );

  return (
    <div className="flex flex-1 flex-col bg-transparent h-full overflow-hidden">
      <div className="h-14 border-b border-border/40 flex items-center justify-between px-8 shrink-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <h2 className="text-xs font-semibold text-foreground truncate max-w-md">
            {currentChat.title}
          </h2>
        </div>
      </div>

      <ChatInterface chatId={chatId} initialMessages={formattedMessages} />
    </div>
  );
}
