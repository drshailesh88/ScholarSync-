# feeds — Spec 003

STATUS: PARTIAL
TESTED: 35/35
PASS: 7
FAIL: 28
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article Search & Filters
#### Sort Toggle
- [x] PASS: Toggles between newest/oldest sort direction
#### Advanced Filter Panel (Collapsible)
- [ ] FAIL: **Date range**: FROM and TO date input fields
- [ ] FAIL: **Journal dropdown**: "All journals" default, populated from available journals
- [ ] FAIL: **Sort by buttons** (3-column): Date (published) | Added | Title
- [x] PASS: **Clear all filters** button (visible only when filters active)
#### Filter Indicators
- [x] PASS: Active filters show blue highlight: `bg-brand/10 text-brand border-brand/20`

### Article Reader (Reading Pane)
#### Empty State
- [ ] FAIL: Glass panel with centered text: "Select an article to read"
#### Article Content
- [ ] FAIL: **Title**: text-lg font-bold
- [ ] FAIL: **Authors**: text-sm text-ink-muted
- [ ] FAIL: **Journal info**: "Journal · Vol. X · Issue Y" (text-xs)
- [ ] FAIL: **Publication date**: "Published {date}" or "Publication date unavailable"
- [ ] FAIL: **Reading time estimate**
#### Abstract Section
- [ ] FAIL: Header: "Abstract"
- [ ] FAIL: Content: text-sm text-ink-muted, leading-relaxed
- [ ] FAIL: Hidden if no abstract available
#### DOI Section
- [ ] FAIL: Format: "DOI: {doi}" with clickable link to `https://doi.org/{doi}`
- [ ] FAIL: Hidden if no DOI

### Article Notes
- [ ] FAIL: NoteBlank icon + "Notes" header
- [ ] FAIL: Textarea with 3 rows
- [ ] FAIL: Placeholder: "Add your notes about this article..."
- [ ] FAIL: Auto-save after 1 second of inactivity
- [ ] FAIL: Saves on blur if changes pending
- [ ] FAIL: "Saved" indicator (Check icon) appears for 2 seconds after save
- [x] PASS: Loads existing notes via `GET /api/feeds/articles/{id}/notes`
- [ ] FAIL: Saves via `PUT /api/feeds/articles/{id}/notes`

### Related Papers
#### Initial State
- [x] PASS: "Find Related Papers" button displayed
#### Loading State
- [x] PASS: Spinner + "Finding related papers..."
#### Error State
- [x] PASS: "Could not find related papers" message
#### Results
- [ ] FAIL: List of related paper cards:
- [ ] FAIL: Title: text-sm font-medium
- [ ] FAIL: Authors: "Author1, Author2 et al. · Journal · Year"
- [ ] FAIL: DOI link: `https://doi.org/{doi}`
- [ ] FAIL: PubMed link: `https://pubmed.ncbi.nlm.nih.gov/{pmid}`
- [ ] FAIL: Citation count: "{count} citations"
- [ ] FAIL: "Save to Library" button per paper:
