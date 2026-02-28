# Engineering Response to Data Strategy Documents

**Date:** 2026-02-27
**From:** Engineering (Claude Code — Lead Implementation Agent)
**To:** Project Manager / Dr. Shailesh Singh
**Re:** CLOUDBOARD-BRIEFING.md, DATA-FOUNDATION-BLUEPRINT.md, DATA-READINESS-GUIDE.md, DISTILLATION-REALITY-GUIDE.md

**Status:** AWAITING PROJECT MANAGER APPROVAL BEFORE EXECUTION

---

## 1. Executive Summary

I have read and fully internalized all four strategy documents. This response covers:

1. What exists in the codebase today vs. what the documents require
2. Where the documents reference a tech stack that differs from what's actually built (and why that's fine)
3. A precise, phased implementation plan to close every gap
4. Architectural decisions that need your sign-off
5. Cost and timeline estimates
6. Questions that need answers before execution

**Bottom line:** The codebase has ~40% of the required data infrastructure already built. The remaining 60% — the generalized event pipeline, four ML-specific tables, client-side event buffer, privacy controls, readiness dashboard, and export pipeline — is a substantial but well-scoped body of work. I estimate 4-5 phases of focused implementation to reach full compliance with all four documents.

---

## 2. Documents Received and Understood

| Document | Core Message | My Understanding |
|---|---|---|
| **CLOUDBOARD-BRIEFING** | Every feature must log user behavior data from Day 1. No exceptions. This is the company's long-term competitive advantage. | Understood. This is not a "nice to have." If a feature ships without logging, it is incomplete. |
| **DATA-FOUNDATION-BLUEPRINT** | Canonical event schema, all event types by feature, storage architecture (4 tables), client/server ingestion rules, privacy/GDPR compliance, monthly health checks. | Understood. This is the engineering specification I will implement. |
| **DATA-READINESS-GUIDE** | Concrete training thresholds per model, conversion ratios (raw events → training examples), timeline projections, Data Readiness Dashboard SQL, quality red flags. | Understood. This shapes the monitoring layer and tells me what metadata fields are mandatory (e.g., `edit_duration_ms` for quality filtering). |
| **DISTILLATION-REALITY-GUIDE** | Pre-launch synthetic data generation, progressive model replacement timeline, cost comparison ($4,320/mo API vs. $922/mo distilled at 10K users), engineering checklist for distillation readiness. | Understood. This adds two requirements not in the other docs: (1) a data export pipeline to JSON/Parquet, and (2) an evaluation framework for comparing distilled vs. teacher models. |

---

## 3. Current Codebase Audit

### 3.1 What Already Exists (Working in Production or Ready)

| Capability | Implementation | Status |
|---|---|---|
| **LangFuse LLM Tracing** | `src/lib/langfuse.ts` + `traceGeneration()` in `models.ts`. Traces every LLM call with spans, latency, token counts. Gracefully no-op when keys absent. | WORKING |
| **AI Cost Tracking** | `usage_events` table + `trackAIUsage()` in `cost-tracker.ts`. Writes userId, modelId, feature, tokensUsed, costUsd with breakdown. `MODEL_PRICING` registry as single source of truth. | WORKING |
| **AI Cost Dashboard API** | `GET /api/analytics/ai-costs?period=30d` — aggregates by model, feature, provider, daily trend. | WORKING |
| **PostHog Client-Side Analytics** | Full setup in `posthog-provider.tsx`, mounted at root layout. Auto-captures page views, clicks, form submissions, session recordings (errors-only, inputs masked). | WORKING |
| **PostHog Server-Side** | Singleton in `src/lib/posthog.ts`. Configured but **no API routes currently call it**. | CONFIGURED, UNUSED |
| **Presentation View Tracking** | `PresentationViewTracker` class with sendBeacon, per-slide timing, viewer fingerprinting. Full pipeline: client buffer → `POST /api/analytics/track-view` → `presentation_views` table. | WORKING |
| **Search Query Logging** | `saveSearchQuery()` + `search_queries` table. Logs original query, augmented queries, query type, source, filters, result count. | WORKING |
| **Activity Log** | `activity_log` table in schema. Queried for dashboard "recent activity" feed. | WORKING |
| **Writing Action Log** | `writing_action_log` table — schema for actionType, originalText, modifiedText, accepted, tokensUsed. | SCHEMA ONLY — no application code writes to it |
| **Document Changes** | `document_changes` table — schema for authorType (human/ai), changeType, originalText, newText, position, status. | SCHEMA ONLY — no application code writes to it |
| **Structured Logger** | `src/lib/logger.ts` — JSON-formatted stdout logging with request-scoped child loggers. | WORKING |
| **Usage Quotas** | Per-user monthly counters in `users` table + `usage_quotas` plan definitions. | WORKING |

