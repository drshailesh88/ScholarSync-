// ============================================================================
// Zotero Web API Integration — Fetch a user's Zotero library items
// ============================================================================

import type { ParsedReference, ReferenceType } from "./types";

const ZOTERO_API_BASE = "https://api.zotero.org";
const PAGE_SIZE = 100; // Zotero max per page
const MAX_PAGES = 10; // Safety cap: 1000 items max

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ZoteroCslAuthor {
  family?: string;
  given?: string;
  literal?: string;
}

interface ZoteroCslItem {
  id?: string;
  type?: string;
  title?: string;
  author?: ZoteroCslAuthor[];
  issued?: { "date-parts"?: number[][] };
  "container-title"?: string;
  DOI?: string;
  abstract?: string;
  volume?: string;
  issue?: string;
  page?: string;
  publisher?: string;
  URL?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapZoteroType(cslType: string | undefined): ReferenceType {
  if (!cslType) return "other";
  const t = cslType.toLowerCase();
  if (t.includes("article")) return "article";
  if (t === "book") return "book";
  if (t === "chapter") return "chapter";
  if (t.includes("conference") || t.includes("paper-conference"))
    return "conference";
  if (t.includes("thesis")) return "thesis";
  return "other";
}

function formatAuthor(a: ZoteroCslAuthor): string {
  if (a.literal) return a.literal;
  if (a.family && a.given) {
    const initials = a.given
      .split(/[\s.-]+/)
      .filter(Boolean)
      .map((n) => n[0] + ".")
      .join(" ");
    return `${a.family}, ${initials}`;
  }
  return a.family || "Unknown";
}

function cslItemToReference(
  item: ZoteroCslItem,
  index: number
): ParsedReference {
  const authors = Array.isArray(item.author)
    ? item.author.map(formatAuthor)
    : [];

  const year =
    item.issued?.["date-parts"]?.[0]?.[0] ?? 0;

  return {
    id: String(item.id ?? `zotero-${index}-${Date.now()}`),
    title: item.title || "Untitled",
    authors,
    year,
    journal: item["container-title"] || undefined,
    doi: item.DOI || undefined,
    abstract: item.abstract || undefined,
    type: mapZoteroType(item.type),
    volume: item.volume || undefined,
    issue: item.issue || undefined,
    pages: item.page || undefined,
    publisher: item.publisher || undefined,
    url: item.URL || undefined,
    rawCsl: item as Record<string, unknown>,
  };
}

// ---------------------------------------------------------------------------
// Parse the Link header to find the next page URL
// ---------------------------------------------------------------------------

function getNextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  for (const part of parts) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match) return match[1];
  }
  return null;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ZoteroFetchOptions {
  apiKey: string;
  userId: string;
  /** Maximum number of items to fetch. Defaults to 500. */
  maxItems?: number;
}

/**
 * Fetch all items from a Zotero user's library via the Web API.
 * Returns them as ParsedReference[].
 */
export async function fetchZoteroLibrary(
  options: ZoteroFetchOptions
): Promise<ParsedReference[]> {
  const { apiKey, userId, maxItems = 500 } = options;
  const allItems: ParsedReference[] = [];

  let url: string | null =
    `${ZOTERO_API_BASE}/users/${encodeURIComponent(userId)}/items?format=csljson&limit=${PAGE_SIZE}&itemType=-attachment%20||%20note`;

  let page = 0;

  while (url && page < MAX_PAGES && allItems.length < maxItems) {
    const res = await fetch(url, {
      headers: {
        "Zotero-API-Key": apiKey,
        "Zotero-API-Version": "3",
      },
    });

    if (!res.ok) {
      if (res.status === 403) {
        throw new Error(
          "Invalid Zotero API key or insufficient permissions. Please check your key at zotero.org/settings/keys."
        );
      }
      if (res.status === 404) {
        throw new Error(
          "Zotero user not found. Please verify your User ID at zotero.org/settings/keys."
        );
      }
      throw new Error(`Zotero API error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as { items?: ZoteroCslItem[] } | ZoteroCslItem[];

    // The csljson format returns { items: [...] }
    const items: ZoteroCslItem[] = Array.isArray(data)
      ? data
      : (data as { items?: ZoteroCslItem[] }).items ?? [];

    for (const item of items) {
      if (allItems.length >= maxItems) break;
      allItems.push(cslItemToReference(item, allItems.length));
    }

    // Follow pagination
    url = getNextPageUrl(res.headers.get("Link"));
    page++;
  }

  return allItems;
}
