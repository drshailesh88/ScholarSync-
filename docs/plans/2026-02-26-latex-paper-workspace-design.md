# ScholarSync LaTeX Paper Workspace — Design Document

**Date:** 2026-02-26
**Status:** Approved (pending implementation plan)
**Scope:** Product-within-a-product — a dual-mode paper writing workspace that outputs LaTeX

---

## 1. Vision

**"Write your paper. We handle the LaTeX."**

A paper writing workspace that looks and feels like a modern document editor in its default state, but produces real, compilable LaTeX underneath. Users who know LaTeX can toggle to full source editing with AI-powered assistance. Users who don't know LaTeX never need to learn it — unless they want to, in which case Learn Mode teaches them through their own writing.

### Competitive Positioning

| Competitor | Their pitch | Our pitch |
|------------|------------|-----------|
| Overleaf | "Here's a LaTeX editor. Learn LaTeX." | "Write your paper. We handle the LaTeX." |
| Prism | "Here's a LaTeX editor with AI. Still learn LaTeX." | "Write naturally. Toggle to source when curious." |
| Google Docs | "Write easily, but no LaTeX output." | "Write just as easily, AND get LaTeX output." |

### Design Principles

1. **Uncluttered by default** — Two panels (editor + preview), nothing else visible
2. **Progressive disclosure** — File tree, agent panel, and AI all hidden until summoned
3. **Dual-mode** — Visual Mode (default, familiar) and Source Mode (LaTeX-native, powerful)
4. **Deep work tool** — Remove friction, not add features. LaTeX syntax is friction.
5. **Teach, don't replace** — Learn Mode bridges users from Visual to Source over time

---

## 2. Layout Architecture

### Default State (Prism-clean)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back   Untitled Paper          ● Saved   [Compile] [⬇ PDF]│
├─────────────────────────────────────────────────────────────┤
│         [Visual ●│○ Source]                                 │
│                                                             │
│  ┌──────────────────────┬──────────────────────┐            │
│  │                      │                      │       [▸]  │
│  │   Editor Panel       │   Preview Panel      │            │
│  │   (Visual or Source) │   (Live or PDF)      │            │
│  │                      │                      │            │
│  │                      │                      │            │
│  │                      │                      │            │
│  └──────────────────────┴──────────────────────┘            │
│                                                             │
│[◂]                                                          │
└─────────────────────────────────────────────────────────────┘
```

### Three Hidden Panels (Progressive Disclosure)

| Panel | Position | Trigger | Contents |
|-------|----------|---------|----------|
| File Tree | Left edge `[◂]` tab | Click to expand | Project files (.tex, .bib, figures/, etc.) |
| Agent Panel | Right edge `[▸]` tab | Click to expand | Draft / Learn / Cite / Check tabs |
| Inline AI | Embedded in editor | Highlight text or slash commands | Floating command bar, error fixes |

### Expanded State (Agent Panel Open)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back   My PRISMA Review       ● Saved   [Compile] [⬇ PDF]│
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┬──────────────┬──────────────┐            │
│  │               │              │ Draft│Learn│  │            │
│  │   Editor      │   Preview    │ Cite │Check│  │            │
│  │               │              │              │            │
│  │               │              │  (Agent      │            │
│  │               │              │   Panel)     │            │
│  │               │              │              │            │
│  └───────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Top Bar

Permanently visible. Thin. Minimal.

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back   [Editable Document Title]   ● Saved  [Compile][⬇] │
└─────────────────────────────────────────────────────────────┘
```

| Element | Behavior |
|---------|----------|
| ← Back | Returns to document list / ScholarSync workspace |
| Document Title | Click to edit, auto-saves |
| Save Status | ● Saved / ○ Saving... / ◌ Unsaved / ✕ Error |
| Compile | Triggers full server-side TeX Live compilation |
| ⬇ (Export) | Download PDF, or overflow menu for .tex source export |
| ⋯ (Overflow) | Compiler choice, TeX Live version, collaborator settings |

---

## 4. Dual-Mode Editor

### Visual Mode (Default)

A WYSIWYM (What You See Is What You Mean) editor that feels like Google Docs but generates LaTeX underneath.

