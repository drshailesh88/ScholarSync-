/**
 * RALPH Journal Feed — Sprint 4: Journal Directory Data Validation
 *
 * Validates the curated journal feed directory for data integrity,
 * uniqueness, and compatibility with the onboarding specialty values.
 */
import { describe, it, expect } from "vitest";
import { JOURNAL_FEEDS, FEED_CATEGORIES, FEED_SPECIALTIES } from "@/data/journal-feeds";
import type { JournalDirectoryEntry } from "@/types/feed";

// The exact specialty values from the onboarding page
const VALID_SPECIALTIES = [
  "Internal Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology",
  "Orthopedics", "Radiology", "Pathology", "Pharmacology", "Microbiology",
  "Anatomy", "Physiology", "Biochemistry", "Community Medicine",
  "Forensic Medicine", "Dermatology", "Psychiatry", "Ophthalmology",
  "ENT", "Anesthesiology", "Emergency Medicine", "Other",
];

// =====================================================================
// JF-080: Array has >= 50 entries
// =====================================================================
describe("JF-080: Journal feed count", () => {
  it("has at least 50 curated journal feeds", () => {
    expect(JOURNAL_FEEDS.length).toBeGreaterThanOrEqual(50);
  });
});

// =====================================================================
// JF-081: Required fields present
// =====================================================================
describe("JF-081: Required fields on every entry", () => {
  it("every entry has title, feedUrl, siteUrl, publisher, category, specialty", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(feed.title, `Missing title on entry`).toBeTruthy();
      expect(feed.feedUrl, `Missing feedUrl on: ${feed.title}`).toBeTruthy();
      expect(feed.siteUrl, `Missing siteUrl on: ${feed.title}`).toBeTruthy();
      expect(feed.publisher, `Missing publisher on: ${feed.title}`).toBeTruthy();
      expect(feed.category, `Missing category on: ${feed.title}`).toBeTruthy();
      expect(feed.specialty, `Missing specialty on: ${feed.title}`).toBeTruthy();
    }
  });
});

// =====================================================================
// JF-082: No duplicate feedUrl values
// =====================================================================
describe("JF-082: Unique feed URLs", () => {
  it("has no duplicate feedUrl values", () => {
    const urls = JOURNAL_FEEDS.map(f => f.feedUrl);
    const uniqueUrls = new Set(urls);
    const duplicates = urls.filter((url, i) => urls.indexOf(url) !== i);
    expect(duplicates, `Duplicate URLs: ${duplicates.join(", ")}`).toHaveLength(0);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});

// =====================================================================
// JF-083: All feedUrls start with https://
// =====================================================================
describe("JF-083: HTTPS URLs", () => {
  it("every feedUrl uses HTTPS", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(
        feed.feedUrl.startsWith("https://"),
        `Non-HTTPS feedUrl on ${feed.title}: ${feed.feedUrl}`
      ).toBe(true);
    }
  });

  it("every siteUrl uses HTTPS", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(
        feed.siteUrl.startsWith("https://"),
        `Non-HTTPS siteUrl on ${feed.title}: ${feed.siteUrl}`
      ).toBe(true);
    }
  });
});

// =====================================================================
// JF-084: Every specialty is a valid onboarding value
// =====================================================================
describe("JF-084: Specialty values match onboarding", () => {
  it("every specialty matches a value from the onboarding SPECIALTIES list", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(
        VALID_SPECIALTIES,
        `Invalid specialty "${feed.specialty}" on ${feed.title}. Must be one of: ${VALID_SPECIALTIES.join(", ")}`
      ).toContain(feed.specialty);
    }
  });
});

// =====================================================================
// JF-085: Coverage across major specialties
// =====================================================================
describe("JF-085: Specialty coverage", () => {
  const countBySpecialty = (specialty: string) =>
    JOURNAL_FEEDS.filter(f => f.specialty === specialty).length;

  it("Internal Medicine has >= 5 feeds", () => {
    expect(countBySpecialty("Internal Medicine")).toBeGreaterThanOrEqual(5);
  });

  it("Surgery has >= 2 feeds", () => {
    expect(countBySpecialty("Surgery")).toBeGreaterThanOrEqual(2);
  });

  it("Pediatrics has >= 2 feeds", () => {
    expect(countBySpecialty("Pediatrics")).toBeGreaterThanOrEqual(2);
  });

  it("Psychiatry has >= 2 feeds", () => {
    expect(countBySpecialty("Psychiatry")).toBeGreaterThanOrEqual(2);
  });

  it("Emergency Medicine has >= 2 feeds", () => {
    expect(countBySpecialty("Emergency Medicine")).toBeGreaterThanOrEqual(2);
  });

  it("covers at least 10 distinct specialties", () => {
    const specialties = new Set(JOURNAL_FEEDS.map(f => f.specialty));
    expect(specialties.size).toBeGreaterThanOrEqual(10);
  });
});