### 3.2 What Does NOT Exist (Gaps vs. All Four Documents)

| Blueprint Requirement | Gap Severity | Notes |
|---|---|---|
| **`user_events` table** (canonical event store) | CRITICAL | No generic clickstream/interaction table exists. General UI events only go to PostHog (third-party), which is not queryable for ML training pipelines. |
| **`ai_interaction_archive` table** | CRITICAL | Full prompt+response pairs are NOT stored in our own database. LangFuse traces exist but are in an external service, not in our PostgreSQL for ML export. |
| **`edit_diffs` table** | CRITICAL | The highest-value training data per the Readiness Guide. The existing `document_changes` table is close but lacks `edit_duration_ms` (required for quality filtering) and `section_type`. Also, nothing writes to it. |
| **`search_citation_pairs` table** | CRITICAL | Searches are logged. Citations exist. But the JOIN — "what did they search → what did they cite" — is not captured anywhere. |
| **`POST /api/events` ingestion endpoint** | CRITICAL | No generic event route exists. Only specific routes for presentations and AI costs. |
| **Client-side event buffer** (generic) | CRITICAL | `PresentationViewTracker` is an excellent implementation of exactly this pattern — but it's scoped to presentations only. No generic buffer for the rest of the app. |
| **`trackEvent()` server-side helper** | HIGH | No fire-and-forget helper for API routes to log events. Each route would need to build its own. |
| **Privacy opt-out toggle** | HIGH | No user setting to disable event collection. Required by GDPR and the Blueprint. |
| **GDPR event deletion endpoint** | HIGH | No `DELETE /api/users/:id/events`. Required by Blueprint. |
| **Data export pipeline** | MEDIUM | No mechanism to export training data as JSON/Parquet, filter by quality signals, or split train/validation/test. Required by Distillation Guide. |
| **Data Readiness Dashboard** | MEDIUM | No admin page with the Readiness Guide's SQL queries and color-coded thresholds. |
| **Evaluation framework** | LOW (Year 2) | No infrastructure to compare distilled model vs. teacher on test sets. Not needed until first distillation attempt. |
| **A/B test infrastructure** | LOW (Year 2) | No ability to route 50% of users to distilled model vs. Sonnet. Not needed until first deployment. |

### 3.3 LaTeX Editor Status (Separate but Related)

The LaTeX editor on `feature/latex-editor` is ~95% complete. All 10 components built (3,257 lines), full DB schema, all 6 API routes, correct model routing (Claude Sonnet for writing, GPT-5 Nano for mechanical).

Remaining gaps (functional):

| Gap | Impact | Root Cause |
|---|---|---|
| Inline AI writes to clipboard instead of inserting into editor | HIGH | CodeMirror `EditorView` ref not exposed from SourceEditor to LatexWorkspace |
| Slash commands don't trigger from within CodeMirror | HIGH | No `InputRule` or `keymap` extension intercepts `/` keystrokes in source-editor.tsx |
| Jump-to-line from document outline is a no-op | MEDIUM | Same root cause as inline AI (EditorView ref) |
| y-websocket server startup not confirmed | MEDIUM | `docker-entrypoint.sh` exists but not verified |
| .zip export downloads only main.tex | LOW | Needs JSZip library |
| No file upload in new project flow | LOW | Template selection works, but no .tex upload UI |
| No drag-to-resize between editor/preview panels | LOW | Fixed 50/50 flex split |
| No tests | MEDIUM | Phase 6.3 of implementation plan not started |

**The LaTeX editor has ZERO event logging.** Per the Blueprint, it cannot be considered complete without logging all relevant events (AI_GENERATION_REQUESTED/COMPLETED/ACCEPTED/EDITED/REJECTED, WRITING_SESSION_START/END, edit diffs, search-to-citation pairs from Cite tab).

---

## 4. Stack Reconciliation

The CLOUDBOARD-BRIEFING references a slightly different tech stack than what's actually built. I want to confirm these divergences are intentional and acceptable:

