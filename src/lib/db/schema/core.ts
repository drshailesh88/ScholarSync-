import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  date,
  jsonb,
  uniqueIndex,
  index,
  bigint,
  unique,
} from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";

// Custom vector type for pgvector embeddings
const vector = customType<{ data: number[]; dpiName: string }>({
  dataType() {
    return "vector(1536)";
  },
});

// Import enums from ./enums
import {
  degreeLevelEnum,
  planEnum,
  projectTypeEnum,
  projectStatusEnum,
  paperSourceEnum,
  projectPaperStatusEnum,
  addedByEnum,
  sectionTypeEnum,
  queryTypeEnum,
  searchSourceEnum,
  documentTypeEnum,
  documentStatusEnum,
  synthesisSectionTypeEnum,
  sectionStatusEnum,
  savedByEnum,
  conversationModeEnum,
  messageRoleEnum,
  discoveredViaEnum,
  snowballDirectionEnum,
  snowballStatusEnum,
  screeningDecisionEnum,
} from "./enums";

// ============================================================
// 1. users (id = Clerk TEXT, not SERIAL)
// ============================================================
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),
  degree_level: degreeLevelEnum("degree_level"),
  specialty: text("specialty"),
  country: text("country").default("India"),
  bio: text("bio"),
  research_interests: jsonb("research_interests").default([]),
  plan: planEnum("plan").default("free"),
  subscription_id: integer("subscription_id"),
  tokens_used_this_month: integer("tokens_used_this_month").default(0),
  tokens_limit: integer("tokens_limit").default(10000),
  tokens_used_total: bigint("tokens_used_total", { mode: "number" }).default(0),
  searches_used_this_month: integer("searches_used_this_month").default(0),
  plagiarism_checks_used: integer("plagiarism_checks_used").default(0),
  exports_used_this_month: integer("exports_used_this_month").default(0),
  deep_research_used: integer("deep_research_used").default(0),
  usage_reset_date: timestamp("usage_reset_date"),
  preferred_language: text("preferred_language").default("en"),
  orcid_id: text("orcid_id"),
  institution_id: integer("institution_id"),
  onboarding_completed: boolean("onboarding_completed").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  last_active_at: timestamp("last_active_at"),
  deleted_at: timestamp("deleted_at"),
});

// ============================================================
// 2. projects
// ============================================================
export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    research_question: text("research_question"),
    project_type: projectTypeEnum("project_type"),
    study_type: text("study_type"),
    field: text("field"),
    template_id: integer("template_id"),
    target_journal: text("target_journal"),
    citation_style: text("citation_style").default("vancouver"),
    target_word_count: integer("target_word_count"),
    deadline: date("deadline"),
    status: projectStatusEnum("status").default("drafting"),
    modes_used: jsonb("modes_used").default([]),
    is_public: boolean("is_public").default(false),
    supervisor_id: text("supervisor_id"),
    institution_id: integer("institution_id"),
    metadata: jsonb("metadata").default({}),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    deleted_at: timestamp("deleted_at"),
  },
  (table) => [
    index("idx_projects_user").on(table.user_id),
    index("idx_projects_status").on(table.status),
  ]
);

// ============================================================
// 3. papers
// ============================================================
export const papers = pgTable(
  "papers",
  {
    id: serial("id").primaryKey(),
    pubmed_id: text("pubmed_id").unique(),
    doi: text("doi").unique(),
    semantic_scholar_id: text("semantic_scholar_id").unique(),
    arxiv_id: text("arxiv_id"),
    openalex_id: text("openalex_id"),
    title: text("title").notNull(),
    authors: jsonb("authors"),
    abstract: text("abstract"),
    journal: text("journal"),
    publication_date: date("publication_date"),
    year: integer("year"),
    volume: text("volume"),
    issue: text("issue"),
    pages: text("pages"),
    study_type: text("study_type"),
    citation_count: integer("citation_count").default(0),
    source: paperSourceEnum("source").notNull(),
    full_text_available: boolean("full_text_available").default(false),
    pdf_url: text("pdf_url"),
    pdf_storage_path: text("pdf_storage_path"),
    full_text_plain: text("full_text_plain"),
    is_chunked: boolean("is_chunked").default(false),
    is_extracted: boolean("is_extracted").default(false),
    language: text("language").default("en"),
    tldr: text("tldr"),
    retracted: boolean("retracted").default(false),
    open_access: boolean("open_access"),
    metadata: jsonb("metadata").default({}),
    mesh_terms: jsonb("mesh_terms").default([]),
    publication_types: jsonb("publication_types").default([]),
    fields_of_study: jsonb("fields_of_study").default([]),
    evidence_level: text("evidence_level"),
    open_access_url: text("open_access_url"),
    influential_citation_count: integer("influential_citation_count").default(0),
    reference_count: integer("reference_count").default(0),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_papers_source").on(table.source),
    index("idx_papers_doi").on(table.doi),
    index("idx_papers_pubmed_id").on(table.pubmed_id),
    index("idx_papers_s2_id").on(table.semantic_scholar_id),
    index("idx_papers_year").on(table.year),
  ]
);

