/**
 * OPML Import/Export for Journal Feed
 *
 * Generates and parses OPML 2.0 files for feed subscription portability.
 * Compatible with Feedly, Inoreader, NetNewsWire, and all standard RSS readers.
 */

import { XMLParser } from "fast-xml-parser";

// ── Types ───────────────────────────────────────────────────────────

export interface OpmlOutline {
  title: string;
  feedUrl: string;
  siteUrl: string;
  folder?: string;
}

export interface OpmlParseResult {
  title: string;
  feeds: OpmlOutline[];
}

// ── Export ───────────────────────────────────────────────────────────

/**
 * Generate an OPML 2.0 XML string from a list of feed subscriptions.
 * Groups feeds by folder. Feeds without a folder go at the top level.
 */
export function generateOpml(
  subscriptions: OpmlOutline[],
  ownerName: string = "ScholarSync User"
): string {
  const now = new Date().toUTCString();

  // Group by folder
  const folders = new Map<string, OpmlOutline[]>();
  const topLevel: OpmlOutline[] = [];

  for (const sub of subscriptions) {
    if (sub.folder) {
      const existing = folders.get(sub.folder) || [];
      existing.push(sub);
      folders.set(sub.folder, existing);
    } else {
      topLevel.push(sub);
    }
  }

  // Build outline XML
  let outlines = "";

  // Top-level feeds (no folder)
  for (const sub of topLevel) {
    outlines += `    <outline type="rss" text="${escapeXmlAttr(sub.title)}" title="${escapeXmlAttr(sub.title)}" xmlUrl="${escapeXmlAttr(sub.feedUrl)}" htmlUrl="${escapeXmlAttr(sub.siteUrl)}" />\n`;
  }

  // Folder-grouped feeds
  for (const [folder, subs] of folders) {
    outlines += `    <outline text="${escapeXmlAttr(folder)}" title="${escapeXmlAttr(folder)}">\n`;
    for (const sub of subs) {
      outlines += `      <outline type="rss" text="${escapeXmlAttr(sub.title)}" title="${escapeXmlAttr(sub.title)}" xmlUrl="${escapeXmlAttr(sub.feedUrl)}" htmlUrl="${escapeXmlAttr(sub.siteUrl)}" />\n`;
    }
    outlines += `    </outline>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>ScholarSync Feed Subscriptions</title>
    <dateCreated>${now}</dateCreated>
    <ownerName>${escapeXmlAttr(ownerName)}</ownerName>
  </head>
  <body>
${outlines}  </body>
</opml>`;
}

// ── Import ──────────────────────────────────────────────────────────

/**
 * Parse an OPML XML string into a list of feed subscriptions.
 * Handles both flat and nested (folder) OPML structures.
 * Compatible with Feedly, Inoreader, and generic OPML exports.
 */
export function parseOpml(xml: string): OpmlParseResult {
  if (!xml || !xml.trim()) {
    throw new Error("Invalid OPML: empty input");
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => name === "outline",
  });

  let parsed: Record<string, unknown>;
  try {
    parsed = parser.parse(xml);
  } catch {
    throw new Error("Invalid OPML: malformed XML");
  }

  const opml = parsed.opml as Record<string, unknown> | undefined;
  if (!opml) {
    throw new Error("Invalid OPML: missing <opml> root element");
  }

  // Extract title from head
  const head = opml.head as Record<string, unknown> | undefined;
  const title = (head?.title as string) || "Imported Feeds";

  // Extract outlines from body
  if (!("body" in opml)) {
    throw new Error("Invalid OPML: missing <body> element");
  }

  const body = opml.body as Record<string, unknown> | string | undefined;
  if (!body || typeof body !== "object") {
    // Empty <body></body> parses as "" or undefined
    return { title, feeds: [] };
  }

  const outlines = body.outline as Record<string, unknown>[] | undefined;
  if (!outlines || !Array.isArray(outlines)) {
    return { title, feeds: [] };
  }

  const feeds: OpmlOutline[] = [];

  function processOutline(outline: Record<string, unknown>, folder?: string) {
    const xmlUrl = outline["@_xmlUrl"] as string | undefined;
    const text = (outline["@_text"] || outline["@_title"] || "") as string;
    const htmlUrl = (outline["@_htmlUrl"] || "") as string;

    if (xmlUrl && xmlUrl.startsWith("http")) {
      // This is a feed outline
      feeds.push({
        title: text || "Untitled Feed",
        feedUrl: xmlUrl,
        siteUrl: htmlUrl || "",
        folder: folder || undefined,
      });
    }

    // Check for nested outlines (folder)
    const children = outline.outline as Record<string, unknown>[] | undefined;
    if (children && Array.isArray(children)) {
      const folderName = text || folder;
      for (const child of children) {
        processOutline(child, folderName);
      }
    }
  }

  for (const outline of outlines) {
    processOutline(outline);
  }

  return { title, feeds };
}

// ── Helpers ─────────────────────────────────────────────────────────

function escapeXmlAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&apos;");
}
