ALTER TABLE "conversations" ADD COLUMN "share_token" text;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "share_enabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "share_password" text;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "share_expires_at" timestamp;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_conversations_share_token" ON "conversations" USING btree ("share_token");
