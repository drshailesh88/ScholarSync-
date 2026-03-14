# latex — Spec 006

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Agent Panel — AI Assistant
#### Check Tab (Client-side, no AI)
- [x] PASS: **Package conflicts** — detects conflicts:
- [x] PASS: **Environment matching** — validates `\begin{}`/`\end{}` balance

### Inline AI Bar
- [x] PASS: **Trigger** — `Cmd+K` with text selected in the editor
- [x] PASS: **Positioning** — appears near the selection (8px below)
- [x] PASS: **Single AI suggestion** — sends selected text for AI rewrite
- [x] PASS: **Replace button** — replaces selected text with AI suggestion in editor
- [x] PASS: **Dismiss button** — closes the bar without changes
- [x] PASS: **Escape key** — dismisses the bar

### Slash Command Menu
#### Slash Menu UX
- [x] PASS: Appears when `/` typed at line start
- [x] PASS: **Dynamic filtering** — updates as user types after `/`
- [x] PASS: **Positioned** near cursor using screen coordinates
- [x] PASS: **Escape** dismisses the menu
- [x] PASS: After selecting command, the `/` text is removed from editor

### Spell Check
- [x] PASS: **CodeMirror extension** — integrated spell checking
- [x] PASS: **Server-side** — uses `/api/latex/spell-check` endpoint
- [x] PASS: **LaTeX-aware** — ignores LaTeX commands, only checks natural text
- [x] PASS: **Dictionary integration** — standard dictionary support

### Collaboration (Real-time)
#### YjsCollaborationProvider
- [x] PASS: **CRDT-based** — conflict-free concurrent editing
- [x] PASS: **WebSocket connection** — real-time sync
- [x] PASS: **Connection status tracking** — connected/disconnected states
#### Collaborator Awareness
- [x] PASS: **User presence** — see who is currently editing
- [x] PASS: **Avatars in top bar** — collaborator profile pictures/initials

### Citation System
#### Citation Search (Cite Tab)
- [x] PASS: Search PubMed and Semantic Scholar databases
- [x] PASS: Results show author, title, year
- [x] PASS: Up to 10 results per search
#### Fallback
- [x] PASS: If `.bib` file creation fails, BibTeX is copied to clipboard

### Export
#### Download PDF
- [x] PASS: Downloads the compiled PDF blob
- [x] PASS: Filename: `{projectTitle}.pdf` (sanitized)
- [x] PASS: Requires successful compilation first
- [x] PASS: Export handler no-ops if no compiled PDF URL is available yet
#### Download .tex
- [x] PASS: Downloads the current editor content as `.tex` file
- [x] PASS: Filename: `main.tex`
- [x] PASS: MIME type: `text/x-tex`
- [x] PASS: Always available (doesn't require compilation)
#### Download as .zip
- [x] PASS: Bundles **all project files** (`.tex`, `.bib`, images, etc.) into a ZIP
