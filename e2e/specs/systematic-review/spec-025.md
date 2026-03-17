# systematic-review — Spec 025

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Snowballing Panel
- [x] PASS: Initial loading state is a centered spinner with no helper text
- [x] PASS: Header title is `Citation Snowballing`
- [x] PASS: Header description explicitly explains forward as `who cites these?` and backward as `what do these cite?`
- [x] PASS: Top-level view toggles are `Select Seeds` and `Results & Network`
- [x] PASS: Results toggle shows a count badge only when at least one snowball session exists
- [x] PASS: Selected-seed counter text pluralizes as `seed selected` or `seeds selected`
- [x] PASS: `Run Snowball` is disabled when no seeds are selected
- [x] PASS: `Run Snowball` in-flight label is `Snowballing...`
- [x] PASS: Successful run banner headline is `Snowballing complete.`
- [x] PASS: Success banner body lists discovered count, new papers added, and duplicates skipped
- [x] PASS: Seed empty state copy is `No papers in project yet. Import papers first, then use snowballing to discover related studies.`
- [x] PASS: Seed-list header text is `Select seed papers ({N} available)`
- [x] PASS: Seed utility links are exactly `Select all` and `Clear`
- [x] PASS: Included seed rows show an `Included` pill only for papers with screening decision `include`
- [x] PASS: Results-view empty state copy is `No snowball sessions yet. Select seed papers and run snowballing.`
- [x] PASS: Sessions without `completedAt` show `In progress` instead of a date
- [x] PASS: Session status dot pulses only for `running` sessions
- [x] PASS: Citation-network heading format is `Citation Network ({papers} papers, {edges} edges)`
- [x] PASS: Discovered-papers subsection only renders when at least one network node has `addedBy === "snowball"`
- [x] PASS: Discovered-paper rows show `Unscreened` when no screening decision exists
- [x] PASS: Mini-network legend labels are `Seed / imported` and `Discovered (snowball)`
- [x] PASS: Mini-network node radius scales from citation count and truncates node labels at 35 characters
#### Living Review Panel
- [x] PASS: Living Review panel initializes with `showForm` set to false
- [x] PASS: New-alert frequency defaults to `weekly`
- [x] PASS: New-search text defaults to an empty string until optionally prefilled from `reviewConfig.searchStrategy.pubmedQuery`
- [x] PASS: Initial loading state is a centered spinner with no helper copy
- [x] PASS: Header title is `Living Review`
- [x] PASS: Header action button label is `New Alert`
- [x] PASS: Header helper text says new papers are auto-imported and screened against existing criteria
- [x] PASS: `New Alert` button toggles the visibility of the create form rather than opening a modal
- [x] PASS: Create-form textarea label is `Search Query`
- [x] PASS: Create-form textarea placeholder is `Enter PubMed search query...`
- [x] PASS: Frequency buttons are exactly `daily`, `weekly`, and `monthly`
- [x] PASS: `Create Alert` is disabled when the trimmed search string is empty
- [x] PASS: `Create Alert` swaps its icon to a spinner while the create request is in flight