| Briefing Says | Actually Built | My Assessment |
|---|---|---|
| Supabase (PostgreSQL + pgvector) | Drizzle ORM + PostgreSQL directly (self-hosted) | **Compatible.** Same database engine. All Blueprint SQL works with minor Drizzle adaptations. pgvector is available if/when we need embeddings in our own DB. |
| Tiptap editor | Tiptap (Studio) + CodeMirror 6 (LaTeX Editor) | **Compatible.** Two editors for two purposes. Both can emit edit diff events. |
| Copyleaks (plagiarism) | Custom integrity system (K-shingling + MinHash + Binoculars AI detection) | **Better than briefing spec.** Zero external cost, more control, already working. |
| SPECTER2 embeddings + Cohere Rerank | Custom RAG pipeline with existing embedding infrastructure | **Compatible.** The Readiness Guide's Citation Ranker model is designed to eventually REPLACE Cohere Rerank, so current approach is fine. |
| GCP Cloud Run for ML workloads | Docker on GCP (same infra) | **Same path.** Cloud Run is a natural deployment target for distilled models in Year 2. |
| Event Pipeline: Supabase → BigQuery | Will be PostgreSQL → (future) BigQuery | **Same pattern.** Start in main DB, export to BigQuery when volume demands it. |

**Question for Project Manager:** Are these divergences intentional? Should I treat the actually-built stack as the source of truth and adapt the Blueprint's specifications to Drizzle ORM syntax, or are there plans to migrate to Supabase?

**My recommendation:** Keep the current stack. Drizzle + self-hosted PostgreSQL gives us more control over the data (important for ML training pipelines) and avoids Supabase vendor lock-in. The Blueprint's schemas translate directly to Drizzle table definitions.

---

## 5. Implementation Plan

### Phase 0: Branch Consolidation (Prerequisite)

Before building data infrastructure, we need a clean `main` branch:

1. **Fix LaTeX editor functional gaps** (inline AI insertion, slash command triggering, jump-to-line) on `feature/latex-editor`
2. **Merge `feature/latex-editor` → main**
3. **Merge `feature/presentation-engine-v2` → main** (per existing merge strategy: smallest branches first, presentation-engine last)
4. **Create `feature/data-foundation` from clean main**

**Estimated effort:** 1-2 sessions for LaTeX fixes, 1 session for merge conflicts

---

### Phase 1: Core Event Infrastructure

**Branch:** `feature/data-foundation`

#### 1.1 Database Schema (4 New Tables)

All tables added to `src/lib/db/schema/` following existing Drizzle conventions:

**Table: `user_events`** — The canonical event store

Following Blueprint spec exactly. All fields from the EVENT schema. Key design decisions:
- `event_type` as TEXT (not enum) — new event types shouldn't require migrations
- `input`, `output`, `user_edit`, `model_params`, `context_snapshot`, `downstream_signal` as JSONB
- `created_month` as generated column for future partitioning
- All 7 indexes from the Blueprint
- Special index on `(event_type, user_action) WHERE user_action = 'edited'` for ML queries

**Table: `ai_interaction_archive`** — Full prompt+response storage

Per Blueprint spec, plus one addition from the Distillation Guide:
- `full_prompt` as TEXT (not hash — Distillation Guide requires full prompt for teacher data reconstruction)
- `system_prompt` as TEXT (full text, same reason)
- `full_response` as TEXT
- `full_context` as JSONB
- FK to `user_events(event_id)`

**Table: `edit_diffs`** — Highest-value training data

Per Blueprint spec, plus quality-filtering fields from the Readiness Guide:
- `original_text`, `final_text` as TEXT
- `diff_operations` as JSONB (structured diff: insertions, deletions, moves)
- `edit_duration_ms` as INTEGER — **MANDATORY** (Readiness Guide filter: 5000-600000ms)
- `section_type` as TEXT — **MANDATORY** (Readiness Guide: categorized signal)
- `char_count_original`, `char_count_final` as INTEGER — enables the >10% change filter without recomputing

**Table: `search_citation_pairs`** — Recommendation training data

Per Blueprint spec exactly:
- `search_query`, `results_shown`, `paper_clicked`, `paper_cited`, `paper_saved`
- `time_to_decision` as JSONB (per-paper timing)
- `search_timestamp` and `citation_timestamp` — captures the temporal gap (citation may come days after search)

**Migration:** One Drizzle migration for all 4 tables.

#### 1.2 Server-Side Event Helpers

**File: `src/lib/events/track-event.ts`** — Fire-and-forget event logger

```
trackEvent(eventData) → void
```

- Validates against canonical schema
- Writes to `user_events` synchronously
- If event includes large AI data (>1KB prompt or response), queues async write to `ai_interaction_archive`
- Never throws — logs errors to `logger.error()` and continues
- Modeled after existing `trackAIUsage()` pattern

**File: `src/lib/events/track-edit-diff.ts`** — Edit diff capture

```
trackEditDiff({ eventId, userId, originalText, finalText, editDurationMs, sectionType }) → void
```

- Computes `diff_operations` using a lightweight diff algorithm
- Writes to `edit_diffs` table
- Includes `char_count_original` and `char_count_final` for efficient quality filtering

