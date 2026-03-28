# ScholarSync → Multi-Domain Research Platform
## Master Context for Any AI Agent

**Last updated:** 2026-03-28
**Founder:** Dr. Shailesh Singh (interventional cardiologist, non-technical founder)
**Product:** ScholarSync — AI-powered academic writing platform
**Repo:** github.com/drshailesh88/ScholarSync-
**Launch target:** July 2026

---

## WHAT WE'RE BUILDING

Expanding ScholarSync from medicine-only to serve ALL scientific disciplines while keeping the current medical experience completely untouched.

### Architecture Decision: One App, Domain Routing
- Single codebase, single deployment
- A `domain` parameter controls which prompts, sources, filters, and evidence hierarchies are used
- Medicine is the DEFAULT config — if no domain specified, everything works exactly as today
- Pattern: extract current hardcoded medical behavior into `domains/medicine.ts` config, then add parallel configs for other domains
- Zero regression guarantee: medicine config reproduces current behavior identically

### Safety Rules
1. Medicine config = extract, don't rewrite (same strings, now in config)
2. Default is always "medicine" (no domain param → current behavior)
3. arXiv is additive (only called when domain config includes it)
4. Feature-flag the UI (flip on when ready)
5. Existing tests (139 E2E + 376 specs + 12,804 checkpoints) must pass after every change
6. Annealing score must stay FROZEN (>95)

---

## THE 5 SPECS

### Spec 1: Domain Registry Foundation
Create type definitions for DomainConfig, extract medicine config from hardcoded code, create multidisciplinary default. Zero behavior change.
**Risk:** LOW | **Labels:** spec-1

### Spec 2: arXiv Source Adapter
Build arxiv.ts following exact pattern of pubmed.ts. Atom XML parsing, circuit breaker, rate limiting. Only activated when domain config includes it.
**Risk:** LOW | **Labels:** spec-2

### Spec 3: Domain-Aware Search Pipeline
Modify query-augment.ts, evidence-level.ts, unified/route.ts, FilterPanel.tsx, plan-generator.ts, query-expander.ts. Each domain defines sources, AI persona, evidence hierarchy, research framework, filters.
**Risk:** MEDIUM | **Labels:** spec-3

### Spec 4: Domain-Aware AI Prompts
Modify all 12 prompt files that say "medical". Each reads domain config for persona, terminology, examples.
**Risk:** MEDIUM | **Labels:** spec-4

### Spec 5: UI Domain Selector + Data Expansion
Domain picker, landing page, journal feeds, LaTeX templates, presentation types, schema enums, domain column migration. Behind feature flag.
**Risk:** LOW-MEDIUM | **Labels:** spec-5

### Execution Order
```
Spec 1 → Spec 2 → Spec 3 → Spec 4 → Spec 5
(each independently deployable, each reversible)
```

---

## DEVELOPMENT METHODOLOGY

### Matt Pocock's Engineering Process + Self-Annealing QA

```
PHASE 0: COMPETITIVE GAP → IDEA          (founder's method)
PHASE 1: RESEARCH → cache in repo         (Matt Phase 2)
PHASE 2: GRILL-ME → shared understanding  (Matt Phase 4a)
PHASE 3: UBIQUITOUS LANGUAGE → glossary   (Matt + DDD)
PHASE 4: WRITE-A-PRD → GitHub Issue       (Matt Phase 4b)
PHASE 5: PRD-TO-ISSUES → vertical slices  (Matt Phase 5)
PHASE 6: EXECUTE → Ralph loop with TDD    (Matt Phase 6)
PHASE 7: QA → human walks through         (Matt Phase 7)
PHASE 8: SELF-ANNEAL → score ≥ FROZEN     (founder's method)
PHASE 9: E2E TESTS → Playwright specs     (founder's method)
         ↺ Loop 7-9 until clean
```

### Skills Available (in .claude/skills/)
- `grill-me` — stress-test a plan by walking the design tree
- `ubiquitous-language` — build shared glossary
- `write-a-prd` — interview → explore → PRD → GitHub Issue
- `prd-to-issues` — vertical slices with blocking relationships
- `tdd` — red-green-refactor, vertical slices only
- `qa` — interactive QA, file durable GitHub Issues
- `design-an-interface` — 3+ parallel designs, "Design It Twice"
- `improve-codebase-architecture` — find shallow modules to deepen
- `triage-issue` — investigate bug, file TDD fix plan
- `git-guardrails` — block dangerous git operations

### Key Principles
- **Vertical slices**: Each task cuts through ALL layers (schema → API → UI → tests)
- **Deep modules**: Small interface, large implementation (good)
- **Durable issues**: No file paths, describe behaviors not code
- **Smart zone**: Keep context usage low — one task per fresh context
- **TDD**: One RED→GREEN at a time, never horizontal

