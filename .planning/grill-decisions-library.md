# Grill Session Decisions: Library Module Redesign
**Date:** 2026-04-01
**Status:** COMPLETE — 14 architectural decisions resolved

---

## Decision 1: Unified Source Model
**Question:** Unify papers + web_sources into one table, or keep separate with a UI adapter?
**Answer:** Keep two tables. Build a `LibrarySource` adapter layer.
- Papers stay in `papers` + `userReferences` (global + user-scoped wrapper)
- Web sources stay in `webSources` (user-owned directly)
- New `LibrarySource` TypeScript type normalizes both into one frontend model
- Adapters: `paperToLibrarySource()`, `webSourceToLibrarySource()`
- Unified service functions: `getLibrarySources()`, `getLibrarySourceById()`, `moveLibrarySourceState()`, etc.
- Schema unification deferred to V2+ only if needed

## Decision 2: Workflow State Storage
**Question:** Where does the new `workflow_state` field live?
**Answer:** Add `workflow_state` column directly to both `userReferences` and `webSources`.
- Enum: `inbox | core | background | archived`
- Default: `inbox`
- Migration: existing `saved` → `inbox`, existing `archived` → `archived`
- Keep `webSources.status` temporarily for backward compatibility, phase out
- Add indexes: `(userId, workflow_state, deletedAt)` on both tables
- `projectPapers.status` stays separate — that's project-scoped, not library-scoped

## Decision 3: Detail Page Route Structure
**Question:** How to route detail pages with IDs from different tables?
**Answer:** Unified route with composite ID: `/library/item/[libraryId]`
- `libraryId` format: `paper_42`, `web_187` (typed prefix + source-table ID)
- For papers, ID is `userReferences.id` (not `papers.id`)
- For web sources, ID is `webSources.id`
- One route handler parses prefix, dispatches to correct adapter
- Optional slug suffix for readability: `/library/item/paper_42-cardiac-amyloidosis-review`
- One detail page component, one loader contract, one link target everywhere

## Decision 4: "From Your Library" in Explore
**Question:** How should Library matches appear in Explore search results?
**Answer:** Hybrid — URL overlap instant + async title search fast-follow.
- **Stage 1 (instant):** Existing `getSavedUrls()` promoted to a visible "From your library" block at top of results
- **Stage 2 (async):** Parallel Library query by title, notes/highlights match, source/domain match
- UI splits into: "Already saved in these results" + "Related from your library"
- V1 ships URL overlap + title-based search. Full-text search is V1.5.
- Ranking: title match > notes/highlights > source/domain > full text. Boost Core over Background, recent highlights, active project.

## Decision 5: Reading Progress Implementation
**Question:** How to track reading progress?
**Answer:** Practical auto-tracking with manual override.
- New fields on both user-scoped tables: `reading_progress` (int 0-100), `read_status` (unread|in_progress|read), `last_read_at`
- Auto-mark `in_progress` when opened
- Web/article reader: scroll percentage
- PDF reader: `furthest_page_seen / total_pages`
- Auto-mark `read` at ~85-90%
- User can always manually mark unread/read
- Debounced writes: every 10-15 seconds + on blur/route change/close
- Graceful fallback for sources without reliable reading surface: opened = in_progress, read = manual only

## Decision 6: Command Palette Scope
**Question:** Separate Library palette or extend global?
**Answer:** Extend the existing global `command-palette.tsx` with route-aware groups.
- One component, one Cmd+K, context-aware content
- Inside `/library/*`: promote Sources, Highlights & Notes, Projects, Commands, Search in Explore
- Outside Library: global groups, Library hits available but lower priority
- Grouped results in priority order: Sources → Highlights & Notes → Projects → Commands → Search in Explore
- Full-text search available as explicit secondary mode (not default)

## Decision 7: Content Extraction Reliability
**Question:** What happens when web source extraction fails?
**Answer:** Four extraction states, never an empty reader page.
- Replace boolean `content_extracted` with enum: `pending | ready | partial | failed`
- Optionally store: `extraction_quality_score`, `extracted_at`, `extractor_used`, `word_count`
- Quality heuristics: low word count, title mismatch, excessive boilerplate → mark `partial` not `ready`
- **Pending state:** source header + snippet + skeleton reader + "Preparing clean reader" + Open original
- **Ready state:** full internal reader with highlights
- **Partial state:** internal reader + quiet warning "This source may be incomplete" + View original + Retry
- **Failed state:** source header + snippet + notes panel + all actions still work + prominent Open original + Retry
- No iframe fallback. If extraction fails, detail page with explicit failure state is the answer.
- All workflow/project/note actions work regardless of extraction state.
- Manual "Refresh content" (re-extraction) available on detail page.

## Decision 8: Home Screen Data Cost
**Question:** How many queries for the 7-section home screen?
**Answer:** One `getLibraryHome()` aggregator, 4-6 queries max.
- NOT 14 separate queries (7 sections x 2 source types)
- Build unified source base via `UNION ALL` of normalized userReferences+papers and webSources
- Section slices derived from unified base using CTEs
- Separate queries only for: active project block, recently highlighted (highlight-centric), sent to notebook (relation-dependent)
- Light server cache: 15-60 seconds, invalidate on save/archive/state change/highlight/note
- No materialized feeds, no background denormalization, no recommendation engine in V1

