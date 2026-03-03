/**
 * Reference Format Parsers & Generators
 *
 * Supports RIS and BibTeX import/export for systematic review papers.
 * Uses @citation-js/plugin-ris and @citation-js/plugin-bibtex.
 */

import { Cite } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-ris";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ParsedReference {
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  abstract?: string;
  keywords?: string[];
  url?: string;
}

export type ExportFormat = "ris" | "bibtex" | "endnote_xml" | "csv";

export interface ExportablePaper {
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  abstract?: string;
}

// ---------------------------------------------------------------------------
// Parse RIS
// ---------------------------------------------------------------------------

export function parseRIS(content: string): ParsedReference[] {
  try {
    const cite = new Cite(content, { forceType: "@ris/file" });
    const data = cite.data as CSLEntry[];
    return data.map(cslToReference);
  } catch (error) {
    console.error("RIS parse error:", error);
    // Fallback: manual parse for common RIS format
    return manualParseRIS(content);
  }
}

// ---------------------------------------------------------------------------
// Parse BibTeX
// ---------------------------------------------------------------------------

export function parseBibTeX(content: string): ParsedReference[] {
  try {
    const cite = new Cite(content, { forceType: "@bibtex/text" });
    const data = cite.data as CSLEntry[];
    return data.map(cslToReference);
  } catch (error) {
    console.error("BibTeX parse error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Auto-detect format and parse
// ---------------------------------------------------------------------------

export function parseReferences(content: string): {
  format: "ris" | "bibtex" | "unknown";
  references: ParsedReference[];
} {
  const trimmed = content.trim();

  // RIS starts with "TY  - "
  if (trimmed.startsWith("TY  -") || /^TY\s{2}-\s/m.test(trimmed)) {
    return { format: "ris", references: parseRIS(trimmed) };
  }

  // BibTeX starts with "@"
  if (trimmed.startsWith("@")) {
    return { format: "bibtex", references: parseBibTeX(trimmed) };
  }

  // Try both
  const risResult = parseRIS(trimmed);
  if (risResult.length > 0) return { format: "ris", references: risResult };

  const bibResult = parseBibTeX(trimmed);
  if (bibResult.length > 0) return { format: "bibtex", references: bibResult };

  return { format: "unknown", references: [] };
}

// ---------------------------------------------------------------------------
// Generate RIS
// ---------------------------------------------------------------------------

export function generateRIS(papers: ExportablePaper[]): string {
  const entries = papers.map((paper) => {
    const lines: string[] = [];
    lines.push("TY  - JOUR");
    lines.push(`TI  - ${paper.title}`);

    for (const author of paper.authors || []) {
      lines.push(`AU  - ${author}`);
    }

    if (paper.journal) lines.push(`JO  - ${paper.journal}`);
    if (paper.year) lines.push(`PY  - ${paper.year}`);
    if (paper.volume) lines.push(`VL  - ${paper.volume}`);
    if (paper.issue) lines.push(`IS  - ${paper.issue}`);
    if (paper.pages) lines.push(`SP  - ${paper.pages}`);
    if (paper.doi) lines.push(`DO  - ${paper.doi}`);
    if (paper.pmid) lines.push(`AN  - ${paper.pmid}`);
    if (paper.abstract) lines.push(`AB  - ${paper.abstract}`);
    lines.push("ER  - ");

    return lines.join("\n");
  });

  return entries.join("\n\n");
}

// ---------------------------------------------------------------------------
// Generate BibTeX
// ---------------------------------------------------------------------------

export function generateBibTeX(papers: ExportablePaper[]): string {
  const entries = papers.map((paper) => {
    const cslData = paperToCSL(paper);
    const cite = new Cite([cslData]);
    return (cite.format("bibtex") as string).trim();
  });

  return entries.join("\n\n");
}

// ---------------------------------------------------------------------------
// Generate EndNote XML
// ---------------------------------------------------------------------------

export function generateEndNoteXML(papers: ExportablePaper[]): string {
  const records = papers
    .map(
      (paper, i) => `  <record>
    <rec-number>${i + 1}</rec-number>
    <ref-type name="Journal Article">17</ref-type>
    <contributors>
      <authors>
${(paper.authors || []).map((a) => `        <author><style face="normal">${escapeXml(a)}</style></author>`).join("\n")}
      </authors>
    </contributors>
    <titles>
      <title><style face="normal">${escapeXml(paper.title)}</style></title>
      ${paper.journal ? `<secondary-title><style face="normal">${escapeXml(paper.journal)}</style></secondary-title>` : ""}
    </titles>
    ${paper.year ? `<dates><year><style face="normal">${paper.year}</style></year></dates>` : ""}
    ${paper.volume ? `<volume><style face="normal">${paper.volume}</style></volume>` : ""}
    ${paper.issue ? `<number><style face="normal">${paper.issue}</style></number>` : ""}
    ${paper.pages ? `<pages><style face="normal">${escapeXml(paper.pages)}</style></pages>` : ""}
    ${paper.doi ? `<electronic-resource-num><style face="normal">${escapeXml(paper.doi)}</style></electronic-resource-num>` : ""}
    ${paper.abstract ? `<abstract><style face="normal">${escapeXml(paper.abstract)}</style></abstract>` : ""}
  </record>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<xml>
<records>
${records}
</records>
</xml>`;
}

// ---------------------------------------------------------------------------
// Generate CSV
// ---------------------------------------------------------------------------

export function generateCSV(papers: ExportablePaper[]): string {
  const header = "Title,Authors,Journal,Year,DOI,PMID,Volume,Issue,Pages";
  const rows = papers.map(
    (p) =>
      `"${csvEscape(p.title)}","${csvEscape((p.authors || []).join("; "))}","${csvEscape(p.journal || "")}",${p.year || ""},"${csvEscape(p.doi || "")}","${csvEscape(p.pmid || "")}","${csvEscape(p.volume || "")}","${csvEscape(p.issue || "")}","${csvEscape(p.pages || "")}"`
  );
  return [header, ...rows].join("\n");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface CSLEntry {
  title?: string;
  author?: Array<{ given?: string; family?: string; literal?: string }>;
  "container-title"?: string;
  issued?: { "date-parts"?: number[][] };
  DOI?: string;
  PMID?: string;
  volume?: string;
  issue?: string;
  page?: string;
  abstract?: string;
  keyword?: string;
  URL?: string;
}

function cslToReference(entry: CSLEntry): ParsedReference {
  const authors: string[] = [];
  if (entry.author) {
    for (const a of entry.author) {
      if (a.literal) {
        authors.push(a.literal);
      } else if (a.family) {
        authors.push(a.given ? `${a.given} ${a.family}` : a.family);
      }
    }
  }

  return {
    title: entry.title || "Untitled",
    authors,
    journal: entry["container-title"],
    year: entry.issued?.["date-parts"]?.[0]?.[0],
    doi: entry.DOI,
    pmid: entry.PMID,
    volume: entry.volume,
    issue: entry.issue,
    pages: entry.page,
    abstract: entry.abstract,
    keywords: entry.keyword?.split(",").map((k: string) => k.trim()),
    url: entry.URL,
  };
}

function paperToCSL(paper: ExportablePaper): Record<string, unknown> {
  const csl: Record<string, unknown> = {
    type: "article-journal",
    title: paper.title,
  };

  if (paper.authors?.length) {
    csl.author = paper.authors.map((name) => {
      const parts = name.split(",");
      if (parts.length >= 2) {
        return { family: parts[0].trim(), given: parts.slice(1).join(",").trim() };
      }
      const words = name.trim().split(/\s+/);
      if (words.length === 1) return { family: words[0] };
      return { given: words.slice(0, -1).join(" "), family: words[words.length - 1] };
    });
  }

  if (paper.journal) csl["container-title"] = paper.journal;
  if (paper.year) csl.issued = { "date-parts": [[paper.year]] };
  if (paper.doi) csl.DOI = paper.doi;
  if (paper.volume) csl.volume = paper.volume;
  if (paper.issue) csl.issue = paper.issue;
  if (paper.pages) csl.page = paper.pages;
  if (paper.abstract) csl.abstract = paper.abstract;

  return csl;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function csvEscape(str: string): string {
  return str.replace(/"/g, '""');
}

// Fallback manual RIS parser for when citation-js fails
function manualParseRIS(content: string): ParsedReference[] {
  const records: ParsedReference[] = [];
  const entries = content.split(/\nER\s{2}-/);

  for (const entry of entries) {
    if (!entry.trim()) continue;

    const fields = new Map<string, string[]>();
    const lines = entry.split("\n");

    for (const line of lines) {
      const match = line.match(/^([A-Z][A-Z0-9])\s{2}-\s(.*)$/);
      if (match) {
        const [, tag, value] = match;
        if (!fields.has(tag)) fields.set(tag, []);
        fields.get(tag)!.push(value.trim());
      }
    }

    const title = fields.get("TI")?.[0] || fields.get("T1")?.[0];
    if (!title) continue;

    const authors = fields.get("AU") || fields.get("A1") || [];
    const yearStr = fields.get("PY")?.[0] || fields.get("Y1")?.[0];
    const year = yearStr ? parseInt(yearStr, 10) : undefined;

    records.push({
      title,
      authors,
      journal:
        fields.get("JO")?.[0] ||
        fields.get("JF")?.[0] ||
        fields.get("T2")?.[0],
      year: year && !isNaN(year) ? year : undefined,
      doi: fields.get("DO")?.[0],
      pmid: fields.get("AN")?.[0],
      volume: fields.get("VL")?.[0],
      issue: fields.get("IS")?.[0],
      pages: fields.get("SP")?.[0],
      abstract: fields.get("AB")?.[0],
      keywords: fields.get("KW"),
      url: fields.get("UR")?.[0],
    });
  }

  return records;
}
