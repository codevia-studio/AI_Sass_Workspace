WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY profile_id
      ORDER BY
        (stripe_subscription_id IS NOT NULL) DESC,
        credits_used DESC,
        id ASC
    ) AS rn
  FROM subscriptions
)
DELETE FROM subscriptions
WHERE id IN (SELECT id FROM ranked WHERE rn > 1);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_profile_id_unique" ON "subscriptions" ("profile_id");
