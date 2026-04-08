CREATE TYPE "public"."anchor_type" AS ENUM('text_offset', 'css_selector', 'page_position');--> statement-breakpoint
CREATE TYPE "public"."extraction_state" AS ENUM('pending', 'ready', 'partial', 'failed');--> statement-breakpoint
CREATE TYPE "public"."handoff_status" AS ENUM('pending', 'consumed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."read_status" AS ENUM('unread', 'in_progress', 'read');--> statement-breakpoint
CREATE TYPE "public"."workflow_state" AS ENUM('inbox', 'core', 'background', 'archived');--> statement-breakpoint
CREATE TABLE "editor_handoffs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"document_id" integer,
	"payload" jsonb NOT NULL,
	"status" "handoff_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"consumed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "library_annotations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"source_type" text NOT NULL,
	"source_id" integer NOT NULL,
	"selected_text" text,
	"note" text,
	"color" "annotation_color" DEFAULT 'yellow',
	"anchor_type" "anchor_type" NOT NULL,
	"anchor_payload" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_active_project_id" integer;--> statement-breakpoint
ALTER TABLE "user_references" ADD COLUMN "workflow_state" "workflow_state" DEFAULT 'inbox';--> statement-breakpoint
ALTER TABLE "user_references" ADD COLUMN "reading_progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user_references" ADD COLUMN "read_status" "read_status" DEFAULT 'unread';--> statement-breakpoint
ALTER TABLE "user_references" ADD COLUMN "last_read_at" timestamp;--> statement-breakpoint
ALTER TABLE "web_sources" ADD COLUMN "workflow_state" "workflow_state" DEFAULT 'inbox';--> statement-breakpoint
ALTER TABLE "web_sources" ADD COLUMN "reading_progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "web_sources" ADD COLUMN "read_status" "read_status" DEFAULT 'unread';--> statement-breakpoint
ALTER TABLE "web_sources" ADD COLUMN "last_read_at" timestamp;--> statement-breakpoint
ALTER TABLE "web_sources" ADD COLUMN "extraction_state" "extraction_state" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "editor_handoffs" ADD CONSTRAINT "editor_handoffs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "editor_handoffs" ADD CONSTRAINT "editor_handoffs_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "library_annotations" ADD CONSTRAINT "library_annotations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_editor_handoffs_user" ON "editor_handoffs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_editor_handoffs_status" ON "editor_handoffs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_lib_annotations_user" ON "library_annotations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_lib_annotations_source" ON "library_annotations" USING btree ("source_type","source_id");--> statement-breakpoint
CREATE INDEX "idx_user_refs_workflow_state" ON "user_references" USING btree ("workflow_state");