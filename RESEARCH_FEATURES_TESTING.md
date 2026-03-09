# ScholarSync Research Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Research page (`/research`).
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Search Input & Query](#2-search-input--query)
3. [Filter System](#3-filter-system)
4. [Sort Options](#4-sort-options)
5. [Search Results](#5-search-results)
6. [Evidence Level System](#6-evidence-level-system)
7. [Paper Result Cards](#7-paper-result-cards)
8. [Augmented Queries](#8-augmented-queries)
9. [AI Summary](#9-ai-summary)
10. [Suggested Searches](#10-suggested-searches)
11. [Recent Search History](#11-recent-search-history)
12. [Paper Saving to Library](#12-paper-saving-to-library)
13. [Similar Papers (Find Similar)](#13-similar-papers-find-similar)
14. [AI Copilot / Synthesis Panel](#14-ai-copilot--synthesis-panel)
15. [Paper Detail Panel](#15-paper-detail-panel)
16. [Evidence Table](#16-evidence-table)
17. [Synthesis Report](#17-synthesis-report)
18. [Citation Insertion](#18-citation-insertion)
19. [Paper Chat](#19-paper-chat)
20. [Verification System](#20-verification-system)
21. [Session Persistence](#21-session-persistence)
22. [Pagination & Load More](#22-pagination--load-more)
23. [Error Handling & Edge Cases](#23-error-handling--edge-cases)
24. [Quick Test Workflows](#24-quick-test-workflows)

---

## 1. Page Overview

| Page | Route | Purpose |
|------|-------|---------|
| **Research** | `/research` | Multi-source academic paper search with AI synthesis, evidence grading, extraction, and paper chat |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Search Input + Filters + Sort                               │
├──────────────────────────────────────────┬────────────────────┤
│                                          │  AI Copilot Panel  │
│  Search Results / Paper Detail /         │  (Synthesis Panel) │
│  Evidence Table / Synthesis View         │  (toggleable)      │
│                                          │                    │
│  - Augmented Queries                     │                    │
│  - AI Summary Card                       │                    │
│  - Evidence Table Action Bar             │                    │
│  - Result Cards                          │                    │
│  - Load More                             │                    │
└──────────────────────────────────────────┴────────────────────┘
```

---

## 2. Search Input & Query

- [ ] **Textarea input** — auto-resizing (max 120px height)
- [ ] **Placeholder** — "Ask a research question or enter keywords..."
- [ ] **Enter key** — submits search (without Shift)
- [ ] **Shift+Enter** — adds new line
- [ ] **Search button** — MagnifyingGlass icon, disabled when empty or searching
- [ ] **Loading state** — "Searching..." text + spinner during search
- [ ] **Parsed filter chips** — appear below input when natural language filters detected
  - [ ] Each chip has X button to remove
  - [ ] Chip types: studyType, dateRange, population, keyword

---

## 3. Filter System

### Quick Filter Toggles (`FilterState`)

| Filter | Default | Test |
|--------|---------|------|
| **Last 5 Years** | off | [ ] Toggle on/off, verify results filtered |
| **PDF Available** | off | [ ] Toggle on/off |
| **High Impact** | off | [ ] Toggle on/off |
| **RCTs Only** | off | [ ] Toggle on/off |
| **Reviews** | off | [ ] Toggle on/off |
| **Meta-Analyses** | off | [ ] Toggle on/off |

### Year Range
- [ ] **Year Start** — number input, min 1900, max current year
- [ ] **Year End** — number input, min 1900, max current year

### Advanced Filters (Research Store — FilterPanel component)
- [ ] **Study Type buttons** — toggle: RCT, Systematic Review, Meta-Analysis, Cohort, Case-Control, Clinical Trial, Case Report, Guideline
- [ ] **Full Text Only** — checkbox
- [ ] **Sources** — checkboxes: PubMed, Semantic Scholar (at least one required)
- [ ] **Language** — "english" or "all"

### Filter Behavior
- [ ] Changing filters triggers new search automatically (after init)
- [ ] Filter state persisted in sessionStorage

---

## 4. Sort Options

Dropdown with 4 sort modes:

| Sort | Label | Test |
|------|-------|------|
| **relevance** | Relevance | [ ] Default sort, verify order |
| **citations** | Citations | [ ] Sorts by citation count descending |
| **year** | Year (Newest) | [ ] Sorts by year descending |
| **evidence** | Evidence Level | [ ] Sorts by evidence level I→V |

- [ ] **Sort dropdown** — CaretDown caret icon, toggles on click
- [ ] **Active sort** — highlighted in dropdown
- [ ] **Sort change** — re-sorts existing results (or triggers new search)

---

## 5. Search Results

### API (`POST /api/research/search`)
- [ ] **Multi-source search** — PubMed + Semantic Scholar searched in parallel
- [ ] **8-second timeout** per source
- [ ] **Reciprocal Rank Fusion** — merges results across sources
- [ ] **Rate limiting** — enforced per user
- [ ] **Per page** — 20 results per request

### Results Display
- [ ] **Header** — "Showing X of Y results" with checkbox for select all
- [ ] **Selected count badge** — shows when papers are selected
- [ ] **Skeleton loader** — 5 placeholder cards during search
- [ ] **Source counts** — PubMed, Semantic Scholar, OpenAlex, Clinical Trials counts
- [ ] **Empty state (before search)** — "Search for academic papers..."
- [ ] **Empty state (no results)** — "No results found..."

---

## 6. Evidence Level System

Color-coded evidence grading (I–V):

| Level | Color | Badge Class | Test |
|-------|-------|-------------|------|
| **I** | Emerald | `bg-emerald-500/10 text-emerald-600` | [ ] Verify color |
| **II** | Sky blue | `bg-sky-500/10 text-sky-600` | [ ] Verify color |
| **III** | Amber | `bg-amber-500/10 text-amber-600` | [ ] Verify color |
| **IV** | Orange | `bg-orange-500/10 text-orange-600` | [ ] Verify color |
| **V** | Slate | `bg-slate-500/10 text-slate-600` | [ ] Verify color |

- [ ] Evidence badge displayed on each result card
- [ ] Used in sort-by-evidence ordering

---

## 7. Paper Result Cards

Each result card (`ResultRow`) shows:

- [ ] **Checkbox** — for multi-select (evidence table, synthesis)
- [ ] **Title** — clickable, opens paper detail panel
- [ ] **Authors** — truncated with "et al." if >5
- [ ] **Journal** — journal name
- [ ] **Year** — publication year
- [ ] **Evidence level badge** — color-coded (see Section 6)
- [ ] **Study type badge** — e.g., "RCT", "SR", "Meta-Analysis" with type-specific colors
- [ ] **Citation count** — number of citations
- [ ] **Source badge** — "pubmed", "semantic_scholar", or "both"
- [ ] **Verification status** — verified/partial/unverified/retracted/pending
- [ ] **PMID badge** — if available
- [ ] **DOI badge** — if available
- [ ] **Open Access indicator** — if applicable
- [ ] **Save button** — FloppyDisk icon, saves to library
- [ ] **Insert Citation button** — dispatches citation event

---

## 8. Augmented Queries

- [ ] **Toggle** — "Show augmented queries" / hide toggle
- [ ] Displays AI-expanded query variations from search response
- [ ] Helps users understand how their query was interpreted

---

## 9. AI Summary

- [ ] **AISummaryCard component** — displays AI-generated summary of search results
- [ ] **Loading state** — shown during generation
- [ ] **Generated after search** — summarizes key findings across results
- [ ] **Persisted** — saved in session storage

---

## 10. Suggested Searches

15 pre-built medical/research topic suggestions shown in empty state:

- [ ] "SGLT2 inhibitors cardiovascular outcomes"
- [ ] "CAR-T cell therapy solid tumors"
- [ ] "GLP-1 agonists weight management"
- [ ] "mRNA vaccine technology advances"
- [ ] "AI-assisted diagnostic imaging accuracy"
- [ ] "Immune checkpoint inhibitors biomarkers"
- [ ] "CRISPR sickle cell gene therapy"
- [ ] "Gut microbiome mental health"
- [ ] "Liquid biopsy early cancer detection"
- [ ] "Ketamine treatment-resistant depression"
- [ ] "Wearable devices atrial fibrillation detection"
- [ ] "Fecal microbiota transplant C. difficile"
- [ ] "Psilocybin-assisted psychotherapy PTSD"
- [ ] "Dapagliflozin heart failure outcomes"
- [ ] "Whole genome sequencing rare diseases"

- [ ] Clicking a suggestion populates query and triggers search

---

## 11. Recent Search History

- [ ] **Loaded on mount** — `getRecentSearches()` server action
- [ ] **Saved on each search** — `saveSearchQuery()` server action
- [ ] **ClockCounterClockwise icon** — history indicator
- [ ] **Click to re-run** — clicking a past search populates and executes it

---

## 12. Paper Saving to Library

- [ ] **Save button** — FloppyDisk/BookmarkSimple icon on each result card
- [ ] **Calls `savePaper()`** — server action to persist to database
- [ ] **Visual state** — saved papers show filled/highlighted bookmark
- [ ] **Tracked in `saved` Set** — prevents duplicate saves
- [ ] **Library loaded on mount** — `getUserPapers()` fetches existing library

---

## 13. Similar Papers (Find Similar)

- [ ] **Per-paper "Find Similar" action** — triggers search for related papers
- [ ] **Loading state** — tracked per paper ID in `loadingSimilar` Set
- [ ] **Results** — stored in `similarResults` record by paper ID
- [ ] **Error handling** — tracked in `similarErrors` Set
- [ ] **Empty results** — tracked in `similarEmpty` Set
- [ ] **Display** — similar papers shown inline below the originating result

---

## 14. AI Copilot / Synthesis Panel

Right-side panel togglable from the main page.

- [ ] **Toggle button** — shows/hides copilot panel
- [ ] **AISynthesisPanel component** — renders synthesis interface
- [ ] **Uses `useChat` hook** — from `@ai-sdk/react` with `TextStreamChatTransport`
- [ ] **Streaming responses** — token-by-token display

---

## 15. Paper Detail Panel

Slide-in panel showing full paper details.

### Header
- [ ] **Back button** — returns to results list
- [ ] **Title** — full paper title
- [ ] **Authors** — with "et al." if >5
- [ ] **Journal and year**

### Badges
- [ ] **PMID** — if available
- [ ] **DOI** — if available
- [ ] **Study Type** — colored badge
- [ ] **Citation Count** — number
- [ ] **Verification Status** — verified/partial/unverified/retracted
- [ ] **Open Access** — indicator if applicable

### Tabs: Summary | Abstract | Details
- [ ] **Summary tab** — extraction fields (see below)
- [ ] **Abstract tab** — full abstract text
- [ ] **Details tab** — additional metadata

### Extraction Fields (Summary tab)
| Field | Test |
|-------|------|
| Population | [ ] Shows value + toggleable source quote |
| Intervention | [ ] Shows value + toggleable source quote |
| Comparator | [ ] Shows value + toggleable source quote |
| Primary Outcome | [ ] Shows value + toggleable source quote |
| Effect Size | [ ] Shows value + toggleable source quote |
| Sample Size | [ ] Shows value + toggleable source quote |
| Follow-up | [ ] Shows value + toggleable source quote |
| Study Design | [ ] Shows value + toggleable source quote |
| Limitations | [ ] Shows value + toggleable source quote |

- [ ] **[src] toggle** — shows/hides exact source quote for each field
- [ ] **"Not stated"** — shown when field value is empty

### Action Buttons
- [ ] **"Insert Citation"** — Plus icon, dispatches citation event
- [ ] **"Add to Library"** — changes style when already in library

---

## 16. Evidence Table

### Evidence Table Action Bar
- [ ] **Appears when** — 2+ papers selected
- [ ] **Shows count** — "N papers selected"
- [ ] **"Build Evidence Table" button** — opens setup

### Evidence Table Setup
- [ ] **Preset templates**:
  - [ ] **RCT** — Study Design, Population(n), Intervention, Comparator, Primary Outcome, Effect Size, p-value, Follow-up, Risk of Bias
  - [ ] **Systematic Review** — Included Studies, Total Participants, Quality Assessment, Main Findings, Heterogeneity, Limitations
  - [ ] **Drug Safety** — Drug/Dose, Population, Adverse Events, Serious AEs, Discontinuation, Contraindications
  - [ ] **Diagnostic** — Test, Reference Standard, Population, Sensitivity, Specificity, PPV, NPV, AUC
- [ ] **Click preset** — creates table and runs batch extraction

### Evidence Table View
- [ ] **Grid display** — papers as rows, extraction fields as columns
- [ ] **Batch extraction** — AI extracts data from each paper
- [ ] **Progress tracking** — shows current/total during extraction
- [ ] **Export options** — CSV and BibTeX export via `/api/research/evidence-table/export`
- [ ] **Back button** — returns to results

---

## 17. Synthesis Report

### Synthesis Dialog
- [ ] **Report type selection**:
  - [ ] Quick Summary
  - [ ] Literature Review
  - [ ] Evidence Summary
  - [ ] Custom (with custom instructions input)
- [ ] **Papers** — uses selected papers from results + library

### Generation (`POST /api/research/synthesize`)
- [ ] **Streaming response** — text streams progressively via TextDecoder
- [ ] **Markdown output** — with `[N]` citation markers
- [ ] **Temperature** — 0.3 for consistent output
- [ ] **Plan mode** — can generate plan before full synthesis
- [ ] **Rate limiting** — enforced

### Synthesis Plan
- [ ] **Sections** — title + description for each planned section
- [ ] **Estimated word count**
- [ ] **Papers per section** — which papers will be cited where

---

## 18. Citation Insertion

- [ ] **Custom event** — `scholarsync:insert-citation` dispatched on window
- [ ] **Payload** — title, authors, year, journal, doi, pmid
- [ ] **Consumed by** — editor/studio citation system listeners
- [ ] **Triggered from** — result card button, paper detail panel button

---

## 19. Paper Chat

### Chat Tab (Research Store sidebar)
- [ ] **Scope selector** — dropdown: "paper" | "selected" | "library"
- [ ] **Messages display** — user right-aligned, assistant left-aligned with Sparkle avatar
- [ ] **Copy button** — on assistant messages
- [ ] **Empty state** — "Ask questions about your papers" with scope context
- [ ] **Form input** — textarea + Send button (PaperPlaneRight icon)
- [ ] **Auto-scroll** — to newest message
- [ ] **Loading state** — `isChatLoading` indicator
- [ ] **Clear chat** — reset button
- [ ] **Papers used** — shows which papers were referenced in response

---

## 20. Verification System

- [ ] **Per-paper verification** — calls `/api/research/verify`
- [ ] **Verification statuses**: verified, partial, unverified, retracted, pending
- [ ] **Checks**: PMID verified, DOI verified, metadata matches (title, year, journal, authors)
- [ ] **Retraction detection** — isRetracted flag, retractionDate, reason, URL
- [ ] **VerificationBadge** — visual display of status
- [ ] **Cache** — results stored in `verificationCache` in store

---

## 21. Session Persistence

- [ ] **Storage key** — `scholar-sync-research-page` in sessionStorage
- [ ] **Persisted fields**: query, results, filters, sort, hasSearched, page, totalResults, hasMore, sourceCounts, augmentedQueries, aiSummary
- [ ] **Restored on mount** — hydrates state from session
- [ ] **Updated on changes** — writes to session after each search/filter change
- [ ] **Scroll position** — restored from `searchScrollPosition`

---

## 22. Pagination & Load More

- [ ] **20 results per page** (`perPage = 20`)
- [ ] **"Load more results..." button** — shown when `hasMore === true`
- [ ] **Appends results** — new results added to existing list
- [ ] **Page counter** — increments with each load
- [ ] **Total results** — displayed in header

---

## 23. Error Handling & Edge Cases

- [ ] **Search API error** — error state displayed
- [ ] **Rate limiting** — enforced, error shown to user
- [ ] **Source timeout** — 8s per source, graceful fallback if one source fails
- [ ] **Session quota exceeded** — sessionStorage write silently ignored
- [ ] **Similar paper errors** — tracked per paper, non-blocking
- [ ] **Synthesis failure** — error thrown, state reset
- [ ] **Empty results** — appropriate empty state message
- [ ] **User plan check** — `getUserUsageStats()` loaded on mount

---

## 24. Quick Test Workflows

### Workflow A: Basic Search
1. [ ] Navigate to `/research`
2. [ ] Verify suggested searches displayed in empty state
3. [ ] Click a suggested search — verify query populates and search runs
4. [ ] Verify results appear with evidence level badges and source badges
5. [ ] Verify source counts (PubMed, Semantic Scholar) displayed
6. [ ] Change sort to "Citations" — verify reorder
7. [ ] Change sort to "Year (Newest)" — verify reorder

### Workflow B: Filtered Search
1. [ ] Type a research question and press Enter
2. [ ] Toggle "Last 5 Years" filter — verify results update
3. [ ] Toggle "RCTs Only" — verify only RCT results shown
4. [ ] Set year range (2020–2024) — verify results filtered
5. [ ] Toggle "Meta-Analyses" — verify filter applied
6. [ ] Navigate away and back — verify filters persist from session

### Workflow C: Paper Detail & Extraction
1. [ ] Click a paper title in results
2. [ ] Verify detail panel slides in with full metadata
3. [ ] Check Summary tab — verify extraction fields displayed
4. [ ] Toggle [src] on a field — verify source quote shown
5. [ ] Check Abstract tab — verify abstract text
6. [ ] Click "Add to Library" — verify button state changes
7. [ ] Click Back — verify return to results list

### Workflow D: Evidence Table
1. [ ] Select 3+ papers using checkboxes
2. [ ] Verify action bar appears: "N papers selected"
3. [ ] Click "Build Evidence Table"
4. [ ] Select "RCT" preset
5. [ ] Verify batch extraction starts with progress indicator
6. [ ] Verify table populates with extracted data
7. [ ] Export as CSV — verify file downloads

### Workflow E: Synthesis Report
1. [ ] Select 3+ papers
2. [ ] Open synthesis dialog
3. [ ] Select "Literature Review" report type
4. [ ] Verify streaming text appears progressively
5. [ ] Verify `[N]` citation markers in output
6. [ ] Verify report completes

### Workflow F: Save & Citation
1. [ ] Click save icon on a result card — verify saved state
2. [ ] Click "Insert Citation" — verify `scholarsync:insert-citation` event dispatched
3. [ ] Verify saved papers appear in library

### Workflow G: Find Similar
1. [ ] Click "Find Similar" on a result
2. [ ] Verify loading indicator for that paper
3. [ ] Verify similar papers appear below the result
4. [ ] Verify error handling if similar search fails

### Workflow H: Paper Chat
1. [ ] Open chat tab
2. [ ] Select scope (paper/selected/library)
3. [ ] Type a question and send
4. [ ] Verify streaming response with paper references
5. [ ] Verify copy button works on assistant messages
6. [ ] Clear chat — verify messages reset

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Research page uses a single-line text `<input>`, not a textarea, for the primary query field
- [ ] Query input initializes as an empty string on first render before any session restore
- [ ] Query input placeholder reads `Search 200M+ papers — try 'CRISPR sickle cell gene therapy'`
- [ ] Pressing `Enter` in the query input calls `handleSearch(0)`
- [ ] Search button is disabled only while `loading` is true
- [ ] Clicking `Search` with an empty query leaves the page unchanged because `handleSearch()` returns early
- [ ] Search button label changes from `Search` to `Searching...` while a request is in flight
- [ ] Search requests are sent to `/api/search/unified`, not `/api/research/search`
- [ ] Query URL always includes `q`, `page`, `perPage`, and `sort` query parameters
- [ ] Search page size is fixed at `20` results per request
- [ ] Starting a new search aborts any previous in-flight request through `AbortController`
- [ ] Client-side search timeout aborts the request after 15 seconds
- [ ] Timed-out searches surface the exact message `Search timed out. Try a more specific query or check your connection.`
- [ ] Non-timeout failures surface either the API `error` string or `Search failed. Please try again.`
- [ ] Starting a fresh search clears the current `error` state
- [ ] Starting a fresh search clears the current `aiSummary` state before synthesis reruns
- [ ] Search success replaces the current `results` array instead of appending to it
- [ ] Successful searches persist a search-history row through `saveSearchQuery(...)` without blocking the UI on failure
- [ ] Search-history save payload includes `originalQuery`, `queryType: "user"`, `source: "all"`, `resultCount`, and `filtersApplied`
- [ ] Session persistence key is exactly `scholar-sync-research-page`
- [ ] Persisted session payload includes `query`, `results`, `filters`, `sort`, `hasSearched`, `page`, `totalResults`, `hasMore`, `sourceCounts`, `augmentedQueries`, and `aiSummary`
- [ ] Session restore repopulates the page from `sessionStorage` on mount when valid cached JSON exists
- [ ] Restoring a cached searched state sets the init-skip ref so filters/sort do not immediately rerun the search once on hydration
- [ ] Session write failures such as storage quota overflow are silently ignored
- [ ] User plan is loaded once on mount through `getUserUsageStats()`
- [ ] If plan lookup fails, the page falls back to `free`
- [ ] Empty-state history load requests `getRecentSearches()` and `getUserPapers()` in parallel
- [ ] Empty-state history load is skipped when restored session state already contains searched results
- [ ] Suggested-search chips are limited to the first 5 items from the 15-item suggestion list
- [ ] Clicking a suggested search stores that query in state and triggers a follow-up search through `pendingSearchRef`
- [ ] Recent Searches section renders only when `recentSearches.length > 0`
- [ ] Recent search rows show the result-count suffix only when `resultCount > 0`
- [ ] Recent search rows rerun the saved query when clicked
- [ ] Recently Saved section renders only when `recentPapers.length > 0`
- [ ] Recently Saved cards are limited to the first 4 papers returned from `getUserPapers()`
- [ ] Recently Saved author text shows at most two authors followed by ` et al.` when more than two authors exist
- [ ] Empty-state loading helper reads `Loading your history...`
- [ ] Empty-state loading helper appears only while history is loading and there are no recent searches yet
- [ ] `Last 5 Years` filter toggles a boolean chip state instead of opening a date picker
- [ ] Turning `Last 5 Years` on clears both manual year inputs
- [ ] Typing either manual year input forces `last5Years` back to `false`
- [ ] Manual year inputs use placeholders `From` and `To`
- [ ] Manual year inputs do not set explicit `min` or `max` attributes in the current implementation
- [ ] `PDF Available` filter translates to `openAccessOnly=true` in the search request
- [ ] `High Impact` filter does not update visible sort state; it overrides the outgoing request sort to `citations`
- [ ] `RCTs Only` adds `rct` to the outgoing `studyTypes` query parameter
- [ ] `Reviews` adds both `review` and `systematic_review` to the outgoing `studyTypes` query parameter
- [ ] `Meta-Analyses` adds `meta_analysis` to the outgoing `studyTypes` query parameter
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
- [ ] `Save & Cite` routes to `/editor/new` after `handleSave(...)` resolves
- [ ] Because `handleSave(...)` swallows save errors, `Save & Cite` still redirects even if the save operation failed
- [ ] `Similar` button is rendered only for results with an `s2Id`
- [ ] `Similar` button switches to `Finding...` with a spinning `CircleNotch` icon while recommendations load
- [ ] Similar-paper requests call `/api/search/s2-recommendations?paperId={s2Id}&limit=5&paperTitle={encodedTitle}`
- [ ] Retrying Similar clears prior error and empty markers for that paper before the next request
- [ ] Once a similar-results list is loaded for a paper, clicking `Similar` again does not refetch because cached results short-circuit the handler
- [ ] Similar-paper error state reads `Couldn't load similar papers.` and shows a `Retry` action
- [ ] Similar-paper empty state reads `No similar papers found for this article.`
- [ ] Similar-paper result cards render title, `journal · year`, optional citation count, and a `Save` button only
- [ ] Evidence-level badge is rendered only when `r.evidenceLevel` exists
- [ ] Evidence-level fallback styling defaults to Level V colors for unrecognized values
- [ ] Open-access badge text reads `Open Access`
- [ ] High-relevance helper text renders on the far right only when `rrfScore >= 1.0`
- [ ] `rrfScore >= 1.5` shows `High relevance`; `rrfScore` between `1.0` and `1.49` shows `Relevant`
- [ ] Pagination uses `Previous` and `Next` buttons, not an infinite scroll or load-more control
- [ ] Previous button is disabled on page 0
- [ ] Next button is disabled when `hasMore` is false
- [ ] Pagination status text reads `Page {current} of {total}`
- [ ] Clicking Previous or Next reruns `handleSearch(...)` with the adjacent page number
- [ ] Floating research-copilot toggle button is fixed at the bottom-right corner of the viewport
- [ ] Floating copilot button is visible even before any search has run
- [ ] Floating copilot button changes from glass styling to solid brand styling when the sidebar is open
- [ ] Copilot sidebar renders only while `showCopilot` is true
- [ ] Copilot sidebar header reads `Research Copilot`
- [ ] Copilot sidebar header includes a pulsing `AI` status indicator
- [ ] Copilot welcome card is shown only when there are no chat messages yet
- [ ] Copilot welcome card copy promises search across PubMed, Semantic Scholar, and OpenAlex
- [ ] Chat request transport uses `/api/research-agent`
- [ ] Copilot input placeholder reads `Ask about papers, topics, methods...`
- [ ] Copilot send button is disabled when the input is blank or while a response is streaming/submitted
- [ ] Successful copilot submit clears the input field immediately after `sendMessage(...)`
- [ ] Copilot message rendering concatenates only `text` parts and ignores non-text message parts
- [ ] Copilot loading helper reads `Searching...`
- [ ] Closing the copilot sidebar hides it without clearing the existing in-memory chat messages for that render cycle
- [ ] AI synthesis panel auto-renders after a successful search with at least one result
- [ ] AI synthesis panel heading reads `Answer from top {paperCount} papers`
- [ ] AI synthesis panel limits its citation/reference map to the first 5 results
- [ ] AI synthesis request posts to `/api/research/synthesize` with `reportType: "quick_summary"` and `mode: "generate"`
- [ ] AI synthesis reruns only when the query/results fingerprint changes
- [ ] Starting a new synthesis resets `synthesis`, `failed`, and `expanded` before streaming begins
- [ ] AI synthesis panel returns `null` when synthesis failed or there is no text and no active stream
- [ ] Initial synthesis state hydrates from `initialSynthesis` restored out of session storage
- [ ] Streaming-without-text state shows four pulsing placeholder lines inside the synthesis card
- [ ] Citation markers like `[1]` are transformed into clickable inline citation buttons
- [ ] Clicking an inline synthesis citation scrolls to `#paper-result-{index}` and adds a temporary ring highlight for 2 seconds
- [ ] Free-plan users get a gradient blur overlay plus `Full AI analysis available on Pro`
- [ ] Free-plan upgrade link points to `/settings`
- [ ] `Read More` / `Show Less` toggle is available only for non-free plans when the synthesis content overflows and streaming has finished
- [ ] Route-level `loading.tsx` renders a title skeleton, one large search-bar skeleton, and three `SkeletonCard` placeholders
- [ ] Route-level error boundary title reads `Research unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the research page. Please try again.`

### Actual Current Behavior Corrections
- [ ] The live `/research` route does not currently render the checkbox-driven results table from `ResultsTable.tsx`
- [ ] The live `/research` route does not currently render per-row selection checkboxes or a `Select all` header checkbox
- [ ] The live `/research` route does not currently render the `Build Evidence Table` action bar from the newer research component stack
- [ ] The live `/research` route does not currently render the `PaperDetailPanel` flow described in the original document
- [ ] The live `/research` route does not currently render the `VerificationBadge`-based result-row layout from `ResultRow.tsx`
- [ ] The live `/research` route does not currently render a separate `Insert Citation` action; it exposes `Save & Cite` instead
- [ ] The live `/research` route does not currently use a `Load more results...` button; it uses paginated Previous/Next controls
- [ ] The live `/research` route does not currently expose the `SearchInput`, `ResearchPlan`, `EvidenceTable`, `SynthesisDialog`, or `Paper Chat` tabs documented for the alternate search stack
- [ ] The live search backend uses 4.5-second per-source timeouts in `/api/search/unified`, not the 8-second timeout claimed in the original doc
- [ ] The live search backend fans out to four sources including OpenAlex and ClinicalTrials.gov, not just PubMed and Semantic Scholar

*Document generated from source code analysis. Last updated: 2026-03-09.*
