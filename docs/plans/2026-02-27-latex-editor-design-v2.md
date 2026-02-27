# ScholarSync LaTeX Editor — Design Document v2

**Date:** 2026-02-27
**Status:** Approved
**Supersedes:** 2026-02-26-latex-paper-workspace-design.md (that doc was AI-generated without full review; this is the validated version)
**Scope:** A Prism-class LaTeX editor inside ScholarSync, with zero additional infrastructure cost

---

## 1. Vision

**"We are rebuilding Prism — inside ScholarSync, for our users."**

A LaTeX editor that feels like Prism and Overleaf but beats both: Visual WYSIWYM mode for users who don't know LaTeX, Source mode for power users, a Learn Mode that teaches LaTeX through your own writing (no competitor has this), and deep integration with ScholarSync's existing research pipeline, citation search, and integrity checks.

### Design Principles

1. **Extremely uncluttered** — Two panels (editor + preview), thin top bar, nothing else visible by default
2. **Prism/Overleaf feel** — NOT Studio-inspired. Studio is busy. This is a focused deep-work tool
3. **Progressive disclosure** — File tree, agent panel hidden until summoned
4. **Dual-mode** — Visual Mode (default, familiar) and Source Mode (LaTeX-native, powerful)
5. **Teach, don't replace** — Learn Mode bridges users from Visual to Source over time
6. **Zero additional infrastructure cost** — Everything runs on existing server or in the browser

### Competitive Positioning

| Competitor | Their pitch | Our pitch |
|------------|------------|-----------|
| Overleaf | "Here's a LaTeX editor. Learn LaTeX." | "Write your paper. We handle the LaTeX." |
| Prism | "Here's a LaTeX editor with AI. Still learn LaTeX." | "Write naturally. Toggle to source when curious." |
| Google Docs | "Write easily, but no LaTeX output." | "Write just as easily, AND get LaTeX output." |

---

## 2. Navigation & Route Structure

LaTeX Editor gets its own sidebar entry, separate from Studio:

```
Sidebar:
  Dashboard
  Library
  Documents (Studio)    ← existing rich text editor, unchanged
  LaTeX Editor          ← NEW, separate page, own route
  Presentations
  Systematic Review
  ...
```

### Routes

```
/latex                        → LaTeX project list
/latex/new                    → New project creation flow
/latex/[projectId]            → LaTeX workspace (the editor)
/api/latex/compile            → Compilation endpoint (Tectonic)
/api/latex/projects/[id]      → Project CRUD
/api/latex/projects/[id]/files → File management
```

---

## 3. Layout Architecture

### Default State (Prism-clean)

```
+--------------------------------------------------------------+
| <- Back   Untitled Paper            * Saved   [Compile] [v]  |
|--------------------------------------------------------------|
|         [Visual *|o Source]                                   |
|                                                              |
|  +---------------------------+---------------------------+   |
|  |                           |                           | [>]
|  |    Editor Panel           |    Preview Panel          |   |
|  |    (Visual or Source)     |    (Live, instant)        |   |
|  |                           |                           |   |
|  |                           |                           |   |
|  +---------------------------+---------------------------+   |
|                                                              |
|[<]                                                           |
+--------------------------------------------------------------+
```

### Three Hidden Panels (Progressive Disclosure)

| Panel | Position | Trigger | Contents |
|-------|----------|---------|----------|
| File Tree | Left edge `[<]` tab | Click to expand | Project files, document outline |
| Agent Panel | Right edge `[>]` tab | Click to expand | Draft / Learn / Cite / Check tabs |
| Inline AI | Embedded in editor | Highlight text or type `/` | Floating command bar, error fixes |

### Top Bar

| Element | Behavior |
|---------|----------|
| <- Back | Returns to LaTeX project list |
| Document Title | Click to edit, auto-saves |
| Save Status | * Saved / o Saving... / x Error |
| Compile | Triggers server-side Tectonic compilation |
| v (Export) | Download PDF, .tex source, or full project as .zip |
| ... (Overflow) | Compiler choice (pdflatex/xelatex/lualatex), project settings |

