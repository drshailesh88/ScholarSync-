# ScholarSync — Deep Research Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Deep Research page (`/deep-research`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/deep-research/`, `src/components/deep-research/`, `src/lib/deep-research/`, and related API routes.

---

## Table of Contents

1. [Page Overview & States](#1-page-overview--states)
2. [Idle State — Topic Input & Mode Selection](#2-idle-state--topic-input--mode-selection)
3. [Past Research Sessions](#3-past-research-sessions)
4. [Plan Preview State](#4-plan-preview-state)
5. [Running State — Progress & Streaming](#5-running-state--progress--streaming)
6. [Done State — Report Display](#6-done-state--report-display)
7. [Research Document — Markdown Report](#7-research-document--markdown-report)
8. [Table of Contents Navigation](#8-table-of-contents-navigation)
9. [Citations Panel](#9-citations-panel)
10. [Citation Markers & Tooltips](#10-citation-markers--tooltips)
11. [Evidence Level System](#11-evidence-level-system)
12. [Export System](#12-export-system)
13. [Save to Library](#13-save-to-library)
14. [Open in Studio](#14-open-in-studio)
15. [Legacy Report View](#15-legacy-report-view)
16. [Research Engine & Backends](#16-research-engine--backends)
17. [Error Handling](#17-error-handling)
18. [Keyboard & Accessibility](#18-keyboard--accessibility)
19. [Quick Test Workflows](#19-quick-test-workflows)

---

## 1. Page Overview & States

| Page | Route | Purpose |
|------|-------|---------|
| **Deep Research** | `/deep-research` | Multi-perspective literature synthesis with AI-guided research planning, citation graph traversal, and polished markdown reports |

### Page State Machine

```
idle → plan-preview → running → done
  ↑         |            |        |
  |    (Stop/Cancel)  (Stop)      |
  └──────────┴───────────┘       │
  ←──────── (Start New) ─────────┘
  ← error (Try Again) ───────────┘
```

| State | Description | Test |
|-------|-------------|------|
| idle | Input form with topic, mode selector, past sessions | [ ] Renders correctly |
| plan-preview | Generated perspectives for review/editing | [ ] Renders correctly |
| running | Progress stepper + streaming content | [ ] Renders correctly |
| done | Final report with export options | [ ] Renders correctly |
| error | Error message with retry button | [ ] Renders correctly |

### Header (Always Visible)
- [ ] Title: "Deep Research" with Microscope icon (blue accent)
- [ ] Subtitle: "Multi-perspective literature synthesis"
- [ ] Sticky top positioning
- [ ] Export buttons visible only in `done` state
- [ ] Save to Library button visible only in `done` state
- [ ] Stop button visible in `running` and `plan-preview` states (red accent)

---

## 2. Idle State — Topic Input & Mode Selection

### Hero Section
- [ ] Heading: "What would you like to research?"
- [ ] Description: "Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations."

### Topic Input
- [ ] Text input field with placeholder: "e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
- [ ] Validation: 5–500 characters
- [ ] Empty input disables "Start Deep Research" button
- [ ] Enter key submits (when topic filled, no Shift key held)

### Mode Selector (Segmented Control)
| Mode | Icon | Estimated Time | Test |
|------|------|----------------|------|
| Quick | Zap | ~1 min | [ ] Selectable, highlighted when active |
| Standard | Search | ~3 min | [ ] Selectable, highlighted when active |
| Deep | Layers | ~5 min | [ ] Selectable, highlighted when active |
| Exhaustive | Database | ~10 min | [ ] Selectable, highlighted when active |

- [ ] Default mode pre-selected
- [ ] Clicking a mode highlights it
- [ ] Selected mode passed to API on submit

### Mode Configurations
| Mode | Depth | Breadth | Max Sources |
|------|-------|---------|-------------|
| Quick | 1 | 2 | 15 |
| Standard | 2 | 3 | 30 |
| Deep | 3 | 5 | 60 |
| Exhaustive | 4 | 7 | 100 |

### Start Button
- [ ] Label: "Start Deep Research"
- [ ] Disabled when topic is empty
- [ ] Triggers plan generation on click
- [ ] Shows loading state while generating plan

---

## 3. Past Research Sessions

- [ ] "Past Research" label with Clock icon in header (styled uppercase via CSS tracking)
- [ ] Fetches from `GET /api/deep-research/sessions` on mount
- [ ] Shows up to 20 past sessions (latest first)

### Session Cards
- [ ] Topic text (truncated)
- [ ] Mode label (capitalized)
- [ ] Papers found count
- [ ] Relative date: "2h ago", "3d ago", "Jan 5"
- [ ] Hover effect with blue icon
- [ ] ChevronRight icon on hover
- [ ] Clicking loads full session in `done` state

### States
- [ ] Loading spinner while fetching sessions
- [ ] Hidden if no sessions exist
- [ ] Hidden on fetch error (fails silently)

---

## 4. Plan Preview State

- [ ] Header with Sparkles icon (purple) and "Research Plan" title
- [ ] Subtitle: "Review and customize the research perspectives before starting"

### Perspective List
- [ ] Numbered badges (1, 2, 3, etc.) in blue circles
- [ ] Editable perspective name fields
- [ ] Chevron toggle to expand/collapse each perspective
- [ ] Expanded perspectives show search queries section

### Search Query Editing
- [ ] Each perspective has 3–4 search queries by default
- [ ] Query text displayed in editable input fields
- [ ] **"Add query"** link (Plus icon, lowercase) appends new empty query
- [ ] Trash icon button (icon-only, no text label) visible when >1 query exists
- [ ] Clicking Trash icon deletes that query row

### Actions
- [ ] **Regenerate** button (top right) — re-generates perspectives
  - [ ] Shows spinner while regenerating
  - [ ] Replaces perspectives with new set
- [ ] **Confirm & Start Research** button (bottom right, blue with Play icon)
  - [ ] Sends confirmed perspectives to execute API
  - [ ] Transitions to `running` state
- [ ] **Stop** button (red) — cancels and returns to `idle`

---

## 5. Running State — Progress & Streaming

### Progress Stepper (Left Sidebar)
- [ ] Progress bar at top showing 0–100%
- [ ] 9 stages displayed in vertical timeline:

| # | Stage | Label | Test |
|---|-------|-------|------|
| 1 | search-round-1 | Searching papers... | [ ] Shows correctly |
| 2 | citation-traversal | Traversing citation graph... | [ ] Shows correctly |
| 3 | search-round-2 | Expanding search... | [ ] Shows correctly |
| 4 | full-text-extraction | Reading full-text PDFs... | [ ] Shows correctly |
| 5 | data-extraction | Extracting data from papers... | [ ] Shows correctly |
| 6 | synthesis-perspectives | Analyzing perspectives... | [ ] Shows correctly |
| 7 | synthesis-summary | Writing executive summary... | [ ] Shows correctly |
| 8 | synthesis-tables | Generating tables... | [ ] Shows correctly |
| 9 | synthesis-critique | Self-critique and revision... | [ ] Shows correctly |

### Stage Icons
| Status | Icon | Test |
|--------|------|------|
| completed | CheckCircle2 (green) | [ ] Displays for finished stages |
| active | Loader2 (animated spin) | [ ] Displays for current stage |
| pending | Circle (gray) | [ ] Displays for future stages |
| error | Circle (red) | [ ] Displays on stage failure |

- [ ] Connector lines between stages
- [ ] Current message text below active stage
- [ ] Stages transition: pending → active → completed sequentially

### Streaming Content (Right Side)
- [ ] Markdown content streams in progressively
- [ ] Smooth animation on new content
- [ ] Loading state shows Microscope icon with rotating animation
- [ ] Content scrolls as new sections appear

### SSE Events Processed
| Event Type | Data | Test |
|------------|------|------|
| progress | stage, message, progress% | [ ] Updates stepper and progress bar |
| section | markdown chunk | [ ] Appends to streaming content |
| report | full EnhancedSynthesisReport | [ ] Sets final report data |
| done | — | [ ] Transitions to `done` state |
| error | error message | [ ] Transitions to `error` state |

### Abort
- [ ] Stop button (red) visible during running
- [ ] Clicking Stop aborts fetch request
- [ ] Returns to `idle` state
- [ ] Clears progress and streaming content

---

## 6. Done State — Report Display

- [ ] Topic header with research mode badge and source count
- [ ] Full report rendered (markdown or legacy card format)
- [ ] "Start New Research" button (center, secondary style) returns to `idle`
- [ ] Export buttons visible in header
- [ ] Save to Library button visible in header

---

## 7. Research Document — Markdown Report

### Markdown Rendering
- [ ] Headings (h1–h5) styled with correct sizes and scroll margins
- [ ] Paragraphs with proper spacing and line-height (1.6)
- [ ] Unordered lists with custom bullet styling
- [ ] Ordered lists with numbered items
- [ ] Tables with borders, header background, hover row states
- [ ] Blockquotes with blue left border, italic, muted color
- [ ] Inline code: gray background, emerald text, monospace
- [ ] Code blocks: monospace, scrollable, dark background
- [ ] Links: blue, underlined, open in new tab (`target="_blank"`)
- [ ] Bold and italic formatting

### Dark Mode
- [ ] All markdown elements adapt to dark color scheme
- [ ] Background transitions from white to gray-950
- [ ] Text transitions from dark to light
- [ ] Table borders update for dark theme

### Print Styles
- [ ] White background forced
- [ ] Black text forced
- [ ] Simple table borders
- [ ] All panels hidden during print

---

## 8. Table of Contents Navigation

### Desktop (Sidebar)
- [ ] Fixed-width sidebar (w-56), sticky positioning
- [ ] Extracts h2 and h3 headings from report
- [ ] Click heading to smooth-scroll to section
- [ ] Active heading highlighted as user scrolls
- [ ] Indentation for h3 (nested under h2)

### Mobile (Overlay)
- [ ] Full-screen overlay with handle bar
- [ ] Same heading list as desktop
- [ ] Click heading scrolls and closes overlay
- [ ] Swipe handle to open/close

---

## 9. Citations Panel

### Desktop Layout
- [ ] Right sidebar (w-72), sticky positioning
- [ ] Max-height with overflow scroll
- [ ] Shows up to 50 citations

### Mobile Layout
- [ ] Bottom sheet (max-h-[70vh])
- [ ] Draggable handle bar
- [ ] Scrollable content

### Citation Entries
- [ ] `[N]` index number
- [ ] Title (line-clamp-2, truncated)
- [ ] Authors: first 2 + "et al." if more
- [ ] Journal name with year in parentheses
- [ ] Evidence level badge (colored dot + label)
- [ ] Click citation entry to navigate in report
- [ ] Auto-scroll to highlighted citation

### Links per Citation
- [ ] DOI link (if available, opens publisher page)
- [ ] PubMed link (if PMID available)
- [ ] PDF link (if available)
- [ ] Open Access badge (if `isOpenAccess` is true)

---

## 10. Citation Markers & Tooltips

### Inline Markers
- [ ] `[N]` rendered as superscript blue links (10px)
- [ ] Range expansion: `[5-8]` → `[5]`, `[6]`, `[7]`, `[8]`
- [ ] Comma-separated: `[5,12,30]` → individual markers
- [ ] Click marker scrolls to reference in Citations Panel

### Tooltip (on Hover)
- [ ] Fixed position (z-50)
- [ ] Shows:
  - [ ] Paper title
  - [ ] Authors (with "et al." truncation)
  - [ ] Journal and year
  - [ ] Citation count
  - [ ] Evidence badge with study design
  - [ ] Abstract (line-clamp-3)
  - [ ] Links: DOI, PubMed, PDF
  - [ ] Open Access badge
- [ ] Tooltip positions correctly relative to marker
- [ ] Tooltip dismisses on mouse leave

---

## 11. Evidence Level System

| Level | Color | Badge | Example Study Types | Test |
|-------|-------|-------|---------------------|------|
| high | Emerald | Green dot + "high" | RCTs, meta-analyses, systematic reviews | [ ] Correct display |
| moderate | Yellow | Yellow dot + "moderate" | Cohort, case-control, observational, prospective | [ ] Correct display |
| low | Orange | Orange dot + "low" | Case series, case reports, expert opinions, reviews | [ ] Correct display |
| unknown | Gray | Gray dot + "unknown" | Unclassified | [ ] Correct display |

- [ ] Evidence level auto-assigned based on study type keywords
- [ ] Badge shows study design text (if available)
- [ ] Colors consistent across Citations Panel, tooltips, and report

---

## 12. Export System

### Markdown Export (.md)
- [ ] Download icon button
- [ ] Downloads as `{topic}_report.md`
- [ ] Contains full markdown report text

### PDF Export
- [ ] Converts markdown to HTML
- [ ] Calls `POST /api/export/pdf`
- [ ] Downloads as `{topic}_report.pdf`
- [ ] Loading spinner during generation
- [ ] Error state shows red background on failure

### Copy to Clipboard
- [ ] Converts markdown to rich HTML with inline styles
- [ ] Formatting preserved for Google Docs / Word paste
- [ ] Inline styles include:
  - [ ] Headings: font-size (24–14px), font-weight, margins
  - [ ] Paragraphs: line-height 1.6, color #333
  - [ ] Tables: border-collapse, cell padding, borders (#ccc)
  - [ ] Blockquotes: 3px left border (#ccc), italic
  - [ ] Superscript citations: 10px, color #2563eb
- [ ] Shows "Copied" confirmation for 2 seconds
- [ ] Fallback to plain text on older browsers

### BibTeX Export (.bib)
- [ ] Downloads as `{topic}_references.bib`
- [ ] Citation key format: `{firstName}{year}{firstWord}` (lowercase)
- [ ] Fields: author, title, journal, year, doi, pmid, abstract
- [ ] All sources included

### RIS Export (.ris)
- [ ] Downloads as `{topic}_references.ris`
- [ ] Fields: TY, TI, AU (per author), JO, PY, DO, AN, AB, UR, ER
- [ ] Compatible with Mendeley / EndNote
- [ ] All sources included

---

## 13. Save to Library

- [ ] Button visible in `done` state header
- [ ] States:

| State | Icon | Label | Test |
|-------|------|-------|------|
| idle | BookmarkPlus | "Save to Library" | [ ] Default state |
| saving | Spinner | "Saving..." | [ ] During save |
| saved | Check (emerald) | "Saved" (disabled) | [ ] After success |
| error | AlertCircle (red) | "Retry" | [ ] On failure |

- [ ] Calls `POST /api/deep-research/save`
- [ ] Disabled if not logged in or research incomplete
- [ ] Error tooltip appears on failure
- [ ] Auto-disables after successful save
- [ ] Saved session appears in Past Research on next visit

---

## 14. Open in Studio

- [ ] Export option: "Open in Studio"
- [ ] Calls `POST /api/deep-research/open-in-studio`
- [ ] Process:
  1. [ ] Saves research session to DB
  2. [ ] Creates project with type "literature_review"
  3. [ ] Creates synthesis document
  4. [ ] Converts markdown to Tiptap JSON format
  5. [ ] Stores as "Research Report" section
- [ ] Redirects to `/studio?projectId={projectId}`
- [ ] Loading spinner during creation
- [ ] Error state with retry capability

---

## 15. Legacy Report View

- [ ] Fallback for reports without markdown format
- [ ] Renders card-based display with sections:
  1. [ ] **Summary** — Gray background card with text
  2. [ ] **Key Findings** — Numbered list with blue badges
  3. [ ] **Perspectives** — Purple left-border cards with source count
  4. [ ] **Research Gaps** — Bullet list
  5. [ ] **Contradictions** — Bullet list
  6. [ ] **Sources** — List with DOI links (capped at 50)

---

## 16. Research Engine & Backends

### Multi-Source Search
- [ ] PubMed search returns results
- [ ] Semantic Scholar search returns results
- [ ] OpenAlex search returns results
- [ ] Results deduplicated across sources

### Citation Graph Traversal
- [ ] Forward citations fetched via Semantic Scholar API
- [ ] Backward references fetched via S2 API
- [ ] Rate-limited with delays between requests
- [ ] Converts S2 format to unified result format

### Data Extraction
- [ ] Uses Claude Haiku to extract structured data from abstracts:
  - [ ] Study design
  - [ ] Sample size
  - [ ] Effect sizes
  - [ ] P-values
  - [ ] Population characteristics
  - [ ] Follow-up duration
  - [ ] Key findings
- [ ] Conservative extraction (no speculation on missing data)

### Full-Text Extraction
- [ ] Downloads open-access PDFs
- [ ] Extracts Results and Discussion sections
- [ ] Falls back to full text or abstract on failure
- [ ] Max file size: 20 MB
- [ ] Timeout: 15 seconds

### Synthesis Pipeline
- [ ] Pass 1: Per-perspective narrative sections (parallel execution)
- [ ] Pass 2: Executive summary
- [ ] Pass 3: Comparison tables, gaps, contradictions, conclusions
- [ ] Pass 4: Self-critique and revision
- [ ] Outputs markdown with interactive citation markers `[N]`

---

## 17. Error Handling

### Validation Errors
- [ ] Topic < 5 characters: shows validation message
- [ ] Topic > 500 characters: shows validation message
- [ ] Empty topic: Start button disabled

### Network Errors
- [ ] Fetch failures caught and displayed
- [ ] AbortError handled silently (expected from Stop button)
- [ ] Non-AbortError shows error state with message

### Error State UI
- [ ] Red AlertCircle icon
- [ ] Heading: "Research Failed"
- [ ] Error message text displayed
- [ ] "Try Again" button returns to `idle` state

### API Errors
- [ ] Plan generation failure shows error and allows retry
- [ ] Execute failure shows error with context
- [ ] Save failure shows error tooltip on button
- [ ] Session load failure handled gracefully

### Data Extraction Fallbacks
- [ ] PDF extraction failure falls back to abstract
- [ ] Missing fields omitted (not guessed)
- [ ] Graceful degradation on partial data

---

## 18. Keyboard & Accessibility

- [ ] Enter key submits topic (idle state, no Shift)
- [ ] Escape closes modals/overlays
- [ ] Tab navigation through all form inputs
- [ ] Focus management on interactive elements
- [ ] ARIA labels on buttons and controls
- [ ] Semantic HTML structure (headings, lists, sections)
- [ ] Screen reader compatible progress updates
- [ ] Color contrast meets WCAG AA standards

---

## 19. Quick Test Workflows

### A. Quick Research — Happy Path
1. [ ] Navigate to `/deep-research`
2. [ ] Enter topic: "SGLT2 inhibitors in heart failure"
3. [ ] Select "Quick" mode
4. [ ] Click "Start Deep Research"
5. [ ] Wait for plan generation (~10–20s)
6. [ ] Review perspectives in Plan Preview
7. [ ] Click "Confirm & Start Research"
8. [ ] Watch progress stepper advance through stages
9. [ ] Wait for streaming content to complete (~1 min)
10. [ ] Verify full markdown report displays
11. [ ] Verify Table of Contents sidebar appears
12. [ ] Verify Citations Panel shows sources

### B. Edit Research Plan
1. [ ] Start research with a topic
2. [ ] In Plan Preview, click a perspective name to edit
3. [ ] Change the perspective name
4. [ ] Expand a perspective, edit a search query
5. [ ] Add a new query with the Plus button
6. [ ] Remove a query with the Trash button
7. [ ] Click "Confirm & Start Research"
8. [ ] Verify edited queries are used in the search

### C. Deep Mode with Full Features
1. [ ] Enter topic: "CAR-T cell therapy in hematologic malignancies"
2. [ ] Select "Deep" mode (~5 min)
3. [ ] Confirm plan and start research
4. [ ] Verify all 9 progress stages complete
5. [ ] In final report:
   - [ ] Click citation `[1]` — verify scroll to reference
   - [ ] Hover citation `[3]` — verify tooltip with abstract
   - [ ] Navigate TOC — click h2 heading, verify scroll
   - [ ] Check evidence badges on sources
6. [ ] Export as PDF — verify download
7. [ ] Copy to clipboard — paste into Google Docs, verify formatting

### D. Export All Formats
1. [ ] Complete a research session
2. [ ] Export as Markdown (.md) — verify file downloads
3. [ ] Export as PDF — verify file downloads
4. [ ] Copy to Clipboard — paste into editor, verify rich formatting
5. [ ] Export as BibTeX (.bib) — verify file downloads with citation keys
6. [ ] Export as RIS (.ris) — verify file downloads
7. [ ] Click "Open in Studio" — verify redirect to `/studio` with report content

### E. Save & Reload Session
1. [ ] Complete a research session
2. [ ] Click "Save to Library" — verify "Saved" state
3. [ ] Click "Start New Research" to return to idle
4. [ ] Verify saved session appears in "Past Research"
5. [ ] Click the saved session
6. [ ] Verify full report loads with all citations and formatting
7. [ ] Verify export buttons work on loaded session

### F. Abort Research
1. [ ] Start a research topic
2. [ ] In Plan Preview, click Stop button
3. [ ] Verify return to idle state
4. [ ] Start again, confirm plan, let research begin
5. [ ] During Running state, click Stop button
6. [ ] Verify return to idle with progress cleared
7. [ ] Start a new research — verify clean state

### G. Regenerate Plan
1. [ ] Start research with a topic
2. [ ] In Plan Preview, click "Regenerate"
3. [ ] Verify spinner appears on button
4. [ ] Verify new perspectives replace old ones
5. [ ] Verify query editing still works on new perspectives
6. [ ] Confirm and start — verify research proceeds

### H. Error Recovery
1. [ ] Enter topic < 5 characters — verify validation error
2. [ ] Simulate network error during research — verify error state
3. [ ] Click "Try Again" — verify return to idle
4. [ ] Enter valid topic and complete research successfully

### I. Citation Deep Dive
1. [ ] In a completed report, find a citation range `[5-8]`
2. [ ] Verify it renders as individual markers: `[5]`, `[6]`, `[7]`, `[8]`
3. [ ] Click `[5]` — verify Citations Panel scrolls to source #5
4. [ ] Hover `[6]` — verify tooltip shows abstract and evidence level
5. [ ] In Citations Panel, click a citation — verify report scrolls
6. [ ] Check DOI link opens correct publisher page
7. [ ] Check PubMed link opens correct PMID

### J. Responsive Layout
1. [ ] View report at desktop width — verify 3-column (TOC | Report | Citations)
2. [ ] Resize to tablet — verify sidebar adjustments
3. [ ] Resize to mobile — verify single column
4. [ ] Open TOC overlay on mobile — verify full-screen overlay
5. [ ] Open Citations Panel on mobile — verify bottom sheet
6. [ ] Print page — verify clean output with hidden panels

---

## Verified Feature Audit (Codex Fresh Pass)

### Import Tree
- [ ] `/deep-research` starts at `src/app/(app)/deep-research/page.tsx` and only imports the local barrel `src/components/deep-research/index.ts`.
- [ ] `src/components/deep-research/index.ts` re-exports the route-visible modules `ResearchDocument.tsx`, `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, `PastResearchSessions.tsx`, `LegacyReportView.tsx`, and `types.ts`.
- [ ] `ResearchDocument.tsx` is the only deep-research component that directly pulls in `CitationReference.tsx` and `CitationsPanel.tsx`.
- [ ] `CitationReference.tsx`, `CitationsPanel.tsx`, `ExportButtons.tsx`, `ResearchPlanPreview.tsx`, `ProgressStepper.tsx`, `SaveToLibraryButton.tsx`, and `LegacyReportView.tsx` all depend on the shared local `types.ts`.
- [ ] `PastResearchSessions.tsx` has no local deep-research imports.
- [ ] No route-level `loading.tsx` or `error.tsx` file exists under `src/app/(app)/deep-research/`.

### Page State and No Store
- [ ] `/deep-research` uses only page-local React state; there is no Zustand store, React context store, `sessionStorage`, or `localStorage` in this route tree.
- [ ] `DeepResearchPage` initializes `topic = ""`.
- [ ] `DeepResearchPage` initializes `mode = "standard"`.
- [ ] `DeepResearchPage` initializes `pageState = "idle"`.
- [ ] `DeepResearchPage` initializes `error = null`.
- [ ] `DeepResearchPage` initializes `planPerspectives = []`.
- [ ] `DeepResearchPage` initializes `progressStages = []`.
- [ ] `DeepResearchPage` initializes `progressMessage = ""`.
- [ ] `DeepResearchPage` initializes `progressPercent = 0`.
- [ ] `DeepResearchPage` initializes `streamingSections = []`.
- [ ] `DeepResearchPage` initializes `report = null`.
- [ ] `seenStageIdsRef.current` starts as `[]`, `currentStageIdRef.current` starts as `null`, and `abortRef.current` starts as `null`.
- [ ] A full browser refresh resets all route state to those defaults; only persisted sessions come back through the sessions API.

### Session Creation and Idle State
- [ ] Idle-state header title is exactly `Deep Research`.
- [ ] Idle-state subtitle is exactly `Multi-perspective literature synthesis`.
- [ ] Idle hero heading is exactly `What would you like to research?`
- [ ] Idle hero body copy is exactly `Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations.`
- [ ] The topic input placeholder is exactly `e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management`.
- [ ] The page renders no source-selection control.
- [ ] The page renders no separate depth or breadth selector; the only user-facing search-shape control is the four-mode segmented control.
- [ ] Mode cards render `Quick`, `Standard`, `Deep`, and `Exhaustive`.
- [ ] Mode cards render the estimated times `~1 min`, `~3 min`, `~5 min`, and `~10 min`.
- [ ] Mode cards do not render the mode descriptions from `RESEARCH_MODES.description`.
- [ ] Client-side topic validation is only `topic.trim()` truthiness; there is no client-side 5-to-500 validator or inline validation message.
- [ ] The `Start Deep Research` button is disabled only when `!topic.trim()`.
- [ ] Pressing `Enter` in the topic field starts plan generation only when `pageState === "idle"`, `!e.shiftKey`, and `topic.trim()` is non-empty.
- [ ] Pressing `Shift+Enter` never triggers submission because the handler explicitly requires `!e.shiftKey`.
- [ ] Clicking `Start Deep Research` sets `pageState = "plan-preview"`, clears `error`, clears `planPerspectives`, and sets `progressMessage = "Generating research plan..."` before the network request resolves.
- [ ] `fetchPlan()` posts `POST /api/deep-research/plan` with JSON body `{ topic: topic.trim(), mode }`.
- [ ] The start button has no spinner, disabled-loading state, or label change during plan generation.

### Plan Preview
- [ ] The plan-loading shell renders only when `pageState === "plan-preview"` and `planPerspectives.length === 0`.
- [ ] The loading shell shows the current `progressMessage` and the exact helper line `Preparing research plan for: {topic}`.
- [ ] The populated plan preview renders only when `pageState === "plan-preview"` and `planPerspectives.length > 0`.
- [ ] `ResearchPlanPreview` copies `initialPerspectives` into component-local state once with `useState(initialPerspectives)`.
- [ ] The current preview component does not resync its local perspective copy if parent data changes after mount.
- [ ] `ResearchPlanPreview` initializes `expandedIndex = 0`, so the first perspective starts expanded.
- [ ] The preview header title is exactly `Research Plan`.
- [ ] The preview subtitle is exactly `Review and customize the research perspectives before starting`.
- [ ] The top-right button label is exactly `Regenerate`.
- [ ] The bottom-right primary button label is exactly `Confirm & Start Research`.
- [ ] Perspective-name inputs use the exact placeholder `Perspective name...`.
- [ ] Query inputs use the exact placeholder `Search query...`.
- [ ] Expanded cards show the exact section label `Search Queries`.
- [ ] The add-row affordance is exactly `Add query`.
- [ ] Query delete buttons render only when that perspective currently has more than one query.
- [ ] `toggleExpanded()` collapses the currently open card by setting `expandedIndex` to `null`.
- [ ] The page never passes `isRegenerating`, so the preview's spinner/disabled branch stays on its default `false`.
- [ ] The plan API returns extra fields `id`, `description`, and `expectedPaperTypes`; runtime preview edits preserve those fields because updates spread the existing perspective objects.

### Research Execution and SSE
- [ ] The shared SSE reader throws `No response stream` if `response.body` is missing.
- [ ] The shared SSE reader only processes lines that start with `data: `.
- [ ] The shared SSE reader ignores empty SSE payloads and the literal payload `[DONE]`.
- [ ] The shared SSE reader recognizes `progress`, `perspectives`, `section`, `report`, and `error`; it has no `done` handler.
- [ ] The shared SSE reader swallows JSON `SyntaxError`s and continues reading the stream.
- [ ] The `handlers.onError` callback exists in the reader signature but is never invoked by the switch statement.
- [ ] `executeResearch()` resets `error = null`, `report = null`, `streamingSections = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, `progressStages = buildStagesFromEvents([], null)`, `progressPercent = 0`, and `progressMessage = "Starting research..."`.
- [ ] `executeResearch()` posts `POST /api/deep-research/execute` with JSON `{ topic: topic.trim(), mode, perspectives: confirmedPerspectives }`.
- [ ] A non-OK execute response becomes `data.error` or `Research failed ({status})`.
- [ ] Execute-phase `onProgress` updates `progressMessage` on every server `progress` event.
- [ ] Execute-phase `onProgress` updates `progressPercent` only when the incoming `progress` value is truthy, so `0` would never overwrite state.
- [ ] The current execute route never sends a numeric `progress` field, so `progressPercent` stays `0` through the running state and only jumps to `100` on the final `report` event.
- [ ] Because the running-state progress bar only renders when `progress > 0`, the percentage bar never appears during actual execution.
- [ ] Stage completion is tracked by pushing the previously active stage into `seenStageIdsRef.current` when a new stage ID arrives.
- [ ] The `report` SSE event sets `report`, sets `pageState = "done"`, sets `progressPercent = 100`, and marks the fixed nine stages completed.
- [ ] After the stream closes, the page still runs `setPageState(prev => prev === "running" ? "done" : prev)` as a fallback.
- [ ] The red header action during plan-preview and running is labeled exactly `Stop`.
- [ ] `handleAbort()` aborts the current controller if present, clears `planPerspectives`, and sets `pageState = "idle"`.
- [ ] `handleAbort()` does not clear `topic`, `mode`, `report`, `progressStages`, `progressPercent`, `progressMessage`, or `streamingSections`.
- [ ] An aborted plan or execute request returns the page to `idle` without entering the error view.
- [ ] The running-state fallback line is exactly `Researching: {topic}`.
- [ ] The running-state microscope icon uses `animate-pulse`, not a spinning rotation class.

### Progress Stepper
- [ ] `ProgressStepper` only renders the progress-bar block when `typeof progress === "number" && progress > 0`.
- [ ] The progress-bar label is exactly `Progress`.
- [ ] The progress-bar percentage text is `Math.round(progress)%`.
- [ ] The completed-stage icon is `CheckCircle2` with class `text-blue-400`.
- [ ] The active-stage icon is `Loader2` with `animate-spin`.
- [ ] The pending-stage icon is `Circle`.
- [ ] `ProgressStage.status` includes an `error` variant, but `buildStagesFromEvents()` never returns `error`.
- [ ] `STAGE_LABELS` maps the visible labels exactly to `Searching papers...`, `Traversing citation graph...`, `Expanding search...`, `Reading full-text PDFs...`, `Extracting data from papers...`, `Analyzing perspectives...`, `Writing executive summary...`, `Generating tables...`, and `Self-critique and revision...`.

### Done State, Error State, and Session Resume
- [ ] The done-state metadata line renders `{report.mode} mode · {report.totalSources} sources analyzed`.
- [ ] The page chooses `ResearchDocument` only when `report` has a truthy `markdownReport`; otherwise it renders `LegacyReportView`.
- [ ] The done-state reset button label is exactly `Start New Research`.
- [ ] `Start New Research` sets `pageState = "idle"`, `report = null`, `streamingSections = []`, `progressStages = []`, `seenStageIdsRef.current = []`, `currentStageIdRef.current = null`, and `topic = ""`.
- [ ] `Start New Research` does not reset `mode`, `progressMessage`, `progressPercent`, or `error`.
- [ ] The error-state title is exactly `Research Failed`.
- [ ] The error-state retry button label is exactly `Try Again`.
- [ ] `Try Again` resets only `pageState = "idle"` and `error = null`.
- [ ] Loading a saved session sets `pageState = "running"` and `progressMessage = "Loading saved research..."`.
- [ ] `handleLoadSession()` fetches `GET /api/deep-research/sessions/{id}`.
- [ ] The synthetic loaded report always sets `summary = ""`, `perspectives = []`, `contradictions = []`, `keyFindings = data.keyFindings || []`, `gaps = data.gaps || []`, `totalSources = data.sources?.length || 0`, `sources = data.sources || []`, and `markdownReport = data.markdownReport`.
- [ ] Loading a saved session also sets `topic = data.topic`, `mode = data.mode as ResearchMode`, and `pageState = "done"`.
- [ ] A saved-session load failure always sets the exact error string `Failed to load saved research` and then shows the error state.

### Research Document
- [ ] `ResearchDocument` uses `react-markdown` with `remarkGfm`.
- [ ] `extractTOC()` creates TOC items only from lines starting with `## ` or `### `.
- [ ] Desktop TOC heading text is exactly `Contents`.
- [ ] Desktop TOC is hidden below the `lg` breakpoint.
- [ ] Mobile TOC is a left-side drawer with width `w-72`, not a bottom sheet.
- [ ] Mobile TOC closes on backdrop click or the `X` button.
- [ ] There is no `Escape` key handler for the TOC or citations overlays.
- [ ] The floating mobile TOC button always renders, even when the markdown has no `##` or `###` headings.
- [ ] The floating mobile citations button renders only when `sources.length > 0`.
- [ ] The floating citations button title is exactly `Citations`.
- [ ] The floating TOC button title is exactly `Table of Contents`.
- [ ] `scrollToReference()` sets `highlightedCitation`, opens the citations panel if it was closed, and scrolls the matching `References` entry `ref-{N}` into view.
- [ ] `handlePanelCitationClick()` sets `highlightedCitation` and scrolls the matching `References` entry `ref-{N}` into view.
- [ ] Highlighted references keep their blue-tinted background until another citation is selected; there is no timeout that clears `highlightedCitation`.
- [ ] Markdown links always render `target="_blank"` with `rel="noopener noreferrer"`.
- [ ] Inline code renders only when the markdown `code` node has no `className`.
- [ ] Code blocks render as bordered `<code>` blocks inside `<pre>` without syntax highlighting.
- [ ] The appended references section title is exactly `References`.
- [ ] Both the references list and citations panel cap rendering at the first 50 sources.
- [ ] Reference author text uses the first 3 authors plus `et al.` when there are more than 3 authors.
- [ ] Reference metadata shows citation counts only when `source.citationCount > 0`.
- [ ] Reference metadata shows `OA` only when `source.isOpenAccess` is truthy.
- [ ] Reference links render individual `DOI`, `PubMed`, and `PDF` anchors when those fields exist.
- [ ] When the desktop citations panel is closed, the reopen icon button title is exactly `Open Citations Panel`.

### Citation Markers and Citations Panel
- [ ] Inline citation markers render as superscript `[N]` text with hover and click behavior.
- [ ] `expandCitationNumbers()` supports single numbers, comma-separated numbers, semicolon-separated numbers, and numeric ranges split by hyphen, en dash, or em dash.
- [ ] Tooltip position is clamped with `Math.min(position.top, window.innerHeight - 240)` and `Math.min(position.left, window.innerWidth - 340)`.
- [ ] Tooltip link labels are exactly `DOI`, `PubMed`, and `PDF`.
- [ ] Open-access tooltip text is exactly `OA`.
- [ ] `CitationTooltip` installs a `mousedown` outside-click listener and removes it in cleanup.
- [ ] `ParsedCitationText` maps citation numbers to `sources[part.num - 1]`, so out-of-range citation numbers still render markers but have no source-backed tooltip data.
- [ ] The citations-panel desktop header is exactly `Citations ({sources.length})`.
- [ ] The citations-panel mobile header is exactly `Citations ({sources.length})`.
- [ ] Citations-panel entries are buttons, not direct links.
- [ ] Citations-panel entries show title, authors, journal/year, and an evidence label; they do not render DOI, PubMed, PDF, or OA links inline.
- [ ] Citations-panel author text uses the first 2 authors plus `et al.` when there are more than 2 authors.
- [ ] Mobile citations use a bottom sheet and close after a citation is clicked because the mobile handler calls both `onClickCitation(num)` and `onClose()`.

### Export, Copy, and Open in Studio
- [ ] `ExportButtons` initializes `copied = false`, `studioLoading = false`, `studioError = null`, `pdfLoading = false`, and `pdfError = null`.
- [ ] Markdown export downloads `{topicSanitized}_report.md`.
- [ ] Topic sanitization for all client-side downloads replaces non-alphanumeric characters with `_` and truncates the topic slug to 50 characters.
- [ ] PDF export posts `POST /api/export/pdf` with `{ title: topic, content: markdownToSimpleHTML(markdownReport), citations }`.
- [ ] The client only includes the `citations` field in the PDF request when `sources.length > 0`.
- [ ] `markdownToSimpleHTML()` preserves block structure only; it skips horizontal rules, turns blockquotes into plain paragraphs, and flattens tables to pipe-separated text lines.
- [ ] PDF export disables only the PDF button while `pdfLoading` is true.
- [ ] PDF export success downloads `{topicSanitized}_report.pdf`.
- [ ] PDF export failure sets `pdfError` and clears it after exactly 5000 ms.
- [ ] The PDF button title is either the current `pdfError` string or `Download as PDF`.
- [ ] The PDF button label becomes `...` during loading and `Failed` during error state.
- [ ] Copy-to-clipboard prefers rich HTML plus plain text via `ClipboardItem` when available.
- [ ] The first clipboard fallback is `navigator.clipboard.writeText(markdownReport)`.
- [ ] The last clipboard fallback creates a `<textarea>`, selects it, and calls `document.execCommand("copy")`.
- [ ] Copy success sets `copied = true` and clears it after exactly 2000 ms.
- [ ] `markdownToRichHTML()` appends a generated `References` section from `sources`, even if the incoming markdown already contains one.
- [ ] `Open in Studio` posts `{ topic, mode, markdownReport, sources, keyFindings, gaps }` to `POST /api/deep-research/open-in-studio`.
- [ ] There is no `sessionStorage` handoff key or client-side payload cache in the current `Open in Studio` flow.
- [ ] Successful `Open in Studio` expects `{ redirectUrl }` from the API and calls `router.push(redirectUrl)`.
- [ ] Successful `Open in Studio` does not reset `studioLoading` because navigation is expected to replace the page.
- [ ] Failed `Open in Studio` sets `studioError`, sets `studioLoading = false`, and clears `studioError` after exactly 5000 ms.
- [ ] The Open in Studio button title is either the current `studioError` string or `Open in Studio editor`.
- [ ] The Open in Studio button label becomes `Opening...` during loading and `Failed` during error state.
- [ ] BibTeX and RIS buttons are completely hidden when `sources.length === 0`.
- [ ] BibTeX export downloads `{topicSanitized}_references.bib`.
- [ ] RIS export downloads `{topicSanitized}_references.ris`.
- [ ] BibTeX keys are derived from the first segment of the first author name, then year, then the first title word, lowercased, with fallback `ref{n}`.
- [ ] RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists.

### Save to Library and Session History
- [ ] `SaveToLibraryButton` initializes `state = "idle"` and `errorMessage = ""`.
- [ ] `SaveToLibraryButton` defaults `isLoggedIn = true`; the page never passes a different value.
- [ ] Save-to-library clicks are ignored when `!isComplete` or `!isLoggedIn`.
- [ ] Save-to-library posts `POST /api/deep-research/save` with `{ topic, mode, markdownReport, sources, keyFindings, gaps }`.
- [ ] Save-to-library success sets `state = "saved"` and leaves the button disabled thereafter.
- [ ] Save-to-library failure sets `state = "error"` and sets `errorMessage` to `err.message` or `Failed to save`.
- [ ] The error-state save button label is exactly `Retry`.
- [ ] The saved-state save button label is exactly `Saved`.
- [ ] The save button tooltip text is one of `Sign in to save`, `Research must be complete to save`, `Saved to library`, or `Save to library`.
- [ ] Save-to-library error tooltips do not auto-clear; clicking the button again retries the same request.
- [ ] `PastResearchSessions` fetches `GET /api/deep-research/sessions` on mount inside a `useEffect([])` and protects state updates with a `cancelled` flag on cleanup.
- [ ] The past-research loading message is exactly `Loading past research...`.
- [ ] A non-401 past-research fetch failure stores the exact error string `Could not load past research`, then returns `null` because `if (error || sessions.length === 0) return null`.
- [ ] A `401` past-research response does not set an error and simply hides the section.
- [ ] The visible section title is exactly `Past Research`.
- [ ] Each past-session row shows `{Capitalized mode} · {papersFound} papers · {relativeDate}`.
- [ ] Relative dates are exactly `just now`, `{m}m ago`, `{h}h ago`, `{d}d ago`, or an `en-US` short month/day date.
- [ ] The page tree has no session-delete control and no session-delete API call.

### API Routes Called by the Page
- [ ] `POST /api/deep-research/plan` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [ ] `POST /api/deep-research/plan` has `maxDuration = 30`.
- [ ] `POST /api/deep-research/plan` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [ ] `POST /api/deep-research/plan` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [ ] `POST /api/deep-research/plan` defaults `mode` to `"standard"` when omitted.
- [ ] `POST /api/deep-research/plan` uses `validateTopic(topic)`, so server-side topic validation enforces 5-to-500 characters even though the page UI does not.
- [ ] `POST /api/deep-research/plan` streams `progress`, `perspectives`, `done`, and `error` events; it never streams `report` or `section`.
- [ ] `POST /api/deep-research/plan` streams one `perspectives` event whose payload items include `id`, `name`, `description`, `queries`, and `expectedPaperTypes`.
- [ ] `POST /api/deep-research/execute` requires `getCurrentUserId()` and returns `401 {"error":"Not authenticated"}` JSON if auth fails before streaming.
- [ ] `POST /api/deep-research/execute` has `maxDuration = 300`.
- [ ] `POST /api/deep-research/execute` manually parses JSON; invalid JSON returns `400 {"error":"Invalid JSON body"}`.
- [ ] `POST /api/deep-research/execute` requires a string `topic`; missing or non-string topic returns `400 {"error":"topic is required"}`.
- [ ] `POST /api/deep-research/execute` requires a non-empty `perspectives` array; otherwise it returns `400 {"error":"perspectives array is required"}`.
- [ ] `POST /api/deep-research/execute` converts plan perspectives into engine perspectives, defaulting missing IDs to `perspective-{n}`, defaulting missing descriptions to the perspective name, and filtering out blank query strings.
- [ ] `POST /api/deep-research/execute` emits only `progress`, `report`, `done`, and `error` SSE event types.
- [ ] Execute-route `progress` SSE payloads contain `stage` and `message`, but no numeric `progress`.
- [ ] Execute-route `report` SSE payload nests the final report under `report` and includes `markdownReport`, `topic`, `mode`, `summary`, `keyFindings`, `gaps`, `contradictions`, `totalSources`, `searchRounds`, `citationTraversalPapers`, `extractedDataCount`, `durationMs`, `perspectives`, `perspectiveSections`, and `sources`.
- [ ] `GET /api/deep-research/sessions` reads from `deepResearchSessions`, orders by `completedAt DESC`, applies `.limit(20)`, and returns `{ sessions: [...] }`.
- [ ] `GET /api/deep-research/sessions/{id}` filters by both session ID and `userId`, returns `400 {"error":"Invalid session ID"}` for bad IDs, `404 {"error":"Session not found"}` for missing or unowned rows, and success payload `{ id, topic, mode, markdownReport, sources, keyFindings, gaps, papersFound, completedAt }`.
- [ ] `POST /api/deep-research/save` inserts into `deepResearchSessions` with `userId`, `originalQuery`, `finalReport`, `keyFindings`, `gapsIdentified`, `researchPlan: { mode, sources }`, `status: "completed"`, `papersFound`, `papersRead`, and `completedAt`, then returns `{ id, success: true }`.
- [ ] `POST /api/deep-research/open-in-studio` requires both `topic` and `markdownReport`; otherwise it returns `400 {"error":"Topic and markdownReport are required"}`.
- [ ] `POST /api/deep-research/open-in-studio` best-effort inserts a matching `deepResearchSessions` row before creating Studio records; failures in that insert are logged and do not stop Studio creation.
- [ ] `POST /api/deep-research/open-in-studio` inserts a `projects` row with `project_type: "literature_review"` and `status: "drafting"`, inserts a `synthesisDocuments` row with `document_type: "review_article"`, inserts one `synthesisSections` row titled `Research Report`, and returns `{ projectId, documentId, redirectUrl }`.
- [ ] `POST /api/export/pdf` is the only route in this flow that uses Zod and rate limiting.
- [ ] `POST /api/export/pdf` requires auth and returns `401 {"error":"Authentication required"}` when auth fails.
- [ ] `POST /api/export/pdf` rate-limits the caller with `checkRateLimit(userId, "export", RATE_LIMITS.export)`, where `RATE_LIMITS.export` is `30` requests per `3600` seconds.
- [ ] `POST /api/export/pdf` returns `429 {"error":"Rate limit exceeded. Please try again later."}` with header `X-RateLimit-Remaining` when the rate limit is exceeded.
- [ ] `POST /api/export/pdf` validates the request with `z.object({ title: z.string().max(500).optional(), content: z.string().max(500000), citations: z.array(z.string()).max(1000).optional() })`.
- [ ] `POST /api/export/pdf` returns `400 {"error":"Invalid request data"}` on Zod validation failure, `400 {"error":"Content is required"}` when `content` is an empty string, a binary PDF on success, and `500 {"error":"Export failed"}` on unexpected failure.

### Backend Engine and Library Behavior
- [ ] `validateTopic()` returns `{ valid: false, error: "Topic must be at least 5 characters long" }` when `topic.trim().length < 5`.
- [ ] `validateTopic()` returns `{ valid: false, error: "Topic must be 500 characters or fewer" }` when `topic.trim().length > 500`.
- [ ] Engine `buildConfig()` uses `quick = { depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10 }`.
- [ ] Engine `buildConfig()` uses `standard = { depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15 }`.
- [ ] Engine `buildConfig()` uses `deep = { depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20 }`.
- [ ] Engine `buildConfig()` uses `exhaustive = { depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25 }`.
- [ ] Engine search always fans out across PubMed, Semantic Scholar, and OpenAlex in `searchAllSources()`; there is no user-selectable source filter in the route UI.
- [ ] Round-1 search batches three queries at a time and sleeps for exactly 500 ms between batches.
- [ ] Citation traversal batches three seed papers at a time, calls Semantic Scholar `citations` and `references` endpoints with a 15-second timeout each, and sleeps for exactly 500 ms between batches.
- [ ] Citation traversal seeds the graph with the top 5 papers in quick mode and the top 10 papers in all other modes.
- [ ] Round-2 follow-up search only runs when `config.depth >= 2`.
- [ ] Round-3 follow-up search only runs when `config.depth >= 3`.
- [ ] Unpaywall lookup only checks the first 100 DOI-bearing papers.
- [ ] Full-text extraction only targets open-access papers with `fullTextUrl` and `isOpenAccess`, and it picks the top 5 papers in quick mode, 10 in standard mode, and 20 in deep or exhaustive mode.
- [ ] Full-text extraction aborts each PDF fetch after exactly `15000` ms.
- [ ] Full-text extraction rejects PDFs larger than 20 MB before or after download.
- [ ] Extracted full text is truncated to `15000` characters after section extraction.
- [ ] Full-text extraction failure returns `null` for that paper and increments the `failed` count; it does not fall back to the abstract.
- [ ] Data extraction batches five papers at a time and sleeps for exactly 200 ms between batches.
- [ ] Data extraction limits papers to 10 in quick mode, 20 in standard mode, and 40 in deep or exhaustive mode.
- [ ] Synthesis uses four passes: per-perspective sections, executive summary/introduction, tables and analysis, then critique-and-revision.

### Dead Code (exists but never executes)
- [ ] `page.tsx` defines `streamingSections`, renders streaming `ResearchDocument` previews, and animates them with an 800 ms timeout, but the execute API never emits `section` SSE events, so this path never runs.
- [ ] The `section` branch in the shared SSE parser exists, but no currently used deep-research server route sends `type: "section"`.
- [ ] The `_streamingMarkdown` variable in `page.tsx` is computed and never used.
- [ ] The page passes `onError` into `readSSEStream()` during plan generation, but the reader never calls `handlers.onError`.
- [ ] The preview component supports `isRegenerating`, but the page never passes that prop, so the spinner/disabled path is dead from the live route.
- [ ] `SaveToLibraryButton` supports `isLoggedIn = false`, but the page never passes a false value, so the logged-out tooltip/disabled branch is dead from the live route.
- [ ] `ProgressStage.status = "error"` exists in the component contract, but the `/deep-research` page never constructs an error-status stage.
- [ ] The legacy single-endpoint route `POST /api/deep-research` still exists, but the current `/deep-research` page never calls it.
- [ ] Even if `section` SSE events were added later, the current streaming-preview path would render them with `sources = []` because `report` is still `null` during the running state.

### Features in Existing Doc That Don't Exist in Code
- Client-side topic validation is not `5–500 characters`; the page only checks for non-empty trimmed text before enabling start.
- The start button does not show a loading spinner or loading label while the plan request is in flight.
- The running-state progress bar does not update through the search; the current server never sends numeric `progress`, so the bar stays hidden until the route leaves the running state.
- The execute flow does not stream report sections progressively into the UI; there are no `section` SSE emissions from the live server route.
- The client does not handle `done` SSE events explicitly.
- Clicking `Stop` does not clear progress state, progress message, or streaming state; it only aborts the request, clears `planPerspectives`, and sets `pageState = "idle"`.
- The completed progress icon is blue, not green.
- The running-state microscope icon pulses; it does not rotate.
- The mobile table of contents is not a full-screen overlay with a handle bar and it has no swipe-open or swipe-close behavior.
- Citation entries in the citations panel are not clickable source links; DOI, PubMed, and PDF links appear only in the tooltip and references list.
- The route has no session delete behavior in the page tree or called API routes.
- The page has no client-side source-selection control.
- The page has no separate UI controls for depth and breadth beyond the selected research mode.
- `Start New Research` does not reset the selected mode.
- The preview regenerate button is not driven by a real loading spinner from the page.
- There is no route-level `loading.tsx` or `error.tsx` boundary file for `/deep-research`.
- The open-in-studio client flow does not use `sessionStorage` at all.
- The page has no `Escape` keyboard handler for the TOC or citations overlays.
- The route tree has no explicit ARIA labels, `aria-live` progress region, or other custom accessibility wiring beyond native element semantics.
- Full-text extraction does not fall back to abstract text when PDF extraction fails; it skips the paper's full-text enrichment.

---

## Re-Audit Discoveries (Claude Code Pass 3)

### Execute Route Stage Mapping (`src/app/api/deep-research/execute/route.ts`)

- [ ] `STAGE_MAP` maps engine stages `validating`, `generating-perspectives`, `building-tree`, and `searching` to the single frontend stage `search-round-1`.
- [ ] Engine stage `search-round-3` maps to frontend `search-round-2` (no separate round-3 indicator on the frontend).
- [ ] Engine stages `deduplicating` and `unpaywall-lookup` both map to frontend `full-text-extraction`.
- [ ] Engine stage `synthesizing` maps to `synthesis-perspectives`; engine stage `complete` maps to `synthesis-critique`.
- [ ] Engine stages `citation-traversal`, `full-text-extraction`, and `data-extraction` are NOT in `STAGE_MAP` and pass through `mapStageId()` unchanged.
- [ ] Frontend stages `synthesis-summary` and `synthesis-tables` are never individually activated by any SSE progress event — they remain `pending` during execution and jump to `completed` only when the final `report` event marks all 9 stages completed.
- [ ] During a live research execution, the progress stepper shows stages jumping from `synthesis-perspectives` (active) directly to `synthesis-critique` (active), with `synthesis-summary` and `synthesis-tables` staying as gray pending circles until the report event.
- [ ] The execute route does NOT call `validateTopic()` — it only checks `!topic || typeof topic !== "string"`. A topic of 2 characters would pass the execute route's validation (but the plan route would have already rejected it).
- [ ] The execute route accepts an optional `config` field in the request body (`config?: Partial<ResearchConfig>`), but the page client never sends it — this is dead code from the page's perspective.

### Plan Route SSE Validation (`src/app/api/deep-research/plan/route.ts`)

- [ ] `validateTopic()` runs inside the SSE stream (after the 200 response is already sent), so a 5–500 character violation is emitted as an SSE error event `{ type: "error", error: "Topic must be at least 5 characters long" }`, not as an HTTP 400 response.
- [ ] The plan route emits the first progress message as `{ stage: "generating-perspectives", message: "Generating research perspectives..." }` before calling `generatePerspectives()`.
- [ ] After perspective generation completes, the plan route emits `{ stage: "generating-perspectives", message: "Generated {N} perspectives" }` before the perspectives event.

### Save Route Validation (`src/app/api/deep-research/save/route.ts`)

- [ ] Missing or non-string `topic` returns `400 { "error": "Topic is required" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.
- [ ] Unexpected errors return `500 { "error": "Failed to save research session" }`.

### Sessions Listing Route (`src/app/api/deep-research/sessions/route.ts`)

- [ ] Mode is extracted from `researchPlan` JSON via `(s.researchPlan as { mode?: string })?.mode` with fallback `"standard"`.
- [ ] `completedAt` for each session falls back to `startedAt?.toISOString()` when `completedAt` is null.
- [ ] Unexpected errors return `500 { "error": "Failed to fetch sessions" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }` (the client handles 401 silently by hiding the section).

### Sessions [id] Route (`src/app/api/deep-research/sessions/[id]/route.ts`)

- [ ] Mode defaults to `"standard"` when `researchPlan.mode` is absent from the stored JSON.
- [ ] `markdownReport` defaults to `session.finalReport || ""` — an empty string, not null/undefined.
- [ ] Unexpected errors return `500 { "error": "Failed to fetch session" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.

### Open in Studio Route Details (`src/app/api/deep-research/open-in-studio/route.ts`)

- [ ] Project title format: `Literature Review: {topic}`, with topic truncated to 77 chars + `"..."` when `topic.length > 80`.
- [ ] Project description: `Deep research report on: {topic}`.
- [ ] Document title is the same truncated string as the project title.
- [ ] Route appends `## References` with a numbered citation list to the markdown before Tiptap conversion.
- [ ] Route builds `SourceReference[]` (with `doi`, `pmid`, `title`) from sources and passes to `markdownToTiptap()` for citation hyperlink mapping.
- [ ] Route computes `word_count` from the plain text markdown and stores it on the section record.
- [ ] If the authenticated user does not exist in the DB, the route creates a dev user record with `email: "{userId}@dev.local"` and `full_name: "Dev User"` (for FK constraint satisfaction in dev mode).
- [ ] Unexpected errors return `500 { "error": "Failed to create studio document" }`.
- [ ] Auth failure returns `401 { "error": "Not authenticated" }`.

### Evidence Badge Labels (`src/components/deep-research/CitationReference.tsx`, `CitationsPanel.tsx`)

- [ ] `EVIDENCE_BADGE_STYLES` in CitationReference.tsx renders evidence labels as capitalized: `"High"`, `"Moderate"`, `"Low"`, `"Unknown"`.
- [ ] CitationsPanel.tsx renders evidence labels via `level.charAt(0).toUpperCase() + level.slice(1)` — also capitalized.
- [ ] EvidenceBadge tooltip text is `"{Label} evidence — {designLabel}"` or `"{Label} evidence"` (no design label).

### Citations Panel Initialization (`src/components/deep-research/ResearchDocument.tsx`)

- [ ] `citationsPanelOpen` is initialized to `true` — the citations panel starts open by default.
- [ ] Desktop TOC component (`TableOfContents`) returns `null` when `items.length === 0`, but the mobile floating TOC button still renders.

### Mobile Citations Handle Bar (`src/components/deep-research/CitationsPanel.tsx`)

- [ ] The handle bar element (`<div className="w-10 h-1 bg-gray-300 ...">`) is purely decorative — there are no drag event handlers, touch listeners, or swipe-to-dismiss behavior attached to it.

### Export Button UI Details (`src/components/deep-research/ExportButtons.tsx`)

- [ ] Export button text labels use `.hidden sm:inline` — on mobile (below `sm` breakpoint) only icons are visible, no text.
- [ ] Buttons render in this order: `.md` → `PDF` → `Copy` → vertical divider → `Open in Studio` → vertical divider → `.bib` → `.ris`.
- [ ] Markdown button `title` attribute: `"Download as Markdown"`.
- [ ] Copy button `title` attribute: `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.
- [ ] BibTeX button `title` attribute: `"Download references as BibTeX"`.
- [ ] RIS button `title` attribute: `"Download references as RIS (EndNote/Mendeley)"`.

### Export Format Details (`src/components/deep-research/ExportButtons.tsx`)

- [ ] RIS export: when `pdfUrl` is absent but `doi` is present, uses `UR  - https://doi.org/{doi}` as fallback URL.
- [ ] BibTeX `abstract` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [ ] RIS `AB` field is truncated to 500 characters via `s.abstract.slice(0, 500)`.
- [ ] `markdownToRichHTML()` generates a clipboard References section from ALL sources — no 50-source cap, unlike the rendered references list and citations panel.
- [ ] `markdownToRichHTML()` applies inline bold (`**text**` → `<strong>`), italic (`*text*` → `<em>`), and citation superscript (`[N]` → styled `<sup>`) formatting via `applyInlineFormatting()`.
- [ ] `markdownToRichHTML()` renders horizontal rules as `<hr>` with inline styles, while `markdownToSimpleHTML()` skips them entirely.

### Markdown Rendering Details (`src/components/deep-research/ResearchDocument.tsx`)

- [ ] `h2` headings render with a bottom border: `border-b border-gray-200 dark:border-gray-700/50`.
- [ ] `h4` headings render with `italic` class applied.
- [ ] Heading ID generation: lowercased, strips `[^a-z0-9\s-]`, replaces `\s+` with `-`.
- [ ] `IntersectionObserver` for active heading tracking: `rootMargin: "-80px 0px -60% 0px"`, `threshold: 0.1`.
- [ ] `<hr>` elements render with `my-8 border-gray-200 dark:border-gray-700/50`.

### Print Styles (`src/components/deep-research/ResearchDocument.tsx`)

- [ ] Even table rows: `background: #f9fafb` in print.
- [ ] Blockquotes in print: border `#666`, text `#555`, background transparent.
- [ ] Code elements in print: background `#f3f4f6`, text `#333`.
- [ ] Links in print: color `#1a56db`.

### SSE Stream Headers (both `plan/route.ts` and `execute/route.ts`)

- [ ] Both routes return headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
- [ ] Both routes export `dynamic = "force-dynamic"` (disables Next.js static caching).

### Behavior Corrections (Pass 3)

- Section 11 evidence badge labels are rendered capitalized ("High", "Moderate", "Low", "Unknown") in both the tooltip badge and the citations panel — not lowercase ("high", etc.) as stated in the Evidence Level System table.
- The mobile citations panel handle bar (section 9) is NOT draggable — it is a purely decorative `<div>` with no drag handlers, touch listeners, or swipe behavior.
- `markdownToRichHTML()` clipboard output includes a References section from ALL sources (uncapped), while the rendered references list and citations panel are capped at 50 sources.

### Components Referenced But Not Rendered

No new dead-import discoveries — Codex's dead code section (Pass 2) remains accurate and complete.
