# latex — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Error Gutter Panel — Expanded Details
- [x] PASS: Line number link displays as "L{line}" format (e.g., "L42") and is clickable to jump
- [x] PASS: Category badge (e.g., "Syntax", "Package", "Math") appears only when enriched explanation differs from raw message
- [x] PASS: Category label mapping: syntax→"Syntax", package→"Package", math→"Math", reference→"Reference", font→"Font", file→"File", other→"General"
- [x] PASS: Error-gutter fix button context extraction (in the panel itself) uses ±5 lines (11 lines total), but the workspace handler re-extracts its own ±2 line context
#### Error Intelligence (`error-intelligence.ts`)
- [x] PASS: 20+ regex patterns organized into 7 categories: syntax, package, math, reference, font, file, other
- [x] PASS: Pattern matching substitutes regex capture groups ($1, $2) into explanation and suggestion templates
- [x] PASS: Unmatched errors return the raw message as the explanation, null suggestion, and "other" category
- [x] PASS: Specific patterns include: "Undefined control sequence" (with and without command name), "Missing $ inserted", "Missing \\begin{document}", "Missing { or } inserted", "Extra }", "Misplaced alignment tab character &", "\\begin{X} ended by \\end{Y}", "Environment X undefined", "File not found", "Unknown option for package", "Package Error", "Option clash", "Display math should end with $$", "Double subscript/superscript", "Extra alignment tab", "Citation undefined", "Reference undefined", "Label multiply defined", "undefined references", "Font not found/unavailable", "Encoding scheme unknown", "can't write on file", "Emergency stop", "Overfull \\hbox (with pt value)", "Underfull \\hbox"
#### Spell Check Extension (`spell-check-extension.ts`)
- [x] PASS: Spell check linter calls POST `/api/latex/spell-check` with `{ content }` body
- [x] PASS: Spell check debounce delay is 2000ms
- [x] PASS: Spell check skips documents shorter than 10 characters (returns empty array)
- [x] PASS: Spell check diagnostics use severity "info" (blue squiggly underlines, not red)
- [x] PASS: Each misspelling message reads `Unknown word: "{word}"`
- [x] PASS: Up to 3 replacement suggestions shown per misspelled word as CodeMirror lint actions
- [x] PASS: Suggestion actions directly replace the misspelled word in the editor via `view.dispatch`
- [x] PASS: `createAddToDictionaryAction` function exists and POSTs to `/api/latex/spell-check/add` with `{ word }`
- [x] PASS: Spell check fetch errors are caught silently (returns empty diagnostics)
#### Visual Editor — Theme & Decorations
- [x] PASS: Visual editor hides line number gutters entirely via CSS `display: "none"`
- [x] PASS: Visual editor uses sans-serif font stack: `'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif`
- [x] PASS: Visual editor content area has `maxWidth: "680px"` with auto margins for centered layout
- [x] PASS: Visual editor content padding is `24px 32px` (vs source editor's `16px 0`)
- [x] PASS: Visual editor base font size is 14px with line-height 1.7
- [x] PASS: `\emph{}` is rendered identically to `\textit{}` (italic decoration)
- [x] PASS: `\cite[tp]?{}` matches receive brand-colored background styling (`.cm-visual-cite` class)
- [x] PASS: `\item` lines receive 24px left padding (`.cm-visual-list-item` class)
- [x] PASS: `\begin{equation|align|figure|table|itemize|enumerate}` and corresponding `\end{}` lines get a 2px brand-colored left border at 0.6 opacity and 0.85em font size
- [x] PASS: `findMatchingBrace()` correctly handles nested brace depth counting
- [x] PASS: Visual editor includes `closeBrackets()` and `autocompletion()` extensions explicitly
- [x] PASS: Visual editor active line has transparent background (no highlight)
#### Collaboration Provider
- [x] PASS: Collaboration gracefully degrades (no WebSocket connection) when `NEXT_PUBLIC_COLLABORATION_WS_URL` env var is not set
- [x] PASS: Room ID format: `latex-project-{sanitized}` where non-alphanumeric characters become hyphens
- [x] PASS: 8 collaborator colors: `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`, `#DDA0DD`, `#98D8C8`, `#F7DC6F`
- [x] PASS: Color assignment is deterministic: character code sum of userId modulo 8
- [x] PASS: Default current user name is "You"
- [x] PASS: Typing status auto-resets to false after 2000ms timeout via `setIsTyping`
