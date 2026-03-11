# latex — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Comment Panel
- [ ] **Comment CRUD** — create, read, update, delete via `/api/latex/comments`

### Agent Panel — AI Assistant
#### Draft Tab
- [ ] **Streaming chat** — real-time AI responses via Claude Sonnet
- [ ] **Smart context windowing**:
- [ ] Extracts current section from document
- [ ] Includes document outline for context
- [ ] **Section drafting** — drag-and-drop from file tree outline
- [ ] **Two intensity levels**: "collaborate" and "accelerate"
- [ ] **Streaming response** — token-by-token display
#### Learn Tab
- [ ] **50+ LaTeX concepts database** organized by category:
- [ ] Basics
- [ ] Formatting
- [ ] Math
- [ ] Structures
- [ ] References
- [ ] Advanced
- [ ] **Concept viewer** with:
- [ ] Explanation text
- [ ] LaTeX code example
- [ ] **Copy-to-clipboard** button
- [ ] **Next concept** navigation
- [ ] **Full-text search** across concepts and categories
- [ ] **Category browsing** — click category to filter
#### Cite Tab
- [ ] **PubMed + Semantic Scholar search** — integrated literature search
- [ ] **One-click citation insertion**:
- [ ] Auto-generates BibTeX entry
- [ ] Inserts `\cite{key}` at cursor position in editor
- [ ] Creates `references.bib` file if it doesn't exist
- [ ] Appends to existing `.bib` file if present
- [ ] **Citation format** — Author Year style keys
- [ ] **10 results per search** limit
- [ ] Uses `latex:insert-bibtex` custom event for editor integration
#### Check Tab (Client-side, no AI)
- [ ] **Unused labels** — warns on `\label{}` not referenced by `\ref{}`
- [ ] **Undefined references** — errors on `\ref{}` without matching `\label{}`
- [ ] **Unused bibliography entries** — warns on `.bib` entries not cited
- [ ] **Missing `\label` after `\section`** — warns on unlabeled sections
