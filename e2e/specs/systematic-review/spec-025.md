# systematic-review — Spec 025

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Snowballing Panel
- [ ] Initial loading state is a centered spinner with no helper text
- [ ] Header title is `Citation Snowballing`
- [ ] Header description explicitly explains forward as `who cites these?` and backward as `what do these cite?`
- [ ] Top-level view toggles are `Select Seeds` and `Results & Network`
- [ ] Results toggle shows a count badge only when at least one snowball session exists
- [ ] Selected-seed counter text pluralizes as `seed selected` or `seeds selected`
- [ ] `Run Snowball` is disabled when no seeds are selected
- [ ] `Run Snowball` in-flight label is `Snowballing...`
- [ ] Successful run banner headline is `Snowballing complete.`
- [ ] Success banner body lists discovered count, new papers added, and duplicates skipped
- [ ] Seed empty state copy is `No papers in project yet. Import papers first, then use snowballing to discover related studies.`
- [ ] Seed-list header text is `Select seed papers ({N} available)`
- [ ] Seed utility links are exactly `Select all` and `Clear`
- [ ] Included seed rows show an `Included` pill only for papers with screening decision `include`
- [ ] Results-view empty state copy is `No snowball sessions yet. Select seed papers and run snowballing.`
- [ ] Sessions without `completedAt` show `In progress` instead of a date
- [ ] Session status dot pulses only for `running` sessions
- [ ] Citation-network heading format is `Citation Network ({papers} papers, {edges} edges)`
- [ ] Discovered-papers subsection only renders when at least one network node has `addedBy === "snowball"`
- [ ] Discovered-paper rows show `Unscreened` when no screening decision exists
- [ ] Mini-network legend labels are `Seed / imported` and `Discovered (snowball)`
- [ ] Mini-network node radius scales from citation count and truncates node labels at 35 characters
#### Living Review Panel
- [ ] Living Review panel initializes with `showForm` set to false
- [ ] New-alert frequency defaults to `weekly`
- [ ] New-search text defaults to an empty string until optionally prefilled from `reviewConfig.searchStrategy.pubmedQuery`
- [ ] Initial loading state is a centered spinner with no helper copy
- [ ] Header title is `Living Review`
- [ ] Header action button label is `New Alert`
- [ ] Header helper text says new papers are auto-imported and screened against existing criteria
- [ ] `New Alert` button toggles the visibility of the create form rather than opening a modal
- [ ] Create-form textarea label is `Search Query`
- [ ] Create-form textarea placeholder is `Enter PubMed search query...`
- [ ] Frequency buttons are exactly `daily`, `weekly`, and `monthly`
- [ ] `Create Alert` is disabled when the trimmed search string is empty
- [ ] `Create Alert` swaps its icon to a spinner while the create request is in flight
