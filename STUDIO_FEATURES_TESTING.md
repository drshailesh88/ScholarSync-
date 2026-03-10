# ScholarSync — Studio Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Studio writing environment (`/studio`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/studio/`, `src/components/integrity/`, `src/components/citations/`, `src/components/editor/`, and related stores/hooks.

---

## Table of Contents

1. [Page Overview & Layout](#1-page-overview--layout)
2. [Left Sidebar](#2-left-sidebar)
3. [Draft Mode (Write Mode)](#3-draft-mode-write-mode)
4. [Learn / Guide Mode](#4-learn--guide-mode)
5. [Top Status Bar](#5-top-status-bar)
6. [Editor (TiptapEditor)](#6-editor-tiptapeditor)
7. [Slash Commands](#7-slash-commands)
8. [AI Chat Panel (Chat & Learn Tab)](#8-ai-chat-panel-chat--learn-tab)
9. [Research Tab](#9-research-tab)
10. [Integrity Panel (Checks Tab)](#10-integrity-panel-checks-tab)
11. [Citation Dialog](#11-citation-dialog)
12. [Reference Sidebar](#12-reference-sidebar)
13. [Export System](#13-export-system)
14. [Save & Document Persistence](#14-save--document-persistence)
15. [Keyboard Shortcuts](#15-keyboard-shortcuts)
16. [Loading & Error States](#16-loading--error-states)
17. [Quick Test Workflows](#17-quick-test-workflows)

---

## 1. Page Overview & Layout

| Page | Route | Purpose |
|------|-------|---------|
| **Studio** | `/studio` | Main writing environment with AI assistance, integrity checks, citations, and guided workflows |

### Layout

```
┌───────────────────────────────────────────────────────────────────┐
│  Draft Mode Header OR Guide Mode Header                          │
│  Save Status Bar + Export Button                                  │
├──────────┬─────────────────────────────────────┬──────────────────┤
│          │                                     │  Right Panel     │
│  Left    │  TiptapEditor                       │  (3 tabs):       │
│  Sidebar │  (rich text editing area)           │  - Chat & Learn  │
│  (w-64)  │                                     │  - Research      │
│          │                                     │  - Checks        │
│          │                                     │  (w-80)          │
├──────────┴─────────────────────────────────────┴──────────────────┤
```

- [ ] 3-column layout: Left sidebar (264px) | Editor (flex) | Right panel (320px)
- [ ] Height fills viewport: `h-[calc(100vh-7rem)]`
- [ ] Right panel toggleable — replaced by Reference Sidebar when open
- [ ] All columns visible on desktop
- [ ] Layout responsive at different viewport widths

---

## 2. Left Sidebar

### Document Title
- [ ] Editable title input at top of sidebar
- [ ] Title updates on change and triggers save
- [ ] Placeholder text shown when title is empty

### Mode Toggle
- [ ] "Write" button switches to Draft/Write mode
- [ ] "Learn" button switches to Learn/Guide mode
- [ ] Active mode button is visually highlighted
- [ ] Mode persists during session

### Project Selector
- [ ] Dropdown shows user's projects (if multiple exist)
- [ ] Selecting a project switches document context
- [ ] Document content loads for selected project

### Navigation Links
- [ ] "My Library" link navigates to library
- [ ] "Literature Search" link navigates to research

### References Section
- [ ] Header shows "References (X)" with count
- [ ] Top 5 cited references displayed
- [ ] "View all X references" expandable link
- [ ] Empty state: "Use Cmd+Shift+C to add citations"
- [ ] Clicking reference selects it

### AI Credits
- [ ] Usage bar displayed at sidebar bottom
- [ ] Shows tokens used vs. tokens limit
- [ ] Bar fills proportionally to usage
- [ ] Updates after AI operations

---

## 3. Draft Mode (Write Mode)

- [ ] Header renders when `isLearnMode` is false
- [ ] Three AI intensity buttons displayed:

| Intensity | Label | Description | Accent | Test |
|-----------|-------|-------------|--------|------|
| Focus | "Focus" | "AI is quiet — only responds when you ask" | sky-500 | [ ] Selectable |
| Collaborate | "Collaborate" | "AI assists with completions and suggestions" | brand | [ ] Selectable |
| Accelerate | "Accelerate" | "AI is proactive — full suggestions and sidebar" | violet-500 | [ ] Selectable |

- [ ] Active intensity button visually highlighted
- [ ] Switching intensity updates AI behavior
- [ ] Default intensity is "collaborate"

---

## 4. Learn / Guide Mode

- [ ] Header renders when `isLearnMode` is true
- [ ] Emerald green header with text: "Guide Mode — I won't write for you — I'll teach you how"

### Document Type Picker
- [ ] "Select document type" default text
- [ ] Clicking opens picker with 7 document types:
  | Type | Label | Test |
  |------|-------|------|
  | case_report | Case Report | [ ] Selectable |
  | original_article | Original Article | [ ] Selectable |
  | review_article | Review Article | [ ] Selectable |
  | meta_analysis | Meta-Analysis | [ ] Selectable |
  | book_chapter | Book Chapter | [ ] Selectable |
  | academic_draft | Academic Draft | [ ] Selectable |
  | letter | Letter / Correspondence | [ ] Selectable |

### Stage Progression Tracker
- [ ] 6 stage buttons displayed in order:
  | Stage | Label | Test |
  |-------|-------|------|
  | understand | Understand | [ ] Clickable, highlights when active |
  | plan | Plan | [ ] Clickable, highlights when active |
  | outline | Outline | [ ] Clickable, highlights when active |
  | draft | Draft | [ ] Clickable, highlights when active |
  | revise | Revise | [ ] Clickable, highlights when active |
  | polish | Polish | [ ] Clickable, highlights when active |
- [ ] Active stage visually highlighted
- [ ] Can click any stage to navigate (non-linear)
- [ ] AI chat adapts Socratic method to current stage

---

## 5. Top Status Bar

### Save Status Indicator
| Status | Icon | Label | Test |
|--------|------|-------|------|
| saving | Spinning circle | "Saving..." | [ ] Shows during save |
| saved | Check | "Saved HH:MM" | [ ] Shows after successful save |
| unsaved | — | "Unsaved changes" | [ ] Shows when dirty |
| error | Warning | "Save failed" | [ ] Shows on save error |
| idle | — | Last saved time (if available) | [ ] Default state |

### Export Dropdown
- [ ] "Export" button visible
- [ ] Clicking opens dropdown with options:
  - [ ] "Export as PDF"
  - [ ] "Export as Word"
- [ ] Dropdown closes on selection or outside click

---

## 6. Editor (TiptapEditor)

- [ ] Rich text editor renders in center column
- [ ] Editor accepts typing and formatting
- [ ] Content syncs with document state

### Text Formatting
- [ ] Bold, Italic, Underline, Strikethrough
- [ ] Heading levels 1–4
- [ ] Bullet list, Numbered list, Checklist
- [ ] Blockquote
- [ ] Code block
- [ ] Horizontal rule / divider

### Academic Content
- [ ] Table insertion (3×3 with header row)
- [ ] Image upload and embedding
- [ ] Abstract template (Background/Methods/Results/Conclusion)
- [ ] Auto-numbered figure captions
- [ ] Auto-numbered table captions
- [ ] Footnotes (`Cmd+Shift+F`)

### Content Editing
- [ ] Text selection and editing
- [ ] Copy/paste preserves formatting
- [ ] Undo (`Ctrl+Z`) / Redo (`Ctrl+Y`)
- [ ] Drag and drop text/blocks
- [ ] Editor triggers `handleDirty()` on changes (saves to localStorage)

### Debounce Behavior
- [ ] Title changes debounced at 1 second
- [ ] Content changes debounced at 2 seconds
- [ ] Save status updates after debounce

---

## 7. Slash Commands

- [ ] Typing `/` at start of line or after space triggers command menu
- [ ] Menu shows fuzzy-filtered results as user types

### AI Action Commands
| Command | Description | Icon | Action | Test |
|---------|-------------|------|--------|------|
| AI Continue Writing | Let AI continue from your cursor | Sparkle | Dispatches `continue` | [ ] Works |
| AI Summarize Selection | Summarize selected text | Sparkle | Dispatches `summarize` | [ ] Works |
| Find Sources | Search for related papers | MagnifyingGlass | Opens research sidebar | [ ] Works |
| Add Citation | Insert a citation from your library | BookOpen | Opens citation dialog | [ ] Works |
| Check Integrity | Run plagiarism & AI detection check | ShieldCheck | Switches to Checks tab | [ ] Works |

### Formatting Commands
| Command | Action | Test |
|---------|--------|------|
| Heading 1 | Set heading level 1 | [ ] Works |
| Heading 2 | Set heading level 2 | [ ] Works |
| Heading 3 | Set heading level 3 | [ ] Works |
| Bullet List | Toggle bullet list | [ ] Works |
| Numbered List | Toggle ordered list | [ ] Works |
| Blockquote | Toggle blockquote | [ ] Works |
| Divider | Insert horizontal rule | [ ] Works |

- [ ] Menu navigable with Arrow Up/Down
- [ ] Enter selects highlighted command
- [ ] Escape closes menu
- [ ] Menu positions correctly relative to cursor

---

## 8. AI Chat Panel (Chat & Learn Tab)

### Chat Messages
- [ ] User messages appear on one side
- [ ] Assistant messages appear on opposite side
- [ ] Messages render markdown content
- [ ] Streaming responses update incrementally
- [ ] Loading spinner shows during response generation

### Chat Input
- [ ] Input field with contextual placeholder:
  - Learn mode: "Ask me to challenge your thinking..."
  - Write mode: "Ask your AI research assistant..."
- [ ] Submit via Enter key
- [ ] Submit via Send button
- [ ] Empty input cannot be submitted
- [ ] Input clears after submission

### Chat Errors
- [ ] Error displays in amber warning box
- [ ] Error text from `chatError` state
- [ ] Error clears on next successful message

### AI Behavior by Mode
- [ ] Write mode: AI acts as research assistant
- [ ] Learn mode: AI uses Socratic method, refuses to write content directly
- [ ] AI behavior adapts to selected guide stage in Learn mode
- [ ] AI behavior adapts to draft intensity in Write mode

---

## 9. Research Tab

- [ ] Tab labeled "Research" in right panel
- [ ] "Open Literature Research Panel" button opens `ResearchSidebar`
- [ ] Instruction text: "Or press Cmd+Shift+L to toggle"

### Quick PubMed Search
- [ ] Search input with placeholder: "Quick search PubMed..."
- [ ] "Search" button submits query
- [ ] Results display inline

### Research Sidebar
- [ ] Full panel with literature discovery
- [ ] 3 sub-tabs for different search/browse modes
- [ ] Results can be saved to library
- [ ] Papers can be cited directly

---

## 10. Integrity Panel (Checks Tab)

- [ ] Tab labeled "Checks" in right panel

### Idle State
- [ ] Shield icon displayed
- [ ] Title: "Integrity Check"
- [ ] Description text explaining the feature
- [ ] "Run Integrity Check" button (brand colored)

### Running State
- [ ] Spinning circle animation
- [ ] Text: "Analyzing Document..."
- [ ] Subtext: "Running AI detection, plagiarism scan, and citation verification."

### Error State
- [ ] Warning icon
- [ ] Error message displayed
- [ ] "Retry" button with ArrowClockwise icon

### Results State
- [ ] Header: "Integrity Report" with "Re-run" button
- [ ] Circular gauge showing Human Score (0–100%)

### Section 1: AI Detection
- [ ] Robot icon (color by score: emerald ≥80%, amber ≥50%, red <50%)
- [ ] Summary: `{humanScore}% human · {overallRisk} risk`
- [ ] Expandable with chevron
- [ ] Stats grid (2 columns):
  | Metric | Format | Test |
  |--------|--------|------|
  | Avg. Sentence | X.X words | [ ] Displays correctly |
  | Burstiness | std dev value | [ ] Displays correctly |
  | Vocabulary | X% (type-token ratio) | [ ] Displays correctly |
  | Hedging Phrases | count | [ ] Displays correctly |
- [ ] Flagged Paragraphs (top 5):
  - [ ] Paragraph excerpt displayed
  - [ ] AI probability percentage shown
  - [ ] Flags listed as bullets
  - [ ] Suggestion shown if available
- [ ] Available on free tier

### Section 2: Plagiarism
- [ ] MagnifyingGlass icon (emerald <15%, amber <30%, red ≥30%)
- [ ] Summary: `X% similar · Y sources` or "Paid feature"
- [ ] Expandable section
- [ ] "Scanned Z scholarly sources" text
- [ ] No matches: green success "No significant matches found"
- [ ] Match cards (up to 5):
  - [ ] Similarity percentage (colored)
  - [ ] Severity badge: high / medium / low
  - [ ] Excerpt quote
  - [ ] Source title with year
  - [ ] DOI link (if available, opens in new tab)
- [ ] Locked for free tier — shows lock icon + upgrade message

### Section 3: Citations
- [ ] BookmarkSimple icon (emerald if clean, amber if issues)
- [ ] Summary: `X/Y verified · Z issues` or "Paid feature"
- [ ] No issues: green success "All citations verified"
- [ ] Issue cards (up to 8):
  - [ ] Severity icon: XCircle (red), Warning (amber), CheckCircle (blue)
  - [ ] Issue message text
  - [ ] Reference number if applicable
- [ ] Verified references list (up to 10):
  - [ ] CheckCircle (verified) or XCircle (failed)
  - [ ] Citation index in brackets `[1]`
  - [ ] Reference title
- [ ] Locked for free tier

### Section 4: Writing Quality
- [ ] TextAa icon (blue)
- [ ] Summary: `Grade X.X · Y passive`
- [ ] Stats:
  | Metric | Format | Test |
  |--------|--------|------|
  | Readability | Grade X.X (Flesch-Kincaid) | [ ] Correct value |
  | Avg Sentence | X.X words | [ ] Correct value |
  | Passive Voice | X instances | [ ] Correct count |
- [ ] Suggestions section (if any):
  - [ ] List of improvement suggestions with quote icons

### API
- [ ] `POST /api/integrity-check` called on "Run" button
- [ ] Request: `{ text: string (max 50KB), sources?: [...] }`
- [ ] Response populates all 4 sections
- [ ] Handles API errors gracefully

---

## 11. Citation Dialog

- [ ] Opens via slash command "Add Citation" or `Cmd+Shift+C`
- [ ] Modal overlay with close (X) button top-right
- [ ] Title: "Insert Citation" with BookOpen icon

### Tab 1: Your References (search)
- [ ] Search input: "Search references or paste DOI/PMID..."
- [ ] Identifier detection banner appears if DOI/PMID typed:
  - [ ] Text: `Resolve {IDENTIFIER}: {value}`
  - [ ] Resolve button
- [ ] Reference list with checkboxes:
  - [ ] Each shows title (truncated), authors, year, journal
  - [ ] Citation number badge `[N]` if already in document
  - [ ] Blue checkbox when selected
- [ ] Empty: "No references yet. Add one using DOI/PMID or manual entry."
- [ ] Search empty: "No matching references found."
- [ ] Arrow Up/Down navigates list, Enter selects

### Tab 2: Library (library)
- [ ] Search input: "Search your saved papers..."
- [ ] Loading spinner while fetching
- [ ] Paper cards show title, authors, journal, year
- [ ] "Already in references" badge (green) for previously added papers
- [ ] Click toggles selection (auto-adds if new)
- [ ] Empty: "No papers in your library yet. Save papers from the Research page."
- [ ] Search empty: "No papers match your search."

### Tab 3: Paste DOI/PMID (doi)
- [ ] Label: "Paste DOI or PMID"
- [ ] Input placeholder: "10.1056/NEJMoa2301234 or 37654789"
- [ ] "Resolve" button (shows spinner while resolving)
- [ ] Enter key submits
- [ ] Error: red background with error text + "Try manual entry" link
- [ ] Success: green preview with title, authors, year, journal + "Add to References" button

### Tab 4: Manual Entry (manual)
- [ ] Form fields:
  | Field | Required | Placeholder | Test |
  |-------|----------|-------------|------|
  | Type | — | Select dropdown | [ ] 8 options: Article, Book, Book Chapter, Website, Guideline, Conference, Thesis, Preprint |
  | Title | Yes (*) | — | [ ] Required validation |
  | Authors | — | "John Smith, Jane Doe" | [ ] Comma-separated |
  | Journal | — | "N Engl J Med" | [ ] Free text |
  | Year | — | "2024" | [ ] Free text |
  | Volume | — | "389" | [ ] Free text |
  | Issue | — | "4" | [ ] Free text |
  | Pages | — | "312-320" | [ ] Free text |
  | DOI | — | "10.1056/NEJMoa..." | [ ] Free text |
  | PMID | — | — | [ ] Free text (optional) |
  | URL | — | — | [ ] Free text (optional) |
- [ ] "Save Reference" button (disabled if title empty)

### Bottom Bar
- [ ] "Selected (X)" counter with Hash icon
- [ ] Selected reference badges: `{firstName} {year}` with removal X buttons
- [ ] "Cancel" button closes dialog
- [ ] "Insert Citation" button (only if selections made)
- [ ] Clicking "Insert Citation" inserts formatted citations into editor

---

## 12. Reference Sidebar

- [ ] Opens when `sidebarOpen` is true (replaces AI right panel)
- [ ] Toggle via `Cmd+Shift+R`

### Reference List
- [ ] All references displayed with metadata
- [ ] Sortable (by author, year, title)
- [ ] Filterable by search
- [ ] Each reference expandable for full details
- [ ] Citation number shown for each `[1]`, `[2]`, etc.

### Actions
- [ ] Click reference to select
- [ ] Delete reference
- [ ] Edit reference details
- [ ] Auto-numbering updates when references change

---

## 13. Export System

### PDF Export
- [ ] Triggered via "Export as PDF" or top bar dropdown
- [ ] Calls `POST /api/export/pdf`
- [ ] Academic formatting applied:
  - [ ] 1-inch margins
  - [ ] Double-spaced text
  - [ ] Proper heading hierarchy
- [ ] Downloads PDF file

### DOCX Export
- [ ] Triggered via "Export as Word"
- [ ] Calls `POST /api/export/docx`
- [ ] Styling preserved (headings, lists, formatting)
- [ ] HTML content parsed and converted
- [ ] Downloads .docx file

---

## 14. Save & Document Persistence

### Auto-Save
- [ ] Content changes trigger debounced save (2 seconds)
- [ ] Title changes trigger debounced save (1 second)
- [ ] Save status updates in top bar during save lifecycle
- [ ] localStorage backup created on each keystroke via `handleDirty()`

### useStudioDocument Hook
- [ ] Loads document for selected project on mount
- [ ] `studioDoc` object contains full document state
- [ ] `saveStatus` transitions: idle → unsaved → saving → saved/error
- [ ] `lastSavedAt` timestamp updates on successful save
- [ ] `docLoading` shows loading state while fetching
- [ ] `docError` captures error messages
- [ ] Project switching loads different document

### Document Migration
- [ ] `migrateLocalDocuments()` runs on Studio mount
- [ ] Migrates localStorage documents to database
- [ ] Creates default project if none exists
- [ ] Runs silently without UI feedback

---

## 15. Keyboard Shortcuts

| Action | Shortcut | Test |
|--------|----------|------|
| Open Citation Dialog | `Cmd+Shift+C` | [ ] Opens citation modal |
| Toggle Reference Sidebar | `Cmd+Shift+R` | [ ] Toggles sidebar visibility |
| Toggle Research Sidebar | `Cmd+Shift+L` | [ ] Toggles research panel |
| Footnote | `Cmd+Shift+F` | [ ] Inserts footnote |
| Heading 1 | `Cmd+Opt+1` | [ ] Sets heading level 1 |
| Heading 2 | `Cmd+Opt+2` | [ ] Sets heading level 2 |
| Heading 3 | `Cmd+Opt+3` | [ ] Sets heading level 3 |
| Heading 4 | `Cmd+Opt+4` | [ ] Sets heading level 4 |
| Bullet List | `Cmd+Shift+8` | [ ] Toggles bullet list |
| Numbered List | `Cmd+Shift+7` | [ ] Toggles ordered list |
| Checklist | `Cmd+Shift+9` | [ ] Toggles task list |
| Undo | `Ctrl+Z` | [ ] Reverts last change |
| Redo | `Ctrl+Y` | [ ] Re-applies change |

---

## 16. Loading & Error States

### Loading (loading.tsx)
- [ ] Skeleton icon (h-8 w-8 rounded-lg)
- [ ] Skeleton title bar (h-6 w-64)
- [ ] Two skeleton buttons top-right (h-9 w-24)
- [ ] Skeleton toolbar (h-10 full-width)
- [ ] Skeleton editor area (flex-1 rounded-2xl)
- [ ] Pulse animation on all skeletons
- [ ] No layout shift when real content loads

### Error (error.tsx)
- [ ] `ErrorDisplay` component renders
- [ ] Title: "Studio unavailable"
- [ ] Message: "We couldn't load the editor. Your work is safe — please try again."
- [ ] Error details shown
- [ ] "Retry" button triggers `reset()` to re-load page

---

## 17. Quick Test Workflows

### A. Basic Writing Flow
1. [ ] Navigate to `/studio`
2. [ ] Verify editor loads with title input and empty document
3. [ ] Type a document title
4. [ ] Type paragraph text in editor
5. [ ] Apply heading formatting (select text, use slash command `/Heading 1`)
6. [ ] Add a bullet list
7. [ ] Verify save status transitions: unsaved → saving → saved
8. [ ] Refresh page — verify content persists

### B. Draft Mode Intensity
1. [ ] Ensure "Write" mode is active
2. [ ] Click "Focus" — verify AI is passive
3. [ ] Click "Collaborate" — verify AI assists with completions
4. [ ] Click "Accelerate" — verify AI is proactive
5. [ ] Use slash command `/AI Continue Writing` in each mode
6. [ ] Verify AI response matches intensity level

### C. Guide / Learn Mode
1. [ ] Click "Learn" mode toggle
2. [ ] Verify emerald header appears
3. [ ] Select "Original Article" document type
4. [ ] Verify stage tracker shows 6 stages
5. [ ] Click "Understand" stage — ask question in chat
6. [ ] Verify AI uses Socratic method (doesn't write content for you)
7. [ ] Progress through stages: Plan → Outline → Draft → Revise → Polish
8. [ ] Verify AI guidance adapts to each stage

### D. Citation Workflow
1. [ ] Press `Cmd+Shift+C` to open Citation Dialog
2. [ ] Switch to "Paste DOI/PMID" tab
3. [ ] Enter a DOI (e.g., "10.1056/NEJMoa2301234")
4. [ ] Click "Resolve" — verify reference preview appears
5. [ ] Click "Add to References"
6. [ ] Switch to "Your References" tab — verify it appears
7. [ ] Select the reference checkbox
8. [ ] Click "Insert Citation" — verify `[1]` appears in editor
9. [ ] Press `Cmd+Shift+R` — verify Reference Sidebar opens with the citation

### E. Integrity Check
1. [ ] Write text in editor (minimum 50 characters required)
2. [ ] Click "Checks" tab in right panel
3. [ ] Click "Run Integrity Check"
4. [ ] Verify "Analyzing Document..." loading state
5. [ ] Wait for results — verify "Integrity Report" header appears
6. [ ] Verify Human Score gauge displays
7. [ ] Expand AI Detection — verify stats grid
8. [ ] Expand Writing Quality — verify readability grade
9. [ ] Click "Re-run" — verify check re-executes

### F. Slash Commands
1. [ ] Type `/` at start of a new line
2. [ ] Verify command menu appears
3. [ ] Type "heading" — verify filtered results
4. [ ] Select "Heading 2" — verify formatting applied
5. [ ] Type `/` again, select "AI Continue Writing"
6. [ ] Verify AI generates continuation in chat panel
7. [ ] Type `/`, select "Check Integrity"
8. [ ] Verify right panel switches to Checks tab

### G. Export Flow
1. [ ] Write content with headings, lists, and citations
2. [ ] Click "Export" dropdown in top bar
3. [ ] Click "Export as PDF"
4. [ ] Verify PDF downloads with academic formatting
5. [ ] Click "Export" → "Export as Word"
6. [ ] Verify .docx downloads with styling preserved

### H. Project Switching
1. [ ] Create multiple projects (if not existing)
2. [ ] In Studio, use project selector in left sidebar
3. [ ] Select a different project
4. [ ] Verify document title and content change to selected project
5. [ ] Make edits — verify save works for the new project
6. [ ] Switch back — verify original project content intact

### I. Manual Citation Entry
1. [ ] Open Citation Dialog (`Cmd+Shift+C`)
2. [ ] Switch to "Manual Entry" tab
3. [ ] Select Type: "Article"
4. [ ] Fill in Title (required), Authors, Journal, Year
5. [ ] Click "Save Reference"
6. [ ] Verify reference appears in "Your References" tab
7. [ ] Select it and click "Insert Citation"
8. [ ] Verify citation number appears in editor

### J. Error Recovery
1. [ ] Simulate network disconnect
2. [ ] Make edits — verify "Save failed" status appears
3. [ ] Reconnect — verify save recovers automatically
4. [ ] Open Integrity Check — trigger error — verify "Retry" button
5. [ ] Click Retry — verify successful run

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Studio route reads `projectId` and `mode` from URL search params on first render
- [ ] `?mode=learn` opens the page in Learn mode on initial load
- [ ] Without `?mode=learn`, the page defaults to Write mode
- [ ] Left sidebar title input initializes from `docTitle` returned by `useStudioDocument(...)`
- [ ] Title input has no placeholder in the current implementation
- [ ] Typing in the title immediately updates local input state and sets save status to `unsaved`
- [ ] Title saves are debounced by 1 second in `useStudioDocument`
- [ ] Successful title saves set save status to `saved` and refresh `lastSavedAt`
- [ ] Failed title saves set save status to `error` without showing an inline toast
- [ ] Project selector is hidden entirely when the user has 0 or 1 projects
- [ ] Project selector button falls back to `Select project` when no selected project matches
- [ ] Project selector closes when clicking outside because it listens on `mousedown`
- [ ] Selecting the already-active project is a no-op in `selectProject(...)`
- [ ] Selecting a different project clears `initialContent`, clears `document`, resets save status to `idle`, and loads the new project document
- [ ] Initial document load calls `loadStudioDocument(initialProjectId)` once on mount
- [ ] If `loadStudioDocument(...)` returns no document, the editor area shows `Failed to load or create document.`
- [ ] Successful document load sets `docTitle`, `selectedProjectId`, and `initialContent` from the first section with `editor_content`, or falls back to the first section
- [ ] Document loading state shows a spinner plus `Loading document...`
- [ ] Document error state shows a warning icon plus the error string from the hook
- [ ] Save indicator `saving` state uses a spinning `CircleNotch` icon plus `Saving...`
- [ ] Save indicator `saved` state uses `CloudCheck` when status is explicitly `saved`
- [ ] Save indicator `idle` state with `lastSavedAt` uses a `Check` icon and the same `Saved HH:MM` text
- [ ] Save indicator `unsaved` state uses a non-spinning `CircleNotch` icon plus `Unsaved changes`
- [ ] Save indicator `error` state uses a `Warning` icon plus `Save failed`
- [ ] Save indicator shows an empty span when status is idle and there is no `lastSavedAt`
- [ ] Typing inside the editor triggers `handleDirty()` before the debounced DB save fires
- [ ] `handleDirty()` writes a fallback draft into `localStorage` under `scholarsync_studio_draft`
- [ ] Local draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [ ] Local draft write failures are swallowed silently
- [ ] Debounced content saves send `documentId`, `title`, `editor_content`, `plain_text_content`, `word_count`, and optional `sectionId`
- [ ] Successful content saves can set `activeSectionId` if one was not known yet
- [ ] Content-save failures log `Auto-save failed:` to the console and set save status to `error`
- [ ] Left sidebar always shows `Current Draft` as the active nav item and it is not clickable
- [ ] `My Library` nav link points to `/library`
- [ ] `Literature Search` nav link points to `/research`
- [ ] References header count is the full `references.size` from the reference store
- [ ] Plus button in the References section opens the citation dialog and captures the current editor selection first
- [ ] Empty references state text reads `Use Cmd+Shift+C to add citations`
- [ ] References preview list shows only the first 5 cited references sorted by reference number
- [ ] Reference preview cards show `[n]`, truncated title, and first-author family name or `Unknown`
- [ ] `View all X references` appears only when there are more than 5 references
- [ ] Clicking `View all X references` opens the full Reference Sidebar
- [ ] AI Credits bar uses `tokens_used` over `tokens_limit` from `getUserUsageStats()`
- [ ] If usage stats fail to load, the credits bar falls back to `0 / 50000`
- [ ] Write-mode AI intensity header is visible only when `isLearnMode === false`
- [ ] Write-mode intensity options are exactly `Focus`, `Collaborate`, and `Accelerate`
- [ ] Active `Focus` chip uses sky styling, `Collaborate` uses brand styling, and `Accelerate` uses violet styling
- [ ] Inactive intensity chips use muted text with hover color only
- [ ] Write-mode description line below the chips updates to `DRAFT_MODE_DESCRIPTIONS[draftIntensity]`
- [ ] Default draft intensity is `collaborate`
- [ ] Learn-mode header is visible only when `isLearnMode === true`
- [ ] Learn-mode helper text reads `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Guide document-type button defaults to `Select document type`
- [ ] Guide document-type picker closes immediately after selecting a type
- [ ] Stage tracker is hidden until a guide document type has been selected
- [ ] Stage tracker completion styling depends only on array order, not on any persisted progress
- [ ] Guide stages are clickable in non-linear order and simply update local `guideStage`
- [ ] Switching between Write and Learn mode does not clear the current chat transcript
- [ ] Switching between Write and Learn mode changes the outgoing `/api/chat` mode between `draft` and `learn`
- [ ] Chat placeholder reads `Ask your AI research assistant...` in Write mode
- [ ] Chat placeholder reads `Ask me to challenge your thinking...` in Learn mode
- [ ] Chat send button is disabled while loading or when the trimmed input is empty
- [ ] Submitting chat appends the user message locally before the network request starts
- [ ] First successful chat submit creates a conversation through `createConversation(...)`
- [ ] Conversation title is the first 80 characters of the initial prompt
- [ ] User messages are persisted through `addMessage(...)` in the background and failures are ignored
- [ ] Assistant responses stream from `/api/chat` into a placeholder assistant bubble
- [ ] If `/api/chat` returns non-OK, the panel shows `data.error` or `Chat failed`
- [ ] If the response body is missing, chat shows `No response stream`
- [ ] Transport-level chat failures show `Failed to send message. Check your API key.`
- [ ] Assistant loading placeholder uses three bouncing dots inside a brand-tinted bubble
- [ ] Chat panel auto-scrolls to the bottom whenever `messages` changes
- [ ] Chat messages are local component state only and are not reloaded on page refresh
- [ ] `submitAiPrompt(...)` switches to the Chat tab, pre-fills the prompt, then programmatically submits the first `form` in the document after 100 ms
- [ ] Slash-command action `ask` switches to the Chat tab and focuses the chat input without auto-submitting
- [ ] Slash-command action `find-sources` opens the external Research Sidebar and seeds it with up to 200 characters of editor context
- [ ] Slash-command action `integrity-check` only switches the right panel to the `Checks` tab
- [ ] Editor action `show-word-count` posts an assistant chat message with per-section counts and total words
- [ ] Editor action `add-comment` opens the Comment Sidebar if needed and dispatches `scholarsync:new-inline-comment`
- [ ] Comment Sidebar replaces the normal AI panel only when `commentSidebarOpen` is true, `studioDoc.id` exists, and `editorRef.current` is set
- [ ] Reference Sidebar takes precedence over the Comment Sidebar when `sidebarOpen` is true
- [ ] Right-panel tabs are hidden while the Reference Sidebar or Comment Sidebar is taking over that column
- [ ] `Cmd+Shift+R` toggles the Reference Sidebar from anywhere in the page
- [ ] `Cmd+Shift+C` support depends on the editor emitting `scholarsync:open-citation-dialog`; the page listens for that window event
- [ ] Citation dialog opening stores the current editor selection in `citationSelectionRef`
- [ ] Inserted citations restore the saved selection before inserting the citation node
- [ ] Inserted citation nodes receive only `referenceIds` in their attrs payload
- [ ] After citation insertion, the page ensures a `bibliography` node exists at the end of the document
- [ ] Citation-insert success notice reads `Citation inserted` for one reference
- [ ] Citation-insert success notice reads `{N} citations inserted` for multiple references
- [ ] Citation success notice auto-clears after 2.5 seconds
- [ ] Citation notice timer is cleared on unmount
- [ ] `scholarsync:insert-citation` events from Research create a synthetic reference ID using DOI, PMID, or a slugified title
- [ ] Research-generated citations are inserted directly into the editor after being added to the reference store
- [ ] Export dropdown opens and closes from the `showExport` local state only
- [ ] Export dropdown does not implement outside-click dismissal in the current page component
- [ ] Clicking any export option closes the dropdown before making the export request
- [ ] PDF export posts `{ title, content }` to `/api/export/pdf`
- [ ] Successful PDF export opens a new browser window and writes returned HTML into it; it does not trigger a file download directly
- [ ] PDF export is a no-op when `.ProseMirror` content is empty
- [ ] PDF export failures log `PDF export failed:` to the console with no inline error
- [ ] Word export posts `{ title, content }` to `/api/export/docx`
- [ ] Word export filename is sanitized from `docTitle` by replacing non-alphanumeric characters with `_`
- [ ] Word export currently downloads with a `.doc` extension, not `.docx`
- [ ] Word export is a no-op when `.ProseMirror` content is empty
- [ ] Word export failures log `DOCX export failed:` to the console with no inline error
- [ ] Research tab in the right panel is a launcher, not an embedded search-results UI
- [ ] Research tab primary CTA reads `Open Literature Research Panel`
- [ ] Research tab keyboard shortcut hint shows `Cmd+Shift+L`
- [ ] Research quick-search input placeholder reads `Quick search PubMed...`
- [ ] Clicking `Search` in the Research tab only acts when the trimmed query is non-empty
- [ ] Research quick search sets store query, opens the external Research Sidebar, and activates its `search` tab
- [ ] Checks tab mounts `IntegrityPanel` with `getEditorText={() => editorRef.current?.getText() ?? ""}`
- [ ] IntegrityPanel idle state heading reads `Integrity Check`
- [ ] IntegrityPanel idle CTA reads `Run Integrity Check`
- [ ] IntegrityPanel idle helper text promises AI detection, plagiarism, and citation verification
- [ ] IntegrityPanel running state heading reads `Analyzing Document...`
- [ ] IntegrityPanel error state shows a `Retry` button that reruns the same check
- [ ] IntegrityPanel rejects editor text shorter than 50 characters with `Document must have at least 50 characters to check.`
- [ ] IntegrityPanel trims editor text to 50,000 characters before sending it to `/api/integrity-check`
- [ ] IntegrityPanel passes no `sources` prop in the current Studio page, so source-aware integrity checking is not wired here
- [ ] IntegrityPanel free-tier warning reads `Free tier — AI detection only. Upgrade for plagiarism scanning and citation verification.`
- [ ] IntegrityPanel sections default to expanded for `ai`, `plagiarism`, `citations`, and `quality`
- [ ] Locked IntegrityPanel sections show `Available on paid plans` and `Upgrade to unlock →`
- [ ] IntegrityPanel `Re-run` action is available from the results header and does not reset expanded-section state
- [ ] Route-level `loading.tsx` renders header, action-button, top-bar, and main-content skeletons
- [ ] Route-level error boundary title reads `Studio unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the editor. Your work is safe — please try again.`

### Actual Current Behavior Corrections
- [ ] The title field does not show a placeholder when empty in the current implementation.
- [ ] Write/Learn mode does not persist across refreshes unless the URL includes `?mode=learn`.
- [ ] Export dropdown does not currently close when clicking outside it.
- [ ] The right-panel `Research` tab does not render inline search results; it only launches the external Research Sidebar.
- [ ] The right-panel `Checks` tab renders the compact `IntegrityPanel`, not the full `/compliance` page UI.
- [ ] PDF export does not directly download a PDF file from the Studio page; it opens returned HTML in a new window.
- [ ] Word export currently downloads a `.doc` file, not a `.docx` file.
- [ ] Chat history is not restored on refresh in the current Studio route.

---

## Re-Audit Discoveries (Claude Code Pass 2)

> These checks were found by line-by-line source audit of every file in the studio
> import tree. Each assertion is verified against the source code listed.

### Page Architecture (`src/app/(app)/studio/page.tsx`)
- [ ] `StudioPage` default export wraps `StudioContent` in `<Suspense>` with no fallback prop — renders empty fragment during SSR hydration
- [ ] Left sidebar actual width is `w-64` (Tailwind 16rem = 256px), not 264px as stated in section 1
- [ ] Editor center column constrained to `max-w-[720px] mx-auto` on the `TiptapEditor` wrapper
- [ ] `ResearchSidebar` component is rendered between `<main>` and the right-panel conditional — it is not inside the right column
- [ ] Citation notice renders in the status bar area (between save indicator and export) as `text-[10px] font-medium text-emerald-500`
- [ ] `requestAnimationFrame` wraps the entire citation insertion logic to ensure modal overlay is removed from DOM before focusing the editor
- [ ] PDF export silently returns when `/api/export/pdf` responds non-OK (no error UI, no console log on non-OK)
- [ ] Word export silently returns when `/api/export/docx` responds non-OK (no error UI, no console log on non-OK)
- [ ] Word export creates a temporary `<a>` element, appends it to `document.body`, triggers `.click()`, removes the element, and revokes the object URL
- [ ] `getEditorContent()` reads HTML from `document.querySelector(".ProseMirror")?.innerHTML` — returns empty string if no `.ProseMirror` element exists
- [ ] Content-change save does NOT transition through `unsaved` — goes directly from current status to `saving` when debounce fires (only title changes go through `unsaved`)

### Keyboard Shortcuts Dialog (`src/components/editor/KeyboardShortcutsDialog.tsx`)
- [ ] Question mark (`?`) button in the status bar (between save indicator and export dropdown) opens `KeyboardShortcutsDialog`
- [ ] Question button styled: `w-8 h-8 rounded-lg text-ink-muted hover:text-ink bg-surface-raised hover:bg-surface-raised/80 border border-border`
- [ ] Dialog renders as fixed full-screen overlay with `bg-black/50` backdrop at `z-50`
- [ ] Clicking the backdrop overlay dismisses the dialog (`onClick={onClose}` on wrapper)
- [ ] Dialog content stops propagation (`e.stopPropagation()`) to prevent backdrop dismiss when clicking inside
- [ ] Dialog header: `Keyboard` icon (20px, `text-brand`) + title text `Keyboard Shortcuts` (text-lg font-semibold)
- [ ] Dialog close button: `X` icon (20px) in top-right of header
- [ ] Dialog max width: `max-w-2xl`, max height: `max-h-[80vh]`, overflow hidden on outer, scrollable content area
- [ ] Dialog has 4 shortcut categories displayed in order: `Formatting`, `Structure`, `Academic`, `Tools`
- [ ] "Formatting" category lists 8 shortcuts: Bold `Cmd+B`, Italic `Cmd+I`, Underline `Cmd+U`, Strikethrough `Cmd+Shift+X`, Highlight `Cmd+Shift+H`, Superscript `Cmd+Shift+.`, Subscript `Cmd+Shift+,`, Inline Code `Cmd+E`
- [ ] "Structure" category lists 8 shortcuts: Heading 1–4 `Cmd+Shift+1-4`, Bullet List `Cmd+Shift+8`, Ordered List `Cmd+Shift+7`, Blockquote `Cmd+Shift+B`, Horizontal Rule `Cmd+Shift+Enter`
- [ ] "Academic" category lists 3 shortcuts: Insert Citation `Cmd+Shift+C`, Insert Footnote `Cmd+Shift+F`, Insert Link `Cmd+Shift+K`
- [ ] "Tools" category lists 5 shortcuts: Undo `Cmd+Z`, Redo `Cmd+Shift+Z`, Save `Cmd+S`, Toggle Comments `Cmd+/`, Slash Commands `/`
- [ ] Shortcuts displayed in 2-column grid (`grid-cols-2 gap-2`) within each category
- [ ] Each shortcut row shows description text on left and key pills on right (`px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded`)
- [ ] Category headers styled as uppercase tracking-wider text-xs font-semibold text-ink-muted

### TiptapEditor Extensions (`src/components/editor/tiptap-editor.tsx`)
- [ ] StarterKit configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — supports 6 heading levels, not 4
- [ ] Highlight extension configured with `multicolor: true`
- [ ] TextAlign extension configured for types `["heading", "paragraph"]`
- [ ] TextStyle, Color, and FontFamily extensions loaded — enabling inline color and font changes
- [ ] Link extension configured: `openOnClick: false`, `autolink: true`, `linkOnPaste: true`
- [ ] Table extension configured: `resizable: true`, HTMLAttributes class `academic-table`
- [ ] Image extension configured: `inline: false`, `allowBase64: true`
- [ ] TaskItem extension configured: `nested: true` — supports nested task lists
- [ ] Placeholder text reads `Start typing or press '/' for AI commands...`
- [ ] CharacterCount and Typography extensions loaded
- [ ] `immediatelyRender: false` set on `useEditor` — prevents server-side rendering mismatch
- [ ] Editor editorProps attributes class: `academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4`
- [ ] Editor `spellcheck` attribute set to `"true"`
- [ ] `Cmd+S` key handler in editorProps calls `flushSave(view.state.doc)` — saves immediately bypassing debounce timer
- [ ] `flushSave` extracts content via `doc.toJSON()`, plain text via `doc.textBetween(0, doc.content.size, "\n")`, and word count via `getDocumentWordCount(doc)`
- [ ] Editor renders sub-components: `Toolbar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, `EditorContent`, `FootnoteSection`
- [ ] `SelectionToolbar` and `LinkPopover` and `DocumentOutline` only render when `editor` is truthy
- [ ] OutlinePlugin configured with `debounceMs: 500`
- [ ] Initial outline computed 300ms after editor ready — heading list only shown if ≥2 headings exist (otherwise outline set to empty)
- [ ] `contentKey` change triggers `editor.commands.setContent(content)` or `editor.commands.clearContent()` for project switching
- [ ] Debounced save timer cleaned up on unmount via `useEffect` cleanup
- [ ] Custom `CitationNumbering` extension wraps `createCitationPlugin()` as a ProseMirror plugin

### Keyboard Shortcuts — AcademicKeyboardShortcuts (`src/components/editor/extensions/keyboard-shortcuts.ts`)
- [ ] `Cmd+Shift+X` toggles strikethrough
- [ ] `Cmd+Shift+H` toggles highlight
- [ ] `Cmd+Shift+K` inserts link — prompts URL via `window.prompt("Enter URL:")`
- [ ] `Cmd+Shift+.` toggles superscript
- [ ] `Cmd+Shift+,` toggles subscript
- [ ] `Cmd+Shift+F` inserts footnote — prompts text via `window.prompt("Footnote text:")`
- [ ] `Cmd+/` toggles Comment Sidebar — dispatches `scholarsync:editor-action` with `action: "toggle-comment-sidebar"`
- [ ] `Cmd+S` forces immediate save (handled in editorProps, not in this extension)
- [ ] `Cmd+Shift+Z` is the redo shortcut (from StarterKit), not `Ctrl+Y` as listed in section 15
- [ ] `Cmd+Shift+Enter` inserts horizontal rule
- [ ] Heading shortcuts in the extension use `Mod-Shift-1` through `Mod-Shift-4` (i.e., `Cmd+Shift+1-4`), not `Cmd+Opt+1-4`
- [ ] `Cmd+Shift+C` in the extension dispatches `scholarsync:editor-action` with `action: "insert-citation"` — however the page's `scholarsync:editor-action` listener does NOT handle `insert-citation`, only `show-word-count`, `add-comment`, and `toggle-comment-sidebar`
- [ ] `Cmd+Shift+R` in the extension dispatches `scholarsync:editor-action` with `action: "toggle-reference-sidebar"` — the page has a separate `document.addEventListener("keydown")` handler for `Cmd+Shift+R` which calls `toggleSidebar()`

### Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)
- [ ] 19 total slash commands defined in `structuralCommands` array
- [ ] Slash trigger character `/` is allowed at start of parent block (parentOffset === 0) or after a space or newline
- [ ] Slash command "Text": description "Plain paragraph text", icon `paragraph`, category `basic`
- [ ] Slash command "Heading 4": description "Sub-subsections", icon `h4`, shortcut label `Cmd+Opt+4`, category `basic`
- [ ] Slash command "Checklist": description "Task checklist", icon `checklist`, shortcut label `Cmd+Shift+9`, category `basic`, calls `toggleTaskList()`
- [ ] Slash command "Code Block": description "For statistical code", icon `code`, category `basic`, calls `toggleCodeBlock()`
- [ ] Slash command "Table": description "Insert data table", icon `table`, category `academic`, inserts `{ rows: 3, cols: 3, withHeaderRow: true }` and applies `academic-table` class via `requestAnimationFrame`
- [ ] Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`
- [ ] Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `
- [ ] Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"
- [ ] Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"
- [ ] Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`
- [ ] Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`
- [ ] Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`
- [ ] Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`
- [ ] Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`
- [ ] Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context
- [ ] Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`
- [ ] `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching

### Slash Menu UI (`src/components/editor/SlashMenu.tsx`)
- [ ] Empty filter results render "No commands found" text centered in `py-4`
- [ ] Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)
- [ ] Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`
- [ ] Category header shown only when category changes between adjacent items (not repeated per item)
- [ ] Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])
- [ ] AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`
- [ ] Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`
- [ ] Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`
- [ ] Escape key in slash menu hides the tippy popup
- [ ] Arrow Up/Down wraps around (modular arithmetic on index)

### AI Action Handlers — page.tsx event switch
- [ ] `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`
- [ ] `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`
- [ ] `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`
- [ ] `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`
- [ ] `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`

### Chat API Route (`src/app/api/chat/route.ts`)
- [ ] Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars
- [ ] Auth failure returns 401 with `{ error: "Authentication required." }`
- [ ] Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`
- [ ] AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`
- [ ] Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`
- [ ] Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing
- [ ] When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
- [ ] Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`
- [ ] `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
- [ ] `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
- [ ] AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`

### Chat Panel Rendering Details
- [ ] User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`
- [ ] Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`
- [ ] During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map
- [ ] After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty
- [ ] Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown
- [ ] User messages styled: `bg-surface-raised text-ink`, max-width 85%
- [ ] Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%
- [ ] Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`
- [ ] Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)
- [ ] Loading placeholder Sparkle icon uses `animate-spin` class
- [ ] Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms
- [ ] Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`
- [ ] Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`
- [ ] Chat input has `focus:ring-2 focus:ring-brand/40` focus ring
- [ ] `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission

### Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)
- [ ] Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`
- [ ] Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)
- [ ] Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`
- [ ] Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`
- [ ] Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)
- [ ] Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`
- [ ] Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"
- [ ] Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]
- [ ] Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic
- [ ] Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)
- [ ] Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp
- [ ] Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)
- [ ] Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container
- [ ] Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)
- [ ] Resolve/Unresolve only shown on top-level comments, not replies
- [ ] Reply button only shown on top-level comments
- [ ] Reply input placeholder: `Write a reply...`
- [ ] Replies indented with `ml-4`
- [ ] Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline
- [ ] Comments stored via `document-comments-local` localStorage functions — NOT database API
- [ ] Comment user ID is hardcoded as `"local-user"`
- [ ] Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view
- [ ] New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === "new-inline"`)

### Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)
- [ ] `toCitationAuthors`: empty or whitespace-only author string maps to `{ family: "Unknown", given: "" }`
- [ ] `toCitationAuthors`: author with comma (e.g. "Smith, John") splits on first comma — first part is family, second is given
- [ ] `toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given
- [ ] `toCitationAuthors`: single-word author name maps to `{ family: name, given: "" }`
- [ ] `buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, "-")`)
- [ ] Research reference sets `type: "article"`, CSL type `"article-journal"`, and `year` defaults to `0` when missing

### useStudioDocument Hook (`src/hooks/use-studio-document.ts`)
- [ ] Default document title initialized as `"Untitled Document"`
- [ ] Document load failure without doc: error set to `"Failed to load or create document."`
- [ ] Document load network error: error set to `"Failed to load document. Please try again."` and logged as `"Failed to load document:"` to console
- [ ] After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`
- [ ] Title save timer cleaned up on unmount via `useEffect` cleanup

### Guide Types (`src/types/guide.ts`)
- [ ] `REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `["CARE"]`, `original_article` → `["CONSORT", "STROBE", "STARD", "TRIPOD"]`, `review_article` → `["PRISMA", "Narrative review best practices"]`, `meta_analysis` → `["PRISMA 2020", "Cochrane Handbook"]`
- [ ] `book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays

### Draft Types (`src/types/draft.ts`)
- [ ] `PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`
- [ ] `ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings

### Behavior Corrections (Pass 2)

- [ ] **Section 1 check "264px"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.
- [ ] **Section 6 check "Heading levels 1–4"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.
- [ ] **Section 8 check "Messages render markdown content"**: Messages are rendered as **plain text** inside `<p className="whitespace-pre-wrap">`, not as rendered markdown.
- [ ] **Section 15 checks "Cmd+Opt+1-4" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show "Cmd+Opt+1-4" but the actual keyboard bindings are Cmd+Shift.
- [ ] **Section 15 check "Redo Ctrl+Y"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.
- [ ] **Section 7 "AI Summarize Selection"**: This is **NOT a slash command**. No entry named "AI Summarize Selection" or "Summarize" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.
- [ ] **Section 7 "Find Sources"**: This is **NOT a slash command**. No entry named "Find Sources" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.
- [ ] **Section 7 "Check Integrity"**: This is **NOT a slash command**. No entry named "Check Integrity" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.
- [ ] **Section 7 "Add Citation"**: The actual slash command title is **"Cite"**, not "Add Citation".
- [ ] **Section 7 "AI Continue Writing"**: The actual slash command title is **"Continue Writing"**, not "AI Continue Writing".
- [ ] **Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.
- [ ] **Check #767 "no sources prop"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.
- [ ] **Check #730 "Cmd+Shift+C emits scholarsync:open-citation-dialog"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: "insert-citation"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command "Cite" dispatches `scholarsync:open-citation-dialog`.

### Components Referenced But Not Rendered
- `SelectionToolbar` — rendered inside TiptapEditor; may dispatch `summarize`, `find-sources`, `precision-edit`, `integrity-check` AI actions, but these are NOT slash commands
- `LinkPopover` — rendered inside TiptapEditor; handles link editing hover UI
- `DocumentOutline` — rendered inside TiptapEditor; displays heading outline in sidebar
- `FootnoteSection` — rendered inside TiptapEditor; displays footnote references at bottom of editor
- `Toolbar` — rendered inside TiptapEditor; the main formatting toolbar above the editor

*Generated from source code in `src/app/(app)/studio/`, `src/components/integrity/`, `src/components/citations/`, and related modules — March 2026*
