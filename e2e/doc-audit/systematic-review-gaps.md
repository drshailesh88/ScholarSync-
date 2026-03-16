# Systematic Review — Feature Doc Gaps

**Original doc:** `SYSTEMATIC_REVIEW_FEATURES_TESTING.md`  
**Original checkbox count:** 374
**Features found in UI:** 507
**Features found in source code (Codex pass 2):** 915
**Features found in source code (Claude Code pass 3):** 1105
**Features found in source code (Codex verification):** 1100
**Pass 3 new checks retained after verification:** 190
**Hallucinated / stale assertions removed during verification:** 15
**Completeness of original doc:** 34.0%

## Missing Features

### Hub Page
- [ ] Header/create flow includes a closable error banner, required-badge helper copy, autofocus title field, Enter-to-submit behavior, and disabled submit state for empty titles
- [ ] Create success refreshes the hub list in place rather than routing directly into the new workflow
- [ ] Empty state has its own CTA and exact copy, and the loading state is spinner-only
- [ ] Project cards only show screening percentage when progress is non-zero and only show the progress bar when the project has papers

### Workflow Shell
- [ ] Liveblocks room id is derived as `sr-project-{projectId}` and initial presence includes tab/current-paper nulls
- [ ] Workflow config load has separate loading and centered error states, with a secondary paper-count fetch that fails silently
- [ ] Non-numeric `projectId` params short-circuit to `null` rather than rendering the route error UI
- [ ] Paper-count badge in the project header only appears when the count is greater than zero

### Tabs and Presence
- [ ] Active tab persists in `scholarsync-systematic-review` and is synchronized into collaborator presence
- [ ] Shared `Tabs` shell renders text-only buttons with no icons or counts
- [ ] Tab shell is not explicitly horizontally scrollable in the current implementation
- [ ] Collaborator presence has separate self/other tooltips, offline compact state, and count-badge behavior
- [ ] Presence label mapping is incomplete for `nma`, so unknown keys can fall back to raw values

### Search Strategy
- [ ] PICO panel has exact required/optional field behavior, concrete placeholders, and disabled generate gating
- [ ] Generate flow clears previous strategy first, persists via config PUT, and shows exact error copy on failure
- [ ] Generated strategy area includes estimated-results banner, MeSH chips, copy action, suggested filters, and CTA into the Import tab
- [ ] The current generate button spinner is tied to initial config loading rather than the POST request itself

### Paper Import
- [ ] Import sources default to PubMed only, max-results default to 100, and source buttons are multi-select toggles
- [ ] Search-query UI changes when a generated strategy already exists, including the generated-strategy helper banner
- [ ] Import result card shows imported/total/duplicate counts with exact success copy
- [ ] PDF drop zone supports drag/drop and hidden browse input, skips non-PDF files silently, and shows exact upload helper text
- [ ] Project Papers list has refresh behavior, expandable rows, PDF/screening badges, and conditional DOI/PubMed/study-type/evidence-level metadata

### Screening
- [ ] Criteria are fetched per-project and reset to a single empty inclusion row when missing or on error
- [ ] Save Criteria has its own loading state and optional last-saved timestamp
- [ ] Queue/conflict modes are separate from item filters; queue filters default to `unscreened`
- [ ] Blind mode, reprioritization, AI batch screening, and unblinding each have distinct enablement and error behavior
- [ ] Keyboard shortcuts exist for include/exclude/maybe and queue navigation
- [ ] Unscreened mode removes decided papers immediately from the visible queue
- [ ] Conflict resolution posts `action: "resolve"` and removes resolved rows locally
- [ ] PDF viewer opens optimistically and resolves PDF path best-effort in the background

### PRISMA
- [ ] The live `prisma` tab stacks both PRISMA Flow and PRISMA Checklist panels in one tab
- [ ] PRISMA Flow has exact button labels and download filename behavior
- [ ] PRISMA Checklist has 3 variant tabs, 100-character gate, per-variant verify copy, clickable summary filters, and per-variant CSV filenames

### Protocol and PROSPERO
- [ ] Protocol panel preloads saved PROSPERO id, exposes exact generate/export/copy labels, and regenerates by clearing current protocol first
- [ ] Generated protocol expands all returned sections by default and supports per-section local editing
- [ ] PROSPERO helper has progress metrics, temporary copy/download state changes, `Refresh from project`, Auto/Manual source badges, and contextual placeholders for each field

### Export, Living Review, and Advanced Panels
- [ ] Export panel has separate reference-export and RevMan-export flows with exact format/filter controls and file naming
- [ ] RevMan export reveals 4 distinct CSV download cards only after package generation succeeds
- [ ] Living Review hides its create form by default, defaults frequency to weekly, and stores `check_now` result summaries locally
- [ ] Unified RoB, GRADE, Manuscript, and Snowballing panels have current-state behaviors around default subviews, CSV export, DOCX export state, and included-paper fallback logic

