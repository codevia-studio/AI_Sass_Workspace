import { getStripePlans } from "@/lib/stripe/plans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FREE_PLAN_CREDITS } from "@/lib/subscription/credits";
import { Check } from "lucide-react";
import Link from "next/link";

function formatPrice(amount: number | null, currency: string) {
  if (amount === null) return "Custom";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function PricingPage() {
  const plans = await getStripePlans();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing for focused AI work
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start free, then upgrade when you need more message credits.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/80">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>For getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-semibold">$0</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {FREE_PLAN_CREDITS} message credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Workspaces & chat history
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/auth/login">Get started</Link>
              </Button>
            </CardContent>
          </Card>

          {plans.map((plan) => (
            <Card key={plan.priceId} className="border-border/80">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.description ?? `${plan.creditsAllowed} message credits`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">
                  {formatPrice(plan.amount, plan.currency)}
                  {plan.interval ? (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.interval}
                    </span>
                  ) : null}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    {plan.creditsAllowed} message credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Prompt library & workspaces
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/dashboard/settings?tab=billing">Upgrade</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
