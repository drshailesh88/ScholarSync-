# Data Foundation — Phase 1 Implementation Plan

**Date:** 2026-02-27
**Status:** READY TO EXECUTE (waiting for Phase 0 branch merges)
**Branch:** `feature/data-foundation` (to be created from clean `main` after merges)
**Depends on:** PM approval document `docs/plans/2026-02-27-pm-approval-data-strategy.md`

---

## Table of Contents

1. [File Structure Plan](#1-file-structure-plan)
2. [Drizzle Schema Definitions (4 Tables)](#2-drizzle-schema-definitions)
3. [TypeScript Event Types Const Object](#3-typescript-event-types)
4. [trackEvent() Server-Side Helper](#4-trackevent-helper)
5. [trackEditDiff() Server-Side Helper](#5-trackeditdiff-helper)
6. [trackCitationPair() Server-Side Helper](#6-trackcitationpair-helper)
7. [EventBuffer Client-Side Class](#7-eventbuffer-client-side)
8. [EventProvider React Component](#8-eventprovider-react-component)
9. [POST /api/events Route](#9-api-events-route)
10. [Enhanced traceGeneration()](#10-enhanced-tracegeneration)
11. [Migration & Barrel Export Updates](#11-migration-and-exports)
12. [Dependency Additions](#12-dependency-additions)

---

## 1. File Structure Plan

```
New files to create:
─────────────────────
src/lib/db/schema/events.ts              ← 4 new tables (user_events, ai_interaction_archive,
                                            edit_diffs, search_citation_pairs)
src/lib/events/types.ts                  ← EVENT_TYPES const object, TypeScript types
src/lib/events/track-event.ts            ← trackEvent() server-side fire-and-forget helper
src/lib/events/track-edit-diff.ts        ← trackEditDiff() server-side helper
src/lib/events/track-citation-pair.ts    ← trackCitationPair() server-side helper
src/lib/events/index.ts                  ← barrel export for src/lib/events/
src/lib/events/event-buffer.ts           ← EventBuffer client-side class ("use client")
src/components/providers/event-provider.tsx ← React context provider + useTrackEvent() hook
src/app/api/events/route.ts              ← POST /api/events ingestion endpoint

Files to modify:
────────────────
src/lib/db/schema/index.ts               ← Add: export * from "./events";
src/lib/db/schema/relations.ts           ← Add: relations for 4 new tables
src/lib/ai/models.ts                     ← Enhance traceGeneration() to write to ai_interaction_archive
src/lib/ai/cost-tracker.ts               ← Add gpt-5-nano to MODEL_PRICING
src/app/layout.tsx                        ← Wrap children with EventProvider (alongside PostHogProvider)

Files NOT touched (Phase 1 only builds infrastructure):
───────────────────────────────────────────────────────
src/components/latex-editor/*             ← Event wiring is Phase 3
src/app/api/latex/*                       ← Event wiring is Phase 3
src/app/api/chat/*                        ← Event wiring is Phase 3
Any existing feature code                 ← Event wiring is Phase 3
```

### Dependency Graph

```
event-provider.tsx ──imports──> event-buffer.ts ──fetches──> /api/events/route.ts
                                                                    │
                                                              writes to DB
                                                                    │
                                              ┌─────────────────────┼─────────────────────┐
                                              │                     │                     │
                                         user_events    ai_interaction_archive    (edit_diffs via
                                                                                  track-edit-diff.ts)

track-event.ts ──imports──> events.ts (schema) + types.ts (event types) + logger.ts
track-edit-diff.ts ──imports──> events.ts (schema) + logger.ts
track-citation-pair.ts ──imports──> events.ts (schema) + logger.ts

models.ts (enhanced traceGeneration) ──imports──> events.ts (schema) + logger.ts
```

---

## 2. Drizzle Schema Definitions

**File:** `src/lib/db/schema/events.ts`

All patterns match the codebase conventions documented in the exploration:
- `text("id").primaryKey().$defaultFn(() => crypto.randomUUID())` for UUID PKs
- `timestamp("...", { withTimezone: true }).defaultNow().notNull()` for timestamps
- `real("...")` for cost (NOT decimal — no decimal exists anywhere in this codebase)
- `jsonb("...").default({})` for structured data
- Inline `.references()` for FKs
- Index array as second `pgTable` argument

### Table 1: `user_events` — Canonical Event Store

```typescript
import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./core";

export const userEvents = pgTable(
  "user_events",
  {
    // ── Identity ──
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventType: text("event_type").notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true })
      .defaultNow()
      .notNull(),

    // ── Who ──
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sessionId: text("session_id").notNull(),
    projectId: text("project_id"),

    // ── Where in the App ──
    feature: text("feature").notNull(),
    pageContext: text("page_context"),

    // ── The Interaction ──
    input: jsonb("input"),
    output: jsonb("output"),
    userAction: text("user_action"),
    userEdit: jsonb("user_edit"),

    // ── AI Metadata ──
    modelUsed: text("model_used"),
    modelParams: jsonb("model_params"),
    latencyMs: integer("latency_ms"),
    tokenCountIn: integer("token_count_in"),
    tokenCountOut: integer("token_count_out"),
    costUsd: real("cost_usd"),

    // ── Context ──
    contextSnapshot: jsonb("context_snapshot"),

    // ── Outcome Signals (filled asynchronously) ──
    downstreamSignal: jsonb("downstream_signal"),

    // ── Partitioning readiness ──
    // NOTE: Drizzle does not support GENERATED ALWAYS AS in pgTable.
    // We compute created_month in application code or via a DB trigger.
    // For now, store it as a plain text column populated by trackEvent().
    createdMonth: text("created_month"),
  },
  (table) => [
    index("idx_user_events_user").on(table.userId, table.timestamp),
    index("idx_user_events_type").on(table.eventType, table.timestamp),
    index("idx_user_events_feature").on(table.feature, table.timestamp),
    index("idx_user_events_project").on(table.projectId, table.timestamp),
    index("idx_user_events_session").on(table.sessionId, table.timestamp),
    index("idx_user_events_month").on(table.createdMonth),
    index("idx_user_events_edits").on(table.eventType, table.userAction),
  ]
);
```

**Design notes:**
- `projectId` is `text` (not `integer`) because LaTeX projects use UUID text IDs while Studio projects use serial integers. Using text accommodates both. No FK constraint — the reference is polymorphic.
- `createdMonth` is computed by `trackEvent()` as `YYYY-MM` string. Drizzle doesn't support `GENERATED ALWAYS AS` — we populate it in application code. This enables future partitioning.
- The `idx_user_events_edits` index has no partial index (`WHERE user_action = 'edited'`). Drizzle's `index()` API does not support `WHERE` clauses natively. The composite index on `(eventType, userAction)` is sufficient — queries that filter on `user_action = 'edited'` will use it efficiently.
- `sessionId` is required (`notNull`) — the client generates it. The server validates its presence.
- `timestamp` column name matches the Blueprint spec. In queries, access it as `userEvents.timestamp`.

### Table 2: `ai_interaction_archive` — Full Prompt/Response Storage

```typescript
export const aiInteractionArchive = pgTable(
  "ai_interaction_archive",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventId: text("event_id")
      .notNull()
      .references(() => userEvents.id, { onDelete: "cascade" }),
    fullPrompt: text("full_prompt"),
    systemPrompt: text("system_prompt"),
    fullResponse: text("full_response"),
    fullContext: jsonb("full_context"),

    // ── Archival support (PM directive) ──
    archived: boolean("archived").default(false),
    gcsUri: text("gcs_uri"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_ai_archive_event").on(table.eventId),
    index("idx_ai_archive_archived").on(table.archived),
  ]
);
```

**Design notes:**
- `fullPrompt` and `systemPrompt` store the FULL text, not hashes. PM confirmed this is required for distillation (teacher data reconstruction).
- `archived` boolean (PM addition): when the archival job runs, it sets `archived = true`, copies the row to GCS, then NULLs out `fullPrompt`/`fullResponse`/`fullContext` and sets `gcsUri` to the GCS path. Metadata (`eventId`, `createdAt`) remains queryable.
- `eventId` FK cascades on delete — when a user_events row is deleted (GDPR), the archive is also deleted.
- No `userId` column — join through `userEvents.userId` when needed. Avoids data duplication.

### Table 3: `edit_diffs` — Highest-Value Training Data

```typescript
export const editDiffs = pgTable(
  "edit_diffs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventId: text("event_id")
      .notNull()
      .references(() => userEvents.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    originalText: text("original_text").notNull(),
    finalText: text("final_text").notNull(),
    diffOperations: jsonb("diff_operations"),
    editDurationMs: integer("edit_duration_ms"),
    sectionType: text("section_type"),

    // ── Quality filtering fields (from Readiness Guide) ──
    charCountOriginal: integer("char_count_original"),
    charCountFinal: integer("char_count_final"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_edit_diffs_user").on(table.userId, table.createdAt),
    index("idx_edit_diffs_section").on(table.sectionType),
    index("idx_edit_diffs_event").on(table.eventId),
  ]
);
```

**Design notes:**
- `userId` is denormalized here (also reachable via `eventId` → `userEvents.userId`). Included because the Readiness Guide's quality-filtering queries join directly on `edit_diffs.userId` without needing a JOIN to `user_events`. This is a deliberate trade-off: ~8 bytes per row vs. avoiding a JOIN on the most-queried ML training table.
- `charCountOriginal` and `charCountFinal` are denormalized from `LENGTH(original_text)` and `LENGTH(final_text)`. Computed once by `trackEditDiff()` at write time. Enables the Readiness Guide's quality filter (`ABS(char_count_original - char_count_final) > char_count_original * 0.10`) as a simple integer comparison without recomputing `LENGTH()` on every query across potentially millions of rows.
- `editDurationMs` is CRITICAL for quality filtering (Readiness Guide: 5000-600000ms range). The client must capture the timestamp when AI text was inserted and when the user finished editing.
- `sectionType` captures where in the paper the edit happened (Introduction, Methods, Results, Discussion, etc.). PM confirmed this enables section-specific writing model training later.
- `diffOperations` JSONB stores the structured diff from `diff-match-patch`. Format: array of `[operation, text]` tuples where operation is -1 (delete), 0 (equal), or 1 (insert). This is the native output format of `diff-match-patch`.

### Table 4: `search_citation_pairs` — Recommendation Training Data

```typescript
export const searchCitationPairs = pgTable(
  "search_citation_pairs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    searchQuery: text("search_query").notNull(),
    resultsShown: jsonb("results_shown").notNull(),
    paperClicked: jsonb("paper_clicked"),
    paperCited: jsonb("paper_cited"),
    paperSaved: jsonb("paper_saved"),
    timeToDecision: jsonb("time_to_decision"),
    searchTimestamp: timestamp("search_timestamp", { withTimezone: true })
      .notNull(),
    citationTimestamp: timestamp("citation_timestamp", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_search_citation_user").on(table.userId, table.createdAt),
    index("idx_search_citation_query").on(table.searchQuery),
    index("idx_search_citation_uncited").on(table.userId, table.paperCited),
  ]
);
```

**Design notes:**
- `resultsShown` is JSONB storing the ranked array of papers returned by the search. Structure: `[{ paperId, title, rank, score }]`. This is the candidate set for training the Citation Ranker.
- `paperClicked`, `paperCited`, `paperSaved` are JSONB arrays (nullable). Updated asynchronously — `paperCited` may be filled days after `searchTimestamp`.
- `citationTimestamp` is nullable — filled when the user cites a paper from this search session.
- `idx_search_citation_uncited` index supports the linkage query: "find recent search_citation_pairs for this user where paperCited is still NULL" — used when a citation is inserted to back-link it to the originating search.
- `timeToDecision` JSONB: `{ "paper_123": 4500, "paper_456": 1200 }` — milliseconds spent viewing each paper before making a decision. Per-paper timing for the Citation Ranker's confidence signal.

---

## 3. TypeScript Event Types

**File:** `src/lib/events/types.ts`

PM directive: use a TypeScript const object (not enum). This is the single source of truth. The `/api/events` endpoint validates against this but logs warnings for unknown types without rejecting (prevents data loss during deployments).

```typescript
/**
 * Canonical event types — the single source of truth.
 * Organized by feature per the Data Foundation Blueprint.
 *
 * Usage:
 *   import { EVENT_TYPES } from "@/lib/events/types";
 *   trackEvent({ eventType: EVENT_TYPES.DEEP_RESEARCH.PAPER_CLICKED, ... });
 *
 * When adding a new event type:
 *   1. Add it here
 *   2. The /api/events endpoint will accept it immediately (no migration needed)
 */
export const EVENT_TYPES = {
  // ── Deep Research ──
  DEEP_RESEARCH: {
    SEARCH_QUERY_SUBMITTED: "SEARCH_QUERY_SUBMITTED",
    SEARCH_RESULTS_DISPLAYED: "SEARCH_RESULTS_DISPLAYED",
    PAPER_CLICKED: "PAPER_CLICKED",
    PAPER_SAVED_TO_LIBRARY: "PAPER_SAVED_TO_LIBRARY",
    PAPER_CITED_IN_DRAFT: "PAPER_CITED_IN_DRAFT",
    PAPER_DISMISSED: "PAPER_DISMISSED",
    SEARCH_REFINED: "SEARCH_REFINED",
    FILTER_APPLIED: "FILTER_APPLIED",
    RETRIEVAL_PIPELINE_STEP: "RETRIEVAL_PIPELINE_STEP",
  },

  // ── Draft Mode (Studio + LaTeX) ──
  DRAFT: {
    AI_GENERATION_REQUESTED: "AI_GENERATION_REQUESTED",
    AI_GENERATION_COMPLETED: "AI_GENERATION_COMPLETED",
    AI_TEXT_ACCEPTED: "AI_TEXT_ACCEPTED",
    AI_TEXT_EDITED: "AI_TEXT_EDITED",
    AI_TEXT_REJECTED: "AI_TEXT_REJECTED",
    AI_TEXT_IGNORED: "AI_TEXT_IGNORED",
    MANUAL_TYPING_SESSION: "MANUAL_TYPING_SESSION",
    SECTION_STARTED: "SECTION_STARTED",
    SECTION_COMPLETED: "SECTION_COMPLETED",
    WRITING_SESSION_START: "WRITING_SESSION_START",
    WRITING_SESSION_END: "WRITING_SESSION_END",
  },

  // ── Learn Mode ──
  LEARN: {
    SOCRATIC_QUESTION_ASKED: "SOCRATIC_QUESTION_ASKED",
    SOCRATIC_ANSWER_GIVEN: "SOCRATIC_ANSWER_GIVEN",
    SOCRATIC_HINT_REQUESTED: "SOCRATIC_HINT_REQUESTED",
    CONCEPT_EXPLAINED: "CONCEPT_EXPLAINED",
    EXPLANATION_RATED: "EXPLANATION_RATED",
    LEARNING_PATH_PROGRESSED: "LEARNING_PATH_PROGRESSED",
    QUIZ_ATTEMPTED: "QUIZ_ATTEMPTED",
  },

  // ── Chat with PDF ──
  PDF_CHAT: {
    PDF_UPLOADED: "PDF_UPLOADED",
    PDF_QUESTION_ASKED: "PDF_QUESTION_ASKED",
    PDF_ANSWER_GENERATED: "PDF_ANSWER_GENERATED",
    PDF_ANSWER_ACTION: "PDF_ANSWER_ACTION",
    PDF_HIGHLIGHT_CREATED: "PDF_HIGHLIGHT_CREATED",
    PDF_NOTE_ADDED: "PDF_NOTE_ADDED",
  },

  // ── Citations ──
  CITATION: {
    CITATION_SUGGESTED: "CITATION_SUGGESTED",
    CITATION_ACCEPTED: "CITATION_ACCEPTED",
    CITATION_MANUALLY_ADDED: "CITATION_MANUALLY_ADDED",
    CITATION_FORMAT_CHANGED: "CITATION_FORMAT_CHANGED",
    CITATION_REMOVED: "CITATION_REMOVED",
  },

  // ── Notebook Mode ──
  NOTEBOOK: {
    SOURCE_ADDED_TO_NOTEBOOK: "SOURCE_ADDED_TO_NOTEBOOK",
    SYNTHESIS_REQUESTED: "SYNTHESIS_REQUESTED",
    SYNTHESIS_GENERATED: "SYNTHESIS_GENERATED",
    SYNTHESIS_ACTION: "SYNTHESIS_ACTION",
    NOTE_CREATED: "NOTE_CREATED",
    CONNECTION_MADE: "CONNECTION_MADE",
  },

  // ── Plagiarism & AI Detection ──
  INTEGRITY: {
    CHECK_SUBMITTED: "CHECK_SUBMITTED",
    CHECK_RESULTS_VIEWED: "CHECK_RESULTS_VIEWED",
    FLAGGED_PASSAGE_EDITED: "FLAGGED_PASSAGE_EDITED",
    FLAGGED_PASSAGE_IGNORED: "FLAGGED_PASSAGE_IGNORED",
    RECHECK_SUBMITTED: "RECHECK_SUBMITTED",
  },

  // ── Workflow / Navigation ──
  WORKFLOW: {
    FEATURE_SWITCHED: "FEATURE_SWITCHED",
    PROJECT_OPENED: "PROJECT_OPENED",
    PROJECT_CREATED: "PROJECT_CREATED",
    EXPORT_TRIGGERED: "EXPORT_TRIGGERED",
    SETTING_CHANGED: "SETTING_CHANGED",
    ERROR_ENCOUNTERED: "ERROR_ENCOUNTERED",
    FEEDBACK_GIVEN: "FEEDBACK_GIVEN",
  },

  // ── LaTeX-Specific ──
  LATEX: {
    COMPILE_TRIGGERED: "COMPILE_TRIGGERED",
    COMPILE_COMPLETED: "COMPILE_COMPLETED",
    SLASH_COMMAND_USED: "SLASH_COMMAND_USED",
    TEMPLATE_SELECTED: "TEMPLATE_SELECTED",
    FILE_CREATED: "FILE_CREATED",
    FILE_DELETED: "FILE_DELETED",
    MODE_TOGGLED: "MODE_TOGGLED",
  },
} as const;

// Flatten all event types into a single union type for validation
type EventTypeValues<T> = T extends Record<string, Record<string, string>>
  ? T[keyof T][keyof T[keyof T]]
  : never;

export type EventType = EventTypeValues<typeof EVENT_TYPES>;

// Flat set of all known event types for validation
export const KNOWN_EVENT_TYPES: Set<string> = new Set(
  Object.values(EVENT_TYPES).flatMap((category) => Object.values(category))
);

// ── Feature enum (the "feature" field in user_events) ──
export const FEATURES = {
  DRAFT_MODE: "draft_mode",
  LEARN_MODE: "learn_mode",
  DEEP_RESEARCH: "deep_research",
  CHAT_WITH_PDF: "chat_with_pdf",
  NOTEBOOK_MODE: "notebook_mode",
  PLAGIARISM_CHECK: "plagiarism_check",
  CITATION_TOOL: "citation_tool",
  LATEX_EDITOR: "latex_editor",
  SLIDES_GENERATOR: "slides_generator",
  WRITING_ANALYSIS: "writing_analysis",
  SYSTEMATIC_REVIEW: "systematic_review",
  SETTINGS: "settings",
  DASHBOARD: "dashboard",
} as const;

export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

// ── User action enum ──
export const USER_ACTIONS = {
  ACCEPTED: "accepted",
  EDITED: "edited",
  REJECTED: "rejected",
  IGNORED: "ignored",
  PARTIAL_ACCEPT: "partial_accept",
} as const;

export type UserAction = (typeof USER_ACTIONS)[keyof typeof USER_ACTIONS];

// ── Event payload type (what the client sends) ──
export interface TrackEventPayload {
  eventType: string;
  sessionId: string;
  projectId?: string;
  feature: string;
  pageContext?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  userAction?: string;
  userEdit?: {
    original: string;
    final: string;
    editDurationMs?: number;
    sectionType?: string;
  };
  modelUsed?: string;
  modelParams?: Record<string, unknown>;
  latencyMs?: number;
  tokenCountIn?: number;
  tokenCountOut?: number;
  costUsd?: number;
  contextSnapshot?: Record<string, unknown>;
}

// ── Batch payload (what /api/events receives) ──
export interface EventBatchPayload {
  events: TrackEventPayload[];
}
```

---

## 4. trackEvent() Server-Side Helper

**File:** `src/lib/events/track-event.ts`

Modeled after `trackAIUsage()` in `cost-tracker.ts` — fire-and-forget, never throws, logger.error on failure.

```
SIGNATURE:
  trackEvent(params: {
    userId: string;
    eventType: string;
    sessionId: string;
    feature: string;
    projectId?: string;
    pageContext?: string;
    input?: Record<string, unknown>;
    output?: Record<string, unknown>;
    userAction?: string;
    userEdit?: { original: string; final: string; editDurationMs?: number; sectionType?: string };
    modelUsed?: string;
    modelParams?: Record<string, unknown>;
    latencyMs?: number;
    tokenCountIn?: number;
    tokenCountOut?: number;
    costUsd?: number;
    contextSnapshot?: Record<string, unknown>;
    downstreamSignal?: Record<string, unknown>;
    // For AI interaction archival:
    fullPrompt?: string;
    systemPrompt?: string;
    fullResponse?: string;
    fullContext?: Record<string, unknown>;
  }) => void

RETURNS: void (fire-and-forget, like trackAIUsage)

BEHAVIOR:
  1. Compute createdMonth = new Date().toISOString().slice(0, 7)  // "YYYY-MM"

  2. Validate eventType:
     - If eventType is in KNOWN_EVENT_TYPES → proceed normally
     - If eventType is NOT in KNOWN_EVENT_TYPES → log warning, STILL insert
       (PM directive: "Log warnings for unknown event types but do not reject them")

  3. Synchronous insert to user_events:
     db.insert(userEvents).values({
       eventType, timestamp: new Date(), userId, sessionId,
       projectId, feature, pageContext, input, output,
       userAction, userEdit, modelUsed, modelParams,
       latencyMs, tokenCountIn, tokenCountOut, costUsd,
       contextSnapshot, downstreamSignal, createdMonth,
     })
     .then((result) => {
       // Step 4: If AI data is present, async write to archive
       // Step 5: If userEdit is present, async write to edit_diffs
     })
     .catch((err) => {
       logger.error("Failed to track event", err, { eventType, feature });
     });

  4. ASYNC archive write (inside the .then() of step 3):
     If fullPrompt OR fullResponse is truthy:
       db.insert(aiInteractionArchive).values({
         eventId: <id from step 3 insert>,
         fullPrompt, systemPrompt, fullResponse, fullContext,
       })
       .catch((err) => {
         logger.error("Failed to archive AI interaction", err, { eventType });
       });

  5. ASYNC edit diff write (inside the .then() of step 3):
     If userEdit is truthy AND userEdit.original AND userEdit.final:
       Import and call trackEditDiff({
         eventId: <id from step 3 insert>,
         userId,
         originalText: userEdit.original,
         finalText: userEdit.final,
         editDurationMs: userEdit.editDurationMs,
         sectionType: userEdit.sectionType,
       });

ERROR HANDLING (PM Directive 2):
  - The entire function body is NOT wrapped in try-catch at this level.
    Instead, every DB operation uses .catch() with logger.error.
  - Callers SHOULD still wrap in try-catch per the PM's pattern:
      try { trackEvent({...}); } catch (err) { logger.error("Event tracking failed", err); }
  - But even if they don't, trackEvent itself never throws because
    it's fully promise-chained with .catch() handlers.

IMPLEMENTATION NOTE — Getting the inserted row's ID:
  Drizzle's .insert().values().returning() returns the inserted row.
  Use .returning({ id: userEvents.id }) to get the ID for the archive/diff writes.
  Change the pattern from fire-and-forget to:
    db.insert(userEvents).values({...}).returning({ id: userEvents.id })
      .then(([row]) => { /* archive + diff writes using row.id */ })
      .catch(...)
  This is still async/non-blocking — the promise floats, caller doesn't await.
```

---

## 5. trackEditDiff() Server-Side Helper

**File:** `src/lib/events/track-edit-diff.ts`

```
SIGNATURE:
  trackEditDiff(params: {
    eventId: string;
    userId: string;
    originalText: string;
    finalText: string;
    editDurationMs?: number;
    sectionType?: string;
  }) => void

RETURNS: void (fire-and-forget)

BEHAVIOR:
  1. Compute char counts:
     charCountOriginal = originalText.length
     charCountFinal = finalText.length

  2. Compute diff using diff-match-patch:
     import DiffMatchPatch from "diff-match-patch";
     const dmp = new DiffMatchPatch();
     const diffs = dmp.diff_main(originalText, finalText);
     dmp.diff_cleanupSemantic(diffs);
     // diffs is Array<[number, string]> where number is -1|0|1

  3. Fire-and-forget insert:
     db.insert(editDiffs).values({
       eventId,
       userId,
       originalText,
       finalText,
       diffOperations: diffs,    // JSONB — the native diff-match-patch output
       editDurationMs,
       sectionType,
       charCountOriginal,
       charCountFinal,
     })
     .catch((err) => {
       logger.error("Failed to track edit diff", err, { eventId });
     });

PERF NOTE:
  diff-match-patch is fast (~1ms for typical paragraph-length texts).
  For very large texts (>50KB), consider truncating to first 50KB.
  At our scale this is not a concern.

DIFF FORMAT (stored in diffOperations JSONB):
  [
    [0, "The results show that "],     // 0 = equal (unchanged)
    [-1, "SGLT2 inhibitors"],          // -1 = delete (was in original)
    [1, "sodium-glucose co-transporter 2 inhibitors"],  // 1 = insert (in final)
    [0, " significantly reduce..."]    // 0 = equal
  ]
  This is the native diff-match-patch format. No transformation needed.
```

---

## 6. trackCitationPair() Server-Side Helper

**File:** `src/lib/events/track-citation-pair.ts`

```
SIGNATURE (two functions):

  createCitationPair(params: {
    userId: string;
    searchQuery: string;
    resultsShown: Array<{ paperId: string; title: string; rank: number; score?: number }>;
    searchTimestamp: Date;
  }) => void

  updateCitationPair(params: {
    userId: string;
    paperId: string;
    action: "clicked" | "cited" | "saved";
  }) => void

BEHAVIOR — createCitationPair:
  Fire-and-forget insert to search_citation_pairs:
  db.insert(searchCitationPairs).values({
    userId,
    searchQuery,
    resultsShown,
    searchTimestamp,
  })
  .catch((err) => logger.error("Failed to create citation pair", err));

BEHAVIOR — updateCitationPair:
  1. Find the most recent search_citation_pairs row for this user
     where the paperId appears in resultsShown and paperCited is NULL:

     SELECT * FROM search_citation_pairs
     WHERE user_id = :userId
       AND results_shown @> '[{"paperId": ":paperId"}]'::jsonb
       AND paper_cited IS NULL
     ORDER BY search_timestamp DESC
     LIMIT 1

  2. Based on action:
     - "clicked": append to paperClicked JSONB array
     - "cited": set paperCited, set citationTimestamp = NOW()
     - "saved": append to paperSaved JSONB array

  3. Fire-and-forget update.

  Note: The JSONB containment query (`@>`) is efficient with a GIN index.
  We don't add a GIN index by default (overkill at launch scale).
  If this query becomes slow (>50ms), add:
    CREATE INDEX idx_search_citation_results_gin ON search_citation_pairs USING gin (results_shown);

LINKAGE STRATEGY:
  The temporal gap between search and citation can be hours or days.
  updateCitationPair searches backwards through recent unfilled pairs.
  If no matching pair is found, the update is silently dropped
  (the user may have found the paper through a different path).
```

---

## 7. EventBuffer Client-Side Class

**File:** `src/lib/events/event-buffer.ts`

Generalized from `PresentationViewTracker`. The table below shows what's reused vs. new:

| PresentationViewTracker Pattern | EventBuffer Equivalent | Status |
|---|---|---|
| `flushed` boolean guard | Same — prevents double-flush | REUSED |
| `navigator.sendBeacon(url, JSON.stringify(data))` | Same — primary flush method | REUSED |
| `fetch(url, { method: "POST", ..., keepalive: true }).catch(() => {})` | Same — fallback | REUSED |
| `window.addEventListener("beforeunload", ...)` | Same | REUSED |
| `document.addEventListener("visibilitychange", ...)` | Same | REUSED |
| Arrow function event handlers (`handleUnload = () => {}`) | Same — preserves `this` | REUSED |
| `destroy()` method for React cleanup | Same | REUSED |
| Minimum duration gate (2 seconds) | REMOVED — all events are valuable | CHANGED |
| No session ID | Session ID generated in constructor | NEW |
| No flush interval | Flush interval: 5 seconds | NEW |
| No buffer size limit | Flush when buffer reaches 20 events | NEW |
| Single payload type (presentation view) | Generic event array | NEW |
| No opt-out check | Check opt-out before buffering | NEW |
| No retry queue | IndexedDB retry queue (optional, Phase 1 stretch) | NEW |

```
CLASS: EventBuffer

CONSTRUCTOR:
  - Generate sessionId = crypto.randomUUID(), store in sessionStorage
    (reuse existing sessionId if present — persists across SPA navigations)
  - Initialize events: TrackEventPayload[] = []
  - Set up flushInterval = setInterval(flush, 5000)
  - Register beforeunload handler
  - Register visibilitychange handler
  - Store optedOut = false (checked by setOptOut method)

PROPERTIES:
  private events: TrackEventPayload[]
  private sessionId: string
  private flushInterval: ReturnType<typeof setInterval> | null
  private flushed: boolean
  private optedOut: boolean

METHODS:

  track(event: Omit<TrackEventPayload, "sessionId">): void
    - If optedOut, return immediately
    - Attach sessionId to event
    - Push to events array
    - If events.length >= 20, call flush()

  flush(): void
    - If events.length === 0, return
    - If flushed (for the final unload flush), return
    - Copy events to local variable, clear the array
    - Send via sendBeacon to "/api/events":
        navigator.sendBeacon("/api/events", JSON.stringify({ events: batch }))
    - If sendBeacon unavailable or returns false:
        fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ events: batch }),
          keepalive: true,
        }).catch(() => {})

  setOptOut(optedOut: boolean): void
    - this.optedOut = optedOut
    - If optedOut, clear events array (don't send buffered events)

  getSessionId(): string
    - Returns the current sessionId

  destroy(): void
    - Set flushed = true
    - Call flush() one final time
    - clearInterval(flushInterval)
    - Remove beforeunload listener
    - Remove visibilitychange listener

PRIVATE HANDLERS:
  handleUnload = (): void => { this.flushed = true; this.flush(); }
  handleVisibility = (): void => {
    if (document.visibilityState === "hidden") { this.flush(); }
    // Note: NOT setting flushed = true here (unlike unload).
    // User may come back to the tab and generate more events.
  }

NOTES:
  - flush() is NOT destructive on visibilitychange — the buffer continues
    accepting events if the user returns to the tab. Only beforeunload
    sets flushed = true (the page is actually leaving).
  - sessionStorage key: "scholarsync_event_session_id"
  - The class is "use client" compatible (checks typeof window !== "undefined")
  - Phase 1 does NOT include IndexedDB retry queue. If sendBeacon + fetch
    both fail, events are lost. This is acceptable at launch scale.
    Add IndexedDB retry in a future polish pass.
```

---

## 8. EventProvider React Component

**File:** `src/components/providers/event-provider.tsx`

Pattern matches `posthog-provider.tsx` exactly:
- `"use client"` directive
- Context + hook pattern
- Guard against SSR (typeof window check)
- Suspense boundary not needed (no useSearchParams dependency)

```
STRUCTURE:

  "use client"

  import { createContext, useContext, useEffect, useRef } from "react";
  import { usePathname } from "next/navigation";
  import { EventBuffer } from "@/lib/events/event-buffer";
  import type { TrackEventPayload } from "@/lib/events/types";

  // Context holding the EventBuffer instance
  const EventContext = createContext<EventBuffer | null>(null);

  // Provider component — mounted in app/layout.tsx
  export function EventProvider({ children }: { children: React.ReactNode }) {
    const bufferRef = useRef<EventBuffer | null>(null);
    const pathname = usePathname();
    const prevPathRef = useRef<string | null>(null);

    // Initialize buffer once on mount
    useEffect(() => {
      bufferRef.current = new EventBuffer();
      return () => { bufferRef.current?.destroy(); };
    }, []);

    // Track FEATURE_SWITCHED on route change
    useEffect(() => {
      if (!bufferRef.current || !pathname) return;
      if (prevPathRef.current && prevPathRef.current !== pathname) {
        bufferRef.current.track({
          eventType: "FEATURE_SWITCHED",
          feature: deriveFeatureFromPath(pathname),
          pageContext: pathname,
          input: { from: prevPathRef.current, to: pathname },
        });
      }
      prevPathRef.current = pathname;
    }, [pathname]);

    return (
      <EventContext.Provider value={bufferRef.current}>
        {children}
      </EventContext.Provider>
    );
  }

  // Hook for components to track events
  export function useTrackEvent() {
    const buffer = useContext(EventContext);
    return {
      trackEvent: (event: Omit<TrackEventPayload, "sessionId">) => {
        buffer?.track(event);
      },
      getSessionId: () => buffer?.getSessionId() ?? null,
    };
  }

  // Helper: derive the "feature" field from the URL path
  function deriveFeatureFromPath(pathname: string): string {
    if (pathname.startsWith("/latex")) return "latex_editor";
    if (pathname.startsWith("/studio") || pathname.startsWith("/documents")) return "draft_mode";
    if (pathname.startsWith("/research")) return "deep_research";
    if (pathname.startsWith("/presentation")) return "slides_generator";
    if (pathname.startsWith("/notebook")) return "notebook_mode";
    if (pathname.startsWith("/compliance")) return "plagiarism_check";
    if (pathname.startsWith("/systematic")) return "systematic_review";
    if (pathname.startsWith("/library")) return "citation_tool";
    if (pathname.startsWith("/settings")) return "settings";
    return "dashboard";
  }

MOUNTING (in src/app/layout.tsx):
  <PostHogProvider>
    <EventProvider>
      {children}
    </EventProvider>
  </PostHogProvider>

  EventProvider is INSIDE PostHogProvider (order doesn't matter functionally,
  but this groups all analytics providers together).
```

---

## 9. POST /api/events Route

**File:** `src/app/api/events/route.ts`

```
AUTH:
  This route DOES require auth (unlike track-view which is public).
  Uses: const userId = await getCurrentUserId();
  Reason: events contain user-specific data. The sendBeacon from the client
  carries the session cookie (Clerk), so auth works even on page unload.

  Exception: if auth fails (e.g., expired session on sendBeacon),
  return 401 but DO NOT crash. The client swallows the response anyway.

VALIDATION (Zod):
  const eventBatchSchema = z.object({
    events: z.array(
      z.object({
        eventType: z.string().min(1),
        sessionId: z.string().min(1),
        feature: z.string().min(1),
        projectId: z.string().optional(),
        pageContext: z.string().optional(),
        input: z.record(z.unknown()).optional(),
        output: z.record(z.unknown()).optional(),
        userAction: z.string().optional(),
        userEdit: z.object({
          original: z.string(),
          final: z.string(),
          editDurationMs: z.number().optional(),
          sectionType: z.string().optional(),
        }).optional(),
        modelUsed: z.string().optional(),
        modelParams: z.record(z.unknown()).optional(),
        latencyMs: z.number().optional(),
        tokenCountIn: z.number().optional(),
        tokenCountOut: z.number().optional(),
        costUsd: z.number().optional(),
        contextSnapshot: z.record(z.unknown()).optional(),
      })
    ).min(1).max(100),
  });

  Validation approach:
  - Parse the full batch with safeParse
  - If batch validation fails → 400 with { error: "Invalid request" }
  - Individual event type validation is soft (PM directive):
    log warning if eventType not in KNOWN_EVENT_TYPES, but STILL process it

RATE LIMITING:
  const rateLimitResponse = await checkRateLimit(userId, "events", {
    limit: 100,
    windowSeconds: 60,
  });
  if (rateLimitResponse) return rateLimitResponse;

  This is 100 events per user per minute per the Blueprint.
  BUT: the batch can contain up to 100 events in a single request.
  So the rate limit counts REQUESTS, not individual events.
  At 20 events per flush every 5 seconds, a typical user makes
  ~12 requests/minute. The 100 req/min limit is generous.

  Alternative: count individual events against the limit.
  Decision: count REQUESTS for simplicity. Revisit if abuse detected.

PROCESSING:
  for (const event of parsed.data.events) {
    // Validate event type (soft — warn but don't reject)
    if (!KNOWN_EVENT_TYPES.has(event.eventType)) {
      logger.warn("Unknown event type received", {
        eventType: event.eventType,
        userId,
      });
    }

    // Fire-and-forget via trackEvent()
    trackEvent({
      userId,
      ...event,
    });
  }

  Note: trackEvent is called in a loop but each call is fire-and-forget.
  The route does NOT await any DB writes. It validates, dispatches, and returns.

RESPONSE:
  Success: NextResponse.json({ accepted: parsed.data.events.length }, { status: 200 })
  Bad request: NextResponse.json({ error: "Invalid request" }, { status: 400 })
  Unauthorized: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  Rate limited: handled by checkRateLimit (returns 429 with X-RateLimit-Remaining: 0)
  Internal error: NextResponse.json({ error: "Internal error" }, { status: 500 })

FULL ROUTE STRUCTURE:
  export async function POST(req: Request) {
    try {
      const userId = await getCurrentUserId();
      const rateLimitResponse = await checkRateLimit(userId, "events", { limit: 100, windowSeconds: 60 });
      if (rateLimitResponse) return rateLimitResponse;

      const body = await req.json();
      const parsed = eventBatchSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      }

      for (const event of parsed.data.events) {
        if (!KNOWN_EVENT_TYPES.has(event.eventType)) {
          logger.warn("Unknown event type", { eventType: event.eventType, userId });
        }
        trackEvent({ userId, ...event });
      }

      return NextResponse.json({ accepted: parsed.data.events.length });
    } catch (error) {
      if (error instanceof Error && error.message.includes("auth")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      logger.error("Event ingestion failed", error);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }
```

---

## 10. Enhanced traceGeneration()

**File:** `src/lib/ai/models.ts` (modify existing)

```
CURRENT traceGeneration().end() does:
  1. End LangFuse generation span
  2. Fire-and-forget trackAIUsage()

ENHANCED traceGeneration().end() will ALSO:
  3. Fire-and-forget write to ai_interaction_archive

CHANGE:
  The end() method gains two new optional parameters:

  end(usage?: { inputTokens?: number; outputTokens?: number }, archiveData?: {
    fullPrompt?: string;
    systemPrompt?: string;
    fullResponse?: string;
    fullContext?: Record<string, unknown>;
    eventId?: string;  // if caller already created a user_events row
  }): void

  If archiveData is provided AND has fullPrompt or fullResponse:
    db.insert(aiInteractionArchive).values({
      eventId: archiveData.eventId ?? crypto.randomUUID(),
      fullPrompt: archiveData.fullPrompt,
      systemPrompt: archiveData.systemPrompt,
      fullResponse: archiveData.fullResponse,
      fullContext: archiveData.fullContext,
    })
    .catch((err) => logger.error("Failed to archive AI interaction", err));

BACKWARD COMPATIBILITY:
  - archiveData is optional. All existing callers pass only `usage`.
    They continue working unchanged.
  - When we wire Phase 3, callers add the archiveData parameter:

    trace.end(usage, {
      fullPrompt: messagesAsString,
      systemPrompt: systemPrompt,
      fullResponse: result.text,
    });

ALSO:
  Add gpt-5-nano to MODEL_PRICING in cost-tracker.ts:
    "gpt-5-nano": { provider: "openai", inputPer1M: 0.05, outputPer1M: 0.20 }

  This was discovered missing during exploration — LaTeX util model calls
  currently get $0 cost tracked because the model isn't in the registry.
```

---

## 11. Migration & Barrel Export Updates

### Schema Barrel Export

**File:** `src/lib/db/schema/index.ts` — Add one line:

```
export * from "./events";   // ← add after export * from "./platform";
```

### Relations

**File:** `src/lib/db/schema/relations.ts` — Add relations for all 4 tables:

```
userEventsRelations:
  - user: one(users) via userId
  - archive: one(aiInteractionArchive) — optional
  - editDiff: one(editDiffs) — optional

aiInteractionArchiveRelations:
  - event: one(userEvents) via eventId

editDiffsRelations:
  - event: one(userEvents) via eventId
  - user: one(users) via userId

searchCitationPairsRelations:
  - user: one(users) via userId
```

### Migration

```bash
npx drizzle-kit generate    # generates SQL migration from schema diff
npx drizzle-kit push        # applies to database (or use migrate in production)
```

The migration will create 4 tables and 10 indexes. Estimated migration time: <1 second (empty tables).

---

## 12. Dependency Additions

```bash
npm install diff-match-patch
npm install -D @types/diff-match-patch
```

**diff-match-patch:**
- Google's library for computing text diffs
- 45KB unminified, ~12KB gzipped
- Server-side only (not in client bundle)
- MIT license
- Used by `trackEditDiff()` to compute `diffOperations` JSONB

No other new dependencies. Everything else (Zod, Drizzle, Next.js, Clerk) is already installed.

---

## Execution Checklist

When Phase 0 completes and `feature/data-foundation` branch is created:

```
[ ] 1. npm install diff-match-patch @types/diff-match-patch
[ ] 2. Create src/lib/db/schema/events.ts (4 tables)
[ ] 3. Update src/lib/db/schema/index.ts (add export)
[ ] 4. Update src/lib/db/schema/relations.ts (add relations)
[ ] 5. Run npx drizzle-kit generate && npx drizzle-kit push
[ ] 6. Create src/lib/events/types.ts (event types const object)
[ ] 7. Create src/lib/events/track-event.ts
[ ] 8. Create src/lib/events/track-edit-diff.ts
[ ] 9. Create src/lib/events/track-citation-pair.ts
[ ] 10. Create src/lib/events/index.ts (barrel export)
[ ] 11. Create src/lib/events/event-buffer.ts (client-side)
[ ] 12. Create src/components/providers/event-provider.tsx
[ ] 13. Create src/app/api/events/route.ts
[ ] 14. Update src/lib/ai/models.ts (enhance traceGeneration)
[ ] 15. Update src/lib/ai/cost-tracker.ts (add gpt-5-nano pricing)
[ ] 16. Update src/app/layout.tsx (mount EventProvider)
[ ] 17. Verify: next build passes with zero errors
[ ] 18. Verify: send test events via curl to /api/events
[ ] 19. Verify: events appear in user_events table
[ ] 20. Commit: [data-foundation] Add event pipeline infrastructure
```

---

*This document contains everything needed to execute Phase 1. All patterns match the existing codebase exactly. No architectural decisions remain — all were resolved in the PM approval document. When Phase 0 completes, execution can begin immediately.*