### Re-Audit Pass 2 Coverage
- [ ] Unified RoB needed detailed checks for dashboard defaults, auto-assignment fallback rules, filter-tab labels, CSV export behavior, empty states, and tool-panel return behavior
- [ ] Data Extraction needed detailed checks for the 5-field default schema, full-text toggle default, paper eligibility gating, batch progress strings, source-panel behavior, and local-only inline editing
- [ ] Meta-Analysis needed explicit checks for default inputs, CI auto-fill, trim-and-fill wording, subgroup validation, sensitivity validation, and tab-specific result rendering
- [ ] NMA needed explicit checks for spinner-only saved-result loading, validation error strings, result-tab labels, league-table CSV export filename, inconsistency empty state, and rankings wording
- [ ] GRADE needed explicit checks for selector/input defaults, disabled conditions, loading/error copy, empty-state branching, row expansion, downgrade labels, and CSV export visibility
- [ ] Manuscript needed explicit checks for section ordering, hidden export controls before generation, local-only edit persistence, copy timeout behavior, abstract context generation, and DOCX title/filename behavior
- [ ] Snowballing needed exact checks for seeds/results default state, direction/depth defaults, success-banner copy, session history wording, discovered-paper status pills, and mini-network legend behavior
- [ ] Living Review needed exact checks for hidden-form default state, prefill rules, create/check/pause/resume/delete behavior, success-banner copy, and the absence of UI support for `update_frequency`
- [ ] Source/API cross-checking exposed additional behavior corrections: screening-PDF shortcut hints are not wired, protocol export omits the route's required `protocol` payload, and data-extraction edits stay session-local

### Store and APIs
- [ ] Persisted store key, persisted fields, and intentionally excluded `criteria` state were missing
- [ ] Projects API ordering and screening-progress calculation were missing
- [ ] Config POST defaults (`project_type`, `status`, `searchDatabases`, `reviewStage`) were missing
- [ ] Config GET/PUT validation and selective update semantics were missing

### Re-Audit Pass 3 Coverage (Claude Code)
- [ ] ActivityFeed sidebar rendering: collapsed toggle button, expanded sidebar (320px), entry count badge (9+ overflow), empty state copy, max 50 entries, per-type icon colors, time formatting thresholds, GlassPanel wrapping
- [ ] ForestPlot SVG internals: study label truncation (28 chars), weight-proportional squares, null line labels (1 vs 0), prediction interval dashed diamond, axis labels, heterogeneity footer format
- [ ] FunnelPlot Recharts: real vs imputed study rendering, Egger's test display, significant asymmetry text
- [ ] NetworkPlot SVG: circular vs force-directed layout, 12-color palette, hover highlighting, node/edge sizing, label truncation (18 chars), legend text
- [ ] LeagueTable SVG: responsive cell widths, diagonal P-score display, significance highlighting, reading guide
- [ ] NMAForestPlot SVG: reference treatment selector, significance asterisk, diamond estimates, P-score column, model footer
- [ ] ScreeningPDFViewer: full-screen overlay, 70/30 split pane, stage toggle, zoom controls (0.5-3.0x), 11 exclusion reasons, AI assessment section, chunk highlighting with 3s auto-clear, section jump navigation
- [ ] 20 undocumented API routes: alerts CRUD, screening-criteria, export-references, manuscript-export, pdf-retrieval, revman-export, upload, press, prisma-flow, prisma-checklist, import
- [ ] Screen API: 300s timeout, rate limiting, criteria-required 400, batch summary
- [ ] Extract API: 4 discriminated modes, schema max 50, textContent 50-100k chars, batch max 50
- [ ] Screening queue: stage param, unblind mode, verifyProjectAccess, parallel progress promises
- [ ] Liveblocks: empty storage, auth endpoint, 5 broadcast helpers, entry ID format
- [ ] Store: clearProject resets criteria/screeningResults/screeningSummary, setProject hydrates from config, WorkflowTab includes both rob2/rob
- [ ] 4 components not in import chain: AMSTAR2Panel, AuditTrailPanel, PRESSChecklistPanel, EvidenceGapMap
- [ ] Accessibility corrections: aria-live not implemented on ActivityFeed or screening progress

## Features in doc that DON'T EXIST in the app

- Creating a new systematic review does not redirect into the new workflow page; it refreshes the hub list in place.
- The top workflow tab bar does not render icons even though the page imports icon components for each tab.
- The shared `Tabs` shell is not explicitly horizontally scrollable in the current implementation.
- PRISMA Flow and PRISMA Checklist are not separate top-level workflow tabs; both render inside the single `prisma` tab.
- Search-strategy generation does not have a dedicated request-scoped loading flag; the current spinner logic is tied to initial config loading.
- Non-numeric route params do not render a dedicated invalid-id error experience; the outer page returns `null`.
- `CollaboratorPresence` does not provide a friendly label mapping for `nma` and may show the raw key.
- Screening PDF viewer displays shortcut hints for `Esc`, `I`, `E`, and `U`, but the component does not register those handlers.
- Protocol export buttons call the route without the `protocol` query payload that the current API requires for text/html export.
