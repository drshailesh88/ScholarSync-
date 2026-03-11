# latex — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Top Bar
#### Right Section
- [ ] **Compile button** — with status indicator (idle/compiling/success/error)
- [ ] **Export dropdown** — three options:
- [ ] Download PDF
- [ ] Download .tex
- [ ] Download as .zip
- [ ] **Collaborator avatars** — shows active users

### Source Editor (CodeMirror 6)
#### Syntax Highlighting
- [ ] **Keywords** — violet color
- [ ] **Strings** — green color
- [ ] **Comments** — slate/italic
- [ ] **Brackets** — orange color
- [ ] **Light/dark theme** — adapts to app theme
#### Editor Features
- [ ] **Line numbers** — displayed in gutter
- [ ] **Code folding** — fold gutter for collapsing sections
- [ ] **Bracket matching** — matching brackets highlighted
- [ ] **Auto-close brackets** — typing `{` auto-inserts `}`
- [ ] **Search and replace** — built-in CodeMirror search
- [ ] **Rectangular selection** — Alt+drag for column selection
- [ ] **Active line highlighting** — current line has background
- [ ] **Linting gutter** — error/warning markers in gutter
- [ ] **Spellcheck** — enabled via extension
#### Scroll Sync
- [ ] **Editor scroll** updates preview scroll position
- [ ] Line number tracking via `onScrollLine` callback
#### Slash Command Detection
- [ ] Typing `/` at line start triggers slash command menu
- [ ] Provides screen coordinates for menu positioning
- [ ] Dynamic filtering as user types after `/`
#### Diagnostic Display
- [ ] Inline error/warning markers from compilation
- [ ] Auto-scroll to first error on compilation failure
- [ ] Severity levels: error (red) and warning (amber)
#### Editor API (exposed via ref)
- [ ] `getSelection()` — returns selected text
- [ ] `insertAtCursor(text)` — inserts text at cursor
- [ ] `setContent(text)` — replaces editor content
- [ ] `scrollToLine(line)` — scrolls to specific line
- [ ] `getView()` — returns CodeMirror view instance
- [ ] `setDiagnostics(diagnostics)` — sets inline error markers
- [ ] `clearDiagnostics()` — removes all markers
