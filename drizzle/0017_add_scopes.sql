CREATE TABLE IF NOT EXISTS "scopes" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "name" text NOT NULL,
  "included_domains" jsonb DEFAULT '[]',
  "excluded_domains" jsonb DEFAULT '[]',
  "included_keywords" jsonb DEFAULT '[]',
  "excluded_keywords" jsonb DEFAULT '[]',
  "date_from" timestamp,
  "date_to" timestamp,
  "region" text,
  "is_active" boolean DEFAULT true,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "idx_scopes_user" ON "scopes" ("user_id");
