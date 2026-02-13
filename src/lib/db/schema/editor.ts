import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  jsonb,
  bigint,
  index,
  unique,
} from "drizzle-orm/pg-core";

import {
  users,
  projects,
  papers,
  synthesisDocuments,
  synthesisSections,
} from "./core";

import {
  sourceTypeEnum,
  slideLayoutEnum,
  generationStatusEnum,
  audienceTypeEnum,
  researchStatusEnum,
  stepTypeEnum,
  stepStatusEnum,
  fileTypeEnum,
  analysisStatusEnum,
  checkTypeEnum,
  authorTypeEnum,
  changeTypeEnum,
  changeStatusEnum,
  permissionEnum,
  difficultyEnum,
  learningStatusEnum,
} from "./enums";

// ---------------------------------------------------------------------------
// 17. slide_decks
// ---------------------------------------------------------------------------
export const slideDecks = pgTable(
  "slide_decks",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    documentId: integer("document_id").references(
      () => synthesisDocuments.id,
      { onDelete: "set null" }
    ),
    title: text("title").notNull(),
    description: text("description"),
    theme: text("theme").default("modern"),
    audienceType: audienceTypeEnum("audience_type").default("general"),
    generationStatus: generationStatusEnum("generation_status"),
    generationPrompt: text("generation_prompt"),
    themeConfig: jsonb("theme_config"),
    slideOrder: jsonb("slide_order").default([]),
    totalSlides: integer("total_slides").default(0),
    sourceType: sourceTypeEnum("source_type"),
    sourcePaperIds: jsonb("source_paper_ids").default([]),
    exportPath: text("export_path"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_slide_decks_project").on(table.projectId),
    index("idx_slide_decks_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 18. slides
// ---------------------------------------------------------------------------
export const slides = pgTable(
  "slides",
  {
    id: serial("id").primaryKey(),
    deckId: integer("deck_id")
      .notNull()
      .references(() => slideDecks.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull(),
    layout: slideLayoutEnum("layout").default("title_content"),
    title: text("title"),
    subtitle: text("subtitle"),
    content: jsonb("content"),
    contentBlocks: jsonb("content_blocks").default([]),
    speakerNotes: text("speaker_notes"),
    sourceSectionId: integer("source_section_id").references(
      () => synthesisSections.id,
      { onDelete: "set null" }
    ),
    sourceCitations: jsonb("source_citations").default([]),
    generatedByAi: boolean("generated_by_ai").default(false),
    hasChart: boolean("has_chart").default(false),
    hasTable: boolean("has_table").default(false),
    hasImage: boolean("has_image").default(false),
    visualData: jsonb("visual_data"),
    createdAt: timestamp("created_at").defaultNow(),
    lastEditedAt: timestamp("last_edited_at").defaultNow(),
  },
  (table) => [index("idx_slides_deck").on(table.deckId)]
);

// ---------------------------------------------------------------------------
// 18a. presentation_coach_evaluations
// ---------------------------------------------------------------------------
export const presentationCoachEvaluations = pgTable(
  "presentation_coach_evaluations",
  {
    id: serial("id").primaryKey(),
    deckId: integer("deck_id")
      .notNull()
      .references(() => slideDecks.id, { onDelete: "cascade" }),
    structureScore: real("structure_score"),
    evidenceScore: real("evidence_score"),
    narrativeScore: real("narrative_score"),
    designScore: real("design_score"),
    audienceFitScore: real("audience_fit_score"),
    overallScore: real("overall_score"),
    slideInsights: jsonb("slide_insights").default([]),
    suggestions: jsonb("suggestions").default([]),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_coach_eval_deck").on(table.deckId)]
);

// ---------------------------------------------------------------------------
// 18b. slide_templates
// ---------------------------------------------------------------------------
export const slideTemplates = pgTable("slide_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  templateData: jsonb("template_data").notNull(),
  isSystem: boolean("is_system").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 19. deep_research_sessions
// ---------------------------------------------------------------------------
export const deepResearchSessions = pgTable(
  "deep_research_sessions",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "cascade",
    }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    originalQuery: text("original_query").notNull(),
    decomposedQueries: jsonb("decomposed_queries"),
    researchPlan: jsonb("research_plan"),
    status: researchStatusEnum("status").default("planning"),
    totalSteps: integer("total_steps").default(0),
    completedSteps: integer("completed_steps").default(0),
    papersFound: integer("papers_found").default(0),
    papersRead: integer("papers_read").default(0),
    finalReport: text("final_report"),
    keyFindings: jsonb("key_findings"),
    gapsIdentified: jsonb("gaps_identified"),
    totalTokensUsed: bigint("total_tokens_used", { mode: "number" }).default(0),
    totalCostUsd: real("total_cost_usd").default(0.0),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => [
    index("idx_deep_research_project").on(table.projectId),
    index("idx_deep_research_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 20. deep_research_steps
// ---------------------------------------------------------------------------
export const deepResearchSteps = pgTable(
  "deep_research_steps",
  {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id")
      .notNull()
      .references(() => deepResearchSessions.id, { onDelete: "cascade" }),
    stepNumber: integer("step_number").notNull(),
    stepType: stepTypeEnum("step_type"),
    inputData: jsonb("input_data"),
    outputData: jsonb("output_data"),
    tokensUsed: integer("tokens_used"),
    status: stepStatusEnum("status").default("pending"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_deep_research_steps_sess").on(table.sessionId)]
);

// ---------------------------------------------------------------------------
// 21. datasets
// ---------------------------------------------------------------------------
export const datasets = pgTable(
  "datasets",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "cascade",
    }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    storagePath: text("storage_path").notNull(),
    fileType: fileTypeEnum("file_type"),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
    detectedColumns: jsonb("detected_columns"),
    rowCount: integer("row_count"),
    columnCount: integer("column_count"),
    missingValues: jsonb("missing_values"),
    dataSummary: jsonb("data_summary"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_datasets_project").on(table.projectId),
    index("idx_datasets_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 22. statistical_analyses
// ---------------------------------------------------------------------------
export const statisticalAnalyses = pgTable(
  "statistical_analyses",
  {
    id: serial("id").primaryKey(),
    datasetId: integer("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    analysisType: text("analysis_type").notNull(),
    variables: jsonb("variables").notNull(),
    parameters: jsonb("parameters"),
    results: jsonb("results"),
    interpretation: text("interpretation"),
    generatedCode: text("generated_code"),
    codeLanguage: text("code_language").default("python"),
    resultsTable: text("results_table"),
    resultsFigure: text("results_figure"),
    plots: jsonb("plots"),
    status: analysisStatusEnum("status").default("completed"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_analyses_dataset").on(table.datasetId),
    index("idx_analyses_project").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 23. integrity_checks
// ---------------------------------------------------------------------------
export const integrityChecks = pgTable(
  "integrity_checks",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    documentId: integer("document_id").references(
      () => synthesisDocuments.id,
      { onDelete: "set null" }
    ),
    sectionId: integer("section_id").references(() => synthesisSections.id, {
      onDelete: "set null",
    }),
    checkType: checkTypeEnum("check_type"),
    contentChecked: text("content_checked").notNull(),
    wordCount: integer("word_count"),
    plagiarismScore: real("plagiarism_score"),
    plagiarismMatches: jsonb("plagiarism_matches"),
    plagiarismEngine: text("plagiarism_engine").default("copyleaks"),
    aiScore: real("ai_score"),
    aiDetectionDetails: jsonb("ai_detection_details"),
    aiDetectionEngine: text("ai_detection_engine").default("copyleaks"),
    flaggedPassages: jsonb("flagged_passages"),
    sourceMatches: jsonb("source_matches"),
    userReviewed: boolean("user_reviewed").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_integrity_project").on(table.projectId),
    index("idx_integrity_document").on(table.documentId),
  ]
);

// ---------------------------------------------------------------------------
// 24. writing_action_log
// ---------------------------------------------------------------------------
export const writingActionLog = pgTable(
  "writing_action_log",
  {
    id: serial("id").primaryKey(),
    sectionId: integer("section_id").references(() => synthesisSections.id, {
      onDelete: "cascade",
    }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    actionType: text("action_type").notNull(),
    originalText: text("original_text"),
    modifiedText: text("modified_text"),
    accepted: boolean("accepted"),
    tokensUsed: integer("tokens_used"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_writing_actions_section").on(table.sectionId),
    index("idx_writing_actions_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 25. writing_analysis_snapshots
// ---------------------------------------------------------------------------
export const writingAnalysisSnapshots = pgTable(
  "writing_analysis_snapshots",
  {
    id: serial("id").primaryKey(),
    sectionId: integer("section_id")
      .notNull()
      .references(() => synthesisSections.id, { onDelete: "cascade" }),
    fleschReadingEase: real("flesch_reading_ease"),
    fleschKincaidGrade: real("flesch_kincaid_grade"),
    gunningFogIndex: real("gunning_fog_index"),
    colemanLiauIndex: real("coleman_liau_index"),
    passiveVoicePct: real("passive_voice_pct"),
    avgSentenceLength: real("avg_sentence_length"),
    vocabularyDiversity: real("vocabulary_diversity"),
    academicJargonPct: real("academic_jargon_pct"),
    objectivityScore: real("objectivity_score"),
    confidenceScore: real("confidence_score"),
    formalityScore: real("formality_score"),
    wordCount: integer("word_count"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_writing_snapshots_section").on(table.sectionId)]
);

// ---------------------------------------------------------------------------
// 26. document_changes
// ---------------------------------------------------------------------------
export const documentChanges = pgTable(
  "document_changes",
  {
    id: serial("id").primaryKey(),
    sectionId: integer("section_id")
      .notNull()
      .references(() => synthesisSections.id, { onDelete: "cascade" }),
    authorType: authorTypeEnum("author_type"),
    authorId: text("author_id"),
    changeType: changeTypeEnum("change_type"),
    originalText: text("original_text"),
    newText: text("new_text"),
    positionStart: integer("position_start"),
    positionEnd: integer("position_end"),
    status: changeStatusEnum("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    resolvedAt: timestamp("resolved_at"),
  },
  (table) => [index("idx_doc_changes_section").on(table.sectionId)]
);

// ---------------------------------------------------------------------------
// 27. templates
// ---------------------------------------------------------------------------
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  projectType: text("project_type"),
  sections: jsonb("sections").notNull(),
  isSystem: boolean("is_system").default(true),
  createdBy: text("created_by").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 28. template_sections
// ---------------------------------------------------------------------------
export const templateSections = pgTable("template_sections", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id")
    .notNull()
    .references(() => templates.id, { onDelete: "cascade" }),
  sectionType: text("section_type").notNull(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order"),
  suggestedWordCount: integer("suggested_word_count"),
  guidance: text("guidance"),
  exampleContent: text("example_content"),
  isRequired: boolean("is_required").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 29. user_references
// ---------------------------------------------------------------------------
export const userReferences = pgTable(
  "user_references",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    paperId: integer("paper_id").references(() => papers.id, {
      onDelete: "set null",
    }),
    collection: text("collection").default("All Papers"),
    isFavorite: boolean("is_favorite").default(false),
    tags: jsonb("tags").default([]),
    notes: text("notes"),
    manualCitationData: jsonb("manual_citation_data"),
    createdAt: timestamp("created_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("idx_user_refs_user").on(table.userId),
    index("idx_user_refs_paper").on(table.paperId),
  ]
);

// ---------------------------------------------------------------------------
// 30. document_comments
// ---------------------------------------------------------------------------
export const documentComments = pgTable(
  "document_comments",
  {
    id: serial("id").primaryKey(),
    sectionId: integer("section_id")
      .notNull()
      .references(() => synthesisSections.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    authorType: authorTypeEnum("author_type"),
    textRangeStart: integer("text_range_start"),
    textRangeEnd: integer("text_range_end"),
    content: text("content").notNull(),
    parentCommentId: integer("parent_comment_id").references(
      (): any => documentComments.id,
      { onDelete: "cascade" }
    ),
    isResolved: boolean("is_resolved").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_doc_comments_section").on(table.sectionId)]
);

// ---------------------------------------------------------------------------
// 31. document_shares
// ---------------------------------------------------------------------------
export const documentShares = pgTable(
  "document_shares",
  {
    id: serial("id").primaryKey(),
    documentId: integer("document_id")
      .notNull()
      .references(() => synthesisDocuments.id, { onDelete: "cascade" }),
    sharedWithEmail: text("shared_with_email"),
    sharedWithUserId: text("shared_with_user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    permission: permissionEnum("permission"),
    shareToken: text("share_token").unique(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_doc_shares_document").on(table.documentId)]
);

// ---------------------------------------------------------------------------
// 32. activity_log
// ---------------------------------------------------------------------------
export const activityLog = pgTable(
  "activity_log",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    details: jsonb("details"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_activity_log_user").on(table.userId),
    index("idx_activity_log_project").on(table.projectId),
    index("idx_activity_log_created").on(table.createdAt),
  ]
);

// ---------------------------------------------------------------------------
// 33. discipline_profiles
// ---------------------------------------------------------------------------
export const disciplineProfiles = pgTable("discipline_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  systemPromptAdditions: text("system_prompt_additions"),
  keyJournals: jsonb("key_journals"),
  keyGuidelines: jsonb("key_guidelines"),
  terminology: jsonb("terminology"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 34. export_templates
// ---------------------------------------------------------------------------
export const exportTemplates = pgTable("export_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  journalName: text("journal_name"),
  formattingRules: jsonb("formatting_rules"),
  citationStyle: text("citation_style"),
  wordLimits: jsonb("word_limits"),
  sectionRequirements: jsonb("section_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 35. learning_modules
// ---------------------------------------------------------------------------
export const learningModules = pgTable("learning_modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category"),
  difficulty: difficultyEnum("difficulty"),
  content: text("content"),
  prerequisites: jsonb("prerequisites").default([]),
  estimatedMinutes: integer("estimated_minutes"),
  triggerMode: text("trigger_mode"),
  triggerAction: text("trigger_action"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 36. user_learning_progress
// ---------------------------------------------------------------------------
export const userLearningProgress = pgTable(
  "user_learning_progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    moduleId: integer("module_id")
      .notNull()
      .references(() => learningModules.id, { onDelete: "cascade" }),
    status: learningStatusEnum("status").default("not_started"),
    score: real("score"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
  },
  (table) => [
    unique("user_learning_progress_user_module_unique").on(
      table.userId,
      table.moduleId
    ),
  ]
);
