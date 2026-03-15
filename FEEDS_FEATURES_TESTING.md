# ScholarSync — Feeds (Journal Feed) Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Journal Feed page (`/feeds`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/feeds/`, `src/components/feeds/`, `src/stores/feed-store.ts`, and related API routes.

---

## Table of Contents

1. [Page Overview & Layout](#1-page-overview--layout)
2. [Header Controls](#2-header-controls)
3. [Feed Sidebar](#3-feed-sidebar)
4. [Article List](#4-article-list)
5. [Article Cards — Three Layouts](#5-article-cards--three-layouts)
6. [Article Search & Filters](#6-article-search--filters)
7. [Article Reader (Reading Pane)](#7-article-reader-reading-pane)
8. [Article Notes](#8-article-notes)
9. [Related Papers](#9-related-papers)
10. [AI Copilot Panel](#10-ai-copilot-panel)
11. [Add Feed Modal](#11-add-feed-modal)
12. [Journal Browser](#12-journal-browser)
13. [Citation Modal](#13-citation-modal)
14. [OPML Import & Export](#14-opml-import--export)
15. [Keyboard Shortcuts](#15-keyboard-shortcuts)
16. [Feed Store (Zustand)](#16-feed-store-zustand)
17. [Loading & Error States](#17-loading--error-states)
18. [Quick Test Workflows](#18-quick-test-workflows)

---

## 1. Page Overview & Layout

| Page | Route | Purpose |
|------|-------|---------|
| **Journal Feed** | `/feeds` | RSS feed reader with journal subscriptions, article curation, AI copilot, and citation tools |

### Layout

```
┌───────────────────────────────────────────────────────────────────────┐
│  Header: Title · Unread Badge · Export · Import · Mark All · Sort ·  │
│          Layout · Add Feed                                           │
├──────────┬───────────────────────────────────┬────────────────────────┤
│  Feed    │  Article List                     │  Article Reader       │
│  Sidebar │  (search bar + cards)             │  or Copilot Panel     │
│  (w-56)  │                                   │  (w-[420px])          │
│          │                                   │                       │
└──────────┴───────────────────────────────────┴────────────────────────┘
```

- [ ] Three-column layout: Sidebar (w-56) | Article List (flex) | Reader/Copilot (420px)
- [ ] Sidebar hidden on mobile, visible on `lg` breakpoint
- [ ] Reader/Copilot hidden on mobile, visible on `xl` breakpoint
- [ ] Responsive stacking on smaller viewports

### Empty State (No Subscriptions)
- [ ] RSS icon displayed
- [ ] Title: "Your Journal Feed is empty"
- [ ] Description: "Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
- [ ] "Add Your First Feed" action button

---

## 2. Header Controls

- [ ] Title: "Journal Feed"
- [ ] Unread badge: "{totalUnread} unread article(s)"

### Action Buttons
| Button | Action | Test |
|--------|--------|------|
| Export | Downloads OPML file ("scholarsync-feeds.opml") | [ ] Downloads correctly |
| Import | File input for .opml/.xml files | [ ] Opens file picker |
| Mark all read | Marks all articles as read | [ ] Updates all articles |
| Add Feed | Opens Add Feed modal | [ ] Modal opens |

### Sort Toggle (Segmented)
| Option | Icon | Test |
|--------|------|------|
| Newest | SortDescending | [ ] Sorts newest first |
| Oldest | SortAscending | [ ] Sorts oldest first |
| Relevance | MagnifyingGlass | [ ] Sorts by relevance |

### Layout Toggle (Segmented)
| Option | Icon | Title | Test |
|--------|------|-------|------|
| List | Rows | "List" | [ ] Shows list view |
| Card | SquaresFour | "Card" | [ ] Shows card view |
| Magazine | List | "Magazine" | [ ] Shows magazine view |

### Error Banner
- [ ] Red background (red-500/10) when error present
- [ ] Error text displayed
- [ ] Dismiss button (X) clears error

---

## 3. Feed Sidebar

### View Filters
- [ ] "FILTER" header with FunnelSimple icon
- [ ] **All Articles** — RSS icon, shows all articles
- [ ] **Unread** — Circle icon (brand color), filters to unread only
- [ ] **Starred** — Star icon (filled when selected), filters to starred
- [ ] Active filter visually highlighted

### Folder Groups
- [ ] Subscriptions grouped by folder name
- [ ] Folder header shows: folder name + unread count (right-aligned)
- [ ] Clicking folder filters articles to that folder
- [ ] Selected folder: `bg-surface-raised`, `text-ink`
- [ ] Unselected hover: `text-ink-muted` → `text-ink`

### Feed Items (within folders or ungrouped)
- [ ] Favicon (4×4) + truncated feed name
- [ ] Unread badge (small pill, brand background) if unread > 0
- [ ] Clicking selects that feed (filters articles)

### Mute Toggle
- [ ] Mute button appears on hover (Bell/BellSlash icon)
- [ ] Click toggles mute state via `PATCH /api/feeds/{id}`
- [ ] Optimistic UI update
- [ ] Muted feeds: BellSlash icon shown

### Ungrouped Feeds
- [ ] "FEEDS" header (uppercase)
- [ ] Same FeedItem layout as folder feeds

---

## 4. Article List

- [ ] Article search bar at top
- [ ] Articles render based on selected layout mode

### Loading State
- [ ] 5 skeleton cards displayed while loading

### Empty State
- [ ] Newspaper icon
- [ ] Title: "No articles"
- [ ] Description: "No articles match your current filters. Try selecting a different feed or changing the view filter."

### Pagination
- [ ] "Load more" button at bottom when `hasMore` is true
- [ ] Button text during loading: "Loading..."
- [ ] Loads next page of articles

---

## 5. Article Cards — Three Layouts

### Card View (Default)
- [ ] **Unread indicator**: 2×2 blue dot (if unread)
- [ ] **Source row**: Favicon + source name + "·" + relative date + "·" + reading time
- [ ] **Title**: font-semibold if unread, font-normal + text-ink-muted if read
- [ ] **Authors**: text-xs text-ink-muted (truncated)
- [ ] **Abstract snippet**: text-xs, line-clamp-2, first 120 chars + "..."
- [ ] **Action buttons**: Star, Save to Library, Cite, AI, DOI link
- [ ] **Selected state**: `bg-surface-raised`, `ring-1 ring-brand/20`

### List View
- [ ] Compact single-line layout
- [ ] Unread indicator (2×2 dot or spacer)
- [ ] Title: text-sm, muted if read
- [ ] Feed name (hidden sm, visible md)
- [ ] Published time + reading time
- [ ] **No action buttons** (star, save, cite, AI, DOI are NOT shown in list view)
- [ ] Selected state: `bg-brand/5`, `border-brand/20`

### Magazine View
- [ ] Image at top (h-48, if `imageUrl` exists)
- [ ] Source row below image: favicon + name + time + reading time
- [ ] Title: text-base, font-bold if unread, line-clamp-2
- [ ] Authors (truncated)
- [ ] Abstract: text-sm, line-clamp-3
- [ ] Action buttons same as Card view
- [ ] Selected state: `ring-2 ring-brand/30`

### Action Buttons (All Layouts)
| Button | Icon | Active State | Test |
|--------|------|-------------|------|
| Star | Star (fill/regular) | Yellow-500 when starred | [ ] Toggles star |
| Save to Library | BookmarkSimple (fill/regular) | Brand color when saved | [ ] Saves to library |
| Cite | Quotes | — | [ ] Opens citation modal |
| AI | Sparkle | — | [ ] Opens copilot panel |
| DOI | ArrowSquareOut | — | [ ] Opens `doi.org/{doi}` |

- [ ] Action clicks stop propagation (don't select article)

---

## 6. Article Search & Filters

### Search Bar
- [ ] MagnifyingGlass icon
- [ ] Placeholder: "Search articles..."
- [ ] Clear button (X icon) appears when text entered
- [ ] Search triggers article reload

### Filter Toggle
- [ ] FunnelSimple icon + "Filters" label
- [ ] Blue dot indicator when filters are active
- [ ] Click toggles advanced filter panel

### Sort Toggle
- [ ] Toggles between newest/oldest sort direction

### Advanced Filter Panel (Collapsible)
- [ ] **Date range**: FROM and TO date input fields
- [ ] **Journal dropdown**: "All journals" default, populated from available journals
- [ ] **Sort by buttons** (3-column): Date (published) | Added | Title
- [ ] **Clear all filters** button (visible only when filters active)

### Filter Indicators
- [ ] Active filters show blue highlight: `bg-brand/10 text-brand border-brand/20`

---

## 7. Article Reader (Reading Pane)

### Empty State
- [ ] Glass panel with centered text: "Select an article to read"

### Article Content
- [ ] **Title**: text-lg font-bold
- [ ] **Authors**: text-sm text-ink-muted
- [ ] **Journal info**: "Journal · Vol. X · Issue Y" (text-xs)
- [ ] **Publication date**: "Published {date}" or "Publication date unavailable"
- [ ] **Reading time estimate**

### Action Buttons
| Button | Description | Active State | Test |
|--------|-------------|-------------|------|
| Star | Toggle star | `bg-yellow-500/10 text-yellow-500` | [ ] Works |
| Save | Toggle save to library | `bg-brand/10 text-brand` | [ ] Works |
| Cite | Open citation modal | `bg-surface-raised` | [ ] Works |
| AI | Open copilot panel | `bg-brand/10 text-brand` | [ ] Works |
| Open Original | Opens link in new tab | — | [ ] Opens correct URL |

### Abstract Section
- [ ] Header: "Abstract"
- [ ] Content: text-sm text-ink-muted, leading-relaxed
- [ ] Hidden if no abstract available

### DOI Section
- [ ] Format: "DOI: {doi}" with clickable link to `https://doi.org/{doi}`
- [ ] Hidden if no DOI

---

## 8. Article Notes

- [ ] NoteBlank icon + "Notes" header
- [ ] Textarea with 3 rows
- [ ] Placeholder: "Add your notes about this article..."
- [ ] Auto-save after 1 second of inactivity
- [ ] Saves on blur if changes pending
- [ ] "Saved" indicator (Check icon) appears for 2 seconds after save
- [ ] Loads existing notes via `GET /api/feeds/articles/{id}/notes`
- [ ] Saves via `PUT /api/feeds/articles/{id}/notes`

---

## 9. Related Papers

### Initial State
- [ ] "Find Related Papers" button displayed

### Loading State
- [ ] Spinner + "Finding related papers..."

### Error State
- [ ] "Could not find related papers" message

### Results
- [ ] List of related paper cards:
  - [ ] Title: text-sm font-medium
  - [ ] Authors: "Author1, Author2 et al. · Journal · Year"
  - [ ] DOI link: `https://doi.org/{doi}`
  - [ ] PubMed link: `https://pubmed.ncbi.nlm.nih.gov/{pmid}`
  - [ ] Citation count: "{count} citations"
  - [ ] "Save to Library" button per paper:
    | State | Label | Test |
    |-------|-------|------|
    | idle | "Save to Library" | [ ] Clickable |
    | saving | "Saving..." | [ ] Disabled |
    | saved | "Saved" (green) | [ ] Disabled |
    | error | "Retry Save" (red) | [ ] Retryable |

### API
- [ ] `GET /api/feeds/articles/{id}/related` (limit: 5)
- [ ] `POST /api/papers/save` for saving related papers

---

## 10. AI Copilot Panel

### Header
- [ ] Sparkle icon in brand/20 background
- [ ] Title: "AI Copilot"
- [ ] Close button (X icon)

### Compact Article Header
- [ ] Article title (line-clamp-2)
- [ ] Authors, journal, year

### Source Tier Badge
| Tier | Icon | Color | Test |
|------|------|-------|------|
| full_paper | 📄 | emerald-500/10, emerald-600 text | [ ] Shows for full text |
| abstract_only | 📋 | amber-500/10, amber-600 text | [ ] Shows for abstract-only |
| title_only | ⚠️ | red-500/10, red-500 text | [ ] Shows for title-only |

### Quick Action Buttons (3-column grid)
| Button | Icon | Style | Test |
|--------|------|-------|------|
| Summarize | Lightning | Brand background | [ ] Generates summary |
| Explain | ChatText | Surface-raised | [ ] Opens explain chat |
| Related | Books | Surface-raised | [ ] Finds related papers |

### Chat Messages
- [ ] User messages: surface-raised background, right-aligned
- [ ] Assistant messages: brand/5 background, left-aligned with Sparkle icon
- [ ] Loading indicator: 3 animated dots
- [ ] Streaming: text appears incrementally
- [ ] Auto-scroll to latest message

### Suggested Questions
- [ ] Clickable chips with follow-up question text
- [ ] Clicking sends the suggestion as a message

### Chat Input
- [ ] Placeholder: "Ask about this paper..."
- [ ] PaperPlaneRight send button (brand background)
- [ ] Disabled when loading or input empty

### Initial State (No Messages)
- [ ] Centered Sparkle icon (large, brand/10 bg)
- [ ] "Ask me about this paper"
- [ ] "Click Summarize for a quick overview, or ask any question about the study."

### Copilot APIs
- [ ] `POST /api/feeds/copilot/summarize` — returns summary + suggestions + source tier
- [ ] `POST /api/feeds/copilot/chat` — SSE streaming chat response

---

## 11. Add Feed Modal

### Tabs
- [ ] "Add URL" tab
- [ ] "Browse Journals" tab

### Add URL Tab

**RSS/Atom Feed Section**
- [ ] Label: "RSS / Atom Feed URL"
- [ ] Input placeholder: "https://example.com/feed.xml"
- [ ] "Add" button (loading: "Adding...")
- [ ] Enter key submits
- [ ] Validates URL and subscribes

**Divider**: "or"

**PubMed Search Section**
- [ ] Label: "PubMed Search Query"
- [ ] Input placeholder: `e.g. "machine learning" AND radiology`
- [ ] "Create Feed" button (loading: "Creating...")
- [ ] Enter key submits
- [ ] Creates live PubMed search feed

**Error Display**
- [ ] Red background (red-500/10) with error text
- [ ] Shows API error messages

### Browse Journals Tab
- [ ] Renders JournalBrowser component (see section 12)

---

## 12. Journal Browser

### Search & Filters
- [ ] Search input: "Search by topic, journal, or publisher..."
- [ ] Category dropdown (populated from API)
- [ ] Specialty dropdown (populated from API)

### Browse Mode (No Search)
- [ ] **Suggested for you** section (if available):
  - [ ] "Personalized from the specialties you selected during onboarding."
  - [ ] Journal cards with "Suggested for you" badge
- [ ] **Browse Journals** section:
  - [ ] Grid of journal cards

### Search Mode (With Query)
- [ ] **Curated Journals** section:
  - [ ] "Matches from the ScholarSync journal directory for '{query}'."
  - [ ] Empty: `No curated journals match "{query}".`
- [ ] **PubMed Search Feed** section (query ≥ 3 chars):
  - [ ] "Turn this topic into a live feed that updates as PubMed indexes new papers."
  - [ ] "Create Feed" button (loading: "Creating...")
  - [ ] Success: "Live PubMed feed created for '{query}'."
  - [ ] Error: message in red

### Journal Cards
- [ ] Title: text-sm font-medium
- [ ] Publisher: text-xs text-ink-muted
- [ ] Category/Specialty pill badges
- [ ] Description: text-xs, line-clamp-2
- [ ] Subscribe button states:
  | State | Label | Style | Test |
  |-------|-------|-------|------|
  | default | "Subscribe" | Brand | [ ] Clickable |
  | loading | "Adding..." | Disabled | [ ] Shows during sub |
  | subscribed | "Subscribed" ✓ | Green-500/10 | [ ] Confirmed |

### API
- [ ] `GET /api/feeds/discover` — categories, specialties, feeds, suggestions

---

## 13. Citation Modal

- [ ] Opens when "Cite" clicked on article card or reader

### Citation Style Tabs
| Style | Test |
|-------|------|
| APA 7 | [ ] Correct author-date format |
| MLA 9 | [ ] Correct author-page format |
| Chicago | [ ] Correct format |
| Vancouver | [ ] Correct numeric format |
| Harvard | [ ] Correct author-date format |
| BibTeX | [ ] Correct machine-readable format |

- [ ] Loading: "Formatting citations..." (animate-pulse)
- [ ] Error: "Failed to load citation formats"
- [ ] Monospace citation text display (min-h-80px)

### Copy Buttons
- [ ] **Copy Citation** / **Copy BibTeX** — copies full entry
- [ ] **Copy In-Text** — copies parenthetical (hidden for BibTeX)
- [ ] Feedback: "Copied!" for 2 seconds

### DOI Link
- [ ] "DOI: {doi}" with clickable link

---

## 14. OPML Import & Export

### Export
- [ ] Triggered via Export button in header
- [ ] Downloads `scholarsync-feeds.opml` (OPML 2.0 XML)
- [ ] Contains all feed subscriptions with folders

### Import
- [ ] File input accepts `.opml` and `.xml` files
- [ ] `POST /api/feeds/opml/import` with XML content
- [ ] Response reports: total feeds, imported, skipped, failed
- [ ] Error details for failed imports
- [ ] Subscriptions refresh after import

---

## 15. Keyboard Shortcuts

| Key | Action | Test |
|-----|--------|------|
| `j` | Next article | [ ] Selects next article in list |
| `k` | Previous article | [ ] Selects previous article |
| `o` | Open article link | [ ] Opens in new window |
| `s` | Toggle star | [ ] Stars/unstars current article |
| `c` | Open citation modal | [ ] Opens citation for current article |
| `a` | Toggle copilot panel | [ ] Opens/closes AI copilot |
| `/` | Focus search input | [ ] Focuses article search bar |

---

## 16. Feed Store (Zustand)

### Key State
- [ ] `subscriptions` — array of user's feed subscriptions
- [ ] `articles` — loaded articles with read/star/save status
- [ ] `selectedFeedId` — currently selected feed (null = all)
- [ ] `selectedFolder` — currently selected folder
- [ ] `viewFilter` — "all" | "unread" | "starred" (default: "unread")
- [ ] `sortBy` — "newest" | "oldest" | "relevance"
- [ ] `layout` — "list" | "card" | "magazine"
- [ ] `selectedArticleId` — article in reading pane
- [ ] `copilotOpen` — AI panel visibility
- [ ] `copilotMessages` — chat history
- [ ] `copilotSourceTier` — full_paper | abstract_only | title_only
- [ ] `totalUnread` — aggregate unread count
- [ ] `hasMore` — pagination flag
- [ ] `page` — current pagination page

### Key Actions
- [ ] `loadSubscriptions()` / `subscribe()` / `unsubscribe()`
- [ ] `loadArticles()` / `loadMore()`
- [ ] `markRead()` / `markAllRead()` / `toggleStar()` / `saveToLibrary()`
- [ ] `setSelectedFeed()` / `setSelectedFolder()` / `setViewFilter()`
- [ ] `openCopilot()` / `closeCopilot()` / `summarizeArticle()` / `sendCopilotMessage()`
- [ ] `clearFilters()` / `clearSearch()` / `clearCopilot()`

---

## 17. Loading & Error States

| State | Display | Test |
|-------|---------|------|
| Page loading | Skeleton sidebar (8 rows) + 6 skeleton cards | [ ] Renders |
| Articles loading | 5 skeleton cards | [ ] Renders |
| No articles | Newspaper icon + "No articles" + filter hint | [ ] Shows correctly |
| No subscriptions | RSS icon + "Your Journal Feed is empty" | [ ] Shows correctly |
| Error banner | Red background + error text + dismiss | [ ] Shows and dismisses |
| Page error | "Journal Feed unavailable" + retry | [ ] Shows correctly |
| Copilot loading | 3 animated dots | [ ] Animates |
| Citation loading | "Formatting citations..." pulse | [ ] Animates |
| Related loading | Spinner + "Finding related papers..." | [ ] Shows correctly |
| PDF viewer error | Error message | [ ] Shows correctly |

---

## 18. Quick Test Workflows

### A. Subscribe to a Journal
1. [ ] Navigate to `/feeds`
2. [ ] Click "Add Feed"
3. [ ] Switch to "Browse Journals" tab
4. [ ] Search for "cardiology"
5. [ ] Click "Subscribe" on a journal card
6. [ ] Verify "Subscribed" state on card
7. [ ] Close modal — verify feed appears in sidebar
8. [ ] Wait for articles to load

### B. Subscribe via URL
1. [ ] Click "Add Feed"
2. [ ] In "Add URL" tab, paste an RSS feed URL
3. [ ] Click "Add"
4. [ ] Verify feed appears in sidebar
5. [ ] Verify articles populate in list

### C. Create PubMed Search Feed
1. [ ] Click "Add Feed"
2. [ ] In PubMed section, enter: `"CRISPR" AND "gene therapy"`
3. [ ] Click "Create Feed"
4. [ ] Verify feed appears in sidebar
5. [ ] Verify PubMed results populate as articles

### D. Browse & Read Articles
1. [ ] With articles loaded, click an article card
2. [ ] Verify reading pane shows: title, authors, abstract
3. [ ] Verify article marked as read (unread dot disappears)
4. [ ] Click star — verify yellow fill
5. [ ] Switch view filter to "Starred" — verify article appears
6. [ ] Switch to "Unread" — verify read articles hidden
7. [ ] Switch to "All Articles" — verify all visible

### E. Layout Switching
1. [ ] Default layout — verify card view
2. [ ] Switch to "List" — verify compact rows
3. [ ] Switch to "Magazine" — verify image + expanded layout
4. [ ] Switch back to "Card" — verify original layout

### F. AI Copilot
1. [ ] Select an article
2. [ ] Click AI button on article card (or press `a`)
3. [ ] Verify Copilot panel opens
4. [ ] Check source tier badge (full_paper / abstract_only / title_only)
5. [ ] Click "Summarize" — verify 3-sentence summary appears
6. [ ] Verify suggested follow-up questions appear
7. [ ] Click a suggested question — verify response streams in
8. [ ] Type custom question: "What were the limitations?" — submit
9. [ ] Verify streaming response in chat
10. [ ] Close copilot — verify panel closes

### G. Citation Workflow
1. [ ] Select an article with DOI
2. [ ] Click "Cite" button (or press `c`)
3. [ ] Verify citation modal opens with APA 7 default
4. [ ] Switch to Vancouver — verify numeric format
5. [ ] Switch to BibTeX — verify machine-readable format
6. [ ] Click "Copy Citation" — verify clipboard content
7. [ ] Click "Copy In-Text" on APA tab — verify in-text format
8. [ ] Verify DOI link in modal

### H. Article Notes
1. [ ] Select an article
2. [ ] In reading pane, type notes: "Important study for review"
3. [ ] Wait 1 second — verify "Saved" indicator appears
4. [ ] Navigate away and return — verify notes persist
5. [ ] Clear notes — verify empty save

### I. Search & Filter
1. [ ] Type "diabetes" in search bar — verify filtered results
2. [ ] Click "Filters" toggle — verify advanced panel opens
3. [ ] Set date range — verify articles filtered
4. [ ] Select specific journal — verify scoped results
5. [ ] Click "Clear all filters" — verify reset
6. [ ] Clear search text — verify full list

### J. OPML Import/Export
1. [ ] Click Export — verify OPML file downloads
2. [ ] Open downloaded file — verify XML structure
3. [ ] Click Import — select a valid OPML file
4. [ ] Verify import report (imported/skipped/failed counts)
5. [ ] Verify new feeds appear in sidebar

### K. Keyboard Navigation
1. [ ] Press `j` — verify next article selected
2. [ ] Press `k` — verify previous article selected
3. [ ] Press `s` — verify star toggled
4. [ ] Press `c` — verify citation modal opens
5. [ ] Press `a` — verify copilot toggles
6. [ ] Press `o` — verify article link opens in new window
7. [ ] Press `/` — verify search input focused

### L. Feed Management
1. [ ] Hover over a feed in sidebar — verify mute button appears
2. [ ] Click mute — verify BellSlash icon
3. [ ] Click again — verify unmuted
4. [ ] Select a specific feed — verify articles filter to that feed
5. [ ] Click "Mark all read" — verify unread count drops to 0

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Feed store defaults to `viewFilter = "unread"`, `sortBy = "newest"`, `sortDir = "desc"`, and `layout = "card"`
- [ ] Feed store does not use zustand persist middleware; page state is refetched fresh after reload
- [ ] Page mount triggers both `loadSubscriptions()` and `loadArticles()` in parallel
- [ ] Empty-state gate is `subscriptions.length === 0 && !isLoadingSubscriptions`; articles alone do not bypass the empty-state screen
- [ ] Header unread helper text renders only when `totalUnread > 0`
- [ ] Export button fetches `/api/feeds/opml/export` and downloads `scholarsync-feeds.opml` only when the response is OK
- [ ] Export failures are silent in the current page UI
- [ ] Import control is a `<label>` wrapping a hidden file input with `accept=".opml,.xml"`
- [ ] Canceling the import file picker leaves the page unchanged
- [ ] Import reads the selected file as text and posts it to `/api/feeds/opml/import` with `Content-Type: application/xml`
- [ ] Successful import uses `alert(...)` to show imported/skipped/failed counts
- [ ] Successful import refreshes subscriptions through `useFeedStore.getState().loadSubscriptions()`
- [ ] Failed import uses `alert(data.error || "Import failed")`
- [ ] Import handler clears the file input value after handling the selected file
- [ ] `Mark all read` in the header always calls `markAllRead()` for the current store state without requiring a confirmation dialog
- [ ] Sort segmented control contains exactly `Newest`, `Oldest`, and `Relevance`
- [ ] Clicking `Newest` sets `sortBy = "newest"` and `sortDir = "desc"`
- [ ] Clicking `Oldest` sets `sortBy = "oldest"` and `sortDir = "asc"`
- [ ] Clicking `Relevance` sets `sortBy = "relevance"` while preserving the current `sortDir`
- [ ] Layout control buttons expose visible tooltips/titles `List`, `Card`, and `Magazine`
- [ ] Layout control is icon-only; the labels are not rendered inline in the header
- [ ] Add Feed button sets `showAddModal = true`
- [ ] Error banner shows the store error string and a `Dismiss` text button
- [ ] Dismissing the error banner calls `clearError()` and removes the banner
- [ ] Feed sidebar is hidden below the `lg` breakpoint
- [ ] Reading pane / copilot column is hidden below the `xl` breakpoint
- [ ] Reading pane / copilot column is not shown at all until an article is selected
- [ ] Feed sidebar `All Articles`, `Unread`, and `Starred` buttons clear both `selectedFeedId` and `selectedFolder`
- [ ] `All Articles` is treated as selected only when both `selectedFeedId` and `selectedFolder` are null
- [ ] Folder buttons set `selectedFolder` and clear `selectedFeedId`
- [ ] Feed-item buttons set `selectedFeedId` and do not automatically change `viewFilter`
- [ ] Sidebar groups subscriptions by exact `sub.folder` string; empty folder values fall into the ungrouped `FEEDS` section
- [ ] Folder unread totals are recalculated by summing `sub.unreadCount` across that folder's feeds
- [ ] Feed-item favicon falls back to `getFaviconUrl(siteUrl || feedUrl)` when no explicit `faviconUrl` is stored
- [ ] Broken favicon images are hidden by setting `display: none` on error
- [ ] Muted feeds render at reduced opacity via `opacity-50`
- [ ] Mute/unmute control is visually hidden until the row is hovered
- [ ] Mute/unmute clicks stop propagation and do not select the feed row
- [ ] Mute/unmute flow is not optimistic in the store; it PATCHes `/api/feeds/{id}` then reloads subscriptions
- [ ] Pending mute state disables only the currently mutating mute button
- [ ] Selecting a feed, folder, or view filter resets article pagination to page 0 and triggers a fresh article reload
- [ ] `ArticleList` loads available journals once on mount through `loadJournals()`
- [ ] Article skeleton state shows exactly 5 `SkeletonCard`s when the first page is loading
- [ ] Empty article state renders `No articles` only when loading is false and the article list is empty
- [ ] `Load more` button is shown only when `hasMore` is true
- [ ] `loadMore()` is a no-op when `hasMore` is false or `isLoadingArticles` is already true
- [ ] `loadMore()` increments `page` before calling `loadArticles(false)`
- [ ] Article API requests always send `perPage=30`
- [ ] Fresh article loads clear `articles`, reset `page` to `0`, and clear `selectedArticleId`
- [ ] Append-mode article loads keep the current `selectedArticleId`
- [ ] Search input updates `searchQuery` and immediately triggers `loadArticles()`
- [ ] Search clear button appears only when `searchQuery` is non-empty
- [ ] Search clear button calls `setSearchQuery("")`; it does not use the separate `clearSearch()` store action
- [ ] Filters button blue-dot indicator appears only when a date or journal filter is active
- [ ] Advanced filters can be opened even when no filters are active
- [ ] `Clear all filters` resets date-from, date-to, and journal only; it does not clear search text or collapse the filter panel
- [ ] Advanced sort buttons normalize `published` and `added` into feed-store sort modes rather than preserving a separate stored value
- [ ] Selecting `Title` in advanced sort normalizes store `sortBy` to `relevance`
- [ ] Header sort segmented control and advanced sort buttons can represent different labels for the same underlying store state
- [ ] Search-bar sort toggle flips only between `newest` and `oldest`; it never switches to or from `relevance`
- [ ] Selecting an article calls `setSelectedArticle(article.id)` and clears copilot state if the article changed
- [ ] Selecting a new unread article optimistically marks it read and decrements `totalUnread`
- [ ] If the background `markRead` request fails, the article is reverted to unread and `totalUnread` increments back
- [ ] `j` keyboard shortcut selects the next article only when focus is not inside an input or textarea
- [ ] `k` keyboard shortcut selects the previous article only when focus is not inside an input or textarea
- [ ] `/` keyboard shortcut focuses the first input whose placeholder contains `Search`
- [ ] `o` keyboard shortcut opens the selected article's `link` in a new tab only when that link exists
- [ ] `s` keyboard shortcut toggles star on the selected article through the store
- [ ] `c` keyboard shortcut opens the citation modal for the selected article
- [ ] `a` keyboard shortcut toggles the copilot panel only when an article is selected
- [ ] Article reader empty state text is exactly `Select an article to read`
- [ ] Reader journal-info row omits itself entirely when journal, volume, and issue are all absent
- [ ] Reader published-date row always includes reading-time text computed from `abstractSnippet`
- [ ] Reader `Save` button does not disable while `saveToLibrary()` is in flight
- [ ] Successful `saveToLibrary()` marks `isSavedToLibrary = true` and stores `savedPaperId`
- [ ] Failed `saveToLibrary()` sets store `error` and returns `null`
- [ ] Reader `AI` button calls the passed `onOpenCopilot()` and does not itself select the article
- [ ] Reader `Open Original` button is hidden when `article.link` is absent
- [ ] Reader `Abstract` section is hidden when `abstractSnippet` is empty
- [ ] Reader DOI section is hidden when `article.doi` is absent
- [ ] Article Notes local textarea state resets when store notes for that article change
- [ ] Article Notes auto-save waits 1 second after the last keystroke before persisting
- [ ] Blurring the notes field flushes any pending unsaved local changes immediately
- [ ] Note saves optimistically update the store before the PUT request resolves
- [ ] Empty notes are stored as `null` to the API and removed from the local `articleNotes` map
- [ ] Notes save failures are silent and rely on a future article reopen to refresh server state
- [ ] `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call
- [ ] Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh
- [ ] Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty
- [ ] Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty
- [ ] Pressing Enter in the RSS URL input triggers `handleAddUrl()`
- [ ] Pressing Enter in the PubMed query input triggers `handlePubMed()`
- [ ] Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal
- [ ] Add Feed modal error state is rendered as red helper text inside the modal, not a global banner
- [ ] Copilot panel only renders when `copilotOpen` is true and a selected article still exists
- [ ] Copilot panel close button hides the panel but does not deselect the article
- [ ] Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist
- [ ] Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`
- [ ] `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API
- [ ] Fresh summarize requests POST to `/api/feeds/copilot/summarize`
- [ ] Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry
- [ ] Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists
- [ ] Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming
- [ ] Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true
- [ ] Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely
- [ ] Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`
- [ ] Copilot chat appends an empty assistant message first and streams text chunks into it
- [ ] Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat
- [ ] Copilot input placeholder reads `Ask about this paper...`
- [ ] Copilot input and send button are disabled while `copilotLoading` is true
- [ ] Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`
- [ ] `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result
- [ ] Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel
- [ ] Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons
- [ ] Route-level error boundary title reads `Journal Feed unavailable`
- [ ] Route-level error boundary message reads `We couldn't load your feeds. Please try again.`

### Actual Current Behavior Corrections
- [ ] Default view filter is `Unread`, not `All Articles`.
- [ ] The page-level header always marks all visible feeds read globally; there is no page-level picker for a specific-feed mark-all-read action.
- [ ] Search is not debounced in the current store; each change immediately triggers `loadArticles()`.
- [ ] `Clear all filters` does not clear the search query.
- [ ] Advanced `Sort by` options do not preserve a distinct `Added` or `Title` state in the store; they normalize back into the legacy feed sort modes.
- [ ] Import/export feedback uses `alert(...)` or silent failure, not toast notifications.
- [ ] Feed mute/unmute is not optimistic in the current implementation; it waits for a PATCH then reloads subscriptions.
- [ ] Copilot-related fetch failures generally clear loading state without rendering a dedicated inline error panel.

*Generated from source code in `src/app/(app)/feeds/`, `src/components/feeds/`, `src/stores/feed-store.ts`, and related API routes — March 2026*

---

## Re-Audit Discoveries (Claude Code Pass 2)

> Findings from line-by-line source code review of every .tsx/.ts file
> contributing to the /feeds route. Each checkbox is a distinct testable
> assertion not already covered above.

### Page-Level Rendering Logic (page.tsx)

- [ ] Page container height is `h-[calc(100vh-7rem)]`
- [ ] `hasSubscriptions` check includes `isLoadingSubscriptions` — content layout shown while subscriptions still loading (never flashes empty state during load)
- [ ] CopilotPanel and ArticleReader are mutually exclusive via ternary: when `copilotOpen && selectedArticleId`, CopilotPanel replaces ArticleReader
- [ ] onAI handler in ArticleList sets selected article FIRST, then opens copilot after 50ms `setTimeout` delay
- [ ] `citeArticle` state is `FeedArticleWithStatus | null`; CitationModal visibility controlled by non-null citeArticle
- [ ] CitationModal `onClose` sets `citeArticle` to `null`
- [ ] AddFeedModal `onClose` sets `showAddModal` to `false`
- [ ] Main content area uses `flex gap-4 flex-1 min-h-0`

### Header Specifics (page.tsx)

- [ ] Header title `text-xl font-bold text-ink`
- [ ] Unread text `text-xs text-ink-muted mt-0.5`
- [ ] Unread text singular form: "1 unread article" (no trailing "s" when `totalUnread === 1`)
- [ ] Export button icon: `Export` from phosphor-icons (not Download)
- [ ] Export button label text: "Export" (visible inline text, not tooltip-only)
- [ ] Import button icon: `Upload` from phosphor-icons
- [ ] Import button label text: "Import" (visible inline text, not tooltip-only)
- [ ] Mark all read icon: `Checks` from phosphor-icons
- [ ] Mark all read label text: "Mark all read" (visible inline)
- [ ] Add Feed button uses `Plus` icon with `weight="bold"`
- [ ] Add Feed button is primary styled: `bg-brand text-white text-sm font-medium`
- [ ] All other header buttons use `text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised`
- [ ] Sort segmented control container: `bg-surface-raised rounded-xl p-0.5`
- [ ] Layout control container: `bg-surface-raised rounded-lg p-0.5` (different rounding from sort)
- [ ] Active sort button styling: `bg-surface text-ink shadow-sm`
- [ ] Inactive sort button styling: `text-ink-muted hover:text-ink`
- [ ] Layout buttons have `aria-label` attributes matching their label values
- [ ] Error banner full styling: `bg-red-500/10 border border-red-500/20 text-red-400 text-sm`
- [ ] Error banner dismiss button is text "Dismiss" (NOT an X icon) — styled `text-red-400 hover:text-red-300 text-xs font-medium`
- [ ] Header `setSortBy("relevance")` sets `sortDir = "desc"` (not "asc")

### Loading Skeleton (loading.tsx)

- [ ] Loading skeleton header: 1 title skeleton (`h-7 w-40`) + 2 button skeletons (`h-9 w-28 rounded-xl`)
- [ ] Loading skeleton uses identical height constraint `h-[calc(100vh-7rem)]` as actual page
- [ ] Sidebar skeleton: `glass-panel rounded-2xl p-3 h-full` with 8 rows (`h-9 rounded-lg`)
- [ ] Sidebar skeleton hidden below `lg` breakpoint (matches actual sidebar)
- [ ] Article area: 6 `SkeletonCard` components in `space-y-2` layout

### Error Boundary (error.tsx)

- [ ] Error boundary uses `ErrorDisplay` shared UI component
- [ ] ErrorDisplay shows `WarningCircle` icon (32px) in `bg-red-500/10` container
- [ ] ErrorDisplay "Try Again" button includes `ArrowCounterClockwise` icon
- [ ] ErrorDisplay calls `Sentry.captureException(error)` on mount when error is present
- [ ] Error boundary maps `reset` prop to `onRetry` callback on ErrorDisplay

### Empty State (feed-empty-state.tsx)

- [ ] Empty state uses `EmptyState` shared UI component
- [ ] EmptyState title styling: `text-lg font-semibold text-ink mb-2`
- [ ] EmptyState description styling: `text-sm text-ink-muted max-w-sm mb-6`
- [ ] EmptyState action button styling: `bg-brand text-white text-sm font-medium hover:bg-brand-hover`

### Feed Sidebar Rendering (feed-sidebar.tsx)

- [ ] Sidebar panel: `glass-panel rounded-2xl h-full overflow-y-auto p-3`
- [ ] Filter section has bottom border: `border-b border-border-subtle` with `mb-3 pb-3`
- [ ] "FILTER" header styled: `text-[10px] font-semibold tracking-widest text-ink-muted/60`
- [ ] View filter buttons: `w-full px-3 py-2 rounded-lg text-sm font-medium`
- [ ] "All Articles" uses `Rss` icon (16px)
- [ ] "Unread" uses `Circle` icon with `weight="fill"` and `className="text-brand"` always
- [ ] "Starred" uses `Star` icon; weight is `"fill"` ONLY when `viewFilter === "starred" && isAllSelected`
- [ ] View filter active highlighting requires BOTH `viewFilter === f.key` AND `isAllSelected` (selecting a specific feed/folder removes filter highlight)
- [ ] View filter buttons call `setSelectedFeed(null)` AND `setSelectedFolder(null)` in addition to `setViewFilter()`
- [ ] Folder header: `uppercase tracking-wider text-xs font-semibold`
- [ ] Folder child feeds indented with `ml-2` wrapper div
- [ ] FeedItem name derived from `sub.displayName || sub.feedSource.title`
- [ ] FeedItem unread badge: `text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded-full bg-brand/10 text-brand`
- [ ] FeedItem mute button title attribute: "Unmute" when `sub.isMuted`, "Mute" when not
- [ ] FeedItem mute button disabled styling: `disabled:opacity-40`
- [ ] FeedItem click uses `sub.feedSourceId` for `setSelectedFeed()` (NOT `sub.id`)
- [ ] Mute PATCH URL uses `sub.id` (subscription id, different from feedSourceId)
- [ ] Mute PATCH body: `{ isMuted: !sub.isMuted }`
- [ ] Folder unread count: `text-[10px] tabular-nums text-ink-muted` right-aligned
- [ ] Selected feed item: `bg-surface-raised text-ink font-medium`
- [ ] Unselected feed item: `text-ink-muted hover:text-ink hover:bg-surface-raised/50`

### Article List Rendering (article-list.tsx)

- [ ] Skeleton condition: `isLoading && articles.length === 0` (only on first-page load)
- [ ] Empty condition: `!isLoading && articles.length === 0`
- [ ] Card component dynamically selected: `layout === "list"` → ArticleCardList, `"magazine"` → ArticleCardMagazine, else ArticleCard
- [ ] Article spacing: magazine `space-y-4`, list/card `space-y-1`
- [ ] Load more button: `w-full py-2 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-raised disabled:opacity-50`
- [ ] Load more container: `pt-3 pb-1 shrink-0`
- [ ] List view `ArticleCardList` does NOT accept `onCite`/`onAI` props — no action buttons possible in list layout

### Article Card — Card View (article-card.tsx)

- [ ] ArticleCard root element is a `<button>` (not div)
- [ ] Unread dot color: `bg-brand` (design-system brand token, not hard-coded blue)
- [ ] Source title reads from `article.feedSourceTitle` field
- [ ] Favicon fallback: `article.feedSourceFaviconUrl || getFaviconUrl(article.feedSourceSiteUrl ?? article.link ?? "")`
- [ ] `formatRelativeTime()` outputs: "just now" (<1 min), "{n}m ago", "{n}h ago", "{n}d ago", or `toLocaleDateString()` (≥30 days)
- [ ] Abstract snippet truncated to first 120 characters + "..." in card view only (magazine shows full text)
- [ ] Snippet only rendered when `article.abstractSnippet` is truthy
- [ ] Snippet styling: `text-xs text-ink-muted/70 line-clamp-2`
- [ ] Action row parent div has `onClick={(e) => e.stopPropagation()}` to prevent card selection
- [ ] Star button title attribute: "Unstar" when starred, "Star" when not
- [ ] Star icon color when starred: `text-yellow-500 hover:text-yellow-400` (text color only, no background)
- [ ] Save button title attribute: "Saved" when saved, "Save to Library" when not
- [ ] Save icon color when saved: `text-brand` (no background)
- [ ] Cite button has its own inline `e.stopPropagation()` in onClick
- [ ] AI button has its own inline `e.stopPropagation()` in onClick
- [ ] DOI link is an `<a>` element (not button), opens `https://doi.org/${article.doi}`
- [ ] DOI link text: "DOI" (not the actual doi value)
- [ ] DOI link has its own `e.stopPropagation()` on click
- [ ] DOI link only shown when `article.doi` is truthy

### Article Card — List View (article-card-list.tsx)

- [ ] List view root element is a `<button>`
- [ ] List view unread styling: `font-medium` on the entire button row
- [ ] List view read styling: `text-ink-muted` on the entire button row
- [ ] Read article spacer: empty `<span>` with `w-2 h-2 shrink-0 aria-hidden="true"` (preserves alignment)
- [ ] Title truncated via `truncate` (single-line ellipsis, not line-clamp)
- [ ] Feed name visibility: `hidden md:inline` (hidden on small screens, visible from md breakpoint)
- [ ] Reading time visibility: `hidden lg:inline` (hidden below lg breakpoint)
- [ ] List view does NOT render a favicon image
- [ ] List view does NOT render authors
- [ ] List view does NOT render abstract/snippet text

### Article Card — Magazine View (article-card-magazine.tsx)

- [ ] Magazine card: `glass-panel rounded-2xl overflow-hidden`
- [ ] Magazine hover state (unselected): `hover:ring-1 hover:ring-border`
- [ ] Image container: `w-full h-48 bg-surface-raised overflow-hidden` (bg visible when image loading)
- [ ] Image uses `object-cover` fit
- [ ] Content area padding: `p-5`
- [ ] Magazine title: `text-base` (larger than card view's `text-sm`)
- [ ] Magazine read title: `font-medium text-ink-muted` (card view uses `font-normal`)
- [ ] Magazine abstract shows full `article.abstractSnippet` (NOT truncated to 120 chars like card view)
- [ ] Magazine abstract styling: `text-sm text-ink-muted line-clamp-3 leading-relaxed`
- [ ] Magazine external link text: "Open" (NOT "DOI" like card view)
- [ ] Magazine external link uses `article.link` (NOT `https://doi.org/${article.doi}`)
- [ ] Magazine external link only shows when `article.link` is truthy (NOT `article.doi`)

### Article Search Bar (article-search-bar.tsx)

- [ ] Search input: `pl-9 pr-4 py-2 rounded-xl text-xs`
- [ ] Search clear button position: `right-3 top-1/2 -translate-y-1/2`
- [ ] Filter toggle with active filters: `bg-brand/10 text-brand border-brand/20`
- [ ] Filter toggle without active filters: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [ ] Blue dot indicator: `w-1.5 h-1.5 rounded-full bg-brand`
- [ ] Sort toggle icon: `SortAscending` when `sortBy === "oldest"`, `SortDescending` otherwise
- [ ] Advanced filter panel: `glass-panel rounded-xl p-3 space-y-3` (only rendered when `showAdvancedFilters`)
- [ ] Date filter "From" label: `text-[10px] text-ink-muted font-medium uppercase tracking-wide`
- [ ] Date filter "To" label: same styling as "From"
- [ ] Date inputs are `type="date"` (native HTML date picker)
- [ ] Journal dropdown label: "Journal" (uppercase tracking-wide)
- [ ] Journal dropdown default option text: "All journals"
- [ ] Advanced sort labels: "Date" (for published), "Added", "Title" (3 equal-width buttons)
- [ ] Advanced sort active: `bg-brand/10 text-brand border border-brand/20`
- [ ] Advanced sort inactive: `bg-surface-raised text-ink-muted border border-border hover:text-ink`
- [ ] `currentLegacySort` derivation: `sortBy === "relevance" ? "title" : "published"` — maps store sort to advanced sort visual state
- [ ] Setting sort "added" with `sortDir = "asc"` normalizes to store `sortBy = "oldest"`
- [ ] Setting sort "published" with `sortDir = "desc"` normalizes to store `sortBy = "newest"`
- [ ] `hasActiveFilters` does NOT include `searchQuery` — only checks `filterDateFrom || filterDateTo || filterJournal`

### Article Reader (article-reader.tsx)

- [ ] Reader panel: `glass-panel rounded-2xl h-full overflow-y-auto p-5`
- [ ] Reader empty state: `glass-panel rounded-2xl h-full flex items-center justify-center`
- [ ] Reader empty state text styling: `text-sm text-ink-muted`
- [ ] Title styling: `text-lg font-bold text-ink leading-snug mb-3`
- [ ] Authors: `text-sm text-ink-muted mb-2`; hidden when `article.authors` is falsy
- [ ] Journal info format: `[journal] · Vol. {volume} · Issue {issue}` (array filtered + joined by " · ")
- [ ] Journal info styling: `text-xs text-ink-muted/70 mb-1`
- [ ] Published date styling: `text-xs text-ink-muted/70 mb-4`
- [ ] Reading time on same line as published date, separated by ` · `
- [ ] `estimateReadingTime()` returns `"< 1 min"` for null/empty text, otherwise `"{n} min read"` (at 200 WPM)
- [ ] Reader Star button label text: "Starred" / "Star" (not icon-only like card view)
- [ ] Reader Save button label text: "Saved" / "Save" (not icon-only like card view)
- [ ] Reader Cite button: only rendered when `onCite` prop is provided
- [ ] Reader AI button styling: `bg-brand/10 text-brand hover:bg-brand/15 border border-brand/20`
- [ ] Reader AI button icon: `Sparkle` with `weight="fill"`
- [ ] Reader Open Original: `<a>` element (not button), hidden when `article.link` falsy
- [ ] Abstract header text: "Abstract" (`text-sm font-semibold text-ink mb-2`)
- [ ] Abstract body: `text-sm text-ink-muted leading-relaxed`
- [ ] DOI text format: "DOI: " followed by linked doi value (`text-brand hover:underline`)
- [ ] ArticleNotes rendered inside the actions border-b section
- [ ] RelatedPapers rendered below notes with `mt-4`, still inside the border-b section

### Article Notes (article-notes.tsx)

- [ ] NoteBlank icon size: 14px
- [ ] "Notes" label: `text-xs text-ink-muted`
- [ ] Saved indicator: Check icon (12px) + "Saved" text in `text-emerald-500`
- [ ] Textarea: `resize-none rounded-xl border border-border bg-surface-raised px-3 py-2 text-xs leading-relaxed`
- [ ] Textarea focus: `focus:ring-2 focus:ring-brand/40`
- [ ] Auto-save debounce: `setTimeout(() => persist(value), 1000)` (exactly 1000ms)
- [ ] Blur handler clears pending save timer before persisting
- [ ] Blur handler only persists when `localValue !== notes` (skips if unchanged)
- [ ] Saved indicator disappears after exactly 2000ms
- [ ] Component cleans up both save timer and saved-indicator timer on unmount

### Related Papers (related-papers.tsx)

- [ ] "Find Related Papers" button: `rounded-xl border border-border-subtle bg-surface-raised/50 px-4 py-3 text-sm`
- [ ] Loading: `Spinner` icon (18px) with `animate-spin` + "Finding related papers..." text
- [ ] Error text: `text-red-400` center-aligned `text-xs`
- [ ] Error message: "Could not find related papers"
- [ ] RelatedPaperCards empty state: "No related papers found." (`text-xs text-ink-muted` centered)
- [ ] Paper card container: `rounded-xl border border-border-subtle bg-surface-raised/60 p-3`
- [ ] Paper title: `text-sm font-medium leading-snug text-ink`
- [ ] Authors: first 3 joined by ", " + " et al." when more than 3
- [ ] Authors fallback: "Unknown authors" when authors array is empty
- [ ] Paper metadata line: authors + ` · {journal}` + ` · {year}` (each part conditional)
- [ ] Paper abstract: `line-clamp-3 text-xs leading-relaxed text-ink-muted`; only shown when NOT `dense` AND `abstract` exists
- [ ] DOI link: `inline-flex items-center gap-1 text-xs text-brand hover:underline` with ArrowSquareOut icon (12px)
- [ ] PubMed link: same styling as DOI link, links to `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
- [ ] Citation count: `{count} citations` in `text-xs text-ink-muted`; only shown when `citationCount > 0`
- [ ] Save button "Saving..." state icon: `Spinner` with `animate-spin`
- [ ] Save button "Saved" state icon: `Check` with `weight="bold"`
- [ ] Save button "Retry Save" state icon: `BookmarkSimple` with `weight="fill"`
- [ ] Save button idle state icon: `BookmarkSimple` with `weight="regular"`
- [ ] Save POSTs to `/api/papers/save` with `{ paper }` body
- [ ] `RelatedPapers` uses local component state (separate from store's copilot-related papers)
- [ ] `RelatedPapers` prevents re-fetch after first load: `if (loading || loaded) return`
- [ ] `getPaperKey()` fallback chain: `paper.doi || paper.pmid || paper.s2Id || "{title}-{year}-{index}"`

### Copilot Panel (copilot-panel.tsx)

- [ ] Copilot header icon container: `w-6 h-6 rounded-full bg-brand/20`
- [ ] Copilot title: "AI Copilot" (`text-sm font-semibold text-ink`)
- [ ] Close button: `p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised`
- [ ] CompactHeader styling: `px-4 py-3 bg-surface-raised/50 rounded-xl border border-border-subtle`
- [ ] CompactHeader title: `text-sm font-semibold text-ink line-clamp-2`
- [ ] CompactHeader second line: authors + ` · {journal}` + ` · {year}` (year from `new Date(publishedAt).getFullYear()`)
- [ ] CompactHeader authors fallback: empty string `""` when null
- [ ] Quick actions layout: `flex gap-2` (NOT grid despite doc section calling it "3-column grid")
- [ ] Summarize button full styling: `bg-brand/10 text-brand` with `Lightning` icon (`weight="fill"`)
- [ ] Explain button full styling: `bg-surface-raised text-ink` with `ChatText` icon
- [ ] Explain sends hardcoded question: "Explain this paper to me in simple terms — what was studied, what was found, and why it matters."
- [ ] Related button full styling: `bg-surface-raised text-ink` with `Books` icon
- [ ] Related button disabled condition: `copilotLoading || relatedPapersLoading` (stricter than Summarize/Explain)
- [ ] Summarize and Explain disabled condition: only `copilotLoading`
- [ ] Source badge full_paper: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`
- [ ] Source badge abstract_only: `bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`
- [ ] Source badge title_only: `bg-red-500/10 border-red-500/20 text-red-500`
- [ ] Source badge icons: 📄 full_paper, 📋 abstract_only, ⚠️ title_only
- [ ] Messages area: `overflow-y-auto px-4 py-3 space-y-3 min-h-0`
- [ ] Empty state icon container: `w-12 h-12 rounded-2xl bg-brand/10` with Sparkle (24px)
- [ ] Empty state text: "Ask me about this paper" (`text-sm font-medium text-ink mb-1`)
- [ ] Empty state helper: "Click Summarize for a quick overview, or ask any question about the study." (`text-xs text-ink-muted max-w-[250px]`)
- [ ] User messages: `bg-surface-raised text-ink` aligned right (`justify-end`)
- [ ] Assistant messages: `bg-brand/5 text-ink` aligned left (`justify-start`) with Sparkle avatar
- [ ] Assistant avatar: `w-6 h-6 rounded-full bg-brand/20` with `Sparkle` (12px)
- [ ] Message text: `whitespace-pre-wrap text-xs leading-relaxed`
- [ ] Related papers in messages use `RelatedPaperCards` with `dense` prop
- [ ] Related-papers message width: `max-w-[95%]` (vs normal `max-w-[85%]`)
- [ ] Loading Sparkle icon uses `animate-spin` class (separate from bouncing dots)
- [ ] Bouncing dot delays: 0ms, `[animation-delay:150ms]`, `[animation-delay:300ms]`
- [ ] Bouncing dot styling: `w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`
- [ ] Suggestion chips header text: "Try asking:" (`text-xs text-ink-muted font-medium`)
- [ ] Suggestion chip: `w-full text-left px-3 py-2 rounded-lg text-xs` with `line-clamp-2`
- [ ] Suggestion chip hover: `hover:border-brand/30`
- [ ] Suggestion chips disabled when `copilotLoading` is true
- [ ] Chat input form border: `border-t border-border-subtle`
- [ ] Chat input styling: `rounded-xl bg-surface-raised border border-border text-ink text-xs`
- [ ] Send button: `p-2 rounded-xl bg-brand text-white` with `PaperPlaneRight` icon (16px)
- [ ] Send button disabled: `copilotLoading || !input.trim()` (both conditions)
- [ ] Form submit: prevents default, trims input, clears local input state, then calls `sendCopilotMessage`
- [ ] Auto-scroll: `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` triggered on `copilotMessages` change

### Add Feed Modal (add-feed-modal.tsx)

- [ ] Modal title: "Add Feed" (not "Add a Feed" or "New Feed")
- [ ] Modal max-width: `max-w-xl`
- [ ] Tab keys: `"url"` and `"browse"` (not `"Add URL"` / `"Browse Journals"`)
- [ ] RSS input icon: `Rss` (16px) positioned `left-3 top-1/2 -translate-y-1/2`
- [ ] RSS input type: `url` (enables browser URL validation)
- [ ] PubMed input icon: `MagnifyingGlass` (16px) positioned same as RSS
- [ ] PubMed input type: `text`
- [ ] RSS Add button text: "Adding..." during subscribe, "Add" normally
- [ ] PubMed Create Feed button text: "Creating..." during subscribe, "Create Feed" normally
- [ ] Divider: "or" text centered between `border-t border-border-subtle` lines
- [ ] Error styling: `text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-xl`
- [ ] Successful URL add: clears `feedUrl` then calls `onClose()`
- [ ] Successful PubMed add: clears `pubmedQuery` then calls `onClose()`
- [ ] `subscribe` error re-thrown by store — modal catches it and sets local error state
- [ ] `subscribePubMed` error re-thrown by store — modal catches it with different default message: "Failed to create PubMed feed"

### Citation Modal (citation-modal.tsx)

- [ ] Modal title: "Cite Article" (not "Citation" or "Cite")
- [ ] Default citation tab: `"apa"` (useState initial value)
- [ ] Citation display area: `bg-surface-raised rounded-xl p-4 mb-4 min-h-[80px]`
- [ ] Citation text uses `font-mono` (monospace rendering)
- [ ] Loading text: "Formatting citations..." with `animate-pulse`
- [ ] Error text: "Failed to load citation formats" (`text-xs text-ink-muted`)
- [ ] Copy Citation button: `bg-brand text-white` with `ClipboardText` icon (16px)
- [ ] Copy button text changes: "Copy BibTeX" on bibtex tab, "Copy Citation" on others
- [ ] Copy feedback text: "Copied!" for exactly 2000ms
- [ ] Copy In-Text button: `border border-border text-ink` secondary style
- [ ] Copy In-Text button hidden on bibtex tab (`tab !== "bibtex"`)
- [ ] Clipboard fallback: creates textarea, calls `document.execCommand("copy")`, removes textarea
- [ ] DOI section: centered (`text-center`) below copy buttons with `mt-3`
- [ ] Citation formats fetched via server action `getAllCitationFormats(articleToPaperData(article))`
- [ ] When article changes: formats reset to null, loading set to `!!article`, tab NOT reset
- [ ] Fetch uses cancellation pattern: `let cancelled = false` with cleanup function
- [ ] Copy buttons disabled when `!formats` (no formats loaded)

### Journal Browser (journal-browser.tsx)

- [ ] Loading state: 4 `Skeleton` bars (`h-16 w-full rounded-xl`)
- [ ] Search uses `SearchInput` shared UI component (not raw input)
- [ ] Category dropdown default: "All Categories"
- [ ] Specialty dropdown default: "All Specialties"
- [ ] Dropdowns styled: `rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm`
- [ ] Fetch uses `AbortController` for cleanup on search/category/specialty changes
- [ ] AbortError caught and silently ignored (DOMException with name "AbortError")
- [ ] Browse mode empty state: "No journals found matching your filters."
- [ ] Browse mode subtitle: "Explore the curated directory by category, specialty, or publisher."
- [ ] "Can't find what you're looking for?" help section only in search mode
- [ ] "Can't find" text varies: references PubMed + RSS URL when no feeds found vs when some found
- [ ] Journal card category pill: `rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-ink-muted`
- [ ] Journal card specialty pill: same styling as category pill
- [ ] Journal card "Suggested for you" badge: `rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand`
- [ ] Journal list container: `max-h-64 overflow-y-auto` (scrollable, fixed height)
- [ ] Journal empty state: `rounded-xl border border-dashed border-border-subtle px-4 py-6 text-center`
- [ ] Subscribe checks both `journal.isSubscribed` property AND URL match against current subscriptions
- [ ] `subscribedUrls` computed via `useMemo` from subscriptions array
- [ ] Suggested feeds hidden when search is active: `hasSearch ? [] : data?.suggestedFeeds ?? []`
- [ ] Browse feeds exclude suggested in browse mode: `feeds.filter((feed) => !feed.isSuggested)`
- [ ] PubMed create feed uses `trimmedSearch` (not raw `search`) as query
- [ ] PubMed success message: green text `text-xs text-green-500`
- [ ] PubMed error message: red text `text-xs text-red-400`

### Feed Store — Additional Details (feed-store.ts)

- [ ] `showAdvancedFilters` state: boolean, default `false`
- [ ] `loadSubscriptions` clears error at start: `{ isLoadingSubscriptions: true, error: null }`
- [ ] `loadSubscriptions` fetches from `GET /api/feeds` endpoint
- [ ] `loadSubscriptions` error message from `Error` instance or fallback "Failed to load subscriptions"
- [ ] `loadArticles` always sends `sortDir` parameter (even for default "desc")
- [ ] `loadArticles` only sends `sortBy` when NOT "newest" (omits for default to reduce params)
- [ ] `loadArticles` sends `isRead=false` for unread filter, `isStarred=true` for starred filter
- [ ] `subscribe` POSTs to `/api/feeds` with `{ feedUrl }` body
- [ ] `subscribe` re-throws error after setting store error (enables caller catch)
- [ ] `subscribePubMed` POSTs to `/api/feeds` with `{ pubmedQuery: query }` body
- [ ] `subscribePubMed` re-throws error after setting store error
- [ ] `markRead` is fire-and-forget: synchronous optimistic update + `fetch().catch(revert)`
- [ ] `markRead` skips if article already read (`if (!article || article.isRead) return`)
- [ ] `markRead` POSTs to `/api/feeds/articles/${articleId}/read`
- [ ] `toggleStar` POSTs to `/api/feeds/articles/${articleId}/star`
- [ ] `saveToLibrary` POSTs to `/api/feeds/articles/${articleId}/save`
- [ ] `markAllRead` POSTs to `/api/feeds/articles/mark-all-read` with optional `{ feedSourceId }`
- [ ] `markAllRead` on success calls `loadSubscriptions()` to refresh unread counts
- [ ] `loadArticleNote` GETs `/api/feeds/articles/${articleId}/notes`
- [ ] `loadArticleNote` silently returns on non-ok response (no error set)
- [ ] `loadArticleNote` stores empty notes by deleting key from `articleNotes` map
- [ ] `saveArticleNote` trims notes before storing/sending
- [ ] `saveArticleNote` sends `null` to API for empty notes: `{ notes: trimmedNotes || null }`
- [ ] `saveArticleNote` failure is silent (catch block empty)
- [ ] `setLayout` does NOT trigger article reload (only updates layout state)
- [ ] `clearFilters` does NOT reset `searchQuery` (only date and journal)
- [ ] `loadJournals` fetches from `GET /api/feeds/articles/journals`
- [ ] `loadJournals` failure is silent
- [ ] `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`
- [ ] `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel
- [ ] Chat history filters out `system` role messages before sending to API
- [ ] Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`
- [ ] `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message
- [ ] Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires
- [ ] `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`
- [ ] `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex
- [ ] `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."
- [ ] `formatRelatedPapersSummary()` without papers: "I couldn't find related papers for this article. Try a broader topic search."
- [ ] Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"
- [ ] `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link
- [ ] `summarizeArticle` error sets store `error` (global banner, not copilot-local)
- [ ] Standard chat error sets store `error` (global banner, not copilot-local)
- [ ] `findRelatedPapers` failure does NOT set store error (silent clear of loading state)

### Keyboard Shortcuts — Additional Edge Cases (page.tsx)

- [ ] `j` does nothing when at last article (`currentIndex >= articles.length - 1`)
- [ ] `k` does nothing when at first article (`currentIndex <= 0`)
- [ ] `o` does nothing when `selectedArticleId` is falsy (no article selected)
- [ ] `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)
- [ ] `c` does nothing if article not found in `articles` array for `selectedArticleId`
- [ ] `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle

### Behavior Corrections

- Error banner dismiss button is TEXT "Dismiss" — existing doc line 95 describes it as "Dismiss button (X)" which incorrectly implies an X icon
- Quick action buttons in copilot use `flex gap-2` layout — existing doc section 10 calls it "3-column grid" which is incorrect
- Magazine view abstract is full `abstractSnippet` — existing doc section 5 says "line-clamp-3" which is the CSS class but the text itself is NOT pre-truncated like card view
- Magazine external link text is "Open" linking to `article.link` — existing doc section 5 action table says "DOI" linking to `doi.org/{doi}` which is only correct for card view
- Card view abstract says "first 120 chars + '...'" — correct for card view only; the existing doc doesn't clarify this is card-view-specific behavior
- Clicking `Relevance` sort sets `sortDir = "desc"` (not "preserving current sortDir" as stated in existing doc line 654) — `setSortBy("relevance")` sets `sortDir: sortBy === "oldest" ? "asc" : "desc"`, which resolves to `"desc"` since sortBy is "relevance"

## Codex Verification Pass Discoveries

> Source-backed behaviors found during verification after removing 4 inaccurate Claude Code pass-2 checkboxes.

### Shared UI Details
- [ ] Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px

### Feed Sidebar
- [ ] Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`
- [ ] Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons

### Feed Store
- [ ] `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic
- [ ] Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article
- [ ] Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`
