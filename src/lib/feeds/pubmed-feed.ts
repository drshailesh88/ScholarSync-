import { resilientFetch } from "@/lib/http/resilient-fetch";

// ── Types ───────────────────────────────────────────────────────────

export interface PubMedFeedResult {
  /** The RSS feed URL that can be polled for new articles */
  feedUrl: string;
  /** Human-readable title for the feed subscription */
  title: string;
  /** The original search query */
  query: string;
  /** Number of existing results matching this query */
  totalResults: number;
}

interface ESearchResponse {
  esearchresult: {
    count: string;
    webenv: string;
    querykey: string;
    idlist: string[];
  };
}

// ── Constants ───────────────────────────────────────────────────────

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const TOOL = "scholarsync";
const EMAIL = "contact@scholarsync.com";
const MAX_QUERY_LENGTH = 500;

// ── Helpers ─────────────────────────────────────────────────────────

function getPubMedApiKey(): string | null {
  const keys =
    process.env.PUBMED_API_KEYS?.split(",") ??
    (process.env.PUBMED_API_KEY ? [process.env.PUBMED_API_KEY] : []);
  return keys.length > 0 ? keys[0] : null;
}

// ── Public API ──────────────────────────────────────────────────────

export async function createPubMedSearchFeed(
  query: string
): Promise<PubMedFeedResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("PubMed feed: query is required");
  }
  if (trimmed.length > MAX_QUERY_LENGTH) {
    throw new Error("PubMed feed: query exceeds 500 characters");
  }

  let url = `${EUTILS_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(trimmed)}&usehistory=y&retmode=json&retmax=0&tool=${TOOL}&email=${EMAIL}`;

  const apiKey = getPubMedApiKey();
  if (apiKey) {
    url += `&api_key=${encodeURIComponent(apiKey)}`;
  }

  let data: ESearchResponse;
  try {
    const response = await resilientFetch(url, {}, {
      service: "PubMed-RSS",
      timeout: 15000,
      maxRetries: 2,
    });
    data = await response.json();
  } catch (error) {
    throw new Error(
      `PubMed feed: failed to create search — ${error instanceof Error ? error.message : String(error)}`
    );
  }

  const webEnv = data.esearchresult?.webenv;
  if (!webEnv) {
    throw new Error("PubMed feed: no WebEnv returned");
  }

  const totalResults = parseInt(data.esearchresult?.count || "0", 10);
  const feedUrl = `${EUTILS_BASE}/erss.cgi?rss_guid=${encodeURIComponent(webEnv)}`;

  return {
    feedUrl,
    title: `PubMed: ${trimmed.length > 80 ? trimmed.slice(0, 77) + "..." : trimmed}`,
    query: trimmed,
    totalResults,
  };
}
