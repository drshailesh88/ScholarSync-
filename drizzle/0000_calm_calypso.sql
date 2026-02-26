CREATE TYPE "public"."added_by" AS ENUM('user', 'search', 'snowball', 'deep_research', 'ai_suggestion');--> statement-breakpoint
CREATE TYPE "public"."analysis_status" AS ENUM('running', 'completed', 'failed', 'needs_review');--> statement-breakpoint
CREATE TYPE "public"."annotation_color" AS ENUM('yellow', 'green', 'red', 'blue', 'purple');--> statement-breakpoint
CREATE TYPE "public"."assessed_by" AS ENUM('user', 'ai');--> statement-breakpoint
CREATE TYPE "public"."audience_type" AS ENUM('thesis_defense', 'conference', 'journal_club', 'classroom', 'general', 'grant_presentation', 'poster_session', 'systematic_review', 'patient_case', 'grand_rounds');--> statement-breakpoint
CREATE TYPE "public"."audio_status" AS ENUM('generating', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."author_type" AS ENUM('user', 'ai', 'collaborator');--> statement-breakpoint
CREATE TYPE "public"."change_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."change_type" AS ENUM('insertion', 'deletion', 'replacement');--> statement-breakpoint
CREATE TYPE "public"."check_type" AS ENUM('plagiarism', 'ai_detection', 'both');--> statement-breakpoint
CREATE TYPE "public"."column_type" AS ENUM('text', 'number', 'boolean', 'select');--> statement-breakpoint
CREATE TYPE "public"."conversation_mode" AS ENUM('chat', 'learn', 'draft', 'research', 'notebook', 'statistics', 'integrity', 'general');--> statement-breakpoint
CREATE TYPE "public"."criterion_type" AS ENUM('inclusion', 'exclusion');--> statement-breakpoint
CREATE TYPE "public"."decided_by" AS ENUM('user', 'ai', 'collaborator');--> statement-breakpoint
CREATE TYPE "public"."degree_level" AS ENUM('undergraduate', 'postgraduate', 'phd', 'postdoc', 'faculty');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."discovered_via" AS ENUM('forward_snowball', 'backward_snowball', 'semantic_scholar', 'openalex', 'pubmed');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('outlining', 'drafting', 'revising', 'final', 'submitted');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('original_article', 'review_article', 'systematic_review', 'state_of_art_review', 'thesis_chapter', 'literature_review', 'meta_analysis', 'case_report', 'case_series', 'letter', 'editorial', 'short_communication', 'book_chapter');--> statement-breakpoint
CREATE TYPE "public"."effect_model" AS ENUM('fixed', 'random');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('csv', 'xlsx', 'xls', 'sav', 'dta', 'json', 'tsv');--> statement-breakpoint
CREATE TYPE "public"."generation_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."institution_type" AS ENUM('university', 'medical_college', 'research_institute', 'hospital');--> statement-breakpoint
CREATE TYPE "public"."item_type" AS ENUM('template', 'workflow', 'style_guide');--> statement-breakpoint
CREATE TYPE "public"."knowledge_source_type" AS ENUM('note', 'paper', 'project');--> statement-breakpoint
CREATE TYPE "public"."learning_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."link_type" AS ENUM('note', 'paper', 'project');--> statement-breakpoint
CREATE TYPE "public"."matrix_source" AS ENUM('manual', 'ai_extracted', 'auto');--> statement-breakpoint
CREATE TYPE "public"."membership_role" AS ENUM('student', 'supervisor', 'admin', 'faculty');--> statement-breakpoint
CREATE TYPE "public"."message_role" AS ENUM('user', 'assistant', 'system', 'tool');--> statement-breakpoint
CREATE TYPE "public"."milestone_status" AS ENUM('pending', 'in_progress', 'completed', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."paper_source" AS ENUM('pubmed', 'semantic_scholar', 'openalex', 'arxiv', 'user_upload', 'snowball', 'deep_research');--> statement-breakpoint
CREATE TYPE "public"."permission" AS ENUM('view', 'comment', 'edit');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('free', 'basic', 'pro', 'institutional');--> statement-breakpoint
CREATE TYPE "public"."project_paper_status" AS ENUM('saved', 'reading', 'approved', 'cited', 'excluded');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('planning', 'drafting', 'reviewing', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('thesis', 'review_article', 'original_article', 'case_report', 'case_series', 'meta_analysis', 'systematic_review', 'literature_review', 'book_chapter', 'dissertation', 'letter', 'editorial', 'short_communication');--> statement-breakpoint
CREATE TYPE "public"."query_type" AS ENUM('user', 'agent_generated', 'agent_augmented', 'snowball', 'deep_research');--> statement-breakpoint
CREATE TYPE "public"."recommendation" AS ENUM('accept', 'minor_revision', 'major_revision', 'reject');--> statement-breakpoint
CREATE TYPE "public"."research_status" AS ENUM('planning', 'searching', 'reading', 'synthesizing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_stage" AS ENUM('search_strategy', 'screening', 'full_text_screening', 'data_extraction', 'risk_of_bias', 'meta_analysis', 'reporting');--> statement-breakpoint
CREATE TYPE "public"."risk_judgment" AS ENUM('low', 'some_concerns', 'high');--> statement-breakpoint
CREATE TYPE "public"."saved_by" AS ENUM('user', 'agent', 'auto');--> statement-breakpoint
CREATE TYPE "public"."screening_decision" AS ENUM('include', 'exclude', 'maybe');--> statement-breakpoint
CREATE TYPE "public"."screening_stage" AS ENUM('title_abstract', 'full_text');--> statement-breakpoint
CREATE TYPE "public"."search_source" AS ENUM('pubmed', 'semantic_scholar', 'openalex', 'arxiv', 'all', 'internal');--> statement-breakpoint
CREATE TYPE "public"."section_status" AS ENUM('outline', 'draft', 'revision', 'approved', 'final');--> statement-breakpoint
CREATE TYPE "public"."section_type" AS ENUM('title', 'abstract', 'introduction', 'methods', 'results', 'discussion', 'conclusion', 'references', 'other');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('critical', 'major', 'minor', 'suggestion');--> statement-breakpoint
CREATE TYPE "public"."slide_layout" AS ENUM('title_slide', 'title_content', 'two_column', 'section_header', 'image_text', 'chart_slide', 'table_slide', 'quote_slide', 'comparison', 'blank', 'bibliography_slide', 'methodology', 'results_summary', 'key_findings', 'timeline_slide', 'stat_overview', 'three_column', 'big_number');--> statement-breakpoint
CREATE TYPE "public"."snowball_direction" AS ENUM('forward', 'backward', 'both');--> statement-breakpoint
CREATE TYPE "public"."snowball_status" AS ENUM('running', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('synthesis', 'papers', 'custom', 'deep_research');--> statement-breakpoint
CREATE TYPE "public"."step_status" AS ENUM('pending', 'running', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."step_type" AS ENUM('query_decompose', 'search', 'filter', 'read_abstract', 'read_fulltext', 'extract', 'synthesize', 'gap_analysis');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('preparing', 'submitted', 'under_review', 'revision_requested', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'cancelled', 'past_due', 'trialing');--> statement-breakpoint
CREATE TYPE "public"."sync_direction" AS ENUM('import', 'export', 'bidirectional');--> statement-breakpoint
CREATE TYPE "public"."sync_status" AS ENUM('running', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."synthesis_section_type" AS ENUM('title_page', 'abstract', 'introduction', 'literature_review', 'methodology', 'results', 'discussion', 'conclusion', 'references', 'appendix', 'acknowledgments', 'custom');--> statement-breakpoint
CREATE TABLE "citation_graph" (
	"id" serial PRIMARY KEY NOT NULL,
	"citing_paper_id" integer NOT NULL,
	"cited_paper_id" integer NOT NULL,
	"discovered_via" "discovered_via",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "citation_graph_citing_paper_id_cited_paper_id_unique" UNIQUE("citing_paper_id","cited_paper_id")
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_id" text NOT NULL,
	"mode" "conversation_mode" NOT NULL,
	"title" text,
	"paper_ids" jsonb DEFAULT '[]'::jsonb,
	"dataset_id" integer,
	"is_archived" boolean DEFAULT false,
	"pinned" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"role" "message_role" NOT NULL,
	"content" text NOT NULL,
	"tool_calls" jsonb,
	"tool_results" jsonb,
	"input_tokens" integer,
	"output_tokens" integer,
	"cached_tokens" integer DEFAULT 0,
	"tokens_used" integer,
	"cost_usd" real,
	"model" text,
	"retrieved_chunks" jsonb,
	"feedback_rating" integer,
	"feedback_comment" text,
	"flagged_inaccurate" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "paper_chunks" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"chunk_index" integer NOT NULL,
	"text" text NOT NULL,
	"section_type" "section_type",
	"page_number" integer,
	"embedding" vector(1536),
	"highlight_priority" real DEFAULT 0,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "paper_extractions" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"project_id" integer,
	"population" text,
	"intervention" text,
	"comparison" text,
	"outcome" text,
	"sample_size" integer,
	"study_design" text,
	"effect_size" text,
	"p_value" text,
	"confidence_interval" text,
	"risk_of_bias" text,
	"evidence_level" text,
	"custom_extractions" jsonb DEFAULT '{}'::jsonb,
	"extraction_model" text,
	"confidence_score" real,
	"human_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"pubmed_id" text,
	"doi" text,
	"semantic_scholar_id" text,
	"arxiv_id" text,
	"openalex_id" text,
	"title" text NOT NULL,
	"authors" jsonb,
	"abstract" text,
	"journal" text,
	"publication_date" date,
	"year" integer,
	"volume" text,
	"issue" text,
	"pages" text,
	"study_type" text,
	"citation_count" integer DEFAULT 0,
	"source" "paper_source" NOT NULL,
	"full_text_available" boolean DEFAULT false,
	"pdf_url" text,
	"pdf_storage_path" text,
	"full_text_plain" text,
	"is_chunked" boolean DEFAULT false,
	"is_extracted" boolean DEFAULT false,
	"language" text DEFAULT 'en',
	"tldr" text,
	"retracted" boolean DEFAULT false,
	"open_access" boolean,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"mesh_terms" jsonb DEFAULT '[]'::jsonb,
	"publication_types" jsonb DEFAULT '[]'::jsonb,
	"fields_of_study" jsonb DEFAULT '[]'::jsonb,
	"evidence_level" text,
	"open_access_url" text,
	"influential_citation_count" integer DEFAULT 0,
	"reference_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "papers_pubmed_id_unique" UNIQUE("pubmed_id"),
	CONSTRAINT "papers_doi_unique" UNIQUE("doi"),
	CONSTRAINT "papers_semantic_scholar_id_unique" UNIQUE("semantic_scholar_id")
);
--> statement-breakpoint
CREATE TABLE "project_context_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"cache_type" text,
	"system_prompt" text,
	"project_summary" text,
	"paper_summaries" text,
	"methodology_context" text,
	"mode_context" jsonb,
	"compiled_content" text,
	"token_count" integer,
	"needs_recompile" boolean DEFAULT true,
	"last_compiled_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "project_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"paper_id" integer NOT NULL,
	"relevance_score" real,
	"user_rating" integer,
	"user_notes" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"status" "project_paper_status" DEFAULT 'saved',
	"added_by" "added_by" DEFAULT 'search',
	"is_approved" boolean DEFAULT true,
	"screening_decision" "screening_decision",
	"screening_reason" text,
	"full_text_reviewed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "project_papers_project_id_paper_id_unique" UNIQUE("project_id","paper_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"research_question" text,
	"project_type" "project_type",
	"study_type" text,
	"field" text,
	"template_id" integer,
	"target_journal" text,
	"citation_style" text DEFAULT 'vancouver',
	"target_word_count" integer,
	"deadline" date,
	"status" "project_status" DEFAULT 'drafting',
	"modes_used" jsonb DEFAULT '[]'::jsonb,
	"is_public" boolean DEFAULT false,
	"supervisor_id" text,
	"institution_id" integer,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "search_queries" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_id" text NOT NULL,
	"original_query" text NOT NULL,
	"query_type" "query_type" DEFAULT 'user',
	"source" "search_source",
	"augmented_queries" jsonb,
	"filters_applied" jsonb,
	"result_count" integer,
	"parent_query_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "snowball_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"seed_paper_id" integer NOT NULL,
	"direction" "snowball_direction",
	"depth" integer DEFAULT 1,
	"papers_found" integer DEFAULT 0,
	"status" "snowball_status" DEFAULT 'running',
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "synthesis_citations" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"paper_id" integer NOT NULL,
	"citation_key" text,
	"page_reference" text,
	"claim_text" text,
	"paragraph_index" integer,
	"position_in_section" integer,
	"formatted" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "synthesis_citations_section_id_paper_id_paragraph_index_unique" UNIQUE("section_id","paper_id","paragraph_index")
);
--> statement-breakpoint
CREATE TABLE "synthesis_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"title" text NOT NULL,
	"document_type" "document_type" DEFAULT 'original_article',
	"citation_style" text DEFAULT 'vancouver',
	"target_journal" text,
	"word_limit" integer,
	"template_id" integer,
	"language" text DEFAULT 'en',
	"overall_status" "document_status" DEFAULT 'drafting',
	"submission_status" text,
	"last_export_at" timestamp,
	"latex_export_path" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "synthesis_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"section_type" "synthesis_section_type",
	"title" text,
	"sort_order" integer,
	"editor_content" jsonb,
	"plain_text_content" text,
	"word_count" integer DEFAULT 0,
	"target_word_count" integer,
	"status" "section_status" DEFAULT 'outline',
	"ai_draft" text,
	"human_edits" text,
	"readability_score" real,
	"ai_tone_score" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "synthesis_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"section_id" integer,
	"version_number" integer NOT NULL,
	"version_name" text,
	"content_snapshot" jsonb NOT NULL,
	"change_summary" text,
	"auto_saved" boolean DEFAULT true,
	"saved_by" "saved_by" DEFAULT 'user',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"degree_level" "degree_level",
	"specialty" text,
	"country" text DEFAULT 'India',
	"bio" text,
	"research_interests" jsonb DEFAULT '[]'::jsonb,
	"plan" "plan" DEFAULT 'free',
	"subscription_id" integer,
	"tokens_used_this_month" integer DEFAULT 0,
	"tokens_limit" integer DEFAULT 10000,
	"tokens_used_total" bigint DEFAULT 0,
	"searches_used_this_month" integer DEFAULT 0,
	"plagiarism_checks_used" integer DEFAULT 0,
	"exports_used_this_month" integer DEFAULT 0,
	"deep_research_used" integer DEFAULT 0,
	"usage_reset_date" timestamp,
	"preferred_language" text DEFAULT 'en',
	"default_citation_style" text DEFAULT 'apa7',
	"orcid_id" text,
	"institution_id" integer,
	"onboarding_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_active_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"project_id" integer,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" text,
	"details" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "datasets" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"storage_path" text NOT NULL,
	"file_type" "file_type",
	"file_size_bytes" bigint,
	"detected_columns" jsonb,
	"row_count" integer,
	"column_count" integer,
	"missing_values" jsonb,
	"data_summary" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "deep_research_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_id" text NOT NULL,
	"original_query" text NOT NULL,
	"decomposed_queries" jsonb,
	"research_plan" jsonb,
	"status" "research_status" DEFAULT 'planning',
	"total_steps" integer DEFAULT 0,
	"completed_steps" integer DEFAULT 0,
	"papers_found" integer DEFAULT 0,
	"papers_read" integer DEFAULT 0,
	"final_report" text,
	"key_findings" jsonb,
	"gaps_identified" jsonb,
	"total_tokens_used" bigint DEFAULT 0,
	"total_cost_usd" real DEFAULT 0,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "deep_research_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"step_number" integer NOT NULL,
	"step_type" "step_type",
	"input_data" jsonb,
	"output_data" jsonb,
	"tokens_used" integer,
	"status" "step_status" DEFAULT 'pending',
	"started_at" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "discipline_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"system_prompt_additions" text,
	"key_journals" jsonb,
	"key_guidelines" jsonb,
	"terminology" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "document_changes" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"author_type" "author_type",
	"author_id" text,
	"change_type" "change_type",
	"original_text" text,
	"new_text" text,
	"position_start" integer,
	"position_end" integer,
	"status" "change_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "document_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"user_id" text,
	"author_type" "author_type",
	"text_range_start" integer,
	"text_range_end" integer,
	"content" text NOT NULL,
	"parent_comment_id" integer,
	"is_resolved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "document_shares" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"shared_with_email" text,
	"shared_with_user_id" text,
	"permission" "permission",
	"share_token" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "document_shares_share_token_unique" UNIQUE("share_token")
);
--> statement-breakpoint
CREATE TABLE "export_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"journal_name" text,
	"formatting_rules" jsonb,
	"citation_style" text,
	"word_limits" jsonb,
	"section_requirements" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "integrity_checks" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"document_id" integer,
	"section_id" integer,
	"check_type" "check_type",
	"content_checked" text NOT NULL,
	"word_count" integer,
	"plagiarism_score" real,
	"plagiarism_matches" jsonb,
	"plagiarism_engine" text DEFAULT 'copyleaks',
	"ai_score" real,
	"ai_detection_details" jsonb,
	"ai_detection_engine" text DEFAULT 'copyleaks',
	"flagged_passages" jsonb,
	"source_matches" jsonb,
	"user_reviewed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "learning_modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text,
	"difficulty" "difficulty",
	"content" text,
	"prerequisites" jsonb DEFAULT '[]'::jsonb,
	"estimated_minutes" integer,
	"trigger_mode" text,
	"trigger_action" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "presentation_coach_evaluations" (
	"id" serial PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"structure_score" real,
	"evidence_score" real,
	"narrative_score" real,
	"design_score" real,
	"audience_fit_score" real,
	"overall_score" real,
	"slide_insights" jsonb DEFAULT '[]'::jsonb,
	"suggestions" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "slide_decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"user_id" text NOT NULL,
	"document_id" integer,
	"title" text NOT NULL,
	"description" text,
	"theme" text DEFAULT 'modern',
	"audience_type" "audience_type" DEFAULT 'general',
	"generation_status" "generation_status",
	"generation_prompt" text,
	"theme_config" jsonb,
	"slide_order" jsonb DEFAULT '[]'::jsonb,
	"total_slides" integer DEFAULT 0,
	"source_type" "source_type",
	"source_paper_ids" jsonb DEFAULT '[]'::jsonb,
	"export_path" text,
	"template_id" text,
	"citation_style" text DEFAULT 'apa',
	"institution_kit" jsonb,
	"deep_research_session_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "slide_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"template_data" jsonb NOT NULL,
	"is_system" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"deck_id" integer NOT NULL,
	"sort_order" integer NOT NULL,
	"layout" "slide_layout" DEFAULT 'title_content',
	"title" text,
	"subtitle" text,
	"content" jsonb,
	"content_blocks" jsonb DEFAULT '[]'::jsonb,
	"speaker_notes" text,
	"source_section_id" integer,
	"source_citations" jsonb DEFAULT '[]'::jsonb,
	"generated_by_ai" boolean DEFAULT false,
	"has_chart" boolean DEFAULT false,
	"has_table" boolean DEFAULT false,
	"has_image" boolean DEFAULT false,
	"visual_data" jsonb,
	"created_at" timestamp DEFAULT now(),
	"last_edited_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "statistical_analyses" (
	"id" serial PRIMARY KEY NOT NULL,
	"dataset_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"analysis_type" text NOT NULL,
	"variables" jsonb NOT NULL,
	"parameters" jsonb,
	"results" jsonb,
	"interpretation" text,
	"generated_code" text,
	"code_language" text DEFAULT 'python',
	"results_table" text,
	"results_figure" text,
	"plots" jsonb,
	"status" "analysis_status" DEFAULT 'completed',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "template_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer NOT NULL,
	"section_type" text NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer,
	"suggested_word_count" integer,
	"guidance" text,
	"example_content" text,
	"is_required" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"project_type" text,
	"sections" jsonb NOT NULL,
	"is_system" boolean DEFAULT true,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_learning_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"module_id" integer NOT NULL,
	"status" "learning_status" DEFAULT 'not_started',
	"score" real,
	"started_at" timestamp,
	"completed_at" timestamp,
	CONSTRAINT "user_learning_progress_user_module_unique" UNIQUE("user_id","module_id")
);
--> statement-breakpoint
CREATE TABLE "user_references" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"paper_id" integer,
	"collection" text DEFAULT 'All Papers',
	"is_favorite" boolean DEFAULT false,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"notes" text,
	"manual_citation_data" jsonb,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "user_references_user_paper_unique" UNIQUE("user_id","paper_id")
);
--> statement-breakpoint
CREATE TABLE "writing_action_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer,
	"user_id" text NOT NULL,
	"action_type" text NOT NULL,
	"original_text" text,
	"modified_text" text,
	"accepted" boolean,
	"tokens_used" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "writing_analysis_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"flesch_reading_ease" real,
	"flesch_kincaid_grade" real,
	"gunning_fog_index" real,
	"coleman_liau_index" real,
	"passive_voice_pct" real,
	"avg_sentence_length" real,
	"vocabulary_diversity" real,
	"academic_jargon_pct" real,
	"objectivity_score" real,
	"confidence_score" real,
	"formality_score" real,
	"word_count" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"message_id" integer,
	"feature" text,
	"rating" integer,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pdf_annotations" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"page_number" integer,
	"highlight_text" text,
	"note" text,
	"color" "annotation_color" DEFAULT 'yellow',
	"position" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "prompt_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt_name" text NOT NULL,
	"version_number" integer NOT NULL,
	"system_prompt" text NOT NULL,
	"description" text,
	"avg_feedback_rating" real,
	"total_uses" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "prompt_versions_prompt_name_version_number_unique" UNIQUE("prompt_name","version_number")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan" "plan",
	"razorpay_subscription_id" text,
	"razorpay_customer_id" text,
	"status" "subscription_status" DEFAULT 'active',
	"current_period_start" timestamp,
	"current_period_end" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usage_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"event_type" text NOT NULL,
	"tokens_used" integer,
	"cost_usd" real,
	"model" text,
	"project_id" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usage_quotas" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan" "plan" NOT NULL,
	"ai_tokens_monthly" integer NOT NULL,
	"paper_searches_monthly" integer,
	"plagiarism_checks_monthly" integer,
	"exports_monthly" integer,
	"deep_research_monthly" integer,
	"max_projects" integer,
	"max_papers_per_project" integer,
	"max_file_upload_mb" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "usage_quotas_plan_unique" UNIQUE("plan")
);
--> statement-breakpoint
CREATE TABLE "comparison_matrices" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "matrix_cells" (
	"id" serial PRIMARY KEY NOT NULL,
	"matrix_id" integer NOT NULL,
	"column_id" integer NOT NULL,
	"paper_id" integer NOT NULL,
	"value" text,
	"source" "matrix_source",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "matrix_cells_matrix_column_paper_unique" UNIQUE("matrix_id","column_id","paper_id")
);
--> statement-breakpoint
CREATE TABLE "matrix_columns" (
	"id" serial PRIMARY KEY NOT NULL,
	"matrix_id" integer NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer,
	"column_type" "column_type" DEFAULT 'text',
	"options" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meta_analysis_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"analysis_name" text,
	"outcome_measure" text,
	"effect_model" "effect_model",
	"pooled_effect" real,
	"pooled_ci_lower" real,
	"pooled_ci_upper" real,
	"heterogeneity_i2" real,
	"heterogeneity_p" real,
	"study_data" jsonb,
	"forest_plot_path" text,
	"funnel_plot_path" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "milestone_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"milestone_id" integer NOT NULL,
	"progress_pct" integer DEFAULT 0,
	"notes" text,
	"updated_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "prisma_flow" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"stage" text NOT NULL,
	"source" text,
	"record_count" integer DEFAULT 0,
	"excluded_count" integer DEFAULT 0,
	"exclusion_reasons" jsonb,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "project_milestones" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"target_date" date,
	"sort_order" integer,
	"status" "milestone_status" DEFAULT 'pending',
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "risk_of_bias" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"domain" text NOT NULL,
	"judgment" "risk_judgment",
	"support_text" text,
	"assessed_by" "assessed_by",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "risk_of_bias_paper_project_domain_unique" UNIQUE("paper_id","project_id","domain")
);
--> statement-breakpoint
CREATE TABLE "screening_criteria" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"criterion_type" "criterion_type",
	"description" text NOT NULL,
	"category" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "screening_decisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"paper_id" integer NOT NULL,
	"stage" "screening_stage",
	"decision" "screening_decision",
	"reason" text,
	"decided_by" "decided_by",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "screening_decisions_project_paper_stage_unique" UNIQUE("project_id","paper_id","stage")
);
--> statement-breakpoint
CREATE TABLE "systematic_review_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"pico" jsonb,
	"search_strategy" jsonb,
	"search_databases" jsonb DEFAULT '["pubmed"]'::jsonb,
	"protocol_registration" text,
	"protocol_doi" text,
	"search_date" timestamp,
	"last_search_date" timestamp,
	"review_stage" "review_stage" DEFAULT 'search_strategy',
	"settings" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "systematic_review_config_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE "institution_memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"institution_id" integer NOT NULL,
	"role" "membership_role",
	"department" text,
	"joined_at" timestamp DEFAULT now(),
	CONSTRAINT "institution_memberships_user_institution_unique" UNIQUE("user_id","institution_id")
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"domain" text,
	"country" text,
	"institution_type" "institution_type",
	"logo_url" text,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "supervisor_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"supervisor_id" text NOT NULL,
	"student_id" text NOT NULL,
	"project_id" integer NOT NULL,
	"assigned_at" timestamp DEFAULT now(),
	CONSTRAINT "supervisor_assignments_student_project_unique" UNIQUE("student_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "audio_scripts" (
	"id" serial PRIMARY KEY NOT NULL,
	"summary_id" integer NOT NULL,
	"script_text" text NOT NULL,
	"speaker_assignments" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "audio_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"document_id" integer,
	"title" text,
	"storage_path" text,
	"duration_seconds" integer,
	"status" "audio_status" DEFAULT 'generating',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"is_active" boolean DEFAULT true,
	"last_synced_at" timestamp,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "integrations_user_provider_unique" UNIQUE("user_id","provider")
);
--> statement-breakpoint
CREATE TABLE "journal_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"publisher" text,
	"impact_factor" real,
	"word_limits" jsonb,
	"citation_style" text,
	"section_requirements" jsonb,
	"submission_url" text,
	"guidelines_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "knowledge_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_type" "knowledge_source_type",
	"source_id" integer NOT NULL,
	"target_type" "knowledge_source_type",
	"target_id" integer NOT NULL,
	"link_type" "link_type",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "knowledge_links_source_target_unique" UNIQUE("source_type","source_id","target_type","target_id")
);
--> statement-breakpoint
CREATE TABLE "knowledge_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"content" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"paper_id" integer,
	"project_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "marketplace_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" text NOT NULL,
	"item_type" "item_type",
	"title" text NOT NULL,
	"description" text,
	"content" jsonb NOT NULL,
	"is_published" boolean DEFAULT false,
	"download_count" integer DEFAULT 0,
	"avg_rating" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "marketplace_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"rating" integer,
	"review_text" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "marketplace_reviews_item_user_unique" UNIQUE("item_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "orcid_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"orcid_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"last_synced_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "orcid_links_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"doi" text,
	"journal" text,
	"year" integer,
	"citation_count" integer DEFAULT 0,
	"paper_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review_simulations" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"reviewer_persona" text,
	"overall_recommendation" "recommendation",
	"summary" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "simulated_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"simulation_id" integer NOT NULL,
	"section_type" text,
	"severity" "severity",
	"category" text,
	"comment_text" text NOT NULL,
	"user_addressed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "submission_checks" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_id" integer NOT NULL,
	"check_type" text,
	"passed" boolean,
	"details" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"journal_id" integer,
	"status" "submission_status" DEFAULT 'preparing',
	"submitted_at" timestamp,
	"response_at" timestamp,
	"cover_letter" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sync_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"integration_id" integer NOT NULL,
	"direction" "sync_direction",
	"status" "sync_status",
	"records_synced" integer DEFAULT 0,
	"error_message" text,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_profiles_public" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text,
	"headline" text,
	"profile_url_slug" text,
	"education" jsonb,
	"research_areas" jsonb,
	"is_visible" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_profiles_public_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_profiles_public_profile_url_slug_unique" UNIQUE("profile_url_slug")
);
--> statement-breakpoint
ALTER TABLE "citation_graph" ADD CONSTRAINT "citation_graph_citing_paper_id_papers_id_fk" FOREIGN KEY ("citing_paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "citation_graph" ADD CONSTRAINT "citation_graph_cited_paper_id_papers_id_fk" FOREIGN KEY ("cited_paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_chunks" ADD CONSTRAINT "paper_chunks_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_extractions" ADD CONSTRAINT "paper_extractions_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paper_extractions" ADD CONSTRAINT "paper_extractions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_context_cache" ADD CONSTRAINT "project_context_cache_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_papers" ADD CONSTRAINT "project_papers_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_papers" ADD CONSTRAINT "project_papers_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_queries" ADD CONSTRAINT "search_queries_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_queries" ADD CONSTRAINT "search_queries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_queries" ADD CONSTRAINT "search_queries_parent_query_id_search_queries_id_fk" FOREIGN KEY ("parent_query_id") REFERENCES "public"."search_queries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snowball_sessions" ADD CONSTRAINT "snowball_sessions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snowball_sessions" ADD CONSTRAINT "snowball_sessions_seed_paper_id_papers_id_fk" FOREIGN KEY ("seed_paper_id") REFERENCES "public"."papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_citations" ADD CONSTRAINT "synthesis_citations_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_citations" ADD CONSTRAINT "synthesis_citations_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_documents" ADD CONSTRAINT "synthesis_documents_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_sections" ADD CONSTRAINT "synthesis_sections_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_versions" ADD CONSTRAINT "synthesis_versions_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "synthesis_versions" ADD CONSTRAINT "synthesis_versions_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deep_research_sessions" ADD CONSTRAINT "deep_research_sessions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deep_research_sessions" ADD CONSTRAINT "deep_research_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deep_research_steps" ADD CONSTRAINT "deep_research_steps_session_id_deep_research_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."deep_research_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_changes" ADD CONSTRAINT "document_changes_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_comments" ADD CONSTRAINT "document_comments_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_comments" ADD CONSTRAINT "document_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_comments" ADD CONSTRAINT "document_comments_parent_comment_id_document_comments_id_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."document_comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_shares" ADD CONSTRAINT "document_shares_shared_with_user_id_users_id_fk" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD CONSTRAINT "integrity_checks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD CONSTRAINT "integrity_checks_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrity_checks" ADD CONSTRAINT "integrity_checks_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presentation_coach_evaluations" ADD CONSTRAINT "presentation_coach_evaluations_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD CONSTRAINT "slide_decks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD CONSTRAINT "slide_decks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slide_decks" ADD CONSTRAINT "slide_decks_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slides" ADD CONSTRAINT "slides_deck_id_slide_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."slide_decks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slides" ADD CONSTRAINT "slides_source_section_id_synthesis_sections_id_fk" FOREIGN KEY ("source_section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "statistical_analyses" ADD CONSTRAINT "statistical_analyses_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "statistical_analyses" ADD CONSTRAINT "statistical_analyses_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_sections" ADD CONSTRAINT "template_sections_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_learning_progress" ADD CONSTRAINT "user_learning_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_learning_progress" ADD CONSTRAINT "user_learning_progress_module_id_learning_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."learning_modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_references" ADD CONSTRAINT "user_references_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_references" ADD CONSTRAINT "user_references_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_action_log" ADD CONSTRAINT "writing_action_log_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_action_log" ADD CONSTRAINT "writing_action_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_analysis_snapshots" ADD CONSTRAINT "writing_analysis_snapshots_section_id_synthesis_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."synthesis_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_annotations" ADD CONSTRAINT "pdf_annotations_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_annotations" ADD CONSTRAINT "pdf_annotations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_events" ADD CONSTRAINT "usage_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_events" ADD CONSTRAINT "usage_events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparison_matrices" ADD CONSTRAINT "comparison_matrices_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matrix_cells" ADD CONSTRAINT "matrix_cells_matrix_id_comparison_matrices_id_fk" FOREIGN KEY ("matrix_id") REFERENCES "public"."comparison_matrices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matrix_cells" ADD CONSTRAINT "matrix_cells_column_id_matrix_columns_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."matrix_columns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matrix_cells" ADD CONSTRAINT "matrix_cells_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matrix_columns" ADD CONSTRAINT "matrix_columns_matrix_id_comparison_matrices_id_fk" FOREIGN KEY ("matrix_id") REFERENCES "public"."comparison_matrices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_analysis_results" ADD CONSTRAINT "meta_analysis_results_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "milestone_progress" ADD CONSTRAINT "milestone_progress_milestone_id_project_milestones_id_fk" FOREIGN KEY ("milestone_id") REFERENCES "public"."project_milestones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "milestone_progress" ADD CONSTRAINT "milestone_progress_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prisma_flow" ADD CONSTRAINT "prisma_flow_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_milestones" ADD CONSTRAINT "project_milestones_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "risk_of_bias" ADD CONSTRAINT "risk_of_bias_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "risk_of_bias" ADD CONSTRAINT "risk_of_bias_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screening_criteria" ADD CONSTRAINT "screening_criteria_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screening_decisions" ADD CONSTRAINT "screening_decisions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screening_decisions" ADD CONSTRAINT "screening_decisions_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "systematic_review_config" ADD CONSTRAINT "systematic_review_config_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "institution_memberships" ADD CONSTRAINT "institution_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "institution_memberships" ADD CONSTRAINT "institution_memberships_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supervisor_assignments" ADD CONSTRAINT "supervisor_assignments_supervisor_id_users_id_fk" FOREIGN KEY ("supervisor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supervisor_assignments" ADD CONSTRAINT "supervisor_assignments_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supervisor_assignments" ADD CONSTRAINT "supervisor_assignments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audio_scripts" ADD CONSTRAINT "audio_scripts_summary_id_audio_summaries_id_fk" FOREIGN KEY ("summary_id") REFERENCES "public"."audio_summaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audio_summaries" ADD CONSTRAINT "audio_summaries_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audio_summaries" ADD CONSTRAINT "audio_summaries_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_notes" ADD CONSTRAINT "knowledge_notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_notes" ADD CONSTRAINT "knowledge_notes_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_notes" ADD CONSTRAINT "knowledge_notes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_items" ADD CONSTRAINT "marketplace_items_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_reviews" ADD CONSTRAINT "marketplace_reviews_item_id_marketplace_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."marketplace_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_reviews" ADD CONSTRAINT "marketplace_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcid_links" ADD CONSTRAINT "orcid_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_paper_id_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_simulations" ADD CONSTRAINT "review_simulations_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulated_comments" ADD CONSTRAINT "simulated_comments_simulation_id_review_simulations_id_fk" FOREIGN KEY ("simulation_id") REFERENCES "public"."review_simulations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission_checks" ADD CONSTRAINT "submission_checks_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_document_id_synthesis_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."synthesis_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_journal_id_journal_profiles_id_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sync_log" ADD CONSTRAINT "sync_log_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles_public" ADD CONSTRAINT "user_profiles_public_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_citation_graph_citing" ON "citation_graph" USING btree ("citing_paper_id");--> statement-breakpoint
CREATE INDEX "idx_citation_graph_cited" ON "citation_graph" USING btree ("cited_paper_id");--> statement-breakpoint
CREATE INDEX "idx_conversations_project" ON "conversations" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_conversations_user" ON "conversations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_conversations_mode" ON "conversations" USING btree ("mode");--> statement-breakpoint
CREATE INDEX "idx_messages_conversation" ON "messages" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "idx_paper_chunks_paper" ON "paper_chunks" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_paper_chunks_section" ON "paper_chunks" USING btree ("section_type");--> statement-breakpoint
CREATE INDEX "idx_paper_extractions_paper" ON "paper_extractions" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_paper_extractions_project" ON "paper_extractions" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_papers_source" ON "papers" USING btree ("source");--> statement-breakpoint
CREATE INDEX "idx_papers_doi" ON "papers" USING btree ("doi");--> statement-breakpoint
CREATE INDEX "idx_papers_pubmed_id" ON "papers" USING btree ("pubmed_id");--> statement-breakpoint
CREATE INDEX "idx_papers_s2_id" ON "papers" USING btree ("semantic_scholar_id");--> statement-breakpoint
CREATE INDEX "idx_papers_year" ON "papers" USING btree ("year");--> statement-breakpoint
CREATE INDEX "idx_project_papers_project" ON "project_papers" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_project_papers_paper" ON "project_papers" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_project_papers_status" ON "project_papers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_projects_user" ON "projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_projects_status" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_search_queries_project" ON "search_queries" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_search_queries_user" ON "search_queries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_synthesis_citations_section" ON "synthesis_citations" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "idx_synthesis_citations_paper" ON "synthesis_citations" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_synthesis_docs_project" ON "synthesis_documents" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_synthesis_sections_doc" ON "synthesis_sections" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_synthesis_versions_doc" ON "synthesis_versions" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_activity_log_user" ON "activity_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_activity_log_project" ON "activity_log" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_activity_log_created" ON "activity_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_datasets_project" ON "datasets" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_datasets_user" ON "datasets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_deep_research_project" ON "deep_research_sessions" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_deep_research_user" ON "deep_research_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_deep_research_steps_sess" ON "deep_research_steps" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_doc_changes_section" ON "document_changes" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "idx_doc_comments_section" ON "document_comments" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "idx_doc_shares_document" ON "document_shares" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_integrity_project" ON "integrity_checks" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_integrity_document" ON "integrity_checks" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_coach_eval_deck" ON "presentation_coach_evaluations" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_slide_decks_project" ON "slide_decks" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_slide_decks_user" ON "slide_decks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_slides_deck" ON "slides" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "idx_analyses_dataset" ON "statistical_analyses" USING btree ("dataset_id");--> statement-breakpoint
CREATE INDEX "idx_analyses_project" ON "statistical_analyses" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_user_refs_user" ON "user_references" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_refs_paper" ON "user_references" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_user_refs_collection" ON "user_references" USING btree ("collection");--> statement-breakpoint
CREATE INDEX "idx_writing_actions_section" ON "writing_action_log" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "idx_writing_actions_user" ON "writing_action_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_writing_snapshots_section" ON "writing_analysis_snapshots" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "idx_pdf_annotations_paper" ON "pdf_annotations" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_pdf_annotations_user" ON "pdf_annotations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_usage_events_user" ON "usage_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_usage_events_created" ON "usage_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_matrix_cells_matrix" ON "matrix_cells" USING btree ("matrix_id");--> statement-breakpoint
CREATE INDEX "idx_matrix_cells_paper" ON "matrix_cells" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_matrix_columns_matrix" ON "matrix_columns" USING btree ("matrix_id");--> statement-breakpoint
CREATE INDEX "idx_meta_analysis_project" ON "meta_analysis_results" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_prisma_flow_project" ON "prisma_flow" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_milestones_project" ON "project_milestones" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_risk_of_bias_paper" ON "risk_of_bias" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_risk_of_bias_project" ON "risk_of_bias" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_screening_criteria_proj" ON "screening_criteria" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_screening_decisions_proj" ON "screening_decisions" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_screening_decisions_paper" ON "screening_decisions" USING btree ("paper_id");--> statement-breakpoint
CREATE INDEX "idx_sr_config_project" ON "systematic_review_config" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_inst_memberships_user" ON "institution_memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_inst_memberships_inst" ON "institution_memberships" USING btree ("institution_id");--> statement-breakpoint
CREATE INDEX "idx_supervisor_assign_super" ON "supervisor_assignments" USING btree ("supervisor_id");--> statement-breakpoint
CREATE INDEX "idx_supervisor_assign_student" ON "supervisor_assignments" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "idx_integrations_user" ON "integrations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_knowledge_notes_user" ON "knowledge_notes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_marketplace_creator" ON "marketplace_items" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "idx_marketplace_reviews_item" ON "marketplace_reviews" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "idx_publications_user" ON "publications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_review_sims_document" ON "review_simulations" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_submissions_document" ON "submissions" USING btree ("document_id");