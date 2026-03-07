// ============================================================================
// Journal Feed — Feed Parser (Sprint 2)
//
// Pure function: XML string in → ParsedFeed out.
// Supports RSS 2.0, Atom 1.0, and PubMed RSS feeds.
// No network calls, no database, no side effects.
// ============================================================================

import { XMLParser } from "fast-xml-parser";
import type { ParsedFeed, ParsedArticle } from "./types";

// ── XMLParser singleton ─────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  cdataPropName: "__cdata",
  trimValues: true,
  parseTagValue: false,
  parseAttributeValue: false,
  isArray: (name: string) =>
    ["item", "entry", "link", "author", "category", "contributor"].includes(name),
});

// ── Helpers (internal) ──────────────────────────────────────────────

function extractText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("__cdata" in obj) return extractText(obj.__cdata);
    if ("#text" in obj) return extractText(obj["#text"]);
    // Try to get any string value from the object
    for (const v of Object.values(obj)) {
      if (typeof v === "string") return v;
    }
  }
  return "";
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut = lastSpace > 0 ? lastSpace : maxLength;
  return truncated.slice(0, cut) + "...";
}

function extractDoi(text: string): string | null {
  if (!text) return null;
  const match = text.match(/10\.\d{4,9}\/[^\s<>"']+/);
  return match ? match[0] : null;
}

function extractPmid(text: string): string | null {
  if (!text) return null;
  const match = text.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
  if (match) return match[1];
  const pmidMatch = text.match(/pmid:\s*(\d+)/i);
  return pmidMatch ? pmidMatch[1] : null;
}

function generateGuid(title: string, link: string): string {
  const input = `${title}|${link}`;
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16);
}

function safeDate(value: unknown): Date | null {
  const str = extractText(value);
  if (!str) return null;
  const d = new Date(str);
  if (isNaN(d.getTime())) return null;
  return d;
}

function getStr(value: unknown): string | null {
  const s = extractText(value).trim();
  return s || null;
}

function getLinkHref(link: unknown): string | null {
  if (typeof link === "string") return link;
  if (link && typeof link === "object") {
    const obj = link as Record<string, unknown>;
    if ("@_href" in obj) return obj["@_href"] as string;
  }
  return null;
}

// ── RSS 2.0 parsing ─────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function parseRssItem(item: any): ParsedArticle | null {
  const rawTitle = extractText(item.title);
  const title = stripHtml(rawTitle).trim();
  if (!title) return null;

  // Link: may be array
  let link: string | null = null;
  if (Array.isArray(item.link)) {
    for (const l of item.link) {
      const href = getLinkHref(l);
      if (href) { link = href; break; }
    }
  } else {
    link = getStr(item.link);
  }

  // GUID
  let guid: string;
  const rawGuid = item.guid;
  if (rawGuid != null) {
    if (typeof rawGuid === "object" && rawGuid["#text"] != null) {
      guid = extractText(rawGuid["#text"]);
    } else {
      guid = extractText(rawGuid);
    }
  } else if (link) {
    guid = link;
  } else {
    guid = generateGuid(title, link || "");
  }

  // Content
  const contentRaw = item["content:encoded"] ?? item.description;
  const contentHtml = contentRaw != null ? extractText(contentRaw) : null;
  const abstractText = contentHtml ? stripHtml(contentHtml) : null;
  const abstractSnippet = abstractText ? truncate(abstractText, 1000) : null;

  // Authors
  const authors = getStr(item["dc:creator"]) ?? getStr(item.author);

  // Dates
  const publishedAt = safeDate(item.pubDate) ?? safeDate(item["dc:date"]);

  // DOI
  let doi: string | null = getStr(item["prism:doi"]);
  if (!doi) {
    const dcId = getStr(item["dc:identifier"]);
    if (dcId && dcId.toLowerCase().includes("doi:")) {
      doi = extractDoi(dcId) ?? dcId.replace(/^doi:\s*/i, "").trim();
    }
  }
  if (!doi && link) {
    doi = extractDoi(link);
  }

  // PubMed ID
  let pubmedId: string | null = null;
  if (link) pubmedId = extractPmid(link);
  if (!pubmedId) {
    const dcId = getStr(item["dc:identifier"]);
    if (dcId && dcId.toLowerCase().includes("pmid:")) {
      pubmedId = extractPmid(dcId);
    }
  }

  // Image
  let imageUrl: string | null = null;
  if (item.enclosure) {
    const enc = item.enclosure;
    const encType = enc["@_type"] as string | undefined;
    if (encType && encType.startsWith("image/")) {
      imageUrl = enc["@_url"] as string ?? null;
    }
  }
  if (!imageUrl && item["media:thumbnail"]) {
    imageUrl = item["media:thumbnail"]["@_url"] ?? null;
  }
  if (!imageUrl && item["media:content"]) {
    imageUrl = item["media:content"]["@_url"] ?? null;
  }

  return {
    guid,
    title,
    authors,
    abstractSnippet,
    link,
    doi,
    pubmedId,
    publishedAt,
    imageUrl,
    contentHtml,
    journal: getStr(item["prism:publicationName"]) ?? getStr(item["dc:source"]),
    volume: getStr(item["prism:volume"]),
    issue: getStr(item["prism:number"]) ?? getStr(item["prism:issue"]),
  };
}

