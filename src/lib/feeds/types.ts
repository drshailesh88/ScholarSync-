// ── Feed Parser Types ────────────────────────────────────────────────

export interface ParsedArticle {
  guid: string;
  title: string;
  authors: string | null;
  abstractSnippet: string | null;
  link: string | null;
  doi: string | null;
  pubmedId: string | null;
  publishedAt: Date | null;
  imageUrl: string | null;
  contentHtml: string | null;
  journal: string | null;
  volume: string | null;
  issue: string | null;
}

export interface ParsedFeed {
  title: string;
  description: string | null;
  siteUrl: string | null;
  feedType: "rss" | "atom" | "json_feed" | "pubmed_search";
  articles: ParsedArticle[];
}
