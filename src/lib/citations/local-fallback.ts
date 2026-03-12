import type { LibraryPaper } from "@/lib/citations/paper-to-reference";
import type { Reference } from "@/types/citation";

const LOCAL_LIBRARY_PAPERS: LibraryPaper[] = [
  {
    id: 101,
    title: "Local Evidence Synthesis Methods for Browser-Based QA",
    authors: [
      { given: "Maya", family: "Nguyen" },
      { given: "Jon", family: "Patel" },
    ],
    journal: "Journal of Local QA",
    year: 2024,
    doi: "10.1000/local-library-101",
    pmid: "37654789",
    pubmed_id: "37654789",
    abstract: "A local fallback paper used to exercise library citation flows in development.",
    study_type: "review",
    volume: "12",
    issue: "2",
    pages: "101-110",
    pdf_url: null,
    open_access_url: null,
  },
  {
    id: 102,
    title: "Practical Browser Automation for Research Workflows",
    authors: [
      { given: "Ada", family: "Lovelace" },
      { given: "Grace", family: "Hopper" },
    ],
    journal: "Studio Testing Quarterly",
    year: 2025,
    doi: "10.1000/local-library-102",
    pmid: "37654790",
    pubmed_id: "37654790",
    abstract: "A second local fallback paper for Library tab and reference-sidebar testing.",
    study_type: "article",
    volume: "7",
    issue: "4",
    pages: "33-41",
    pdf_url: null,
    open_access_url: null,
  },
];

export function buildLocalLibraryPapers(query: string): LibraryPaper[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return LOCAL_LIBRARY_PAPERS;
  }

  return LOCAL_LIBRARY_PAPERS.filter((paper) => {
    const authors = Array.isArray(paper.authors)
      ? paper.authors
          .map((author) =>
            typeof author === "string"
              ? author
              : [author.given, author.family].filter(Boolean).join(" ")
          )
          .join(" ")
      : "";

    return [paper.title, paper.journal ?? "", authors]
      .join(" ")
      .toLowerCase()
      .includes(trimmed);
  });
}

export function buildLocalResolvedReference(
  identifier: string,
  documentId: string,
): Reference {
  const cleanIdentifier = identifier.trim();
  const isPmid = /^\d{1,8}$/.test(cleanIdentifier);
  const title = isPmid
    ? `Resolved PMID Reference ${cleanIdentifier}`
    : `Resolved DOI Reference ${cleanIdentifier}`;
  const year = 2024;

  return {
    id: `ref_local_${cleanIdentifier.replace(/[^a-zA-Z0-9]+/g, "_")}`,
    documentId,
    type: "article",
    title,
    authors: [
      { given: "Alex", family: "Mercer" },
      { given: "Riley", family: "Chen" },
    ],
    year,
    journal: isPmid ? "PubMed Fallback Journal" : "Crossref Fallback Journal",
    volume: "18",
    issue: "3",
    pages: "210-219",
    doi: isPmid ? undefined : cleanIdentifier,
    pmid: isPmid ? cleanIdentifier : undefined,
    abstract: "A deterministic local fallback reference used when external resolution is unavailable in development.",
    dateAdded: new Date().toISOString(),
    cslData: {
      id: `ref_local_${cleanIdentifier.replace(/[^a-zA-Z0-9]+/g, "_")}`,
      type: "article-journal",
      title,
      author: [
        { given: "Alex", family: "Mercer" },
        { given: "Riley", family: "Chen" },
      ],
      issued: { "date-parts": [[year]] },
      "container-title": isPmid ? "PubMed Fallback Journal" : "Crossref Fallback Journal",
      volume: "18",
      issue: "3",
      page: "210-219",
      DOI: isPmid ? undefined : cleanIdentifier,
      PMID: isPmid ? cleanIdentifier : undefined,
      abstract: "A deterministic local fallback reference used when external resolution is unavailable in development.",
    },
  };
}
