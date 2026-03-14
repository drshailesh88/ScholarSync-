# latex — Spec 002

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Top Bar
#### Right Section
- [x] PASS: **Compile button** — with status indicator (idle/compiling/success/error)
- [x] PASS: **Export dropdown** — three options:
- [x] PASS: Download PDF
- [x] PASS: Download .tex
- [x] PASS: Download as .zip
- [x] PASS: **Collaborator avatars** — shows active users

### Source Editor (CodeMirror 6)
#### Syntax Highlighting
- [x] PASS: **Keywords** — violet color
- [x] PASS: **Strings** — green color
- [x] PASS: **Comments** — slate/italic
- [x] PASS: **Brackets** — orange color
- [x] PASS: **Light/dark theme** — adapts to app theme
#### Editor Features
- [x] PASS: **Line numbers** — displayed in gutter
- [x] PASS: **Code folding** — fold gutter for collapsing sections
- [x] PASS: **Bracket matching** — matching brackets highlighted
- [x] PASS: **Auto-close brackets** — typing `{` auto-inserts `}`
- [x] PASS: **Search and replace** — built-in CodeMirror search
- [x] PASS: **Rectangular selection** — Alt+drag for column selection
- [x] PASS: **Active line highlighting** — current line has background
- [x] PASS: **Linting gutter** — error/warning markers in gutter
- [x] PASS: **Spellcheck** — enabled via extension
#### Scroll Sync
- [x] PASS: **Editor scroll** updates preview scroll position
- [x] PASS: Line number tracking via `onScrollLine` callback
#### Slash Command Detection
- [x] PASS: Typing `/` at line start triggers slash command menu
- [x] PASS: Provides screen coordinates for menu positioning
- [x] PASS: Dynamic filtering as user types after `/`
#### Diagnostic Display
- [x] PASS: Inline error/warning markers from compilation
- [x] PASS: Auto-scroll to first error on compilation failure
- [x] PASS: Severity levels: error (red) and warning (amber)
#### Editor API (exposed via ref)
- [x] PASS: `getSelection()` — returns selected text
- [x] PASS: `insertAtCursor(text)` — inserts text at cursor
- [x] PASS: `setContent(text)` — replaces editor content
- [x] PASS: `scrollToLine(line)` — scrolls to specific line
- [x] PASS: `getView()` — returns CodeMirror view instance
- [x] PASS: `setDiagnostics(diagnostics)` — sets inline error markers
- [x] PASS: `clearDiagnostics()` — removes all markers
