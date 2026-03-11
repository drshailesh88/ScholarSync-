# feeds — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Article Search & Filters
#### Sort Toggle
- [ ] Toggles between newest/oldest sort direction
#### Advanced Filter Panel (Collapsible)
- [ ] **Date range**: FROM and TO date input fields
- [ ] **Journal dropdown**: "All journals" default, populated from available journals
- [ ] **Sort by buttons** (3-column): Date (published) | Added | Title
- [ ] **Clear all filters** button (visible only when filters active)
#### Filter Indicators
- [ ] Active filters show blue highlight: `bg-brand/10 text-brand border-brand/20`

### Article Reader (Reading Pane)
#### Empty State
- [ ] Glass panel with centered text: "Select an article to read"
#### Article Content
- [ ] **Title**: text-lg font-bold
- [ ] **Authors**: text-sm text-ink-muted
- [ ] **Journal info**: "Journal · Vol. X · Issue Y" (text-xs)
- [ ] **Publication date**: "Published {date}" or "Publication date unavailable"
- [ ] **Reading time estimate**
#### Abstract Section
- [ ] Header: "Abstract"
- [ ] Content: text-sm text-ink-muted, leading-relaxed
- [ ] Hidden if no abstract available
#### DOI Section
- [ ] Format: "DOI: {doi}" with clickable link to `https://doi.org/{doi}`
- [ ] Hidden if no DOI

### Article Notes
- [ ] NoteBlank icon + "Notes" header
- [ ] Textarea with 3 rows
- [ ] Placeholder: "Add your notes about this article..."
- [ ] Auto-save after 1 second of inactivity
- [ ] Saves on blur if changes pending
- [ ] "Saved" indicator (Check icon) appears for 2 seconds after save
- [ ] Loads existing notes via `GET /api/feeds/articles/{id}/notes`
- [ ] Saves via `PUT /api/feeds/articles/{id}/notes`

### Related Papers
#### Initial State
- [ ] "Find Related Papers" button displayed
#### Loading State
- [ ] Spinner + "Finding related papers..."
#### Error State
- [ ] "Could not find related papers" message
#### Results
- [ ] List of related paper cards:
- [ ] Title: text-sm font-medium
- [ ] Authors: "Author1, Author2 et al. · Journal · Year"
- [ ] DOI link: `https://doi.org/{doi}`
- [ ] PubMed link: `https://pubmed.ncbi.nlm.nih.gov/{pmid}`
- [ ] Citation count: "{count} citations"
- [ ] "Save to Library" button per paper:
