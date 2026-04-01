# Feature Census: Explore Module

**Generated:** 2026-04-01
**Entry points:** `src/app/(app)/explore/page.tsx`, `src/app/(app)/explore/scopes/page.tsx`, `src/app/(app)/explore/sources/page.tsx`
**Files in scope:** 19 source files + 3 server action files
**Route URLs:** `/explore`, `/explore/scopes`, `/explore/sources`
**Method:** Layer 1 (code extraction) + Layer 2 (library check). Layer 3 (runtime) skipped — app requires Clerk auth.

## Summary

| Metric | Count |
|--------|-------|
| Total features | 72 |
| From your code | 70 |
| From libraries (emergent) | 2 |
| Confirmed (code) | 72 |
| Code-only (not runtime-verified) | 72 |

---

## Features by Category

### 1. Search

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 1 | Submit search query | Enter / click search icon | ExploreSearchBar.tsx:33 | CODE |
| 2 | Clear search input | Click X button | ExploreSearchBar.tsx:50-57 | CODE |
| 3 | Parallel multi-tab search (academic, web, news, discussions) | On search submit | ExplorePageClient.tsx:225-227 | CODE |
| 4 | Search with filters applied | Filter change re-triggers search | ExplorePageClient.tsx:327-374 | CODE |
| 5 | "More from this source" site: search | ActionsMenu or onMoreFromSource | ExplorePageClient.tsx:414-454 | CODE |
| 6 | Search from history selection | Click history entry | ExplorePageClient.tsx:504-545 | CODE |
| 7 | Search history saved on success | Fire-and-forget after search | ExplorePageClient.tsx:274-280 | CODE |
| 8 | Saved URL detection (badge display) | After search results load | ExplorePageClient.tsx:263-271 | CODE |
| 9 | Results per page = 10 | Constant | ExplorePageClient.tsx:36 | CODE |
| 10 | Stats line ("N results in X.Xs") | After search completes | ExplorePageClient.tsx:200-206 | CODE |

### 2. Tab Navigation

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 11 | Switch tabs (Academic, Web, News, Discussions, More) | Click tab button | ExploreTabs.tsx:20-51 | CODE |
| 12 | Tab keyboard shortcut 1-4 | Keys 1, 2, 3, 4 | useExploreKeyboard.ts:144-152 | CODE |
| 13 | Tab cycling forward | `]` key | useExploreKeyboard.ts:155-160 | CODE |
| 14 | Tab cycling backward | `[` key | useExploreKeyboard.ts:162-169 | CODE |
| 15 | Lazy tab loading (fetch on first visit) | Tab change | ExplorePageClient.tsx:318-325 | CODE |
| 16 | "More" tab placeholder ("Coming soon") | Select More tab | ExplorePageClient.tsx:644-653 | CODE |

### 3. Filter System (FilterPills)

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 17 | Scope dropdown (All Sources + user scopes) | Click pill | FilterPills.tsx:196-266 | CODE |
| 18 | "Edit Scopes..." link in scope dropdown | Click link | FilterPills.tsx:253-261 | CODE |
| 19 | Order By dropdown (Quality, Recency, Citations, Trust) | Click pill | FilterPills.tsx:270-320 | CODE |
| 20 | Citations sort disabled for non-academic tabs | Conditional | FilterPills.tsx:296-298 | CODE |
| 21 | Time filter dropdown (Any, 24h, Week, Month, Year) | Click pill | FilterPills.tsx:324-404 | CODE |
| 22 | Custom date range (From/To date inputs) | Select "Custom range" | FilterPills.tsx:366-399 | CODE |
| 23 | Options dropdown: Exact match toggle | Click checkbox | FilterPills.tsx:436-442 | CODE |
| 24 | Options dropdown: Use my preferences toggle | Click checkbox | FilterPills.tsx:443-449 | CODE |
| 25 | Options dropdown: Open access only toggle (academic only) | Click checkbox | FilterPills.tsx:450-458 | CODE |
| 26 | Active filter count badge on Options pill | Conditional | FilterPills.tsx:419-423 | CODE |
| 27 | "Clear all" filters reset | Click button | FilterPills.tsx:504-544 | CODE |
| 28 | Dropdown close on click-outside | Event listener | FilterPills.tsx:88-107 | CODE |
| 29 | Dropdown close on Escape | Event listener | FilterPills.tsx:97-99 | CODE |