function parseRss(channel: any): ParsedFeed {
  const items = channel.item ?? [];
  const itemList = Array.isArray(items) ? items : [items];

  const articles: ParsedArticle[] = [];
  const seenGuids = new Set<string>();

  for (const item of itemList) {
    const parsed = parseRssItem(item);
    if (parsed && !seenGuids.has(parsed.guid)) {
      seenGuids.add(parsed.guid);
      articles.push(parsed);
    }
  }

  return {
    title: extractText(channel.title).trim() || "Untitled Feed",
    description: getStr(channel.description),
    siteUrl: getStr(channel.link),
    feedType: "rss",
    articles,
  };
}

// ── Atom parsing ────────────────────────────────────────────────────

function parseAtomEntry(entry: any): ParsedArticle | null {
  const rawTitle = extractText(entry.title);
  const title = stripHtml(rawTitle).trim();
  if (!title) return null;

  // Link: find rel=alternate, else first link
  let link: string | null = null;
  const links = entry.link;
  if (Array.isArray(links)) {
    const alt = links.find((l: any) => l["@_rel"] === "alternate");
    if (alt) {
      link = alt["@_href"] ?? null;
    } else {
      link = links[0]?.["@_href"] ?? null;
    }
  } else if (links) {
    link = links["@_href"] ?? null;
  }

  // GUID
  let guid: string;
  const rawId = getStr(entry.id);
  if (rawId) {
    guid = rawId;
  } else {
    guid = generateGuid(title, link || "");
  }

  // If no link, try entry.id if it starts with http
  if (!link && rawId && rawId.startsWith("http")) {
    link = rawId;
  }

  // Content
  const contentRaw = entry.content ?? entry.summary;
  const contentHtml = contentRaw != null ? extractText(contentRaw) : null;
  const abstractText = contentHtml ? stripHtml(contentHtml) : null;
  const abstractSnippet = abstractText ? truncate(abstractText, 1000) : null;

  // Authors
  let authors: string | null = null;
  const authorArr = entry.author;
  if (Array.isArray(authorArr)) {
    const names = authorArr
      .map((a: any) => extractText(a.name))
      .filter(Boolean);
    authors = names.length > 0 ? names.join(", ") : null;
  } else if (authorArr) {
    authors = getStr(authorArr.name);
  }

  // Dates
  const publishedAt = safeDate(entry.published) ?? safeDate(entry.updated);

  // DOI
  let doi: string | null = null;
  if (link) doi = extractDoi(link);
  if (!doi && rawId) {
    // Handle id like "doi:10.1016/..."
    if (rawId.toLowerCase().startsWith("doi:")) {
      doi = rawId.slice(4);
    } else {
      doi = extractDoi(rawId);
    }
  }

  // PubMed ID
  const pubmedId = link ? extractPmid(link) : null;

  // Image
  const imageUrl = entry["media:thumbnail"]?.["@_url"] ?? null;

  return {
    guid,
    title,
    authors,
    abstractSnippet,
    link,
    doi,
    pubmedId,
    publishedAt,
    imageUrl,
    contentHtml,
    journal: null,
    volume: null,
    issue: null,
  };
}

function parseAtom(feed: any): ParsedFeed {
  const entries = feed.entry ?? [];
  const entryList = Array.isArray(entries) ? entries : [entries];

  const articles: ParsedArticle[] = [];
  const seenGuids = new Set<string>();

  for (const entry of entryList) {
    const parsed = parseAtomEntry(entry);
    if (parsed && !seenGuids.has(parsed.guid)) {
      seenGuids.add(parsed.guid);
      articles.push(parsed);
    }
  }

  // Site URL from link with rel=alternate
  let siteUrl: string | null = null;
  const feedLinks = feed.link;
  if (Array.isArray(feedLinks)) {
    const alt = feedLinks.find((l: any) => l["@_rel"] === "alternate");
    if (alt) siteUrl = alt["@_href"] ?? null;
    if (!siteUrl) siteUrl = feedLinks[0]?.["@_href"] ?? null;
  } else if (feedLinks) {
    siteUrl = feedLinks["@_href"] ?? null;
  }

  return {
    title: extractText(feed.title).trim() || "Untitled Feed",
    description: getStr(feed.subtitle),
    siteUrl,
    feedType: "atom",
    articles,
  };
}

// ── Main entry point ────────────────────────────────────────────────

export function parseFeed(xml: string): ParsedFeed {
  if (!xml || !xml.trim()) {
    throw new Error("Invalid feed: could not parse XML");
  }

  let parsed: any;
  try {
    parsed = parser.parse(xml);
  } catch {
    throw new Error("Invalid feed: could not parse XML");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid feed: could not parse XML");
  }

  // RSS 2.0
  if (parsed.rss) {
    const channel = parsed.rss.channel;
    if (!channel) {
      return {
        title: "Untitled Feed",
        description: null,
        siteUrl: null,
        feedType: "rss",
        articles: [],
      };
    }
    return parseRss(channel);
  }

  // Atom
  if (parsed.feed) {
    return parseAtom(parsed.feed);
  }

  // RSS 1.0 / RDF
  const rdf = parsed["rdf:RDF"] ?? parsed["RDF"];
  if (rdf) {
    const channel = rdf.channel ?? {};
    const items = rdf.item ?? [];
    const mergedChannel = { ...channel, item: items };
    return parseRss(mergedChannel);
  }

  throw new Error("Invalid feed: no recognizable feed structure");
}
/* eslint-enable @typescript-eslint/no-explicit-any */
