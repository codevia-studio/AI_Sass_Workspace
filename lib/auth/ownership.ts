import { db } from "@/lib/db";
import { chats, workspaces } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import type { User } from "@supabase/supabase-js";

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function getAuthenticatedUser(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthError();
  }

  return user;
}

export async function assertWorkspaceOwner(
  userId: string,
  workspaceId: string,
) {
  const workspace = await db.query.workspaces.findFirst({
    where: and(
      eq(workspaces.id, workspaceId),
      eq(workspaces.profileId, userId),
    ),
  });

  if (!workspace) {
    throw new ForbiddenError("Workspace not found or unauthorized");
  }

  return workspace;
}

export async function assertChatOwner(userId: string, chatId: string) {
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, chatId),
    with: {
      workspace: true,
    },
  });

  if (!chat || chat.workspace.profileId !== userId) {
    throw new ForbiddenError("Chat not found or unauthorized");
  }

  return chat;
}