---

## SEARCH PIPELINE (Current Architecture)

```
User query
  → query-augment.ts [MEDICAL PERSONA — needs domain config]
  → fan-out to 4 hardcoded sources [needs domain-driven source list]
  → RRF fusion (k=60) [DOMAIN-FREE ✓]
  → dedup (DOI→PMID→S2ID→title+year) [DOMAIN-FREE ✓]
  → Cohere rerank v3.5 [DOMAIN-FREE ✓]
  → evidence-level.ts [MEDICAL PYRAMID — needs domain config]
  → study-type-detector.ts [MEDICAL TYPES — needs domain config]
  → Scimago journal enrichment [DOMAIN-FREE ✓]
  → FilterPanel.tsx [MEDICAL FILTERS — needs domain config]
```

### Medicine-Specific Chokepoints (3 only)
1. `query-augment.ts` — "medical librarian" persona, MeSH syntax
2. `evidence-level.ts` — medical evidence pyramid (I-V)
3. `study-type-detector.ts` — medical study type regex patterns

### Already Domain-Free
- RRF fusion, dedup, reranking — pure math
- Circuit breakers, resilient fetch — infrastructure
- UnifiedSearchResult type — already has arxivId, fieldsOfStudy
- Semantic Scholar (200M+ papers, all fields)
- OpenAlex (250M+ papers, all fields)

---

## FILES TO TOUCH (Complete Audit)

**44 files to modify. 14 new files to create.**

### Layer 1 — Search (8 files, do first)
- query-augment.ts, evidence-level.ts, query-expander.ts, study-type-detector.ts
- plan-generator.ts, unified/route.ts, FilterPanel.tsx
- NEW: sources/arxiv.ts

### Layer 2 — AI Prompts (12 files)
- guide.ts (550 lines, 6 document personas), systematic-review.ts (482 lines)
- presentation.ts, draft.ts, perspectives.ts, synthesis.ts
- query-enhancer.ts, hyde.ts, source-summarizer.ts
- audio-overview.ts, research-tools.ts, feeds/copilot/summarize

### Layer 3 — UI (5 files)
- Landing page, generation-wizard.tsx, PaperDetailPanel.tsx, feed-empty-state.tsx

### Layer 4 — Data (5 files)
- journal-feeds.ts, latex-templates.ts, section-templates.ts, mock-data.ts, seed.ts

### Layer 5 — Database (4 changes)
- Add domain column, expand projectTypeEnum, audienceTypeEnum, institutionTypeEnum

### Layer 6 — Systematic Review (10 files, conditional visibility)
### Layer 7 — Illustration (25+ files, additive, defer)

### NOT Touched
- RRF fusion, dedup, reranking, editor, citations, PDF pipeline, plagiarism, auth, payments

---

## DATABASES AVAILABLE

| Source | Fields | API Key? | Status |
|--------|--------|----------|--------|
| PubMed | Medicine | Have key | ✅ Built |
| Semantic Scholar | ALL (200M+) | Have key | ✅ Built |
| OpenAlex | ALL (250M+) | mailto param | ✅ Built |
| ClinicalTrials.gov | Clinical trials | No key | ✅ Built |
| arXiv | Physics, Math, CS, Econ | No key needed | 🆕 To build |
| Crossref | ALL (180M+ DOIs) | No key needed | 🆕 Phase 2 |

---

## QUALITY SYSTEM

- **Annealing score:** 99.4 (FROZEN, Phase 5)
- **E2E tests:** 139 journey tests passing
- **Specs:** 376 specs, 12,804 checkpoints
- **Feature testing docs:** 20 modules documented
- **Ralph verification:** 24-cycle SR test suite

---

## SCALING (Current → Target)

| Users | Neon | Upstash | Clerk | Total/mo |
|-------|------|---------|-------|----------|
| 0-100 | Free | Free | Free | $0 |
| 1,000 | Launch ($15-40) | $10-20 | Free | ~$50 |
| 5,000 | Scale (~$200) | Pro ($50) | Pro ($80) | ~$350 |
| 100,000 | Business (~$700) | Enterprise ($280) | Pro ($1,800) | ~$3,500 |

---

## HOW TO START A NEW SESSION

1. Read this file
2. Read `UBIQUITOUS_LANGUAGE.md` (if it exists at repo root)
3. Check `docs/decisions-log.md` for latest decisions
4. Check GitHub Issues: `gh issue list --state open`
5. Check annealing: last entry in `annealing-log.jsonl`
6. Ask the founder what to work on today
7. Follow the methodology above