**File: `src/lib/events/track-citation-pair.ts`** — Search-to-citation pair capture

```
trackCitationPair({ userId, searchQuery, resultsShown, ... }) → void
```

- Called when a search is performed (creates initial record with `paper_cited = null`)
- Updated asynchronously when user cites a paper (fills `paper_cited`, `citation_timestamp`)
- Linkage strategy: on citation insert, look back at recent `search_citation_pairs` for this user where `paper_cited IS NULL` and the cited paper appears in `results_shown`

#### 1.3 API Route: `POST /api/events`

**File: `src/app/api/events/route.ts`**

- Accepts array of events (batched from client)
- Validates each event against canonical schema (rejects malformed, keeps valid)
- Rate limit: 100 events per user per minute (using existing rate limiting patterns)
- Synchronous write to `user_events`
- Async write to `ai_interaction_archive` for large AI payloads
- Returns `{ accepted: N, rejected: M }` with error details for rejected events

#### 1.4 Client-Side Event Buffer

**File: `src/lib/events/event-buffer.ts`**

Generalized from existing `PresentationViewTracker` (which is an excellent implementation of exactly this pattern):

- `EventBuffer` class with `track(event)` method
- Generates `session_id` (UUID v4) in `sessionStorage`
- Buffers events in memory
- Flushes every 5 seconds OR when buffer reaches 20 events
- `navigator.sendBeacon` on `beforeunload` and `visibilitychange: hidden`
- `fetch` with `keepalive: true` as fallback
- `IndexedDB` retry queue for failed sends
- Checks opt-out toggle before collecting
- Never blocks UI — all sends are fire-and-forget

**File: `src/components/providers/event-provider.tsx`**

React context provider (mounted at root layout alongside PostHog provider):
- Initializes `EventBuffer` singleton
- Exposes `useTrackEvent()` hook for components
- Automatically captures `FEATURE_SWITCHED` on route change
- Automatically captures `WRITING_SESSION_START/END` based on editor focus/blur

#### 1.5 Enhance Existing `traceGeneration()`

Modify `src/lib/ai/models.ts` to also write to `ai_interaction_archive` after every LLM call:
- On `generation.end()`: write full prompt + response + system prompt + parameters to archive
- This piggybacks on the existing LangFuse flow — no new code paths, one additional DB write
- Applies to ALL existing AI routes (`/api/chat`, `/api/rag-chat`, `/api/presentations/generate`, `/api/latex/*`)

**Estimated effort for Phase 1:** 2-3 focused sessions

---

### Phase 2: Privacy and Compliance

#### 2.1 Opt-Out Toggle

- Add `event_collection_opt_out` boolean to `users` table (default: `false`)
- Add toggle in Settings UI (existing settings page)
- Client-side buffer checks this before collecting
- Server-side `trackEvent()` checks this before writing
- When opted out: stop all event collection EXCEPT `usage_events` (cost tracking — essential for billing)

#### 2.2 GDPR Event Deletion

- `DELETE /api/users/:id/events` — authenticated, user can only delete own data
- Cascading delete across: `user_events` → `ai_interaction_archive` → `edit_diffs` → `search_citation_pairs`
- Also clears `writing_action_log` and `document_changes` (existing dead tables, will be wired)
- Confirmation required (POST with `{ confirm: true }`)
- Account deletion hook: when user deletes account via Clerk, trigger event data deletion within 30 days (per Blueprint)

#### 2.3 Data Retention Metadata

- Add `data_retention_policy` column to relevant tables (or a shared config)
- Document retention rules per Blueprint:
  - Raw events: 3 years → archive to cold storage
  - AI interaction archive: 1 year → summarize and delete full text
  - Edit diffs: 2 years → keep (highest-value)
  - Aggregated/anonymized: indefinite
- Implementation of actual archival/deletion can be a cron job added later — for now, document and tag

**Estimated effort for Phase 2:** 1 session

---

### Phase 3: Wire Event Logging Into All Features

This is the "no feature is complete without logging" mandate. Each feature gets its Blueprint event types wired through the new pipeline.

#### 3.1 LaTeX Editor Events (New Feature — Wire During Build)

