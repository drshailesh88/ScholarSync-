# LaTeX Editor — Implementation Plan

**Date:** 2026-02-27
**Design Doc:** docs/plans/2026-02-27-latex-editor-design-v2.md
**Branch:** feature/latex-editor (create from current HEAD)

---

## Phase 1: Foundation (Editor + Preview)

### Step 1.1: Install Dependencies & Create Route Shell
- Install: codemirror, @codemirror/*, codemirror-lang-latex, codemirror-latex-visual, latex.js, yjs, y-websocket
- Create route: `src/app/(app)/latex/page.tsx` (project list)
- Create route: `src/app/(app)/latex/[projectId]/page.tsx` (editor workspace)
- Create route: `src/app/(app)/latex/new/page.tsx` (new project)
- Add "LaTeX Editor" to sidebar navigation in AppSidebar
- Shell pages with basic layout only

### Step 1.2: Database Schema
- Add `latexProjects`, `latexFiles`, `latexCompilations` tables to `src/lib/db/schema/editor.ts`
- Run migration
- Create server actions: `src/lib/actions/latex.ts` (createProject, getProject, updateProject, deleteProject, createFile, updateFile, getFiles)

### Step 1.3: CodeMirror Source Editor
- Create `src/components/latex-editor/source-editor.tsx` — CodeMirror 6 with codemirror-lang-latex
- Features: syntax highlighting, bracket matching, auto-indentation, code folding, autocompletion, snippets, hover tooltips, linting
- Wire up auto-save: debounced save to DB via server action on every edit pause

### Step 1.4: Live Preview Panel
- Create `src/components/latex-editor/preview-panel.tsx`
- KaTeX for math rendering (already installed)
- LaTeX.js for document structure rendering
- Real-time updates as user types (client-side, no server call)
- Toggle between Live Preview and Full PDF modes

### Step 1.5: Top Bar
- Create `src/components/latex-editor/top-bar.tsx`
- Back button, editable title, save status indicator, compile button, export dropdown
- Compiler choice in overflow menu (pdflatex/xelatex/lualatex)

### Step 1.6: Layout Assembly
- Create `src/components/latex-editor/latex-workspace.tsx` — main layout component
- Two-panel split: editor (left) + preview (right)
- Resizable panels
- Hidden panel triggers: [<] for file tree, [>] for agent panel
- Zustand store: `src/stores/latex-editor-store.ts` (activeFile, mode, compileStatus, panelState)

**Phase 1 Deliverable:** A working LaTeX source editor with live preview. User can write LaTeX, see it rendered in real-time, save to DB. No compilation, no AI, no visual mode yet.

---

## Phase 2: Compilation & Visual Mode

### Step 2.1: Tectonic Compilation
- Update Dockerfile: add `tectonic` to Alpine packages
- Create API route: `src/app/api/latex/compile/route.ts`
  - Receives project ID
  - Writes .tex files to temp directory
  - Runs `tectonic main.tex` as child process
  - Returns compiled PDF + compilation log
  - Parses log for errors/warnings
  - Implements compilation queue (max N concurrent)
  - Logs metrics: duration, queue depth, success/failure (Sentry spans)
- Wire Compile button in top bar to API route
- Display compiled PDF in preview panel via pdfjs-dist

### Step 2.2: Error Gutter Markers
- Parse Tectonic compilation log for errors and warnings
- Map errors to line numbers
- Display red/yellow gutter markers in CodeMirror
- Click marker -> popover with error message + AI fix suggestion (GPT-5 Nano)

### Step 2.3: Visual Mode (WYSIWYM)
- Integrate codemirror-latex-visual decoration layer
- Mode toggle: [Visual | Source] at top of editor panel
- Visual mode renders: headings, bold/italic, equations (via MathLive), tables, figures, lists
- Same document buffer — both modes are views of the same content
- Cursor position preserved on toggle

### Step 2.4: Export
- Download PDF (from last compilation)
- Download .tex source
- Download full project as .zip (all files)

**Phase 2 Deliverable:** Full editing experience. Visual + Source modes, live preview, server compilation to PDF, error markers, export.

---

## Phase 3: AI Integration

### Step 3.1: Model Functions
- Add to `src/lib/ai/models.ts`:
  - `getLatexEditModel()` -> GPT-5.2 (complex edits + Draft)
  - `getLatexUtilModel()` -> GPT-5 Nano (simple edits, error fixes, LaTeX generation)

### Step 3.2: Inline AI — Highlight to Command
- Create `src/components/latex-editor/inline-ai-bar.tsx`
- On text selection: show floating bar with text input
- On submit: call GPT-5 Nano (simple edits) or GPT-5.2 (complex edits) via API route
- Stream replacement into document
- Show [Accept] [Revert] controls
- Auto-accept on cursor move
- API route: `src/app/api/latex/inline-edit/route.ts`
- Smart routing: classify edit complexity (grammar/formal -> Nano, strengthen/expand -> 5.2)

### Step 3.3: Slash Commands
- Extend CodeMirror with slash command extension
- `/` triggers dropdown menu with command options
- Each command has its own handler:
  - `/cite` -> opens citation search (no AI, uses existing PubMed/S2)
  - `/table`, `/equation`, `/figure`, `/bib` -> GPT-5 Nano generates LaTeX
  - `/tikz` -> GPT-5.2 generates TikZ
  - `/fix` -> GPT-5 Nano fixes nearest error
  - `/template` -> inserts static template (no AI)
- API route: `src/app/api/latex/generate/route.ts` (handles all slash command AI calls)

### Step 3.4: Error Fix AI
- Enhance error gutter popover from Step 2.2
- On click: send error + surrounding code to GPT-5 Nano
- Display explanation + suggested fix
- One-click apply

**Phase 3 Deliverable:** Full AI integration. Inline editing, slash commands, error fixes. All cost-optimized with model routing.

---

## Phase 4: Agent Panel

### Step 4.1: Panel Shell
- Create `src/components/latex-editor/agent-panel.tsx`
- Collapsible from right edge
- Four tabs: Draft, Learn, Cite, Check
- Smooth expand/collapse animation

### Step 4.2: Draft Tab
- Streaming multi-turn chat with document context
- Three intensity modes (Focus/Collaborate/Accelerate) — same pattern as Studio
- Smart context windowing: send current section + outline, not full document
- Conversation history pruning after 10 messages
- AI Model: GPT-5.2
- API route: `src/app/api/latex/draft-chat/route.ts`

### Step 4.3: Learn Tab
- Create `src/data/latex-concepts.ts` — static data file with ~50 LaTeX concept explanations
- Categories: Basics (15), Math (10), Floats & Media (8), Citations (7), Advanced (10)
- Each concept: title, explanation (2-3 sentences), code example, next concept suggestion
- On user action in Visual Mode: display relevant concept explanation
- Follow-up questions: GPT-5 Nano via chat interface
- Track encountered concepts in local state (Zustand)

### Step 4.4: Cite Tab
- Citation search using existing PubMed/S2/DOI infrastructure
- Project references panel (if linked to ScholarSync project)
- BibTeX file viewer/editor
- Click to insert `\cite{key}` at cursor position
- AI-suggested citations (occasional GPT-5.2 call based on current section)
- Import: .bib file upload, DOI bulk import

### Step 4.5: Check Tab
- Integrate existing integrity check system (AI detection, plagiarism, citation verification)
- Add LaTeX-specific checks:
  - Parse .bib for unused references
  - Parse .tex for missing \label{} on referenced items
  - Surface overfull/underfull hbox from compilation log
  - Detect package conflicts from compilation warnings

**Phase 4 Deliverable:** Complete agent panel with all four tabs functional.

---

## Phase 5: File Management & Collaboration

### Step 5.1: File Tree Panel
- Create `src/components/latex-editor/file-tree.tsx`
- Collapsible from left edge
- Display project files in tree structure
- Create new file, upload file (drag-and-drop), rename, delete
- Document outline auto-generated from \section{} commands
- Click outline item -> jump to section in editor

### Step 5.2: Multi-File Projects
- Support multiple .tex files (main.tex + includes)
- Support .bib, .sty, .cls files
- Tab system or file switching in editor
- Compilation uses main file (is_main flag)

### Step 5.3: New Project Flow
- Template selection (blank, IEEE, Nature, NEJM, thesis, etc.)
- Link to existing ScholarSync project
- Upload existing .tex files
- Project creation -> redirects to editor

### Step 5.4: Collaboration (Yjs)
- Yjs CRDT integration with CodeMirror
- y-websocket server running in same Node.js process
- Real-time cursor positions and presence indicators
- Conflict-free concurrent editing

**Phase 5 Deliverable:** Complete file management, templates, and real-time collaboration.

---

## Phase 6: Polish & Quality

### Step 6.1: Design Polish
- Apply ScholarSync design language (glass panels, brand colors, typography)
- Dark/light theme support
- Responsive layout (but primarily desktop — LaTeX editing is a desktop activity)
- Loading states, transitions, micro-interactions
- Keyboard shortcuts (Cmd+S save, Cmd+Enter compile, Cmd+/ toggle mode)

### Step 6.2: Performance
- Lazy load CodeMirror and LaTeX.js (large bundles)
- Debounce preview updates
- Cache compiled PDFs until source changes
- Compilation queue with max concurrency

### Step 6.3: Testing
- Unit tests for compilation API route
- Unit tests for LaTeX concept data file
- Integration tests for project CRUD
- E2E test: create project -> write LaTeX -> compile -> download PDF

---

## Implementation Notes

### File Structure

```
src/
  app/
    (app)/
      latex/
        page.tsx                    # Project list
        new/page.tsx                # New project creation
        [projectId]/page.tsx        # Editor workspace
    api/
      latex/
        compile/route.ts            # Tectonic compilation
        projects/[id]/route.ts      # Project CRUD
        projects/[id]/files/route.ts # File management
        inline-edit/route.ts        # Inline AI editing
        generate/route.ts           # Slash command generation
        draft-chat/route.ts         # Draft mode streaming chat
  components/
    latex-editor/
      latex-workspace.tsx           # Main layout
      source-editor.tsx             # CodeMirror 6 editor
      visual-editor.tsx             # Visual mode wrapper
      preview-panel.tsx             # KaTeX + LaTeX.js + PDF
      top-bar.tsx                   # Navigation + compile + export
      inline-ai-bar.tsx             # Floating AI command bar
      slash-command-menu.tsx         # Slash command dropdown
      error-gutter.tsx              # Compilation error markers
      agent-panel.tsx               # Collapsible right panel
      draft-tab.tsx                 # Draft mode chat
      learn-tab.tsx                 # Learn mode display
      cite-tab.tsx                  # Citation management
      check-tab.tsx                 # Integrity checks
      file-tree.tsx                 # File tree + outline
      mode-toggle.tsx               # Visual/Source toggle
  stores/
    latex-editor-store.ts           # Zustand store
  data/
    latex-concepts.ts               # 50 pre-written LaTeX explanations
  lib/
    ai/
      models.ts                     # Add getLatexEditModel(), getLatexUtilModel()
    actions/
      latex.ts                      # Server actions for project/file CRUD
    db/
      schema/
        editor.ts                   # Add latexProjects, latexFiles, latexCompilations
```

### Dependencies on Existing Code

| Existing Code | Used By |
|--------------|---------|
| `src/lib/ai/models.ts` | New model functions for LaTeX |
| `src/lib/db/schema/editor.ts` | New tables |
| `src/components/layout/app-sidebar.tsx` | Add LaTeX Editor nav item |
| `src/app/api/search/` | Cite tab uses existing PubMed/S2 search |
| `src/components/integrity/` | Check tab wraps existing integrity system |
| KaTeX (package.json) | Preview panel math rendering |
| pdfjs-dist + react-pdf (package.json) | PDF display after compilation |
| citation-js (package.json) | Citation parsing in Cite tab |
| @ai-sdk/openai (package.json) | GPT-5.2 and GPT-5 Nano |
| Zustand (package.json) | Editor state management |