## Decision 9: Migration Strategy
**Question:** Big bang replacement or incremental migration?
**Answer:** Feature flag + strangler fig phasing.
- **Phase 1:** Data/domain layer (LibrarySource adapter, workflow_state migration, reading_progress, new service layer). No visible redesign yet.
- **Phase 2:** Detail pages (`/library/item/[libraryId]`). Old list page still works, card clicks go to new reader.
- **Phase 3:** New Library home + list + workflow sidebar behind feature flag.
- **Phase 4:** Switch flagged users/internal testers to new Library.
- **Phase 5:** New Library default, brief rollback path, then remove old page.
- Old tests run against old Library behind flag. New tests alongside.

## Decision 10: Citation Handoff
**Question:** Keep sessionStorage or build a real API?
**Answer:** Server-backed `editor_handoffs` table replacing sessionStorage.
- New table: `editor_handoffs` (id, user_id, target_document_id nullable, payload_json, status: pending|consumed|cancelled, created_at, consumed_at)
- Normalized citation payload for ALL source types: `{ libraryId, sourceKind, title, authors, publication, publishedAt, url, doi, citationText, excerptHighlightIds? }`
- Supports single + bulk citations
- Flow: Library calls `createEditorHandoff()` → navigates to `/editor/[id]?handoff=abc123` → Editor fetches handoff, shows import panel, inserts, marks consumed
- SessionStorage kept only as temporary compatibility shim during migration
- All citation actions (detail page, bulk, Cmd+K) use same transport

## Decision 11: V1 Boundary
**Question:** What ships in V1 vs. what's deferred?
**Answer:** Front-load foundational engineering. Exclude visible features easy to add on stable spine.

**IN V1 (foundational):**
1. LibrarySource adapter + unified libraryId composite IDs
2. workflow_state column on both tables + migration
3. reading_progress + read_status + last_read_at columns
4. Extraction state model (pending/ready/partial/failed)
5. New route structure (URL-backed)
6. getLibraryHome() aggregator with unified source base
7. Server-backed citation handoff
8. Detail/reader page for both source types
9. Reading progress tracking
10. 4 workflow states in sidebar + derived badges
11. New source cards with redesigned hierarchy
12. Library home screen (4 primary sections)
13. Command palette: Library groups in global palette
14. "From your library" in Explore (URL overlap promotion)
15. Feature flag + migration shim
16. Keyboard model foundation in reader (event system)

**OUT of V1 (add on stable spine):**
- Click-to-peek quick preview
- Density toggle (build cards that support it, ship toggle later)
- Table view
- Secondary home sections (Ready to Cite first, then Highlighted, then Sent to Notebook — earned intelligence surfaces, behavior-gated)
- "From your library" async title search
- Bulk actions UI (mutation layer exists, multi-select UI is cosmetic)
- Auto-archive suggestions
- Full-text mode in Cmd+K
- TTS, offline, sharing, external export, board view
- Keyboard shortcuts for reader (H/T/N)

## Decision 12: Active Project Context
**Question:** How does the system know which project is "active"?
**Answer:** Explicit selection + URL as truth + server-side memory.
- Two concepts: **current scope** (URL) and **last active project** (stored preference)
- User explicitly enters project via header switcher
- URL changes: `/library/project/123/inbox`, `/library/project/123/core`
- `last_active_project_id` stored server-side on user profile
- Home screen "For your active project" uses `last_active_project_id`
- Command palette boosts last active project
- Navigating to `/library/inbox` (all-library) does NOT clear `last_active_project_id`
- Project switch: URL changes, title changes, result set re-scopes, search placeholder updates, filters reset, content type tab preserved

## Decision 13: Highlight and Annotation Architecture
**Question:** Shared highlights table or keep separate per source type?
**Answer:** One canonical `library_annotations` table.
- Fields: id, user_id, source_type (paper|web), source_id, annotation_kind (highlight), style (default|important), selected_text, note, anchor_type (text_range|pdf_region), anchor_payload (JSON), created_at, updated_at, deleted_at
- Polymorphic anchor: text offsets for articles, page+rects for PDFs
- V1: 1 default highlight + 1 "important" style. No rainbow colors.
- Migration: existing `webSourceHighlights` → `library_annotations`
- Paper highlights written to same table when paper reader ships
- One query for "recently highlighted", one search surface, one export format

## Decision 14: Test Strategy
**Question:** What breaks and how to handle it?
**Answer:** Annealing system catches breakage. Feature flag protects existing tests.
- Old tests run against old Library (flag off)
- New tests written alongside for new Library
- Flag flip swaps test target
- Migration tests verify data mapping (saved→inbox, archived→archived)
- Full suite runs before any migration or route change deployment
- Founder accepts breakage as part of improvement cycle

---

## Schema Changes Summary (V1)

### Modified Tables
- `userReferences`: + `workflow_state` enum (inbox|core|background|archived) default inbox, + `reading_progress` int, + `read_status` enum (unread|in_progress|read) default unread, + `last_read_at` timestamp
- `webSources`: + `workflow_state` enum (same), + `reading_progress` int, + `read_status` enum (same), + `last_read_at` timestamp, + `extraction_state` enum (pending|ready|partial|failed) replacing boolean

### New Tables
- `library_annotations`: unified highlights/notes for all source types
- `editor_handoffs`: server-backed citation transport

### New Fields on User Profile
- `last_active_project_id`: server-side active project memory
