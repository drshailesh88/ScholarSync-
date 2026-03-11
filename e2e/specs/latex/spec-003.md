# latex — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Visual Editor (WYSIWYM)
- [ ] **Section headings** — `\section{}` renders as h1-style, `\subsection{}` as h2, `\subsubsection{}` as h3
- [ ] **Bold text** — `\textbf{}` shows visual bold styling
- [ ] **Italic text** — `\textit{}` shows visual italic styling
- [ ] **Underline** — `\underline{}` shows underline decoration
- [ ] **Monospace** — `\texttt{}` shows monospace styling
- [ ] **Maintains underlying LaTeX source** — decorations don't change the source
- [ ] Content changes trigger `onChange` callback

### Preview Panel
#### Live Preview (KaTeX)
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
#### PDF Preview
- [ ] **Embedded PDF viewer** — shows compiled PDF
- [ ] Displayed after successful compilation
- [ ] Auto-switches to PDF mode on compilation success

### Compilation System
#### Compile Trigger
- [ ] **Compile button** in top bar
- [ ] **Cmd+Enter** keyboard shortcut
- [ ] **`/fix` slash command** — triggers compilation
- [ ] **Auto-saves** current file before compiling
#### Compilation Status
- [ ] **Idle** — compile button ready
- [ ] **Compiling** — loading state on button
- [ ] **Success** — success indicator, auto-switches preview to PDF mode
- [ ] **Error** — error indicator, diagnostics displayed in error gutter
#### Retry Logic
- [ ] **Rate limit (429)** — waits `Retry-After` seconds, retries up to 2 times