---

## 4. Dual-Mode Editor

### Visual Mode (Default)

WYSIWYM editor that feels like Google Docs but generates LaTeX underneath.

| Action | What User Does | What Happens Underneath |
|--------|---------------|------------------------|
| Type text | Just type | LaTeX paragraphs generated |
| Heading | Type `# Methods` or use toolbar | `\section{Methods}` |
| Bold/Italic | Cmd+B / Cmd+I | `\textbf{}` / `\textit{}` |
| Equation | Click equation button or type `$$` | MathLive editor -> `\begin{equation}` |
| Citation | Click cite or type `@` | Citation search -> `\cite{key}` |
| Table | `/table` or toolbar | Visual table builder -> `\begin{tabular}` |
| Figure | Drag-drop image | Upload + `\begin{figure}\includegraphics` |
| List | Type `- ` or `1. ` | `\begin{itemize}` or `\begin{enumerate}` |

**Technical approach:**
- CodeMirror 6 with `codemirror-lang-latex` for the source layer
- Visual mode built as a CM6 decoration/widget layer (`codemirror-latex-visual`)
- Both modes edit the same document buffer — they are views, not separate documents

### Source Mode (Toggle)

```
[Visual o|* Source]   <- one click to switch
```

Full raw LaTeX editing:
- Syntax highlighting, bracket matching, code folding
- Auto-indentation for environments and groups
- Autocompletion for commands, environments, packages
- Snippets for common structures
- Hover tooltips with command documentation
- LaTeX-specific linting

Mode switch is instant. Same buffer. Cursor position preserved.

---

## 5. Preview Panel

### Dual Preview Modes

```
[Live Preview *|o Full PDF]   <- toggle in preview panel header
```

| Mode | Rendering | Speed | Fidelity |
|------|-----------|-------|----------|
| Live Preview | KaTeX (math) + LaTeX.js (structure) client-side | Instant, as-you-type | Approximate |
| Full PDF | Server-side Tectonic compilation | 2-5 seconds | Pixel-perfect |

**Live Preview** is default. Updates in real-time. Zero server cost (all client-side).
**Full PDF** triggered by Compile button. Rendered via pdfjs-dist (already installed).

---

## 6. Inline AI (Invisible Layer)

### 6a. Highlight -> Command

User highlights text -> floating bar appears:

```
+---------------------------------------------+
| "Make more formal" ___________________  [->] |
+---------------------------------------------+
```

- AI streams replacement inline
- Subtle [Accept] [Revert] appears
- Works in both Visual and Source modes
- Auto-accepts when user moves cursor away

### 6b. Slash Commands

User types `/` -> dropdown menu:

| Command | Action | AI Model |
|---------|--------|----------|
| `/table` | Generate table from description | GPT-5 Nano |
| `/cite` | Search PubMed/S2 -> insert citation | No AI (API search) |
| `/figure` | Insert figure environment | GPT-5 Nano |
| `/equation` | Generate equation from description | GPT-5 Nano |
| `/tikz` | Generate TikZ diagram | GPT-5.2 |
| `/bib` | Generate BibTeX from DOI/title | GPT-5 Nano |
| `/template` | Insert section template | No AI (static) |
| `/fix` | Fix nearest compilation error | GPT-5 Nano |

### 6c. Error Gutter Markers

After compilation, errors/warnings appear as gutter icons:
- Red = errors, Yellow = warnings
- Click marker -> popover with AI explanation + one-click fix
- Fix model: GPT-5 Nano (mechanical, specific error)

---

## 7. Agent Panel (Collapsible, Four Tabs)

Collapsed by default behind `[>]` on the right edge.

### Tab 1: Draft — Writing AI Companion

Streaming multi-turn chat with document context. Three intensity modes:

| Mode | Color | Behavior |
|------|-------|----------|
| Focus | Sky blue | AI only responds when asked |
| Collaborate | Brand purple | Balanced suggestions + discussion |
| Accelerate | Violet | Proactive — generates sections, restructures |

