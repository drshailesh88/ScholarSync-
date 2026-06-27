# ScholarSync — Codex Agent Instructions

## Quick Context
ScholarSync is an AI-powered academic writing platform expanding from medicine-only to all scientific disciplines. Read `docs/multi-domain/MASTER_CONTEXT.md` for full architecture and methodology.

## Current Initiative: Multi-Domain Expansion
- **Architecture:** One app, domain routing (NOT a fork)
- **Safety:** Medicine is default. No domain param = current behavior unchanged.
- **Quality gate:** Annealing score must stay FROZEN (>95). 139 E2E tests must pass.

## Key Files to Read First
- `docs/multi-domain/MASTER_CONTEXT.md` — full plan, file audit, architecture
- `UBIQUITOUS_LANGUAGE.md` — shared vocabulary (if exists)
- `docs/decisions-log.md` — append-only decision log
- GitHub Issues for task context

## Rules
- NEVER break existing medical functionality
- Use vertical slices (all layers per task), not horizontal slabs
- TDD: write test first, make it pass, then next test
- Run existing tests after every change
- Reference parent PRD issue in commits
- Each issue should be independently demoable when complete

## Non-academic search federation (web/news/discussions)
- The academic engine (`run-search.ts`, academic sources, the `tab=academic`/no-param
  GET branch) is OFF-LIMITS. Non-academic work lives ONLY in
  `fetchNonAcademicResults`/`fetchFederatedNonAcademicResults` (`route.ts`), new
  `src/lib/search/sources/*`, and `src/lib/search/web/*`. The medical default is the
  non-federated path and stays unchanged.
- `src/lib/search/web/federate.ts` fans a query across a per-tab `SOURCES_BY_TAB` set,
  fail-open + per-source timeout, then RRF-fuses on **canonical URL**
  (`rank-fusion-web.ts`) — NOT the academic `isSamePaper` (it keys on DOI/PMID/title+year,
  which URL-only web rows lack). A single source short-circuits to passthrough, so a
  SearXNG-only federation is byte-identical to the legacy single-source path.
- Discussions sources: Reddit, HN (Algolia), Stack Exchange — all FREE/keyless, each its
  own circuit breaker + `resilientFetch`, returns `UnifiedSearchResult[]` `sources:["discussions"]`.
  SearXNG `social media` is intentionally NOT fused into discussions (fediverse noise:
  lemmy/mastodon, no Reddit/HN/SE; measured a wash and the council penalizes it).
- Gotcha — discussion APIs AND-match terse titles, so verbose NL queries return zero. Fixes:
  `toKeywordQuery` (`web/query-terms.ts`) strips format/function words; HN also needs
  `removeWordsIfNoResults=allOptional`.
- Reddit blocks datacenter egress IPs (HTTP 403) regardless of User-Agent; there is no
  Reddit OAuth credential in the vault. The adapter is fail-open and reads
  `REDDIT_OAUTH_TOKEN` if present — until prod has a non-blocked IP or that token, Reddit
  contributes nothing and reddit.com gold queries stay unmatched.
- Eval: `eval/web-search/capture-providers.ts` freezes the FUSED pool into the same
  `cache/<tab>-<hash>.json` shape `run.ts` replays (`--providers searxng` reproduces the
  SearXNG-only baseline — the CYCLE 0 faithfulness check). Layer 1 (`run.ts`, deterministic,
  no Cohere) gates the paid blinded council (`council/`); cache/runs/council/exa are
  measurement artifacts, not committed.
