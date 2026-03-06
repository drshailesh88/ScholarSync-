/**
 * RALPH Journal Feed — Sprint 1: Schema & Types Validation
 *
 * Validates that all Drizzle schema tables, enums, relations, and TypeScript
 * types are correctly defined before any business logic is written.
 */
import { describe, it, expect } from "vitest";

// ── Schema imports ──────────────────────────────────────────────────
import {
  feedSources,
  userFeedSubscriptions,
  feedArticles,
  userArticleStatus,
} from "@/lib/db/schema/feeds";

import {
  feedTypeEnum,
  feedStatusEnum,
  paperSourceEnum,
} from "@/lib/db/schema/enums";

// ── Type imports (compile-time validation) ──────────────────────────
import type {
  FeedSource,
  FeedArticle,
  FeedSubscription,
  FeedArticleWithStatus,
  JournalDirectoryEntry,
} from "@/types/feed";

// ── Relation imports ────────────────────────────────────────────────
import {
  feedSourcesRelations,
  userFeedSubscriptionsRelations,
  feedArticlesRelations,
  userArticleStatusRelations,
} from "@/lib/db/schema/relations";

// ── Barrel export check ─────────────────────────────────────────────
import * as schema from "@/lib/db/schema";

// =====================================================================
// JF-001: feedSources table has all required columns
// =====================================================================
describe("JF-001: feedSources table columns", () => {
  it("has all expected columns", () => {
    const columns = Object.keys(feedSources);
    const required = [
      "id", "title", "feedUrl", "siteUrl", "faviconUrl",
      "feedType", "status", "category", "specialty", "publisher",
      "issn", "lastFetchedAt", "lastSuccessAt", "lastError",
      "articleCount", "fetchIntervalMinutes", "consecutiveFailures",
      "isCurated", "description", "createdAt", "updatedAt",
    ];
    for (const col of required) {
      expect(columns, `Missing column: ${col}`).toContain(col);
    }
  });
});

// =====================================================================
// JF-002: userFeedSubscriptions unique constraint
// =====================================================================
describe("JF-002: userFeedSubscriptions structure", () => {
  it("has all expected columns", () => {
    const columns = Object.keys(userFeedSubscriptions);
    const required = [
      "id", "userId", "feedSourceId", "folder",
      "displayName", "isMuted", "notifyOnNew", "addedAt",
    ];
    for (const col of required) {
      expect(columns, `Missing column: ${col}`).toContain(col);
    }
  });
});

// =====================================================================
// JF-003: feedArticles unique constraint
// =====================================================================
describe("JF-003: feedArticles structure", () => {
  it("has all expected columns", () => {
    const columns = Object.keys(feedArticles);
    const required = [
      "id", "feedSourceId", "guid", "title", "authors",
      "abstractSnippet", "link", "doi", "pubmedId", "publishedAt",
      "imageUrl", "contentHtml", "journal", "volume", "issue", "createdAt",
    ];
    for (const col of required) {
      expect(columns, `Missing column: ${col}`).toContain(col);
    }
  });
});

// =====================================================================
// JF-004: userArticleStatus composite key
// =====================================================================
describe("JF-004: userArticleStatus structure", () => {
  it("has all expected columns", () => {
    const columns = Object.keys(userArticleStatus);
    const required = [
      "userId", "articleId", "isRead", "isStarred",
      "isSavedToLibrary", "savedPaperId", "readAt", "starredAt",
    ];
    for (const col of required) {
      expect(columns, `Missing column: ${col}`).toContain(col);
    }
  });

  it("does NOT have an auto-increment id column", () => {
    const columns = Object.keys(userArticleStatus);
    // userArticleStatus uses composite key, not serial id
    expect(columns).not.toContain("id");
  });
});

// =====================================================================
// JF-005: feedTypeEnum values
// =====================================================================
describe("JF-005: feedTypeEnum", () => {
  it("contains exactly the expected values", () => {
    expect(feedTypeEnum.enumValues).toEqual([
      "rss", "atom", "json_feed", "pubmed_search",
    ]);
  });
});

// =====================================================================
// JF-006: feedStatusEnum values
// =====================================================================
describe("JF-006: feedStatusEnum", () => {
  it("contains exactly the expected values", () => {
    expect(feedStatusEnum.enumValues).toEqual([
      "active", "paused", "error", "dead",
    ]);
  });
});

// =====================================================================
// JF-007: paperSourceEnum includes "feed"
// =====================================================================
describe("JF-007: paperSourceEnum updated", () => {
  it("includes 'feed' as a valid source", () => {
    expect(paperSourceEnum.enumValues).toContain("feed");
  });

  it("still includes all original values", () => {
    const originals = [
      "pubmed", "semantic_scholar", "openalex", "arxiv",
      "user_upload", "snowball", "deep_research",
    ];
    for (const val of originals) {
      expect(paperSourceEnum.enumValues).toContain(val);
    }
  });
});

// =====================================================================
// JF-008: Relations are exported and defined
// =====================================================================
describe("JF-008: Feed relations exist", () => {
  it("feedSourcesRelations is defined", () => {
    expect(feedSourcesRelations).toBeDefined();
  });

  it("userFeedSubscriptionsRelations is defined", () => {
    expect(userFeedSubscriptionsRelations).toBeDefined();
  });

  it("feedArticlesRelations is defined", () => {
    expect(feedArticlesRelations).toBeDefined();
  });

  it("userArticleStatusRelations is defined", () => {
    expect(userArticleStatusRelations).toBeDefined();
  });
});

