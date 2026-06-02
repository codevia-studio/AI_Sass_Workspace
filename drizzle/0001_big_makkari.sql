ALTER TABLE "chats" ADD COLUMN "is_pinned" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "plan_type" text DEFAULT 'free' NOT NULL;