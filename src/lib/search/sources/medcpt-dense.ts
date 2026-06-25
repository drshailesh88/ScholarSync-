import type { UnifiedSearchResult } from "@/types/search";
import { resilientFetch } from "@/lib/http/resilient-fetch";
import { createCircuitBreaker } from "@/lib/http/circuit-breaker";
import {
  classifyFetchError,
  okStatus,
  type SourceStatus,
} from "@/lib/search/source-status";

/**
 * Self-hosted MedCPT dense retrieval lane — the corpus-free, throttle-proof
 * replacement for the OpenAlex `search.semantic` lane.
 *
 * Two hops, both fail-open:
 *  1. Encode the query with `ncbi/MedCPT-Query-Encoder` served on Modal
 *     (scale-to-zero GPU) → a 768-d float vector. We OWN this lane, so it can
 *     never be throttled away the way OpenAlex semantic was (14/87 queries lost).
 *  2. Approximate-nearest-neighbour query a Turbopuffer namespace holding the
 *     NCBI precomputed MedCPT PubMed embeddings (int8-quantized at rest; queried
 *     with a float vector — quantization is transparent to the query). Returns
 *     papers retrieved by MEANING, surfacing landmarks that share no surface
 *     terms with the query.
 *
 * Results are tagged `medcpt_dense` for provenance and fused into the candidate
 * pool by RRF before the ranking pipeline runs — identical wiring to the lane it
 * replaces. The lane is DORMANT (returns `missing_config`, never throws) until
 * both the encoder URL and the Turbopuffer key are configured, so it can be
 * wired into the orchestrator before the index exists without affecting live
 * search.
 *
 * Config (all via env, never hardcoded; injected by op-run in dev/eval):
 *  - `MEDCPT_QUERY_ENCODER_URL`   Modal web endpoint for the Query-Encoder.
 *  - `TURBOPUFFER_API_KEY`        Turbopuffer auth.
 *  - `TURBOPUFFER_REGION`         Region subdomain (default `aws-us-east-1`).
 *  - `MEDCPT_TURBOPUFFER_NAMESPACE` Namespace name (default `medcpt-pubmed`).
 */

const breaker = createCircuitBreaker({ service: "MedCPT", failureThreshold: 5 });

const DEFAULT_REGION = "aws-us-east-1";
const DEFAULT_NAMESPACE = "medcpt-pubmed";
const DEFAULT_LIMIT = 50;

/** Attributes stored alongside each vector, used to rebuild a UnifiedSearchResult. */
const INCLUDE_ATTRIBUTES = [
  "pmid",
  "title",
  "journal",
  "year",
  "authors",
  "abstract",
  "doi",
] as const;

export interface MedcptDenseOptions {
  limit?: number;
  yearStart?: number;
  yearEnd?: number;
}

interface MedcptConfig {
  encoderUrl: string;
  apiKey: string;
  region: string;
  namespace: string;
}

/** Read config from env; returns null (→ missing_config) when not fully provisioned. */
function readConfig(): MedcptConfig | null {
  const encoderUrl = process.env.MEDCPT_QUERY_ENCODER_URL;
  const apiKey = process.env.TURBOPUFFER_API_KEY;
  if (!encoderUrl || !apiKey) return null;
  return {
    encoderUrl,
    apiKey,
    region: process.env.TURBOPUFFER_REGION || DEFAULT_REGION,
    namespace: process.env.MEDCPT_TURBOPUFFER_NAMESPACE || DEFAULT_NAMESPACE,
  };
}

/** POST the query text to the Modal Query-Encoder, returning its 768-d embedding. */
async function encodeQuery(encoderUrl: string, query: string): Promise<number[]> {
  const res = await resilientFetch(
    encoderUrl,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    },
    { service: "MedCPT-Encoder", timeout: 8000, maxRetries: 1 }
  );
  const data: { embedding?: number[]; vector?: number[] } = await res.json();
  return data?.embedding ?? data?.vector ?? [];
}

type TurbopufferRow = {
  id?: string | number;
  pmid?: string | number;
  title?: string;
  journal?: string;
  year?: number | string;
  authors?: string[] | string;
  abstract?: string;
  doi?: string;
};

/** ANN-query the Turbopuffer namespace; returns the raw matched rows (closest first). */
async function queryTurbopuffer(
  cfg: MedcptConfig,
  vector: number[],
  opts: MedcptDenseOptions
): Promise<TurbopufferRow[]> {
  const url = `https://${cfg.region}.turbopuffer.com/v2/namespaces/${encodeURIComponent(
    cfg.namespace
  )}/query`;

  const body: Record<string, unknown> = {
    rank_by: ["vector", "ANN", vector],
    limit: Math.min(DEFAULT_LIMIT, opts.limit ?? DEFAULT_LIMIT),
    include_attributes: INCLUDE_ATTRIBUTES,
  };

  const conditions: Array<[string, string, number]> = [];
  if (typeof opts.yearStart === "number") conditions.push(["year", "Gte", opts.yearStart]);
  if (typeof opts.yearEnd === "number") conditions.push(["year", "Lte", opts.yearEnd]);
  if (conditions.length > 0) body.filters = ["And", conditions];

  const res = await resilientFetch(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    { service: "Turbopuffer", timeout: 8000, maxRetries: 1 }
  );
  const data: { rows?: TurbopufferRow[] } = await res.json();
  return Array.isArray(data?.rows) ? data.rows : [];
}

function toYear(value: number | string | undefined): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseInt(value, 10) || 0;
  return 0;
}

function mapRow(row: TurbopufferRow): UnifiedSearchResult {
  const authors = Array.isArray(row.authors)
    ? row.authors
    : row.authors
      ? [String(row.authors)]
      : [];
  const pmid =
    row.pmid != null ? String(row.pmid) : row.id != null ? String(row.id) : undefined;

  return {
    title: String(row.title ?? ""),
    authors,
    journal: String(row.journal ?? ""),
    year: toYear(row.year),
    pmid,
    doi: row.doi ? String(row.doi) : undefined,
    abstract: row.abstract ? String(row.abstract) : undefined,
    citationCount: 0,
    isOpenAccess: false,
    openAccessPdfUrl: null,
    publicationTypes: [],
    sources: ["medcpt_dense"],
  };
}

/**
 * Dense first-stage retrieval over the self-hosted MedCPT PubMed index. Conforms
 * to the `searchX()` source contract: `{ results, total, status }`, never throws.
 */
export async function searchMedcptDense(
  query: string,
  options: MedcptDenseOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number; status: SourceStatus }> {
  if (!breaker.canRequest()) {
    return {
      results: [],
      total: 0,
      status: { status: "error", message: "Circuit breaker open — recent MedCPT failures" },
    };
  }

  const cfg = readConfig();
  if (!cfg) {
    return {
      results: [],
      total: 0,
      status: {
        status: "missing_config",
        message: "MedCPT dense lane not configured (encoder URL / Turbopuffer key)",
      },
    };
  }

  try {
    const vector = await encodeQuery(cfg.encoderUrl, query);
    if (!Array.isArray(vector) || vector.length === 0) {
      breaker.onFailure();
      return {
        results: [],
        total: 0,
        status: { status: "error", message: "MedCPT encoder returned no embedding" },
      };
    }

    const rows = await queryTurbopuffer(cfg, vector, options);
    const results = rows.map(mapRow);
    breaker.onSuccess();
    return { results, total: results.length, status: okStatus() };
  } catch (error) {
    breaker.onFailure();
    console.error("[MedCPT] Dense search failed:", error);
    return { results: [], total: 0, status: classifyFetchError(error, { hasApiKey: true }) };
  }
}
