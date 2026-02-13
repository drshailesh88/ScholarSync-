import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";

import {
  itemTypeEnum,
  submissionStatusEnum,
  recommendationEnum,
  severityEnum,
  audioStatusEnum,
  knowledgeSourceTypeEnum,
  linkTypeEnum,
  syncDirectionEnum,
  syncStatusEnum,
} from "./enums";

import {
  users,
  projects,
  papers,
  synthesisDocuments,
  synthesisSections,
} from "./core";

// ---------------------------------------------------------------------------
// 56. marketplace_items
// ---------------------------------------------------------------------------
export const marketplaceItems = pgTable(
  "marketplace_items",
  {
    id: serial("id").primaryKey(),
    creatorId: text("creator_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemType: itemTypeEnum("item_type"),
    title: text("title").notNull(),
    description: text("description"),
    content: jsonb("content").notNull(),
    isPublished: boolean("is_published").default(false),
    downloadCount: integer("download_count").default(0),
    avgRating: real("avg_rating"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_marketplace_creator").on(table.creatorId),
  ]
);

// ---------------------------------------------------------------------------
// 57. marketplace_reviews
// ---------------------------------------------------------------------------
export const marketplaceReviews = pgTable(
  "marketplace_reviews",
  {
    id: serial("id").primaryKey(),
    itemId: integer("item_id")
      .notNull()
      .references(() => marketplaceItems.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating"),
    reviewText: text("review_text"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("marketplace_reviews_item_user_unique").on(
      table.itemId,
      table.userId
    ),
    index("idx_marketplace_reviews_item").on(table.itemId),
  ]
);

// ---------------------------------------------------------------------------
// 58. journal_profiles
// ---------------------------------------------------------------------------
export const journalProfiles = pgTable("journal_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  publisher: text("publisher"),
  impactFactor: real("impact_factor"),
  wordLimits: jsonb("word_limits"),
  citationStyle: text("citation_style"),
  sectionRequirements: jsonb("section_requirements"),
  submissionUrl: text("submission_url"),
  guidelinesUrl: text("guidelines_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 59. submissions
// ---------------------------------------------------------------------------
export const submissions = pgTable(
  "submissions",
  {
    id: serial("id").primaryKey(),
    documentId: integer("document_id")
      .notNull()
      .references(() => synthesisDocuments.id, { onDelete: "cascade" }),
    journalId: integer("journal_id").references(() => journalProfiles.id, {
      onDelete: "set null",
    }),
    status: submissionStatusEnum("status").default("preparing"),
    submittedAt: timestamp("submitted_at"),
    responseAt: timestamp("response_at"),
    coverLetter: text("cover_letter"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_submissions_document").on(table.documentId),
  ]
);

// ---------------------------------------------------------------------------
// 60. submission_checks
// ---------------------------------------------------------------------------
export const submissionChecks = pgTable("submission_checks", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  checkType: text("check_type"),
  passed: boolean("passed"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 61. review_simulations
// ---------------------------------------------------------------------------
export const reviewSimulations = pgTable(
  "review_simulations",
  {
    id: serial("id").primaryKey(),
    documentId: integer("document_id")
      .notNull()
      .references(() => synthesisDocuments.id, { onDelete: "cascade" }),
    reviewerPersona: text("reviewer_persona"),
    overallRecommendation: recommendationEnum("overall_recommendation"),
    summary: text("summary"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_review_sims_document").on(table.documentId),
  ]
);

// ---------------------------------------------------------------------------
// 62. simulated_comments
// ---------------------------------------------------------------------------
export const simulatedComments = pgTable("simulated_comments", {
  id: serial("id").primaryKey(),
  simulationId: integer("simulation_id")
    .notNull()
    .references(() => reviewSimulations.id, { onDelete: "cascade" }),
  sectionType: text("section_type"),
  severity: severityEnum("severity"),
  category: text("category"),
  commentText: text("comment_text").notNull(),
  userAddressed: boolean("user_addressed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 63. user_profiles_public
// ---------------------------------------------------------------------------
export const userProfilesPublic = pgTable("user_profiles_public", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  headline: text("headline"),
  profileUrlSlug: text("profile_url_slug").unique(),
  education: jsonb("education"),
  researchAreas: jsonb("research_areas"),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 64. publications
// ---------------------------------------------------------------------------
export const publications = pgTable(
  "publications",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    doi: text("doi"),
    journal: text("journal"),
    year: integer("year"),
    citationCount: integer("citation_count").default(0),
    paperId: integer("paper_id").references(() => papers.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_publications_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 65. orcid_links
// ---------------------------------------------------------------------------
export const orcidLinks = pgTable("orcid_links", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  orcidId: text("orcid_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 66. audio_summaries
// ---------------------------------------------------------------------------
export const audioSummaries = pgTable("audio_summaries", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  documentId: integer("document_id").references(
    () => synthesisDocuments.id,
    { onDelete: "set null" }
  ),
  title: text("title"),
  storagePath: text("storage_path"),
  durationSeconds: integer("duration_seconds"),
  status: audioStatusEnum("status").default("generating"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 67. audio_scripts
// ---------------------------------------------------------------------------
export const audioScripts = pgTable("audio_scripts", {
  id: serial("id").primaryKey(),
  summaryId: integer("summary_id")
    .notNull()
    .references(() => audioSummaries.id, { onDelete: "cascade" }),
  scriptText: text("script_text").notNull(),
  speakerAssignments: jsonb("speaker_assignments"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 68. knowledge_notes
// ---------------------------------------------------------------------------
export const knowledgeNotes = pgTable(
  "knowledge_notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title"),
    content: text("content"),
    tags: jsonb("tags").default([]),
    paperId: integer("paper_id").references(() => papers.id, {
      onDelete: "set null",
    }),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_knowledge_notes_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 69. knowledge_links
// ---------------------------------------------------------------------------
export const knowledgeLinks = pgTable(
  "knowledge_links",
  {
    id: serial("id").primaryKey(),
    sourceType: knowledgeSourceTypeEnum("source_type"),
    sourceId: integer("source_id").notNull(),
    targetType: knowledgeSourceTypeEnum("target_type"),
    targetId: integer("target_id").notNull(),
    linkType: linkTypeEnum("link_type"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("knowledge_links_source_target_unique").on(
      table.sourceType,
      table.sourceId,
      table.targetType,
      table.targetId
    ),
  ]
);

// ---------------------------------------------------------------------------
// 70. integrations
// ---------------------------------------------------------------------------
export const integrations = pgTable(
  "integrations",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    isActive: boolean("is_active").default(true),
    lastSyncedAt: timestamp("last_synced_at"),
    settings: jsonb("settings").default({}),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("integrations_user_provider_unique").on(
      table.userId,
      table.provider
    ),
    index("idx_integrations_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 71. sync_log
// ---------------------------------------------------------------------------
export const syncLog = pgTable("sync_log", {
  id: serial("id").primaryKey(),
  integrationId: integer("integration_id")
    .notNull()
    .references(() => integrations.id, { onDelete: "cascade" }),
  direction: syncDirectionEnum("direction"),
  status: syncStatusEnum("status"),
  recordsSynced: integer("records_synced").default(0),
  errorMessage: text("error_message"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});
