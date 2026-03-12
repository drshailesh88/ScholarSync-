import type { Reference } from "@/types/citation";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cloneAuthors(authors: Reference["authors"]): Reference["authors"] {
  return Array.isArray(authors)
    ? authors.map((author) => ({
        given: typeof author?.given === "string" ? author.given : "",
        family:
          typeof author?.family === "string" && author.family.trim()
            ? author.family
            : "Unknown",
      }))
    : [];
}

function cloneCslData(cslData: Reference["cslData"]): Reference["cslData"] {
  return {
    ...cslData,
    author: Array.isArray(cslData.author)
      ? cslData.author.map((author) => ({
          given: typeof author?.given === "string" ? author.given : undefined,
          family:
            typeof author?.family === "string" && author.family.trim()
              ? author.family
              : "Unknown",
        }))
      : undefined,
    issued:
      cslData.issued &&
      Array.isArray(cslData.issued["date-parts"])
        ? {
            "date-parts": cslData.issued["date-parts"].map((part) =>
              Array.isArray(part) ? part.map((value) => Number(value) || 0) : []
            ),
          }
        : undefined,
  };
}

export function cloneReference(
  reference: Reference,
  fallbackDocumentId?: string
): Reference {
  return {
    ...reference,
    documentId: reference.documentId || fallbackDocumentId || "default",
    authors: cloneAuthors(reference.authors),
    year: Number.isFinite(reference.year) ? reference.year : 0,
    keywords: Array.isArray(reference.keywords)
      ? [...reference.keywords]
      : undefined,
    tags: Array.isArray(reference.tags) ? [...reference.tags] : undefined,
    dateAdded: reference.dateAdded || new Date().toISOString(),
    cslData: cloneCslData(reference.cslData),
  };
}

function normalizeReference(
  value: unknown,
  fallbackDocumentId: string
): Reference | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === "string" ? value.id.trim() : "";
  const title = typeof value.title === "string" ? value.title.trim() : "";
  if (!id || !title) return null;

  const cslData = isRecord(value.cslData)
    ? (value.cslData as Reference["cslData"])
    : {
        id,
        type: "article-journal",
        title,
      };

  const reference: Reference = {
    id,
    documentId:
      typeof value.documentId === "string" && value.documentId.trim()
        ? value.documentId
        : fallbackDocumentId,
    type:
      typeof value.type === "string"
        ? (value.type as Reference["type"])
        : "article",
    title,
    authors: cloneAuthors(
      Array.isArray(value.authors) ? (value.authors as Reference["authors"]) : []
    ),
    year:
      typeof value.year === "number"
        ? value.year
        : Number.parseInt(String(value.year ?? "0"), 10) || 0,
    journal: typeof value.journal === "string" ? value.journal : undefined,
    volume: typeof value.volume === "string" ? value.volume : undefined,
    issue: typeof value.issue === "string" ? value.issue : undefined,
    pages: typeof value.pages === "string" ? value.pages : undefined,
    doi: typeof value.doi === "string" ? value.doi : undefined,
    pmid: typeof value.pmid === "string" ? value.pmid : undefined,
    pmcid: typeof value.pmcid === "string" ? value.pmcid : undefined,
    url: typeof value.url === "string" ? value.url : undefined,
    publisher:
      typeof value.publisher === "string" ? value.publisher : undefined,
    abstract: typeof value.abstract === "string" ? value.abstract : undefined,
    keywords: Array.isArray(value.keywords)
      ? value.keywords.filter(
          (keyword): keyword is string => typeof keyword === "string"
        )
      : undefined,
    notes: typeof value.notes === "string" ? value.notes : undefined,
    tags: Array.isArray(value.tags)
      ? value.tags.filter((tag): tag is string => typeof tag === "string")
      : undefined,
    pdfUrl: typeof value.pdfUrl === "string" ? value.pdfUrl : undefined,
    dateAdded:
      typeof value.dateAdded === "string" && value.dateAdded
        ? value.dateAdded
        : new Date().toISOString(),
    cslData: cloneCslData(cslData),
  };

  return cloneReference(reference, fallbackDocumentId);
}

function visitCitationNodes(
  node: unknown,
  fallbackDocumentId: string,
  collected: Map<string, Reference>
) {
  if (Array.isArray(node)) {
    node.forEach((item) =>
      visitCitationNodes(item, fallbackDocumentId, collected)
    );
    return;
  }

  if (!isRecord(node)) return;

  if (node.type === "citation") {
    const attrs = isRecord(node.attrs) ? node.attrs : null;
    const snapshots = attrs?.referenceSnapshots;
    if (Array.isArray(snapshots)) {
      for (const snapshot of snapshots) {
        const normalized = normalizeReference(snapshot, fallbackDocumentId);
        if (normalized) {
          collected.set(normalized.id, normalized);
        }
      }
    }
  }

  if (Array.isArray(node.content)) {
    visitCitationNodes(node.content, fallbackDocumentId, collected);
  }
}

export function extractReferencesFromContent(
  content: unknown,
  fallbackDocumentId: string
): Reference[] {
  const collected = new Map<string, Reference>();
  visitCitationNodes(content, fallbackDocumentId, collected);
  return Array.from(collected.values());
}