| Event Type | Trigger | Data Captured |
|---|---|---|
| `AI_GENERATION_REQUESTED` | User triggers inline AI or slash command | prompt, command type, model to be used |
| `AI_GENERATION_COMPLETED` | AI response received | full response, model used, latency, tokens, cost |
| `AI_TEXT_ACCEPTED` | User clicks Accept or moves cursor | event_id of generation |
| `AI_TEXT_EDITED` | User modifies AI output | original + final text → `edit_diffs` table |
| `AI_TEXT_REJECTED` | User clicks Revert | event_id of generation |
| `WRITING_SESSION_START` | User opens LaTeX editor | project_id, file_id |
| `WRITING_SESSION_END` | User leaves or 30min inactivity | duration, word count delta |
| `MANUAL_TYPING_SESSION` | User types 50+ chars without AI | char count, section |
| `SEARCH_QUERY_SUBMITTED` | Cite tab search | query text |
| `PAPER_CITED_IN_DRAFT` | User inserts `\cite{key}` | paper metadata → update `search_citation_pairs` |
| `CHECK_SUBMITTED` | Check tab run | check type |
| `COMPILE_TRIGGERED` | User clicks Compile | compiler, duration, success/error |

#### 3.2 Studio (Draft Mode) Events — Retrofit

Wire into existing Tiptap editor:
- `AI_TEXT_ACCEPTED/EDITED/REJECTED/IGNORED` — on AI text interactions
- `MANUAL_TYPING_SESSION` — when user types 50+ chars without AI
- `SECTION_STARTED/COMPLETED` — when user begins/finishes sections
- `WRITING_SESSION_START/END` — on editor open/close
- Activate `writing_action_log` table (write to it from Studio AI interactions)
- Activate `document_changes` table (write to it from Tiptap change tracking)

#### 3.3 Deep Research Events — Retrofit

Wire into existing search infrastructure:
- `SEARCH_RESULTS_DISPLAYED` — when results are shown (log ranked list)
- `PAPER_CLICKED` — when user views a paper
- `PAPER_SAVED_TO_LIBRARY` — when user saves
- `PAPER_CITED_IN_DRAFT` — when user cites (HIGH-VALUE signal) → write to `search_citation_pairs`
- `PAPER_DISMISSED` — when user explicitly hides
- `FILTER_APPLIED` — when user applies filters
- `SEARCH_REFINED` — when user modifies query

#### 3.4 Chat with PDF Events — Retrofit

- `PDF_UPLOADED` — on document upload
- `PDF_QUESTION_ASKED` — user's question
- `PDF_ANSWER_GENERATED` — RAG response → `ai_interaction_archive`
- `PDF_ANSWER_ACTION` — accept/edit/reject

#### 3.5 Learn Mode Events — Retrofit (LaTeX + Future Studio)

- `SOCRATIC_QUESTION_ASKED` — system asks question
- `SOCRATIC_ANSWER_GIVEN` — user responds
- `CONCEPT_EXPLAINED` — concept displayed
- `LEARNING_PATH_PROGRESSED` — user advances

#### 3.6 Citation Events — Retrofit

- `CITATION_SUGGESTED/ACCEPTED/MANUALLY_ADDED/REMOVED/FORMAT_CHANGED`
- Feed into `search_citation_pairs` on acceptance

#### 3.7 Integrity Check Events — Retrofit

- `CHECK_SUBMITTED/CHECK_RESULTS_VIEWED/FLAGGED_PASSAGE_EDITED/FLAGGED_PASSAGE_IGNORED/RECHECK_SUBMITTED`

#### 3.8 Navigation/Workflow Events — Automatic via EventProvider

- `FEATURE_SWITCHED` — captured on route change by EventProvider
- `PROJECT_OPENED/CREATED` — on project load/creation
- `EXPORT_TRIGGERED` — on any export (PDF, DOCX, .tex, slides)
- `ERROR_ENCOUNTERED` — on system errors shown to user

**Estimated effort for Phase 3:** 3-4 focused sessions (the most labor-intensive phase)

---

### Phase 4: Monitoring and Readiness Dashboard

#### 4.1 Data Readiness Dashboard

Admin-only page at `/settings/data-readiness` (or `/admin/data-readiness`):

Implements all queries from the Readiness Guide:

| Panel | Query | Thresholds |
|---|---|---|
| Overall Event Volume | Total events, unique users, events this month | Growth trending |
| Citation Ranker Readiness | `search_citation_pairs WHERE paper_cited IS NOT NULL` | 5K experiment / 25K production / 100K strong |
| Writing Adapter Readiness | `edit_diffs` filtered by quality (>200 chars, 5s-10min, >10% change) | 2K / 10K / 50K |
| Socratic Model Readiness | Learn Mode Q&A chains with outcome signals | 10K / 50K / 200K |
| Workflow Conductor Readiness | Rich sessions (10+ events, 2+ features) | 50K / 200K / 1M |
| User Diversity | Unique contributing users, median pairs per user | Flag if <200 users or if any user >5% |
| Monthly AI API Cost | Sum of `cost_usd` from `user_events` last 30 days | $5K = distillation justified |
| Feature Coverage | Events by feature last 30 days | Flag if any feature has zero events |

