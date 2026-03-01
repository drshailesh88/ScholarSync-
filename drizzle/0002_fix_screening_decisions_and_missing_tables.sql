ALTER TABLE "screening_decisions" ADD COLUMN "reviewer_id" text;--> statement-breakpoint
ALTER TABLE "screening_decisions" DROP CONSTRAINT "screening_decisions_project_paper_stage_unique";--> statement-breakpoint
ALTER TABLE "screening_decisions" ADD CONSTRAINT "screening_decisions_project_paper_stage_reviewer_unique" UNIQUE("project_id","paper_id","stage","reviewer_id");--> statement-breakpoint
CREATE INDEX "idx_screening_decisions_reviewer" ON "screening_decisions" USING btree ("reviewer_id");--> statement-breakpoint
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
ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_collaborators" ADD CONSTRAINT "project_collaborators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sr_audit_log" ADD CONSTRAINT "sr_audit_log_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_project_collaborator" ON "project_collaborators" USING btree ("project_id","user_id");--> statement-breakpoint
CREATE INDEX "idx_project_collaborators_project" ON "project_collaborators" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_audit_log_project" ON "sr_audit_log" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_audit_log_action" ON "sr_audit_log" USING btree ("action");