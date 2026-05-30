"use server";

import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { createServerClient } from "@supabase/ssr";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getUserMetadata() {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      },
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    const userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });

    return {
      id: user.id,
      email: user.email,
      fullName: userProfile?.fullName || "User",
      avatarUrl: userProfile?.avatarUrl || "",
    };
  } catch (error) {
    console.error("Error in getUserMetadata:", error);
    return null;
  }
}
