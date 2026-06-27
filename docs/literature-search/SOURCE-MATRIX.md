# Source Dependency Matrix — Manan OS Literature Search

How every external data source is used, and what happens when it is unavailable.
Design rule: **the engine must return useful, correctly-ranked clinical results
with only the REQUIRED sources up.** Everything else is additive and fails open.

## Matrix

| Source | Tier | Role | Auth / env | Fails open? | Behavior when down |
|--------|------|------|-----------|:-----------:|--------------------|
| **PubMed E-utilities** | **Required** | Primary clinical retrieval (Best-Match relevance sort), MeSH, publication types → study type / evidence level, PMID/DOI, abstracts; `fetch_paper` by PMID/DOI | `PUBMED_API_KEYS` *(optional — raises rate limit; works keyless at 3 req/s)* | Yes (circuit breaker) | Other sources still answer; results lack MeSH/pubtype precision. Surfaced via `sourceStatuses.pubmed`. |
| **OpenAlex (lexical)** | **Required-ish (default)** | Lexical recall; citation counts (S2-independent), OA links, concepts; **batch citation/PMID/DOI backfill** by id | `OPENALEX_API_KEY` *(now required — see note)* | Yes (circuit breaker + pacing) | Degrades to keyless (heavily 429-throttled, high latency); citation signal weakens. Surfaced via `sourceStatuses.openalex`. |
| **MedCPT dense (self-hosted)** | **Default (internal lane)** | Dense first-stage retrieval by MEANING — **replaces** the retired OpenAlex `search.semantic` lane. A Modal-served `ncbi/MedCPT-Query-Encoder` encodes the query; ANN over an int8 Turbopuffer namespace holding NCBI's precomputed MedCPT PubMed embeddings (~24M, through ~2023) + the 2024–2026 gap, kept current by a weekly Modal freshness updater. We OWN it, so it cannot be throttled away (the failure mode that lost OpenAlex semantic on 14/87 queries). | `MEDCPT_QUERY_ENCODER_URL`, `TURBOPUFFER_API_KEY`, `TURBOPUFFER_REGION` *(default `aws-us-east-1`)*, `MEDCPT_TURBOPUFFER_NAMESPACE` *(default `medcpt-pubmed`)* | Yes (circuit breaker; **dormant** when unconfigured) | Falls back to the lexical lanes (PubMed + OpenAlex). Surfaced via `sourceStatuses.medcpt_dense` (`missing_config` until provisioned, so it never degrades live search). |
| **PubMed PMRA expansion** | Optional (opt-in) | Citation/related-article neighbour expansion (`expandCitations`) — corpus-free recall booster | none (PubMed key optional) | Yes | Off by default; when on, fails open to no expansion. |
| **Crossref** | Optional | `fetch_paper` by DOI; authoritative journal/title/year metadata repair; **retraction/erratum** detection (`update-to` / Retraction Watch relation) | `mailto` only (keyless) | Yes | DOI-only `fetch_paper` falls back to PubMed; no Crossref-based retraction flag (PubMed pubtypes still flag). |
| **ClinicalTrials.gov** | Optional (auto) | Trial-registry linking for trial-acronym / NCT / "trial" queries | none | Yes | Trial queries still return the published RCT from PubMed; just no registry record. |
| **Cohere `rerank-v3.5`** | Optional | Cross-encoder rerank stage (blended 0.5 with quality composite) — the SOTA relevance lever | `COHERE_API_KEY` | Yes | Ranking falls back to the heuristic quality composite (evidence + citations + journal + keyword relevance). No error surfaced to the user. |
| **Tavily** | Optional | Web fallback for **guideline / recency** intents + DOI/PMID repair; restricted to trusted biomedical/guideline domains; trust-tiered low | `TAVILY_API_KEY` | Yes | No web lane; primary literature unaffected. `sourceStatuses.web = missing_config`. |
| **Semantic Scholar** | **Optional (OFF by default)** | Extra citation/metadata signal ONLY when explicitly requested | `SEMANTIC_SCHOLAR_API_KEY` *(optional)* | Yes | **No impact** — never in the default source set; the engine is designed to run fully without it. (It currently 403s/ rate-limits frequently in production, which is exactly why it is not a dependency.) |
| **Scimago journal table** | Required (local) | Journal quartile + cites/doc quality signal | bundled data file (no network) | n/a | Always available (local). |
| **Turbopuffer (vector store)** | Required for the dense lane | Hosts the int8 MedCPT vector index (and, optionally later, a BM25 lexical namespace — one store, hybrid). | `TURBOPUFFER_API_KEY`, `TURBOPUFFER_REGION` | Yes | Dense lane goes dormant → lexical lanes still answer. |
| **Modal (encoder + jobs)** | Required for the dense lane | Scale-to-zero GPU serving the MedCPT Query-Encoder and running the embedding/freshness + backfill jobs. | Modal tokens + a Modal Secret (`HF_TOKEN`, `TURBOPUFFER_API_KEY`) | Yes | Encoder unreachable → dense lane fails open to the lexical lanes. |
| **Elicit** | **Benchmark only** | Calibration target for the eval harness | `ELICIT_API_KEY` *(eval only)* | n/a | **NEVER called from production code paths.** Used only by the eval/council. |

