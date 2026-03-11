# feeds — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Add Feed Modal
#### Add URL Tab
- [ ] Shows API error messages
#### Browse Journals Tab
- [ ] Renders JournalBrowser component (see section 12)

### Journal Browser
#### Search & Filters
- [ ] Search input: "Search by topic, journal, or publisher..."
- [ ] Category dropdown (populated from API)
- [ ] Specialty dropdown (populated from API)
#### Browse Mode (No Search)
- [ ] **Suggested for you** section (if available):
- [ ] "Personalized from the specialties you selected during onboarding."
- [ ] Journal cards with "Suggested for you" badge
- [ ] **Browse Journals** section:
- [ ] Grid of journal cards
#### Search Mode (With Query)
- [ ] **Curated Journals** section:
- [ ] "Matches from the ScholarSync journal directory for '{query}'."
- [ ] Empty: `No curated journals match "{query}".`
- [ ] **PubMed Search Feed** section (query ≥ 3 chars):
- [ ] "Turn this topic into a live feed that updates as PubMed indexes new papers."
- [ ] "Create Feed" button (loading: "Creating...")
- [ ] Success: "Live PubMed feed created for '{query}'."
- [ ] Error: message in red
#### Journal Cards
- [ ] Title: text-sm font-medium
- [ ] Publisher: text-xs text-ink-muted
- [ ] Category/Specialty pill badges
- [ ] Description: text-xs, line-clamp-2
- [ ] Subscribe button states:
#### API
- [ ] `GET /api/feeds/discover` — categories, specialties, feeds, suggestions

### Citation Modal
- [ ] Opens when "Cite" clicked on article card or reader
#### Citation Style Tabs
- [ ] Loading: "Formatting citations..." (animate-pulse)
- [ ] Error: "Failed to load citation formats"
- [ ] Monospace citation text display (min-h-80px)
#### Copy Buttons
- [ ] **Copy Citation** / **Copy BibTeX** — copies full entry
- [ ] **Copy In-Text** — copies parenthetical (hidden for BibTeX)
- [ ] Feedback: "Copied!" for 2 seconds
#### DOI Link
- [ ] "DOI: {doi}" with clickable link

### OPML Import & Export
#### Export
- [ ] Triggered via Export button in header
- [ ] Downloads `scholarsync-feeds.opml` (OPML 2.0 XML)
- [ ] Contains all feed subscriptions with folders