**What the user experiences:**
- Type normally — text appears formatted
- Headings via markdown shortcuts (`# Methods` → rendered heading) or minimal toolbar
- Bold, italic, etc. via keyboard shortcuts (Cmd+B, Cmd+I)
- Equations via visual equation builder OR inline LaTeX (both work)
- Citations via Cite panel (click → search → insert) — no `\cite{}` needed
- Tables via visual table builder (click to add rows/columns)
- Figures via drag-and-drop image upload
- Lists, block quotes, footnotes via familiar UI patterns

**What happens underneath:**
- Every visual action generates real LaTeX in the document source
- The underlying .tex file is always valid, compilable LaTeX
- Toggle to Source Mode at any time to see/edit the raw LaTeX

**Technical approach:**
- CodeMirror 6 with `codemirror-lang-latex` for the source layer
- Visual mode built as a CM6 decoration/widget layer (same approach Overleaf uses)
- Both modes edit the same document buffer — they are views, not separate documents

### Source Mode (Toggle)

Full raw LaTeX editing with all the power features:
- Syntax highlighting, bracket matching, code folding
- Auto-indentation for environments and groups
- Autocompletion for commands, environments, packages
- Snippets for common structures
- Hover tooltips with command documentation
- LaTeX-specific linting

**Mode Toggle:**
```
[Visual ●│○ Source]  ← always visible at top of editor panel
```
One click switches. Document state is preserved. Cursor position maps between modes via SyncTeX-like position tracking.

---

## 5. Preview Panel

### Dual Preview Modes

```
[Live Preview ●│○ Full PDF]  ← toggle in preview panel header
```

| Mode | Rendering | Speed | Fidelity |
|------|-----------|-------|----------|
| Live Preview | KaTeX (math) + LaTeX.js (structure) client-side | Instant, as-you-type | Approximate — good for writing flow |
| Full PDF | Server-side TeX Live compilation via Docker | 2-15 seconds | Pixel-perfect, final output |

**Live Preview** is the default. It updates in real-time as the user types. Math renders via KaTeX. Document structure (sections, lists, formatting) renders via LaTeX.js or a custom renderer. It won't be pixel-identical to the final PDF, but it's close enough for the writing phase.

**Full PDF** is triggered by the Compile button or by switching the preview toggle. It sends the project to a server-side TeX Live Docker microservice, compiles with pdflatex/xelatex/lualatex, and returns the real PDF rendered via PDF.js.

**SyncTeX integration:** Click in source → jumps to corresponding position in PDF preview. Click in PDF → jumps to corresponding source line. Works in both preview modes.

---

## 6. Inline AI (Layer 1 — Invisible AI)

Always available. Never visible until summoned. Three interaction patterns:

### 6a. Highlight → Command

```
User highlights text
        ↓
┌─────────────────────────────────────────┐
│ "Make this more formal" ____________ [↵] │  ← floating bar
└─────────────────────────────────────────┘
        ↓
AI streams replacement into document
        ↓
Subtle [Accept ✓] [Revert ↩] inline
```

- Works in BOTH Visual and Source modes
- In Visual Mode: AI rewrites the prose, LaTeX is generated underneath
- In Source Mode: AI rewrites the raw LaTeX directly
- Accept/Revert disappears when user moves cursor elsewhere (auto-accepts)

### 6b. Slash Commands

```
User types / in editor
        ↓
┌──────────────────────────┐
│ /table                   │
│ /cite                    │
│ /figure                  │
│ /equation                │
│ /fix-error               │
│ /template                │
│ /tikz                    │
└──────────────────────────┘
        ↓
User selects command → prompt input appears
        ↓
AI generates content inline at cursor position
        ↓
[Accept ✓] [Revert ↩]
```

**Key slash commands:**
| Command | Action |
|---------|--------|
| `/table` | Generate a table from natural language description |
| `/cite` | Quick citation search + insert |
| `/figure` | Insert figure environment with caption |
| `/equation` | Generate equation from natural language or image |
| `/fix-error` | Fix the nearest compilation error |
| `/template` | Insert a document section from template |
| `/tikz` | Generate TikZ diagram from description |
| `/bib` | Generate BibTeX entry from DOI or paper title |

### 6c. Error Gutter Markers

```
Red marker in gutter at line 47
        ↓
User clicks marker
        ↓
┌─────────────────────────────────────────┐
│ ✕ Undefined control sequence \bmatirx   │
│                                         │
│ Typo: \bmatirx → \bmatrix              │
│                            [Apply Fix]  │
└─────────────────────────────────────────┘
```

