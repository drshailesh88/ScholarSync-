import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./core";
import { feedTypeEnum, feedStatusEnum } from "./enums";

// ============================================================
// Feed Sources (shared across all users — one row per unique feed URL)
// ============================================================
export const feedSources = pgTable(
  "feed_sources",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    feedUrl: text("feed_url").unique().notNull(),
    siteUrl: text("site_url"),
    faviconUrl: text("favicon_url"),
    feedType: feedTypeEnum("feed_type").default("rss"),
    status: feedStatusEnum("status").default("active"),
    category: text("category"),
    specialty: text("specialty"),
    publisher: text("publisher"),
    issn: text("issn"),
    lastFetchedAt: timestamp("last_fetched_at"),
    lastSuccessAt: timestamp("last_success_at"),
    lastError: text("last_error"),
    articleCount: integer("article_count").default(0),
    fetchIntervalMinutes: integer("fetch_interval_minutes").default(30),
    consecutiveFailures: integer("consecutive_failures").default(0),
    isCurated: boolean("is_curated").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_feed_sources_category").on(table.category),
    index("idx_feed_sources_status").on(table.status),
    index("idx_feed_sources_specialty").on(table.specialty),
  ]
);

// ============================================================
// User Feed Subscriptions (per-user link to a feed source)
// ============================================================
export const userFeedSubscriptions = pgTable(
  "user_feed_subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    feedSourceId: integer("feed_source_id")
      .notNull()
      .references(() => feedSources.id, { onDelete: "cascade" }),
    folder: text("folder"),
    displayName: text("display_name"),
    isMuted: boolean("is_muted").default(false),
    notifyOnNew: boolean("notify_on_new").default(false),
    addedAt: timestamp("added_at").defaultNow(),
  },
  (table) => [
    unique("uq_user_feed").on(table.userId, table.feedSourceId),
    index("idx_user_feed_subs_user").on(table.userId),
  ]
);

// ============================================================
// Feed Articles (individual items from RSS/Atom feeds)
// ============================================================
export const feedArticles = pgTable(
  "feed_articles",
  {
    id: serial("id").primaryKey(),
    feedSourceId: integer("feed_source_id")
      .notNull()
      .references(() => feedSources.id, { onDelete: "cascade" }),
    guid: text("guid").notNull(),
    title: text("title").notNull(),
    authors: text("authors"),
    abstractSnippet: text("abstract_snippet"),
    link: text("link"),
    doi: text("doi"),
    pubmedId: text("pubmed_id"),
    publishedAt: timestamp("published_at"),
    imageUrl: text("image_url"),
    contentHtml: text("content_html"),
    journal: text("journal"),
    volume: text("volume"),
    issue: text("issue"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("uq_feed_article_guid").on(table.feedSourceId, table.guid),
    index("idx_feed_articles_source").on(table.feedSourceId),
    index("idx_feed_articles_published").on(table.publishedAt),
    index("idx_feed_articles_doi").on(table.doi),
  ]
);

// ============================================================
// User Article Status (per-user read/starred/saved state)
// ============================================================
export const userArticleStatus = pgTable(
  "user_article_status",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    articleId: integer("article_id")
      .notNull()
      .references(() => feedArticles.id, { onDelete: "cascade" }),
    isRead: boolean("is_read").default(false),
    isStarred: boolean("is_starred").default(false),
    isSavedToLibrary: boolean("is_saved_to_library").default(false),
    savedPaperId: integer("saved_paper_id"),
    readAt: timestamp("read_at"),
    starredAt: timestamp("starred_at"),
  },
  (table) => [
    unique("pk_user_article").on(table.userId, table.articleId),
    index("idx_user_article_user").on(table.userId),
    index("idx_user_article_read").on(table.userId, table.isRead),
  ]
);
