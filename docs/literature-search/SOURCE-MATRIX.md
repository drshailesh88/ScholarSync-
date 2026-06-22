# Source Dependency Matrix — Manan OS Literature Search

How every external data source is used, and what happens when it is unavailable.
Design rule: **the engine must return useful, correctly-ranked clinical results
with only the REQUIRED sources up.** Everything else is additive and fails open.

## Matrix

| Source | Tier | Role | Auth / env | Fails open? | Behavior when down |
|--------|------|------|-----------|:-----------:|--------------------|
| **PubMed E-utilities** | **Required** | Primary clinical retrieval (Best-Match relevance sort), MeSH, publication types → study type / evidence level, PMID/DOI, abstracts; `fetch_paper` by PMID/DOI | `PUBMED_API_KEYS` *(optional — raises rate limit; works keyless at 3 req/s)* | Yes (circuit breaker) | Other sources still answer; results lack MeSH/pubtype precision. Surfaced via `sourceStatuses.pubmed`. |
| **OpenAlex** | **Required-ish (default)** | Citation counts (S2-independent), open-access links, concepts; **batch citation/PMID/DOI backfill** by id; cross-disciplinary recall | `mailto` only (keyless) | Yes (circuit breaker) | Citation signal degrades to 0; ranking falls back to evidence/journal/relevance. Surfaced via `sourceStatuses.openalex`. |
| **Crossref** | Optional | `fetch_paper` by DOI; authoritative journal/title/year metadata repair; **retraction/erratum** detection (`update-to` / Retraction Watch relation) | `mailto` only (keyless) | Yes | DOI-only `fetch_paper` falls back to PubMed; no Crossref-based retraction flag (PubMed pubtypes still flag). |
| **ClinicalTrials.gov** | Optional (auto) | Trial-registry linking for trial-acronym / NCT / "trial" queries | none | Yes | Trial queries still return the published RCT from PubMed; just no registry record. |
| **Cohere `rerank-v3.5`** | Optional | Cross-encoder rerank stage (blended 0.5 with quality composite) — the SOTA relevance lever | `COHERE_API_KEY` | Yes | Ranking falls back to the heuristic quality composite (evidence + citations + journal + keyword relevance). No error surfaced to the user. |
| **Tavily** | Optional | Web fallback for **guideline / recency** intents + DOI/PMID repair; restricted to trusted biomedical/guideline domains; trust-tiered low | `TAVILY_API_KEY` | Yes | No web lane; primary literature unaffected. `sourceStatuses.web = missing_config`. |
| **Semantic Scholar** | **Optional (OFF by default)** | Extra citation/metadata signal ONLY when explicitly requested | `SEMANTIC_SCHOLAR_API_KEY` *(optional)* | Yes | **No impact** — never in the default source set; the engine is designed to run fully without it. (It currently 403s/ rate-limits frequently in production, which is exactly why it is not a dependency.) |
| **Scimago journal table** | Required (local) | Journal quartile + cites/doc quality signal | bundled data file (no network) | n/a | Always available (local). |
| **Cohere embeddings / MedCPT / vector store** | Not used | (Future) dense first-stage retrieval | — | — | Deferred — see BACKLOG #dense-retrieval. |
| **Elicit** | **Benchmark only** | Calibration target for the eval harness | `ELICIT_API_KEY` *(eval only)* | n/a | **NEVER called from production code paths.** Used only by the eval/council. |

## Default source set

`DEFAULT_SOURCES = ["pubmed", "openalex"]` (see `src/lib/search/run-search.ts`).

- PubMed = clinical relevance + structured metadata.
- OpenAlex = citation/landmark signal + S2-independent enrichment.
- ClinicalTrials.gov and Tavily are **auto-added by intent** (the query planner),
  not user-selected, and only when their key/preconditions are met.
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

No secrets are hardcoded; all keys are read from the environment. The eval
harness is run via `op-run -- npm run eval:search …` to inject keys from the
1Password `Dev` vault (or runs keyless).

## Invariant

> Pull the plug on Cohere, Tavily, Crossref, ClinicalTrials.gov **and** Semantic
> Scholar at once, and the engine still returns ranked, deduplicated,
> evidence-tiered clinical results from PubMed + OpenAlex with citations,
> provenance, and missing-metadata flags. That is the definition of "S2 optional".
