# latex — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Mobile and Overlay Behavior
- [x] PASS: Desktop right-edge AI toggle tab is hidden on both mobile and tablet widths
- [x] PASS: Desktop left-edge file-tree toggle tab remains visible whenever `!isMobile`
#### Preview Panel Details
- [x] PASS: Live preview debounces HTML conversion by 150 ms
- [x] PASS: Live preview renders from store-backed `documentContent`, not directly from the editor DOM
- [x] PASS: PDF preview renders only when `previewMode === "pdf"` and a `compiledPdfUrl` exists
- [x] PASS: If preview mode is `pdf` but there is no compiled PDF URL yet, the panel falls back to the live preview renderer
- [x] PASS: Live preview imports KaTeX CSS from a CDN inside a global `<style jsx>` block
- [x] PASS: Math-rendering failures show escaped source inside `.latex-math-error` elements instead of crashing the preview
- [x] PASS: Preview scroll sync targets the last element whose `data-line` is less than or equal to the editor's current top line
#### Inline AI and Slash Menu Details
- [x] PASS: `Cmd/Ctrl+K` opens inline AI only when the current CodeMirror selection contains non-whitespace text
- [x] PASS: Inline AI starts with four preset chips: `Improve`, `Formalize`, `Shorten`, and `Fix grammar`
- [x] PASS: Clicking a preset chip both fills the instruction input and immediately submits that instruction
- [x] PASS: Inline AI input placeholder is `Edit instruction...`
- [x] PASS: Inline AI submit button swaps from a send icon to a spinning loader while streaming
- [x] PASS: Inline AI error responses are rendered inline as plain text beginning with `Error:`
- [x] PASS: `Accept` is only meaningful when the streamed result does not begin with `Error:`
- [x] PASS: Pressing Escape while a result is visible triggers the local revert/reset flow before fully dismissing the bar
- [x] PASS: Pressing Enter accepts the result only when a suggestion exists, streaming is finished, and the text input does not have focus
- [x] PASS: Slash-command menu options are `/table`, `/figure`, `/equation`, `/tikz`, `/cite`, `/bib`, `/fix`, and `/template`
- [x] PASS: Slash-command rows show a model badge only for AI-backed commands (`Claude` or `Nano`)
- [x] PASS: Slash-command keyboard navigation always starts from index 0 because the menu remounts each time
- [x] PASS: Slash-command menu returns `null` instead of showing an empty-state row when the filter matches nothing
#### Agent Panel Details
- [x] PASS: Agent-panel tabs are exactly `draft`, `learn`, `cite`, and `check`
- [x] PASS: Agent-panel default tab is `draft`
- [x] PASS: Draft tab empty state copy is `Ask Claude to help with your paper — structure, arguments, writing, LaTeX code.`
- [x] PASS: Draft-tab composer placeholder is `Help me strengthen my methods section...`
- [x] PASS: Draft-tab send button is disabled while loading or when the prompt is blank
- [x] PASS: File-tree `latex:draft-section` auto-send flow forces draft-chat intensity to `accelerate`
- [x] PASS: Manual draft-chat sends use intensity `collaborate`
- [x] PASS: Draft-tab failures are silent in the current implementation and do not render an error banner
- [x] PASS: Learn-tab search placeholder is `Search concepts...`
- [x] PASS: Learn-tab category list shows the total concept count beside `LaTeX Concepts`
- [x] PASS: Learn-tab copy-code button flips to a green check state for 1.5 seconds after copying
- [x] PASS: Cite-tab search placeholder is `Search papers...`
- [x] PASS: Cite-tab empty state explicitly says `Search PubMed & Semantic Scholar, then click to insert \\cite{key}`