Color-coded: COLLECTING → EXPERIMENT READY → PRODUCTION READY → STRONG

#### 4.2 Monthly Health Check Automation

- Vercel Cron job (or Node cron in Docker) that runs monthly
- Executes all Blueprint health check queries + Readiness Guide queries
- Generates a summary report
- Stores in DB or sends via email/webhook to founder
- Includes: event volume trend, edit diff count, search-cite pair count, user action distribution (accepted/edited/rejected percentages), data quality flags

#### 4.3 Data Quality Alerts

- Alert if any single user contributes >5% of training data (user concentration)
- Alert if >60% of search queries are in one medical specialty (topic concentration)
- Alert if `edit_diffs` has <100 new entries in a 30-day period (pipeline broken?)
- Alert if `user_events` has zero entries for any active feature (logging missing?)

**Estimated effort for Phase 4:** 1-2 sessions

---

### Phase 5: Distillation Readiness (Year 2 Preparation)

This phase is not urgent (it's pre-work for Year 2) but the Distillation Guide explicitly asks for it:

#### 5.1 Data Export Pipeline

- `src/lib/data-export/` — scripts to export training data
- Export `search_citation_pairs` as JSON/Parquet for Citation Ranker training
- Export `edit_diffs` (quality-filtered) as JSON/Parquet for Writing Adapter training
- Export `user_events` by feature as JSON for Workflow Conductor training
- Support: date range filtering, quality signal filtering, train/validation/test split (80/10/10)
- Output to GCP Cloud Storage bucket (weekly scheduled export)

#### 5.2 Evaluation Framework Shell

- `src/lib/evaluation/` — skeleton for model comparison
- Compare distilled model output vs. Sonnet output on N test examples
- Metrics: exact match, semantic similarity, user-preference proxy
- Generate quality report as JSON
- This is a SKELETON — full implementation happens when first distillation is attempted

#### 5.3 A/B Test Infrastructure Shell

- Feature flag support for routing between Sonnet and distilled model
- Log which model served each response (already captured in `model_used` field)
- Compare user acceptance rates between models
- This is a SKELETON — full implementation when first distilled model is deployed

#### 5.4 Pre-Launch Synthetic Data Generation

Per the Distillation Guide, we can generate initial training data BEFORE launch:
- 5,000 synthetic medical research scenarios
- Send to Claude Sonnet via API
- Capture full responses with reasoning
- Store as seed data for first distillation experiments
- Cost estimate: ~$30-60

**Question for Project Manager:** Should we do the synthetic data generation now (pre-launch) or wait until the data infrastructure is built and tested with real events first?

**Estimated effort for Phase 5:** 2-3 sessions (mostly the export pipeline)

---

## 6. Architectural Decisions Requiring Sign-Off

### Decision 1: `event_type` as TEXT vs. ENUM

The Blueprint uses `ENUM` for `event_type`. I recommend `TEXT` instead.

**Rationale:** New event types (from new features) would require database migrations if we use ENUM. With TEXT, adding a new event type is just a new string — no migration, no downtime. We validate event types in application code, not at the DB level.

**Risk:** Typos in event types won't be caught by the DB. Mitigated by: TypeScript const enum on the application side + validation in the ingestion endpoint.

**Recommendation:** TEXT with application-level validation.

### Decision 2: Where to Store `ai_interaction_archive` Data

Three options:

| Option | Pros | Cons |
|---|---|---|
| **A) Same PostgreSQL database** | Simple, transactional consistency, easy to query | Large text fields bloat DB, backup size grows |
| **B) Separate PostgreSQL table with cold storage archival** | Same simplicity, with scheduled archival to GCS after 1 year | Need to build archival pipeline |
| **C) Direct to GCS/S3 with metadata in PostgreSQL** | DB stays small, unlimited storage | Complex queries require joining DB + object store |

**Recommendation:** Option B. Start in the same database (simplicity), build archival to GCS as a Phase 5 task. At your projected scale (10K users by Month 12), the archive table will be manageable. Archive after 1 year per Blueprint retention rules.

### Decision 3: Client Event Buffer — Custom vs. Library

| Option | Pros | Cons |
|---|---|---|
| **A) Custom (generalize PresentationViewTracker)** | We already have the pattern, zero new dependencies, full control | We maintain it |
| **B) Use analytics library (e.g., @segment/analytics-next)** | Battle-tested, rich ecosystem | Another dependency, may conflict with PostHog, vendor concern |

**Recommendation:** Option A. We literally already have a working implementation of this pattern (`PresentationViewTracker`). Generalizing it is straightforward and avoids adding dependencies.

### Decision 4: Edit Diff Computation — Client vs. Server

