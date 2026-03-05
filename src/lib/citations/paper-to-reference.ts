import type { Author, CSLItem, Reference } from "@/types/citation";

export interface LibraryPaper {
  id: number;
  title: string;
  authors: unknown;
  journal: string | null;
  year: number | null;
  doi: string | null;
  pmid?: string | null;
  pubmed_id?: string | null;
  abstract: string | null;
  study_type: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
  pdf_url: string | null;
  open_access_url: string | null;
}

function parseAuthors(raw: unknown): Author[] {
  if (!raw || !Array.isArray(raw)) return [];

  return raw.map((a) => {
    if (typeof a === "string") {
      const parts = a.includes(",")
        ? a.split(",").map((s) => s.trim())
        : a.split(/\s+/).map((s) => s.trim());

      if (parts.length === 0 || !parts[0]) {
        return { family: "Unknown", given: "" };
      }

      if (parts.length === 1) {
        return { family: parts[0], given: "" };
      }

      if (a.includes(",")) {
        return { family: parts[0], given: parts[1] || "" };
      }

      // Common "Given Family" fallback
      return {
        family: parts[parts.length - 1] || "",
        given: parts.slice(0, -1).join(" "),
      };
    }

    if (typeof a === "object" && a !== null) {
      const obj = a as Record<string, unknown>;
      const family =
        (typeof obj.family === "string" && obj.family) ||
        (typeof obj.lastName === "string" && obj.lastName) ||
        (typeof obj.name === "string" && obj.name) ||
        "Unknown";
      const given =
        (typeof obj.given === "string" && obj.given) ||
        (typeof obj.firstName === "string" && obj.firstName) ||
        "";

      return { family, given };
    }

    return { family: String(a), given: "" };
  });
}

export function inferReferenceType(studyType: string | null): Reference["type"] {
  if (!studyType) return "article";
  const st = studyType.toLowerCase();
  if (st.includes("book")) return "book";
  if (st.includes("conference")) return "conference";
  if (st.includes("thesis") || st.includes("dissertation")) return "thesis";
  if (st.includes("preprint")) return "preprint";
  if (st.includes("guideline")) return "guideline";
  return "article";
}

export function paperToReference(paper: LibraryPaper, documentId: string): Reference {
  const authors = parseAuthors(paper.authors);
  const id = `ref-paper-${paper.id}`;
  const pmid = paper.pmid || paper.pubmed_id || undefined;

  const cslData: CSLItem = {
    id,
    type: "article-journal",
    title: paper.title,
    author: authors.map((a) => ({
      family: a.family,
      given: a.given,
    })),
    issued: paper.year ? { "date-parts": [[paper.year]] } : undefined,
    "container-title": paper.journal || undefined,
    volume: paper.volume || undefined,
    issue: paper.issue || undefined,
    page: paper.pages || undefined,
    DOI: paper.doi || undefined,
    PMID: pmid,
    abstract: paper.abstract || undefined,
  };

  return {
    id,
    documentId,
    type: inferReferenceType(paper.study_type),
    title: paper.title,
    authors,
    year: paper.year || 0,
    journal: paper.journal || undefined,
    volume: paper.volume || undefined,
    issue: paper.issue || undefined,
    pages: paper.pages || undefined,
    doi: paper.doi || undefined,
    pmid,
    abstract: paper.abstract || undefined,
    pdfUrl: paper.pdf_url || paper.open_access_url || undefined,
    dateAdded: new Date().toISOString(),
    cslData,
  };
}