// =====================================================================
// JF-086: FEED_CATEGORIES derived correctly
// =====================================================================
describe("JF-086: FEED_CATEGORIES array", () => {
  it("is a non-empty sorted array", () => {
    expect(FEED_CATEGORIES.length).toBeGreaterThan(0);
    const sorted = [...FEED_CATEGORIES].sort();
    expect(FEED_CATEGORIES).toEqual(sorted);
  });

  it("contains only categories actually used in JOURNAL_FEEDS", () => {
    const usedCategories = new Set(JOURNAL_FEEDS.map(f => f.category));
    for (const cat of FEED_CATEGORIES) {
      expect(usedCategories.has(cat), `Category "${cat}" not used in any feed`).toBe(true);
    }
  });
});

// =====================================================================
// JF-087: FEED_SPECIALTIES derived correctly
// =====================================================================
describe("JF-087: FEED_SPECIALTIES array", () => {
  it("is a non-empty sorted array", () => {
    expect(FEED_SPECIALTIES.length).toBeGreaterThan(0);
    const sorted = [...FEED_SPECIALTIES].sort();
    expect(FEED_SPECIALTIES).toEqual(sorted);
  });

  it("every value is a valid onboarding specialty", () => {
    for (const s of FEED_SPECIALTIES) {
      expect(VALID_SPECIALTIES).toContain(s);
    }
  });
});

// =====================================================================
// JF-088: No leading/trailing whitespace in any field
// =====================================================================
describe("JF-088: No whitespace issues", () => {
  it("no fields have leading or trailing whitespace", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(feed.title.trim(), `Title whitespace on: ${feed.title}`).toBe(feed.title);
      expect(feed.feedUrl.trim(), `feedUrl whitespace on: ${feed.title}`).toBe(feed.feedUrl);
      expect(feed.siteUrl.trim(), `siteUrl whitespace on: ${feed.title}`).toBe(feed.siteUrl);
      expect(feed.publisher.trim(), `publisher whitespace on: ${feed.title}`).toBe(feed.publisher);
      expect(feed.category.trim(), `category whitespace on: ${feed.title}`).toBe(feed.category);
      expect(feed.specialty.trim(), `specialty whitespace on: ${feed.title}`).toBe(feed.specialty);
    }
  });
});

// =====================================================================
// JF-089: TypeScript type conformance
// =====================================================================
describe("JF-089: Type conformance", () => {
  it("every entry satisfies JournalDirectoryEntry type", () => {
    for (const feed of JOURNAL_FEEDS) {
      const typed: JournalDirectoryEntry = feed;
      expect(typeof typed.title).toBe("string");
      expect(typeof typed.feedUrl).toBe("string");
      expect(typeof typed.siteUrl).toBe("string");
      expect(typeof typed.publisher).toBe("string");
      expect(typeof typed.category).toBe("string");
      expect(typeof typed.specialty).toBe("string");
    }
  });
});

// =====================================================================
// JF-090: Includes major journals
// =====================================================================
describe("JF-090: Major journals included", () => {
  const hasFeed = (substring: string) =>
    JOURNAL_FEEDS.some(f => f.title.toLowerCase().includes(substring.toLowerCase()));

  it("includes NEJM", () => expect(hasFeed("NEJM")).toBe(true));
  it("includes Lancet", () => expect(hasFeed("Lancet")).toBe(true));
  it("includes JAMA", () => expect(hasFeed("JAMA")).toBe(true));
  it("includes BMJ", () => expect(hasFeed("BMJ")).toBe(true));
  it("includes Nature", () => expect(hasFeed("Nature")).toBe(true));
  it("includes Circulation", () => expect(hasFeed("Circulation")).toBe(true));
});

// =====================================================================
// JF-091: No feedUrl contains spaces or newlines
// =====================================================================
describe("JF-091: URL validity", () => {
  it("no feedUrl contains spaces or newlines", () => {
    for (const feed of JOURNAL_FEEDS) {
      expect(feed.feedUrl).not.toMatch(/[\s\n\r]/);
    }
  });
});
