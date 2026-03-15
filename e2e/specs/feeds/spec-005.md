# feeds — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Add Feed Modal
#### Add URL Tab
- [x] PASS: Shows API error messages
#### Browse Journals Tab
- [x] PASS: Renders JournalBrowser component (see section 12)

### Journal Browser
#### Search & Filters
- [x] PASS: Search input: "Search by topic, journal, or publisher..."
- [x] PASS: Category dropdown (populated from API)
- [x] PASS: Specialty dropdown (populated from API)
#### Browse Mode (No Search)
- [x] PASS: **Suggested for you** section (if available):
- [x] PASS: "Personalized from the specialties you selected during onboarding."
- [x] PASS: Journal cards with "Suggested for you" badge
- [x] PASS: **Browse Journals** section:
- [x] PASS: Grid of journal cards
#### Search Mode (With Query)
- [x] PASS: **Curated Journals** section:
- [x] PASS: "Matches from the ScholarSync journal directory for '{query}'."
- [x] PASS: Empty: `No curated journals match "{query}".`
- [x] PASS: **PubMed Search Feed** section (query ≥ 3 chars):
- [x] PASS: "Turn this topic into a live feed that updates as PubMed indexes new papers."
- [x] PASS: "Create Feed" button (loading: "Creating...")
- [x] PASS: Success: "Live PubMed feed created for '{query}'."
- [x] PASS: Error: message in red
#### Journal Cards
- [x] PASS: Title: text-sm font-medium
- [x] PASS: Publisher: text-xs text-ink-muted
- [x] PASS: Category/Specialty pill badges
- [x] PASS: Description: text-xs, line-clamp-2
- [x] PASS: Subscribe button states:
#### API
- [x] PASS: `GET /api/feeds/discover` — categories, specialties, feeds, suggestions

### Citation Modal
- [x] PASS: Opens when "Cite" clicked on article card or reader
#### Citation Style Tabs
- [x] PASS: Loading: "Formatting citations..." (animate-pulse)
- [x] PASS: Error: "Failed to load citation formats"
- [x] PASS: Monospace citation text display (min-h-80px)
#### Copy Buttons
- [x] PASS: **Copy Citation** / **Copy BibTeX** — copies full entry
- [x] PASS: **Copy In-Text** — copies parenthetical (hidden for BibTeX)
- [x] PASS: Feedback: "Copied!" for 2 seconds
#### DOI Link
- [x] PASS: "DOI: {doi}" with clickable link

### OPML Import & Export
#### Export
- [x] PASS: Triggered via Export button in header
- [x] PASS: Downloads `scholarsync-feeds.opml` (OPML 2.0 XML)
- [x] PASS: Contains all feed subscriptions with folders
