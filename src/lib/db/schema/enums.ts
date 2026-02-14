import { pgEnum } from "drizzle-orm/pg-core";

// ============================================================================
// SCHOLARSYNC - ALL pgEnum DEFINITIONS
// Extracted from CHECK constraints in database/schema.sql
// ============================================================================

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
export const degreeLevelEnum = pgEnum("degree_level", ["undergraduate", "postgraduate", "phd", "postdoc", "faculty"]);
export const planEnum = pgEnum("plan", ["free", "basic", "pro", "institutional"]);

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projectStatusEnum = pgEnum("project_status", ["planning", "drafting", "reviewing", "completed", "archived"]);
export const projectTypeEnum = pgEnum("project_type", ["thesis", "review_article", "original_article", "case_report", "case_series", "meta_analysis", "systematic_review", "literature_review", "book_chapter", "dissertation", "letter", "editorial", "short_communication"]);

// ---------------------------------------------------------------------------
// Papers
// ---------------------------------------------------------------------------
export const paperSourceEnum = pgEnum("paper_source", ["pubmed", "semantic_scholar", "openalex", "arxiv", "user_upload", "snowball", "deep_research"]);

// ---------------------------------------------------------------------------
// Paper Chunks / Synthesis Sections
// ---------------------------------------------------------------------------
export const sectionTypeEnum = pgEnum("section_type", ["title", "abstract", "introduction", "methods", "results", "discussion", "conclusion", "references", "other"]);

// ---------------------------------------------------------------------------
// Project Papers
// ---------------------------------------------------------------------------
export const projectPaperStatusEnum = pgEnum("project_paper_status", ["saved", "reading", "approved", "cited", "excluded"]);
export const addedByEnum = pgEnum("added_by", ["user", "search", "snowball", "deep_research", "ai_suggestion"]);
export const screeningDecisionEnum = pgEnum("screening_decision", ["include", "exclude", "maybe"]);

// ---------------------------------------------------------------------------
// Search Queries
// ---------------------------------------------------------------------------
export const queryTypeEnum = pgEnum("query_type", ["user", "agent_generated", "agent_augmented", "snowball", "deep_research"]);
export const searchSourceEnum = pgEnum("search_source", ["pubmed", "semantic_scholar", "openalex", "arxiv", "all", "internal"]);

// ---------------------------------------------------------------------------
// Synthesis Documents
// ---------------------------------------------------------------------------
export const documentTypeEnum = pgEnum("document_type", ["original_article", "review_article", "systematic_review", "state_of_art_review", "thesis_chapter", "literature_review", "meta_analysis", "case_report", "case_series", "letter", "editorial", "short_communication", "book_chapter"]);
export const documentStatusEnum = pgEnum("document_status", ["outlining", "drafting", "revising", "final", "submitted"]);

// ---------------------------------------------------------------------------
// Synthesis Sections
// ---------------------------------------------------------------------------
export const synthesisSectionTypeEnum = pgEnum("synthesis_section_type", ["title_page", "abstract", "introduction", "literature_review", "methodology", "results", "discussion", "conclusion", "references", "appendix", "acknowledgments", "custom"]);
export const sectionStatusEnum = pgEnum("section_status", ["outline", "draft", "revision", "approved", "final"]);

// ---------------------------------------------------------------------------
// Synthesis Versions
// ---------------------------------------------------------------------------
export const savedByEnum = pgEnum("saved_by", ["user", "agent", "auto"]);

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------
export const conversationModeEnum = pgEnum("conversation_mode", ["chat", "learn", "draft", "research", "notebook", "statistics", "integrity", "general"]);

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant", "system", "tool"]);

// ---------------------------------------------------------------------------
// Citation Graph
// ---------------------------------------------------------------------------
export const discoveredViaEnum = pgEnum("discovered_via", ["forward_snowball", "backward_snowball", "semantic_scholar", "openalex", "pubmed"]);

// ---------------------------------------------------------------------------
// Snowball Sessions
// ---------------------------------------------------------------------------
export const snowballDirectionEnum = pgEnum("snowball_direction", ["forward", "backward", "both"]);
export const snowballStatusEnum = pgEnum("snowball_status", ["running", "completed", "failed"]);

// ---------------------------------------------------------------------------
// Slide Decks
// ---------------------------------------------------------------------------
export const sourceTypeEnum = pgEnum("source_type", ["synthesis", "papers", "custom"]);
export const slideLayoutEnum = pgEnum("slide_layout", [
  "title_slide", "title_content", "two_column", "section_header",
  "image_text", "chart_slide", "table_slide", "quote_slide",
  "comparison", "blank",
]);
export const generationStatusEnum = pgEnum("generation_status", [
  "pending", "processing", "completed", "failed",
]);
export const audienceTypeEnum = pgEnum("audience_type", [
  "thesis_defense", "conference", "journal_club", "classroom", "general",
]);

// ---------------------------------------------------------------------------
// Deep Research Sessions
// ---------------------------------------------------------------------------
export const researchStatusEnum = pgEnum("research_status", ["planning", "searching", "reading", "synthesizing", "completed", "failed"]);

// ---------------------------------------------------------------------------
// Deep Research Steps
// ---------------------------------------------------------------------------
export const stepTypeEnum = pgEnum("step_type", ["query_decompose", "search", "filter", "read_abstract", "read_fulltext", "extract", "synthesize", "gap_analysis"]);
export const stepStatusEnum = pgEnum("step_status", ["pending", "running", "completed", "failed"]);

