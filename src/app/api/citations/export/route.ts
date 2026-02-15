/**
 * Citation export API route.
 *
 * Exports citations in multiple file formats (BibTeX, RIS, NBIB, EndNote)
 * for import into reference managers like Zotero, Mendeley, and EndNote.
 *
 * Also supports text citation styles (APA, MLA, Chicago, Vancouver, Harvard)
 * via the existing citations.ts utility.
 *
 * GET  /api/citations/export?format=bibtex&doi=...
 * GET  /api/citations/export?format=ris&pmid=...
 * POST /api/citations/export  { results: UnifiedSearchResult[], format: string }
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { Cite } = require("@citation-js/core");
require("@citation-js/plugin-csl");
require("@citation-js/plugin-bibtex");
require("@citation-js/plugin-doi");
require("@citation-js/plugin-ris");
/* eslint-enable @typescript-eslint/no-require-imports */

import { NextResponse } from "next/server";
import type { UnifiedSearchResult } from "@/types/search";
import { generateNbib, generateNbibBatch } from "@/lib/citations/nbib-generator";
import {
  formatCitation,
  type CitationStyle,
  type PaperData,
} from "@/lib/citations";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type FileFormat = "bibtex" | "ris" | "nbib" | "endnote";
type TextFormat = "apa" | "mla" | "chicago" | "vancouver" | "harvard";
type ExportFormat = FileFormat | TextFormat;

const FILE_FORMATS: Record<
  FileFormat,
  { contentType: string; filename: string }
> = {
  bibtex: {
    contentType: "application/x-bibtex",
    filename: "citation.bib",
  },
  ris: {
    contentType: "application/x-research-info-systems",
    filename: "citation.ris",
  },
  nbib: {
    contentType: "application/x-nbib",
    filename: "citation.nbib",
  },
  endnote: {
    contentType: "application/x-endnote-refer",
    filename: "citation.enw",
  },
};

const TEXT_FORMATS: TextFormat[] = ["apa", "mla", "chicago", "vancouver", "harvard"];

function isFileFormat(format: string): format is FileFormat {
  return format in FILE_FORMATS;
}

function isTextFormat(format: string): format is TextFormat {
  return TEXT_FORMATS.includes(format as TextFormat);
}

function isValidFormat(format: string): format is ExportFormat {
  return isFileFormat(format) || isTextFormat(format);
}

// ---------------------------------------------------------------------------
// Helpers: convert UnifiedSearchResult → CSL-JSON
// ---------------------------------------------------------------------------

