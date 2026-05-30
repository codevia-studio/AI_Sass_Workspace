"use server";

import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function getUserSubscription() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    const userSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.profileId, user.id),
    });

    if (!userSubscription) {
      return {
        planType: "free",
        status: "active",
        creditsAllowed: 10,
        creditsUsed: 0,
      };
    }

    return {
      planType: userSubscription.planType,
      status: userSubscription.status,
      creditsAllowed: userSubscription.creditsAllowed,
      creditsUsed: userSubscription.creditsUsed,
    };
  } catch (error) {
    console.error("Error in getUserSubscription:", error);
    return null;
  }
}
