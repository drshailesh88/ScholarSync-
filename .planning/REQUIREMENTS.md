# Requirements — Library Module Redesign

## Version
v2 — Library Module Redesign: From Utility Page to Research Source System

## Previous Milestone
v1 — Explore Module (Phases 1-10, complete)

## Must Have (v2)

### Unified Domain Layer
- [x] LibrarySource TypeScript adapter normalizes papers and web sources into one frontend model
- [x] Composite libraryId format (paper_42, web_187) encodes source type
- [x] Unified service functions (getLibrarySources, getLibrarySourceById, moveLibrarySourceState) dispatch to correct underlying table
- [x] Papers and web sources remain in separate database tables — no physical unification

### Schema Changes
- [x] userReferences table gains: workflow_state (inbox|core|background|archived, default inbox), reading_progress (int 0-100), read_status (unread|in_progress|read, default unread), last_read_at (timestamp)
- [x] webSources table gains: same fields + extraction_state replaces content_extracted boolean (pending|ready|partial|failed)
- [x] New library_annotations table: unified highlights/notes across source types with anchor_type and anchor_payload
- [x] New editor_handoffs table: server-backed citation transport with status lifecycle (pending|consumed|cancelled)
- [x] User profile gains last_active_project_id
- [x] Data migration: existing saved items get workflow_state=inbox, archived web sources get workflow_state=archived

### Route Structure
- [ ] /library shows momentum-oriented home screen
- [ ] /library/inbox, /library/core, /library/background, /library/archived show workflow state views
- [ ] /library/project/[projectId] shows project-scoped library
- [ ] /library/project/[projectId]/inbox etc. shows project + state
- [ ] /library/item/[libraryId] shows canonical detail/reader page
- [ ] All navigation state is URL-backed (survives refresh, supports back button)

### Detail/Reader Page
- [ ] Single-column layout (720px) with collapsible right workbench panel
- [ ] Web sources display cleaned extracted content with inline highlighting support
- [ ] Papers display abstract + metadata + PDF/full-text toggle
- [ ] Same page shell for both source types — differences only in content rendering
- [ ] Three modes: Focus (default, panel hidden), Working (panel open), Synthesis handoff
- [ ] Four extraction states (pending, ready, partial, failed) each have designed surfaces
- [ ] Graceful fallback when extraction fails: metadata and actions still work, prominent "Open original" button
- [ ] Retry extraction available when initial result is poor
- [ ] Reading progress tracked: scroll-based for articles, page-based for PDFs, debounced writes (10-15s + blur/route change)

### Home Screen
- [ ] Home screen answers "what should I resume, what matters for my project, what deserves attention next"
- [ ] Primary sections: Continue Reading (1-3 items), For Your Active Project (2-4 items), Needs Review (unread, high-signal), Recently Saved (5-7 items)
- [ ] Secondary sections appear only when user has relevant data: Ready to Cite, Recently Highlighted, Sent to Notebook
- [ ] One getLibraryHome() aggregator returning all sections (4-6 database queries total)
- [ ] Server cache (15-60s), invalidated on user mutations

### Workflow States
- [ ] 4 mutually exclusive primary states: Inbox, Core, Background, Archived
- [ ] Sources can be moved between states with card animation + undo toast
- [ ] In filtered view: card slides/fades out when moved to different state
- [ ] In All Sources view: state badge updates in place
- [ ] Bulk state changes work on multi-select
- [ ] Sidebar shows Inbox, Core, Background, Archived, All Sources, Projects, Trash with counts

### Annotation
- [ ] Unified library_annotations table supports highlights and notes across both source types
- [ ] Users can highlight passages in the internal reader
- [ ] Users can add notes to highlights
- [ ] Two highlight styles: default (yellow) and important (library accent blue tint)
- [ ] Annotations are searchable via command palette

### Command Palette
- [ ] Extend existing Cmd+K with route-aware Library groups
- [ ] Grouped results: Sources, Highlights & Notes, Projects, Commands, Search in Explore
- [ ] Full-text search available as explicit secondary mode

### Project Organization
- [ ] Project switching changes URL, page title, search placeholder, and source list
- [ ] last_active_project_id stored server-side for home screen and Cmd+K boosting
- [ ] "All Library" option always available to exit project scope
- [ ] Library remembers last active project on return

### Citation Handoff
- [ ] Server-backed editor_handoffs table replaces sessionStorage bridge
- [ ] Normalized payload for all source types, single + bulk
- [ ] Flow: Library -> createEditorHandoff() -> navigate to Editor with handoff ID -> Editor fetches, imports, marks consumed
- [ ] Sources auto-marked "Cited" badge after Editor consumption
- [ ] Editor shows confirmation panel when receiving citations

### Explore Integration
- [ ] "From your library" block at top of Explore results when saved sources match query
- [ ] V1: promote existing URL overlap check to visible block
- [ ] Fast follow: async title + notes/highlights search against Library corpus

### Cards and Lists
- [ ] Source cards show title, workflow state, source/journal, read status, and project
- [ ] Cards look the same whether source is paper or web article (unified visual treatment)
- [ ] Trust/evidence tier shown as small dot indicator on cards
- [ ] List loads 20-30 items with "Show more" button and counter

### Saving and Ingestion
- [ ] Sources saved from Explore arrive in Library as Inbox items
- [ ] Paste URL directly into Library triggers extraction and storage
- [ ] PDF upload into Library supported
- [ ] Save feedback: animated button + toast with "Add to Project" action

### Deletion and Safety
- [ ] Deletion moves sources to Trash with undo toast (5-8 seconds)
- [ ] Trash retains sources for 30 days with restore capability
- [ ] Permanent deletion only available from Trash with confirmation dialog

### Visual Language
- [ ] Inherited Editor palette (#FAFAF8 cream, warm charcoal ink, #6D28D9 purple brand)
- [ ] Muted blue library accent (#4A7AB5) for Library-local elements
- [ ] Flat bordered cards, colored dot + text workflow badges, small dot trust indicators
- [ ] 224px fixed sidebar, 720px reader column
- [ ] DM Sans for UI/cards (15px), Source Serif 4 for reader content (17px)

## Should Have (v2.1)

- [ ] Click-to-peek quick preview (Space key on focused card)
- [ ] Density toggle UI (cards support both spacious and compact)
- [ ] Table view (secondary view mode for power users)
- [ ] Reader keyboard shortcuts (H highlight, T tag, N note)
- [ ] Bulk actions multi-select UI with selection toolbar
- [ ] "From your library" async title + notes/highlights search

## Out of Scope

- Physical unification of papers + web_sources tables
- TTS / audio (defer to Reading Room)
- Offline support
- Public sharing / annotated links
- External export (Obsidian/Notion)
- Auto-archive suggestions
- Full-text search in Cmd+K default results
- Newsletter/RSS ingestion (separate module)
- Board/kanban view
- EPUB support

## Source

- PRD: GitHub Issue #65
- Planning decisions: `.planning/decisions/2026-04-01-library-module-redesign.md`
- Competition research: `.planning/competition-research-library.md`
- UX Brief: `.planning/ux-brief-library.md`
- UI Brief: `.planning/ui-brief-library.md`
- Quality gaps: `.planning/quality-gaps/grill-decisions-library.md`
- Ubiquitous Language: `UBIQUITOUS_LANGUAGE.md`
