/**
 * RALPH Journal Feed — Sprint 3: Feed Discovery + URL Validation
 *
 * Auto-discovers RSS/Atom feeds from any URL and validates feed URLs.
 */
import { resilientFetch } from "@/lib/http/resilient-fetch";
import { parseFeed } from "./feed-parser";
import type { ParsedFeed } from "./types";

// ── Types ───────────────────────────────────────────────────────────

export interface DiscoveredFeed {
  feedUrl: string;
  title: string;
  feedType: "rss" | "atom";
}

// ── Constants ───────────────────────────────────────────────────────

const COMMON_FEED_PATHS = [
  "/feed",
  "/rss",
  "/rss.xml",
  "/atom.xml",
  "/feed.xml",
  "/feed/rss",
  "/index.xml",
];

// ── Public API ──────────────────────────────────────────────────────

/**
 * Given any URL, discover RSS/Atom feed(s) associated with it.
 * NEVER throws. Returns empty array on failure.
 */
export async function discoverFeeds(url: string): Promise<DiscoveredFeed[]> {
  try {
    // 1. Normalize URL
    const normalized = normalizeUrl(url);
    if (!normalized) return [];

    // 2. Fetch the URL
    let response: Response;
    try {
      response = await resilientFetch(normalized, {}, {
        service: "RSS-Discovery",
        timeout: 10000,
        maxRetries: 1,
      });
    } catch {
      return [];
    }

    // 3. Read response body
    const body = await response.text();

    // 4. Check if the response IS a feed
    const contentType = response.headers.get("content-type");
    if (isXmlContentType(contentType) || body.trimStart().startsWith("<?xml")) {
      try {
        const parsed = parseFeed(body);
        return [
          {
            feedUrl: normalized,
            title: parsed.title,
            feedType: parsed.feedType === "atom" ? "atom" : "rss",
          },
        ];
      } catch {
        // XML but not a valid feed — continue to HTML parsing
      }
    }

    // 5. Treat as HTML — extract feed <link> tags
    const feedLinks = extractFeedLinks(body, normalized);
    if (feedLinks.length > 0) {
      return feedLinks;
    }

    // 6. Try common feed paths
    const baseUrl = getBaseUrl(normalized);
    const discovered: DiscoveredFeed[] = [];

    for (const path of COMMON_FEED_PATHS) {
      const candidateUrl = baseUrl + path;
      try {
        const pathResponse = await resilientFetch(candidateUrl, {}, {
          service: "RSS-Discovery",
          timeout: 10000,
          maxRetries: 1,
        });
        const pathBody = await pathResponse.text();
        const parsed = parseFeed(pathBody);
        discovered.push({
          feedUrl: candidateUrl,
          title: parsed.title,
          feedType: parsed.feedType === "atom" ? "atom" : "rss",
        });
      } catch {
        // Skip failed paths
      }
    }

    return discovered;
  } catch {
    // Catch-all: discoverFeeds NEVER throws
    return [];
  }
}

/**
 * Validate that a URL points to a parseable RSS/Atom feed.
 * THROWS if the URL is not a valid feed.
 */
export async function validateFeedUrl(feedUrl: string): Promise<ParsedFeed> {
  // 1. Fetch the URL
  let response: Response;
  try {
    response = await resilientFetch(feedUrl, {}, {
      service: "RSS-Validate",
      timeout: 15000,
      maxRetries: 2,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Feed validation failed: ${message}`);
  }

  // 2. Read response body
  const body = await response.text();
  if (!body.trim()) {
    throw new Error("Feed validation failed: empty response");
  }

  // 3. Parse
  try {
    return parseFeed(body);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Feed validation failed: ${message}`);
  }
}

// ── Internal Helpers ────────────────────────────────────────────────

/**
 * Normalize a URL: add https:// if missing, trim whitespace.
 * Returns null if the result is not a valid URL.
 */
function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let urlStr = trimmed;
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = "https://" + urlStr;
  }

  try {
    const parsed = new URL(urlStr);
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Get the base URL (protocol + hostname) from a URL string.
 */
function getBaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return url;
  }
}

/**
 * Resolve a potentially relative URL against a base URL.
 */
function resolveUrl(relative: string, base: string): string {
  try {
    return new URL(relative, base).href;
  } catch {
    return relative;
  }
}

/**
 * Check if a Content-Type header indicates XML content.
 */
function isXmlContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  return (
    contentType.includes("application/rss+xml") ||
    contentType.includes("application/atom+xml") ||
    contentType.includes("application/xml") ||
    contentType.includes("text/xml")
  );
}

/**
 * Extract feed <link> tags from an HTML string using regex.
 * Handles attributes in any order and both single/double quotes.
 */
function extractFeedLinks(html: string, baseUrl: string): DiscoveredFeed[] {
  const feeds: DiscoveredFeed[] = [];

  const linkRegex = /<link[^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(html)) !== null) {
    const tag = match[0];

    // Check for rel="alternate"
    if (!/rel=["']alternate["']/i.test(tag)) continue;

    // Check for RSS or Atom type
    const typeMatch = tag.match(
      /type=["']application\/(rss\+xml|atom\+xml)["']/i
    );
    if (!typeMatch) continue;

    // Extract href
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;

    // Extract title (optional)
    const titleMatch = tag.match(/title=["']([^"']+)["']/i);

    const feedType = typeMatch[1].toLowerCase() === "rss+xml" ? "rss" : "atom";
    const feedUrl = resolveUrl(hrefMatch[1], baseUrl);
    const title = titleMatch ? titleMatch[1] : "Untitled Feed";

    feeds.push({ feedUrl, title, feedType });
  }

  return feeds;
}