**AI Model:** GPT-5.2 for quality. Smart context windowing — send relevant section + document outline, not entire document every time.

### Tab 2: Learn — Socratic LaTeX Tutor

**Unique differentiator. No competitor has this.**

- Pre-written explanations for ~50 common LaTeX concepts (static data file, zero AI cost)
- When user performs action in Visual Mode, Learn tab shows the LaTeX equivalent
- Follow-up questions answered by GPT-5 Nano
- Tracks which concepts user has encountered
- Goal: gradually move users from Visual -> Source

The 50 concepts are stored in `src/data/latex-concepts.ts` as a static TypeScript object.
Categories: Basics (15), Math (10), Floats & Media (8), Citations (7), Advanced (10).

### Tab 3: Cite — Citation Management

Uses existing ScholarSync search infrastructure:
- Search: PubMed, Semantic Scholar, DOI, arXiv (already built)
- Project references: if linked to ScholarSync project, shows collected papers
- BibTeX management: view/edit .bib file
- Insert: click reference -> inserts `\cite{key}` or formatted citation
- AI-suggested citations (GPT-5.2, occasional)
- Import: .bib upload, DOI bulk import

### Tab 4: Check — Integrity Suite

Existing integrity check system exposed in LaTeX context:
- AI Detection (already built)
- Plagiarism Check (already built)
- Citation Verification (already built)
- LaTeX-Specific Checks (new):
  - Unused references in .bib
  - Missing `\label{}` for referenced figures/tables
  - Package conflicts
  - Overfull/underfull hbox warnings (from compilation log)

---

## 8. File Tree (Hidden Left Panel)

```
+------------------+
| Project Files    |
|------------------|
| v My Paper/      |
|   main.tex       |  <- bold = active file
|   abstract.tex   |
|   methods.tex    |
|   > figures/     |
|   references.bib |
|                  |
| [+ New File]     |
| [^ Upload]       |
|                  |
| --- Outline ---  |
| 1. Introduction  |  <- auto-parsed from \section{}
| 2. Methods       |
|   2.1 Data       |
|   2.2 Analysis   |
| 3. Results       |
+------------------+
```

- Standard file tree for multi-file LaTeX projects
- Document Outline auto-generated from `\section{}`, `\subsection{}`
- Click outline item -> jumps to that section
- Drag-and-drop file upload for images
- Supports: .tex, .bib, .sty, .cls, images, .tikz

---

## 9. New Project Creation Flow

From LaTeX project list, user clicks [+ New Paper]:

```
+-------------------------------------------+
|  New Paper                                |
|                                           |
|  Start from:                              |
|  o Blank document                         |
|  o Template (IEEE, Nature, NEJM, thesis)  |
|  o Link to ScholarSync project            |
|  o Upload existing .tex files             |
|                                           |
|                          [Create]         |
+-------------------------------------------+
```

Template library: comprehensive set of major journal templates + thesis templates.

---

## 10. Compilation Architecture

### How It Works

Tectonic (MIT-licensed, ~50MB binary) installed in the existing Docker image.
No new service. No new billing. Same server.

```
User clicks [Compile]
  -> Button: [Compile] -> [Compiling...]
  -> POST /api/latex/compile
  -> Tectonic runs as child process (2-5 seconds)
  -> Success: PDF returned, rendered via pdfjs-dist
  -> Error: Compilation log parsed, error gutter markers placed
  -> Button resets
```

### Dockerfile Change

```dockerfile
FROM node:22-alpine AS base
RUN apk add --no-cache tectonic    # ~50MB, one line
```

### Compilation Monitoring

Built into `/api/latex/compile` route:

| Metric | How | Alert |
|--------|-----|-------|
| Compile duration (ms) | Sentry performance span | > 10s avg |
| Active compilations | In-memory counter, logged | > 5 concurrent |
| Queue wait time | Logged when waiting | Any wait > 0 |
| Server RAM/CPU | GCP Cloud Monitoring (free) | > 80% |

### Scale

