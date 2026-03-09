# ScholarSync Editor Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Editor (`/editor/[id]`) and Studio (`/studio`) pages.
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Document Header & Metadata](#2-document-header--metadata)
3. [Editor Modes](#3-editor-modes)
4. [Text Formatting](#4-text-formatting)
5. [Structural Blocks (via Slash Commands)](#5-structural-blocks-via-slash-commands)
6. [Academic Blocks (via Slash Commands)](#6-academic-blocks-via-slash-commands)
7. [AI Slash Commands](#7-ai-slash-commands)
8. [Document Tools (via Slash Commands)](#8-document-tools-via-slash-commands)
9. [Floating Selection Toolbar](#9-floating-selection-toolbar)
10. [Link Management](#10-link-management)
11. [Citation System](#11-citation-system)
12. [Reference Sidebar](#12-reference-sidebar)
13. [Bibliography](#13-bibliography)
14. [Footnotes](#14-footnotes)
15. [Document Outline](#15-document-outline)
16. [Comments System](#16-comments-system)
17. [Version History (Editor page only)](#17-version-history-editor-page-only)
18. [Export](#18-export)
19. [Save System](#19-save-system)
20. [Top Bar (Editor page)](#20-top-bar-editor-page)
21. [AI Chat Panel (Studio page)](#21-ai-chat-panel-studio-page)
22. [Write Mode — AI Intensity (Studio page)](#22-write-mode--ai-intensity-studio-page)
23. [Learn Mode — Guide Mode (Studio page)](#23-learn-mode--guide-mode-studio-page)
24. [Research Sidebar (Studio page)](#24-research-sidebar-studio-page)
25. [Integrity Panel (Studio page)](#25-integrity-panel-studio-page)
26. [Left Sidebar (Studio page)](#26-left-sidebar-studio-page)
27. [Keyboard Shortcuts — Complete Reference](#27-keyboard-shortcuts--complete-reference)
28. [Markdown Input Rules](#28-markdown-input-rules)
29. [Error Handling & Edge Cases](#29-error-handling--edge-cases)

---

## 1. Page Overview

There are **two** editor page variants that share the same core Tiptap editor:

| Page | Route | Editor Component | Key Differences |
|------|-------|-----------------|-----------------|
| **Editor** | `/editor/[id]` | `AcademicEditor` | Full academic editor with TopBar, document outline, comments, version history, export dialog |
| **Studio** | `/studio` | `TiptapEditor` (lighter) | AI chat panel, research sidebar, integrity checks, write/learn modes, project selector |

---

## 2. Document Header & Metadata

### Editor Page (`/editor/[id]`)
- [ ] **Editable document title** — click the title input field, type to rename (debounced 1s save)
- [ ] **Back button** — arrow left navigates to `/dashboard`
- [ ] **Document type selector** — dropdown with 4 options:
  - Original Article
  - Case Report
  - Review Article
  - Meta-Analysis
- [ ] **Pending citation notice** — blue banner appears when a paper was saved from another page (reads from `sessionStorage`)

### Studio Page (`/studio`)
- [ ] **Editable document title** — in the left sidebar header
- [ ] **Project selector dropdown** — appears when user has multiple projects, allows switching between them
- [ ] **URL parameter support** — `?projectId=X` pre-selects a project, `?mode=learn` starts in learn mode

---

## 3. Editor Modes

### Editor Page
- [ ] **Editing mode** — full editing, described as "Direct changes to document"
- [ ] **Viewing mode** — read-only, editor becomes non-editable, described as "Read-only, no edits"
- [ ] Mode toggle dropdown in TopBar shows icon + label + description for each mode

### Studio Page
- [ ] **Write mode** — AI drafting assistance, shows AI Intensity bar
- [ ] **Learn mode** — guided educational mode, AI teaches instead of writing for you

---

## 4. Text Formatting

All formatting available via keyboard shortcuts and/or the floating selection toolbar:

| Feature | Shortcut | Test |
|---------|----------|------|
| **Bold** | `Cmd+B` | [ ] Apply, toggle off, verify visually |
| **Italic** | `Cmd+I` | [ ] Apply, toggle off |
| **Underline** | `Cmd+U` | [ ] Apply, toggle off |
| **Strikethrough** | `Cmd+Shift+X` | [ ] Apply, toggle off |
| **Highlight** | `Cmd+Shift+H` | [ ] Default highlight toggles on/off |
| **Highlight colors** | Right-click highlight button | [ ] 5 colors: Yellow (#fef08a), Green (#bbf7d0), Blue (#bfdbfe), Pink (#fecdd3), Orange (#fed7aa) |
| **Superscript** | `Cmd+Shift+.` | [ ] Toggle on/off |
| **Subscript** | `Cmd+Shift+,` | [ ] Toggle on/off |
| **Inline code** | `Cmd+E` | [ ] Toggle on/off |
| **Text color** | (via extension) | [ ] Color extension is loaded |
| **Font family** | (via extension) | [ ] FontFamily extension is loaded |
| **Text alignment** | (via extension) | [ ] Left, center, right, justify on headings & paragraphs |

---

## 5. Structural Blocks (via Slash Commands)

Type `/` at the start of a line or after a space to open the slash command menu.

| Command | Description | Shortcut | Test |
|---------|-------------|----------|------|
| **Text** | Plain paragraph | — | [ ] Inserts normal paragraph |
| **Heading 1** | Manuscript title | `Cmd+Shift+1` | [ ] Toggles H1 |
| **Heading 2** | IMRAD sections | `Cmd+Shift+2` | [ ] Toggles H2 |
| **Heading 3** | Subsections | `Cmd+Shift+3` | [ ] Toggles H3 |
| **Heading 4** | Sub-subsections | `Cmd+Shift+4` | [ ] Toggles H4 |
| **Bullet List** | Unordered list | `Cmd+Shift+8` | [ ] Toggles bullet list |
| **Numbered List** | Ordered list | `Cmd+Shift+7` | [ ] Toggles numbered list |
| **Checklist** | Task checklist | `Cmd+Shift+9` | [ ] Toggles task list with checkboxes |
| **Block Quote** | Quote text | `Cmd+Shift+B` (StarterKit) | [ ] Toggles blockquote |
| **Divider** | Horizontal rule | `Cmd+Shift+Enter` | [ ] Inserts `<hr>` |
| **Code Block** | For statistical code | — | [ ] Toggles code block |

### Slash Menu UX
- [ ] Menu appears when typing `/` at start of block or after whitespace
- [ ] **Fuzzy search filtering** — typing after `/` filters commands by title, description, or category
- [ ] **Keyboard navigation** — Arrow Up/Down to navigate, Enter to select, Escape to close
- [ ] **Category headers** — commands grouped under Basic, Academic, AI, Tools
- [ ] Menu shows icon + title + description for each command
- [ ] "No commands" empty state when filter yields no results

---

## 6. Academic Blocks (via Slash Commands)

| Command | Description | Test |
|---------|-------------|------|
| **Table** | Insert 3x3 table with header row | [ ] Creates resizable table |
| **Image** | Upload and insert image | [ ] File picker opens, image inserted as base64 |
| **Abstract** | Structured abstract template | [ ] Inserts H2 "Abstract" + Background/Methods/Results/Conclusion paragraphs |
| **Figure Caption** | Auto-numbered figure caption | [ ] Inserts "**Figure N.** Caption text here" with correct auto-count |
| **Table Caption** | Auto-numbered table caption | [ ] Inserts "**Table N.** Caption text here" with correct auto-count |
| **Footnote** | Add footnote reference | [ ] Prompts for text, inserts superscript footnote marker |

### Table Features
- [ ] Tables are **resizable** (drag column borders)
- [ ] First row renders as header
- [ ] Tables have CSS class `academic-table`

---

## 7. AI Slash Commands

These dispatch custom events that are handled by the Studio page's AI integration:

| Command | Event Dispatched | Test |
|---------|-----------------|------|
| **Continue Writing** | `scholarsync:ai-action` → `continue` | [ ] Sends document text to AI chat for continuation |
| **Outline Section** | `scholarsync:ai-action` → `outline-section` | [ ] Requests AI to generate bullet outline |
| **Check Guidelines** | `scholarsync:ai-action` → `check-guidelines` | [ ] Requests reporting guideline check |
| **Ask AI** | `scholarsync:ai-action` → `ask` | [ ] Opens AI chat for question |

> **Note**: These commands only work in the Studio page where the event listeners are set up. On the Editor page, these events are not listened to.

---

## 8. Document Tools (via Slash Commands)

| Command | Event Dispatched | Test |
|---------|-----------------|------|
| **Word Count** | `scholarsync:editor-action` → `show-word-count` | [ ] Shows section-by-section word count breakdown |

---

## 9. Floating Selection Toolbar

Appears when text is selected in the editor.

- [ ] **Positioning** — toolbar appears above the selection, centered horizontally
- [ ] **Auto-hide** — disappears when selection is cleared or editor loses focus (150ms delay for button clicks)

### Toolbar Buttons (left to right)

| Button | Action | Test |
|--------|--------|------|
| **Style dropdown** | Normal text, Heading 1-4 | [ ] Changes block style, shows current style name |
| **Bold** (B) | Toggle bold | [ ] Active state highlighted when text is bold |
| **Italic** (I) | Toggle italic | [ ] Active state |
| **Underline** (U) | Toggle underline | [ ] Active state |
| **Strikethrough** (S) | Toggle strike | [ ] Active state |
| **Link** | Insert/edit link | [ ] Prompts for URL, can clear to remove link |
| **Code** | Toggle inline code | [ ] Active state |
| **Highlight** | Toggle highlight (click) / color picker (right-click) | [ ] Click toggles default, right-click opens 5-color palette |
| **Comment** | Add inline comment | [ ] Dispatches `add-comment` event, opens comment sidebar |
| **AI Edit** (sparkle) | Precision edit | [ ] Dispatches `precision-edit` AI action with selected text |

---

## 10. Link Management

### Link Insertion
- [ ] **Cmd+Shift+K** — prompts for URL via `window.prompt`
- [ ] **Selection toolbar link button** — prompts for URL, pre-fills with existing link URL
- [ ] **Auto-linking** — URLs pasted or typed are auto-detected (`autolink: true`)
- [ ] **Link on paste** — pasting a URL over selected text creates a link (`linkOnPaste: true`)
- [ ] Links do NOT open on click in the editor (`openOnClick: false`)

### LinkPopover (Editor page only)
- [ ] Clicking a link shows a floating popover with:
  - Link URL display
  - Edit button (inline text input for URL)
  - Open in new tab button
  - Remove link button
- [ ] Enter key confirms edit, Escape cancels
- [ ] Popover positions above the clicked link

---

## 11. Citation System

### Citation Dialog
- [ ] **Opens via** `Cmd+Shift+C` keyboard shortcut
- [ ] **Opens via** slash command (if available)
- [ ] **Opens via** "+" button in Studio left sidebar references section
- [ ] **Opens via** reference sidebar "Add" button

#### Citation Dialog Tabs
- [ ] **Search** — PubMed/scholarly database full-text search
- [ ] **Library** — browse papers already in user's library
- [ ] **DOI** — paste a DOI to resolve and preview
- [ ] **Manual** — manual citation entry form

#### Citation Dialog UX
- [ ] Multi-select — can select multiple references at once
- [ ] Selected count displayed
- [ ] Keyboard navigation (arrow keys, Enter)
- [ ] Escape to close
- [ ] Insert button adds citation node(s) to editor at cursor position

### Citation Node (inline)
- [ ] Appears as a chip/badge in the text (e.g., `[1]` or `[1,2,3]`)
- [ ] **Hover tooltip** — shows reference details
- [ ] **Click popover** — shows citation details and management options
  - [ ] Remove individual reference from a multi-citation
  - [ ] Delete entire citation
- [ ] Citation numbering follows **document order** (Vancouver numeric style)
- [ ] Citation numbers update automatically when citations are reordered

### Citation Insertion Flow (Studio page)
- [ ] Cursor position is saved before dialog opens
- [ ] After inserting, editor refocuses at saved position
- [ ] Citation notice appears briefly: "Citation inserted" or "N citations inserted" (2.5s auto-dismiss)
- [ ] Bibliography node is auto-inserted at document end if not already present

---

## 12. Reference Sidebar

- [ ] **Opens via** `Cmd+Shift+R` keyboard shortcut
- [ ] **Opens via** TopBar reference badge button (Editor page)
- [ ] **Opens via** "View all N references" link (Studio left sidebar)

### Features
- [ ] **Cited vs uncited** — references separated into groups
- [ ] **Sort modes** — by number, author, year, date added
- [ ] **Filter/search** — by title, author, journal
- [ ] **Reference count** displayed in header
- [ ] **Add reference** button → opens citation dialog
- [ ] **Delete reference** — with confirmation
- [ ] **DOI copy** — copy DOI to clipboard
- [ ] **Expand/collapse** — click to see full reference details
- [ ] **Close button** — closes the sidebar

---

## 13. Bibliography

- [ ] `BibliographyNode` auto-inserted at document end when first citation is added
- [ ] Renders formatted reference list from the reference store
- [ ] Only one bibliography block allowed per document (prevents duplicates)
- [ ] Non-editable block — users cannot type inside it
- [ ] Updates reactively when citations are added/removed

---

## 14. Footnotes

- [ ] **Insert via** `Cmd+Shift+F` — prompts for footnote text via `window.prompt`
- [ ] **Insert via** slash command "Footnote"
- [ ] Footnote appears as **superscript number** in the text
- [ ] **Hover tooltip** — shows footnote content
- [ ] **Footnote editor** — inline editing of footnote text (via FootnoteView)
- [ ] **Delete footnote** button in footnote view
- [ ] **Auto-renumbering** — ProseMirror plugin renumbers footnotes when they change order
- [ ] **FootnoteSection** — renders all footnotes at the bottom of the editor area

---

## 15. Document Outline

Appears as a floating panel on the right side of the editor (Editor page only).

- [ ] **Toggle** — click the List icon to expand, X to collapse
- [ ] **Auto-show on hover** — expands when mouse enters the area
- [ ] **Minimum headings** — only appears when document has 2+ headings
- [ ] **Heading hierarchy** — H1-H4 with proper indentation
- [ ] **Active section highlighting** — current section has brand-colored left border
- [ ] **Click to scroll** — clicking a heading scrolls to it and positions cursor
- [ ] **Word count per section** — appears on hover for each heading
- [ ] **Missing IMRAD section warnings** — amber warnings for missing: Introduction, Methods, Results, Discussion, Conclusion, References
- [ ] **Total word count** — displayed in footer

---

## 16. Comments System

### Adding Comments (Editor page only)
- [ ] **Selection toolbar comment button** — select text, click comment icon
- [ ] **Cmd+/** — toggles comment sidebar open/closed
- [ ] Inline comments capture the **quoted text** from selection

### Comment Sidebar
- [ ] **Filter modes** — All, Unresolved, Resolved
- [ ] **Unresolved count badge** — amber badge in header
- [ ] **Empty state** — "No comments yet" message with instructions

### Comment Thread Features
- [ ] **Comment bubble** — shows user avatar initial, username, relative timestamp
- [ ] **Quoted text** — clickable, scrolls to the commented section in the editor
- [ ] **Reply** — reply button opens inline reply input, Enter to submit
- [ ] **Resolve/Unresolve** — toggle button (green checkmark / amber unresolve)
- [ ] **Delete** — red delete button, only visible for owner comments
- [ ] **Resolved styling** — resolved comments have strikethrough text and reduced opacity
- [ ] **Resolved badge** — "Resolved" pill on resolved comments
- [ ] **Comments stored in localStorage** — per document ID

### New Comment Input
- [ ] Input at bottom of sidebar for general document comments
- [ ] **Inline comment mode** — when triggered from selection toolbar, shows quoted text preview at top
- [ ] Enter to submit, Cancel button available in inline mode

---

## 17. Version History (Editor page only)

- [ ] **Open** — click "Version History" button in header bar
- [ ] **Panel** — slides in from right side, 384px wide, z-50 overlay

### Features
- [ ] **Save Current Version** — button at top, prompts for version name (e.g., "Before methods rewrite")
- [ ] **Version list** — shows all versions with:
  - Name (or "Auto-save" / "Manual save")
  - Filled circle (●) for manual saves, empty circle (○) for auto-saves
  - Relative timestamp (just now, Xm ago, Xh ago, date)
- [ ] **Preview** — button opens modal showing version content (JSON)
- [ ] **Restore** — confirmation dialog ("Your current content will be saved as a version first"), then restores content to editor
- [ ] **Loading state** — spinner while fetching versions
- [ ] **Empty state** — "No versions yet" message
- [ ] **Close** — X button in header

---

## 18. Export

### Editor Page — Export Dialog
- [ ] **Open** — click "Export" button in header bar
- [ ] **Format selection** — DOCX or PDF, visual toggle buttons with icons
- [ ] **Options**:
  - [ ] Double-spaced toggle (default: on)
  - [ ] Include page numbers toggle (default: on)
- [ ] **DOCX export** — uses `tiptapToDocx()` converter, downloads `.docx` file
  - [ ] Includes references from reference store
  - [ ] Includes bibliography entries
  - [ ] Preserves formatting
- [ ] **PDF export** — uses browser `window.print()`
- [ ] **Cancel** button closes dialog
- [ ] **Exporting...** disabled state during export

### Studio Page — Export Dropdown
- [ ] **Export as PDF** — POST to `/api/export/pdf`, opens rendered HTML in new window
- [ ] **Export as Word** — POST to `/api/export/docx`, downloads `.doc` file
- [ ] Dropdown closes after selecting an option

---

## 19. Save System

### Auto-save
- [ ] **Debounced save** — content saved 2 seconds after last keystroke (configurable via `debounceMs`)
- [ ] **Word count updates immediately** on every keystroke
- [ ] **Cmd+S** — flushes pending save immediately (cancels debounce timer, saves now)
- [ ] Cmd+S prevents default browser save dialog

### Save Status Indicators

#### Editor Page (TopBar)
- [ ] **Saving** — pulsing cloud icon + "Saving..."
- [ ] **Saved** — green check + "Saved HH:MM" (refreshes every 30 seconds)
- [ ] **Unsaved** — amber cloud icon + "Unsaved"
- [ ] **Offline** — red wifi-off icon + "Offline"

#### Studio Page
- [ ] **Saving** — spinning brand icon + "Saving..."
- [ ] **Saved** — green cloud-check + "Saved HH:MM"
- [ ] **Unsaved** — amber icon + "Unsaved changes"
- [ ] **Error** — red warning + "Save failed"
- [ ] **Idle with last saved** — green check + "Saved HH:MM"

### Editor Page Additional
- [ ] **Error state** — red warning + "Retry save" button
- [ ] **Offline state** — wifi-off icon + "Saved locally"
- [ ] **beforeunload protection** — browser warns before closing tab if unsaved/saving
- [ ] **Retry save** — button in error banner to retry failed save

### Studio Page Additional
- [ ] **localStorage draft backup** — saves content to `scholarsync_studio_draft` on every keystroke as fallback

---

## 20. Top Bar (Editor page)

The `TopBar` component provides a compact control bar above the editor:

| Section | Feature | Test |
|---------|---------|------|
| **Left** | Undo button | [ ] Undoes last action, disabled when nothing to undo |
| **Left** | Redo button | [ ] Redoes last undo, disabled when nothing to redo |
| **Center** | Mode toggle dropdown | [ ] Editing/Viewing with icons and descriptions |
| **Center** | Word count | [ ] Shows total word count, clickable for section breakdown |
| **Center** | Save status | [ ] Shows current save state (see Save System section) |
| **Right** | References badge | [ ] Shows reference count, click toggles reference sidebar |
| **Right** | Comments badge | [ ] Shows comment count, click toggles comment sidebar |
| **Right** | Keyboard shortcuts (?) | [ ] Click opens KeyboardShortcutsDialog |

---

## 21. AI Chat Panel (Studio page)

Right sidebar with three tabs: **Chat & Learn**, **Research**, **Checks**.

### Chat & Learn Tab
- [ ] **Message input** — text input at bottom with send button
  - Placeholder changes based on mode:
    - Write: "Ask your AI research assistant..."
    - Learn: "Ask me to challenge your thinking..."
- [ ] **Streaming responses** — AI responses stream in token by token
- [ ] **Message bubbles** — user messages right-aligned, assistant messages left-aligned with sparkle avatar
- [ ] **Loading animation** — 3 bouncing dots while waiting for response
- [ ] **Error display** — amber error banner with error message
- [ ] **Auto-scroll** — chat scrolls to bottom on new messages
- [ ] **Conversation persistence** — creates DB conversation via `createConversation`, stores messages via `addMessage`

### AI Event Handling
The Studio page listens for `scholarsync:ai-action` events from slash commands:
- [ ] `continue` — sends document text with "Continue writing..." prompt
- [ ] `summarize` — sends "Summarize the following text..." prompt
- [ ] `find-sources` — opens research sidebar with context from editor
- [ ] `cite` — asks AI for citation help
- [ ] `integrity-check` — switches to Checks tab

---

## 22. Write Mode — AI Intensity (Studio page)

When in Write mode, a bar appears above the editor with three intensity levels:

| Level | Label | Color | Description | Test |
|-------|-------|-------|-------------|------|
| **Focus** | Focus | Sky blue | "AI is quiet — only responds when you ask" | [ ] Verify AI behavior |
| **Collaborate** | Collaborate | Brand purple | "AI assists with completions and suggestions" | [ ] Verify AI behavior |
| **Accelerate** | Accelerate | Violet | "AI is proactive — full suggestions and sidebar" | [ ] Verify AI behavior |

- [ ] Clicking a level selects it (highlighted state)
- [ ] Description text updates below the buttons
- [ ] Selected intensity is passed as `draftContext.intensity` to the chat API

---

## 23. Learn Mode — Guide Mode (Studio page)

When in Learn mode, a green banner appears above the editor.

### Features
- [ ] **Banner message** — "Guide Mode — I won't write for you — I'll teach you how"
- [ ] **Document type selector** — dropdown with 7 types:
  - Case Report
  - Original Article
  - Review Article
  - Meta-Analysis
  - Book Chapter
  - Academic Draft
  - Letter / Correspondence

### Stage Progression
After selecting a document type, a 6-stage progress bar appears:

| Stage | Label | Test |
|-------|-------|------|
| 1 | Understand | [ ] Click to activate |
| 2 | Plan | [ ] Click to activate |
| 3 | Outline | [ ] Click to activate |
| 4 | Draft | [ ] Click to activate |
| 5 | Revise | [ ] Click to activate |
| 6 | Polish | [ ] Click to activate |

- [ ] Active stage is highlighted green
- [ ] Completed stages (before active) have lighter green background
- [ ] Future stages are grey
- [ ] Clicking any stage sets it as active
- [ ] Guide context (documentType + stage) is passed to the chat API

### Reporting Guidelines
Each document type maps to reporting guidelines:
- Case Report → CARE
- Original Article → CONSORT, STROBE, STARD, TRIPOD
- Review Article → PRISMA
- Meta-Analysis → PRISMA 2020, Cochrane Handbook

---

## 24. Research Sidebar (Studio page)

### Research Tab in AI Panel
- [ ] **"Open Literature Research Panel"** button — opens the ResearchSidebar component
- [ ] **Shortcut hint** — `Cmd+Shift+L` to toggle
- [ ] **Quick search** — PubMed search input + Search button, opens research sidebar with query

### ResearchSidebar Component
- [ ] **Resizable** — drag handle to adjust width
- [ ] **Three tabs**: Search, Library, Chat
- [ ] **Collapsed state** — shows Books icon only
- [ ] **Badge counter** — shows paper count in library
- [ ] **Paper selection** — for evidence tables
- [ ] **Citation insertion** — can insert citations from research papers
- [ ] **Keyboard shortcut**: `Cmd+Shift+L` toggles sidebar (handled by Studio page event listener)

---

## 25. Integrity Panel (Studio page)

Accessible from the **Checks** tab in the right AI panel.

### Idle State
- [ ] Shield icon with description
- [ ] **"Run Integrity Check"** button
- [ ] Requires minimum 50 characters in document

### Running State
- [ ] Spinning loader with "Analyzing Document..." message
- [ ] Description: "Running AI detection, plagiarism scan, and citation verification"

### Error State
- [ ] Warning icon with error message
- [ ] **Retry** button

### Results — Four Collapsible Sections

#### 1. AI Detection
- [ ] **Human Score** — circular gauge at top (0-100%)
- [ ] **Overall risk** level indicator
- [ ] **Engine badge** — shows "Binoculars" if used
- [ ] **Stats grid**:
  - Average sentence length (words)
  - Burstiness (sentence length std dev)
  - Vocabulary diversity (type-token ratio %)
  - Hedging phrase count
- [ ] **Flagged paragraphs** (up to 5):
  - Paragraph index and excerpt
  - Human probability percentage (color-coded: green >=70%, amber >=40%, red <40%)
  - Flag descriptions
  - Improvement suggestions

#### 2. Plagiarism (Paid feature)
- [ ] **Locked state** — shows "Available on paid plans" with upgrade link when not available
- [ ] **Similarity score** — percentage
- [ ] **Sources scanned** count
- [ ] **Matches** (up to 5):
  - Similarity percentage
  - Severity badge (high/medium/low, color-coded)
  - Excerpt
  - Source title + year
  - DOI link (opens in new tab)
- [ ] **No matches** — green success message

#### 3. Citation Audit (Paid feature)
- [ ] **Locked state** — shows "Available on paid plans"
- [ ] **Verified/total** citation count
- [ ] **Issues** (up to 8):
  - Severity icon (error=red, warning=amber, info=blue)
  - Issue message
  - Reference identifier
- [ ] **Verified references list** (up to 10):
  - Green check or red X per reference
  - Reference number and title
- [ ] **All verified** — green success message

#### 4. Writing Quality
- [ ] **Readability grade** — numeric grade
- [ ] **Average sentence length** — in words
- [ ] **Passive voice count** — number of instances
- [ ] **Suggestions** — bulleted improvement suggestions

### Additional
- [ ] **Re-run** button — in results header to run check again
- [ ] **Free tier notice** — amber banner when on free plan: "Free tier — AI detection only"
- [ ] All sections are **collapsible/expandable** (default: all expanded)

---

## 26. Left Sidebar (Studio page)

- [ ] **Document title** — editable text input at top
- [ ] **Write/Learn mode toggle** — two-button toggle below title
- [ ] **Project selector** — dropdown (only if user has multiple projects)
- [ ] **Navigation links**:
  - "Current Draft" — highlighted active state
  - "My Library" — links to `/library`
  - "Literature Search" — links to `/research`
- [ ] **References section**:
  - Header: "References (N)" with count
  - "+" button to add citations
  - Up to 5 cited references shown with number, title, author
  - "Use Cmd+Shift+C to add citations" hint when empty
  - "View all N references" link (when >5 refs) → opens reference sidebar
- [ ] **AI Credits** — progress bar at bottom showing token usage (used / limit)

---

## 27. Keyboard Shortcuts — Complete Reference

### Formatting
| Shortcut | Action | Source |
|----------|--------|--------|
| `Cmd+B` | Bold | StarterKit |
| `Cmd+I` | Italic | StarterKit |
| `Cmd+U` | Underline | Underline extension |
| `Cmd+Shift+X` | Strikethrough | AcademicKeyboardShortcuts |
| `Cmd+Shift+H` | Highlight | AcademicKeyboardShortcuts |
| `Cmd+Shift+.` | Superscript | AcademicKeyboardShortcuts |
| `Cmd+Shift+,` | Subscript | AcademicKeyboardShortcuts |
| `Cmd+E` | Inline Code | StarterKit |

### Structure
| Shortcut | Action | Source |
|----------|--------|--------|
| `Cmd+Shift+1` | Heading 1 | AcademicKeyboardShortcuts |
| `Cmd+Shift+2` | Heading 2 | AcademicKeyboardShortcuts |
| `Cmd+Shift+3` | Heading 3 | AcademicKeyboardShortcuts |
| `Cmd+Shift+4` | Heading 4 | AcademicKeyboardShortcuts |
| `Cmd+Shift+7` | Ordered List | StarterKit |
| `Cmd+Shift+8` | Bullet List | StarterKit |
| `Cmd+Shift+B` | Blockquote | StarterKit |
| `Cmd+Shift+Enter` | Horizontal Rule | AcademicKeyboardShortcuts |

### Academic
| Shortcut | Action | Source |
|----------|--------|--------|
| `Cmd+Shift+C` | Insert Citation | AcademicKeyboardShortcuts → event |
| `Cmd+Shift+F` | Insert Footnote | AcademicKeyboardShortcuts → prompt |
| `Cmd+Shift+K` | Insert Link | AcademicKeyboardShortcuts → prompt |

### Tools & Panels
| Shortcut | Action | Source |
|----------|--------|--------|
| `Cmd+Z` | Undo | StarterKit |
| `Cmd+Shift+Z` | Redo | StarterKit |
| `Cmd+S` | Save (flush debounce) | AcademicEditor handleKeyDown |
| `Cmd+/` | Toggle Comment Sidebar | AcademicKeyboardShortcuts → event |
| `Cmd+Shift+R` | Toggle Reference Sidebar | AcademicKeyboardShortcuts → event (also Studio keydown listener) |
| `Cmd+Shift+L` | Toggle Research Sidebar | Studio page (ResearchStore) |
| `/` | Open Slash Command Menu | SlashCommandsExtension |

### Keyboard Shortcuts Dialog
- [ ] Accessible from TopBar `?` button (Editor page)
- [ ] Shows all shortcuts organized in 4 categories: Formatting, Structure, Academic, Tools
- [ ] Each shortcut shows key combination as styled keyboard keys
- [ ] Modal closes on backdrop click or X button

---

## 28. Markdown Input Rules

The editor recognizes these markdown patterns via the `Typography` extension and paste handling:

| Pattern | Converts To | Test |
|---------|------------|------|
| `# Text` | Heading 1 | [ ] Type and press Enter |
| `## Text` | Heading 2 | [ ] |
| `### Text` | Heading 3 | [ ] |
| `#### Text` | Heading 4 | [ ] |
| `**text**` | Bold | [ ] |
| `*text*` | Italic | [ ] |
| `~~text~~` | Strikethrough | [ ] |
| `- item` | Bullet list | [ ] |
| `1. item` | Numbered list | [ ] |
| `> text` | Blockquote | [ ] |
| `---` | Horizontal rule | [ ] |
| `` `code` `` | Inline code | [ ] |

---

## 29. Error Handling & Edge Cases

---

## Quick Test Workflow

### Basic Editor Flow
1. [ ] Open editor page / studio page
2. [ ] Type text — verify placeholder disappears
3. [ ] Apply formatting (bold, italic, underline)
4. [ ] Type `/` — verify slash menu appears
5. [ ] Insert a heading, bullet list, and table
6. [ ] Verify word count updates in real-time
7. [ ] Press `Cmd+S` — verify immediate save
8. [ ] Wait 2s after typing — verify auto-save triggers

### Citation Flow
1. [ ] Press `Cmd+Shift+C` — citation dialog opens
2. [ ] Search for a paper / enter DOI
3. [ ] Select reference(s) and click Insert
4. [ ] Verify citation chip appears in text with number
5. [ ] Verify bibliography auto-inserted at document end
6. [ ] Hover citation — tooltip shows details
7. [ ] Click citation — popover shows management options
8. [ ] Press `Cmd+Shift+R` — reference sidebar opens
9. [ ] Verify references listed with sort/filter options

### Comments Flow (Editor page)
1. [ ] Select text in editor
2. [ ] Click comment button in floating toolbar
3. [ ] Verify comment sidebar opens with quoted text
4. [ ] Type a comment and press Enter
5. [ ] Verify comment thread appears
6. [ ] Click reply, type reply, press Enter
7. [ ] Click Resolve, verify resolved styling
8. [ ] Filter by "Resolved" — verify filter works
9. [ ] Click quoted text — editor scrolls to position

### Version History Flow (Editor page)
1. [ ] Click "Version History" button
2. [ ] Click "Save Current Version", enter name
3. [ ] Verify version appears in list
4. [ ] Click "Preview" — modal shows content
5. [ ] Click "Restore" — confirm dialog, content restored

### Export Flow
1. [ ] Click "Export" button
2. [ ] Select DOCX format
3. [ ] Toggle double-spacing and page numbers
4. [ ] Click Export — verify `.docx` file downloads
5. [ ] Select PDF format — verify print dialog opens

### Studio AI Flow
1. [ ] Switch to Write mode
2. [ ] Select AI intensity (Focus/Collaborate/Accelerate)
3. [ ] Type a question in chat — verify streaming response
4. [ ] Switch to Learn mode
5. [ ] Select document type — verify stage progression bar
6. [ ] Click through stages — verify they highlight correctly
7. [ ] Type in chat — verify Socratic teaching response
8. [ ] Click Checks tab — run integrity check
9. [ ] Verify all 4 result sections render correctly

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were missing from the original document generated by Claude Code.

### Route Entry, Loading, and Error States
- [ ] `/editor/[id]` is wrapped in `EditorErrorBoundary` before any header or editor UI renders
- [ ] `/editor/[id]` route-level error screen title is `Editor unavailable`
- [ ] `/editor/[id]` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [ ] `/studio` route-level loading screen renders skeleton placeholders instead of the real left rail, toolbar, and editor body
- [ ] `/studio` route-level error screen title is `Studio unavailable`
- [ ] `/studio` route-level error screen message is `We couldn't load the editor. Your work is safe — please try again.`
- [ ] Editor error boundary fallback shows a bug icon inside a red-tinted circular badge
- [ ] Editor error boundary fallback headline reads `The editor encountered an error`
- [ ] Editor error boundary fallback helper text reads `Don't worry — your work has been saved automatically`
- [ ] Editor error boundary fallback primary button label is `Reload Editor`
- [ ] Editor error boundary fallback secondary navigation link points to `/projects`
- [ ] Editor error boundary fallback secondary link label is `Go to Projects`
- [ ] Error boundary fallback exposes a collapsed `Technical details` section only after an actual runtime crash occurs
- [ ] Expanding `Technical details` reveals the stringified error message and React component stack

### Editor Header Inputs and Menus
- [ ] Header title input is visible immediately under the `/editor/[id]` shell after loading completes
- [ ] Header title input placeholder is exactly `Untitled Manuscript`
- [ ] Header title input is a plain text input, not a contenteditable field
- [ ] Header title input uses the current store-backed `documentTitle` value as its controlled default state
- [ ] Header title input is disabled while document data is still loading
- [ ] Typing in the header title updates the input immediately before persistence finishes
- [ ] Title changes schedule `setTitle(newTitle)` after a 1 second delay
- [ ] Back arrow in the header is a real link to `/dashboard`
- [ ] Header document-type trigger is disabled while the page is loading
- [ ] Header document-type trigger shows the current type label plus a `CaretDown` icon
- [ ] Document-type trigger falls back to `Original Article` when the current store value does not match a known type
- [ ] Opening the document-type menu renders a full-screen click-capture backdrop behind the dropdown
- [ ] Clicking the backdrop closes the document-type menu without changing the selected type
- [ ] Document-type menu renders exactly four options in the current implementation
- [ ] Document-type option labels are `Original Article`, `Case Report`, `Review Article`, and `Meta-Analysis`
- [ ] The currently selected document-type option is styled with brand-colored text and medium font weight
- [ ] Clicking a document-type option closes the dropdown immediately
- [ ] Changing document type updates store state through `setDocumentType(type)`
- [ ] The overflow `DotsThree` button is visible in the header
- [ ] The overflow `DotsThree` button has no click handler or menu in the current page component

### Editor Save, Notices, and Persistence Safety
- [ ] Header save-status chip is always rendered on `/editor/[id]`, even before the first successful save
- [ ] `saving` state shows a pulsing `CloudArrowUp` icon and the text `Saving...`
- [ ] `saved` state shows a green `CheckCircle` icon and `Saved HH:MM`
- [ ] `unsaved` state shows an amber `CloudArrowUp` icon and the text `Unsaved`
- [ ] `error` state replaces the static label with a clickable `Retry save` button
- [ ] `offline` state shows a red `WifiSlash` icon and the text `Offline`
- [ ] `local` state shows a red `WifiSlash` icon and the text `Saved locally`
- [ ] Error banner appears below the header only when the hook exposes a non-null `error`
- [ ] Error banner text renders the raw hook error string without truncation logic
- [ ] Error banner `Retry` button is shown only when `saveStatus === "error"`
- [ ] Pending citation notice is initialized from `sessionStorage["scholarsync_pending_citation"]` on first client render
- [ ] Pending citation notice removes the `scholarsync_pending_citation` sessionStorage key immediately after reading it
- [ ] Pending citation notice uses the paper title when the stored JSON contains a non-empty `title`
- [ ] Pending citation notice falls back to `Paper saved to your library. Open Citation Dialog to cite it.` when parsing fails or no title exists
- [ ] Pending citation notice auto-dismisses after 5 seconds
- [ ] Browser `beforeunload` protection is attached whenever editor save status is `unsaved` or `saving`
- [ ] Browser `beforeunload` protection is removed again when the save status leaves `unsaved`/`saving`
- [ ] Project references are cleared and reloaded whenever `dbDocumentId` or `projectId` changes
- [ ] Failed project-reference preloads log `Failed to load project references:` to the console and do not show an inline UI error

### AcademicEditor Shell and Top Bar Details
- [ ] `AcademicEditor` mounts a fixed `TopBar` above the editor scroll region
- [ ] Academic editor main content area uses `.academic-editor-wrapper` with a centered max width
- [ ] Paragraph placeholder text is `Start writing, or type / for commands...`
- [ ] Level-1 heading placeholder text is `Manuscript title...`
- [ ] Level-2 through level-4 heading placeholder text is `Section heading...`
- [ ] Academic editor supports only heading levels 1 through 4
- [ ] Academic editor becomes non-editable when `mode === "viewing"` even if `readOnly` prop is false
- [ ] `Cmd/Ctrl+S` prevents the browser save dialog and flushes the editor save callback immediately
- [ ] Every content change recalculates and stores the current word count before the debounced save fires
- [ ] Debounced editor save delay defaults to 2000 ms on `/editor/[id]`
- [ ] Successful debounced saves set editor store status to `saved` with a fresh `lastSavedAt` timestamp
- [ ] Selection changes update the active outline section to the nearest preceding heading position
- [ ] Initial outline generation only stores headings when the document contains at least two headings
- [ ] Comment count badge is hydrated from local comment storage when `documentId` changes
- [ ] External reference count is mirrored into the editor store when the `referenceCount` prop changes
- [ ] Undo button is disabled when `editor.can().undo()` is false
- [ ] Redo button is disabled when `editor.can().redo()` is false
- [ ] Clicking Undo runs `editor.chain().focus().undo().run()`
- [ ] Clicking Redo runs `editor.chain().focus().redo().run()`
- [ ] Mode toggle button shows `Editing` with a pencil icon by default
- [ ] Mode dropdown includes the descriptive text `Direct changes to document` for Editing mode
- [ ] Mode dropdown includes the descriptive text `Read-only, no edits` for Viewing mode
- [ ] Selecting `Viewing` immediately calls `editor.setEditable(false)`
- [ ] Selecting `Editing` immediately calls `editor.setEditable(true)`
- [ ] Word-count button shows the localized total count followed by the literal word `words`
- [ ] Clicking the word-count button opens a `Section Breakdown` popover anchored below the count
- [ ] Section Breakdown popover shows `No section headings yet.` when no heading buckets are available
- [ ] Clicking outside the word-count popover closes it
- [ ] TopBar reference badge button shows the current numeric `referenceCount` from the editor store
- [ ] TopBar comment badge button shows the current numeric unresolved `commentCount` from the editor store
- [ ] TopBar keyboard-shortcuts help button title is `Keyboard shortcuts (Cmd+/)`

### Keyboard Shortcuts Dialog Details
- [ ] Keyboard shortcuts dialog opens from the TopBar question-mark button
- [ ] Keyboard shortcuts dialog header includes a keyboard icon and the title `Keyboard Shortcuts`
- [ ] Clicking the dark backdrop outside the shortcuts dialog closes it
- [ ] Clicking inside the shortcuts dialog body does not bubble and does not close the dialog
- [ ] Formatting shortcuts section includes Bold, Italic, Underline, Strikethrough, Highlight, Superscript, Subscript, and Inline Code
- [ ] Structure shortcuts section includes Heading 1, Heading 2, Heading 3, Heading 4, Bullet List, Ordered List, Blockquote, and Horizontal Rule
- [ ] Academic shortcuts section includes Insert Citation, Insert Footnote, and Insert Link
- [ ] Tools shortcuts section includes Undo, Redo, Save, Toggle Comments, and Slash Commands
- [ ] Tools section documents `Cmd + /` as `Toggle Comments` in the current dialog even though the editor wiring listens for the custom `toggle-comment-sidebar` event

### Link and Citation Interaction Details
- [ ] Clicking a link inside the editor prevents normal navigation and opens the custom `LinkPopover`
- [ ] LinkPopover initial view shows the raw URL text, not editable input fields
- [ ] LinkPopover positions itself above the clicked anchor using the link element's bounding box
- [ ] Clicking outside the link popover closes it
- [ ] LinkPopover `Edit link` button switches the popover into inline edit mode
- [ ] Enter inside the link edit input confirms the updated URL
- [ ] Escape inside the link edit input exits edit mode without closing the popover
- [ ] Link edit input placeholder is `https://...`
- [ ] Link edit input auto-focuses and selects the full URL when edit mode opens
- [ ] LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [ ] LinkPopover `Remove link` unsets the current link mark and closes the popover
- [ ] `scholarsync:open-citation-dialog` window event opens the citation dialog on `/editor/[id]`
- [ ] Inserting citations through the editor route always inserts a `citation` node first and checks for an existing bibliography second
- [ ] When no bibliography node exists, the editor route appends one at the end of the document automatically after citation insertion

### Comment Sidebar Detailed States
- [ ] Comment sidebar opens inline inside `AcademicEditor` only when `commentSidebarOpen` is true and a `documentId` is available
- [ ] Comment sidebar header title is `Comments`
- [ ] Comment sidebar unresolved badge is hidden when there are zero unresolved threads
- [ ] Comment filter bar exposes exactly three modes: `all`, `unresolved`, and `resolved`
- [ ] Active comment filter chip uses brand-colored styling while inactive chips use muted styling
- [ ] Empty state headline is `No comments yet`
- [ ] Empty state helper text reads `Select text and click the comment button to start`
- [ ] Bottom new-comment input placeholder is `Add a comment...`
- [ ] Pressing Enter in the bottom new-comment input submits the comment when the field is non-empty
- [ ] General document comments are stored without quoted text or selection ranges
- [ ] Inline-comment pending state shows a `Commenting on selection` banner before the new comment is submitted
- [ ] Inline-comment pending state shows the selected text in a truncated blockquote when quoted text exists
- [ ] Pending inline-comment `Cancel` clears `pendingInlineComment`, closes the temporary composer state, and empties the input
- [ ] Pending inline-comment `Add Comment` button is disabled until the comment text has non-whitespace content
- [ ] Reply input placeholder is `Write a reply...`
- [ ] Reply button is disabled until reply text has non-whitespace content
- [ ] Pressing Enter in the reply input submits the reply when the field is non-empty
- [ ] Clicking a quoted-text chip in a comment thread restores the text selection in the editor and scrolls it into view
- [ ] Comment timestamps collapse to `Just now`, `Xm ago`, `Xh ago`, `Yesterday`, `Xd ago`, or a localized month/day string depending on age
- [ ] Resolved top-level comments show a `Resolved` pill in the header row
- [ ] Resolved comments and replies render with reduced opacity and line-through text treatment
- [ ] Only top-level comments render `Resolve`/`Unresolve` and `Reply` actions
- [ ] Owner-authored comments render a `Delete` action aligned to the far right
- [ ] Resolving or unresolving a comment reloads the thread list from local storage immediately
- [ ] Deleting a comment reloads the thread list from local storage immediately

### Reference Sidebar Detailed States
- [ ] Reference sidebar renders only when its `open` prop is true
- [ ] Reference sidebar header title is `References`
- [ ] Reference sidebar header count pill shows the total `references.size`
- [ ] Reference sidebar header `Plus` button delegates to `onOpenCitationDialog`
- [ ] Reference sidebar sort button opens a dropdown with four sort modes
- [ ] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [ ] Selecting a sort mode closes the sort menu immediately
- [ ] Reference filter input placeholder is `Filter references...`
- [ ] Empty sidebar state headline is `No references yet.`
- [ ] Empty sidebar state CTA label is `Add your first reference`
- [ ] References are partitioned into cited and uncited groups based on `referenceNumberMap`
- [ ] Uncited section heading reads `Not cited (N)` with a warning icon
- [ ] Cited rows show numeric labels like `[1]`
- [ ] Uncited rows show `[--]` instead of a citation number
- [ ] Expanded reference rows show full metadata for Title, Authors, Journal, Year, DOI, PMID, and optional Abstract
- [ ] Expanded reference rows render DOI and PMID values as outbound links when present
- [ ] Expanded reference rows expose an `Open DOI` action only when a DOI exists
- [ ] Expanded reference rows expose a `Copy DOI` action only when a DOI exists
- [ ] `Copy DOI` copies the full `https://doi.org/...` URL to the clipboard rather than only the DOI token
- [ ] `Remove` action is protected by a `window.confirm("Remove this reference from the sidebar?")` prompt
- [ ] Cancelling the browser confirm leaves the reference untouched
- [ ] Confirming removal deletes the reference from store and collapses its detail view if it was expanded
- [ ] Dispatching `scholarsync:scroll-to-reference` expands the target row and scrolls it into view after a short timeout

### Version History and Restore Details
- [ ] `Version History` button is disabled while the editor route is still loading
- [ ] `Version History` button is also disabled when there is no `editorContent`
- [ ] Opening Version History renders a right-side fixed panel rather than a modal dialog
- [ ] Version History panel header title is `Version History`
- [ ] Version History includes a full-width `Save Current Version` button at the top
- [ ] Clicking `Save Current Version` opens a browser `prompt` asking for a version name
- [ ] Empty or cancelled prompt submission aborts manual version creation
- [ ] Version History initial loading state shows only a centered spinner in the panel body
- [ ] Version History empty state text is `No versions yet`
- [ ] Auto-saved versions display `Auto-save` when no explicit name exists
- [ ] Manual versions display `Manual save` when no explicit name exists
- [ ] Non-auto-saved versions use a filled dot marker while auto-saved versions use an open-circle marker
- [ ] Every version card renders both `Preview` and `Restore` actions
- [ ] Clicking `Preview` fetches version content and opens a centered overlay modal
- [ ] Version Preview modal body shows raw formatted JSON inside a `<pre>` block
- [ ] Clicking `Restore` first opens a browser confirm about saving current content as a version
- [ ] Cancelling the browser confirm leaves restore state idle and does not fetch version content
- [ ] While restore is in progress for a row, only that row's button shows a spinner and disabled state
- [ ] Successful restore closes the side panel and remounts the editor using a bumped `contentKey`

### Export Dialog Detailed States
- [ ] Editor-page `Export` button is disabled while the page is loading
- [ ] Editor-page `Export` button is also disabled when there is no `editorContent`
- [ ] Opening export on `/editor/[id]` shows a centered modal titled `Export Manuscript`
- [ ] Export dialog default selected format is `DOCX`
- [ ] Export dialog renders exactly two format cards: `DOCX` and `PDF`
- [ ] Active export-format card uses brand border and background styling
- [ ] `Include page numbers` checkbox defaults to checked
- [ ] `Double-spaced` checkbox defaults to checked
- [ ] Clicking the dark modal backdrop closes the export dialog
- [ ] `Cancel` closes the export dialog without starting an export
- [ ] Export button label changes from `Export` to `Exporting...` while an export is running
- [ ] Export button is disabled only while `isExporting` is true
- [ ] DOCX export generates a download filename that strips punctuation and replaces whitespace with underscores
- [ ] PDF export on `/editor/[id]` uses `window.print()` rather than an API-backed file download
- [ ] Successful exports close the dialog through `onClose()`
- [ ] Export failures are logged to the console and do not render inline validation text inside the dialog

### Studio Workspace Shell and Left Rail Details
- [ ] `/studio` reads `projectId` from the query string and coerces it to a number for initial project selection
- [ ] `/studio?mode=learn` initializes the page in Learn mode on first render
- [ ] Studio left-rail title input is always visible above the Write/Learn mode toggle
- [ ] Studio left-rail title input is controlled by `docTitle`
- [ ] Studio left-rail Write/Learn toggle uses `Write` and `Learn` text buttons inside a shared pill container
- [ ] `Write` button is visually active by default unless the URL requests learn mode
- [ ] `Learn` button becomes visually active with emerald styling when selected
- [ ] Project selector is omitted entirely when the user has zero or one project
- [ ] Closed project selector button shows the selected project title or the fallback text `Select project`
- [ ] Clicking outside the project selector closes the dropdown without changing the selected project
- [ ] Project selector dropdown lists every available project as a button row
- [ ] Clicking a project row closes the dropdown and calls `selectProject(id)`
- [ ] Left-rail navigation includes a static `Current Draft` item that is not a link
- [ ] Left-rail navigation includes a link to `/library` labeled `My Library`
- [ ] Left-rail navigation includes a link to `/research` labeled `Literature Search`
- [ ] Left-rail reference section heading shows `References (N)` using the live reference count
- [ ] Left-rail reference `Plus` button opens the citation dialog while preserving the current editor selection
- [ ] When there are no cited sources yet, the left rail shows the helper text `Use Cmd+Shift+C to add citations`
- [ ] Left rail shows at most five cited sources before collapsing the rest behind a secondary CTA
- [ ] `View all N references` button appears only when `references.size > 5`
- [ ] AI Credits progress bar falls back to `0 / 50000` when usage stats are unavailable

### Studio Write and Learn Mode Controls
- [ ] In Write mode, an `AI Intensity` strip appears above the save/export toolbar
- [ ] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [ ] Write-mode default intensity is `Collaborate`
- [ ] Each intensity button exposes the matching description string in its `title` attribute
- [ ] Active `Focus` uses sky styling, active `Collaborate` uses brand styling, and active `Accelerate` uses violet styling
- [ ] Changing draft intensity updates local mode state immediately without waiting for save
- [ ] Write-mode helper line under the buttons updates to the description for the current intensity
- [ ] In Learn mode, the top banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Learn-mode document-type picker button defaults to `Select document type`
- [ ] Learn-mode document-type picker closes immediately after selecting a type
- [ ] Learn-mode stage tracker is hidden until a guide document type has been chosen
- [ ] Once a guide document type is selected, stage buttons render in the order defined by `GUIDE_STAGES`
- [ ] Active guide stage uses solid emerald styling
- [ ] Completed guide stages use lighter emerald styling
- [ ] Future guide stages use muted styling until selected

### Studio Save, Local Draft, and Export Details
- [ ] Studio save indicator renders in the center toolbar even before the first save completes
- [ ] Studio `saving` state shows a spinning `CircleNotch` and `Saving...`
- [ ] Studio `saved` state shows a `CloudCheck` icon and `Saved HH:MM`
- [ ] Studio `unsaved` state shows `Unsaved changes`
- [ ] Studio `error` state shows `Save failed`
- [ ] Studio `idle` state with a prior timestamp still renders `Saved HH:MM`
- [ ] `onDirty` writes a fallback JSON draft to `localStorage["scholarsync_studio_draft"]`
- [ ] Local studio draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [ ] Studio local-draft save failures are swallowed silently when localStorage is full or unavailable
- [ ] Studio export trigger opens a small dropdown menu instead of a modal dialog
- [ ] Studio export dropdown contains exactly `Export as PDF` and `Export as Word`
- [ ] Studio export dropdown does not include an outside-click handler in the current page component
- [ ] Studio PDF export posts HTML content to `/api/export/pdf`
- [ ] Successful Studio PDF export opens a new browser window or tab and writes returned HTML into it
- [ ] Studio Word export posts HTML content to `/api/export/docx`
- [ ] Successful Studio Word export downloads a `.doc` file whose filename replaces non-alphanumeric characters with underscores
- [ ] Failed Studio export requests fail silently in the UI and only log to the console

### Studio AI Panel Detailed States
- [ ] When neither the reference sidebar nor comment sidebar is open, `/studio` shows a right-side AI panel that is 80 units wide
- [ ] AI panel top tabs are `Chat & Learn`, `Research`, and `Checks`
- [ ] Chat tab renders `chatError` as an amber inline banner above the message list
- [ ] User chat bubbles are right-aligned and assistant chat bubbles are left-aligned
- [ ] Assistant chat bubbles include a leading sparkle-avatar chip
- [ ] Streaming assistant placeholder appears only while loading and only when the newest message is not already an assistant message
- [ ] Chat composer placeholder is `Ask your AI research assistant...` in Write mode
- [ ] Chat composer placeholder switches to `Ask me to challenge your thinking...` in Learn mode
- [ ] Send button is disabled while a chat request is in progress
- [ ] Send button is also disabled when the chat input is empty or whitespace-only
- [ ] Submitting the first message creates a conversation whose mode is `draft` in Write mode and `learn` in Learn mode
- [ ] Chat request body sends prior messages as `{ role, content }` pairs to `/api/chat`
- [ ] Learn-mode chat request includes `guideContext` only when a guide document type has been selected
- [ ] Write-mode chat request includes `draftContext.intensity` with the active draft intensity
- [ ] Non-OK chat responses try to parse `{ error }` JSON and fall back to `Chat failed`
- [ ] Missing response streams surface `No response stream` in the chat error banner
- [ ] Generic request failures surface `Failed to send message. Check your API key.`
- [ ] Research tab primary CTA label is `Open Literature Research Panel`
- [ ] Research tab helper text advertises `Cmd+Shift+L` as the literature-panel shortcut
- [ ] Research quick-search input placeholder is `Quick search PubMed...`
- [ ] Research quick-search `Search` button ignores empty or whitespace-only queries
- [ ] Checks tab mounts `IntegrityPanel` and reads plain text from `editorRef.current?.getText()`

### Actual Current Behavior Corrections
- [ ] The live editor routes are `/editor/[id]` and `/studio`; there is no dedicated `/editor/new` route file in the current app tree
- [ ] `/editor/[id]` uses `AcademicEditor` with `TopBar`, floating outline, link popover, and inline comment sidebar inside the editor shell
- [ ] `/studio` uses `TiptapEditor` plus separate right-side research/reference/comment/AI panels rather than the exact same shell as `/editor/[id]`
- [ ] Studio export is a two-item dropdown, not the same modal export dialog used on `/editor/[id]`
- [ ] Studio export menu does not currently close on outside click because no backdrop or document listener is wired in this page component
- [ ] Editor-page overflow `DotsThree` action is present visually but has no implemented behavior
- [ ] Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document
- [ ] The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring

## Re-Audit Discoveries (Codex Pass 2)

> These checks were added after a source-only line-by-line re-audit of the editor components, custom extensions, citation stack, export stack, persistence hooks, and Studio chat wiring.

### Route Shell, Errors, and Store Defaults
- [ ] `/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`
- [ ] `/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`
- [ ] `/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`
- [ ] `/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree
- [ ] `/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates
- [ ] `/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row
- [ ] `/studio/loading.tsx` includes a full-width horizontal skeleton below the header row
- [ ] `/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome
- [ ] `/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`
- [ ] `/studio/error.tsx` uses the same safe-work message as the editor route error
- [ ] Editor store default `mode` is `editing`
- [ ] Editor store default `outline` is an empty array
- [ ] Editor store default `outlineVisible` is `false`
- [ ] Editor store default `wordCount` is `0`
- [ ] Editor store default `saveStatus.state` is `saved`
- [ ] Editor store default `activeSectionPos` is `null`
- [ ] Editor store default `referenceSidebarOpen` is `false`
- [ ] Editor store default `commentSidebarOpen` is `false`
- [ ] Editor store default `documentTitle` is `Untitled Manuscript`
- [ ] Editor store default `documentType` is `original-article`
- [ ] Editor store default `referenceCount` is `0`
- [ ] Editor store default `commentCount` is `0`
- [ ] Reference store default `references` collection is an empty `Map`
- [ ] Reference store default citation style is `vancouver`
- [ ] Reference store default `referenceNumberMap` is an empty `Map`
- [ ] Reference store default `bibliographyEntries` is an empty array
- [ ] Reference store default `citationDisplayMap` is an empty `Map`
- [ ] Reference store default `sidebarOpen` is `false`
- [ ] Reference store default `citationDialogOpen` is `false`

### Editor Route Persistence, Offline Queue, and Retry Logic
- [ ] `useEditorDocument` treats `urlDocumentId === "new"` as a create/load flow via `loadStudioDocument(...)`
- [ ] When the editor route creates a new document, it writes the returned document title into the editor store
- [ ] When the loaded document has sections, the editor route binds persistence to the first section only
- [ ] When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior
- [ ] A non-numeric editor route id throws `Invalid document ID`
- [ ] A missing numeric document throws `Document not found`
- [ ] DB load failures fall back to `localStorage["scholarsync_doc_<urlDocumentId>"]`
- [ ] Local fallback restores `content` from the parsed local payload
- [ ] Local fallback also restores `title` from the parsed local payload when present
- [ ] Local fallback sets the visible error banner text to `Loaded from local storage. Database unavailable. Changes will be saved locally.`
- [ ] Local fallback clears `projectId` and `sectionId` to `null`
- [ ] If both DB load and local fallback fail, the hook sets `Failed to load document. Please refresh the page.`
- [ ] Editor-route autosave versions run every 10 minutes only when `dbDocumentId`, `sectionId`, and `content` all exist
- [ ] Browser `online` events trigger queued-save replay through `processQueue(...)`
- [ ] Offline-queue replay marks the editor route as `saved` only after at least one queued save succeeds
- [ ] Browser `offline` events set the route save state to `offline` unless the current state is already `saving`, `unsaved`, or `local`
- [ ] Editor-route `handleEditorUpdate` sets in-memory content immediately before the debounced save executes
- [ ] Editor-route debounced persistence delay is fixed at 2000 ms in the hook
- [ ] When no DB document exists, editor-route autosave writes only to localStorage and never calls the DB save action
- [ ] Local-only save payload includes `content`, `plainText`, `wordCount`, `title`, `documentType`, and `timestamp`
- [ ] Successful DB saves still back up the latest editor payload to `localStorage["scholarsync_doc_<urlDocumentId>"]`
- [ ] DB save retries use exponential backoff with up to 3 retries, 1000 ms initial delay, 10000 ms max delay, and 0-500 ms jitter
- [ ] Save retry attempts keep the visible route state at `saving`
- [ ] When a DB save fails while offline, the hook enqueues exactly one latest save per document in `scholarsync_save_queue`
- [ ] Offline queue entries replace prior queued saves for the same document instead of accumulating duplicates
- [ ] Offline save fallback sets route save state to `local`
- [ ] Offline save fallback sets the banner text to `Saved locally. Changes will sync when you're back online.`
- [ ] Non-offline save failures set route save state to `error`
- [ ] Non-offline save failures set the banner text to `Failed to save. Please check your connection.`
- [ ] `setTitle(...)` updates the DB title immediately when `dbDocumentId` exists
- [ ] Title-update failures are intentionally silent in the UI and only log to the console
- [ ] `setTitle(...)` also updates the matching localStorage payload title when local data exists
- [ ] `retrySave()` sends the current editor JSON back through `saveDocumentContent(...)`
- [ ] `retrySave()` currently retries with `plain_text_content: ""` and `word_count: 0` rather than recomputing those values
- [ ] Successful `retrySave()` clears `loadedFromLocalStorage` back to `false`

### AcademicEditor, TopBar, and Floating Tooling
- [ ] `AcademicEditor` enables editing only when `readOnly` is false and editor store mode is not `viewing`
- [ ] Academic editor `StarterKit` heading levels are limited to `1`, `2`, `3`, and `4`
- [ ] Academic editor paragraph placeholder reads `Start writing, or type / for commands...`
- [ ] Academic editor H1 placeholder reads `Manuscript title...`
- [ ] Academic editor non-H1 heading placeholder reads `Section heading...`
- [ ] Academic editor root `EditorContent` class includes `prose prose-lg`
- [ ] Academic editor root enables browser spellcheck via `spellcheck="true"`
- [ ] `Cmd/Ctrl+S` inside `AcademicEditor` calls the route `flushSave()` path and prevents the browser default
- [ ] Initial editor-content hydration only runs when the current editor text is still blank
- [ ] Initial outline bootstrapping waits 300 ms after mount before scanning headings
- [ ] Initial outline bootstrapping clears the outline store when the document has fewer than two headings
- [ ] `AcademicEditor` recalculates and stores comment counts whenever `documentId` changes
- [ ] `AcademicEditor` syncs the top-bar reference badge count from the `referenceCount` prop
- [ ] `scholarsync:editor-action` with `add-comment` opens the comment sidebar first if it is closed
- [ ] `scholarsync:editor-action` with `add-comment` always dispatches `scholarsync:new-inline-comment` after opening the sidebar
- [ ] `scholarsync:editor-action` with `toggle-comment-sidebar` toggles the sidebar without changing the selection
- [ ] `scholarsync:editor-action` with `insert-citation` forwards directly to `onOpenCitationDialog`
- [ ] `scholarsync:editor-action` with `toggle-reference-sidebar` forwards directly to `onToggleReferenceSidebar`
- [ ] TopBar undo button title is exactly `Undo`
- [ ] TopBar redo button title is exactly `Redo`
- [ ] TopBar undo button is disabled when `editor.can().undo()` is false
- [ ] TopBar redo button is disabled when `editor.can().redo()` is false
- [ ] TopBar mode dropdown options are exactly `Editing` and `Viewing`
- [ ] TopBar mode option `Editing` description reads `Direct changes to document`
- [ ] TopBar mode option `Viewing` description reads `Read-only, no edits`
- [ ] Switching TopBar mode to `Viewing` calls `editor.setEditable(false)`
- [ ] Switching TopBar mode back to `Editing` calls `editor.setEditable(true)`
- [ ] TopBar mode dropdown uses a fixed fullscreen click-catcher to dismiss
- [ ] TopBar word-count button title reads `Click for section breakdown`
- [ ] TopBar section-breakdown popover closes on outside mouse down
- [ ] TopBar saved state renders only `saved`, `saving`, `unsaved`, and `offline`; it has no dedicated `error` or `local` branch
- [ ] TopBar keyboard-help button title is `Keyboard shortcuts (Cmd+/)`

### Selection Toolbar and Link Popover
- [ ] SelectionToolbar renders only when the current selection is non-empty
- [ ] Clearing the text selection hides the floating toolbar entirely
- [ ] Clearing the text selection also closes the style dropdown and highlight palette
- [ ] SelectionToolbar positions itself using `coordsAtPos(selection.from)`
- [ ] SelectionToolbar delays blur-close by 150 ms to allow button interactions inside the toolbar
- [ ] Style dropdown current label resolves in priority order `Heading 4`, `Heading 3`, `Heading 2`, `Heading 1`, then `Normal text`
- [ ] Style dropdown button minimum width is 90 px
- [ ] SelectionToolbar style choices are `Normal text`, `Heading 1`, `Heading 2`, `Heading 3`, and `Heading 4`
- [ ] SelectionToolbar bold button toggles the `bold` mark on mouse down to preserve selection
- [ ] SelectionToolbar italic button toggles the `italic` mark on mouse down to preserve selection
- [ ] SelectionToolbar underline button toggles the `underline` mark on mouse down to preserve selection
- [ ] SelectionToolbar strikethrough button toggles the `strike` mark on mouse down to preserve selection
- [ ] SelectionToolbar inline-code button toggles the `code` mark on mouse down to preserve selection
- [ ] SelectionToolbar highlight main click toggles the highlight mark without choosing a specific color
- [ ] SelectionToolbar highlight palette opens from the highlight button context menu rather than a normal left click
- [ ] SelectionToolbar highlight palette colors are yellow `#fef08a`, green `#bbf7d0`, blue `#bfdbfe`, pink `#fecdd3`, and orange `#fed7aa`
- [ ] SelectionToolbar link action uses `window.prompt("URL", previousUrl)`
- [ ] Cancelling the link prompt leaves the current link state unchanged
- [ ] Entering an empty string in the link prompt removes the current link mark
- [ ] Entering a non-empty string in the link prompt extends the current link mark range before updating `href`
- [ ] SelectionToolbar comment button dispatches `scholarsync:editor-action` with `action: "add-comment"`
- [ ] SelectionToolbar AI Edit button dispatches `scholarsync:ai-action` with `action: "precision-edit"`
- [ ] LinkPopover intercepts clicks on `<a>` tags inside the editor DOM and prevents the browser default navigation
- [ ] LinkPopover starts in read mode when opened from an inline link
- [ ] LinkPopover edit input placeholder is `https://...`
- [ ] LinkPopover pressing `Enter` in edit mode saves the new URL
- [ ] LinkPopover pressing `Escape` in edit mode exits edit mode without applying additional changes
- [ ] LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [ ] LinkPopover `Remove link` unsets the mark and closes the popover

### Slash Menu Renderer and Keyboard Navigation
- [ ] Slash menu empty state text is `No commands found`
- [ ] Slash menu width is fixed at `w-80`
- [ ] Slash menu max height is `400px` with internal vertical scroll
- [ ] Slash menu category labels render as `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, and `DOCUMENT TOOLS`
- [ ] Slash menu resets the selected row to index `0` whenever the item list changes
- [ ] Slash menu scrolls the selected row into view whenever the selected index changes
- [ ] Slash menu `ArrowUp` wraps from the first item to the last item
- [ ] Slash menu `ArrowDown` wraps from the last item back to the first item
- [ ] Slash menu `Enter` runs the highlighted command and consumes the key event
- [ ] Slash menu `Escape` hides the popup and consumes the key event
- [ ] Slash menu popup placement is `bottom-start`
- [ ] Slash menu popup offset is `[0, 4]`
- [ ] Slash menu popup uses `interactive: true` and `trigger: "manual"`
- [ ] Slash suggestions are allowed at the start of a block
- [ ] Slash suggestions are also allowed immediately after a space character
- [ ] Slash suggestions are not allowed in the middle of a word with no preceding space or newline
- [ ] Slash query filtering matches against command title, description, and category text

### Slash Commands: Basic Blocks and Structure
- [ ] Slash command `Text` label is `Text`
- [ ] Slash command `Text` description is `Plain paragraph text`
- [ ] Slash command `Text` converts the current block to a paragraph
- [ ] Slash command `Heading 1` description is `Manuscript title`
- [ ] Slash command `Heading 1` shortcut label is `Cmd+Opt+1`
- [ ] Slash command `Heading 1` sets the current block to heading level 1
- [ ] Slash command `Heading 2` description is `IMRAD sections`
- [ ] Slash command `Heading 2` shortcut label is `Cmd+Opt+2`
- [ ] Slash command `Heading 2` sets the current block to heading level 2
- [ ] Slash command `Heading 3` description is `Subsections`
- [ ] Slash command `Heading 3` shortcut label is `Cmd+Opt+3`
- [ ] Slash command `Heading 3` sets the current block to heading level 3
- [ ] Slash command `Heading 4` description is `Sub-subsections`
- [ ] Slash command `Heading 4` shortcut label is `Cmd+Opt+4`
- [ ] Slash command `Heading 4` sets the current block to heading level 4
- [ ] Slash command `Bullet List` description is `Unordered list`
- [ ] Slash command `Bullet List` shortcut label is `Cmd+Shift+8`
- [ ] Slash command `Bullet List` toggles the current block into a bullet list
- [ ] Slash command `Numbered List` description is `Ordered list`
- [ ] Slash command `Numbered List` shortcut label is `Cmd+Shift+7`
- [ ] Slash command `Numbered List` toggles the current block into an ordered list
- [ ] Slash command `Checklist` description is `Task checklist`
- [ ] Slash command `Checklist` shortcut label is `Cmd+Shift+9`
- [ ] Slash command `Checklist` toggles a task list
- [ ] Slash command `Block Quote` description is `Quote text`
- [ ] Slash command `Block Quote` toggles a blockquote
- [ ] Slash command `Divider` description is `Horizontal rule`
- [ ] Slash command `Divider` inserts a horizontal rule
- [ ] Slash command `Code Block` description is `For statistical code`
- [ ] Slash command `Code Block` toggles a code block using StarterKit

### Slash Commands: Academic Inserts
- [ ] Slash command `Table` description is `Insert data table`
- [ ] Slash command `Table` inserts a `3 x 3` table
- [ ] Slash command `Table` inserts the table with `withHeaderRow: true`
- [ ] Slash command `Table` runs a `requestAnimationFrame(...)` post-pass to add class `academic-table` to the rendered table element
- [ ] Slash command `Image` description is `Insert an image`
- [ ] Slash command `Image` creates a hidden file input rather than opening a URL prompt
- [ ] Slash command `Image` accepts `image/*` files only
- [ ] Cancelling the slash image file picker removes the temporary input and inserts nothing
- [ ] Selecting an image reads the file through `FileReader.readAsDataURL(...)`
- [ ] Slash image insertion inserts a base64 image into the editor
- [ ] Slash command `Abstract` inserts a heading `Abstract`
- [ ] Slash command `Abstract` inserts four following paragraph starters `Background:`, `Methods:`, `Results:`, and `Conclusion:`
- [ ] Slash command `Abstract` bolds each structured heading label inside the inserted paragraphs
- [ ] Slash command `Figure Caption` auto-counts existing `Figure N` paragraphs before inserting the next caption number
- [ ] Slash command `Figure Caption` inserts bold prefix `Figure <n>. `
- [ ] Slash command `Figure Caption` default trailing text is `Caption text here`
- [ ] Slash command `Table Caption` auto-counts existing `Table N` paragraphs before inserting the next caption number
- [ ] Slash command `Table Caption` inserts bold prefix `Table <n>. `
- [ ] Slash command `Table Caption` default trailing text is `Caption text here`
- [ ] Slash command `Footnote` opens `prompt("Enter footnote text:")`
- [ ] Cancelling the footnote prompt inserts no footnote node
- [ ] Slash command `Cite` description is `Insert a citation from your library`
- [ ] Slash command `Cite` shortcut label is `Cmd+Shift+C`
- [ ] Slash command `Cite` opens the citation dialog via `scholarsync:open-citation-dialog`

### Slash Commands: AI Actions and Tool Actions
- [ ] Slash command `Continue Writing` dispatches `scholarsync:ai-action` with `action: "continue"`
- [ ] Slash command `Continue Writing` sends the full editor plain text as `detail.context`
- [ ] Slash command `Outline Section` dispatches `scholarsync:ai-action` with `action: "outline-section"`
- [ ] Slash command `Check Guidelines` dispatches `scholarsync:ai-action` with `action: "check-guidelines"`
- [ ] Slash command `Ask AI` dispatches `scholarsync:ai-action` with `action: "ask"` and no insertion side effect
- [ ] Slash command `Word Count` dispatches `scholarsync:editor-action` with `action: "show-word-count"`
- [ ] Executing a slash command always deletes the typed slash trigger range before running the command

### Custom Keyboard Shortcuts and Extension Configuration
- [ ] Academic keyboard shortcut `Mod-Shift-X` toggles strikethrough
- [ ] Academic keyboard shortcut `Mod-Shift-H` toggles highlight
- [ ] Academic keyboard shortcut `Mod-Shift-K` opens `window.prompt("Enter URL:")`
- [ ] Leaving the keyboard-shortcut link prompt empty does not set a link
- [ ] Academic keyboard shortcut `Mod-Shift-.` toggles superscript
- [ ] Academic keyboard shortcut `Mod-Shift-,` toggles subscript
- [ ] Academic keyboard shortcut `Mod-Shift-F` opens `window.prompt("Footnote text:")`
- [ ] Leaving the keyboard-shortcut footnote prompt empty inserts no footnote node
- [ ] Academic keyboard shortcut `Mod-/` dispatches `scholarsync:editor-action` with `toggle-comment-sidebar`
- [ ] Academic keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:editor-action` with `insert-citation`
- [ ] Academic keyboard shortcut `Mod-Shift-R` dispatches `scholarsync:editor-action` with `toggle-reference-sidebar`
- [ ] Academic keyboard shortcut `Mod-Shift-Enter` inserts a horizontal rule
- [ ] Academic keyboard shortcuts `Mod-Shift-1` through `Mod-Shift-4` toggle heading levels 1 through 4
- [ ] Studio `TiptapEditor` supports heading levels `1` through `6`
- [ ] Studio `TiptapEditor` placeholder text is `Start typing or press '/' for AI commands...`
- [ ] Studio `TiptapEditor` uses `Table.configure({ resizable: true })`
- [ ] Studio `TiptapEditor` allows base64 image insertion through `Image.configure({ allowBase64: true })`
- [ ] Studio `TiptapEditor` enables autolink and link-on-paste behavior through the Link extension
- [ ] Studio `TiptapEditor` enables nested task items
- [ ] Studio `TiptapEditor` mounts the same custom `SlashCommandsExtension`, `OutlinePlugin`, `Footnote`, `CitationNode`, `BibliographyNode`, and citation-numbering plugin as the route editor
- [ ] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a custom math node or math extension in the current source tree
- [ ] Neither `AcademicEditor` nor Studio `TiptapEditor` registers a track-changes extension in the current source tree

### Footnotes, Outline Plugin, Citation Nodes, and Bibliography
- [ ] Footnote nodes are inline atomic nodes and cannot be edited directly in the document body
- [ ] New footnote ids are generated in the form `fn_<timestamp>_<random>`
- [ ] New footnote numbers are assigned as existing footnote count plus one
- [ ] Removing a footnote command deletes the matching node by `id`
- [ ] Footnote renumbering runs in a ProseMirror plugin `appendTransaction(...)`
- [ ] Footnote renumbering updates every footnote node whose stored `number` no longer matches document order
- [ ] Footnote marker HTML renders as a `<sup>` containing the footnote number
- [ ] Hovering a footnote marker waits 300 ms before showing the tooltip editor
- [ ] Footnote tooltip title reads `Footnote <number>`
- [ ] Footnote tooltip textarea saves on blur rather than on every keystroke
- [ ] Footnote tooltip delete button title is `Remove footnote`
- [ ] `FootnoteSection` does not render at all when the editor has zero footnotes
- [ ] `FootnoteSection` heading label is exactly `Footnotes`
- [ ] `FootnoteSection` sorts footnotes by numeric order before rendering
- [ ] Clicking a footnote row in `FootnoteSection` focuses the editor and moves selection to that footnote node position
- [ ] Outline plugin rebuilds the outline on every heading change with a 100 ms debounce
- [ ] Outline plugin still rebuilds section word counts on non-heading content changes using the standard 500 ms debounce
- [ ] Citation nodes are inline atomic nodes with `referenceIds` defaulting to an empty array
- [ ] Citation nodes also support an `overrides` attribute that defaults to `null`
- [ ] Citation keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:open-citation-dialog`
- [ ] Citation chip hover waits 400 ms before opening the tooltip
- [ ] Citation chip click toggles the popover open state and suppresses the hover tooltip
- [ ] Citation chip fallback text is `[?]` when a numeric citation has no assigned numbers
- [ ] Citation chip fallback text is `(?)` when an author-year citation has no resolved reference objects
- [ ] Numeric citation chips compress consecutive numbers into ranges such as `1-3`
- [ ] Citation popover `View` action opens the reference sidebar through the Zustand store before dispatching scroll-to-reference
- [ ] Citation popover `Remove` appears only when the citation node contains more than one `referenceId`
- [ ] Removing the final reference from a citation chip deletes the entire citation node
- [ ] Citation popover footer action label is `Delete citation`
- [ ] Citation numbering plugin debounces renumbering by 100 ms after editor updates
- [ ] Citation numbering assigns numbers on order of first appearance in the document
- [ ] Bibliography insert command refuses to insert a second bibliography node when one already exists
- [ ] Empty bibliography node view text reads `References will appear here when you add citations to your text.`
- [ ] Bibliography node view heading label is `References`
- [ ] Bibliography view uses pre-formatted CSL bibliography entries when `bibliographyEntries.length > 0`
- [ ] Bibliography view falls back to Vancouver-style text formatting when CSL bibliography entries are absent

### Citation Dialog: Shared Modal and Search Tab
- [ ] Citation dialog default active tab is `search` every time the modal opens
- [ ] Citation dialog clears `searchQuery`, `selectedIds`, DOI state, search results, and search errors on every open
- [ ] Citation dialog focuses the search input shortly after opening via a 50 ms timeout
- [ ] Citation dialog closes on backdrop click
- [ ] Citation dialog closes on `Escape`
- [ ] Citation dialog header title is `Insert Citation`
- [ ] Citation dialog tab labels are `Your References`, `Library`, `Paste DOI/PMID`, and `Manual Entry`
- [ ] Citation dialog search-input placeholder is `Search references or paste DOI/PMID...`
- [ ] Search queries starting with `10.` or containing `doi.org/` are treated as DOI identifiers
- [ ] Search queries that are 1 to 8 digits only are treated as PMID identifiers
- [ ] Search-tab non-identifier PubMed search waits 350 ms after typing before requesting `/api/references/search-pubmed`
- [ ] Search-tab PubMed request body includes `query`, `page: 1`, `pageSize: 10`, and `documentId`
- [ ] Search-tab search spinner shows while the PubMed request is pending
- [ ] Search-tab error fallback string is `PubMed search failed. Please try again.`
- [ ] Search-tab empty state text is `No PubMed or reference matches found.` when a typed non-identifier query returns nothing
- [ ] Search-tab empty state text is `No references yet. Add one using DOI/PMID or manual entry.` when there are no saved references and no active text query
- [ ] Search-tab empty state text is `No matching references found.` when local references exist but filtering returns nothing
- [ ] Search-tab identifier-detection banner is a full-width button rather than passive help text
- [ ] Identifier-detection banner label is `Resolve DOI:` or `Resolve PMID:` followed by the typed identifier
- [ ] Search-tab `ArrowDown` moves the focused search row down by one and clamps at the last row
- [ ] Search-tab `ArrowUp` moves the focused search row up by one and clamps at zero
- [ ] Search-tab `Enter` resolves the typed identifier when DOI/PMID detection is active
- [ ] Search-tab `Enter` toggles the currently focused reference row when DOI/PMID detection is not active
- [ ] Search-tab merges local references and PubMed results without duplicate ids
- [ ] Search-tab selected rows show a blue checkbox state
- [ ] Search-tab already-numbered references show a right-side numeric badge like `[3]`

### Citation Dialog: Library, DOI/PMID, and Manual Entry
- [ ] Library-tab data loads lazily on first switch to the `library` tab
- [ ] First library-tab load searches the saved papers library with an empty string
- [ ] Library-tab search input placeholder is `Search your saved papers...`
- [ ] Library-tab search waits 300 ms after typing before calling `searchPapersInLibrary(...)`
- [ ] Library-tab loading state is a centered spinner row
- [ ] Library-tab empty state text is `No papers match your search.` when a filter query returns no papers
- [ ] Library-tab empty state text is `No papers in your library yet. Save papers from the Research page.` when the library is empty
- [ ] Library-tab paper rows show title plus author/journal/year summary text
- [ ] Library-tab added papers are converted to references with ids `ref-paper-<paper.id>`
- [ ] Clicking a library paper that is already in references toggles selection instead of adding a duplicate reference object
- [ ] Library-tab non-selected already-added papers show helper text `Already in references`
- [ ] Resolving an identifier switches the active tab to `doi`
- [ ] DOI-tab label text is `Paste DOI or PMID`
- [ ] DOI-tab input placeholder is `10.1056/NEJMoa2301234 or 37654789`
- [ ] DOI-tab `Resolve` button is disabled when the input is blank
- [ ] DOI-tab `Resolve` button is also disabled while `doiLoading` is true
- [ ] DOI-tab pressing `Enter` with a non-empty input triggers resolution
- [ ] DOI-tab error panel includes a secondary action text `Try manual entry`
- [ ] Clicking `Try manual entry` switches the active tab to `manual`
- [ ] Successful DOI/PMID resolution shows a green preview card with title and condensed author/year/journal metadata
- [ ] DOI preview action label is `Add to References`
- [ ] Adding a resolved reference returns the dialog to the `search` tab
- [ ] Manual-entry `Type` select defaults to `Article`
- [ ] Manual-entry type options are `Article`, `Book`, `Book Chapter`, `Website`, `Guideline`, `Conference`, `Thesis`, and `Preprint`
- [ ] Manual-entry title label includes a required asterisk in `Title *`
- [ ] Manual-entry title placeholder is `Article title`
- [ ] Manual-entry authors placeholder is `John Smith, Jane Doe`
- [ ] Manual-entry journal placeholder is `N Engl J Med`
- [ ] Manual-entry year placeholder is `2024`
- [ ] Manual-entry volume placeholder is `389`
- [ ] Manual-entry issue placeholder is `4`
- [ ] Manual-entry pages placeholder is `312-320`
- [ ] Manual-entry DOI placeholder is `10.1056/NEJMoa...`
- [ ] Manual-entry `Save Reference` button is disabled until the title contains non-whitespace text
- [ ] Manual entry splits authors on commas first, then interprets the last token as family name when needed
- [ ] Manual entry falls back to reference title `Untitled` when the title field is empty at save time
- [ ] Manual entry parses `year` with `parseInt(...)` and falls back to `0` when parsing fails
- [ ] Manual save generates ids in the form `ref_<timestamp>_<random>`
- [ ] After manual save, the manual form resets all fields back to empty values and type `article`
- [ ] After manual save, the dialog returns to the `search` tab
- [ ] When selected references exist, the footer heading reads `Selected (<n>)`
- [ ] Selected-reference pills show first author family name plus year
- [ ] Removing a selected-reference pill leaves the dialog open and only updates `selectedIds`
- [ ] Footer primary action label is `Insert Citation`
- [ ] Footer primary action is hidden entirely when no references are selected

### Reference Sidebar Detailed Behavior
- [ ] Reference-sidebar header title is `References`
- [ ] Reference-sidebar count pill shows the total `references.size`
- [ ] Header plus button title is `Add reference`
- [ ] Header sort trigger title is `Sort`
- [ ] Header close button has no visible label text and closes the sidebar immediately
- [ ] Sort menu options are `By citation #`, `By author`, `By year`, and `By date added`
- [ ] Sort mode defaults to `number`
- [ ] Sort menu closes immediately after choosing a new sort option
- [ ] The sidebar does not register a document-level outside-click listener to close the sort menu
- [ ] Filter input placeholder is `Filter references...`
- [ ] Empty sidebar state headline text is `No references yet.`
- [ ] Empty sidebar action text is `Add your first reference`
- [ ] References are split into cited and uncited groups using `referenceNumberMap.has(ref.id)`
- [ ] The uncited group header label is `Not cited (<n>)`
- [ ] Uncited rows render with reduced opacity
- [ ] Collapsed cited rows show numeric badges like `[4]`
- [ ] Collapsed uncited rows show placeholder badge `[--]`
- [ ] Collapsed rows truncate titles/authors to two lines at most
- [ ] Collapsed rows show `Cited: P<n>` chips only when `citationLocations` data is provided
- [ ] Expanded metadata panel always includes labeled `Title:` and `Authors:` rows
- [ ] Expanded metadata panel shows `Journal:` row only when journal data exists
- [ ] Expanded metadata panel shows `Year:` row only when year data exists
- [ ] Expanded metadata panel shows clickable DOI link only when DOI exists
- [ ] Expanded metadata panel shows clickable PubMed link only when PMID exists
- [ ] Expanded metadata panel wraps abstracts inside a collapsed `<details>` element labeled `Abstract`
- [ ] Expanded action button `Open DOI` appears only when DOI exists
- [ ] Expanded action button `Copy DOI` appears only when DOI exists
- [ ] `Copy DOI` writes `https://doi.org/<doi>` to `navigator.clipboard`
- [ ] Expanded action button `Remove` is right-aligned with `ml-auto`
- [ ] Clicking `Remove` prompts `Remove this reference from the sidebar?`
- [ ] Confirmed sidebar removal deletes the reference from the Zustand reference map immediately
- [ ] Deleting the currently expanded reference collapses it by clearing `expandedId`
- [ ] `scholarsync:scroll-to-reference` expands the target reference before scrolling it into view
- [ ] Scroll-to-reference uses `scrollIntoView({ behavior: "smooth", block: "center" })`
- [ ] The current ReferenceSidebar does not expose any citation-style switching control in its rendered UI

### Comment Sidebar Local Storage and Threading
- [ ] Comment-sidebar local storage prefix is `scholarsync_comments_`
- [ ] Comment ids are generated in the form `cmt_<timestamp>_<random>`
- [ ] Comment-sidebar reads local comment threads on initial mount
- [ ] Comment-sidebar re-reads local comment threads after each add, reply, resolve, unresolve, or delete action
- [ ] Local comment threads sort unresolved top-level comments before resolved top-level comments
- [ ] Within the same resolved/unresolved group, top-level threads sort newest first by `createdAt`
- [ ] Replies inside a thread sort oldest first by `createdAt`
- [ ] New local comments always use `userId: "local-user"`
- [ ] New local comments default `userName` to `You` when no custom `userName` is supplied
- [ ] New local comments default `isResolved` to `false`
- [ ] Pending inline-comment adds preserve `textRangeStart`, `textRangeEnd`, and `quotedText`
- [ ] General document comments save `textRangeStart`, `textRangeEnd`, and `quotedText` as `null`
- [ ] Reply comments save `parentCommentId` pointing to the parent top-level comment
- [ ] Deleting a top-level comment also deletes all of its replies from local storage
- [ ] Comment count helper counts top-level threads only, not replies
- [ ] Comment count helper unresolved total counts only unresolved top-level threads
- [ ] Comment-sidebar empty state title is `No comments yet`
- [ ] Comment-sidebar empty-state helper reads `Select text and click the comment button to start`
- [ ] Inline pending comment input placeholder is `Add a comment...`
- [ ] Bottom new-comment input placeholder is `Add a general comment about this document...`
- [ ] Reply input placeholder is `Write a reply...`
- [ ] Pending inline comment input submits on `Enter` only when `Shift` is not held
- [ ] Pending inline comment `Add` button is disabled when the trimmed input is empty
- [ ] Top-level quoted-text buttons call `scrollToComment(...)` to reselect the original editor range
- [ ] Top-level actions include `Resolve` or `Unresolve`, `Reply`, and `Delete`
- [ ] Reply bubbles do not render their own resolve or reply controls
- [ ] Delete controls appear only when `comment.userId === "local-user"`

### Version History and Export Dialog Details
- [ ] Version-history loading state is spinner-only with no text label
- [ ] Version-history empty-state text is `No versions yet`
- [ ] Manual version save prompt text is `Version name (e.g., 'Before methods rewrite'):`
- [ ] Cancelling the version-name prompt inserts no manual version
- [ ] Restore confirm text is `Restore this version? Your current content will be saved as a version first.`
- [ ] Restore flow auto-saves the current first section before writing the selected version snapshot back
- [ ] Version-history preview modal title is `Version Preview`
- [ ] Version-history preview renders `JSON.stringify(content, null, 2)` inside a `<pre>`
- [ ] Version badge `○` marks auto-saved versions
- [ ] Version badge `●` marks manual versions
- [ ] Version labels fall back to `Auto-save` when `autoSaved` is true and no custom name exists
- [ ] Version labels fall back to `Manual save` when `autoSaved` is false and no custom name exists
- [ ] Editor export dialog default format is `docx`
- [ ] Editor export dialog defaults `doubleSpaced` to checked
- [ ] Editor export dialog defaults `includePageNumbers` to checked
- [ ] Editor export dialog format buttons are `DOCX` and `PDF`
- [ ] Editor export dialog primary button label changes from `Export` to `Exporting...` while work is in progress
- [ ] Editor export dialog DOCX filename strips non-alphanumeric and non-space characters before replacing spaces with underscores
- [ ] Editor export dialog PDF path uses `window.print()` rather than generating a PDF blob
- [ ] Export-dialog failures do not show an inline error message and only log `Export failed:` to the console
- [ ] Studio `/api/export/pdf` route returns a binary PDF attachment, even though the Studio page currently treats the response as HTML text
- [ ] Studio `/api/export/docx` route supports page-numbered DOCX output on the server, even though the Studio page exposes no page-number toggle

### Studio Left Rail, Mode Controls, and Document Loading
- [ ] Studio reads `projectId` from the initial query string and converts it with `Number(...)`
- [ ] Studio initializes Learn mode only when the initial query string contains `mode=learn`
- [ ] Studio left-rail title input has no placeholder and always reflects `docTitle`
- [ ] Studio `Write` button applies brand styling only when Learn mode is off
- [ ] Studio `Learn` button applies emerald styling only when Learn mode is on
- [ ] Studio project selector is hidden when the user has zero or one project
- [ ] Studio project selector selected-label fallback text is `Select project`
- [ ] Studio project-selector dropdown closes on outside `mousedown`
- [ ] Selecting the already-active project from the project selector is a no-op in the hook
- [ ] Switching Studio projects clears `initialContent` to `null` before the new project document loads
- [ ] Switching Studio projects also clears `document` state and resets save status to `idle`
- [ ] Studio navigation item labels are `Current Draft`, `My Library`, and `Literature Search`
- [ ] Studio references summary header shows `References (<n>)` using total references in the store rather than cited-only count
- [ ] Left-rail empty citation helper reads `Use Cmd+Shift+C to add citations`
- [ ] Left-rail summary truncates to the first five numbered citations sorted by citation order
- [ ] Left-rail `View all <n> references` button appears only when `references.size > 5`
- [ ] Studio AI-credits widget falls back to `0 / 50000` when usage stats fail to load
- [ ] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [ ] Write-mode intensity descriptions are `AI is quiet — only responds when you ask`, `AI assists with completions and suggestions`, and `AI is proactive — full suggestions and sidebar`
- [ ] Learn-mode banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Learn-mode document-type trigger default text is `Select document type`
- [ ] Learn-mode stage tracker renders only after a guide document type has been selected
- [ ] Learn-mode stage buttons are `Understand`, `Plan`, `Outline`, `Draft`, `Revise`, and `Polish`
- [ ] Completed Learn-mode stages render a lighter emerald style while the active stage renders solid emerald
- [ ] Studio `docLoading` screen text is `Loading document...`
- [ ] Studio `docError` screen renders the raw hook error string without extra fallback copy

### Studio Chat, Prompt Construction, Research, Checks, and Export Wiring
- [ ] Studio first chat submit lazily creates a conversation record through `createConversation(...)`
- [ ] New Studio conversation titles are truncated to the first 80 characters of the first user message
- [ ] Studio always writes the user chat message to the conversation table optimistically with `.catch(() => {})`
- [ ] Chat POST body sends only `{ role, content }` pairs from the in-memory message list
- [ ] Learn-mode chat adds `guideContext.documentType` only when `guideDocType` is set
- [ ] Learn-mode chat always sends `guideContext.stage` when `guideDocType` is set
- [ ] Learn-mode chat sends `guideContext.projectTitle` only when the title is not `Untitled Document`
- [ ] Write-mode chat always sends `draftContext.intensity`
- [ ] Write-mode chat sends `draftContext.projectTitle` only when the title is not `Untitled Document`
- [ ] Studio chat API selects `getGuideSystemPrompt(...)` only when `mode === "learn"` and both `guideContext.documentType` and `guideContext.stage` exist
- [ ] Studio chat API falls back to `getDefaultGuidePrompt()` when Learn mode lacks full guide context
- [ ] Studio chat API selects `getDraftSystemPrompt(...)` only when `mode === "draft"` and `draftContext.intensity` exists
- [ ] Studio chat API falls back to `getDefaultDraftPrompt()` when Draft mode lacks intensity context
- [ ] Draft prompt builder layers the base prompt, intensity overlay, optional ScholarRules, and optional document context in that order
- [ ] Guide prompt builder is stage-based and document-type-based rather than a single static system prompt string
- [ ] Studio chat API returns `Authentication required.` with HTTP 401 when auth fails
- [ ] Studio chat API returns `Invalid request. Please check your input and try again.` with HTTP 400 when zod validation fails
- [ ] Studio chat API returns `AI service is not configured. Please contact an administrator.` with HTTP 503 when models are unavailable
- [ ] Studio chat API returns `An unexpected error occurred. Please try again.` with HTTP 500 for uncaught server errors
- [ ] Studio page turns non-OK chat responses into the visible `chatError` banner without appending an assistant message
- [ ] Studio page appends an empty assistant message before streaming response chunks into it
- [ ] Streaming assistant content is persisted back to conversations only after the final chunk has been received
- [ ] `scholarsync:ai-action` `continue` prompt starts `Continue writing from where the user left off.`
- [ ] `scholarsync:ai-action` `outline-section` prompt starts `Create a concise bullet outline for the current section`
- [ ] `scholarsync:ai-action` `check-guidelines` prompt starts `Review this draft against the most relevant reporting guideline checklist`
- [ ] `scholarsync:ai-action` `precision-edit` prompt starts `Improve the clarity, precision, and academic tone`
- [ ] `scholarsync:ai-action` `summarize` prompt starts `Summarize the following text concisely:`
- [ ] `scholarsync:ai-action` `cite` prompt is the fixed question `Help me add a citation from my library. What paper should I cite here?`
- [ ] `scholarsync:ai-action` `ask` focuses the chat input and does not auto-send any message
- [ ] `scholarsync:ai-action` `find-sources` opens the ResearchSidebar instead of sending a chat message
- [ ] `find-sources` seeds research query text from only the first 200 characters of editor context
- [ ] `scholarsync:ai-action` `integrity-check` switches directly to the `Checks` tab and does not auto-run chat
- [ ] Studio `show-word-count` action writes a synthetic assistant chat message instead of opening a modal
- [ ] Studio word-count assistant message starts with `Section word counts:` when section headings exist
- [ ] Studio word-count assistant message falls back to `Document word count: <n> words` when no section headings exist
- [ ] Studio comment action dispatch always includes `quotedText` extracted from the current selection
- [ ] Studio citation insertion restores the saved text selection before inserting a citation node when possible
- [ ] Successful Studio citation insertion auto-appends a bibliography node when missing
- [ ] Studio citation notice auto-clears after 2500 ms
- [ ] Research-to-editor citation insertion creates ids in the form `ref-research-<stableKey>`
- [ ] Research quick-search button opens the ResearchSidebar only when the query is non-empty
- [ ] Checks tab feeds `IntegrityPanel` plain text from `editorRef.current?.view.dom.innerText?.trim()` before falling back to `editor.getText(...)`
- [ ] Studio export dropdown items are `Export as PDF` and `Export as Word`
- [ ] Studio export dropdown closes immediately before either network request is started
- [ ] Studio `handleExportPDF()` posts `{ title, content }` HTML to `/api/export/pdf`
- [ ] Studio `handleExportPDF()` silently returns when editor HTML content is empty
- [ ] Studio `handleExportPDF()` does nothing visible when the HTTP response is non-OK
- [ ] Studio `handleExportPDF()` reads the response as text and writes it into a newly opened window
- [ ] Studio `handleExportDocx()` posts `{ title, content }` HTML to `/api/export/docx`
- [ ] Studio `handleExportDocx()` silently returns when editor HTML content is empty
- [ ] Studio Word export downloads a `.doc` filename even though the backend route returns DOCX bytes
- [ ] Studio export failures log `PDF export failed:` or `DOCX export failed:` to the console and show no inline toast

### Verified Current-Behavior Corrections from Pass 1
- [ ] `/editor/[id]` still has no dedicated route-level loading file; only the route-level error boundary file exists
- [ ] The editor-route `DotsThree` button remains visually present but unwired
- [ ] Version-history preview still renders raw JSON rather than rich text
- [ ] Studio export still uses a lightweight dropdown rather than the editor-route modal
- [ ] Studio export dropdown still lacks any outside-click dismissal listener
- [ ] The live editor route surface is still `/editor/[id]` plus `/studio`; `/editor/new` is still absent from the app tree
- [ ] The keyboard-shortcuts dialog still advertises `Cmd + /` for comments while actual comment toggling depends on custom event wiring
- [ ] Track changes are still not implemented for the editor route; the store comment still marks suggesting mode as post-beta/planned
- [ ] Citation-style switching is still absent from the current reference sidebar UI
- [ ] Math insertion is still not implemented as a custom editor extension in the current editor stack
