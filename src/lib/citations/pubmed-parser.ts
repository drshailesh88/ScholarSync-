/**
 * Parse PubMed XML (efetch) responses into Reference objects.
 *
 * This module handles the XML format returned by the NCBI E-utilities
 * efetch endpoint for PubMed records.
 */
import type { Reference, Author, CSLItem } from "@/types/citation";

/**
 * Parse a PubMed efetch XML response into an array of Reference objects.
 */
export function parsePubMedXml(
  xml: string,
  documentId: string
): Reference[] {
  const references: Reference[] = [];

  // Split into individual articles
  const articleMatches = xml.match(
    /<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g
  );
  if (!articleMatches) return references;

  for (const articleXml of articleMatches) {
    const ref = parseArticle(articleXml, documentId);
    if (ref) references.push(ref);
  }

  return references;
}

function parseArticle(
  xml: string,
  documentId: string
): Reference | null {
  const pmid = extractText(xml, "PMID");
  const title = extractText(xml, "ArticleTitle") || "Untitled";
  const abstractText = extractText(xml, "AbstractText");
  const journal =
    extractText(xml, "ISOAbbreviation") || extractText(xml, "Title");
  const volume = extractText(xml, "Volume");
  const issue = extractText(xml, "Issue");
  const doi = extractDoi(xml);

  // Pages
  const medlinePgn = extractText(xml, "MedlinePgn");

  // Year
  const year = extractYear(xml);

  // Authors
  const authors = extractAuthors(xml);

  // PMCID
  const pmcid = extractPmcid(xml);

  const id = `ref_${pmid || Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const cslData: CSLItem = {
    id,
    type: "article-journal",
    title: cleanHtml(title),
    author: authors.map((a) => ({ given: a.given, family: a.family })),
    "container-title": journal || undefined,
    volume: volume || undefined,
    issue: issue || undefined,
    page: medlinePgn || undefined,
    DOI: doi || undefined,
    PMID: pmid || undefined,
    PMCID: pmcid || undefined,
  };

  if (year) {
    cslData.issued = { "date-parts": [[year]] };
  }

  return {
    id,
    documentId,
    type: "article",
    title: cleanHtml(title),
    authors,
    year: year || 0,
    journal: journal || undefined,
    volume: volume || undefined,
    issue: issue || undefined,
    pages: medlinePgn || undefined,
    doi: doi || undefined,
    pmid: pmid || undefined,
    pmcid: pmcid || undefined,
    abstract: abstractText ? cleanHtml(abstractText) : undefined,
    dateAdded: new Date().toISOString(),
    cslData,
  };
}

function extractText(xml: string, tag: string): string | null {
  const match = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  );
  return match ? cleanHtml(match[1].trim()) : null;
}

function extractAuthors(xml: string): Author[] {
  const authors: Author[] = [];
  const authorListMatch = xml.match(
    /<AuthorList[\s\S]*?<\/AuthorList>/
  );
  if (!authorListMatch) return authors;

  const authorMatches = authorListMatch[0].match(
    /<Author[\s\S]*?<\/Author>/g
  );
  if (!authorMatches) return authors;

  for (const authorXml of authorMatches) {
    const family =
      extractText(authorXml, "LastName") ||
      extractText(authorXml, "CollectiveName");
    const given =
      extractText(authorXml, "ForeName") ||
      extractText(authorXml, "Initials") ||
      "";

    if (family) {
      authors.push({ given, family });
    }
  }

  return authors;
}

function extractYear(xml: string): number | null {
  // Try PubDate first
  const pubDateMatch = xml.match(
    /<PubDate>[\s\S]*?<\/PubDate>/
  );
  if (pubDateMatch) {
    const yearStr = extractText(pubDateMatch[0], "Year");
    if (yearStr) return parseInt(yearStr, 10);

    // Try MedlineDate format (e.g., "2020 Jan-Feb")
    const medlineDate = extractText(pubDateMatch[0], "MedlineDate");
    if (medlineDate) {
      const yearMatch = medlineDate.match(/(\d{4})/);
      if (yearMatch) return parseInt(yearMatch[1], 10);
    }
  }

  return null;
}

function extractDoi(xml: string): string | null {
  // Look for DOI in ELocationID
  const doiMatch = xml.match(
    /<ELocationID\s+EIdType="doi"[^>]*>([^<]+)<\/ELocationID>/
  );
  if (doiMatch) return doiMatch[1].trim();

  // Also check ArticleId
  const articleIdMatch = xml.match(
    /<ArticleId\s+IdType="doi">([^<]+)<\/ArticleId>/
  );
  if (articleIdMatch) return articleIdMatch[1].trim();

  return null;
}

function extractPmcid(xml: string): string | null {
  const match = xml.match(
    /<ArticleId\s+IdType="pmc">([^<]+)<\/ArticleId>/
  );
  return match ? match[1].trim() : null;
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
