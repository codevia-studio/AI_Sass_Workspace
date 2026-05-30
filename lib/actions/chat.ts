"use server";

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function getChats(workspaceId: string) {
  try {
    await getAuthenticatedUser();

    const workspaceChats = await db.query.chats.findMany({
      where: eq(chats.workspaceId, workspaceId),
      orderBy: (chats, { desc }) => [desc(chats.createdAt)],
    });

    return workspaceChats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export async function createChat(
  workspaceId: string,
  title: string = "New Chat Session",
) {
  try {
    await getAuthenticatedUser();
    if (!workspaceId) throw new Error("Workspace ID is required");

    const [newChat] = await db
      .insert(chats)
      .values({
        title,
        workspaceId,
      })
      .returning();

    revalidatePath("/dashboard");
    return { success: true, data: newChat };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create chat";
    console.error("Error creating chat:", error);
    return { success: false, error: errorMessage };
  }
}

export async function updateChat(id: string, newTitle: string) {
  try {
    await getAuthenticatedUser();
    if (!newTitle.trim()) throw new Error("Title is required");

    const [updatedChat] = await db
      .update(chats)
      .set({ title: newTitle })
      .where(eq(chats.id, id))
      .returning();

    if (!updatedChat) return { success: false, error: "Chat not found" };

    revalidatePath("/dashboard");
    return { success: true, data: updatedChat };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update chat";
    return { success: false, error: errorMessage };
  }
}

export async function deleteChat(id: string) {
  try {
    await getAuthenticatedUser();

    const [deletedChat] = await db
      .delete(chats)
      .where(eq(chats.id, id))
      .returning();

    if (!deletedChat) return { success: false, error: "Chat not found" };

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete chat";
    return { success: false, error: errorMessage };
  }
}