// =====================================================================
// JF-009: Barrel exports include all feed tables
// =====================================================================
describe("JF-009: Barrel exports from schema/index.ts", () => {
  it("exports feedSources", () => {
    expect(schema.feedSources).toBeDefined();
  });

  it("exports userFeedSubscriptions", () => {
    expect(schema.userFeedSubscriptions).toBeDefined();
  });

  it("exports feedArticles", () => {
    expect(schema.feedArticles).toBeDefined();
  });

  it("exports userArticleStatus", () => {
    expect(schema.userArticleStatus).toBeDefined();
  });

  it("exports feedTypeEnum", () => {
    expect(schema.feedTypeEnum).toBeDefined();
  });

  it("exports feedStatusEnum", () => {
    expect(schema.feedStatusEnum).toBeDefined();
  });
});

// =====================================================================
// JF-010: TypeScript types compile correctly
// =====================================================================
describe("JF-010: TypeScript types are well-formed", () => {
  it("FeedSource type has required fields", () => {
    // This test validates at compile time — if types are wrong, tsc --noEmit fails.
    // At runtime we just verify the type can be used.
    const mock: FeedSource = {
      id: 1,
      title: "NEJM",
      description: null,
      feedUrl: "https://www.nejm.org/rss",
      siteUrl: "https://www.nejm.org",
      faviconUrl: null,
      feedType: "rss",
      status: "active",
      category: "General Medicine",
      specialty: "general_medicine",
      publisher: "MMS",
      issn: "0028-4793",
      isCurated: true,
      articleCount: 50,
      lastFetchedAt: new Date(),
      lastSuccessAt: new Date(),
      consecutiveFailures: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(mock.id).toBe(1);
    expect(mock.feedType).toBe("rss");
    expect(mock.status).toBe("active");
  });

  it("FeedArticle type has required fields", () => {
    const mock: FeedArticle = {
      id: 1,
      feedSourceId: 1,
      guid: "article-123",
      title: "Test Article",
      authors: "Smith J, Jones K",
      abstractSnippet: "This is a test...",
      link: "https://example.com/article",
      doi: "10.1000/test",
      pubmedId: "12345678",
      publishedAt: new Date(),
      imageUrl: null,
      contentHtml: null,
      journal: "NEJM",
      volume: "390",
      issue: "1",
      createdAt: new Date(),
    };
    expect(mock.guid).toBe("article-123");
  });

  it("FeedSubscription type includes feedSource and unreadCount", () => {
    const mock: FeedSubscription = {
      id: 1,
      feedSourceId: 1,
      folder: "Cardiology",
      displayName: null,
      isMuted: false,
      notifyOnNew: true,
      addedAt: new Date(),
      feedSource: {
        id: 1,
        title: "NEJM",
        description: null,
        feedUrl: "https://www.nejm.org/rss",
        siteUrl: "https://www.nejm.org",
        faviconUrl: null,
        feedType: "rss",
        status: "active",
        category: "General Medicine",
        specialty: "general_medicine",
        publisher: "MMS",
        issn: null,
        isCurated: true,
        articleCount: 50,
        lastFetchedAt: null,
        lastSuccessAt: null,
        consecutiveFailures: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      unreadCount: 12,
    };
    expect(mock.unreadCount).toBe(12);
    expect(mock.feedSource.title).toBe("NEJM");
  });

  it("FeedArticleWithStatus extends FeedArticle with status fields", () => {
    const mock: FeedArticleWithStatus = {
      id: 1,
      feedSourceId: 1,
      guid: "article-123",
      title: "Test",
      authors: null,
      abstractSnippet: null,
      link: null,
      doi: null,
      pubmedId: null,
      publishedAt: null,
      imageUrl: null,
      contentHtml: null,
      journal: null,
      volume: null,
      issue: null,
      createdAt: new Date(),
      isRead: false,
      isStarred: true,
      isSavedToLibrary: false,
      savedPaperId: null,
      feedSourceTitle: "NEJM",
      feedSourceFaviconUrl: null,
    };
    expect(mock.isRead).toBe(false);
    expect(mock.isStarred).toBe(true);
    expect(mock.feedSourceTitle).toBe("NEJM");
  });

  it("JournalDirectoryEntry type has required fields", () => {
    const mock: JournalDirectoryEntry = {
      title: "NEJM",
      feedUrl: "https://www.nejm.org/rss",
      siteUrl: "https://www.nejm.org",
      publisher: "MMS",
      category: "General Medicine",
      specialty: "general_medicine",
    };
    expect(mock.title).toBe("NEJM");

    // Optional fields should compile fine
    const withOptional: JournalDirectoryEntry = {
      ...mock,
      issn: "0028-4793",
      description: "Weekly medical journal",
    };
    expect(withOptional.issn).toBe("0028-4793");
  });
});

// =====================================================================
// JF-011: feedType enum literal types match between Drizzle and TS
// =====================================================================
describe("JF-011: Enum values match TypeScript union types", () => {
  it("feedTypeEnum values match FeedSource.feedType union", () => {
    const drizzleValues = feedTypeEnum.enumValues;
    const tsValues: FeedSource["feedType"][] = ["rss", "atom", "json_feed", "pubmed_search"];
    expect(drizzleValues).toEqual(tsValues);
  });

  it("feedStatusEnum values match FeedSource.status union", () => {
    const drizzleValues = feedStatusEnum.enumValues;
    const tsValues: FeedSource["status"][] = ["active", "paused", "error", "dead"];
    expect(drizzleValues).toEqual(tsValues);
  });
});
