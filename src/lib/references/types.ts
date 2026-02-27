// ============================================================================
// Reference Types — shared between client and server code
// ============================================================================

export type ReferenceType =
  | "article"
  | "book"
  | "chapter"
  | "conference"
  | "thesis"
  | "other";

export interface ParsedReference {
  id: string;
  title: string;
  authors: string[]; // ["Smith, J.", "Doe, A."]
  year: number;
  journal?: string;
  doi?: string;
  abstract?: string;
  type: ReferenceType;
  volume?: string;
  issue?: string;
  pages?: string;
  publisher?: string;
  url?: string;
  rawCsl?: Record<string, unknown>;
}
