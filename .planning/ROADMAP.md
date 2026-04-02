# Roadmap — Library Module Redesign

## Previous Milestone: Explore Module V1 (Complete)
Phases 1-10 delivered SearXNG, trust tiers, Explore page, filters, save pipeline, content extraction, source info panel, keyboard nav, synthesis, and mobile polish.

## Current Milestone: Library Module Redesign

Each phase is a vertical tracer bullet — cuts through all layers (schema -> API -> UI -> tests) and produces a demoable deliverable. Feature flag protects existing Library throughout.

---

### Phase 11: Schema + LibrarySource Adapter (Tracer Bullet)
**Deliverable:** API returns unified LibrarySource objects for both papers and web sources. Data migration complete.
**Why first:** Proves the unified domain model works. Every subsequent phase depends on this adapter layer.

- [x] Run database migration: add workflow_state, reading_progress, read_status, last_read_at to userReferences
- [x] Run database migration: add same fields + extraction_state to webSources
- [x] Run database migration: create library_annotations table
- [x] Run database migration: create editor_handoffs table
- [x] Run database migration: add last_active_project_id to user profile
- [x] Run data migration: existing saved items -> workflow_state=inbox, archived web sources -> workflow_state=archived
- [x] Build LibrarySource TypeScript adapter with composite libraryId (paper_42, web_187)
- [x] Build unified service functions: getLibrarySources(), getLibrarySourceById(), moveLibrarySourceState()
- [x] Write tests: adapter normalizes both types correctly, migration maps data correctly, service functions dispatch to correct table

Risk: **LOW** — schema additions are non-breaking. Adapter is a thin normalization layer over existing tables.

---

### Phase 12: Detail/Reader Page
**Deliverable:** User navigates to /library/item/paper_42 or /library/item/web_187, reads in clean internal reader with focus mode.
**Why second:** The reader page is the highest-value new surface. It unlocks "internal-first" reading and proves the route structure.

- [ ] Create route structure: /library/item/[libraryId]
- [ ] Build reader page shell: single-column (720px) + collapsible right workbench
- [ ] Implement web source reader: cleaned extracted content with Source Serif 4 typography
- [ ] Implement paper reader: abstract + metadata + PDF/full-text toggle
- [ ] Implement three modes: Focus (default), Working (panel open), Synthesis handoff
- [ ] Build extraction state surfaces: pending (skeleton + progress), ready (content), partial (content + warning), failed (metadata + "Open original" + retry)
- [ ] Implement reading progress tracking (scroll-based, debounced writes)
- [ ] Build right workbench panel: Notes tab, Metadata tab, Highlights tab
- [ ] Implement breadcrumb navigation: Library / Project / Source
- [ ] Write tests: renders for both source types, handles all 4 extraction states, reading progress tracks and resumes, workbench toggles correctly

Risk: **MEDIUM** — new route structure and reader rendering for arbitrary web content. Extraction edge cases will surface.

---

### Phase 13: Home Screen + Workflow State Navigation
**Deliverable:** Library home shows momentum-oriented sections. Sidebar navigation with workflow states works. User triages items between states.
**Why third:** Home screen + sidebar + workflow states form the navigational spine of the new Library.

- [ ] Create route structure: /library (home), /library/inbox, /library/core, /library/background, /library/archived
- [ ] Build Library sidebar: workflow states with counts (Inbox, Core, Background, Archived, All Sources, Projects, Trash)
- [ ] Build getLibraryHome() aggregator: Continue Reading, Active Project, Needs Review, Recently Saved
- [ ] Build secondary sections (earned, behavior-gated): Ready to Cite, Recently Highlighted, Sent to Notebook
- [ ] Build source cards: unified treatment for papers and web sources (title, state badge, source/journal, read status, project, trust dot)
- [ ] Implement workflow state transitions with card animation + undo toast
- [ ] Implement "Show more" pagination (20-30 items, then "Show 20 more" with counter)
- [ ] Wire URL-backed state for all views (survives refresh, back button works)
- [ ] Build feature flag to toggle between old and new Library
- [ ] Write tests: home sections render with correct data, state transitions work with undo, URL state persists

Risk: **MEDIUM** — aggregator query performance across two source tables. Card animation choreography for state transitions.

---

### Phase 14: Annotation System
**Deliverable:** User highlights passages in the internal reader, adds notes, annotations are persisted and retrievable.
**Why fourth:** Annotations make the reader page sticky — they're the reason users stay inside the app instead of opening sources externally.

