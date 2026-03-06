import { XMLParser } from "fast-xml-parser";
import type { ParsedFeed, ParsedArticle } from "./types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  isArray: (name) => ["item", "entry"].includes(name),
});

function extractText(val: unknown): string | null {
  if (val == null) return null;
  if (typeof val === "string") return val.trim() || null;
  if (typeof val === "object" && val !== null && "#text" in val) {
    return String((val as Record<string, unknown>)["#text"]).trim() || null;
  }
  return String(val).trim() || null;
}

function parseDate(val: unknown): Date | null {
  if (!val) return null;
  const str = typeof val === "string" ? val : String(val);
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function extractDoi(link: string | null, content: string | null): string | null {
  const doiRegex = /\b(10\.\d{4,}\/[^\s<>"]+)/;
  for (const text of [link, content]) {
    if (text) {
      const match = text.match(doiRegex);
      if (match) return match[1];
    }
  }
  return null;
}

function extractPubmedId(link: string | null, guid: string | null): string | null {
  const pmidPatterns = [
    /pubmed[/.](\d{6,})/i,
    /ncbi\.nlm\.nih\.gov\/(?:pubmed\/)?(\d{6,})(?:\/|$)/i,
    /pmid[:\s]+(\d{6,})/i,
  ];
  for (const text of [link, guid]) {
    if (text) {
      for (const pattern of pmidPatterns) {
        const match = text.match(pattern);
        if (match) return match[1];
      }
    }
  }
  return null;
}

function parseRssItem(item: Record<string, unknown>): ParsedArticle {
  const title = extractText(item.title) || "Untitled";
  const link = extractText(item.link);
  const guid = extractText(item.guid) || link || title;
  const description = extractText(item.description);
  const contentEncoded = extractText(item["content:encoded"]);
  const pubDate = parseDate(item.pubDate);
  const author = extractText(item.author) || extractText(item["dc:creator"]);

  return {
    guid,
    title,
    authors: author,
    abstractSnippet: description ? description.replace(/<[^>]*>/g, "").slice(0, 500) : null,
    link,
    doi: extractDoi(link, description),
    pubmedId: extractPubmedId(link, guid),
    publishedAt: pubDate,
    imageUrl: null,
    contentHtml: contentEncoded || description,
    journal: null,
    volume: null,
    issue: null,
  };
}

function parseAtomEntry(entry: Record<string, unknown>): ParsedArticle {
  const title = extractText(entry.title) || "Untitled";

  let link: string | null = null;
  const linkVal = entry.link;
  if (Array.isArray(linkVal)) {
    const alt = linkVal.find(
      (l: Record<string, unknown>) => l["@_rel"] === "alternate" || !l["@_rel"]
    );
    link = extractText(alt?.["@_href"]) || extractText(linkVal[0]?.["@_href"]);
  } else if (typeof linkVal === "object" && linkVal !== null) {
    link = extractText((linkVal as Record<string, unknown>)["@_href"]);
  } else {
    link = extractText(linkVal);
  }

  const id = extractText(entry.id) || link || title;
  const summary = extractText(entry.summary);
  const content = extractText(entry.content);
  const updated = parseDate(entry.updated) || parseDate(entry.published);

  let author: string | null = null;
  if (entry.author) {
    const a = entry.author as Record<string, unknown>;
    author = extractText(a.name) || extractText(a);
  }

  return {
    guid: id,
    title,
    authors: author,
    abstractSnippet: (summary || content || "").replace(/<[^>]*>/g, "").slice(0, 500) || null,
    link,
    doi: extractDoi(link, summary || content || null),
    pubmedId: extractPubmedId(link, id),
    publishedAt: updated,
    imageUrl: null,
    contentHtml: content || summary,
    journal: null,
    volume: null,
    issue: null,
  };
}

export function parseFeed(xml: string): ParsedFeed {
  const parsed = parser.parse(xml);

  // RSS 2.0
  if (parsed.rss?.channel) {
    const channel = parsed.rss.channel;
    const items: Record<string, unknown>[] = channel.item || [];
    return {
      title: extractText(channel.title) || "Unknown Feed",
      description: extractText(channel.description),
      siteUrl: extractText(channel.link),
      articles: items.map(parseRssItem),
    };
  }

  // Atom
  if (parsed.feed) {
    const feed = parsed.feed;
    const entries: Record<string, unknown>[] = feed.entry || [];

    let siteUrl: string | null = null;
    const feedLink = feed.link;
    if (Array.isArray(feedLink)) {
      const alt = feedLink.find(
        (l: Record<string, unknown>) => l["@_rel"] === "alternate"
      );
      siteUrl = extractText(alt?.["@_href"]) || extractText(feedLink[0]?.["@_href"]);
    } else if (typeof feedLink === "object" && feedLink !== null) {
      siteUrl = extractText((feedLink as Record<string, unknown>)["@_href"]);
    }

    return {
      title: extractText(feed.title) || "Unknown Feed",
      description: extractText(feed.subtitle),
      siteUrl,
      articles: entries.map(parseAtomEntry),
    };
  }

  throw new Error("Unrecognized feed format: not RSS 2.0 or Atom");
}