### 4. Result Cards

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 30 | Result title as link (opens external) | Click title | ResultCard.tsx:251-258 | CODE |
| 31 | Fallback title (non-linked) when no URL | No URL/DOI/PMID | ResultCard.tsx:259-263 | CODE |
| 32 | Trust tier color-coded left border | Per result | ResultCard.tsx:140-146 | CODE |
| 33 | Evidence level border (academic) | Evidence I-V | ResultCard.tsx:22-27 | CODE |
| 34 | Breadcrumb display (domain > path) | Always shown | ResultCard.tsx:45-67 | CODE |
| 35 | Metadata line (authors, evidence, outlet, time) | Tab-specific formatting | ResultCard.tsx:116-138 | CODE |
| 36 | Date label (formatted or year) | When available | ResultCard.tsx:97-114 | CODE |
| 37 | Snippet with 3-line clamp | When abstract/tldr exists | ResultCard.tsx:329-341 | CODE |
| 38 | Save to Library button (+/check icon) | Click button | ResultCard.tsx:282-303 | CODE |
| 39 | Save button spinner (CircleNotch) | While saving | ResultCard.tsx:296-298 | CODE |
| 40 | Saved state indicator (check icon) | After save | ResultCard.tsx:298-300 | CODE |
| 41 | Source info panel toggle (shield icon) | Click shield button | ResultCard.tsx:267-280 | CODE |
| 42 | Keyboard highlight style (ring + shadow) | j/k navigation | ResultCard.tsx:240-242 | CODE |
| 43 | Selection ring style | x/Shift+Arrow | ResultCard.tsx:243 | CODE |
| 44 | Scroll highlighted card into view | Auto-scroll | ResultCard.tsx:179-184 | CODE |
| 45 | Memoized rendering (React.memo) | Performance optimization | ResultCard.tsx:148 | CODE |

### 5. Actions Menu

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 46 | Save to Library | Menu item (S) | ActionsMenu.tsx:37-42 | CODE |
| 47 | Save to Project | Menu item | ActionsMenu.tsx:43-48 | CODE |
| 48 | Cite in Draft | Menu item (C) | ActionsMenu.tsx:49-54 | CODE |
| 49 | Open Original | Menu item (O) | ActionsMenu.tsx:55-60 | CODE |
| 50 | Summarize Page | Menu item | ActionsMenu.tsx:61-66 | CODE |
| 51 | Ask About Page | Menu item | ActionsMenu.tsx:67-72 | CODE |
| 52 | More from this source | Menu item | ActionsMenu.tsx:73-78 | CODE |
| 53 | Block this source (danger) | Menu item (B) | ActionsMenu.tsx:79-86 | CODE |
| 54 | Copy Link | Menu item | ActionsMenu.tsx:87-92 | CODE |
| 55 | Save hidden when already saved | Conditional filter | ActionsMenu.tsx:142-145 | CODE |
| 56 | Close on outside click | Event listener | ActionsMenu.tsx:106-133 | CODE |
| 57 | Close on Escape (re-focus trigger) | Keyboard | ActionsMenu.tsx:120-124 | CODE |

