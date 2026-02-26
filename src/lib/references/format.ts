// ============================================================================
// Reference Formatting Utilities — client-safe (no citation-js dependency)
// ============================================================================

import type { ParsedReference } from "./types";

/**
 * Format ParsedReference[] as a content string suitable for
 * the presentation preprocessor.
 */
export function formatReferencesAsContent(refs: ParsedReference[]): string {
  return refs
    .map((ref, i) => {
      const authorStr = ref.authors.length > 0 ? ref.authors.join(", ") : "Unknown";
      const journalStr = ref.journal ? `Journal: ${ref.journal}` : "";
      const doiStr = ref.doi ? `DOI: ${ref.doi}` : "";
      const abstractStr = ref.abstract
        ? `Abstract: ${ref.abstract}`
        : "";

      return [
        `--- Reference ${i + 1}: ${ref.title} ---`,
        `Authors: ${authorStr}`,
        `Year: ${ref.year || "Unknown"}`,
        journalStr,
        doiStr,
        abstractStr,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}
