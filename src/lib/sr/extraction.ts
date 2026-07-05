import type { ExtractionField, ExtractionState } from "./types";

export interface ExtractionSection {
  name: string;
  fields: ExtractionField[];
}

export interface ExtractionGrid {
  sections: ExtractionSection[];
  conflictCount: number;
}

/** The resolved Final cell for a field: AI value, human value, or unresolved. */
export type FinalCell =
  | { value: string; kind: "ai"; sourceQuote: string }
  | { value: string; kind: "resolved" }
  | { value: null; kind: "conflict" };

/** What the Final column shows for a field. */
export function resolveFinal(field: ExtractionField): FinalCell {
  if (field.finalValue !== undefined) {
    return { value: field.finalValue, kind: "resolved" };
  }
  if (field.conflict) {
    return { value: null, kind: "conflict" };
  }
  return {
    value: field.aiFinal?.value ?? field.reviewer1,
    kind: "ai",
    sourceQuote: field.aiFinal?.sourceQuote ?? "",
  };
}

/** Group extraction fields into their sections and count open conflicts. */
export function deriveExtractionGrid(
  extraction: ExtractionState,
): ExtractionGrid {
  const sections: ExtractionSection[] = [];
  for (const field of extraction.fields) {
    let section = sections.find((s) => s.name === field.section);
    if (!section) {
      section = { name: field.section, fields: [] };
      sections.push(section);
    }
    section.fields.push(field);
  }

  const conflictCount = extraction.fields.filter(
    (field) => field.conflict && field.finalValue === undefined,
  ).length;

  return { sections, conflictCount };
}
