# latex — Spec 005

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Comment Panel
- [x] PASS: **Comment CRUD** — create, read, update, delete via `/api/latex/comments`

### Agent Panel — AI Assistant
#### Draft Tab
- [x] PASS: **Streaming chat** — real-time AI responses via Claude Sonnet
- [x] PASS: **Smart context windowing**:
- [x] PASS: Extracts current section from document
- [x] PASS: Includes document outline for context
- [x] PASS: **Section drafting** — drag-and-drop from file tree outline
- [x] PASS: **Two intensity levels**: "collaborate" and "accelerate"
- [x] PASS: **Streaming response** — token-by-token display
#### Learn Tab
- [x] PASS: **50+ LaTeX concepts database** organized by category:
- [x] PASS: Basics
- [x] PASS: Formatting
- [x] PASS: Math
- [x] PASS: Structures
- [x] PASS: References
- [x] PASS: Advanced
- [x] PASS: **Concept viewer** with:
- [x] PASS: Explanation text
- [x] PASS: LaTeX code example
- [x] PASS: **Copy-to-clipboard** button
- [x] PASS: **Next concept** navigation
- [x] PASS: **Full-text search** across concepts and categories
- [x] PASS: **Category browsing** — click category to filter
#### Cite Tab
- [x] PASS: **PubMed + Semantic Scholar search** — integrated literature search
- [x] PASS: **One-click citation insertion**:
- [x] PASS: Auto-generates BibTeX entry
- [x] PASS: Inserts `\cite{key}` at cursor position in editor
- [x] PASS: Creates `references.bib` file if it doesn't exist
- [x] PASS: Appends to existing `.bib` file if present
- [x] PASS: **Citation format** — Author Year style keys
- [x] PASS: **10 results per search** limit
- [x] PASS: Uses `latex:insert-bibtex` custom event for editor integration
#### Check Tab (Client-side, no AI)
- [x] PASS: **Unused labels** — warns on `\label{}` not referenced by `\ref{}`
- [x] PASS: **Undefined references** — errors on `\ref{}` without matching `\label{}`
- [x] PASS: **Unused bibliography entries** — warns on `.bib` entries not cited
- [x] PASS: **Missing `\label` after `\section`** — warns on unlabeled sections