| Users | Concurrent compiles (peak) | Handling |
|-------|---------------------------|----------|
| 10 | 1-2 | No issue |
| 100 | 3-5 | No issue |
| 500 | 5-10 | Compilation queue |
| 1,000+ | 10-20 | Bump instance RAM |

---

## 11. AI Model Strategy (Cost-Optimized)

### The Rule

Pick the cheapest model that produces acceptable quality for each task.
No provider loyalty. Best tool for each job.

### Model Routing

| Feature | Model | Why | Cost Per Use |
|---------|-------|-----|-------------|
| Inline edit (simple): grammar, formal, shorten | GPT-5 Nano ($0.05/$0.40) | Mechanical edits | ~$0.0001 |
| Inline edit (complex): strengthen, expand, restructure | GPT-5.2 ($1.75/$14) | Needs reasoning, proven in Deep Research | ~$0.0035 |
| Slash: /cite | No AI | PubMed/S2 API search | $0 |
| Slash: /table, /equation, /bib, /figure | GPT-5 Nano | Structured LaTeX generation | ~$0.0002 |
| Slash: /tikz | GPT-5.2 | Spatial reasoning | ~$0.002 |
| Error fixes | GPT-5 Nano | Mechanical | ~$0.0001 |
| Draft mode (agent panel) | GPT-5.2 | Full writing assistant, best reasoning per dollar | ~$0.021 |
| Learn mode (follow-up questions) | GPT-5 Nano | Explaining concepts | ~$0.0001 |
| Learn mode (common concepts) | No AI — static templates | Pre-written data file | $0 |
| Cite: AI-suggested citations | GPT-5.2 | Needs document understanding | ~$0.01 |
| Check tab | Existing infrastructure | Already built | Existing cost |

### Cost Per User Per Month

| User Type | Total LaTeX Editor AI Cost |
|-----------|--------------------------|
| Light (5 sessions/month) | ~$0.08-0.12 |
| Heavy (20 sessions/month) | ~$0.40-0.60 |
| Power (daily) | ~$1.20-1.50 |

### Draft Mode Optimization

Don't send entire document as context every message:
- Send: current section (~1-3K tokens) + document outline (~200 tokens)
- Only send full document when user asks about overall structure
- Prune conversation history after 10 messages (summarize earlier ones)

### Implementation in models.ts

```typescript
// Add to existing src/lib/ai/models.ts:
export function getLatexEditModel() {
  return getOpenAI()("gpt-5.2");       // Complex inline edits + Draft mode
}

export function getLatexUtilModel() {
  return getOpenAI()("gpt-5-nano");    // Simple edits, error fixes, LaTeX generation
}
```

Uses existing `@ai-sdk/openai` provider — already installed and configured.

---

## 12. Technology Stack

### New Packages (All MIT, All Free)