// ============================================================
// 4. project_papers
// ============================================================
export const projectPapers = pgTable(
  "project_papers",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    relevance_score: real("relevance_score"),
    user_rating: integer("user_rating"),
    user_notes: text("user_notes"),
    tags: jsonb("tags").default([]),
    status: projectPaperStatusEnum("status").default("saved"),
    added_by: addedByEnum("added_by").default("search"),
    is_approved: boolean("is_approved").default(true),
    screening_decision: screeningDecisionEnum("screening_decision"),
    screening_reason: text("screening_reason"),
    full_text_reviewed: boolean("full_text_reviewed").default(false),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("project_papers_project_id_paper_id_unique").on(
      table.project_id,
      table.paper_id
    ),
    index("idx_project_papers_project").on(table.project_id),
    index("idx_project_papers_paper").on(table.paper_id),
    index("idx_project_papers_status").on(table.status),
  ]
);

// ============================================================
// 5. paper_chunks (RAG foundation)
// ============================================================
export const paperChunks = pgTable(
  "paper_chunks",
  {
    id: serial("id").primaryKey(),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    chunk_index: integer("chunk_index").notNull(),
    text: text("text").notNull(),
    section_type: sectionTypeEnum("section_type"),
    page_number: integer("page_number"),
    embedding: vector("embedding"),
    highlight_priority: real("highlight_priority").default(0.0),
    metadata: jsonb("metadata").default({}),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_paper_chunks_paper").on(table.paper_id),
    index("idx_paper_chunks_section").on(table.section_type),
  ]
);

// ============================================================
// 6. search_queries
// ============================================================
export const searchQueries = pgTable(
  "search_queries",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").references(() => projects.id, {
      onDelete: "cascade",
    }),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    original_query: text("original_query").notNull(),
    query_type: queryTypeEnum("query_type").default("user"),
    source: searchSourceEnum("source"),
    augmented_queries: jsonb("augmented_queries"),
    filters_applied: jsonb("filters_applied"),
    result_count: integer("result_count"),
    parent_query_id: integer("parent_query_id").references(
      (): AnyPgColumn => searchQueries.id
    ),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_search_queries_project").on(table.project_id),
    index("idx_search_queries_user").on(table.user_id),
  ]
);

// ============================================================
// 7. paper_extractions (PICO + structured data)
// ============================================================
export const paperExtractions = pgTable(
  "paper_extractions",
  {
    id: serial("id").primaryKey(),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    project_id: integer("project_id").references(() => projects.id, {
      onDelete: "cascade",
    }),
    population: text("population"),
    intervention: text("intervention"),
    comparison: text("comparison"),
    outcome: text("outcome"),
    sample_size: integer("sample_size"),
    study_design: text("study_design"),
    effect_size: text("effect_size"),
    p_value: text("p_value"),
    confidence_interval: text("confidence_interval"),
    risk_of_bias: text("risk_of_bias"),
    evidence_level: text("evidence_level"),
    custom_extractions: jsonb("custom_extractions").default({}),
    extraction_model: text("extraction_model"),
    confidence_score: real("confidence_score"),
    human_verified: boolean("human_verified").default(false),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_paper_extractions_paper").on(table.paper_id),
    index("idx_paper_extractions_project").on(table.project_id),
  ]
);

// ============================================================
// 8. synthesis_documents
// ============================================================
export const synthesisDocuments = pgTable(
  "synthesis_documents",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    document_type: documentTypeEnum("document_type").default("original_article"),
    citation_style: text("citation_style").default("vancouver"),
    target_journal: text("target_journal"),
    word_limit: integer("word_limit"),
    template_id: integer("template_id"),
    language: text("language").default("en"),
    overall_status: documentStatusEnum("overall_status").default("drafting"),
    submission_status: text("submission_status"),
    last_export_at: timestamp("last_export_at"),
    latex_export_path: text("latex_export_path"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    deleted_at: timestamp("deleted_at"),
  },
  (table) => [
    index("idx_synthesis_docs_project").on(table.project_id),
  ]
);

