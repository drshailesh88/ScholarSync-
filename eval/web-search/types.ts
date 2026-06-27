export type WebTab = "web" | "news" | "discussions";

export type QueryClass =
  | "mainstream"
  | "recency"
  | "methodology"
  | "niche"
  | "adversarial";

/** A hand-ratified ideal result. Matched by canonical URL, or domain (+ optional title fragment). */
export interface WebMustHave {
  label: string;
  url?: string;
  domain?: string;
  titleIncludes?: string[];
  /** Provenance of this ground-truth entry, for audit. */
  rule: "authority" | "consensus";
}

export interface WebBenchmarkQuery {
  id: string;
  tab: WebTab;
  queryClass: QueryClass;
  query: string;
  intent: string;
  recencyBiased: boolean;
  mustHaves: WebMustHave[];
}

/** Compact opponent (Exa) snapshot row — the common fields the packet/scorer use. */
export interface ExaFixtureItem {
  rank: number;
  title: string;
  url: string;
  domain: string | null;
  publishedDate: string | null;
  snippet: string | null;
}

/** Identical-format row used when rendering either engine (blinding-safe common fields). */
export interface CommonRow {
  title: string;
  url: string;
  domain: string | null;
  publishedDate: string | null;
  snippet: string | null;
}