### 6. AI Synthesis

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 58 | Synthesize button with sparkle icon | Click button / Q key | ExplorePageClient.tsx:678-689 | CODE |
| 59 | Streaming synthesis from API | POST /api/explore/synthesize | SynthesisBlock.tsx:117-182 | CODE |
| 60 | Inline citation markers [N] with trust-colored links | In synthesis text | SynthesisBlock.tsx:60-96, 268-282 | CODE |
| 61 | Click citation scrolls to result card | Click [N] marker | SynthesisBlock.tsx:198-205 | CODE |
| 62 | Collapse/expand synthesis | Toggle button | SynthesisBlock.tsx:231-239 | CODE |
| 63 | Close synthesis | X button / Q toggle | SynthesisBlock.tsx:241-248 | CODE |
| 64 | Synthesis skeleton loading | While streaming starts | SynthesisBlock.tsx:259-265 | CODE |
| 65 | Synthesis failure message | On API error | SynthesisBlock.tsx:256-258 | CODE |
| 66 | Deduplication (same query won't re-fetch) | Fingerprint check | SynthesisBlock.tsx:121-126 | CODE |
| 67 | Abort on close/unmount | AbortController | SynthesisBlock.tsx:128-130, 189-191 | CODE |

### 7. Source Info Panel

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 68 | Domain name display | Always | SourceInfoPanel.tsx:65-69 | CODE |
| 69 | Trust tier badge (Government, Major Journalism, Community, Unclassified) | Always | SourceInfoPanel.tsx:73-84 | CODE |
| 70 | Source type label | When available | SourceInfoPanel.tsx:87-92 | CODE |
| 71 | Domain preference control (Prefer/Higher/Neutral/Lower/Mute) | Expandable section | SourceInfoPanel.tsx:106-147 | CODE |
| 72 | Close panel button | Click X | SourceInfoPanel.tsx:95-102 | CODE |

### 8. Keyboard Navigation

| # | Feature | Shortcut | Code Ref | Status |
|---|---------|----------|----------|--------|
| 73 | Navigate down | j / ArrowDown | useExploreKeyboard.ts:97-116 | CODE |
| 74 | Navigate up | k / ArrowUp | useExploreKeyboard.ts:117-134 | CODE |
| 75 | Focus search bar | / | useExploreKeyboard.ts:137-140 | CODE |
| 76 | Save highlighted result | S | useExploreKeyboard.ts:172-179 | CODE |
| 77 | Open highlighted result | O | useExploreKeyboard.ts:180-187 | CODE |
| 78 | Cite highlighted result | C | useExploreKeyboard.ts:188-195 | CODE |
| 79 | Toggle synthesis | Q | useExploreKeyboard.ts:196-200 | CODE |
| 80 | Source info for highlighted | I | useExploreKeyboard.ts:201-208 | CODE |
| 81 | Block highlighted source | B | useExploreKeyboard.ts:209-216 | CODE |
| 82 | Toggle selection | X | useExploreKeyboard.ts:219-236 | CODE |
| 83 | Extend selection down | Shift+ArrowDown | useExploreKeyboard.ts:99-110 | CODE |
| 84 | Extend selection up | Shift+ArrowUp | useExploreKeyboard.ts:119-130 | CODE |
| 85 | Shortcuts overlay toggle | ? | useExploreKeyboard.ts:239-242 | CODE |
| 86 | Escape blurs input or closes overlay | Esc | useExploreKeyboard.ts:62-77 | CODE |
| 87 | No intercept on modified keys (Cmd/Ctrl/Alt) | Guard | useExploreKeyboard.ts:80 | CODE |
| 88 | No intercept when input focused (except Esc) | Guard | useExploreKeyboard.ts:70-77 | CODE |

### 9. Search History

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 89 | History dropdown toggle (clock icon) | Click button | SearchHistoryDropdown.tsx:60-66 | CODE |
| 90 | Load last 20 searches | On dropdown open | SearchHistoryDropdown.tsx:48-58 | CODE |
| 91 | Click history entry re-runs search | Click entry | SearchHistoryDropdown.tsx:147-150 | CODE |
| 92 | Delete individual history entry | Click X on entry | SearchHistoryDropdown.tsx:83-89 | CODE |
| 93 | Clear all history | Click "Clear all" | SearchHistoryDropdown.tsx:92-95 | CODE |
| 94 | Relative time display (just now, 5m ago, 2h ago) | Per entry | SearchHistoryDropdown.tsx:20-34 | CODE |
| 95 | Tab label shown per entry | Per entry | SearchHistoryDropdown.tsx:163-165 | CODE |
| 96 | Close on click outside | Event listener | SearchHistoryDropdown.tsx:69-81 | CODE |
| 97 | Empty state ("No recent searches") | When no entries | SearchHistoryDropdown.tsx:137-140 | CODE |

### 10. Pagination

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 98 | Previous page button | Click | ExplorePageClient.tsx:727-743 | CODE |
| 99 | Next page button | Click | ExplorePageClient.tsx:749-765 | CODE |
| 100 | Page N of M display | Always shown | ExplorePageClient.tsx:745-747 | CODE |
| 101 | Lazy page loading (cached per tab) | On page change | ExplorePageClient.tsx:283-316 | CODE |
| 102 | Pagination disabled during loading | isPaginating guard | ExplorePageClient.tsx:735, 757 | CODE |
| 103 | Previous disabled on first page | activePage === 0 | ExplorePageClient.tsx:735 | CODE |
| 104 | Next disabled on last page | activePage + 1 >= totalPages | ExplorePageClient.tsx:757 | CODE |

### 11. Toast Notifications

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 105 | "Saved to Library" success toast | After save | ExplorePageClient.tsx:389 | CODE |
| 106 | "Already in your Library" info toast | Duplicate save | ExplorePageClient.tsx:387 | CODE |
| 107 | "Failed to save" error toast | Save error | ExplorePageClient.tsx:395 | CODE |
| 108 | "Blocked {domain}" success toast | After block | ExplorePageClient.tsx:406 | CODE |
| 109 | "Failed to block source" error toast | Block error | ExplorePageClient.tsx:408 | CODE |
| 110 | Auto-dismiss after 2s with fade | Timer | SaveToast.tsx:29-33 | CODE |

### 12. Scopes Management Page (/explore/scopes)

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 111 | Create scope form | Click "New Scope" | scopes/page.tsx:234-251 | CODE |
| 112 | Scope name input (required, max 100) | Form field | scopes/page.tsx:76-88 | CODE |
| 113 | Include domains (comma-separated) | Form field | scopes/page.tsx:91-102 | CODE |
| 114 | Exclude domains (comma-separated) | Form field | scopes/page.tsx:103-112 | CODE |
| 115 | Include keywords (comma-separated) | Form field | scopes/page.tsx:117-128 | CODE |
| 116 | Exclude keywords (comma-separated) | Form field | scopes/page.tsx:129-140 | CODE |
| 117 | Edit existing scope | Click pencil icon | scopes/page.tsx:318-321 | CODE |
| 118 | Delete scope | Click trash icon | scopes/page.tsx:323-329 | CODE |
| 119 | Toggle scope active/inactive | Click Active/Inactive badge | scopes/page.tsx:306-316 | CODE |
| 120 | Scope count display (N / 20) | Header | scopes/page.tsx:224-226 | CODE |
| 121 | Max 20 scopes enforced | Conditional | scopes/page.tsx:234 | CODE |
| 122 | Back to Explore link | Click arrow | scopes/page.tsx:217-222 | CODE |
| 123 | Empty state ("No scopes yet") | When none | scopes/page.tsx:256-259 | CODE |
| 124 | Form validation error display | On save failure | scopes/page.tsx:144-146 | CODE |

### 13. Sources Management Page (/explore/sources)

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 125 | List all domain preferences | On page load | sources/page.tsx:47-56 | CODE |
| 126 | Filter by domain text | Type in search | sources/page.tsx:117-123 | CODE |
| 127 | Filter by preference level (All/Prefer/Higher/Lower/Mute) | Click pill | sources/page.tsx:124-144 | CODE |
| 128 | Count badges per level | Always shown | sources/page.tsx:82-88 | CODE |
| 129 | Change preference level (dropdown) | Select change | sources/page.tsx:167-183 | CODE |
| 130 | Remove domain preference | Click trash | sources/page.tsx:188-196 | CODE |
| 131 | Preference count display (N / 1,000) | Header | sources/page.tsx:100-102 | CODE |
| 132 | Back to Explore link | Click arrow | sources/page.tsx:93-98 | CODE |
| 133 | Empty state (no preferences / no filter matches) | Conditional | sources/page.tsx:150-154 | CODE |

### 14. Empty, Loading, and Error States

| # | Feature | Condition | Code Ref | Status |
|---|---------|-----------|----------|--------|
| 134 | Search skeleton (5 pulsing cards) | isSearching | ExplorePageClient.tsx:624-642 | CODE |
| 135 | Error banner with retry button | search error | ExplorePageClient.tsx:608-622 | CODE |
| 136 | "No {tab} results found" empty state | 0 results | ExplorePageClient.tsx:666-675 | CODE |
| 137 | "Temporarily unavailable" state | SearXNG down | ExplorePageClient.tsx:655-664 | CODE |
| 138 | Landing page (centered search bar) | Before first search | ExplorePageClient.tsx:549-572 | CODE |

### 15. API & Server Actions

| # | Feature | Endpoint/Action | Code Ref | Status |
|---|---------|----------------|----------|--------|
| 139 | Unified search API | GET /api/search/unified | ExplorePageClient.tsx:136 | CODE |
| 140 | AI synthesis streaming | POST /api/explore/synthesize | synthesize/route.ts:61-112 | CODE |
| 141 | Rate limiting on synthesis | checkRateLimit | synthesize/route.ts:64 | CODE |
| 142 | Auth check on synthesis | getCurrentUserId | synthesize/route.ts:63 | CODE |
| 143 | AI not configured guard | isAIConfigured check | synthesize/route.ts:84-89 | CODE |
| 144 | Save web source | saveWebSource action | ExplorePageClient.tsx:380 | CODE |
| 145 | Get saved URLs | getSavedUrls action | ExplorePageClient.tsx:268 | CODE |
| 146 | Set domain preference | setDomainPreference action | ExplorePageClient.tsx:405 | CODE |
| 147 | Add search history | addExploreSearchHistory action | ExplorePageClient.tsx:275 | CODE |
| 148 | Get user scopes | getUserScopes action | ExplorePageClient.tsx:182 | CODE |

### 16. Shortcuts Overlay

| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 149 | Full-screen overlay with all shortcuts | ? key | ExploreShortcutsOverlay.tsx:104-174 | CODE |
| 150 | Two-column layout (Navigation/Tabs + Actions/Selection) | Always | ExploreShortcutsOverlay.tsx:147-166 | CODE |
| 151 | Close on click outside | Event listener | ExploreShortcutsOverlay.tsx:110-121 | CODE |
| 152 | Close with Escape or ? | Keyboard | useExploreKeyboard.ts:62-67 | CODE |

---

## Discrepancies

### Menu Items Without Connected Callbacks

These actions appear in the ActionsMenu MENU_ITEMS array but have NO callback wired in ExplorePageClient:

| Feature | Code Ref | Status |
|---------|----------|--------|
| Save to Project (onSaveToProject) | ActionsMenu.tsx:43-48 | **STUB** — no callback passed |
| Cite in Draft (onCite) | ActionsMenu.tsx:49-54 | **STUB** — onCite prop exists on ResultCard but not passed from parent |
| Summarize Page (onSummarize) | ActionsMenu.tsx:61-66 | **STUB** — no callback passed |
| Ask About Page (onAskAbout) | ActionsMenu.tsx:67-72 | **STUB** — no callback passed |
| Copy Link (onCopyLink) | ActionsMenu.tsx:87-92 | **PARTIAL** — clipboard.writeText works but no toast feedback |

### Keyboard Actions Without Full Wiring

| Feature | Code Ref | Status |
|---------|----------|--------|
| Cite shortcut (C key) | useExploreKeyboard.ts:188-195 | **STUB** — onCite not passed in keyboardActions |

---

## Library Capabilities (Layer 2)

The explore module uses minimal third-party interactivity:

| Library | Capability | Active? |
|---------|-----------|---------|
| @phosphor-icons/react | Icon rendering (30+ icons used) | Yes |
| framer-motion | Animations (available but NOT used in explore) | No |
| react-markdown | Markdown rendering (available but NOT used in explore) | No |
| Intl.RelativeTimeFormat | Relative time formatting (browser built-in) | EMERGENT |
| Intl.DateTimeFormat | Date formatting (browser built-in) | EMERGENT |

---

## QA Test Targets

Total testable features: **152** (including 5 stubs to verify graceful handling)

### Critical Path (must test)
- [ ] Search submit → results appear across all 4 tabs
- [ ] Tab switching (click + keyboard 1-4 + `[`/`]`)
- [ ] Pagination (Previous/Next, disabled states, lazy loading)
- [ ] Save to Library (button + keyboard S + toast confirmation)
- [ ] Block source (button + keyboard B + toast)
- [ ] Synthesis (Q key / button → streaming → citations → collapse/close)
- [ ] Filter system (scope, order, time, options, clear all)
- [ ] Keyboard navigation (j/k, highlight, scroll into view)
- [ ] Search history (open, select, delete, clear all)
- [ ] Error state with retry
- [ ] Landing page → results page transition

### Secondary Path
- [ ] Source info panel (open, trust tier, domain preference control)
- [ ] Actions menu (all 9 items, outside-click close, Escape close)
- [ ] Selection (X toggle, Shift+Arrow extend)
- [ ] Shortcuts overlay (? toggle, content accuracy)
- [ ] "More" tab placeholder
- [ ] "Temporarily unavailable" state
- [ ] Custom date range filter
- [ ] Open access only toggle (academic tab only)
- [ ] Citation count sort disabled on non-academic tabs

### Scopes Page
- [ ] Create scope (all fields, validation)
- [ ] Edit scope
- [ ] Delete scope
- [ ] Toggle active/inactive
- [ ] Max 20 enforcement
- [ ] Back navigation

### Sources Page
- [ ] List domain preferences
- [ ] Filter by text
- [ ] Filter by level
- [ ] Change level
- [ ] Remove preference
- [ ] Back navigation

### Stub/Partial Features (verify no crash)
- [ ] "Save to Project" — click does nothing (no callback)
- [ ] "Cite in Draft" — click does nothing (no callback)
- [ ] "Summarize Page" — click does nothing (no callback)
- [ ] "Ask About Page" — click does nothing (no callback)
- [ ] "Copy Link" — copies but no toast feedback
