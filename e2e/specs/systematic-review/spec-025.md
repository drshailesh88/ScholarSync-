# systematic-review — Spec 025

STATUS: PARTIAL
TESTED: 35/35
PASS: 1
FAIL: 34
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Snowballing Panel
- [ ] FAIL: Initial loading state is a centered spinner with no helper text
- [ ] FAIL: Header title is `Citation Snowballing`
- [ ] FAIL: Header description explicitly explains forward as `who cites these?` and backward as `what do these cite?`
- [ ] FAIL: Top-level view toggles are `Select Seeds` and `Results & Network`
- [ ] FAIL: Results toggle shows a count badge only when at least one snowball session exists
- [ ] FAIL: Selected-seed counter text pluralizes as `seed selected` or `seeds selected`
- [ ] FAIL: `Run Snowball` is disabled when no seeds are selected
- [ ] FAIL: `Run Snowball` in-flight label is `Snowballing...`
- [ ] FAIL: Successful run banner headline is `Snowballing complete.`
- [ ] FAIL: Success banner body lists discovered count, new papers added, and duplicates skipped
- [ ] FAIL: Seed empty state copy is `No papers in project yet. Import papers first, then use snowballing to discover related studies.`
- [ ] FAIL: Seed-list header text is `Select seed papers ({N} available)`
- [ ] FAIL: Seed utility links are exactly `Select all` and `Clear`
- [ ] FAIL: Included seed rows show an `Included` pill only for papers with screening decision `include`
- [ ] FAIL: Results-view empty state copy is `No snowball sessions yet. Select seed papers and run snowballing.`
- [ ] FAIL: Sessions without `completedAt` show `In progress` instead of a date
- [ ] FAIL: Session status dot pulses only for `running` sessions
- [ ] FAIL: Citation-network heading format is `Citation Network ({papers} papers, {edges} edges)`
- [ ] FAIL: Discovered-papers subsection only renders when at least one network node has `addedBy === "snowball"`
- [ ] FAIL: Discovered-paper rows show `Unscreened` when no screening decision exists
- [ ] FAIL: Mini-network legend labels are `Seed / imported` and `Discovered (snowball)`
- [ ] FAIL: Mini-network node radius scales from citation count and truncates node labels at 35 characters
#### Living Review Panel
- [ ] FAIL: Living Review panel initializes with `showForm` set to false
- [ ] FAIL: New-alert frequency defaults to `weekly`
- [ ] FAIL: New-search text defaults to an empty string until optionally prefilled from `reviewConfig.searchStrategy.pubmedQuery`
- [x] PASS: Initial loading state is a centered spinner with no helper copy
- [ ] FAIL: Header title is `Living Review`
- [ ] FAIL: Header action button label is `New Alert`
- [ ] FAIL: Header helper text says new papers are auto-imported and screened against existing criteria
- [ ] FAIL: `New Alert` button toggles the visibility of the create form rather than opening a modal
- [ ] FAIL: Create-form textarea label is `Search Query`
- [ ] FAIL: Create-form textarea placeholder is `Enter PubMed search query...`
- [ ] FAIL: Frequency buttons are exactly `daily`, `weekly`, and `monthly`
- [ ] FAIL: `Create Alert` is disabled when the trimmed search string is empty
- [ ] FAIL: `Create Alert` swaps its icon to a spinner while the create request is in flight
