// ============================================================================
// Journal Feed — Shared Types
// ============================================================================

export interface FeedSource {
  id: number;
  title: string;
  description: string | null;
  feedUrl: string;
  siteUrl: string | null;
  faviconUrl: string | null;
  feedType: "rss" | "atom" | "json_feed" | "pubmed_search";
  status: "active" | "paused" | "error" | "dead";
  category: string | null;
  specialty: string | null;
  publisher: string | null;
  issn: string | null;
  isCurated: boolean;
  articleCount: number;
  lastFetchedAt: Date | null;
  lastSuccessAt: Date | null;
  consecutiveFailures: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedArticle {
  id: number;
  feedSourceId: number;
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
  createdAt: Date;
}

export interface FeedSubscription {
  id: number;
  feedSourceId: number;
  folder: string | null;
  displayName: string | null;
  isMuted: boolean;
  notifyOnNew: boolean;
  addedAt: Date;
  feedSource: FeedSource;
  unreadCount: number;
}

export interface FeedArticleWithStatus extends FeedArticle {
  isRead: boolean;
  isStarred: boolean;
  isSavedToLibrary: boolean;
  savedPaperId: number | null;
  feedSourceTitle: string;
  feedSourceFaviconUrl: string | null;
  feedSourceSiteUrl?: string | null;
}

export interface JournalDirectoryEntry {
  title: string;
  feedUrl: string;
  siteUrl: string;
  publisher: string;
  category: string;
  specialty: string;
  issn?: string;
  description?: string;
}
