import type { Reference, Author, CSLItem } from "@/types/citation";
import type { HandoffSourcePayload } from "./editor-handoff";
import { parseLibraryId } from "./types";

/**
 * Convert a handoff source payload into a Reference object
 * that the editor's reference system can use.
 *
 * ID scheme matches paper-to-reference.ts: "ref-paper-{id}" or "ref-web-{id}"
 * Author parsing matches the existing PubMed-style heuristic.
 */
export function handoffSourceToReference(
  source: HandoffSourcePayload,
  documentId: string
): Reference {
  // BUG #8 fix: Use same ID scheme as paperToReference ("ref-paper-42" not "ref-paper_42")
  const parsed = parseLibraryId(source.libraryId);
  const id = `ref-${parsed.type}-${parsed.id}`;

  // BUG #7 fix: Port the PubMed-style author parsing from paper-to-reference.ts
  const authors: Author[] = (source.authors ?? []).map((name) => {
    if (typeof name !== "string" || !name.trim()) {
      return { family: "Unknown", given: "" };
    }

    const parts = name.includes(",")
      ? name.split(",").map((s) => s.trim())
      : name.split(/\s+/).map((s) => s.trim());

    if (parts.length === 0 || !parts[0]) {
      return { family: "Unknown", given: "" };
    }

    if (parts.length === 1) {
      return { family: parts[0], given: "" };
    }

    // "Family, Given" format
    if (name.includes(",")) {
      return { family: parts[0], given: parts[1] || "" };
    }

    // PubMed style: "Family Initials" (e.g. "Smith J", "Smith JA")
    if (
      parts.length >= 2 &&
      /^[A-Za-z][A-Za-z'-]*$/.test(parts[0]) &&
      /^[A-Z.\-]{1,6}$/.test(parts.slice(1).join(""))
    ) {
      return { family: parts[0], given: parts.slice(1).join(" ") };
    }

    // Fallback: "Given Family"
    return { family: parts[parts.length - 1], given: parts.slice(0, -1).join(" ") };
  });

  const cslData: CSLItem = {
    id,
    type: source.sourceType === "paper" ? "article-journal" : "webpage",
    title: source.title,
    author: authors.map((a) => ({ family: a.family, given: a.given })),
    issued: source.year ? { "date-parts": [[source.year]] } : undefined,
    "container-title": source.journal || undefined,
    DOI: source.doi || undefined,
    URL: source.url || undefined,
  };

  return {
    id,
    documentId,
    type: source.sourceType === "paper" ? "article" : "website",
    title: source.title,
    authors,
    year: source.year || 0,
    journal: source.journal,
    doi: source.doi,
    url: source.url,
    dateAdded: new Date().toISOString(),
    cslData,
  };
}
