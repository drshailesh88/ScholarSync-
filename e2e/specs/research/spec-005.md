# research — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Filter changes trigger a new search only after the user has already searched and `query.trim()` is non-empty
- [ ] Toggling filters before the first search updates local state only and does not auto-run a search
- [ ] Sort dropdown default label is `Relevance`
- [ ] Sort trigger shows `SortAscending` icon plus the active option label
- [ ] Clicking the sort trigger toggles the dropdown open and closed
- [ ] Sort dropdown contains exactly `Relevance`, `Citations`, `Year (Newest)`, and `Evidence Level`
- [ ] Selecting a sort option updates `sort`, closes the dropdown, and reruns search if the page is already in a searched state
- [ ] Current sort option is highlighted with `text-brand font-medium` inside the dropdown
- [ ] Sort dropdown does not currently implement outside-click dismissal or Escape-key dismissal
- [ ] Source-count summary line includes PubMed, Semantic Scholar, OpenAlex, ClinicalTrials.gov, and total result count
- [ ] Source-count summary is shown only after a successful search with at least one result
- [ ] AI-optimized-query toggle is rendered only when `augmentedQueries` exists in the response
- [ ] AI-optimized-query toggle label switches between `Show AI-optimized queries` and `Hide AI-optimized queries`
- [ ] Expanded augmented-query panel renders three labeled rows: `PubMed:`, `S2:`, and `OpenAlex:`
- [ ] Main loading state shows four pulsing glass cards instead of a spinner or linear progress bar
- [ ] Main error state renders red text inside a centered `GlassPanel`
- [ ] `showEmptyState` is true only when the page is not loading and the user has not searched yet
- [ ] `showNoResults` is true only when the page is not loading, the user has searched, there are zero results, and there is no error
- [ ] No-results message reads `No results found. Try a different query.`
- [ ] Result title links to `https://doi.org/{doi}` when DOI is present
- [ ] If DOI is absent but PMID is present, result title links to `https://pubmed.ncbi.nlm.nih.gov/{pmid}/`
- [ ] If neither DOI nor PMID is present, result title renders as plain text with no external link
- [ ] Authors row shows at most the first three authors followed by ` et al.` when more than three exist
- [ ] Metadata row always renders `journal · year` even when citation count is absent
- [ ] DOI metadata link is rendered separately in the metadata row when DOI exists
- [ ] Abstract preview is shown only when `abstract` is truthy and is clamped to two lines
- [ ] TL;DR line is shown only when `tldr` is truthy and is prefixed with `TL;DR:`
- [ ] Save-button identity key is derived from `doi || pmid || s2Id || title`
- [ ] Save button is disabled when that identity key is already in `saved` or `savingKeys`
- [ ] Save button label changes through `Save`, `Saving...`, and `Saved`
- [ ] Successful save adds the identity key to the local `saved` set
- [ ] Save failures log `Failed to save paper:` to the console and do not show a toast or inline error
- [ ] `Save & Cite` button is always enabled in the current implementation and has no loading state
- [ ] `Save & Cite` stores `scholarsync_pending_citation` in `sessionStorage`
- [ ] `Save & Cite` payload includes `title`, `authors`, `journal`, `year`, `doi`, and `pmid`
