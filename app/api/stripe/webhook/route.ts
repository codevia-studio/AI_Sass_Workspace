import { getStripe } from "@/lib/stripe/client";
import {
  resetToFreePlan,
  syncSubscriptionFromStripe,
} from "@/lib/stripe/sync-subscription";
import { getInvoiceSubscriptionId } from "@/lib/stripe/utils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getProfileIdFromSubscription(
  subscription: Stripe.Subscription,
) {
  if (subscription.metadata.profileId) {
    return subscription.metadata.profileId;
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const existing = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.stripeCustomerId, customerId),
  });

  return existing?.profileId ?? null;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const profileId =
    session.metadata?.profileId ?? session.client_reference_id ?? null;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!profileId || !subscriptionId) {
    console.warn(
      "[Stripe Webhook] checkout.session.completed missing profileId or subscriptionId",
      { profileId, subscriptionId },
    );
    return;
  }

  const stripe = getStripe();
  const stripeSubscription =
    await stripe.subscriptions.retrieve(subscriptionId);

  await syncSubscriptionFromStripe(profileId, stripeSubscription, {
    resetCreditsUsed: true,
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const profileId = await getProfileIdFromSubscription(subscription);
  if (!profileId) return;

  if (
    subscription.status === "canceled" ||
    subscription.status === "unpaid" ||
    subscription.status === "incomplete_expired"
  ) {
    await resetToFreePlan(profileId);
    return;
  }

  await syncSubscriptionFromStripe(profileId, subscription);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const profileId = await getProfileIdFromSubscription(subscription);
  if (!profileId) return;

  await resetToFreePlan(profileId);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = getInvoiceSubscriptionId(invoice);
  if (!subscriptionId) return;

  const stripe = getStripe();
  const stripeSubscription =
    await stripe.subscriptions.retrieve(subscriptionId);

  const profileId = await getProfileIdFromSubscription(stripeSubscription);
  if (!profileId) return;

  await syncSubscriptionFromStripe(profileId, stripeSubscription, {
    resetCreditsUsed: true,
  });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = getInvoiceSubscriptionId(invoice);
        if (!subscriptionId) break;

        const stripeSubscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const profileId = await getProfileIdFromSubscription(stripeSubscription);
        if (!profileId) break;

        await db
          .update(subscriptions)
          .set({ status: "past_due" })
          .where(eq(subscriptions.profileId, profileId));
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(`Stripe webhook handler failed for ${event.type}:`, error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