// ============================================================
// 9. synthesis_sections
// ============================================================
export const synthesisSections = pgTable(
  "synthesis_sections",
  {
    id: serial("id").primaryKey(),
    document_id: integer("document_id")
      .notNull()
      .references(() => synthesisDocuments.id, { onDelete: "cascade" }),
    section_type: synthesisSectionTypeEnum("section_type"),
    title: text("title"),
    sort_order: integer("sort_order"),
    editor_content: jsonb("editor_content"),
    plain_text_content: text("plain_text_content"),
    word_count: integer("word_count").default(0),
    target_word_count: integer("target_word_count"),
    status: sectionStatusEnum("status").default("outline"),
    ai_draft: text("ai_draft"),
    human_edits: text("human_edits"),
    readability_score: real("readability_score"),
    ai_tone_score: real("ai_tone_score"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_synthesis_sections_doc").on(table.document_id),
  ]
);

// ============================================================
// 10. synthesis_citations
// ============================================================
export const synthesisCitations = pgTable(
  "synthesis_citations",
  {
    id: serial("id").primaryKey(),
    section_id: integer("section_id")
      .notNull()
      .references(() => synthesisSections.id, { onDelete: "cascade" }),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    citation_key: text("citation_key"),
    page_reference: text("page_reference"),
    claim_text: text("claim_text"),
    paragraph_index: integer("paragraph_index"),
    position_in_section: integer("position_in_section"),
    formatted: jsonb("formatted"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("synthesis_citations_section_id_paper_id_paragraph_index_unique").on(
      table.section_id,
      table.paper_id,
      table.paragraph_index
    ),
    index("idx_synthesis_citations_section").on(table.section_id),
    index("idx_synthesis_citations_paper").on(table.paper_id),
  ]
);

// ============================================================
// 11. synthesis_versions
// ============================================================
export const synthesisVersions = pgTable(
  "synthesis_versions",
  {
    id: serial("id").primaryKey(),
    document_id: integer("document_id")
      .notNull()
      .references(() => synthesisDocuments.id, { onDelete: "cascade" }),
    section_id: integer("section_id").references(() => synthesisSections.id, {
      onDelete: "cascade",
    }),
    version_number: integer("version_number").notNull(),
    version_name: text("version_name"),
    content_snapshot: jsonb("content_snapshot").notNull(),
    change_summary: text("change_summary"),
    auto_saved: boolean("auto_saved").default(true),
    saved_by: savedByEnum("saved_by").default("user"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_synthesis_versions_doc").on(table.document_id),
  ]
);

// ============================================================
// 12. conversations
// ============================================================
export const conversations = pgTable(
  "conversations",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").references(() => projects.id, {
      onDelete: "cascade",
    }),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mode: conversationModeEnum("mode").notNull(),
    title: text("title"),
    paper_ids: jsonb("paper_ids").default([]),
    dataset_id: integer("dataset_id"),
    is_archived: boolean("is_archived").default(false),
    pinned: boolean("pinned").default(false),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_conversations_project").on(table.project_id),
    index("idx_conversations_user").on(table.user_id),
    index("idx_conversations_mode").on(table.mode),
  ]
);

// ============================================================
// 13. messages
// ============================================================
export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    conversation_id: integer("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    role: messageRoleEnum("role").notNull(),
    content: text("content").notNull(),
    tool_calls: jsonb("tool_calls"),
    tool_results: jsonb("tool_results"),
    input_tokens: integer("input_tokens"),
    output_tokens: integer("output_tokens"),
    cached_tokens: integer("cached_tokens").default(0),
    tokens_used: integer("tokens_used"),
    cost_usd: real("cost_usd"),
    model: text("model"),
    retrieved_chunks: jsonb("retrieved_chunks"),
    feedback_rating: integer("feedback_rating"),
    feedback_comment: text("feedback_comment"),
    flagged_inaccurate: boolean("flagged_inaccurate").default(false),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_messages_conversation").on(table.conversation_id),
  ]
);

// ============================================================
// 14. project_context_cache
// ============================================================
export const projectContextCache = pgTable("project_context_cache", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  cache_type: text("cache_type"),
  system_prompt: text("system_prompt"),
  project_summary: text("project_summary"),
  paper_summaries: text("paper_summaries"),
  methodology_context: text("methodology_context"),
  mode_context: jsonb("mode_context"),
  compiled_content: text("compiled_content"),
  token_count: integer("token_count"),
  needs_recompile: boolean("needs_recompile").default(true),
  last_compiled_at: timestamp("last_compiled_at"),
  created_at: timestamp("created_at").defaultNow(),
});

// ============================================================
// 15. citation_graph
// ============================================================
export const citationGraph = pgTable(
  "citation_graph",
  {
    id: serial("id").primaryKey(),
    citing_paper_id: integer("citing_paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    cited_paper_id: integer("cited_paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    discovered_via: discoveredViaEnum("discovered_via"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("citation_graph_citing_paper_id_cited_paper_id_unique").on(
      table.citing_paper_id,
      table.cited_paper_id
    ),
    index("idx_citation_graph_citing").on(table.citing_paper_id),
    index("idx_citation_graph_cited").on(table.cited_paper_id),
  ]
);

// ============================================================
// 16. snowball_sessions
// ============================================================
export const snowballSessions = pgTable("snowball_sessions", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  seed_paper_id: integer("seed_paper_id")
    .notNull()
    .references(() => papers.id),
  direction: snowballDirectionEnum("direction"),
  depth: integer("depth").default(1),
  papers_found: integer("papers_found").default(0),
  status: snowballStatusEnum("status").default("running"),
  started_at: timestamp("started_at").defaultNow(),
  completed_at: timestamp("completed_at"),
});