- Compilation errors appear as red gutter markers
- Warnings appear as yellow gutter markers
- Click → popover with AI explanation + suggested fix
- One-click apply

---

## 7. Agent Panel (Layer 2 — Collapsible Companion)

Collapsed by default. Expands from right edge. Same panel shape/behavior as Studio's agent panel. Four tabs:

### Tab 1: Draft

The writing AI companion with full document context.

- Streaming multi-turn chat
- Three intensity modes (carried from Studio):
  - **Focus** (Sky blue) — AI quiet, only responds to explicit requests
  - **Collaborate** (Brand purple) — Balanced suggestions and discussion
  - **Accelerate** (Violet) — Proactive suggestions, section generation, structural advice
- Understands document structure, equations, arguments, references
- Can reference specific sections: "Strengthen the argument in section 3.2"
- Context includes: document source, project references, linked ScholarSync project data

### Tab 2: Learn

Socratic LaTeX tutor — teaches, doesn't write for you.

- **In Visual Mode:** "I see you inserted a table visually. Here's what that looks like in LaTeX: `\begin{tabular}...` Want to try editing it in Source Mode?"
- **In Source Mode:** "You're writing a custom environment. `\newenvironment{name}{begin-code}{end-code}` — the first argument runs when `\begin{name}` is encountered..."
- Proficiency-aware: tracks what LaTeX concepts the user has learned and builds on them
- Goal: gradually make users comfortable toggling to Source Mode
- Unique differentiator — no competitor teaches LaTeX through your own writing

### Tab 3: Cite

Citation management — replaces Overleaf's premium Zotero/Mendeley integration.

- **Search:** PubMed, DOI, arXiv, Semantic Scholar — search directly from the panel
- **Project references:** If linked to a ScholarSync project, shows all collected papers
- **BibTeX management:** View/edit the project's .bib file
- **Insert:** Click a reference → inserts `\cite{key}` at cursor position (in Source Mode) or renders a formatted citation (in Visual Mode)
- **AI-suggested citations:** "Based on your methods section, you might want to cite these 3 papers..."
- **Style preview:** See how citations will render in Vancouver, APA, Chicago, etc.
- **Import:** Zotero sync, .bib file upload, DOI bulk import

### Tab 4: Check

