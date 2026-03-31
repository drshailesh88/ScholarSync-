-- Phase 8: Explore Search History
-- Max 100 per user (FIFO). Private, never shared. Permanent delete.

CREATE TABLE IF NOT EXISTS "explore_search_history" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "query" text NOT NULL,
  "active_tab" "explore_tab" DEFAULT 'academic',
  "scope_id" integer,
  "created_at" timestamp DEFAULT now()
);

-- Foreign key to scopes (set null on delete)
ALTER TABLE "explore_search_history" ADD CONSTRAINT "explore_search_history_scope_id_scopes_id_fk" FOREIGN KEY ("scope_id") REFERENCES "public"."scopes"("id") ON DELETE set null ON UPDATE no action;

-- Indexes
CREATE INDEX IF NOT EXISTS "idx_explore_history_user" ON "explore_search_history" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "idx_explore_history_created" ON "explore_search_history" USING btree ("created_at");
