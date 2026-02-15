/**
 * CSL Processor — wraps citation-js to produce formatted citations
 * and bibliography entries from reference data.
 *
 * Uses the citation-js library already installed in the project.
 * For v1, supports Vancouver (numeric) formatting.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { Cite, plugins } = require("@citation-js/core");
require("@citation-js/plugin-csl");
/* eslint-enable @typescript-eslint/no-require-imports */

import type {
  Reference,
  CSLItem,
  FormattedBibliographyEntry,
  CitationStyleId,
} from "@/types/citation";
import { referenceToCsl } from "./reference-utils";

// Style template mapping
const STYLE_MAP: Record<CitationStyleId, string> = {
  vancouver: "vancouver",
  apa: "apa",
  ama: "vancouver", // AMA is close to Vancouver; use vancouver for v1
  icmje: "vancouver", // ICMJE follows Vancouver
  harvard: "harvard1",
  "chicago-author-date": "apa", // Close enough for v1
  ieee: "vancouver", // IEEE is numeric like Vancouver
};

/**
 * Process citations and produce formatted bibliography entries.
 *
 * @param references - All references in the document
 * @param orderedRefIds - Reference IDs in citation order (order of first appearance)
 * @param styleId - Citation style to use
 */
export function processBibliography(
  references: Map<string, Reference>,
  orderedRefIds: string[],
  styleId: CitationStyleId = "vancouver"
): FormattedBibliographyEntry[] {
  if (orderedRefIds.length === 0) return [];

  const template = STYLE_MAP[styleId] || "vancouver";

  const entries: FormattedBibliographyEntry[] = [];

  for (const refId of orderedRefIds) {
    const ref = references.get(refId);
    if (!ref) continue;

    try {
      const cslData = referenceToCsl(ref);
      const cite = new Cite([cslData]);

      const html: string = cite
        .format("bibliography", {
          format: "html",
          template,
          lang: "en-US",
        })
        .trim();

      const text: string = cite
        .format("bibliography", {
          format: "text",
          template,
          lang: "en-US",
        })
        .trim();

      entries.push({ id: refId, html, text });
    } catch (err) {
      // Fallback: produce a basic text entry
      entries.push({
        id: refId,
        html: `<span>${escapeHtml(ref.title)}</span>`,
        text: ref.title,
      });
    }
  }

  return entries;
}

/**
 * Format a single in-text citation string.
 */
export function formatInlineCitation(
  ref: Reference,
  styleId: CitationStyleId = "vancouver",
  number?: number
): string {
  const isNumeric =
    styleId === "vancouver" ||
    styleId === "ama" ||
    styleId === "icmje" ||
    styleId === "ieee";

  if (isNumeric && number !== undefined) {
    return `[${number}]`;
  }

  try {
    const template = STYLE_MAP[styleId] || "vancouver";
    const cslData = referenceToCsl(ref);
    const cite = new Cite([cslData]);

    const result: string = cite
      .format("citation", {
        format: "text",
        template,
        lang: "en-US",
      })
      .trim();

    return result;
  } catch {
    return isNumeric ? "[?]" : `(${ref.authors[0]?.family || "?"}, ${ref.year || "n.d."})`;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
