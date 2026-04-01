-- Phase 6: Content Extraction + Annotation
-- Add web_source_highlights table for highlighting saved web content

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

ALTER TABLE "web_source_highlights"
  ADD CONSTRAINT "web_source_highlights_web_source_id_fk"
  FOREIGN KEY ("web_source_id") REFERENCES "web_sources"("id")
  ON DELETE cascade;

CREATE INDEX IF NOT EXISTS "idx_ws_highlights_source" ON "web_source_highlights" ("web_source_id");
CREATE INDEX IF NOT EXISTS "idx_ws_highlights_user" ON "web_source_highlights" ("user_id");