- [ ] Build inline highlighting on web source reader (text selection -> style picker -> save)
- [ ] Build inline highlighting on paper reader (abstract text)
- [ ] Implement two highlight styles: default (yellow) and important (library accent blue)
- [ ] Implement notes on highlights (linked in workbench panel)
- [ ] Implement general notes on sources
- [ ] Build Highlights tab in workbench: list of highlights with notes, click jumps to source position
- [ ] Wire annotations to library_annotations table with anchor_type and anchor_payload
- [ ] Write tests: highlight CRUD, notes CRUD, anchor persistence, cross-source-type consistency

Risk: **MEDIUM** — text selection and anchor persistence across different content formats (clean HTML vs. PDF) is tricky. Highlight restoration on re-render requires stable anchors.

---

### Phase 15: Command Palette + Project Switching
**Deliverable:** Cmd+K searches sources, highlights, notes, and projects. Project switching re-scopes the entire Library.
**Why fifth:** Command palette is the #1 re-entry mechanism. Project switching is the organizing spine.

- [ ] Extend existing command-palette.tsx with route-aware Library groups
- [ ] Implement grouped results: Sources (by title), Highlights & Notes (by text), Projects, Commands, Search in Explore (fallback)
- [ ] Build project context switcher in Library header
- [ ] Implement project switching: URL changes, page title changes, search placeholder changes, source list re-scopes
- [ ] Store last_active_project_id server-side, restore on Library return
- [ ] Ensure "All Library" option always visible
- [ ] Write tests: Cmd+K returns correct grouped results, project switching updates URL and content, last active project persists

Risk: **LOW** — extends existing cmdk infrastructure. Project switching is URL + query parameter changes.

---

### Phase 16: Citation Handoff + Editor Integration
**Deliverable:** User selects sources in Library, sends citations to Editor in one action. Editor confirms import. Sources marked "Cited."
**Why sixth:** Citation handoff closes the Library -> Editor loop, making Library the starting point for writing.

- [ ] Build createEditorHandoff() server action with normalized payload
- [ ] Implement single-source citation flow from detail page
- [ ] Implement bulk citation flow from list view (multi-select -> "Send to Editor")
- [ ] Build Editor consumption: fetch handoff by ID, import citations, show confirmation panel
- [ ] Auto-mark sources with "Cited" badge after Editor consumption
- [ ] Mark handoff status as consumed after Editor import
- [ ] Write tests: handoff create/consume lifecycle, single + bulk, status transitions, Cited badge appears

Risk: **LOW** — editor_handoffs table already migrated in Phase 11. Editor already has citation infrastructure.

---

### Phase 17: Explore Integration + Ingestion + Polish
**Deliverable:** "From your library" block in Explore. URL paste and PDF upload in Library. Trash with 30-day retention. Feature flag flipped to new Library.
**Why last:** Integration and polish phase. Everything needs to work before connecting modules and opening to users.

- [ ] Build "From your library" block at top of Explore results (URL overlap check promoted to visible block)
- [ ] Implement paste URL into Library: extraction + storage
- [ ] Implement PDF upload into Library
- [ ] Implement save feedback from Explore: animated button + toast with "Add to Project" action
- [ ] Build Trash view with 30-day retention and restore capability
- [ ] Implement permanent deletion from Trash with confirmation dialog
- [ ] Implement deletion undo toast (5-8 seconds)
- [ ] Apply visual language: library accent colors, flat bordered cards, workflow state dots, trust tier dots
- [ ] Final responsive/mobile pass (pages must load on mobile)
- [ ] Flip feature flag: new Library becomes default
- [ ] Write tests: Explore integration shows library matches, URL paste works, PDF upload works, trash/restore lifecycle, deletion undo

Risk: **LOW** — integration and polish. No new architecture. Largest risk is Explore query performance with library matching.

---

## Phase Summary

| Phase | Deliverable | Risk | Dependencies |
|---|---|---|---|
| 11 | Unified adapter + schema migrations | LOW | None (Explore complete) |
| 12 | Detail/reader page with focus mode | MEDIUM | Phase 11 |
| 13 | Home screen + workflow states + sidebar | MEDIUM | Phase 11 |
| 14 | Annotation system (highlights + notes) | MEDIUM | Phase 12 |
| 15 | Command palette + project switching | LOW | Phase 13 |
| 16 | Citation handoff + editor integration | LOW | Phase 11 |
| 17 | Explore integration + ingestion + polish | LOW | All above |

**Phases 12 and 13 can run in parallel** after Phase 11. Phase 14 depends on Phase 12. Phases 15 and 16 can run in parallel after their dependencies. Phase 17 is the final integration pass.

**Total: 7 phases.** Each phase is independently demoable. Feature flag protects existing Library throughout Phases 11-16. Flag flips in Phase 17.

**Migration strategy:** Strangler fig pattern. New Library builds alongside old Library behind feature flag. Old Library code removed after Phase 17 stabilizes.