// ---------------------------------------------------------------------------
// Datasets
// ---------------------------------------------------------------------------
export const fileTypeEnum = pgEnum("file_type", ["csv", "xlsx", "xls", "sav", "dta", "json", "tsv"]);

// ---------------------------------------------------------------------------
// Statistical Analyses
// ---------------------------------------------------------------------------
export const analysisStatusEnum = pgEnum("analysis_status", ["running", "completed", "failed", "needs_review"]);

// ---------------------------------------------------------------------------
// Integrity Checks
// ---------------------------------------------------------------------------
export const checkTypeEnum = pgEnum("check_type", ["plagiarism", "ai_detection", "both"]);

// ---------------------------------------------------------------------------
// Document Changes
// ---------------------------------------------------------------------------
export const authorTypeEnum = pgEnum("author_type", ["user", "ai", "collaborator"]);
export const changeTypeEnum = pgEnum("change_type", ["insertion", "deletion", "replacement"]);
export const changeStatusEnum = pgEnum("change_status", ["pending", "accepted", "rejected"]);

// ---------------------------------------------------------------------------
// Document Shares
// ---------------------------------------------------------------------------
export const permissionEnum = pgEnum("permission", ["view", "comment", "edit"]);

// ---------------------------------------------------------------------------
// Learning Modules
// ---------------------------------------------------------------------------
export const difficultyEnum = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);

// ---------------------------------------------------------------------------
// Learning Progress
// ---------------------------------------------------------------------------
export const learningStatusEnum = pgEnum("learning_status", ["not_started", "in_progress", "completed"]);

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "cancelled", "past_due", "trialing"]);

// ---------------------------------------------------------------------------
// PDF Annotations
// ---------------------------------------------------------------------------
export const annotationColorEnum = pgEnum("annotation_color", ["yellow", "green", "red", "blue", "purple"]);

// ---------------------------------------------------------------------------
// Screening Criteria
// ---------------------------------------------------------------------------
export const criterionTypeEnum = pgEnum("criterion_type", ["inclusion", "exclusion"]);

// ---------------------------------------------------------------------------
// Screening Decisions
// ---------------------------------------------------------------------------
export const screeningStageEnum = pgEnum("screening_stage", ["title_abstract", "full_text"]);
export const decidedByEnum = pgEnum("decided_by", ["user", "ai", "collaborator"]);

// ---------------------------------------------------------------------------
// Risk of Bias
// ---------------------------------------------------------------------------
export const riskJudgmentEnum = pgEnum("risk_judgment", ["low", "some_concerns", "high"]);
export const assessedByEnum = pgEnum("assessed_by", ["user", "ai"]);

// ---------------------------------------------------------------------------
// Meta Analysis
// ---------------------------------------------------------------------------
export const effectModelEnum = pgEnum("effect_model", ["fixed", "random"]);

// ---------------------------------------------------------------------------
// Matrix Columns
// ---------------------------------------------------------------------------
export const columnTypeEnum = pgEnum("column_type", ["text", "number", "boolean", "select"]);

// ---------------------------------------------------------------------------
// Matrix Cells
// ---------------------------------------------------------------------------
export const matrixSourceEnum = pgEnum("matrix_source", ["manual", "ai_extracted", "auto"]);

// ---------------------------------------------------------------------------
// Project Milestones
// ---------------------------------------------------------------------------
export const milestoneStatusEnum = pgEnum("milestone_status", ["pending", "in_progress", "completed", "overdue"]);

// ---------------------------------------------------------------------------
// Marketplace Items
// ---------------------------------------------------------------------------
export const itemTypeEnum = pgEnum("item_type", ["template", "workflow", "style_guide"]);

// ---------------------------------------------------------------------------
// Submissions
// ---------------------------------------------------------------------------
export const submissionStatusEnum = pgEnum("submission_status", ["preparing", "submitted", "under_review", "revision_requested", "accepted", "rejected", "withdrawn"]);

// ---------------------------------------------------------------------------
// Review Simulations
// ---------------------------------------------------------------------------
export const recommendationEnum = pgEnum("recommendation", ["accept", "minor_revision", "major_revision", "reject"]);

// ---------------------------------------------------------------------------
// Simulated Comments
// ---------------------------------------------------------------------------
export const severityEnum = pgEnum("severity", ["critical", "major", "minor", "suggestion"]);

// ---------------------------------------------------------------------------
// Audio Summaries
// ---------------------------------------------------------------------------
export const audioStatusEnum = pgEnum("audio_status", ["generating", "completed", "failed"]);

// ---------------------------------------------------------------------------
// Knowledge Links
// ---------------------------------------------------------------------------
export const knowledgeSourceTypeEnum = pgEnum("knowledge_source_type", ["note", "paper", "project"]);
export const linkTypeEnum = pgEnum("link_type", ["note", "paper", "project"]);

// ---------------------------------------------------------------------------
// Sync
// ---------------------------------------------------------------------------
export const syncDirectionEnum = pgEnum("sync_direction", ["import", "export", "bidirectional"]);
export const syncStatusEnum = pgEnum("sync_status", ["running", "completed", "failed"]);

// ---------------------------------------------------------------------------
// Institutions
// ---------------------------------------------------------------------------
export const institutionTypeEnum = pgEnum("institution_type", ["university", "medical_college", "research_institute", "hospital"]);

// ---------------------------------------------------------------------------
// Institution Memberships
// ---------------------------------------------------------------------------
export const membershipRoleEnum = pgEnum("membership_role", ["student", "supervisor", "admin", "faculty"]);