## Default source set

`DEFAULT_SOURCES = ["pubmed", "openalex"]` (see `src/lib/search/run-search.ts`).

- PubMed = clinical relevance + structured metadata.
- OpenAlex = citation/landmark signal + S2-independent enrichment.
- ClinicalTrials.gov and Tavily are **auto-added by intent** (the query planner),
  not user-selected, and only when their key/preconditions are met.
- The **MedCPT dense lane** is an *internal* lane (like the retired
  `openalex_semantic` was) — not a user-selectable source. It runs automatically
  alongside the biomedical lexical lanes (whenever `pubmed` or `openalex` is in
  the set) and fails open (dormant `missing_config`) until provisioned.
- Semantic Scholar must be passed explicitly in `sources` to be used at all.

## Environment variables

| Var | Required? | Purpose | Fallback if unset |
|-----|:---------:|---------|-------------------|
| `PUBMED_API_KEYS` (or `PUBMED_API_KEY`) | No | PubMed rate-limit raise + key rotation | Keyless PubMed (3 req/s) |
| `COHERE_API_KEY` | No | Cross-encoder rerank | Heuristic quality composite |
| `TAVILY_API_KEY` | No | Web/guideline fallback + id repair | No web lane |
| `SEMANTIC_SCHOLAR_API_KEY` | No | Optional S2 source | S2 unused |
| `ELICIT_API_KEY` | No (eval only) | Benchmark capture | Eval uses saved fixtures |
| `MANAN_MCP_API_KEY` | No | MCP bearer auth (opt-in) | MCP open (internal-tool mode) |
| `MEDCPT_QUERY_ENCODER_URL` | No | Modal endpoint that encodes the query for the dense lane | Dense lane dormant (`missing_config`) |
| `TURBOPUFFER_API_KEY` | No | Auth for the MedCPT dense vector store | Dense lane dormant (`missing_config`) |
| `TURBOPUFFER_REGION` | No | Turbopuffer region subdomain | `aws-us-east-1` |
| `MEDCPT_TURBOPUFFER_NAMESPACE` | No | Vector namespace name | `medcpt-pubmed` |

No secrets are hardcoded; all keys are read from the environment. The eval
harness is run via `op-run -- npm run eval:search …` to inject keys from the
1Password `Dev` vault (or runs keyless).

## Invariant

> Pull the plug on Cohere, Tavily, Crossref, ClinicalTrials.gov **and** Semantic
> Scholar at once, and the engine still returns ranked, deduplicated,
> evidence-tiered clinical results from PubMed + OpenAlex with citations,
> provenance, and missing-metadata flags. That is the definition of "S2 optional".