Edit diffs can be computed on the client (before sending to `/api/events`) or on the server (send before/after text, server computes diff).

| Option | Pros | Cons |
|---|---|---|
| **A) Client-side diff** | Reduces server load, diff happens immediately | Adds ~5KB to client bundle (diff library), more complex client code |
| **B) Server-side diff** | Simple client (just send before/after text), centralized logic | Higher server load, larger payloads over network |

**Recommendation:** Option B. Send `original_text` and `final_text` to the server. The `/api/events` route computes `diff_operations`. Keeps the client simple and ensures consistent diff format across all features (Studio, LaTeX, Notebook).

### Decision 5: PostHog Overlap

We currently have PostHog for product analytics AND we're building our own event pipeline. The Blueprint's events overlap with PostHog autocapture.

| Option | Pros | Cons |
|---|---|---|
| **A) Keep both, separate concerns** | PostHog for product analytics (funnels, A/B tests, session replay). Own pipeline for ML training data. | Duplicate some events, slightly higher cost |
| **B) Replace PostHog with own pipeline** | One system, no duplication | Lose PostHog's analytics UI, session replay, funnels |
| **C) Use PostHog as primary, export to own DB** | PostHog's UI + own data ownership | PostHog data export is limited on free tier, adds dependency |

**Recommendation:** Option A. PostHog does product analytics well (funnels, session replay, feature flags). Our pipeline does ML training data well (full prompt/response, edit diffs, citation pairs). Different tools for different jobs. The overlap (basic clickstream) is minor and not worth the risk of consolidating.

### Decision 6: Event Pipeline — Synchronous vs. Queue-Based

The Blueprint says: "Write to events table immediately (synchronous insert). For large AI interactions, write to ai_interaction_archive asynchronously."

