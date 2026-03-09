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

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Deep Research page defaults to `topic = ""`, `mode = "standard"`, and `pageState = "idle"`
- [ ] The page uses a client-side state machine only; there is no route-level `loading.tsx` or `error.tsx` file for `/deep-research`
- [ ] Header export controls render only when `pageState === "done"` and a report object exists
- [ ] Header `Stop` button renders during both `plan-preview` and `running` states
- [ ] Clicking `Stop` aborts any in-flight request, clears `planPerspectives`, and forces `pageState = "idle"`
- [ ] Stopping a run does not clear the current `topic` input value
- [ ] Topic input does not enforce a client-side maximum length in the page component
- [ ] Topic input client-side validation is only `topic.trim()` presence for enabling the start button
- [ ] Pressing `Enter` in the topic field only starts research when the page is in `idle` state and the trimmed topic is non-empty
- [ ] `Shift+Enter` has no special multiline behavior because the topic control is a single-line `<input>`
- [ ] The default selected research mode is `Standard`
- [ ] Mode cards show estimated times from `RESEARCH_MODES`: `~1 min`, `~3 min`, `~5 min`, and `~10 min`
- [ ] Mode cards do not render the mode descriptions from `RESEARCH_MODES.description` in the current UI
- [ ] Clicking a mode updates only local `mode` state until a request is submitted
- [ ] Start button is disabled only when `topic.trim()` is empty
- [ ] Start button does not currently show a spinner or label change during plan generation
- [ ] Clicking `Start Deep Research` immediately sets `pageState = "plan-preview"` before the plan request resolves
- [ ] Plan generation resets prior `planPerspectives` and updates `progressMessage` to `Generating research plan...`
- [ ] Plan generation posts `{ topic: topic.trim(), mode }` to `/api/deep-research/plan`
- [ ] Plan generation requires an SSE response body; otherwise it throws `No response stream`
- [ ] SSE parsing ignores malformed JSON lines only when they throw `SyntaxError`
- [ ] SSE parser ignores `data: [DONE]` sentinel lines
- [ ] `progress` SSE events during plan generation update `progressMessage` only; they do not advance the progress stepper
- [ ] `perspectives` SSE events replace the full `planPerspectives` array
- [ ] If the plan request aborts, the page returns to `idle` without showing an error
- [ ] Plan-generation failures set `error` and move the page to `error`
- [ ] Plan loading state shows a pulsing microscope icon and the current `progressMessage`
- [ ] Plan loading helper line reads `Preparing research plan for: {topic}`
- [ ] Plan preview renders only when `pageState === "plan-preview"` and `planPerspectives.length > 0`
- [ ] `ResearchPlanPreview` copies the initial perspectives into local component state once on mount
- [ ] If parent `planPerspectives` changes after mount, the current preview component does not resync its local copy automatically
- [ ] Plan preview expands the first perspective by default with `expandedIndex = 0`
- [ ] Perspective names are editable text inputs with placeholder `Perspective name...`
- [ ] Search-query rows are editable text inputs with placeholder `Search query...`
- [ ] Query delete buttons are shown only when the perspective currently has more than one query
- [ ] `Add query` appends an empty-string query row to that perspective
- [ ] Collapsing a perspective hides only its query list; edits are preserved in local state
- [ ] `Regenerate` button disables only when `isRegenerating` prop is true; the current page never passes that prop, so it remains enabled during regeneration requests
- [ ] Clicking `Regenerate` from the preview calls back into `fetchPlan()` and discards the current local preview component when the page rerenders
- [ ] Confirming the plan clears `planPerspectives` in the page before starting execution
- [ ] Research execution posts `{ topic, mode, perspectives }` to `/api/deep-research/execute`
- [ ] Starting execution resets `report`, `streamingSections`, progress stages, seen-stage refs, and progress percent
- [ ] Execution sets the initial progress message to `Starting research...`
- [ ] Execution renders the progress stepper immediately with all stages pending
- [ ] Progress stepper only shows the top progress bar after progress exceeds 0
- [ ] Progress percentage is rounded with `Math.round(progress)` in the UI
- [ ] Progress bar width clamps visually at `100%`
- [ ] Stage timeline always contains exactly 9 hard-coded stages in fixed order
- [ ] Stage transition logic marks the prior active stage completed only when a different stage ID arrives
- [ ] If an SSE progress event has `progress = 0`, the UI intentionally does not update `progressPercent` because the page checks `if (progress)`
- [ ] `section` SSE events append a new streaming section object with `animating: true`
- [ ] New streaming sections clear their animation flag after 800 ms
- [ ] Running-state fallback panel shows a pulsing microscope icon and `Researching: {topic}` when no section chunks have arrived yet
- [ ] Streaming sections are rendered as multiple `ResearchDocument` components rather than one concatenated markdown block
- [ ] `report` SSE events immediately set the final report object and move the page to `done`
- [ ] Receiving a final report also forces progress percent to 100 and marks all 9 stages completed
- [ ] After the SSE stream ends, the page only flips from `running` to `done` if it is still in `running`; prior state changes are preserved
- [ ] Execution aborts return the page to `idle` without showing an error
- [ ] Session loading sets `pageState = "running"` temporarily and `progressMessage = "Loading saved research..."`
- [ ] Loaded sessions are mapped into an `EnhancedSynthesisReport` shape with empty `summary`, empty `perspectives`, and empty `contradictions`
- [ ] Loading a saved session also restores `topic` and `mode` from the session payload
- [ ] Session-load failures set error text `Failed to load saved research` and move to the `error` state
- [ ] Past research session loading starts with `loading = true`
- [ ] Past research treats `401` as a silent no-content state and does not show an error
- [ ] Past research fetch failures set a local error string but the component renders `null`, effectively hiding the whole section
- [ ] Past research cards do not explicitly cap to 20 in the component; they render whatever `data.sessions` returns
- [ ] Relative-date formatter returns `just now`, `Xm ago`, `Xh ago`, `Xd ago`, or `MMM D`
- [ ] Session cards show `papersFound` directly from the session payload and do not infer it from sources
- [ ] Done-state header line shows `{mode} mode · {totalSources} sources analyzed`
- [ ] `Start New Research` resets `pageState`, `report`, `streamingSections`, `progressStages`, seen-stage refs, and `topic`
- [ ] `Start New Research` does not reset `mode`; the last chosen mode persists into the next idle state
- [ ] Enhanced reports are detected only when `report` has a truthy `markdownReport`
- [ ] Legacy reports fall back to `LegacyReportView`
- [ ] `ResearchDocument` extracts the table of contents from markdown `##` and `###` headings only
- [ ] Table-of-contents heading IDs are slugified by lowercasing, stripping punctuation, and replacing spaces with hyphens
- [ ] Desktop TOC is hidden below the `lg` breakpoint
- [ ] Mobile TOC uses a fixed left-side drawer overlay, not a bottom sheet
- [ ] Mobile floating TOC button is always shown even when there are no TOC items
- [ ] Mobile floating Citations button is shown only when `sources.length > 0`
- [ ] Active TOC heading is tracked via `IntersectionObserver` with root margin `-80px 0px -60% 0px`
- [ ] Clicking a TOC entry performs smooth scroll and updates `activeHeading`
- [ ] `ResearchDocument` defaults the citations panel to open on first render when sources exist
- [ ] Desktop citations panel can be reopened from a single `BookOpen` icon button when it has been closed
- [ ] Citation panel and references section both limit rendering to the first 50 sources
- [ ] Clicking a citation marker in the markdown opens the citations panel if needed and scrolls to the matching reference entry
- [ ] Clicking a citation entry in the citations panel scrolls to the corresponding `References` section entry
- [ ] Highlighted citations get a temporary blue-tinted background in both the references list and citations panel
- [ ] Parsed inline citation markers are only recognized when text contains a `[\d` pattern
- [ ] Markdown links always open in a new tab with `rel="noopener noreferrer"`
- [ ] Inline code uses gray background with emerald text in both light and dark themes
- [ ] Code blocks render as bordered `code` blocks inside a `pre`, not syntax-highlighted editors
- [ ] References section is appended below the markdown report only when sources exist
- [ ] Reference author line truncates to three authors plus `et al.` when there are more than three authors
- [ ] Reference metadata line shows citation count only when `source.citationCount > 0`
- [ ] Reference metadata line shows `OA` only when `source.isOpenAccess` is true
- [ ] Reference links render separately for DOI, PubMed, and PDF when those fields exist
- [ ] Citation-entry evidence labels derive from `extractedData.studyDesign`, `studyType`, or `evidenceLevel` in that priority order
- [ ] Evidence mapping treats meta-analysis, systematic review, and randomized/RCT terms as `high`
- [ ] Evidence mapping treats cohort, case-control, observational, cross-sectional, prospective, and retrospective terms as `moderate`
- [ ] Evidence mapping treats case series, case report, expert/opinion/editorial, narrative review, and letter terms as `low`
- [ ] Unmatched evidence terms fall back to `unknown`
- [ ] Markdown export downloads `{sanitizedTopic}_report.md`
- [ ] Topic sanitization for downloads replaces non-alphanumeric characters with `_` and truncates to 50 characters
- [ ] PDF export converts markdown to simplified block HTML before posting to `/api/export/pdf`
- [ ] PDF export includes a generated citations array only when sources exist
- [ ] PDF button shows a spinner icon and `...` label while the export is running
- [ ] PDF export failures switch the button into a red `Failed` state and show an inline tooltip for 5 seconds
- [ ] Copy button prefers rich clipboard content with both HTML and plain text when `ClipboardItem` is available
- [ ] Clipboard fallback uses `navigator.clipboard.writeText(markdownReport)`
- [ ] Final clipboard fallback uses a hidden textarea plus `document.execCommand("copy")`
- [ ] Copy button label changes to `Copied` with a check icon for 2 seconds on success
- [ ] `Open in Studio` posts topic, mode, markdown report, sources, key findings, and gaps to `/api/deep-research/open-in-studio`
- [ ] `Open in Studio` button shows a spinner plus `Opening...` while the request is running
- [ ] Successful `Open in Studio` navigates with `router.push(redirectUrl)`
- [ ] Failed `Open in Studio` shows a temporary red `Failed` state and tooltip for 5 seconds
- [ ] `Open in Studio` does not currently reset its loading spinner state on success because navigation is expected to replace the page
- [ ] BibTeX export is hidden entirely when there are no sources
- [ ] RIS export is hidden entirely when there are no sources
- [ ] BibTeX keys are generated from first-author last name + year + first title word, with a fallback `ref{n}`
- [ ] RIS export writes `AN  - PMID:{pmid}` when a PubMed ID exists
- [ ] Save to Library button is disabled when research is incomplete, when logged out, while saving, and after a successful save
- [ ] Save to Library default title tooltip is `Save to library`
- [ ] Save to Library success state changes icon to `Check` and label to `Saved`
- [ ] Save to Library error state changes icon to `AlertCircle`, label to `Retry`, and shows an inline tooltip with the server error
- [ ] Clicking Save to Library in the error state retries the same request
- [ ] Save to Library posts topic, mode, markdown report, sources, key findings, and gaps to `/api/deep-research/save`
- [ ] Error-state page title reads `Research Failed`
- [ ] Error-state retry button resets only `pageState` and `error`; it leaves `topic`, `mode`, and any prior report data in memory until replaced

### Actual Current Behavior Corrections
- [ ] The page does not enforce the documented `5–500` character validation range in the client UI; it only checks for a non-empty trimmed topic before enabling start.
- [ ] The start button does not show a dedicated loading spinner during plan generation.
- [ ] The page does not render a separate route-level `error` or `loading` boundary component for `/deep-research`.
- [ ] Past Research cards are not explicitly sliced to 20 in the component; that limit depends on the API response.
- [ ] The plan-preview `Regenerate` button is not disabled or spun by the current page because `isRegenerating` is never passed in.
- [ ] `Start New Research` clears the topic but keeps the previously selected mode.
- [ ] Mobile table of contents is a left-side drawer overlay, not a full-screen overlay.
- [ ] Mobile citations use a bottom sheet, but mobile table of contents does not.

*Generated from source code in `src/app/(app)/deep-research/`, `src/components/deep-research/`, `src/lib/deep-research/`, and related API routes — March 2026*
