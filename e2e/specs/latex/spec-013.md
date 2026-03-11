# latex — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Error Gutter Panel — Expanded Details
- [ ] Line number link displays as "L{line}" format (e.g., "L42") and is clickable to jump
- [ ] Category badge (e.g., "Syntax", "Package", "Math") appears only when enriched explanation differs from raw message
- [ ] Category label mapping: syntax→"Syntax", package→"Package", math→"Math", reference→"Reference", font→"Font", file→"File", other→"General"
- [ ] Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context
#### Error Intelligence (`error-intelligence.ts`)
- [ ] 20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other
- [ ] Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates
- [ ] Unmatched errors return the raw message as the explanation, null suggestion, and "other" category
- [ ] Specific patterns include: "Undefined control sequence" (with and without command name), "Missing $ inserted", "Missing \\begin{document}", "Missing { or } inserted", "Extra }", "Misplaced alignment tab character &", "\\begin{X} ended by \\end{Y}", "Environment X undefined", "File not found", "Unknown option for package", "Package Error", "Option clash", "Display math should end with $$", "Double subscript/superscript", "Extra alignment tab", "Citation undefined", "Reference undefined", "Label multiply defined", "undefined references", "Font not found/unavailable", "Encoding scheme unknown", "can't write on file", "Emergency stop", "Overfull \\hbox (with pt value)", "Underfull \\hbox"
#### Spell Check Extension (`spell-check-extension.ts`)
- [ ] Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body
- [ ] Spell check debounce delay is 2000ms
- [ ] Spell check skips documents shorter than 10 characters (returns empty array)
- [ ] Spell check diagnostics use severity "info" (blue squiggly underlines, not red)
- [ ] Each misspelling message reads `Unknown word: "{word}"`
- [ ] Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions
- [ ] Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`
- [ ] `createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`
- [ ] Spell check fetch errors are caught silently (returns empty diagnostics)
#### Visual Editor — Theme & Decorations
- [ ] Visual editor hides line number gutters entirely via CSS `display: "none"`
- [ ] Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`
- [ ] Visual editor content area has `maxWidth: "680px"` with auto margins for centered layout
- [ ] Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)
- [ ] Visual editor base font size is 14px with line-height 1.7
- [ ] `\emph{}` is rendered identically to `\textit{}` (italic decoration)
- [ ] `\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)
- [ ] `\item` lines receive 24px left padding (`.cm-visual-list-item` class)
- [ ] `\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size
- [ ] `findMatchingBrace()` correctly handles nested brace depth counting
- [ ] Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly
- [ ] Visual editor active line has transparent background (no highlight)
#### Collaboration Provider
- [ ] Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set
- [ ] Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens
- [ ] 8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`
- [ ] Color assignment is deterministic: character code sum of userId modulo 8
- [ ] Default current user name is "You"
- [ ] Typing status auto-resets to false after 2000ms timeout via `setIsTyping`
