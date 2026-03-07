/**
 * RALPH Journal Feed — Sprint 2: Feed Parser Tests
 *
 * Tests the pure parseFeed() function against RSS 2.0, Atom 1.0, and
 * PubMed RSS formats with real-world medical journal edge cases.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseFeed } from "@/lib/feeds/feed-parser";
import type { ParsedFeed } from "@/lib/feeds/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES = join(__dirname, "fixtures");

function loadFixture(name: string): string {
  return readFileSync(join(FIXTURES, name), "utf-8");
}

// =====================================================================
// JF-020: Parse valid RSS 2.0 feed
// =====================================================================
describe("JF-020: RSS 2.0 medical journal feed", () => {
  let feed: ParsedFeed;

  it("parses without error", () => {
    feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed).toBeDefined();
  });

  it("detects feed type as rss", () => {
    expect(feed.feedType).toBe("rss");
  });

  it("extracts correct channel title", () => {
    expect(feed.title).toBe("New England Journal of Medicine");
  });

  it("extracts channel link as siteUrl", () => {
    expect(feed.siteUrl).toBe("https://www.nejm.org");
  });

  it("extracts all 3 articles", () => {
    expect(feed.articles).toHaveLength(3);
  });
});

// =====================================================================
// JF-021: Parse valid Atom feed
// =====================================================================
describe("JF-021: Atom 1.0 journal feed", () => {
  let feed: ParsedFeed;

  it("parses without error", () => {
    feed = parseFeed(loadFixture("atom-journal.xml"));
    expect(feed).toBeDefined();
  });

  it("detects feed type as atom", () => {
    expect(feed.feedType).toBe("atom");
  });

  it("extracts correct feed title", () => {
    expect(feed.title).toBe("The Lancet");
  });

  it("extracts feed subtitle as description", () => {
    expect(feed.description).toContain("independent");
  });

  it("extracts correct siteUrl from alternate link", () => {
    expect(feed.siteUrl).toBe("https://www.thelancet.com");
  });

  it("extracts 2 entries", () => {
    expect(feed.articles).toHaveLength(2);
  });
});

// =====================================================================
// JF-022: PubMed RSS extracts PMID
// =====================================================================
describe("JF-022: PubMed search RSS", () => {
  let feed: ParsedFeed;

  it("parses without error", () => {
    feed = parseFeed(loadFixture("pubmed-search-rss.xml"));
    expect(feed).toBeDefined();
  });

  it("extracts PubMed IDs from link URLs", () => {
    expect(feed.articles[0].pubmedId).toBe("39456789");
    expect(feed.articles[1].pubmedId).toBe("39456790");
  });

  it("extracts channel title containing search query", () => {
    expect(feed.title).toContain("SGLT2");
  });
});

// =====================================================================
// JF-023: DOI from prism:doi field
// =====================================================================
describe("JF-023: DOI extraction from prism:doi", () => {
  it("extracts DOI from prism:doi element", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].doi).toBe("10.1056/NEJMoa2204233");
    expect(feed.articles[1].doi).toBe("10.1056/NEJMoa2305834");
  });
});

// =====================================================================
// JF-024: DOI extracted from link URL
// =====================================================================
describe("JF-024: DOI extraction from link URL", () => {
  it("extracts DOI from doi.org link", () => {
    const feed = parseFeed(loadFixture("doi-in-link.xml"));
    expect(feed.articles[0].doi).toBe("10.1001/jama.2025.12345");
  });

  it("extracts DOI from dc:identifier", () => {
    const feed = parseFeed(loadFixture("doi-in-link.xml"));
    expect(feed.articles[1].doi).toBe("10.1016/j.jacc.2025.09.001");
  });
});

// =====================================================================
// JF-025: PubMed ID from link URL
// =====================================================================
describe("JF-025: PubMed ID extraction", () => {
  it("extracts PMID from pubmed.ncbi.nlm.nih.gov URL", () => {
    const feed = parseFeed(loadFixture("pubmed-search-rss.xml"));
    expect(feed.articles[0].pubmedId).toBe("39456789");
  });
});

// =====================================================================
// JF-026: GUID generation when missing
// =====================================================================
describe("JF-026: Deterministic GUID generation", () => {
  it("generates guid for item with no guid and no link", () => {
    const feed = parseFeed(loadFixture("missing-fields.xml"));
    const noGuidItem = feed.articles.find(a => a.title === "Article with only a title");
    expect(noGuidItem).toBeDefined();
    expect(noGuidItem!.guid).toBeTruthy();
    expect(noGuidItem!.guid.length).toBeGreaterThan(0);
  });

  it("generates same guid for same input (deterministic)", () => {
    const feed1 = parseFeed(loadFixture("missing-fields.xml"));
    const feed2 = parseFeed(loadFixture("missing-fields.xml"));
    const item1 = feed1.articles.find(a => a.title === "Article with only a title");
    const item2 = feed2.articles.find(a => a.title === "Article with only a title");
    expect(item1!.guid).toBe(item2!.guid);
  });
});

// =====================================================================
// JF-027: HTML stripped from titles
// =====================================================================
describe("JF-027: HTML stripping", () => {
  it("strips HTML tags from article descriptions", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    const snippet = feed.articles[0].abstractSnippet || "";
    expect(snippet).not.toContain("<p>");
    expect(snippet).not.toContain("</p>");
    expect(snippet).toContain("double-blind trial");
  });
});

// =====================================================================
// JF-028: Abstract truncation
// =====================================================================
describe("JF-028: Abstract snippet truncation", () => {
  it("truncates abstractSnippet to 1000 chars max", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    for (const article of feed.articles) {
      if (article.abstractSnippet) {
        expect(article.abstractSnippet.length).toBeLessThanOrEqual(1003); // 1000 + "..."
      }
    }
  });
});

// =====================================================================
// JF-029: RFC 822 date parsing (RSS)
// =====================================================================
describe("JF-029: RFC 822 date parsing", () => {
  it("parses RSS pubDate format correctly", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    const date = feed.articles[0].publishedAt;
    expect(date).toBeInstanceOf(Date);
    expect(date!.getFullYear()).toBe(2026);
    expect(date!.getMonth()).toBe(2); // March = 2 (0-indexed)
  });
});

// =====================================================================
// JF-030: ISO 8601 date parsing (Atom)
// =====================================================================
describe("JF-030: ISO 8601 date parsing", () => {
  it("parses Atom published date correctly", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    const date = feed.articles[0].publishedAt;
    expect(date).toBeInstanceOf(Date);
    expect(date!.getFullYear()).toBe(2026);
  });
});

// =====================================================================
// JF-031: Single-item feed (object not array)
// =====================================================================
describe("JF-031: Single-item feed handling", () => {
  it("handles feed with exactly one item", () => {
    const feed = parseFeed(loadFixture("single-item.xml"));
    expect(feed.articles).toHaveLength(1);
    expect(feed.articles[0].title).toContain("ultra-processed food");
  });
});

// =====================================================================
// JF-032: Empty feed
// =====================================================================
describe("JF-032: Empty feed (no items)", () => {
  it("returns empty articles array", () => {
    const feed = parseFeed(loadFixture("empty-feed.xml"));
    expect(feed.articles).toEqual([]);
    expect(feed.title).toBe("Empty Journal Feed");
  });
});

// =====================================================================
// JF-033: Invalid XML throws descriptive error
// =====================================================================
describe("JF-033: Invalid XML input", () => {
  it("throws on completely invalid input", () => {
    expect(() => parseFeed("this is not xml at all")).toThrow("Invalid feed");
  });

  it("throws on empty string", () => {
    expect(() => parseFeed("")).toThrow("Invalid feed");
  });

  it("throws on HTML page (not a feed)", () => {
    expect(() => parseFeed("<html><body><h1>Not a feed</h1></body></html>")).toThrow(
      "no recognizable feed structure"
    );
  });
});

// =====================================================================
// JF-034: CDATA sections in content
// =====================================================================
describe("JF-034: CDATA content handling", () => {
  it("extracts text from content:encoded with CDATA", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    // First article has content:encoded with CDATA
    const content = feed.articles[0].contentHtml;
    expect(content).toBeTruthy();
    expect(content).toContain("6609 patients");
  });
});

// =====================================================================
// JF-035: Mixed namespaces (dc:, prism:, content:, media:)
// =====================================================================
describe("JF-035: Namespace handling", () => {
  it("extracts dc:creator as authors", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].authors).toContain("Herrington");
  });

  it("extracts prism:publicationName as journal", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].journal).toBe("N Engl J Med");
  });

  it("extracts prism:volume", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].volume).toBe("388");
  });

  it("extracts prism:number as issue", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].issue).toBe("2");
  });

  it("extracts media:thumbnail as imageUrl", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].imageUrl).toContain("thumb.jpg");
  });
});

// =====================================================================
// JF-036: Missing <channel> graceful degradation
// =====================================================================
describe("JF-036: Graceful degradation", () => {
  it("items with no title are skipped", () => {
    const feed = parseFeed(loadFixture("missing-fields.xml"));
    const titles = feed.articles.map(a => a.title);
    // "Item with no title" should NOT be in the results
    expect(titles.every(t => t.length > 0)).toBe(true);
    expect(titles).not.toContain("");
  });
});

// =====================================================================
// JF-037: Feed-level metadata extraction
// =====================================================================
describe("JF-037: Feed metadata", () => {
  it("extracts title from RSS", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.title).toBe("New England Journal of Medicine");
  });

  it("extracts description from RSS", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.description).toContain("trusted");
  });

  it("extracts siteUrl from RSS", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.siteUrl).toBe("https://www.nejm.org");
  });
});

// =====================================================================
// JF-038: Feed type detection
// =====================================================================
describe("JF-038: Feed type detection", () => {
  it("detects RSS 2.0", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.feedType).toBe("rss");
  });

  it("detects Atom", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    expect(feed.feedType).toBe("atom");
  });
});

// =====================================================================
// JF-039: UTF-8 special characters
// =====================================================================
describe("JF-039: UTF-8 and special characters", () => {
  it("handles accented characters in titles", () => {
    const feed = parseFeed(loadFixture("special-chars.xml"));
    expect(feed.articles[0].title).toContain("tude");
  });

  it("handles accented characters in authors", () => {
    const feed = parseFeed(loadFixture("special-chars.xml"));
    expect(feed.articles[0].authors).toContain("ller");
  });

  it("handles CJK characters", () => {
    const feed = parseFeed(loadFixture("special-chars.xml"));
    const cjkArticle = feed.articles.find(a => a.title.includes("blocker"));
    expect(cjkArticle).toBeDefined();
  });
});

// =====================================================================
// JF-040: HTML entities in titles
// =====================================================================
describe("JF-040: HTML entities", () => {
  it("handles &amp; entity in title", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    const ampArticle = feed.articles.find(a => a.title.includes("Weight Management"));
    expect(ampArticle).toBeDefined();
    // The &amp; should be decoded to & or the surrounding text should be intact
    expect(ampArticle!.title).toContain("Semaglutide");
  });
});

// =====================================================================
// JF-041: Image URL extraction
// =====================================================================
describe("JF-041: Image URL extraction", () => {
  it("extracts media:thumbnail URL", () => {
    const feed = parseFeed(loadFixture("rss-medical-journal.xml"));
    expect(feed.articles[0].imageUrl).toBeTruthy();
    expect(feed.articles[0].imageUrl).toContain("thumb.jpg");
  });

  it("returns null when no image is present", () => {
    const feed = parseFeed(loadFixture("single-item.xml"));
    expect(feed.articles[0].imageUrl).toBeNull();
  });
});

// =====================================================================
// JF-042: Duplicate GUID deduplication
// =====================================================================
describe("JF-042: Duplicate GUID handling", () => {
  it("deduplicates articles with same guid, keeping first", () => {
    const feed = parseFeed(loadFixture("duplicate-guids.xml"));
    // 3 items in XML, but 2 share a GUID → should get 2 unique articles
    expect(feed.articles).toHaveLength(2);
  });

  it("keeps the first article when guids collide", () => {
    const feed = parseFeed(loadFixture("duplicate-guids.xml"));
    const duped = feed.articles.find(a => a.guid === "duplicate-guid-001");
    expect(duped!.title).toBe("First version of article");
  });
});

// =====================================================================
// JF-043: Performance benchmark
// =====================================================================
describe("JF-043: Performance", () => {
  it("parses a feed in under 50ms", () => {
    const xml = loadFixture("rss-medical-journal.xml");
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      parseFeed(xml);
    }
    const elapsed = performance.now() - start;
    const perParse = elapsed / 100;
    expect(perParse).toBeLessThan(50);
  });
});

// =====================================================================
// JF-044: Atom author extraction
// =====================================================================
describe("JF-044: Atom author handling", () => {
  it("joins multiple Atom authors with commas", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    // First entry has 3 authors
    expect(feed.articles[0].authors).toContain("Roth GA");
    expect(feed.articles[0].authors).toContain("Fuster V");
  });

  it("handles single Atom author", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    expect(feed.articles[1].authors).toContain("Topol");
  });
});

// =====================================================================
// JF-045: DOI from Atom entry ID
// =====================================================================
describe("JF-045: DOI from Atom entry id", () => {
  it("extracts DOI from Atom id field starting with 'doi:'", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    expect(feed.articles[0].doi).toBe("10.1016/S0140-6736(25)00471-3");
  });
});

// =====================================================================
// JF-046: GUID from object with isPermaLink attribute
// =====================================================================
describe("JF-046: GUID as object with attributes", () => {
  it("extracts guid text from object with isPermaLink attribute", () => {
    const feed = parseFeed(loadFixture("missing-fields.xml"));
    const guidItem = feed.articles.find(a => a.title === "Article with guid object");
    expect(guidItem).toBeDefined();
    expect(guidItem!.guid).toBe("custom-id-12345");
  });
});

// =====================================================================
// JF-047: Atom link with rel=alternate
// =====================================================================
describe("JF-047: Atom link extraction", () => {
  it("picks link with rel=alternate for article URL", () => {
    const feed = parseFeed(loadFixture("atom-journal.xml"));
    expect(feed.articles[0].link).toContain("thelancet.com");
    expect(feed.articles[0].link).toContain("fulltext");
  });
});
