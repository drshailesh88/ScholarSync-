/**
 * Generate NBIB (MEDLINE) format from a UnifiedSearchResult.
 * NBIB is the native PubMed citation format, widely supported by
 * reference managers (Zotero, Mendeley, EndNote).
 *
 * Format spec: https://www.nlm.nih.gov/bsd/mms/medlineelements.html
 */

import type { UnifiedSearchResult } from "@/types/search";

/**
 * Convert an author name to MEDLINE "Last FM" format.
 *
 * Input formats handled:
 *   - "Smith John"      -> "Smith J"
 *   - "Smith, John"     -> "Smith J"
 *   - "Smith John M"    -> "Smith JM"
 *   - "Smith"           -> "Smith"
 */
function toMedlineAuthor(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "Unknown";

  let family: string;
  let given: string;

  if (trimmed.includes(",")) {
    const [f, ...rest] = trimmed.split(",").map((s) => s.trim());
    family = f;
    given = rest.join(" ").trim();
  } else {
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) return parts[0];
    // PubMed author format from the parser is "LastName ForeName" (e.g. "Smith John")
    family = parts[0];
    given = parts.slice(1).join(" ");
  }

  if (!given) return family;

  // Build initials from given name parts
  const initials = given
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return `${family} ${initials}`;
}

/**
 * Generate a single NBIB record from a UnifiedSearchResult.
 */
export function generateNbib(result: UnifiedSearchResult): string {
  const lines: string[] = [];

  if (result.pmid) {
    lines.push(`PMID- ${result.pmid}`);
  }

  lines.push(`TI  - ${result.title}`);

  if (result.authors && result.authors.length > 0) {
    for (const author of result.authors) {
      lines.push(`AU  - ${toMedlineAuthor(author)}`);
    }
  }

  if (result.abstract) {
    lines.push(`AB  - ${result.abstract}`);
  }

  if (result.journal) {
    lines.push(`TA  - ${result.journal}`);
  }

  if (result.year) {
    lines.push(`DP  - ${result.year}`);
  }

  if (result.doi) {
    lines.push(`AID - ${result.doi} [doi]`);
  }

  if (result.publicationTypes && result.publicationTypes.length > 0) {
    for (const pt of result.publicationTypes) {
      lines.push(`PT  - ${pt}`);
    }
  }

  if (result.meshTerms && result.meshTerms.length > 0) {
    for (const mesh of result.meshTerms) {
      lines.push(`MH  - ${mesh}`);
    }
  }

  // End each record with a blank line
  lines.push("");

  return lines.join("\n");
}

/**
 * Generate NBIB content for multiple results.
 */
export function generateNbibBatch(results: UnifiedSearchResult[]): string {
  return results.map(generateNbib).join("\n");
}