For MVP, I recommend:
- `user_events`: Synchronous Drizzle insert (events are small, fast)
- `ai_interaction_archive`: Async via `Promise` (fire-and-forget, don't await)
- `edit_diffs`: Async via `Promise` (fire-and-forget)
- `search_citation_pairs`: Synchronous (infrequent, important to not lose)

**Future upgrade path:** If event volume causes write contention (unlikely before 10K users), add a proper queue (BullMQ with Redis, or Inngest).

---

## 7. Questions for Project Manager

### Critical (Block Execution)

1. **Stack confirmation:** The Briefing references Supabase. We're using Drizzle + self-hosted PostgreSQL. Should I proceed with the current stack, or is there a migration to Supabase planned?

2. **Branch strategy:** Should the data foundation work happen on a single feature branch (`feature/data-foundation`), or should I split it into multiple branches (e.g., `feature/event-schema`, `feature/event-pipeline`, `feature/event-retrofit`)?

3. **LaTeX editor merge priority:** Should I fix the LaTeX editor's functional gaps and merge it BEFORE starting data foundation work, or can they be parallel?

4. **Learn Mode scope:** The Blueprint lists Learn Mode events (SOCRATIC_QUESTION_ASKED, etc.). Currently, Learn Mode in the LaTeX editor is a static data file with GPT-5 Nano follow-ups. Should I build full Learn Mode event logging now, or defer until Learn Mode is more fully developed?

### Important (Inform Direction)

5. **Data Readiness Dashboard location:** Should this be at `/settings/data-readiness` (accessible to admins only), or a completely separate admin route like `/admin/data`? Does the existing app have an admin role system?

6. **Monthly health check delivery:** The Blueprint says "run monthly." Should the report be: (a) an admin dashboard page refreshed on demand, (b) a scheduled email to the founder, (c) a Slack webhook, or (d) all of the above?

7. **Synthetic data generation timing:** The Distillation Guide suggests generating 5,000 synthetic examples pre-launch. Should I build this as part of the data foundation, or is this a separate initiative?

8. **Edit diff granularity:** Should we capture diffs at the paragraph level (when any paragraph changes), the session level (diff between session start and end), or the AI-interaction level (diff between AI output and what user kept)? The Blueprint suggests AI-interaction level. Confirm?

### Low Priority (Can Decide Later)

9. **Data retention enforcement:** The Blueprint specifies retention periods (3yr raw, 1yr archive, 2yr diffs). Should I build automated deletion/archival now, or just document the policy and build enforcement later?

10. **BigQuery migration trigger:** At what event volume should we export from PostgreSQL to BigQuery? The Blueprint says "when data volume demands it." Is there a specific threshold (e.g., >10M events, or >50GB)?

---

## 8. Cost and Risk Assessment

### Implementation Cost (Engineering Time)

| Phase | Estimated Sessions | Complexity |
|---|---|---|
| Phase 0: Branch consolidation | 2-3 sessions | Low (merge conflicts) |
| Phase 1: Core event infrastructure | 2-3 sessions | Medium (new tables, API, client buffer) |
| Phase 2: Privacy and compliance | 1 session | Low |
| Phase 3: Wire all features | 3-4 sessions | High (touches many existing files) |
| Phase 4: Monitoring dashboard | 1-2 sessions | Medium |
| Phase 5: Distillation readiness | 2-3 sessions | Medium (export pipeline) |
| **Total** | **11-16 sessions** | |

### Runtime Cost (Infrastructure)

| Component | Cost Impact |
|---|---|
| 4 new PostgreSQL tables | Negligible (same DB, just more tables) |
| `/api/events` endpoint | Negligible (Vercel serverless, scales with traffic) |
| AI interaction archive storage | ~1-5 GB/month at 10K users (text storage is cheap) |
| Monthly health check cron | Negligible |
| Data export to GCS | ~$5-10/month for storage at scale |

### Risks

| Risk | Mitigation |
|---|---|
| Event logging slows down UI | Client buffer is async/fire-and-forget. Never blocks UI. sendBeacon is non-blocking by design. |
| Event table grows too large | `created_month` column enables future partitioning. Retention policy archives old data. |
| Privacy incident (logging PII) | Blueprint rules enforced: no raw PII in events. User content stays in project tables only. Opt-out toggle. GDPR deletion endpoint. |
| Retroffiting existing features breaks them | Each feature gets events added incrementally. Events are fire-and-forget — if logging fails, the feature still works. |
| Edit diff quality is poor (mostly typo fixes) | Quality filters from Readiness Guide built into the dashboard. Track % of diffs that pass quality threshold. |

---

## 9. What I Will NOT Do (Explicit Scope Boundaries)

Per the documents and common sense, these are explicitly OUT OF SCOPE for this implementation:

1. **Build or train any ML models** — That's Year 2. We're building the data collection infrastructure.
2. **Build the full distillation pipeline** — Phase 5 is a skeleton/export pipeline only.
3. **Migrate to Supabase** — Unless the project manager says otherwise.
4. **Build a public API** — The memory file explicitly says "NOT building: public REST API."
5. **Deploy to BigQuery** — Start in PostgreSQL, migrate when volume demands it.
6. **Build model serving infrastructure** — Year 2+ when distilled models exist.
7. **Implement actual data retention enforcement** — Document the policy, build enforcement later.
8. **Change any AI model routing** — Claude Sonnet for writing, GPT-5 Nano for mechanical. This is settled.

---

## 10. Proposed Execution Order

```
IMMEDIATE (This Week):
  → Fix LaTeX editor functional gaps (EditorView ref, slash commands, jump-to-line)
  → Merge feature/latex-editor
  → Merge feature/presentation-engine-v2

NEXT (After Merges):
  → Phase 1: Core event infrastructure (4 tables, /api/events, client buffer, trackEvent)
  → Phase 2: Privacy and compliance (opt-out, GDPR deletion)

THEN:
  → Phase 3: Wire events into LaTeX editor first (newest feature, easiest to wire)
  → Phase 3: Wire events into Studio, Deep Research, Chat with PDF
  → Phase 3: Wire events into remaining features (Citations, Integrity, Notebook, Navigation)

FINALLY:
  → Phase 4: Data Readiness Dashboard
  → Phase 5: Export pipeline skeleton

PRE-LAUNCH (If Time Permits):
  → Generate 5,000 synthetic training examples per Distillation Guide
```

---

## 11. Summary of Commitments

If the project manager approves this plan, I commit to:

1. Building all 4 ML-specific tables following the Blueprint schema exactly (adapted for Drizzle ORM)
2. Building a generic event pipeline (client buffer + `/api/events` + `trackEvent()` helper) modeled after the existing `PresentationViewTracker`
3. Wiring every existing feature with its Blueprint-mandated events
4. Building privacy controls (opt-out toggle + GDPR deletion)
5. Building a Data Readiness Dashboard with the Readiness Guide's SQL queries and thresholds
6. Building an export pipeline skeleton for future distillation
7. Storing full prompts and responses (not hashes) in `ai_interaction_archive` per the Distillation Guide's requirements
8. Following the "never block UI" principle — all event logging is async/fire-and-forget
9. NOT touching the AI model routing (Claude Sonnet for writing, GPT-5 Nano for mechanical — this is settled)
10. NOT building any ML models, distillation pipelines, or model serving infrastructure (that's Year 2)

---

*This document is the complete engineering response to all four strategy documents. No further context is needed from prior conversations. Awaiting project manager approval to begin execution.*