function parseAuthorName(name: string): { given?: string; family: string } {
  const trimmed = name.trim();
  if (!trimmed) return { family: "Unknown" };

  if (trimmed.includes(",")) {
    const [family, ...rest] = trimmed.split(",").map((s) => s.trim());
    const given = rest.join(" ").trim();
    return given ? { given, family } : { family };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { family: parts[0] };

  // PubMed format: "LastName ForeName" (first token is family)
  // Generic format: "Given ... Family" (last token is family)
  // Since our data comes mainly from PubMed parser where format is "Last First",
  // we treat the first token as family name.
  const family = parts[0];
  const given = parts.slice(1).join(" ");
  return { given, family };
}

function resultToCSLJSON(result: UnifiedSearchResult): Record<string, unknown> {
  const csl: Record<string, unknown> = {
    type: "article-journal",
    title: result.title || "Untitled",
  };

  if (result.authors?.length) {
    csl.author = result.authors
      .filter((a) => typeof a === "string" && a.trim().length > 0)
      .map(parseAuthorName);
  }

  if (result.journal) {
    csl["container-title"] = result.journal;
  }

  if (result.year != null && !isNaN(result.year)) {
    csl.issued = { "date-parts": [[result.year]] };
  }

  if (result.doi) {
    csl.DOI = result.doi;
  }

  if (result.pmid) {
    csl.PMID = result.pmid;
  }

  return csl;
}

function resultToPaperData(result: UnifiedSearchResult): PaperData {
  return {
    title: result.title,
    authors: result.authors,
    journal: result.journal,
    year: result.year,
    doi: result.doi,
  };
}

// ---------------------------------------------------------------------------
// Helpers: generate EndNote Refer format
// ---------------------------------------------------------------------------

function generateEndNote(result: UnifiedSearchResult): string {
  const lines: string[] = [];

  lines.push("%0 Journal Article");
  lines.push(`%T ${result.title}`);

  if (result.authors?.length) {
    for (const author of result.authors) {
      lines.push(`%A ${author}`);
    }
  }

  if (result.journal) {
    lines.push(`%J ${result.journal}`);
  }

  if (result.year) {
    lines.push(`%D ${result.year}`);
  }

  if (result.doi) {
    lines.push(`%R ${result.doi}`);
  }

  if (result.pmid) {
    lines.push(`%M ${result.pmid}`);
  }

  if (result.abstract) {
    lines.push(`%X ${result.abstract}`);
  }

  // End record
  lines.push("");

  return lines.join("\n");
}

function generateEndNoteBatch(results: UnifiedSearchResult[]): string {
  return results.map(generateEndNote).join("\n");
}

// ---------------------------------------------------------------------------
// Helpers: fetch article by PMID
// ---------------------------------------------------------------------------

async function fetchByPmid(pmid: string): Promise<UnifiedSearchResult | null> {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${encodeURIComponent(pmid)}&rettype=xml&retmode=xml&tool=scholarsync&email=contact@scholarsync.com`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const xml = await res.text();

  // Quick check: did PubMed return an article?
  const articleMatch = xml.match(
    /<PubmedArticle>[\s\S]*?<\/PubmedArticle>/
  );
  if (!articleMatch) return null;

  const article = articleMatch[0];

  // Parse with the same logic as pubmed.ts
  const titleMatch = article.match(/<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/);
  const title = titleMatch ? stripXml(titleMatch[1]) : "";
  if (!title) return null;

  const abstractTexts = [
    ...article.matchAll(
      /<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g
    ),
  ];
  const abstract = abstractTexts
    .map((m) => (m[1] ? `${m[1]}: ${stripXml(m[2])}` : stripXml(m[2])))
    .join(" ");

  const authorMatches = [
    ...article.matchAll(
      /<Author[\s\S]*?<LastName>([\s\S]*?)<\/LastName>[\s\S]*?(?:<ForeName>([\s\S]*?)<\/ForeName>)?[\s\S]*?<\/Author>/g
    ),
  ];
  const authors = authorMatches.map((m) => {
    const lastName = stripXml(m[1]);
    const foreName = m[2] ? stripXml(m[2]) : "";
    return foreName ? `${lastName} ${foreName}` : lastName;
  });

  const journalMatch =
    article.match(/<ISOAbbreviation>([\s\S]*?)<\/ISOAbbreviation>/) ||
    article.match(/<Title>([\s\S]*?)<\/Title>/);
  const journal = journalMatch ? stripXml(journalMatch[1]) : "";

  const yearMatch =
    article.match(/<PubDate>[\s\S]*?<Year>([\s\S]*?)<\/Year>/) ||
    article.match(/<PubDate>[\s\S]*?<MedlineDate>([\s\S]*?)<\/MedlineDate>/);
  const yearStr = yearMatch ? stripXml(yearMatch[1]) : "";
  const yearNumMatch = yearStr.match(/(\d{4})/);
  const year = yearNumMatch ? parseInt(yearNumMatch[1], 10) : 0;

  const doiMatch = article.match(
    /<ArticleId IdType="doi">([\s\S]*?)<\/ArticleId>/
  );
  const doi = doiMatch ? stripXml(doiMatch[1]) : undefined;

  const pubTypeMatches = [
    ...article.matchAll(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g),
  ];
  const publicationTypes = pubTypeMatches.map((m) => stripXml(m[1]));

  const meshMatches = [
    ...article.matchAll(/<DescriptorName[^>]*>([\s\S]*?)<\/DescriptorName>/g),
  ];
  const meshTerms = meshMatches.map((m) => stripXml(m[1]));

  const volumeMatch = article.match(/<Volume>([\s\S]*?)<\/Volume>/);
  const issueMatch = article.match(/<Issue>([\s\S]*?)<\/Issue>/);
  const pagesMatch = article.match(/<MedlinePgn>([\s\S]*?)<\/MedlinePgn>/);

  return {
    title,
    authors,
    journal,
    year,
    doi,
    pmid,
    abstract: abstract || undefined,
    citationCount: 0,
    publicationTypes,
    meshTerms,
    isOpenAccess: false,
    sources: ["pubmed"],
    // Include volume/issue/pages in a way we can use later if needed
    ...(volumeMatch ? {} : {}),
    ...(issueMatch ? {} : {}),
    ...(pagesMatch ? {} : {}),
  };
}

function stripXml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Format a single result into the requested file format
// ---------------------------------------------------------------------------

function formatResultToFile(
  result: UnifiedSearchResult,
  format: FileFormat
): string {
  if (format === "nbib") {
    return generateNbib(result);
  }

  if (format === "endnote") {
    return generateEndNote(result);
  }

  // BibTeX and RIS: use citation-js
  const cslData = resultToCSLJSON(result);
  const cite = new Cite([cslData]);

  if (format === "bibtex") {
    return cite.format("bibtex") as string;
  }

  // RIS
  return cite.format("ris") as string;
}

function formatResultsToFile(
  results: UnifiedSearchResult[],
  format: FileFormat
): string {
  if (format === "nbib") {
    return generateNbibBatch(results);
  }

  if (format === "endnote") {
    return generateEndNoteBatch(results);
  }

  // BibTeX and RIS: use citation-js with all results
  const cslData = results.map(resultToCSLJSON);
  const cite = new Cite(cslData);

  if (format === "bibtex") {
    return cite.format("bibtex") as string;
  }

  return cite.format("ris") as string;
}

// ---------------------------------------------------------------------------
// Build file download response
// ---------------------------------------------------------------------------

function fileResponse(content: string, format: FileFormat): Response {
  const { contentType, filename } = FILE_FORMATS[format];

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

// ---------------------------------------------------------------------------
// GET handler — single citation export via query params
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");
  const pmid = searchParams.get("pmid");
  const doi = searchParams.get("doi");

  if (!format) {
    return NextResponse.json(
      { error: "Missing required query parameter: format" },
      { status: 400 }
    );
  }

  if (!isValidFormat(format)) {
    return NextResponse.json(
      {
        error: `Unsupported format "${format}". Supported: bibtex, ris, nbib, endnote, apa, mla, chicago, vancouver, harvard`,
      },
      { status: 400 }
    );
  }

  if (!pmid && !doi) {
    return NextResponse.json(
      { error: "At least one of pmid or doi must be provided" },
      { status: 400 }
    );
  }

  try {
    // Resolve the citation data
    let result: UnifiedSearchResult | null = null;

    if (pmid) {
      result = await fetchByPmid(pmid);
      if (!result) {
        return NextResponse.json(
          { error: `PMID ${pmid} not found` },
          { status: 404 }
        );
      }
    } else if (doi) {
      // Use citation-js to resolve DOI via CrossRef
      try {
        const cite = await Cite.async(doi);
        const cslData = cite.data[0];

        if (!cslData) {
          return NextResponse.json(
            { error: `Could not resolve DOI: ${doi}` },
            { status: 404 }
          );
        }

        // Convert CSL-JSON back to UnifiedSearchResult for consistent handling
        const authors: string[] = (
          cslData.author || []
        ).map(
          (a: { family?: string; given?: string }) =>
            a.given ? `${a.family || ""} ${a.given}` : a.family || "Unknown"
        );

        const year =
          cslData.issued?.["date-parts"]?.[0]?.[0] || 0;

        result = {
          title: cslData.title || "Untitled",
          authors,
          journal:
            cslData["container-title"] ||
            cslData["container-title-short"] ||
            "",
          year: typeof year === "number" ? year : parseInt(year, 10) || 0,
          doi: cslData.DOI || doi,
          pmid: cslData.PMID || undefined,
          abstract: cslData.abstract || undefined,
          citationCount: 0,
          publicationTypes: cslData.type ? [cslData.type] : [],
          isOpenAccess: false,
          sources: ["crossref"],
        };
      } catch {
        return NextResponse.json(
          { error: `Failed to resolve DOI: ${doi}. The DOI may be invalid or the CrossRef service is unavailable.` },
          { status: 502 }
        );
      }
    }

    if (!result) {
      return NextResponse.json(
        { error: "Could not resolve citation data" },
        { status: 404 }
      );
    }

    // Text format: return plain text citation
    if (isTextFormat(format)) {
      const paper = resultToPaperData(result);
      const text = formatCitation(paper, format as CitationStyle);
      return new Response(text, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // File format: return downloadable file
    const content = formatResultToFile(result, format);
    return fileResponse(content, format);
  } catch (error) {
    console.error("Citation export error:", error);
    return NextResponse.json(
      { error: "Internal server error during citation export" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST handler — batch export or single export with body data
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const format: string | undefined =
      body.format || new URL(req.url).searchParams.get("format");

    if (!format) {
      return NextResponse.json(
        { error: "Missing required field: format" },
        { status: 400 }
      );
    }

    if (!isValidFormat(format)) {
      return NextResponse.json(
        {
          error: `Unsupported format "${format}". Supported: bibtex, ris, nbib, endnote, apa, mla, chicago, vancouver, harvard`,
        },
        { status: 400 }
      );
    }

    // Batch export: { results: UnifiedSearchResult[], format: string }
    if (body.results && Array.isArray(body.results)) {
      const results: UnifiedSearchResult[] = body.results;

      if (results.length === 0) {
        return NextResponse.json(
          { error: "results array is empty" },
          { status: 400 }
        );
      }

      if (isTextFormat(format)) {
        const text = results
          .map((r) => formatCitation(resultToPaperData(r), format as CitationStyle))
          .join("\n\n");
        return new Response(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const content = formatResultsToFile(results, format);
      return fileResponse(content, format);
    }

    // Single export from body data: { data: UnifiedSearchResult, format: string }
    if (body.data) {
      const result: UnifiedSearchResult = body.data;

      if (isTextFormat(format)) {
        const paper = resultToPaperData(result);
        const text = formatCitation(paper, format as CitationStyle);
        return new Response(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const content = formatResultToFile(result, format);
      return fileResponse(content, format);
    }

    return NextResponse.json(
      { error: "Request body must include either 'results' (array) or 'data' (single result)" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Citation export POST error:", error);
    return NextResponse.json(
      { error: "Internal server error during citation export" },
      { status: 500 }
    );
  }
}
