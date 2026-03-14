# feeds — Spec 005

STATUS: PARTIAL
TESTED: 35/35
PASS: 9
FAIL: 26
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Add Feed Modal
#### Add URL Tab
- [ ] FAIL: Shows API error messages
#### Browse Journals Tab
- [x] PASS: Renders JournalBrowser component (see section 12)

### Journal Browser
#### Search & Filters
- [ ] FAIL: Search input: "Search by topic, journal, or publisher..."
- [ ] FAIL: Category dropdown (populated from API)
- [ ] FAIL: Specialty dropdown (populated from API)
#### Browse Mode (No Search)
- [ ] FAIL: **Suggested for you** section (if available):
- [x] PASS: "Personalized from the specialties you selected during onboarding."
- [x] PASS: Journal cards with "Suggested for you" badge
- [ ] FAIL: **Browse Journals** section:
- [x] PASS: Grid of journal cards
#### Search Mode (With Query)
- [ ] FAIL: **Curated Journals** section:
- [ ] FAIL: "Matches from the ScholarSync journal directory for '{query}'."
- [ ] FAIL: Empty: `No curated journals match "{query}".`
- [ ] FAIL: **PubMed Search Feed** section (query ≥ 3 chars):
- [ ] FAIL: "Turn this topic into a live feed that updates as PubMed indexes new papers."
- [ ] FAIL: "Create Feed" button (loading: "Creating...")
- [ ] FAIL: Success: "Live PubMed feed created for '{query}'."
- [ ] FAIL: Error: message in red
#### Journal Cards
- [ ] FAIL: Title: text-sm font-medium
- [ ] FAIL: Publisher: text-xs text-ink-muted
- [ ] FAIL: Category/Specialty pill badges
- [ ] FAIL: Description: text-xs, line-clamp-2
- [ ] FAIL: Subscribe button states:
#### API
- [x] PASS: `GET /api/feeds/discover` — categories, specialties, feeds, suggestions

### Citation Modal
- [x] PASS: Opens when "Cite" clicked on article card or reader
#### Citation Style Tabs
- [ ] FAIL: Loading: "Formatting citations..." (animate-pulse)
- [ ] FAIL: Error: "Failed to load citation formats"
- [ ] FAIL: Monospace citation text display (min-h-80px)
#### Copy Buttons
- [x] PASS: **Copy Citation** / **Copy BibTeX** — copies full entry
- [ ] FAIL: **Copy In-Text** — copies parenthetical (hidden for BibTeX)
- [ ] FAIL: Feedback: "Copied!" for 2 seconds
#### DOI Link
- [ ] FAIL: "DOI: {doi}" with clickable link

### OPML Import & Export
#### Export
- [x] PASS: Triggered via Export button in header
- [x] PASS: Downloads `scholarsync-feeds.opml` (OPML 2.0 XML)
- [ ] FAIL: Contains all feed subscriptions with folders
