# feeds — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article Search & Filters
#### Sort Toggle
- [x] PASS: Toggles between newest/oldest sort direction
#### Advanced Filter Panel (Collapsible)
- [x] PASS: **Date range**: FROM and TO date input fields
- [x] PASS: **Journal dropdown**: "All journals" default, populated from available journals
- [x] PASS: **Sort by buttons** (3-column): Date (published) | Added | Title
- [x] PASS: **Clear all filters** button (visible only when filters active)
#### Filter Indicators
- [x] PASS: Active filters show blue highlight: `bg-brand/10 text-brand border-brand/20`

### Article Reader (Reading Pane)
#### Empty State
- [x] PASS: Glass panel with centered text: "Select an article to read"
#### Article Content
- [x] PASS: **Title**: text-lg font-bold
- [x] PASS: **Authors**: text-sm text-ink-muted
- [x] PASS: **Journal info**: "Journal · Vol. X · Issue Y" (text-xs)
- [x] PASS: **Publication date**: "Published {date}" or "Publication date unavailable"
- [x] PASS: **Reading time estimate**
#### Abstract Section
- [x] PASS: Header: "Abstract"
- [x] PASS: Content: text-sm text-ink-muted, leading-relaxed
- [x] PASS: Hidden if no abstract available
#### DOI Section
- [x] PASS: Format: "DOI: {doi}" with clickable link to `https://doi.org/{doi}`
- [x] PASS: Hidden if no DOI

### Article Notes
- [x] PASS: NoteBlank icon + "Notes" header
- [x] PASS: Textarea with 3 rows
- [x] PASS: Placeholder: "Add your notes about this article..."
- [x] PASS: Auto-save after 1 second of inactivity
- [x] PASS: Saves on blur if changes pending
- [x] PASS: "Saved" indicator (Check icon) appears for 2 seconds after save
- [x] PASS: Loads existing notes via `GET /api/feeds/articles/{id}/notes`
- [x] PASS: Saves via `PUT /api/feeds/articles/{id}/notes`

### Related Papers
#### Initial State
- [x] PASS: "Find Related Papers" button displayed
#### Loading State
- [x] PASS: Spinner + "Finding related papers..."
#### Error State
- [x] PASS: "Could not find related papers" message
#### Results
- [x] PASS: List of related paper cards:
- [x] PASS: Title: text-sm font-medium
- [x] PASS: Authors: "Author1, Author2 et al. · Journal · Year"
- [x] PASS: DOI link: `https://doi.org/{doi}`
- [x] PASS: PubMed link: `https://pubmed.ncbi.nlm.nih.gov/{pmid}`
- [x] PASS: Citation count: "{count} citations"
- [x] PASS: "Save to Library" button per paper:
