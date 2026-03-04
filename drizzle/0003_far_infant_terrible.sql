CREATE TYPE "public"."latex_compilation_status" AS ENUM('success', 'error', 'warning');--> statement-breakpoint
CREATE TYPE "public"."latex_compiler" AS ENUM('pdflatex', 'xelatex', 'lualatex');--> statement-breakpoint
ALTER TYPE "public"."slide_layout" ADD VALUE 'freeform';--> statement-breakpoint
CREATE TABLE "integrity_batches" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"file_count" integer NOT NULL,
	"completed_count" integer DEFAULT 0,
	"status" text DEFAULT 'processing' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "latex_compilations" (
	"id" text PRIMARY KEY NOT NULL,
	"latex_project_id" text NOT NULL,
	"status" "latex_compilation_status" NOT NULL,
	"log" text,
	"pdf_storage_key" text,
	"duration_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "latex_files" (
	"id" text PRIMARY KEY NOT NULL,
	"latex_project_id" text NOT NULL,
	"path" text NOT NULL,
	"content" text,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "latex_projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"project_id" integer,
	"title" text DEFAULT 'Untitled Paper' NOT NULL,
	"compiler" "latex_compiler" DEFAULT 'pdflatex',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "retracted_papers" (
	"doi" text PRIMARY KEY NOT NULL,
	"retraction_date" timestamp,
	"retraction_nature" text,
	"reason" text,
	"original_paper_date" timestamp,
	"journal" text,
	"title" text
);
--> statement-breakpoint
CREATE TABLE "project_collaborators" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'reviewer' NOT NULL,
	"invited_at" timestamp DEFAULT now(),
	"accepted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sr_audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" integer,
	"details" jsonb,
	"ai_involved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "illustrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"project_id" integer,
	"title" text DEFAULT 'Untitled Illustration' NOT NULL,
	"description" text,
	"svg_content" text,
	"canvas_json" jsonb,
	"mermaid_syntax" text,
	"domain" text,
	"source_backend" text,
	"source_prompt" text,
	"width" integer,
	"height" integer,
	"png_r2_key" text,
	"pdf_r2_key" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "screening_decisions" DROP CONSTRAINT "screening_decisions_project_paper_stage_unique";--> statement-breakpoint
ALTER TABLE "integrity_checks" ALTER COLUMN "project_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "batch_id" integer;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "file_name" text;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "citation_audit_results" jsonb;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "full_result" jsonb;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "status" text DEFAULT 'completed';--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD COLUMN "error_message" text;--> statement-breakpoint
ALTER TABLE "screening_decisions" ADD COLUMN "reviewer_id" text;--> statement-breakpoint
ALTER TABLE "integrity_batches" ADD CONSTRAINT "integrity_batches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latex_compilations" ADD CONSTRAINT "latex_compilations_latex_project_id_latex_projects_id_fk" FOREIGN KEY ("latex_project_id") REFERENCES "public"."latex_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latex_files" ADD CONSTRAINT "latex_files_latex_project_id_latex_projects_id_fk" FOREIGN KEY ("latex_project_id") REFERENCES "public"."latex_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latex_projects" ADD CONSTRAINT "latex_projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latex_projects" ADD CONSTRAINT "latex_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sr_audit_log" ADD CONSTRAINT "sr_audit_log_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "illustrations" ADD CONSTRAINT "illustrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "illustrations" ADD CONSTRAINT "illustrations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_integrity_batches_user" ON "integrity_batches" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_latex_compilations_project" ON "latex_compilations" USING btree ("latex_project_id");--> statement-breakpoint
CREATE INDEX "idx_latex_files_project" ON "latex_files" USING btree ("latex_project_id");--> statement-breakpoint
CREATE INDEX "idx_latex_projects_user" ON "latex_projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_latex_projects_project" ON "latex_projects" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_project_collaborator" ON "project_collaborators" USING btree ("project_id","user_id");--> statement-breakpoint
CREATE INDEX "idx_project_collaborators_project" ON "project_collaborators" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_audit_log_project" ON "sr_audit_log" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_audit_log_action" ON "sr_audit_log" USING btree ("action");--> statement-breakpoint
CREATE INDEX "idx_illustrations_user" ON "illustrations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_illustrations_project" ON "illustrations" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_illustrations_domain" ON "illustrations" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "idx_illustrations_deleted" ON "illustrations" USING btree ("deleted_at");--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD CONSTRAINT "integrity_checks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD CONSTRAINT "integrity_checks_batch_id_integrity_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."integrity_batches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_integrity_user" ON "integrity_checks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_integrity_batch" ON "integrity_checks" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "idx_screening_decisions_reviewer" ON "screening_decisions" USING btree ("reviewer_id");--> statement-breakpoint
ALTER TABLE "screening_decisions" ADD CONSTRAINT "screening_decisions_project_paper_stage_reviewer_unique" UNIQUE("project_id","paper_id","stage","reviewer_id");