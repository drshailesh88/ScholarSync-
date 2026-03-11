# latex — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Agent Panel — AI Assistant
#### Check Tab (Client-side, no AI)
- [ ] **Package conflicts** — detects conflicts:
- [ ] **Environment matching** — validates `\begin{}`/`\end{}` balance

### Inline AI Bar
- [ ] **Trigger** — `Cmd+K` with text selected in the editor
- [ ] **Positioning** — appears near the selection (8px below)
- [ ] **Single AI suggestion** — sends selected text for AI rewrite
- [ ] **Replace button** — replaces selected text with AI suggestion in editor
- [ ] **Dismiss button** — closes the bar without changes
- [ ] **Escape key** — dismisses the bar

### Slash Command Menu
#### Slash Menu UX
- [ ] Appears when `/` typed at line start
- [ ] **Dynamic filtering** — updates as user types after `/`
- [ ] **Positioned** near cursor using screen coordinates
- [ ] **Escape** dismisses the menu
- [ ] After selecting command, the `/` text is removed from editor

### Spell Check
- [ ] **CodeMirror extension** — integrated spell checking
- [ ] **Server-side** — uses `/api/latex/spell-check` endpoint
- [ ] **LaTeX-aware** — ignores LaTeX commands, only checks natural text
- [ ] **Dictionary integration** — standard dictionary support

### Collaboration (Real-time)
#### YjsCollaborationProvider
- [ ] **CRDT-based** — conflict-free concurrent editing
- [ ] **WebSocket connection** — real-time sync
- [ ] **Connection status tracking** — connected/disconnected states
#### Collaborator Awareness
- [ ] **User presence** — see who is currently editing
- [ ] **Avatars in top bar** — collaborator profile pictures/initials

### Citation System
#### Citation Search (Cite Tab)
- [ ] Search PubMed and Semantic Scholar databases
- [ ] Results show author, title, year
- [ ] Up to 10 results per search
#### Fallback
- [ ] If `.bib` file creation fails, BibTeX is copied to clipboard

### Export
#### Download PDF
- [ ] Downloads the compiled PDF blob
- [ ] Filename: `{projectTitle}.pdf` (sanitized)
- [ ] Requires successful compilation first
- [ ] Export handler no-ops if no compiled PDF URL is available yet
#### Download .tex
- [ ] Downloads the current editor content as `.tex` file
- [ ] Filename: `main.tex`
- [ ] MIME type: `text/x-tex`
- [ ] Always available (doesn't require compilation)
#### Download as .zip
- [ ] Bundles **all project files** (`.tex`, `.bib`, images, etc.) into a ZIP
