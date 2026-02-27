CREATE TYPE "public"."alert_frequency" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
CREATE TYPE "public"."alert_status" AS ENUM('active', 'paused', 'completed');--> statement-breakpoint
CREATE TABLE "live_poll_responses" (
	"id" text PRIMARY KEY NOT NULL,
	"poll_id" text NOT NULL,
	"option_index" integer NOT NULL,
	"voter_fingerprint" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "live_poll_responses_unique_vote" UNIQUE("poll_id","voter_fingerprint")
);
--> statement-breakpoint
CREATE TABLE "live_polls" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"slide_index" integer,
	"status" text DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "live_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"content" text NOT NULL,
	"author_name" text,
	"author_fingerprint" text,
	"slide_index" integer,
	"upvotes" integer DEFAULT 0,
	"status" text DEFAULT 'pending',
	"answered_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "live_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"join_code" text NOT NULL,
	"status" text DEFAULT 'active',
	"current_slide_index" integer DEFAULT 0,
	"audience_count" integer DEFAULT 0,
	"settings" jsonb,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	CONSTRAINT "live_sessions_join_code_unique" UNIQUE("join_code")
);
--> statement-breakpoint
CREATE TABLE "presentation_recordings" (
	"id" text PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"storage_url" text,
	"storage_path" text NOT NULL,
	"thumbnail_url" text,
	"duration_ms" integer,
	"file_size_bytes" integer,
	"format" text DEFAULT 'webm',
	"slide_markers" jsonb,
	"has_webcam" boolean DEFAULT false,
	"status" text DEFAULT 'recording',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presentation_views" (
	"id" text PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"share_token" text,
	"viewer_fingerprint" text,
	"ip_country" text,
	"user_agent" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	"slide_timings" jsonb,
	"total_duration_ms" integer,
	"slides_viewed" integer,
	"total_slides" integer,
	"completed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "slide_comments" (
	"id" text PRIMARY KEY NOT NULL,
	"slide_id" integer NOT NULL,
	"deck_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text,
	"user_avatar" text,
	"content" text NOT NULL,
	"parent_id" text,
	"resolved" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "slide_deck_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"version_number" integer NOT NULL,
	"label" text,
	"snapshot" jsonb NOT NULL,
	"change_summary" text,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"search_string" text NOT NULL,
	"frequency" "alert_frequency" DEFAULT 'weekly',
	"status" "alert_status" DEFAULT 'active',
	"last_checked" timestamp,
	"next_check" timestamp,
	"new_papers_found" integer DEFAULT 0,
	"total_checks" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "slide_decks" ADD COLUMN "share_token" text;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD COLUMN "share_enabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD COLUMN "share_password" text;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD COLUMN "share_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "live_poll_responses" ADD CONSTRAINT "live_poll_responses_poll_id_live_polls_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."live_polls"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_polls" ADD CONSTRAINT "live_polls_session_id_live_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."live_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_questions" ADD CONSTRAINT "live_questions_session_id_live_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."live_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_sessions" ADD CONSTRAINT "live_sessions_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presentation_recordings" ADD CONSTRAINT "presentation_recordings_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presentation_views" ADD CONSTRAINT "presentation_views_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_comments" ADD CONSTRAINT "slide_comments_slide_id_slides_id_fk" FOREIGN KEY ("slide_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_comments" ADD CONSTRAINT "slide_comments_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_deck_versions" ADD CONSTRAINT "slide_deck_versions_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_alerts" ADD CONSTRAINT "search_alerts_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_live_poll_responses_poll" ON "live_poll_responses" USING btree ("poll_id");--> statement-breakpoint
CREATE INDEX "idx_live_polls_session" ON "live_polls" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_live_questions_session" ON "live_questions" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_live_sessions_deck" ON "live_sessions" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_live_sessions_join_code" ON "live_sessions" USING btree ("join_code");--> statement-breakpoint
CREATE INDEX "idx_pres_recordings_deck" ON "presentation_recordings" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_pres_recordings_user" ON "presentation_recordings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_pres_views_deck" ON "presentation_views" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_pres_views_fingerprint" ON "presentation_views" USING btree ("viewer_fingerprint");--> statement-breakpoint
CREATE INDEX "idx_pres_views_started" ON "presentation_views" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "idx_slide_comments_slide" ON "slide_comments" USING btree ("slide_id");--> statement-breakpoint
CREATE INDEX "idx_slide_comments_deck" ON "slide_comments" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_slide_comments_parent" ON "slide_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_deck_versions_deck" ON "slide_deck_versions" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_deck_versions_created" ON "slide_deck_versions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_search_alerts_project" ON "search_alerts" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_search_alerts_status" ON "search_alerts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_slide_decks_share_token" ON "slide_decks" USING btree ("share_token");--> statement-breakpoint
ALTER TABLE "slide_decks" ADD CONSTRAINT "slide_decks_share_token_unique" UNIQUE("share_token");