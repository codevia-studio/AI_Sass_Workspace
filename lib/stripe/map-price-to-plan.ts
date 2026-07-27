import type Stripe from "stripe";

import type { StripePlan } from "./plan-types";

export function mapPriceToPlan(price: Stripe.Price): StripePlan | null {
  const product = price.product;
  if (!product || typeof product === "string" || "deleted" in product) {
    return null;
  }

  if (!product.active) {
    return null;
  }

  const creditsAllowed = Number.parseInt(
    product.metadata.credits_allowed ?? "0",
    10,
  );

  return {
    priceId: price.id,
    name: product.name,
    description: product.description,
    amount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval ?? null,
    planType: product.metadata.plan_type ?? "pro",
    creditsAllowed: Number.isFinite(creditsAllowed) ? creditsAllowed : 100,
  };
}
