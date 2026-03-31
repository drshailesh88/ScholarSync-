import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";

import { projects } from "./core";
import {
  webSourceTypeEnum,
  trustTierEnum,
  webSourceStatusEnum,
  exploreTabEnum,
  domainPreferenceLevelEnum,
  annotationColorEnum,
} from "./enums";

// ============================================================
// 1. web_sources — Non-academic content saved from Explore
//    COMPLETELY SEPARATE from the papers table.
//    Papers table is NOT touched by the Explore module.
// ============================================================
export const webSources = pgTable(
  "web_sources",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id").notNull(),

    // ── Auto-captured metadata (frozen at save time) ──────────
    url: text("url").notNull(),
    domain: text("domain").notNull(),
    title: text("title").notNull(),
    snippet: text("snippet"),
    author: text("author"),
    publish_date: timestamp("publish_date"),
    source_type: webSourceTypeEnum("source_type").default("other"),
    trust_tier: trustTierEnum("trust_tier").default("other"),
    tab_found_on: exploreTabEnum("tab_found_on"),
    search_query: text("search_query"),
    thumbnail_url: text("thumbnail_url"),

    // ── Content snapshot (for highlighting) ────────────────────
    // Clean text extracted via Readability/Firecrawl, frozen at save time.
    // Stored as clean HTML for rendering + highlighting anchor stability.
    content_html: text("content_html"),
    content_plain: text("content_plain"),
    content_extracted: boolean("content_extracted").default(false),

    // ── User-editable fields ──────────────────────────────────
    notes: text("notes"),
    tags: jsonb("tags").default([]).$type<string[]>(),
    status: webSourceStatusEnum("status").default("saved"),

    // ── Extra metadata captured at save time ──────────────────
    metadata: jsonb("metadata").default({}),

    // ── Timestamps ────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    deleted_at: timestamp("deleted_at"),
  },
  (table) => [
    // URL uniqueness per user (one save per URL per user)
    unique("web_sources_user_url_unique").on(table.user_id, table.url),
    // Query patterns
    index("idx_web_sources_user").on(table.user_id),
    index("idx_web_sources_domain").on(table.domain),
    index("idx_web_sources_source_type").on(table.source_type),
    index("idx_web_sources_trust_tier").on(table.trust_tier),
    index("idx_web_sources_status").on(table.status),
    index("idx_web_sources_created").on(table.created_at),
  ]
);

// ============================================================
// 2. web_source_highlights — Highlights on saved web sources
//    Same pattern as pdf_highlights but for web content.
//    Uses character offsets in content_html for anchor stability.
// ============================================================
export const webSourceHighlights = pgTable(
  "web_source_highlights",
  {
    id: serial("id").primaryKey(),
    web_source_id: integer("web_source_id")
      .notNull()
      .references(() => webSources.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),

    // ── Highlight position (character offsets in content_html) ─
    selected_text: text("selected_text").notNull(),
    start_offset: integer("start_offset").notNull(),
    end_offset: integer("end_offset").notNull(),

    // ── Visual ────────────────────────────────────────────────
    color: annotationColorEnum("color").default("yellow"),

    // ── Note on this highlight ────────────────────────────────
    note: text("note"),

    // ── Timestamps ────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_ws_highlights_source").on(table.web_source_id),
    index("idx_ws_highlights_user").on(table.user_id),
  ]
);

// ============================================================
// 3. project_web_sources — Link web sources to projects
//    Same pattern as project_papers.
//    One web source can be in many projects.
//    Each link has its own notes, tags, status.
// ============================================================
export const projectWebSources = pgTable(
  "project_web_sources",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    web_source_id: integer("web_source_id")
      .notNull()
      .references(() => webSources.id, { onDelete: "cascade" }),

    // ── Per-project metadata ──────────────────────────────────
    user_notes: text("user_notes"),
    tags: jsonb("tags").default([]).$type<string[]>(),
    status: webSourceStatusEnum("status").default("saved"),
    added_by: text("added_by").default("search"),

    // ── Timestamps ────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("project_web_sources_unique").on(
      table.project_id,
      table.web_source_id
    ),
    index("idx_pws_project").on(table.project_id),
    index("idx_pws_web_source").on(table.web_source_id),
  ]
);

// ============================================================
// 4. scopes — User-created search profiles (like Kagi Lenses)
//    Max 20 per user. Free for all plans.
//    No soft delete — permanent delete, recreate in 30 seconds.
// ============================================================
export const scopes = pgTable(
  "scopes",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id").notNull(),

    // ── Scope definition ──────────────────────────────────────
    name: text("name").notNull(),
    included_domains: jsonb("included_domains")
      .default([])
      .$type<string[]>(),
    excluded_domains: jsonb("excluded_domains")
      .default([])
      .$type<string[]>(),
    included_keywords: jsonb("included_keywords")
      .default([])
      .$type<string[]>(),
    excluded_keywords: jsonb("excluded_keywords")
      .default([])
      .$type<string[]>(),
    date_from: timestamp("date_from"),
    date_to: timestamp("date_to"),
    region: text("region"),

    // ── Display ───────────────────────────────────────────────
    is_active: boolean("is_active").default(true),
    sort_order: integer("sort_order").default(0),

    // ── Timestamps ────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_scopes_user").on(table.user_id),
  ]
);

// ============================================================
// 5. domain_preferences — Per-user Mute/Lower/Higher/Prefer
//    Neutral is NOT stored (absence = neutral).
//    Max 1000 per user. Free for all plans.
// ============================================================
export const domainPreferences = pgTable(
  "domain_preferences",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id").notNull(),

    // ── Preference ────────────────────────────────────────────
    domain: text("domain").notNull(),
    level: domainPreferenceLevelEnum("level").notNull(),

    // ── Timestamps ────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    // One preference per domain per user
    unique("domain_preferences_user_domain_unique").on(
      table.user_id,
      table.domain
    ),
    index("idx_domain_prefs_user").on(table.user_id),
    index("idx_domain_prefs_level").on(table.level),
  ]
);

// ============================================================
// 6. explore_search_history — Recent searches for convenience
//    Max 100 per user (FIFO). Private, never shared.
//    No soft delete — permanent delete.
// ============================================================
export const exploreSearchHistory = pgTable(
  "explore_search_history",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id").notNull(),

    // ── Search context ────────────────────────────────────────
    query: text("query").notNull(),
    active_tab: exploreTabEnum("active_tab").default("academic"),
    scope_id: integer("scope_id").references(() => scopes.id, {
      onDelete: "set null",
    }),

    // ── Timestamp ─────────────────────────────────────────────
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_explore_history_user").on(table.user_id),
    index("idx_explore_history_created").on(table.created_at),
  ]
);
