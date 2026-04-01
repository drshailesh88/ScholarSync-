# explore — Spec 001

STATUS: PENDING
TESTED: 0/18
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Search & Landing

#### Landing Page
- [ ] **Landing page layout** — before any search, page shows centered search bar with "Search for sources to get started." text `[CODE]`
- [ ] **Search bar autofocus** — on landing page the search input is auto-focused `[CODE]`
- [ ] **Search bar placeholder** — input shows "Explore..." placeholder text `[CODE]`

#### Search Execution
- [ ] **Submit search via Enter** — type a query and press Enter, verify results appear `[CODE]`
- [ ] **Submit search via button** — type a query and click the magnifying glass icon, verify results appear `[CODE]`
- [ ] **Empty query ignored** — press Enter with empty input, no search executes `[CODE]`
- [ ] **Clear search input** — type text, click X button, verify input is cleared `[CODE]`
- [ ] **Multi-tab parallel search** — submit a query, verify all 4 tabs (Academic, Web, News, Discussions) load results `[CODE]`
- [ ] **Stats line displayed** — after search, verify "N results in X.Xs" line appears below filters `[CODE]`
- [ ] **Results per page** — verify exactly 10 results display per page `[CODE]`

#### Search with Filters
- [ ] **Filter triggers re-search** — change a filter while results are displayed, verify results refresh `[CODE]`
- [ ] **"More from this source" search** — click "More from this source" in actions menu, verify search bar updates to "site:domain.com query" `[CODE]`

#### Search History Integration
- [ ] **Search saved to history** — perform a search, open history dropdown, verify the query appears `[CODE]`
- [ ] **Search from history** — open history dropdown, click an entry, verify that query runs and results appear `[CODE]`

#### Saved URL Detection
- [ ] **Saved badge on results** — save a result, re-search same query, verify saved result shows check icon instead of plus `[CODE]`

#### Error Handling
- [ ] **Error banner on failure** — when search fails, red error banner displays with "Explore search failed. Try again." `[CODE]`
- [ ] **Retry button works** — click "Try again" in error banner, verify search re-executes `[CODE]`
- [ ] **Loading skeletons** — during search, 5 pulsing skeleton cards display `[CODE]`
