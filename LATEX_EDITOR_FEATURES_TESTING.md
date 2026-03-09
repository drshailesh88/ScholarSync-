# ScholarSync LaTeX Editor — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the LaTeX Editor pages (`/latex`, `/latex/new`, `/latex/[projectId]`).
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Project List Page](#2-project-list-page)
3. [New Paper Page — Template & Compiler Selection](#3-new-paper-page--template--compiler-selection)
4. [LaTeX Workspace — Layout & Panels](#4-latex-workspace--layout--panels)
5. [Top Bar](#5-top-bar)
6. [Source Editor (CodeMirror 6)](#6-source-editor-codemirror-6)
7. [Visual Editor (WYSIWYM)](#7-visual-editor-wysiwym)
8. [Preview Panel](#8-preview-panel)
9. [Compilation System](#9-compilation-system)
10. [Error Gutter Panel](#10-error-gutter-panel)
11. [File Tree Sidebar](#11-file-tree-sidebar)
12. [Image Browser](#12-image-browser)
13. [Comment Panel](#13-comment-panel)
14. [Agent Panel — AI Assistant](#14-agent-panel--ai-assistant)
15. [Inline AI Bar](#15-inline-ai-bar)
16. [Slash Command Menu](#16-slash-command-menu)
17. [LaTeX Autocompletion](#17-latex-autocompletion)
18. [AI Code Completion](#18-ai-code-completion)
19. [Spell Check](#19-spell-check)
20. [Track Changes](#20-track-changes)
21. [Version History](#21-version-history)
22. [Collaboration (Real-time)](#22-collaboration-real-time)
23. [Citation System](#23-citation-system)
24. [Export](#24-export)
25. [Save System](#25-save-system)
26. [Keyboard Shortcuts — Complete Reference](#26-keyboard-shortcuts--complete-reference)
27. [Mobile & Responsive Design](#27-mobile--responsive-design)
28. [Error Handling & Edge Cases](#28-error-handling--edge-cases)
29. [Quick Test Workflows](#29-quick-test-workflows)

---

## 1. Page Overview

The LaTeX Editor consists of **three** pages:

| Page | Route | Purpose |
|------|-------|---------|
| **Project List** | `/latex` | Dashboard listing all LaTeX projects |
| **New Paper** | `/latex/new` | Template selection & project creation |
| **Editor Workspace** | `/latex/[projectId]` | Full LaTeX editing environment |

---

## 2. Project List Page

**Route**: `/latex`

- [ ] **Page header** — "LaTeX Editor" title with subtitle "Write, preview, and compile LaTeX papers"
- [ ] **"New Paper" button** — links to `/latex/new`
- [ ] **Project cards** — each shows:
  - [ ] Project title (truncated if long)
  - [ ] Last updated date (formatted: "Mar 9, 2026")
  - [ ] Compiler type label (pdflatex/xelatex/lualatex)
  - [ ] Article icon with brand color
- [ ] **Click project card** — navigates to `/latex/[projectId]`
- [ ] **Delete button** — appears on hover (trash icon), removes project immediately (optimistic UI)
- [ ] **Loading state** — spinner while fetching projects
- [ ] **Empty state** — icon + "No papers yet" message + "Create Paper" button

---

## 3. New Paper Page — Template & Compiler Selection

**Route**: `/latex/new`

### Title Input
- [ ] **Title field** — text input, placeholder "Untitled Paper"
- [ ] **Enter key** — triggers create action
- [ ] Defaults to "Untitled Paper" if left empty

### Template Selection (12 templates)

#### General Templates
| Template | Description | Test |
|----------|-------------|------|
| **Blank Document** | Standard article with sections and bibliography | [ ] Select and verify |
| **IEEE Conference** | Two-column format with structured sections | [ ] Select and verify |
| **Nature** | Nature journal style with line numbers | [ ] Select and verify |
| **Thesis** | Multi-chapter report with TOC and appendices | [ ] Select and verify |
| **Elsevier** | Elsevier with highlights & graphical abstract | [ ] Select and verify |

#### Medical & Clinical Templates
| Template | Description | Test |
|----------|-------------|------|
| **IJMR** | Indian Journal of Medical Research format | [ ] Select and verify |
| **JAPI** | J. Assoc. Physicians of India format | [ ] Select and verify |
| **JAMA** | JAMA structured research article | [ ] Select and verify |
| **Lancet** | The Lancet with Research in Context panel | [ ] Select and verify |
| **BMJ** | BMJ with What This Study Adds box | [ ] Select and verify |
| **Case Report** | CARE-guideline compliant case report | [ ] Select and verify |
| **Systematic Review** | PRISMA-compliant review & meta-analysis | [ ] Select and verify |

- [ ] **Selected template** — highlighted with brand border and ring
- [ ] Templates have category headers: "General" and "Medical & Clinical"
- [ ] Each card shows icon (color-coded) + label + description

### Compiler Selection
| Compiler | Test |
|----------|------|
| **pdflatex** (default) | [ ] Select and verify |
| **xelatex** | [ ] Select and verify |
| **lualatex** | [ ] Select and verify |

- [ ] Selected compiler highlighted with brand color

### Create Action
- [ ] **"Create Paper" button** — creates project and redirects to editor
- [ ] **Loading state** — spinner + disabled button during creation
- [ ] **Error state** — red error box below button
- [ ] **Back button** — arrow left navigates to `/latex`

---

## 4. LaTeX Workspace — Layout & Panels

**Route**: `/latex/[projectId]`

The workspace is a multi-panel layout wrapped in a `YjsCollaborationProvider`:

```
┌──────────────────────────────────────────────────────────────┐
│                         Top Bar                              │
├────────┬───────────────────┬──────────────────┬──────────────┤
│  File  │                   │                  │    Agent     │
│  Tree  │   Source/Visual   │  Preview Panel   │    Panel     │
│Sidebar │     Editor        │  (Live / PDF)    │  (AI Asst)   │
│        │                   │                  │              │
│        ├───────────────────┤                  │              │
│        │  Error Gutter     │                  │              │
├────────┴───────────────────┴──────────────────┴──────────────┤
│               Floating: InlineAiBar, SlashCommandMenu        │
└──────────────────────────────────────────────────────────────┘
```

### Panel Visibility
- [ ] **File tree** — toggle with `Cmd+B` or left-edge tab button
- [ ] **Agent panel** — toggle with `Cmd+J` or right-edge tab button
- [ ] **Both panels** can be open simultaneously on desktop
- [ ] Panels resize responsively based on viewport

### Page Loading
- [ ] **Loading state** — spinner + "Loading editor..."
- [ ] **Retry logic** — 3 attempts with exponential backoff (300ms, 600ms, 900ms)
- [ ] **Error state** — error card with "Retry" and "Back to Papers" buttons

---

## 5. Top Bar

### Left Section
- [ ] **Project title** — click-to-rename inline editing
- [ ] **Save status indicator**:
  - [ ] Saving — animated icon + "Saving..."
  - [ ] Saved — green check + "Saved" + timestamp
  - [ ] Unsaved — amber icon + "Unsaved"
  - [ ] Error — red icon + error state

### Center Section — Mode Toggles

#### Editing Mode
| Mode | Description | Test |
|------|-------------|------|
| **Edit** | Direct editing | [ ] Verify full editing works |
| **Suggest** | Track changes mode | [ ] Verify changes are tracked |
| **View** | Read-only | [ ] Verify editor is non-editable |

#### Editor Mode
| Mode | Description | Test |
|------|-------------|------|
| **Source** | CodeMirror source editor | [ ] Shows raw LaTeX |
| **Visual** | WYSIWYM visual editor | [ ] Shows styled decorations |

#### Preview Mode
| Mode | Description | Test |
|------|-------------|------|
| **Live** | Client-side KaTeX rendering | [ ] Real-time HTML preview |
| **PDF** | Compiled PDF viewer | [ ] Shows PDF after compilation |

### Right Section
- [ ] **Compile button** — with status indicator (idle/compiling/success/error)
- [ ] **Export dropdown** — three options:
  - [ ] Download PDF
  - [ ] Download .tex
  - [ ] Download as .zip
- [ ] **Collaborator avatars** — shows active users

---

## 6. Source Editor (CodeMirror 6)

The primary code editor for LaTeX source files.

### Syntax Highlighting
- [ ] **Keywords** — violet color
- [ ] **Strings** — green color
- [ ] **Comments** — slate/italic
- [ ] **Brackets** — orange color
- [ ] **Light/dark theme** — adapts to app theme

### Editor Features
- [ ] **Line numbers** — displayed in gutter
- [ ] **Code folding** — fold gutter for collapsing sections
- [ ] **Bracket matching** — matching brackets highlighted
- [ ] **Auto-close brackets** — typing `{` auto-inserts `}`
- [ ] **Search and replace** — built-in CodeMirror search
- [ ] **Rectangular selection** — Alt+drag for column selection
- [ ] **Active line highlighting** — current line has background
- [ ] **Linting gutter** — error/warning markers in gutter
- [ ] **Spellcheck** — enabled via extension

### Scroll Sync
- [ ] **Editor scroll** updates preview scroll position
- [ ] Line number tracking via `onScrollLine` callback

### Slash Command Detection
- [ ] Typing `/` at line start triggers slash command menu
- [ ] Provides screen coordinates for menu positioning
- [ ] Dynamic filtering as user types after `/`

### Diagnostic Display
- [ ] Inline error/warning markers from compilation
- [ ] Auto-scroll to first error on compilation failure
- [ ] Severity levels: error (red) and warning (amber)

### Editor API (exposed via ref)
- [ ] `getSelection()` — returns selected text
- [ ] `insertAtCursor(text)` — inserts text at cursor
- [ ] `setContent(text)` — replaces editor content
- [ ] `scrollToLine(line)` — scrolls to specific line
- [ ] `getView()` — returns CodeMirror view instance
- [ ] `setDiagnostics(diagnostics)` — sets inline error markers
- [ ] `clearDiagnostics()` — removes all markers

---

## 7. Visual Editor (WYSIWYM)

Alternative to source editor — shows formatted decorations over LaTeX source.

- [ ] **Section headings** — `\section{}` renders as h1-style, `\subsection{}` as h2, `\subsubsection{}` as h3
- [ ] **Bold text** — `\textbf{}` shows visual bold styling
- [ ] **Italic text** — `\textit{}` shows visual italic styling
- [ ] **Underline** — `\underline{}` shows underline decoration
- [ ] **Monospace** — `\texttt{}` shows monospace styling
- [ ] **Maintains underlying LaTeX source** — decorations don't change the source
- [ ] Content changes trigger `onChange` callback

---

## 8. Preview Panel

Dual-mode preview for the LaTeX document.

### Live Preview (KaTeX)
Client-side LaTeX-to-HTML conversion:
- [ ] **Title/Author/Date** — extracted from `\title{}`, `\author{}`, `\date{}`
- [ ] **Sections** — `\section`, `\subsection`, `\subsubsection` rendered as headings
- [ ] **Abstract** — `\begin{abstract}...\end{abstract}` rendered with styling
- [ ] **Math rendering** via KaTeX:
  - [ ] Display math: `$$ ... $$` and `\[ ... \]`
  - [ ] Inline math: `$ ... $` and `\( ... \)`
  - [ ] Equation environment: `\begin{equation}...\end{equation}`
  - [ ] Align environment: `\begin{align}...\end{align}`
- [ ] **Lists** — itemize, enumerate, description environments
- [ ] **Tables** — tabular environment conversion
- [ ] **Text formatting** — bold, italic, underline, monospace
- [ ] **Preamble removal** — `\usepackage` and other preamble content hidden
- [ ] **Styling** — Computer Modern Serif font, LaTeX-like appearance
- [ ] **Scroll sync** — preview follows editor scroll position
- [ ] **Error handling** — graceful fallback when math rendering fails
- [ ] **Dark mode support** — adapts colors

### PDF Preview
- [ ] **Embedded PDF viewer** — shows compiled PDF
- [ ] Displayed after successful compilation
- [ ] Auto-switches to PDF mode on compilation success

---

## 9. Compilation System

### Compile Trigger
- [ ] **Compile button** in top bar
- [ ] **Cmd+Enter** keyboard shortcut
- [ ] **`/fix` slash command** — triggers compilation
- [ ] **Auto-saves** current file before compiling

### Compilation Pipeline
1. [ ] Save current file to database
2. [ ] POST to `/api/latex/compile` with project ID
3. [ ] Server-side Docker compilation (respects selected compiler)
4. [ ] Return PDF blob + error diagnostics
5. [ ] Display in preview panel or show errors

### Compilation Status
- [ ] **Idle** — compile button ready
- [ ] **Compiling** — loading state on button
- [ ] **Success** — success indicator, auto-switches preview to PDF mode
- [ ] **Error** — error indicator, diagnostics displayed in error gutter

### Retry Logic
- [ ] **Rate limit (429)** — waits `Retry-After` seconds, retries up to 2 times
  - Shows message: "Compiler busy — retrying in Xs (attempt N/2)..."
- [ ] **Service unavailable (502/503/504)** — retries with 2s delay, up to 2 times
  - Shows message: "Compiler service unavailable — retrying..."
  - Final failure: "The LaTeX compiler service is currently unavailable..."
- [ ] **Network error** — retries up to 2 times with 2s delay
  - Shows message: "Connection failed — retrying..."

---

## 10. Error Gutter Panel

Displayed below the editor when compilation produces errors.

- [ ] **Error/warning count** — summary bar at top
- [ ] **Scrollable list** — max-height 48 lines
- [ ] **Each diagnostic shows**:
  - [ ] Line number
  - [ ] Error message
  - [ ] Severity (error = red, warning = amber)
- [ ] **Click to jump** — clicking a diagnostic scrolls editor to that line

### AI Error Intelligence
- [ ] **Error categorization** — Syntax, Package, Math, Reference, Font, File, Other
- [ ] **Human-readable explanations** — AI-enriched error descriptions
- [ ] **Suggested fixes** — actionable fix suggestions
- [ ] **"Fix this error" button** — calls `/api/latex/generate` with error context:
  - Sends surrounding context (2 lines before/after error)
  - Streams AI-generated fix
  - Replaces the error context in the editor
  - Fallback: copies fix to clipboard if editor replacement fails

---

## 11. File Tree Sidebar

Left sidebar with three tabs: **Files**, **Figures**, **Comments**.

### Files Tab
- [ ] **Hierarchical file browser** — folder nesting support
- [ ] **File icons by type**:
  - `.tex` — green icon
  - `.bib` — amber icon
  - `.sty` / `.cls` — violet icon
  - Images — blue icon
- [ ] **Main file indicator** — marks the main `.tex` file
- [ ] **Create new file** — with file type selection
- [ ] **Rename file** — inline rename
- [ ] **Delete file** — with confirmation
- [ ] **Click file** — loads content into editor

### Document Outline
- [ ] Extracts headings from LaTeX: `\section`, `\subsection`, `\subsubsection`
- [ ] **Jump-to-line** — clicking a heading scrolls editor to that line
- [ ] **"Draft this section" button** — opens Agent Panel Draft tab with section context

### File Sync
- [ ] Content changes in editor update the local file list
- [ ] File content persists across tab switches

---

## 12. Image Browser

Accessible from the **Figures** tab in the file tree sidebar.

- [ ] **Upload** — accepts PNG, JPG, PDF files (10MB max)
- [ ] **Drag-and-drop** — drop files to upload
- [ ] **Image gallery** — thumbnail previews with file size
- [ ] **Delete** — remove uploaded images
- [ ] **One-click LaTeX insertion** — generates and inserts:
  ```latex
  \begin{figure}[h]
    \centering
    \includegraphics[width=\textwidth]{filename}
    \caption{Caption text here}
    \label{fig:filename}
  \end{figure}
  ```

---

## 13. Comment Panel

Accessible from the **Comments** tab in the file tree sidebar.

- [ ] **Per-line threaded comments** — comments attached to specific line numbers
- [ ] **Reply chains** — threaded replies on each comment
- [ ] **Resolve/Unresolve** — toggle resolution status
- [ ] **Author tracking** — shows who wrote each comment
- [ ] **Jump-to-line** — clicking a comment scrolls editor to that line
- [ ] **Comment CRUD** — create, read, update, delete via `/api/latex/comments`

---

## 14. Agent Panel — AI Assistant

Right sidebar with **four tabs**: Draft, Learn, Cite, Check.

### Draft Tab
- [ ] **Streaming chat** — real-time AI responses via Claude Sonnet
- [ ] **Smart context windowing**:
  - [ ] Extracts current section from document
  - [ ] Includes document outline for context
- [ ] **Section drafting** — drag-and-drop from file tree outline
  - File tree "Draft this section" button dispatches `latex:draft-section` event
- [ ] **Two intensity levels**: "collaborate" and "accelerate"
- [ ] **Streaming response** — token-by-token display

### Learn Tab
- [ ] **50+ LaTeX concepts database** organized by category:
  - [ ] Basics
  - [ ] Formatting
  - [ ] Math
  - [ ] Structures
  - [ ] References
  - [ ] Advanced
- [ ] **Concept viewer** with:
  - [ ] Explanation text
  - [ ] LaTeX code example
  - [ ] **Copy-to-clipboard** button
  - [ ] **Next concept** navigation
- [ ] **Full-text search** across concepts and categories
- [ ] **Category browsing** — click category to filter

### Cite Tab
- [ ] **PubMed + Semantic Scholar search** — integrated literature search
- [ ] **One-click citation insertion**:
  - [ ] Auto-generates BibTeX entry
  - [ ] Inserts `\cite{key}` at cursor position in editor
  - [ ] Creates `references.bib` file if it doesn't exist
  - [ ] Appends to existing `.bib` file if present
- [ ] **Citation format** — Author Year style keys
- [ ] **10 results per search** limit
- [ ] Uses `latex:insert-bibtex` custom event for editor integration

### Check Tab (Client-side, no AI)
Six quality checks:
- [ ] **Unused labels** — warns on `\label{}` not referenced by `\ref{}`
- [ ] **Undefined references** — errors on `\ref{}` without matching `\label{}`
- [ ] **Unused bibliography entries** — warns on `.bib` entries not cited
- [ ] **Missing `\label` after `\section`** — warns on unlabeled sections
- [ ] **Package conflicts** — detects conflicts:
  - cite + natbib
  - subfigure + subcaption
  - (and other known conflicts)
- [ ] **Environment matching** — validates `\begin{}`/`\end{}` balance

---

## 15. Inline AI Bar

Floating AI suggestion bar triggered by text selection.

- [ ] **Trigger** — `Cmd+K` with text selected in the editor
- [ ] **Positioning** — appears near the selection (8px below)
- [ ] **Single AI suggestion** — sends selected text for AI rewrite
- [ ] **Replace button** — replaces selected text with AI suggestion in editor
- [ ] **Dismiss button** — closes the bar without changes
- [ ] **Escape key** — dismisses the bar

---

## 16. Slash Command Menu

Command palette triggered by typing `/` in the editor.

| Command | ID | AI? | Action | Test |
|---------|----|-----|--------|------|
| **Cite** | `cite` | No | Opens Cite tab in Agent Panel | [ ] Verify |
| **Fix** | `fix` | No | Triggers compilation | [ ] Verify |
| **Template** | `template` | No | Inserts `\section{}\n\n` | [ ] Verify |
| **Bibliography** | `bib` | No | Inserts `\bibliography{references}\n\bibliographystyle{plain}\n` | [ ] Verify |
| **Table** | `table` | AI | Opens Draft tab for AI table generation | [ ] Verify |
| **Figure** | `figure` | AI | Opens Draft tab for AI figure generation | [ ] Verify |
| **Equation** | `equation` | AI | Opens Draft tab for AI equation generation | [ ] Verify |
| **TikZ** | `tikz` | AI | Opens Draft tab for AI TikZ diagram generation | [ ] Verify |

### Slash Menu UX
- [ ] Appears when `/` typed at line start
- [ ] **Dynamic filtering** — updates as user types after `/`
- [ ] **Positioned** near cursor using screen coordinates
- [ ] **Escape** dismisses the menu
- [ ] After selecting command, the `/` text is removed from editor

---

## 17. LaTeX Autocompletion

Built-in completions for LaTeX editing (no AI required).

- [ ] **100+ LaTeX commands** — `\section`, `\begin`, `\usepackage`, etc.
- [ ] **Environment completions** — `\begin{...}\end{...}` pairs
- [ ] **Citation key completions** — reads from `.bib` file content
- [ ] **Label/reference completions** — auto-completes `\ref{}` from existing `\label{}`
- [ ] **Boost scoring** — frequently used commands ranked higher

---

## 18. AI Code Completion

AI-powered intelligent code completion.

- [ ] **Context-aware suggestions** — considers surrounding LaTeX code
- [ ] **Streaming responses** — suggestions stream in
- [ ] Uses `/api/latex/complete` endpoint

---

## 19. Spell Check

- [ ] **CodeMirror extension** — integrated spell checking
- [ ] **Server-side** — uses `/api/latex/spell-check` endpoint
- [ ] **LaTeX-aware** — ignores LaTeX commands, only checks natural text
- [ ] **Dictionary integration** — standard dictionary support

---

## 20. Track Changes

Available when editing mode is set to "Suggest".

### Track Changes Panel
- [ ] **Pending edits list** — shows all suggested changes
- [ ] **Per-change actions** — Accept / Reject buttons
- [ ] **Batch actions** — "Accept All" / "Reject All"
- [ ] **Status filtering** — filter by: pending, accepted, rejected, all
- [ ] **Change details** — shows context of each change

### Track Changes Extension
- [ ] **Visual highlighting** — pending changes highlighted in editor
- [ ] **CodeMirror extension** — integrates with editor state
- [ ] **Sync with store** — changes tracked in Zustand store
- [ ] **Server sync** — accept/reject synced via `/api/latex/track-changes`

---

## 21. Version History

- [ ] **Snapshot-based** — save/restore full file snapshots
- [ ] **Load versions** from server via `/api/latex/versions`
- [ ] **Restore version** — replace current content with snapshot
- [ ] **Delete old versions** — clean up
- [ ] **Timestamp tracking** — each version stamped with date/time

---

## 22. Collaboration (Real-time)

Built on **Yjs + WebSocket** for real-time multi-user editing.

### YjsCollaborationProvider
- [ ] **CRDT-based** — conflict-free concurrent editing
- [ ] **WebSocket connection** — real-time sync
- [ ] **Connection status tracking** — connected/disconnected states

### Collaboration Cursors
- [ ] **Remote cursor display** — see other users' cursor positions
- [ ] **Color-coded** — each collaborator has a unique color
- [ ] **Real-time tracking** — cursors move as users type

### Collaborator Awareness
- [ ] **User presence** — see who is currently editing
- [ ] **Avatars in top bar** — collaborator profile pictures/initials
- [ ] **Typing status** — indication when others are typing
- [ ] **Selection awareness** — see what others have selected

---

## 23. Citation System

### Citation Search (Cite Tab)
- [ ] Search PubMed and Semantic Scholar databases
- [ ] Results show author, title, year
- [ ] Up to 10 results per search

### Citation Insertion Flow
1. [ ] Search for paper in Cite tab
2. [ ] Click to insert — dispatches `latex:insert-bibtex` event
3. [ ] Auto-generates BibTeX entry with proper formatting
4. [ ] **If no `.bib` file exists** — creates `references.bib` with the entry
5. [ ] **If `.bib` file exists** — appends entry to existing file
6. [ ] Inserts `\cite{authorYear}` at cursor in editor
7. [ ] File tree updates to show new/updated `.bib` file

### Fallback
- [ ] If `.bib` file creation fails, BibTeX is copied to clipboard

---

## 24. Export

Three export formats available from the top bar dropdown:

### Download PDF
- [ ] Downloads the compiled PDF blob
- [ ] Filename: `{projectTitle}.pdf` (sanitized)
- [ ] Requires successful compilation first
- [ ] Button disabled if no compiled PDF available

### Download .tex
- [ ] Downloads the current editor content as `.tex` file
- [ ] Filename: `main.tex`
- [ ] MIME type: `text/x-tex`
- [ ] Always available (doesn't require compilation)

### Download as .zip
- [ ] Bundles **all project files** (`.tex`, `.bib`, images, etc.) into a ZIP
- [ ] Uses JSZip library (dynamically imported)
- [ ] Filename: `{projectTitle}.zip` (sanitized)
- [ ] Preserves file paths from project structure

---

## 25. Save System

### Auto-save
- [ ] **Debounced** — saves 1500ms after last keystroke
- [ ] **Per-file tracking** — saves the currently active file
- [ ] File tree stays in sync with editor content
- [ ] Save state managed in Zustand store

### Manual Save
- [ ] **Cmd+S** — saves immediately, cancels pending debounce
- [ ] Calls `updateLatexFile()` server action

### Save Status Indicators
| State | Visual | Test |
|-------|--------|------|
| **Saved** | Green check + timestamp | [ ] Verify after save completes |
| **Saving** | Animated icon + "Saving..." | [ ] Verify during save |
| **Unsaved** | Amber icon + "Unsaved" | [ ] Verify after typing |
| **Error** | Red icon | [ ] Verify on save failure |

### Pre-compile Save
- [ ] Current file is auto-saved before compilation starts

---

## 26. Keyboard Shortcuts — Complete Reference

| Shortcut | Action | Test |
|----------|--------|------|
| `Cmd+S` | Save immediately | [ ] Verify save triggers |
| `Cmd+Enter` | Compile LaTeX to PDF | [ ] Verify compilation starts |
| `Cmd+K` | Toggle inline AI bar (on selected text) | [ ] Verify AI bar appears |
| `Cmd+B` | Toggle file tree sidebar | [ ] Verify sidebar toggles |
| `Cmd+J` | Toggle agent panel | [ ] Verify panel toggles |
| `Escape` | Dismiss inline AI bar / slash menu | [ ] Verify overlays close |
| `/` (at line start) | Open slash command menu | [ ] Verify menu appears |

### CodeMirror Built-in Shortcuts
| Shortcut | Action | Test |
|----------|--------|------|
| `Cmd+Z` | Undo | [ ] Verify undo works |
| `Cmd+Shift+Z` | Redo | [ ] Verify redo works |
| `Cmd+F` | Find | [ ] Verify search opens |
| `Cmd+H` | Find and replace | [ ] Verify replace opens |
| `Cmd+D` | Select next occurrence | [ ] Verify multi-cursor |
| `Alt+Drag` | Rectangular/column selection | [ ] Verify column select |

---

## 27. Mobile & Responsive Design

### Mobile (< 768px)
- [ ] **Editor/Preview toggle** — bottom bar switches between Editor and Preview views
- [ ] **File tree** — opens as full-screen overlay (fixed inset-0)
  - [ ] Close button in header
  - [ ] Auto-closes after file selection or jump-to-line
- [ ] **Agent panel** — opens as full-screen overlay
  - [ ] Close button in header
  - [ ] Header shows "AI Assistant" label
- [ ] **Floating buttons** — folder icon (left) and chat icon (right) to open panels
- [ ] **Touch targets** — minimum 44px touch target size on all buttons
- [ ] **Preview close** — X button to go back to editor

### Tablet (768px - 1024px)
- [ ] **Agent panel** — narrower width (256px instead of 288px)
- [ ] **Agent panel toggle** — hidden on tablet (use floating button instead)
- [ ] **File tree** — normal sidebar behavior

### Desktop (> 1024px)
- [ ] **Side-by-side layout** — editor and preview visible simultaneously
- [ ] **File tree toggle tab** — left-edge button
- [ ] **Agent panel toggle tab** — right-edge button
- [ ] **Full panel widths** — file tree 224px, agent panel 288px

---

## 28. Error Handling & Edge Cases

### Project Loading
- [ ] **Retry logic** — 3 attempts with exponential backoff
- [ ] **Not found** — "This LaTeX workspace is not ready yet" error card
- [ ] **Network error** — "Unable to load this LaTeX workspace" error card
- [ ] **Retry button** — re-triggers loading
- [ ] **Back button** — returns to `/latex` project list

### Compilation Errors
- [ ] **Rate limiting (429)** — auto-retry with Retry-After header
- [ ] **Service unavailable (502/503/504)** — friendly message + retry
- [ ] **Network failure** — retry up to 2 times
- [ ] **All retries exhausted** — clear error message to user
- [ ] **LaTeX errors** — displayed in error gutter with line numbers

### File Operations
- [ ] **Auto-create `.bib`** — creates file when first citation inserted
- [ ] **Create fails** — falls back to clipboard copy
- [ ] **Save failures** — sets save state to "error"

### Editor Cleanup
- [ ] **Save timer cleanup** on component unmount
- [ ] **PDF blob URL cleanup** — `URL.revokeObjectURL` for downloaded exports

---

## 29. Quick Test Workflows

### Basic Editing Flow
1. [ ] Navigate to `/latex` — project list loads
2. [ ] Click "New Paper" → select template, compiler, enter title
3. [ ] Click "Create Paper" → redirected to editor
4. [ ] Verify template content loaded in editor
5. [ ] Type LaTeX code — verify syntax highlighting
6. [ ] Verify live preview updates on the right
7. [ ] Wait 1.5s — verify auto-save triggers
8. [ ] Press `Cmd+S` — verify immediate save

### Compilation Flow
1. [ ] Write valid LaTeX in editor
2. [ ] Press `Cmd+Enter` — compilation starts
3. [ ] Verify "Compiling..." status in top bar
4. [ ] On success — preview switches to PDF mode
5. [ ] Verify compiled PDF displays correctly
6. [ ] Introduce a LaTeX error (e.g., `\begin{itemize}` without `\end`)
7. [ ] Compile again — verify error gutter shows diagnostics
8. [ ] Click error — verify editor scrolls to error line
9. [ ] Click "Fix this error" — verify AI suggests a fix

### Citation Flow
1. [ ] Press `Cmd+J` to open Agent Panel
2. [ ] Switch to Cite tab
3. [ ] Search for a paper (e.g., "machine learning")
4. [ ] Click a result to insert citation
5. [ ] Verify `\cite{authorYear}` inserted at cursor
6. [ ] Check file tree — verify `references.bib` created/updated
7. [ ] Verify BibTeX entry appended to `.bib` file

### AI Assistance Flow
1. [ ] Type `/` in editor — verify slash menu appears
2. [ ] Select "Table" — verify Draft tab opens in Agent Panel
3. [ ] Type `/cite` — verify Cite tab opens
4. [ ] Select text, press `Cmd+K` — verify inline AI bar appears
5. [ ] Click replace — verify text is replaced in editor

### File Management Flow
1. [ ] Press `Cmd+B` — file tree opens
2. [ ] Create a new file — verify it appears in tree
3. [ ] Click new file — verify editor loads its content
4. [ ] Switch to Figures tab — upload an image
5. [ ] Click image insert — verify `\includegraphics` code inserted
6. [ ] Switch to Comments tab — add a comment
7. [ ] Verify comment appears with line number

### Export Flow
1. [ ] Compile the document first (Cmd+Enter)
2. [ ] Click Export dropdown
3. [ ] Click "Download PDF" — verify PDF file downloads
4. [ ] Click "Download .tex" — verify `.tex` file downloads
5. [ ] Click "Download as .zip" — verify ZIP with all files downloads

### Mobile Flow
1. [ ] Open editor on mobile viewport
2. [ ] Verify Editor/Preview toggle bar at top
3. [ ] Tap "Preview" — verify preview shows, editor hides
4. [ ] Tap folder icon — verify file tree opens full-screen
5. [ ] Select a file — verify file tree closes, content loads
6. [ ] Tap chat icon — verify Agent Panel opens full-screen
7. [ ] Verify all buttons meet 44px minimum touch target

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were missing from the original document generated by Claude Code.

### Project List Page Details
- [ ] Project-list page starts with `loading = true` and renders only a centered spinner with no loading label text
- [ ] Project-list fetch calls `getLatexProjects()` once on initial mount
- [ ] Failed project-list fetches fall through silently and still end loading state
- [ ] Empty-state helper copy reads `Create your first LaTeX paper to start writing with live preview and AI assistance.`
- [ ] Project cards are full-row links to `/latex/[projectId]`
- [ ] Project cards use `toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })` for last-updated text
- [ ] Compiler label falls back to `pdflatex` when `project.compiler` is null
- [ ] Delete icon button is present in the DOM but hidden with `opacity-0` until the card is hovered
- [ ] Clicking delete prevents link navigation with both `preventDefault()` and `stopPropagation()`
- [ ] Project deletion is optimistic in the current implementation and does not show a confirmation dialog

### New Paper Page Details
- [ ] New-paper page title input starts as an empty string even though the placeholder is `Untitled Paper`
- [ ] Pressing Enter inside the title input triggers the same `handleCreate()` flow as the primary button
- [ ] Create payload falls back to `Untitled Paper` only at submission time when the input is blank
- [ ] Template groups are derived from `category === "general"` and `category === "medical"`
- [ ] Template section labels render as uppercase `General` and `Medical & Clinical`
- [ ] Selected template card changes both border/background styling and icon color treatment
- [ ] Compiler buttons render in the fixed order `pdflatex`, `xelatex`, `lualatex`
- [ ] `pdflatex` is selected by default on first render
- [ ] `Create Paper` button remains mounted while loading and prepends a spinning `CircleNotch` icon when `creating` is true
- [ ] Successful paper creation relies on route navigation and does not reset `creating` back to false before redirect
- [ ] Failed paper creation leaves the form state intact and shows either the thrown error message or the fallback `Unable to create this paper right now. Please try again.`
- [ ] Back arrow on the new-paper page is a plain link to `/latex`

### Workspace Loading, Retry, and Default State
- [ ] `/latex/[projectId]` loads project metadata and file list in parallel with `Promise.all`
- [ ] Workspace load retries up to 3 total attempts before surfacing an error card
- [ ] Retry delays on initial load are 300 ms, 600 ms, and 900 ms across attempts
- [ ] When `getLatexProject(projectId)` returns null on the final attempt, the error text is `This LaTeX workspace is not ready yet. Retry in a moment.`
- [ ] Error card primary action increments an internal `reloadToken` instead of hard-refreshing the page
- [ ] Error card secondary action navigates back to `/latex`
- [ ] Main-file detection prefers the first file where `isMain` is truthy
- [ ] When a main file is found during load, store state is hydrated with `activeFileId` and `documentContent`
- [ ] LaTeX editor store defaults are `viewMode = "source"`, `previewMode = "live"`, `editingMode = "edit"`, `fileTreeOpen = false`, `agentPanelOpen = false`, and `agentTab = "draft"`
- [ ] Workspace is wrapped in `YjsCollaborationProvider` with `projectId` and the initial main-file id

### Top Bar Exact Behavior
- [ ] Top-bar title starts as a button and switches to an inline text input only after click
- [ ] Inline title input auto-focuses and selects the whole title when rename mode opens
- [ ] Title rename persists only on blur or Enter
- [ ] Blank title values are not persisted because `updateLatexProject()` runs only when `projectTitle.trim()` is truthy
- [ ] Save indicator returns `null` for any unrecognized state rather than a generic placeholder
- [ ] Save indicator `saved` state shows the literal word `Saved` plus an optional `HH:MM` timestamp
- [ ] Save indicator `error` state text is `Save failed`, not `Error`
- [ ] Editing-mode buttons are always visible and use blue/amber/slate active styling for `Edit`, `Suggest`, and `View`
- [ ] Editor-mode toggle order is `Visual` then `Source`
- [ ] Preview-mode toggle order is `Live` then `PDF`
- [ ] Compile button text changes to `Compiling...` only while `compileStatus === "compiling"`
- [ ] Compile button is disabled only while `compileStatus === "compiling"`
- [ ] Compile button retains success/error styling after a previous compile until the next compile resets status
- [ ] Export button is an icon-first dropdown trigger with no text label for export format
- [ ] Export dropdown closes on outside click through a `mousedown` document listener
- [ ] Export dropdown options are `Download PDF`, `Download .tex`, and `Download as .zip`

### Save and Compile Flow Details
- [ ] Typing in the editor updates store content immediately and sets save state to `unsaved` before the debounce elapses
- [ ] Active file content in the local `files` array is updated immediately on every editor change so the file tree stays in sync
- [ ] Debounced autosave delay is 1500 ms
- [ ] Debounced autosave saves only the current active file id from store, not every open file
- [ ] `Cmd/Ctrl+S` performs an immediate save using the current store-backed `documentContent`
- [ ] `Cmd/Ctrl+S` does nothing when there is no active file id or when content is empty
- [ ] Compile always tries to save the current file once before sending the compile request
- [ ] Compile clears previous diagnostics and inline gutter markers before each new attempt
- [ ] Rate-limited compile responses (`429`) surface a retry message using the `Retry-After` header and retry automatically
- [ ] Compiler-service failures (`502`, `503`, `504`) retry up to two times before showing the friendly service-unavailable message
- [ ] Generic network failures retry up to two times and eventually surface `Unable to compile after multiple attempts. Check your connection and try again.`
- [ ] Successful compile stores a blob URL in `compiledPdfUrl`, sets compile status to `success`, and switches preview mode to `pdf`
- [ ] Failed compile responses with `errors` push diagnostics into both the workspace error panel and the CodeMirror lint layer

### Source Editor Details
- [ ] Source editor uses a CodeMirror monospace stack beginning with `JetBrains Mono`
- [ ] Source editor line numbers and fold gutter are always enabled
- [ ] Source editor highlights the active line and active line gutter simultaneously
- [ ] Source editor enables rectangular selection and search-match highlighting
- [ ] Source editor exposes imperative helpers for `replaceRange`, `scrollToLine`, `getSelection`, `setContent`, `insertAtCursor`, `setDiagnostics`, and `clearDiagnostics`
- [ ] `scrollToLine(line)` clamps the requested line into the valid document range before focusing the editor
- [ ] `setContent(content)` replaces the entire document and resets the selection anchor to position 0
- [ ] `insertAtCursor(text)` removes the currently typed slash-command fragment when one exists on the same line before inserting replacement text
- [ ] Inline diagnostics auto-scroll to the first error severity entry or the first warning when no error exists
- [ ] Slash menu opens only when the text before the cursor is exactly `/`
- [ ] Slash menu remains open while the slash fragment contains no spaces or newlines
- [ ] Slash menu repositions itself as the filter string grows by shifting left based on filter length
- [ ] Slash menu dismisses automatically when the slash token no longer matches the allowed pattern

### File Tree and Sidebar Details
- [ ] File-tree panel tab state defaults to `files`
- [ ] File-tree panel header label is uppercase `Files`
- [ ] New-file inline input placeholder is `filename.tex`
- [ ] New-file creation seeds `.bib` files with `% Add references here\\n` and all other files with an empty string
- [ ] Creating a new file selects it immediately after it is added
- [ ] Empty new-file input closes on blur without creating a file
- [ ] Non-main files expose a hover-only context-menu trigger
- [ ] Main files do not show the `DotsThree` context-menu trigger
- [ ] Rename mode exits without persisting when the new path is blank or unchanged
- [ ] Deleting the currently active non-main file automatically falls back to the main file if one exists
- [ ] Folder rows are collapsed by default until clicked
- [ ] Outline section is expanded by default
- [ ] Outline empty-state text is `No sections found`
- [ ] Outline indent increases by 12 px per section depth level
- [ ] Outline rows expose a hover-only sparkle action when `onDraftSection` is available
- [ ] Clicking an outline sparkle opens the agent panel, switches to the `draft` tab, and dispatches `latex:draft-section`

### Mobile and Overlay Behavior
- [ ] Mobile editor/preview toggle bar is rendered only when `isMobile` is true
- [ ] Mobile defaults to showing the editor side first (`mobileShowPreview = false`)
- [ ] Mobile preview view adds a top-right `Back to editor` close button
- [ ] Mobile file-tree toggle button only appears when the file tree is currently closed
- [ ] Mobile AI-panel toggle button only appears when the agent panel is currently closed
- [ ] Mobile file tree opens as a full-screen fixed overlay instead of a narrow sidebar
- [ ] Mobile agent panel opens as a full-screen fixed overlay instead of a narrow sidebar
- [ ] Selecting a file, outline entry, comment jump target, or inserted image from the file-tree overlay closes that overlay on mobile
- [ ] Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths
- [ ] Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`

### Preview Panel Details
- [ ] Live preview debounces HTML conversion by 150 ms
- [ ] Live preview renders from store-backed `documentContent`, not directly from the editor DOM
- [ ] PDF preview renders only when `previewMode === "pdf"` and a `compiledPdfUrl` exists
- [ ] If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer
- [ ] Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block
- [ ] Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview
- [ ] Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line

### Inline AI and Slash Menu Details
- [ ] `Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text
- [ ] Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`
- [ ] Clicking a preset chip both fills the instruction input and immediately submits that instruction
- [ ] Inline AI input placeholder is `Edit instruction...`
- [ ] Inline AI submit button swaps from a send icon to a spinning loader while streaming
- [ ] Inline AI error responses are rendered inline as plain text beginning with `Error:`
- [ ] `Accept` is only meaningful when the streamed result does not begin with `Error:`
- [ ] Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar
- [ ] Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus
- [ ] Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`
- [ ] Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)
- [ ] Slash-command keyboard navigation always starts from index 0 because the menu remounts each time
- [ ] Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing

### Agent Panel Details
- [ ] Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`
- [ ] Agent-panel default tab is `draft`
- [ ] Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`
- [ ] Draft-tab composer placeholder is `Help me strengthen my methods section...`
- [ ] Draft-tab send button is disabled while loading or when the prompt is blank
- [ ] File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`
- [ ] Manual draft-chat sends use intensity `collaborate`
- [ ] Draft-tab failures are silent in the current implementation and do not render an error banner
- [ ] Learn-tab search placeholder is `Search concepts...`
- [ ] Learn-tab category list shows the total concept count beside `LaTeX Concepts`
- [ ] Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying
- [ ] Cite-tab search placeholder is `Search papers...`
- [ ] Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\cite{key}`
- [ ] Cite-tab result click copies `\\cite{key}` to the clipboard and dispatches `latex:insert-bibtex`
- [ ] Cite-tab copied state text is `Copied \\cite{key}` for the last clicked result only
- [ ] Check-tab primary button label is `Run LaTeX Checks`
- [ ] Check-tab initial helper text reads `Check for unused refs, missing labels, package conflicts, and more.`

### Actual Current Behavior Corrections
- [ ] File tree and agent panel are both closed by default; the workspace does not open with permanent left and right sidebars already expanded
- [ ] Export PDF downloads only when a compiled PDF blob URL already exists; the export action does not trigger a fresh compile automatically
- [ ] Source mode is the real default editor mode; visual mode is opt-in
- [ ] Live preview is the real default preview mode; PDF preview is selected automatically only after a successful compile
- [ ] Project and file deletions currently have no confirmation dialog in the page components
- [ ] Slash-command menu has no explicit `No commands` empty-state row; it simply unmounts when there are no matches
- [ ] Draft-tab and cite-tab request failures are largely silent in the current UI instead of surfacing inline error banners
- [ ] The workspace mobile experience relies on full-screen overlays and an Editor/Preview switcher rather than a simultaneous multi-column layout
