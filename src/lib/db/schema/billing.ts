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
  planEnum,
  subscriptionStatusEnum,
  annotationColorEnum,
} from "./enums";

import { users } from "./core";
import { projects } from "./core";
import { papers } from "./core";
import { messages } from "./core";

// ---------------------------------------------------------------------------
// 37. usage_events
// ---------------------------------------------------------------------------
export const usageEvents = pgTable(
  "usage_events",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(),
    tokensUsed: integer("tokens_used"),
    costUsd: real("cost_usd"),
    model: text("model"),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_usage_events_user").on(table.userId),
    index("idx_usage_events_created").on(table.createdAt),
  ]
);

// ---------------------------------------------------------------------------
// 38. subscriptions
// ---------------------------------------------------------------------------
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: planEnum("plan"),
  razorpaySubscriptionId: text("razorpay_subscription_id"),
  razorpayCustomerId: text("razorpay_customer_id"),
  status: subscriptionStatusEnum("status").default("active"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 39. feedback
// ---------------------------------------------------------------------------
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  messageId: integer("message_id").references(() => messages.id, {
    onDelete: "set null",
  }),
  feature: text("feature"),
  rating: integer("rating"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 40. prompt_versions
// ---------------------------------------------------------------------------
export const promptVersions = pgTable(
  "prompt_versions",
  {
    id: serial("id").primaryKey(),
    promptName: text("prompt_name").notNull(),
    versionNumber: integer("version_number").notNull(),
    systemPrompt: text("system_prompt").notNull(),
    description: text("description"),
    avgFeedbackRating: real("avg_feedback_rating"),
    totalUses: integer("total_uses").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("prompt_versions_prompt_name_version_number_unique").on(
      table.promptName,
      table.versionNumber
    ),
  ]
);

// ---------------------------------------------------------------------------
// 41. pdf_annotations
// ---------------------------------------------------------------------------
export const pdfAnnotations = pgTable(
  "pdf_annotations",
  {
    id: serial("id").primaryKey(),
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pageNumber: integer("page_number"),
    highlightText: text("highlight_text"),
    note: text("note"),
    color: annotationColorEnum("color").default("yellow"),
    position: jsonb("position"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_pdf_annotations_paper").on(table.paperId),
    index("idx_pdf_annotations_user").on(table.userId),
  ]
);

// ---------------------------------------------------------------------------
// 52. usage_quotas
// ---------------------------------------------------------------------------
export const usageQuotas = pgTable("usage_quotas", {
  id: serial("id").primaryKey(),
  plan: planEnum("plan").notNull().unique(),
  aiTokensMonthly: integer("ai_tokens_monthly").notNull(),
  paperSearchesMonthly: integer("paper_searches_monthly"),
  plagiarismChecksMonthly: integer("plagiarism_checks_monthly"),
  exportsMonthly: integer("exports_monthly"),
  deepResearchMonthly: integer("deep_research_monthly"),
  maxProjects: integer("max_projects"),
  maxPapersPerProject: integer("max_papers_per_project"),
  maxFileUploadMb: integer("max_file_upload_mb"),
  createdAt: timestamp("created_at").defaultNow(),
});
