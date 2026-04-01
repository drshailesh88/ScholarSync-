-- Phase 5: Web Sources + Project Web Sources + Highlights
-- These tables store non-academic content saved from the Explore module.
-- Papers table is NOT touched.

CREATE TABLE IF NOT EXISTS "web_sources" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "url" text NOT NULL,
  "domain" text NOT NULL,
  "title" text NOT NULL,
  "snippet" text,
  "author" text,
  "publish_date" timestamp,
  "source_type" "web_source_type" DEFAULT 'other',
  "trust_tier" "trust_tier" DEFAULT 'other',
  "tab_found_on" "explore_tab",
  "search_query" text,
  "thumbnail_url" text,
  "content_html" text,
  "content_plain" text,
  "content_extracted" boolean DEFAULT false,
  "notes" text,
  "tags" jsonb DEFAULT '[]'::jsonb,
  "status" "web_source_status" DEFAULT 'saved',
  "metadata" jsonb DEFAULT '{}'::jsonb,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp,
  CONSTRAINT "web_sources_user_url_unique" UNIQUE("user_id","url")
);

CREATE TABLE IF NOT EXISTS "web_source_highlights" (
  "id" serial PRIMARY KEY NOT NULL,
  "web_source_id" integer NOT NULL,
  "user_id" text NOT NULL,
  "selected_text" text NOT NULL,
  "start_offset" integer NOT NULL,
  "end_offset" integer NOT NULL,
  "color" "annotation_color" DEFAULT 'yellow',
  "note" text,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "project_web_sources" (
  "id" serial PRIMARY KEY NOT NULL,
  "project_id" integer NOT NULL,
  "web_source_id" integer NOT NULL,
  "user_notes" text,
  "tags" jsonb DEFAULT '[]'::jsonb,
  "status" "web_source_status" DEFAULT 'saved',
  "added_by" text DEFAULT 'search',
  "created_at" timestamp DEFAULT now(),
  CONSTRAINT "project_web_sources_unique" UNIQUE("project_id","web_source_id")
);

-- Foreign keys
ALTER TABLE "web_source_highlights" ADD CONSTRAINT "web_source_highlights_web_source_id_web_sources_id_fk" FOREIGN KEY ("web_source_id") REFERENCES "public"."web_sources"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "project_web_sources" ADD CONSTRAINT "project_web_sources_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "project_web_sources" ADD CONSTRAINT "project_web_sources_web_source_id_web_sources_id_fk" FOREIGN KEY ("web_source_id") REFERENCES "public"."web_sources"("id") ON DELETE cascade ON UPDATE no action;

-- Indexes
CREATE INDEX IF NOT EXISTS "idx_web_sources_user" ON "web_sources" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "idx_web_sources_domain" ON "web_sources" USING btree ("domain");
CREATE INDEX IF NOT EXISTS "idx_web_sources_source_type" ON "web_sources" USING btree ("source_type");
CREATE INDEX IF NOT EXISTS "idx_web_sources_trust_tier" ON "web_sources" USING btree ("trust_tier");
CREATE INDEX IF NOT EXISTS "idx_web_sources_status" ON "web_sources" USING btree ("status");
CREATE INDEX IF NOT EXISTS "idx_web_sources_created" ON "web_sources" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "idx_ws_highlights_source" ON "web_source_highlights" USING btree ("web_source_id");
CREATE INDEX IF NOT EXISTS "idx_ws_highlights_user" ON "web_source_highlights" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "idx_pws_project" ON "project_web_sources" USING btree ("project_id");
CREATE INDEX IF NOT EXISTS "idx_pws_web_source" ON "project_web_sources" USING btree ("web_source_id");