Integrity verification suite (carried from Studio's integrity features).

- **AI Detection:** Scan document for AI-generated text patterns
- **Plagiarism Check:** Compare against known literature
- **Citation Verification:** Do cited papers actually support the claims made?
- **LaTeX-Specific Checks:**
  - Unused references in .bib
  - Missing `\label{}` for figures/tables that are referenced
  - Orphaned figures (referenced but not included)
  - Package conflicts
  - Overfull/underfull hbox warnings
- **Report generation:** One-click integrity report

---

## 8. File Tree (Hidden Left Panel)

Collapsed by default. Expands from left edge.

```
┌──────────────────┐
│ Project Files     │
├──────────────────┤
│ ▼ My Paper/      │
│   main.tex       │  ← active file highlighted
│   abstract.tex   │
│   methods.tex    │
│   results.tex    │
│   ▶ figures/     │
│   references.bib │
│   style.sty      │
│                  │
│ [+ New File]     │
│ [↑ Upload]       │
│                  │
│ ─── Outline ──── │
│ 1. Introduction  │  ← auto-generated from \section{}
│ 2. Methods       │
│   2.1 Data       │
│   2.2 Analysis   │
│ 3. Results       │
│ 4. Discussion    │
└──────────────────┘
```

- Standard file tree for multi-file LaTeX projects
- Below the file tree: **Document Outline** auto-generated from LaTeX sectioning commands
- Click outline item → jumps to that section in editor
- Supports: .tex, .bib, .sty, .cls, image files, .tikz, etc.
- Drag-and-drop file upload
- New file creation with type templates

---

## 9. Compilation Architecture

### Hybrid Approach

```
┌─────────────┐         ┌──────────────────┐
│   Browser    │         │   Server         │
│              │         │                  │
│  CodeMirror  │────────▶│  Docker + TeX    │
│  6 Editor    │  HTTP   │  Live + latexmk  │
│              │◀────────│                  │
│  KaTeX +     │  PDF    │  pdflatex /      │
│  LaTeX.js    │         │  xelatex /       │
│  (instant    │         │  lualatex        │
│   preview)   │         │                  │
│              │         │  SyncTeX output  │
│  PDF.js      │         │                  │
│  (PDF view)  │         │                  │
└─────────────┘         └──────────────────┘
```

**Client-side (instant preview):**
- KaTeX for math rendering (already in codebase)
- LaTeX.js (MIT) for document structure rendering
- Updates in real-time as user types
- No server round-trip needed

**Server-side (full compilation):**
- REST API endpoint: `POST /api/latex/compile`
- Docker container with TeX Live (full distribution, ~5000 packages)
- Supports pdflatex, xelatex, lualatex
- Returns: PDF binary + SyncTeX file + compilation log
- Compilation log parsed for error/warning gutter markers

**Supported compilers:** pdfLaTeX (default), XeLaTeX, LuaLaTeX
**TeX Live version:** Latest, with option to select specific versions

---

## 10. Entry Points & Project Model

### Unified Document List

No separate "LaTeX Editor" section. Documents live in a unified list:

```
Sidebar nav:
  Dashboard
  Library
  Documents       ← unified (replaces separate "Studio" + "LaTeX Editor")
  Presentations
  Systematic Review
```

The Documents page shows all papers — both rich text (TipTap) and LaTeX projects:

```
┌──────────────────────────────────────────────────┐
│  Documents                         [+ New Paper]  │
├──────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Thesis   │  │ PRISMA   │  │ Case     │      │
│  │ Ch. 3    │  │ Review   │  │ Report   │      │
│  │ LaTeX    │  │ LaTeX    │  │ Draft    │      │
│  │ 2h ago   │  │ 1d ago   │  │ 3d ago   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└──────────────────────────────────────────────────┘
```

Each card shows a small badge: `LaTeX` or `Draft` (rich text).

### New Paper Flow

```
[+ New Paper]
        ↓
┌───────────────────────────────────────┐
│  New Paper                            │
│                                       │
│  Format:                              │
│  ┌─────────────┐  ┌─────────────┐    │
│  │   LaTeX     │  │  Rich Text  │    │
│  │  (journals, │  │  (quick     │    │
│  │   thesis,   │  │   drafts,   │    │
│  │   formal)   │  │   notes)    │    │
│  └─────────────┘  └─────────────┘    │
│                                       │
│  Start from:                          │
│  ○ Blank document                     │
│  ○ Template (journal / thesis / CV)   │
│  ○ Link to ScholarSync project        │
│  ○ Upload existing .tex files         │
│                                       │
│                        [Create]       │
└───────────────────────────────────────┘
```

### Entry from ScholarSync Project

Inside any project page: **"Write Paper →"** button
- Choose format (LaTeX or Rich Text)
- Creates document pre-linked to project
- References, evidence tables, research notes available in Agent Panel

---

## 11. Technology Stack

All commercially safe (MIT / Apache-2.0 licenses):

| Component | Technology | License |
|-----------|-----------|---------|
| Editor engine | CodeMirror 6 | MIT |
| LaTeX language support | `codemirror-lang-latex` (TeXlyre) | Permissive |
| Visual mode | CM6 decoration/widget layer | Custom (on top of MIT CM6) |
| Real-time collaboration | Yjs (CRDT) | MIT |
| Math preview | KaTeX (already in codebase) | MIT |
| Document preview | LaTeX.js | MIT |
| PDF rendering | PDF.js | Apache-2.0 |
| Citation parsing | Citation.js | MIT |
| Server compilation | Docker + TeX Live + latexmk | MIT wrappers |
| AI | Anthropic Claude / OpenAI (existing infra) | API |
| State management | Zustand (existing pattern) | MIT |
| Framework | Next.js App Router (existing) | MIT |

### Key Repos to Reference During Implementation

| Repo | What to Study |
|------|---------------|
| Octree (octree-labs) | AI integration patterns, MIT licensed |
| TeXlyre | CM6 + WASM compilation + Yjs architecture |
| Open-Prism (assistant-ui) | Next.js + AI chat + compilation API patterns |
| Overleaf (overleaf/overleaf) | CM6 visual/source toggle implementation (reference only, AGPL) |

---

## 12. Route Structure

```
/documents                              → Unified document list (new)
/documents/new                          → New paper creation flow
/latex/[projectId]                      → LaTeX workspace (the new editor)
/latex/[projectId]/settings             → Project settings (compiler, collaborators)
/api/latex/compile                      → Compilation endpoint
/api/latex/projects/[id]                → Project CRUD
/api/latex/projects/[id]/files          → File management
/api/latex/projects/[id]/collaborate    → Collaboration WebSocket
```

---

## 13. Database Schema (New Tables)

```sql
-- LaTeX projects
latex_projects:
  id                UUID PK
  user_id           TEXT FK → users
  project_id        UUID FK → projects (nullable, for linked projects)
  title             TEXT
  compiler          TEXT DEFAULT 'pdflatex'  -- pdflatex | xelatex | lualatex
  texlive_version   TEXT DEFAULT 'latest'
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

-- LaTeX project files
latex_files:
  id                UUID PK
  latex_project_id  UUID FK → latex_projects
  path              TEXT          -- e.g., "main.tex", "figures/fig1.png"
  content           TEXT          -- file content (for .tex, .bib, .sty)
  binary_content    BYTEA         -- for images/binary files (or S3 reference)
  is_main           BOOLEAN       -- is this the main compilation entry point?
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

-- Compilation history
latex_compilations:
  id                UUID PK
  latex_project_id  UUID FK → latex_projects
  compiler          TEXT
  status            TEXT          -- success | error | warning
  log               TEXT          -- full compilation log
  pdf_url           TEXT          -- S3/storage URL for compiled PDF
  synctex_url       TEXT          -- SyncTeX file URL
  duration_ms       INTEGER
  created_at        TIMESTAMP
```

---

## 14. What Makes This Beat Everyone

| Feature | Overleaf | Prism | ScholarSync |
|---------|----------|-------|-------------|
| Visual WYSIWYM mode | Basic, secondary | No | Default, first-class |
| Raw LaTeX source | Yes (primary) | Yes (primary) | Yes (one toggle away) |
| Inline AI editing | No | Yes (GPT-5.2) | Yes (Claude + intensity modes) |
| AI teaching mode | No | No | Learn Mode — Socratic tutor |
| Citation grounding | Import from Zotero (premium) | AI suggestions (hallucinate) | PubMed/DOI/S2 search, zero hallucination |
| Integrity checks | No | No | AI detection + plagiarism + citation verification |
| Research pipeline | No | No | Deep research → evidence tables → paper |
| Compilation | Server only (slow, limited free) | Server only | Hybrid (instant preview + server compile) |
| Price of basics | Paywalled | Free | Bundled in workspace |
| Git integration | Premium | Not available | Buildable |
| Uncluttered default | No (file tree always visible) | Mostly | Yes (everything hidden by default) |
| Teaches LaTeX | No | No (does it for you) | Yes (Learn Mode bridges Visual→Source) |

---

## 15. Open Questions for Implementation

1. **Visual Mode fidelity** — How close can CM6 decorations get to true WYSIWYM? Need to prototype early.
2. **Collaboration model** — Yjs CRDT vs. OT? Yjs is recommended (MIT, modern, conflict-free) but needs evaluation with LaTeX-specific editing patterns.
3. **TeX Live hosting** — Self-hosted Docker vs. managed service? Cost implications for compilation at scale.
4. **Offline support** — Should the editor work offline with WASM compilation? Adds complexity but is a differentiator.
5. **Template library** — Build our own vs. import from CTAN/Overleaf-compatible templates?
6. **Migration from Studio** — How do we transition existing Studio users to the unified Documents model?

---

## Appendix: Sources & Research

### Prism Research
- OpenAI Prism launched January 27, 2026 at prism.openai.com
- Built on acquired Crixet platform
- GPT-5.2 integrated for mathematical/scientific reasoning
- Free, unlimited projects/collaborators/compilation
- No Git integration, citation hallucination issues, privacy concerns

### Overleaf Research
- CodeMirror 6 editor, Node.js microservices, MongoDB + Redis
- AGPL-3.0 license (cannot embed commercially)
- Community Edition lacks: sandboxed compiles, track changes, Git, reference managers
- Users complain: compile limits, paywalls, poor editor intelligence, no AI

### Open-Source Landscape
- Commercially safe: CodeMirror 6, codemirror-lang-latex, Yjs, LaTeX.js, Citation.js, KaTeX, PDF.js
- AGPL (avoid): Overleaf, SwiftLaTeX
- Key reference repos: Octree (MIT), TeXlyre, Open-Prism (assistant-ui)
- Hybrid compilation (client preview + server PDF) is the recommended architecture