| Package | Purpose | License |
|---------|---------|---------|
| codemirror + @codemirror/* | Editor engine | MIT |
| codemirror-lang-latex | LaTeX syntax/autocomplete/linting | MIT |
| codemirror-latex-visual | Visual WYSIWYM decorators | MIT |
| latex.js | Client-side LaTeX -> HTML preview | MIT |
| yjs + y-websocket | Real-time collaboration | MIT |

### Already Installed (Zero New Cost)

| Package | Used For |
|---------|----------|
| katex | Math rendering in preview |
| pdfjs-dist + react-pdf | PDF rendering |
| citation-js | Citation parsing |
| @ai-sdk/openai | GPT-5.2 + GPT-5 Nano |
| @ai-sdk/anthropic | Available if needed |
| zustand | State management |

---

## 13. Database Schema (New Tables)

Three new tables in existing PostgreSQL, added to `src/lib/db/schema/editor.ts`:

```
latex_projects
  id              UUID PK
  user_id         TEXT (Clerk user)
  project_id      UUID FK -> projects (nullable, for linked projects)
  title           TEXT
  compiler        TEXT DEFAULT 'pdflatex'
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

latex_files
  id              UUID PK
  latex_project_id UUID FK -> latex_projects (cascade delete)
  path            TEXT        (e.g. "main.tex", "figures/fig1.png")
  content         TEXT        (for .tex, .bib, .sty files)
  is_main         BOOLEAN     (compilation entry point)
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

latex_compilations
  id              UUID PK
  latex_project_id UUID FK -> latex_projects
  status          TEXT        (success | error | warning)
  log             TEXT        (full compilation log)
  pdf_storage_key TEXT        (path to compiled PDF)
  duration_ms     INTEGER
  created_at      TIMESTAMP
```

---

## 14. Reference Repositories (All MIT)

| Repo | What to study | License |
|------|--------------|---------|
| OpenDCAI/OpenPrism | Architecture, Tectonic compilation, Yjs collab, AI integration | MIT |
| assistant-ui/open-prism | Next.js + CodeMirror + AI patterns | MIT |
| TeXlyre/codemirror-lang-latex | LaTeX syntax highlighting for CM6 | MIT |
| TeXlyre/codemirror-latex-visual | Visual WYSIWYM mode (experimental) | MIT |
| tectonic-typesetting/tectonic | MIT-licensed TeX engine | MIT |

---

## 15. What Makes This Beat Everyone

| Feature | Overleaf | Prism | ScholarSync |
|---------|----------|-------|-------------|
| Visual WYSIWYM mode | Basic, secondary | No | Default, first-class |
| Raw LaTeX source | Yes (primary) | Yes (primary) | Yes (one toggle away) |
| Inline AI editing | No | GPT-5.2 | GPT-5.2 + GPT-5 Nano (cost-optimized) |
| Learn Mode (teaches LaTeX) | No | No | Yes — Socratic tutor |
| Citation grounding | Zotero import (premium) | AI suggestions (can hallucinate) | PubMed/DOI/S2 search, zero hallucination |
| Integrity checks | No | No | AI detection + plagiarism + citation verification |
| Deep research pipeline | No | No | Yes (already built) |
| Compilation cost | Premium for fast compiles | Free (OpenAI subsidizes) | $0 (Tectonic on existing server) |
| Live preview | Server-rendered | Server-rendered | Client-side instant ($0) |
| Offline preview | No | No | Yes (KaTeX + LaTeX.js) |
| Teaches LaTeX | No | No (does it for you) | Yes (Learn Mode) |

---

## Appendix: Open-Source Research

### Prism (OpenAI) — UX Teardown
- Launched January 27, 2026 at prism.openai.com
- Split-screen: LaTeX source (left) + live PDF preview (right)
- Source-first — no visual/WYSIWYM mode
- GPT-5.2 inline editing: highlight text -> AI rewrites
- Free, unlimited projects/collaborators/compilation
- Weaknesses: no visual mode, no teaching, compilation can hang, citation hallucination, no integrity checks

### Open-Prism by assistant-ui (MIT)
- Next.js + CodeMirror + assistant-ui + Hono backend
- TeX Live Docker for compilation
- 2 commits, 51 stars — very early prototype

### OpenPrism by OpenDCAI (MIT)
- Vue.js + Vite + Node.js backend
- Supports both TeX Live AND Tectonic (auto-fallback)
- Yjs CRDT collaboration
- 208 stars, 30 commits, active development
- Template transfer (ACL, CVPR, NeurIPS, ICML)
- Most valuable reference for architecture

### TeXlyre
- React + CodeMirror + SwiftLaTeX WASM + Yjs
- Fully client-side compilation (no server needed)
- AGPL-3.0 license — cannot use in commercial product
- But: codemirror-lang-latex and codemirror-latex-visual packages are MIT (we CAN use these)

### SwiftLaTeX
- WASM compilation of pdfTeX and XeTeX
- Supports virtually all CTAN packages (on-demand download)
- AGPL license — cannot use directly
- 2x slower than native (still 2-5 seconds for typical paper)

### Tectonic
- MIT-licensed modern TeX engine in Rust
- ~50MB binary vs TeX Live's 5-7GB
- Auto-downloads packages from CTAN on demand
- Supports pdflatex, xelatex, lualatex
- Can be installed in existing Docker image with one line
