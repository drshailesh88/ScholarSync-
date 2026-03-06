import { resilientFetch } from "@/lib/http/resilient-fetch";
import { parseFeed } from "./feed-parser";

// ── Types ───────────────────────────────────────────────────────────

export interface DiscoveredFeed {
  feedUrl: string;
  title: string;
  feedType: "rss" | "atom";
}

export interface ValidatedFeed {
  feedUrl: string;
  title: string;
  description: string | null;
  siteUrl: string | null;
  feedType: "rss" | "atom";
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Validate that a URL points to a valid RSS/Atom feed.
 * Fetches the URL and tries to parse it as a feed.
 */
export async function validateFeedUrl(feedUrl: string): Promise<ValidatedFeed> {
  const response = await resilientFetch(
    feedUrl,
    {
      headers: {
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml",
      },
    },
    { service: "FeedValidation", timeout: 15000, maxRetries: 1 }
  );

  const xml = await response.text();
  if (!xml.trim()) {
    throw new Error("Empty response body");
  }

  const parsed = parseFeed(xml);
  const isAtom = xml.includes("<feed") && xml.includes("xmlns");

  return {
    feedUrl,
    title: parsed.title,
    description: parsed.description,
    siteUrl: parsed.siteUrl,
    feedType: isAtom ? "atom" : "rss",
  };
}

/**
 * Discover RSS/Atom feeds from a URL.
 *
 * If the URL directly serves a feed, returns it.
 * Otherwise, fetches the HTML page and looks for <link> tags
 * pointing to RSS/Atom feeds.
 */
export async function discoverFeeds(url: string): Promise<DiscoveredFeed[]> {
  const response = await resilientFetch(
    url,
    {
      headers: {
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, text/html",
      },
    },
    { service: "FeedDiscovery", timeout: 15000, maxRetries: 1 }
  );

  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();

  // If it's directly a feed, parse and return it
  if (
    contentType.includes("xml") ||
    contentType.includes("rss") ||
    contentType.includes("atom")
  ) {
    try {
      const parsed = parseFeed(body);
      const isAtom = body.includes("<feed") && body.includes("xmlns");
      return [
        {
          feedUrl: url,
          title: parsed.title,
          feedType: isAtom ? "atom" : "rss",
        },
      ];
    } catch {
      // Not a valid feed, try HTML discovery below
    }
  }

  // Try to parse as feed anyway (some servers serve XML as text/html)
  if (body.trimStart().startsWith("<?xml") || body.trimStart().startsWith("<rss") || body.trimStart().startsWith("<feed")) {
    try {
      const parsed = parseFeed(body);
      const isAtom = body.includes("<feed") && body.includes("xmlns");
      return [
        {
          feedUrl: url,
          title: parsed.title,
          feedType: isAtom ? "atom" : "rss",
        },
      ];
    } catch {
      // Not a valid feed
    }
  }

  // Parse HTML to find <link rel="alternate" type="application/rss+xml">
  const feeds: DiscoveredFeed[] = [];
  const linkRegex =
    /<link[^>]+rel=["']alternate["'][^>]*>/gi;
  let match;

  while ((match = linkRegex.exec(body)) !== null) {
    const tag = match[0];
    const typeMatch = tag.match(/type=["']([^"']+)["']/);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/);
    const titleMatch = tag.match(/title=["']([^"']+)["']/);

    if (hrefMatch && typeMatch) {
      const type = typeMatch[1];
      if (
        type.includes("rss") ||
        type.includes("atom") ||
        type.includes("xml")
      ) {
        let feedUrl = hrefMatch[1];
        // Resolve relative URLs
        if (feedUrl.startsWith("/")) {
          const base = new URL(url);
          feedUrl = `${base.origin}${feedUrl}`;
        }
        feeds.push({
          feedUrl,
          title: titleMatch?.[1] || "Feed",
          feedType: type.includes("atom") ? "atom" : "rss",
        });
      }
    }
  }

  return feeds;
}
