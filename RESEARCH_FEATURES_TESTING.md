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

## Re-Audit Discoveries (Codex Pass 2)

### Unified Search API Internals
- [ ] `/api/search/unified` rejects unauthenticated requests with `Authentication required`
- [ ] `/api/search/unified` applies `checkRateLimit(userId, "search", RATE_LIMITS.search)` before parsing query params
- [ ] `/api/search/unified` returns HTTP 400 with `Query parameter 'q' is required` when `q` is missing
- [ ] `/api/search/unified` returns HTTP 400 with `Query parameter 'q' must not exceed 500 characters` when `q.length > 500`
- [ ] `/api/search/unified` defaults `page` to `0` when the query param is absent
- [ ] `/api/search/unified` defaults `perPage` to `20` when the query param is absent
- [ ] `/api/search/unified` caps `perPage` at `100` even if a larger value is requested
- [ ] `/api/search/unified` defaults `sort` to `relevance` when the query param is absent
- [ ] `/api/search/unified` treats query augmentation as enabled unless the request explicitly sends `augment=false`
- [ ] `/api/search/unified` only attempts AI query augmentation when `augment !== "false"` and the raw query length is greater than `20`
- [ ] Query-augmentation failures fall back silently to the raw user query without surfacing an error in the response
- [ ] `augmentQuery()` aborts its AI call after exactly `5000ms`
- [ ] `augmentQuery()` asks for three source-specific query strings plus optional `yearStart`, `yearEnd`, and `publicationTypes` suggestions
- [ ] Unified-search source fan-out computes `neededPerSource` as `Math.min((page + 1) * perPage, 100)`
- [ ] Unified-search PubMed fan-out always requests `page: 0` and uses `maxResults: neededPerSource`
- [ ] Unified-search Semantic Scholar fan-out always requests `offset: 0` and uses `limit: neededPerSource`
- [ ] Unified-search OpenAlex fan-out always requests `page: 1` and uses `limit: neededPerSource`
- [ ] Unified-search ClinicalTrials fan-out requests only `limit: perPage`, not `neededPerSource`
- [ ] Each source fan-out call is wrapped in `withTimeout(..., 4500)` with per-source timeout strings like `PubMed timed out after 4500ms`
- [ ] Unified search uses `Promise.allSettled(...)` so one degraded source does not abort the whole response
- [ ] Unified search logs per-source degradation warnings instead of surfacing source-specific failures to the page
- [ ] When all four source result sets are empty in development mode, unified search attempts fixture-based fallback results from `src/lib/search/__tests__/ralph-search/cache`
- [ ] Development fallback is completely disabled when `NODE_ENV !== "development"`
- [ ] Development fallback ignores fixtures whose normalized query-match score is below `0.55`
- [ ] Reciprocal-rank fusion uses `k = 60` when combining source lists
- [ ] Duplicate papers merged during reciprocal-rank fusion accumulate `rrfScore` contributions from every matched source
- [ ] Reciprocal-rank fusion appends the new source name into `sources[]` only if that source is not already listed on the merged paper
- [ ] Cohere reranking is skipped entirely when `COHERE_API_KEY` is missing
- [ ] Cohere reranking is skipped entirely when the fused results array is empty
- [ ] Cohere reranking posts to `https://api.cohere.com/v2/rerank` with model `rerank-v3.5`
- [ ] Cohere reranking truncates `top_n` to `Math.min(results.length, 50)` when no explicit `topN` is passed
- [ ] Cohere reranking falls back to the original fused order when the Cohere request throws
- [ ] Unified search infers a missing `evidenceLevel` only when a result already has `studyType` but no evidence grade
- [ ] Unified search enriches each result with `journalQuartile` and `journalImpactProxy` only when `lookupJournalQuality(journal)` returns a match
- [ ] Study-type filtering is applied after rank fusion and reranking, not at the per-source adapter level
- [ ] Open-access filtering is applied after rank fusion and reranking by checking `r.isOpenAccess`
- [ ] Sort mode `citations` orders results by `(citationCount || 0)` descending
- [ ] Sort mode `year` orders results by `(year || 0)` descending
- [ ] Sort mode `evidence` orders results by evidence map `I=1`, `II=2`, `III=3`, `IV=4`, `V=5`
- [ ] Results with missing or unrecognized evidence level are treated as Level V during backend evidence sorting
- [ ] Unified search still contains a backend-only `impact` sort branch even though the current `/research` page never sends `sort=impact`
- [ ] Unified-search pagination slices the filtered array with `start = page * perPage` and `end = start + perPage`
- [ ] Unified-search `hasMore` becomes `true` only when `start + perPage < total`
- [ ] Unhandled unified-search failures return HTTP 500 with `{ "error": "Search failed" }`

### Source Adapter Normalization
- [ ] PubMed result parsing drops any `<PubmedArticle>` chunk whose `<ArticleTitle>` is missing or empty
- [ ] PubMed structured abstracts concatenate every `<AbstractText>` segment into one string separated by spaces
- [ ] Labeled PubMed abstract segments are prefixed as `Label: text` during parsing
- [ ] PubMed author names are normalized to `LastName ForeName`
- [ ] PubMed journal name prefers `<ISOAbbreviation>` and falls back to `<Title>`
- [ ] PubMed year parsing prefers `<Year>` inside `<PubDate>` and falls back to `<MedlineDate>`
- [ ] PubMed year parsing falls back to numeric `0` when no four-digit year can be extracted
- [ ] PubMed DOI is read from `<ArticleId IdType="doi">`
- [ ] PubMed publication types are collected from every `<PublicationType>` tag into `publicationTypes[]`
- [ ] PubMed MeSH terms are collected from every `<DescriptorName>` tag into `meshTerms[]`
- [ ] PubMed study type uses the first mapped publication type that is not `"other"`
- [ ] PubMed results always set `citationCount` to `0`
- [ ] PubMed results always set `isOpenAccess` to `false`
- [ ] PubMed source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] PubMed resilient fetch calls use timeout `15000` and `baseDelay: 400`
- [ ] Semantic Scholar sanitization strips PubMed field tags such as `[MeSH]`, `[tiab]`, `[pt]`, `[au]`, `[ta]`, `[dp]`, and `[mesh]` before querying S2
- [ ] Semantic Scholar sanitization removes parentheses, double quotes, and boolean operators `AND`, `OR`, and `NOT`
- [ ] Semantic Scholar year filtering serializes as `YYYY-YYYY`, `YYYY-`, or `-YYYY` depending on which bounds are present
- [ ] Semantic Scholar results expose `openAccessPdfUrl` separately from `isOpenAccess`
- [ ] Semantic Scholar results default `fieldsOfStudy` to an empty array when the API omits them
- [ ] Semantic Scholar result mapping treats `JournalArticle` / `Journal Article` publication types as study type `"other"`
- [ ] Semantic Scholar source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] Semantic Scholar resilient fetch calls use timeout `15000` and `baseDelay: 1000`
- [ ] OpenAlex strips the `https://doi.org/` prefix before storing DOI values on unified results
- [ ] OpenAlex reconstructs abstract text from `abstract_inverted_index` by sorting word-position pairs numerically
- [ ] OpenAlex concept chips are limited to concepts whose score is greater than `0.3`
- [ ] OpenAlex year filtering serializes into the `filter=` query param as `publication_year:start-end`, `publication_year:start-`, or `publication_year:-end`
- [ ] OpenAlex adds `is_oa:true` to its `filter=` query param only when `onlyOpenAccess` is true
- [ ] OpenAlex source adapter returns `{ results: [], total: 0 }` immediately when its circuit breaker is open
- [ ] ClinicalTrials keyword extraction strips punctuation characters including `? . , ! ; : ' " ( ) [ ] { }`
- [ ] ClinicalTrials keyword extraction drops single-character tokens and a built-in stop-word list before joining the remaining search terms
- [ ] ClinicalTrials falls back to the raw query string when keyword extraction produces an empty term string
- [ ] ClinicalTrials requests always include `sort=@relevance`, `format=json`, and `countTotal=true`
- [ ] ClinicalTrials status filtering only maps `recruiting` to `RECRUITING` and `completed` to `COMPLETED`
- [ ] ClinicalTrials results always set `journal` to the sponsor organization name or `"ClinicalTrials.gov"` when no organization is present
- [ ] ClinicalTrials results always set `publicationTypes` to `["clinical_trial_registration"]`
- [ ] ClinicalTrials results always set `isOpenAccess` to `true`
- [ ] ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist
- [ ] Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`
- [ ] Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit

### Copilot Panel And Research-Agent Internals
- [ ] Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`
- [ ] Copilot submit does not support multi-line drafting because the input is a single-line `<input type="text">`
- [ ] Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed
- [ ] Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true
- [ ] `chatLoading` is true for both `chatStatus === "submitted"` and `chatStatus === "streaming"`
- [ ] The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`
- [ ] The `/research` page does not persist copilot messages in `sessionStorage`
- [ ] The `/research` page does not persist `showCopilot` open/closed state across refresh
- [ ] The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context
- [ ] Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty
- [ ] The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages
- [ ] Research-agent requests are validated against a schema that allows between `1` and `50` messages
- [ ] Research-agent request schema caps each message `content` string at `50000` characters
- [ ] Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field
- [ ] When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`
- [ ] Research-agent streaming stops automatically when `stepCountIs(12)` is reached
- [ ] Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`
- [ ] Unhandled research-agent failures return HTTP 500 with `Research agent failed`
- [ ] `searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more
- [ ] `searchPubMed` tool trims each returned author list to the first 3 authors
- [ ] `searchPubMed` tool trims each returned abstract to the first 300 characters
- [ ] `searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result
- [ ] `searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result
- [ ] `getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third
- [ ] `getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper
- [ ] `getPaperDetails` returns `{ error: "Provide at least one identifier" }` when called with no DOI, PMID, or S2 ID
- [ ] `findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper
- [ ] `savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success

### AI Synthesis Panel Internals
- [ ] AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`
- [ ] AI synthesis does not rerun when only non-title metadata changes on the same top 5 papers because the fingerprint only tracks query text and titles
- [ ] AI synthesis request body includes only `title`, `authors`, `year`, `journal`, `abstract`, `pmid`, `doi`, and `studyType` for the top 5 papers
- [ ] AI synthesis sends an empty string for `abstract` when a result has no abstract
- [ ] AI synthesis aborts any previous streaming request before starting a new one
- [ ] AI synthesis marks the panel as failed and hides it when `/api/research/synthesize` returns a non-OK response or no response body
- [ ] AI synthesis treats `AbortError` as a silent cancellation and does not mark the panel as failed
- [ ] AI synthesis `useEffect` cleanup aborts the in-flight synthesis request on unmount or dependency change
- [ ] Citation parsing uses the exact regex `/\\[(\\d+)\\]/g`
- [ ] Citation markers that do not map to one of the top 5 results remain literal bracket text in the rendered synthesis body
- [ ] Citation labels are built from the last token of the first author string plus optional ` et al.` and the year
- [ ] A paper with no authors in the top 5 citation map renders the fallback label prefix `Unknown`
- [ ] Inline synthesis citation buttons set a `title` attribute of `Scroll to: {paper title}`
- [ ] Clicking a synthesis citation applies `ring-2 ring-brand/50` to the target result card and removes those classes after exactly `2000ms`
- [ ] Overflow detection uses `contentRef.current.scrollHeight > 96` after render and falls back to `synthesis.length > 400` before the ref is measured
- [ ] Read-more clamping uses `max-h-24 overflow-hidden`
- [ ] Free-plan overlay is not shown while the synthesis is still streaming and `synthesis` is empty
- [ ] Free-plan users never receive the `Read More` / `Show Less` toggle even when the synthesis overflows
- [ ] The current AI synthesis panel has no retry button, error copy, or recovery CTA after a failed synthesis request
- [ ] `/api/research/synthesize` requires authentication through `getCurrentUserId()`
- [ ] `/api/research/synthesize` rate-limits with key `"research"` and `RATE_LIMITS.ai`
- [ ] `/api/research/synthesize` returns HTTP 400 with `Missing required field: papers` when `papers` is absent or not an array
- [ ] `/api/research/synthesize` returns HTTP 503 with `AI not configured` when no model is available
- [ ] `mode === "plan"` uses `getSmallModel()` with temperature `0.3`
- [ ] `mode !== "plan"` uses `getModel()` with temperature `0.4`
- [ ] Plan-mode fenced JSON is stripped with `/```(?:json)?\\s*([\\s\\S]*?)```/` before parsing
- [ ] Invalid plan-mode JSON falls back to `{ sections: [], estimatedWordCount: 0 }`
- [ ] `buildSynthesisPrompt()` uses default word targets of `250` for `quick_summary`, `800` for `literature_review`, and `500` for `evidence_summary`
- [ ] `buildSynthesisPrompt()` uses the fallback instruction `Generate a literature synthesis.` when `reportType === "custom"` and `customInstructions` is missing
- [ ] `buildPaperContext()` truncates author display to the first 3 authors plus optional ` et al.`
- [ ] `buildPaperContext()` substitutes `Unknown`, `N/A`, and `No abstract available` fallback strings when paper fields are missing

### Save, Cite, History, And Result Edge Cases
- [ ] `saveSearchQuery()` stores `queryType` as `"user"` by default when the caller does not provide one
- [ ] `saveSearchQuery()` stores `source` as `"all"` by default when the caller does not provide one
- [ ] `saveSearchQuery()` stores `augmentedQueries`, `filtersApplied`, and `parentQueryId` as `null` when the caller omits them
- [ ] `getRecentSearches()` first selects up to 20 history rows, then de-duplicates on lowercase `original_query`, then returns only the 5 most recent unique queries
- [ ] `getRecentSearches()` returns rows shaped as `{ query, resultCount, searchedAt }`
- [ ] `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present
- [ ] `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`
- [ ] `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year
- [ ] `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values
- [ ] New-paper inserts default `authors` to `[]` when the caller omits them
- [ ] New-paper inserts copy `open_access_url` into `pdf_url`
- [ ] `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`
- [ ] User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library
- [ ] `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path
- [ ] `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR
- [ ] `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`
- [ ] `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`
- [ ] `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action
- [ ] `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`
- [ ] When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload
- [ ] Result author rows still render an empty `<p>` when `authors[]` is empty
- [ ] Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`
- [ ] Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability
- [ ] Result cards omit the abstract block completely when `abstract` is falsy
- [ ] Result cards omit the TL;DR block completely when `tldr` is falsy
- [ ] Result cards omit the DOI metadata link completely when `doi` is falsy
- [ ] Result cards omit the Similar button completely when `s2Id` is falsy
- [ ] Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving
- [ ] Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper

### Behavior Corrections (Pass 2)
- [ ] The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper
- [ ] The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true
- [ ] The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`
- [ ] The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs
- [ ] The live copilot sidebar does not auto-scroll to the newest message in the current implementation
- [ ] The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page
- [ ] The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear
- [ ] The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`

### Components Referenced But Not Rendered
- [ ] `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/PaperDetailPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/EvidenceTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/SynthesisDialog.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResearchSidebar.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ChatTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/LibraryTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/SearchTab.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResearchPlan.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/FilterPanel.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/AISummaryCard.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/VerificationBadge.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ScopeSelector.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/citation-network.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`

## Re-Audit Discoveries (Claude Code Pass 3)

### Session & State Behavior

- [ ] `readSession()` returns `null` when stored JSON is corrupt or cannot be parsed — the `catch` block silently swallows `JSON.parse` errors
- [ ] `writeSession()` catch block comment documents the failure reason as `quota exceeded — ignore`
- [ ] Session persistence does NOT include `similarResults`, `similarErrors`, `similarEmpty`, `loadingSimilar`, `showCopilot`, `showSortDropdown`, `showAugmented`, `chatInput`, or `chatMessages` — these all reset on page refresh
- [ ] The `saved` Set (tracking which papers the user has saved this session) is not persisted in sessionStorage and resets on refresh
- [ ] `showAugmented` (augmented-queries disclosure state) is not persisted in session; the disclosure collapses on refresh even if previously expanded
- [ ] `userPlan` initializes as `null` before `getUserUsageStats()` resolves, meaning `isFree` in AISynthesisPanel evaluates to `false` during the initial render window
- [ ] `similarResults` is stored as a `Record<string, UnifiedSearchResult[]>` keyed by `r.s2Id || r.doi || r.title`, not by a numeric index

### Empty-State UI Details

- [ ] Empty-state data load useEffect has a `cancelled` boolean race-condition guard; the cleanup function sets `cancelled = true` to prevent state updates after unmount
- [ ] Empty-state `getRecentSearches()` failure silently returns empty array `[]` via `.catch(() => [])`
- [ ] Empty-state `getUserPapers()` failure silently returns empty array `[]` via `.catch(() => [])`
- [ ] When the `authors` field on a recently saved paper is not an array, the author mapping falls back to empty string `""`
- [ ] `emptyStateLoaded` is set to `true` inside a `finally` block, ensuring it updates even when the data-load promise rejects
- [ ] Empty-state "Recent Searches" heading text reads exactly `Recent Searches` with `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
- [ ] Empty-state "Recently Saved" heading text reads exactly `Recently Saved`
- [ ] Empty-state "Try searching for" heading text reads exactly `Try searching for`
- [ ] Empty-state "Recent Searches" heading is prefixed with a `ClockCounterClockwise` icon (size 14)
- [ ] Empty-state "Recently Saved" heading is prefixed with a `BookmarkSimple` icon (size 14)
- [ ] Empty-state "Try searching for" heading is prefixed with a `Lightbulb` icon (size 14)
- [ ] Recently saved papers are rendered in a 2-column grid layout (`grid grid-cols-2 gap-3`)
- [ ] Recently saved paper titles are clamped to 2 lines via `line-clamp-2`
- [ ] Recently saved journal and year are joined with `" · "` separator, with falsy values filtered out via `filter(Boolean)` before joining
- [ ] Recent search rows show a `MagnifyingGlass` icon (size 14) on the left of each query text
- [ ] Recent search result-count suffix is formatted with `toLocaleString()` so numbers include thousands separators

### Search Mechanics

- [ ] `Last 5 Years` filter dynamically computes yearStart as `new Date().getFullYear() - 5` — it is not hardcoded to a specific year
- [ ] Filter/sort auto-re-search useEffect dependency array is exactly `[filters, sort]` — changes to `query` alone do NOT trigger auto-re-search
- [ ] When the API returns a non-OK status and no JSON error body can be parsed, the error message fallback is `Search failed (status ${statusCode})` — not `Search failed. Please try again.`
- [ ] The fallback `Search failed. Please try again.` only appears for non-`Error` exception types in the catch block (when `err instanceof Error` is false)
- [ ] `highImpact` filter overrides `sort` in the URL by calling `params.set("sort", "citations")` after the original sort is already set — this means the API receives `sort=citations` even if the user selected a different sort option
- [ ] `buildSearchUrl` includes `perPage` as `perPage.toString()` (always `"20"`) in every search request URL
- [ ] `handleSearch` clears `aiSummary` to `null` before each new search, forcing the AISynthesisPanel to re-synthesize even if the same query is rerun
- [ ] The search-history `saveSearchQuery` call uses `.catch(() => {})` so history-save failures are completely silent and non-blocking

### Result Card Rendering

- [ ] DOI link in the metadata row calls `e.stopPropagation()` on click to prevent triggering any parent click handlers
- [ ] Result card wrapper includes `id="paper-result-{idx}"` as a DOM id for scroll-to targeting from synthesis citations
- [ ] Result card wrapper has `transition-[box-shadow] duration-500` enabling smooth 500ms ring highlight transitions when synthesis citations target it
- [ ] Result card React `key` attribute is `${identityKey}-${idx}` — the array index is appended for uniqueness in case duplicate identity keys exist
- [ ] When `citationCount` is exactly `0`, the " · N citations" suffix is omitted because the render branch checks truthiness (`r.citationCount ? ...`)
- [ ] Saving state button uses `cursor-wait` class to show the wait cursor while a save is in progress
- [ ] Similar-paper `key` is derived as `r.s2Id || r.doi || r.title`, which differs from the save `key` that uses `r.doi || r.pmid || r.s2Id || r.title` — the ID lookup order is different for save vs similar
- [ ] Similar-paper section header reads `Similar Papers` in `text-[10px] text-ink-muted uppercase tracking-wider font-medium`
- [ ] Result author row renders `r.authors.slice(0, 3).join(", ")` — if the original `authors` array is empty, an empty `<p>` element still renders

### Copilot Sidebar

- [ ] Copilot sidebar is rendered as an `<aside>` HTML element, not a `<div>`
- [ ] Copilot sidebar width is exactly `w-96` (384px / 24rem)
- [ ] Copilot sidebar close button uses the `X` icon from Phosphor Icons (size 16)
- [ ] Copilot send button uses the `PaperPlaneTilt` icon from Phosphor Icons (size 16)
- [ ] User chat messages are styled with `bg-brand/10 text-ink ml-8` (indented from left)
- [ ] Assistant chat messages are styled with `bg-surface-raised text-ink mr-4` (indented from right)
- [ ] Chat message text renders with `whitespace-pre-wrap` preserving line breaks and whitespace in AI responses
- [ ] Copilot welcome card shows a `Sparkle` icon (size 14) with uppercase `Research Assistant` label text
- [ ] Copilot welcome message body reads exactly `Ask me to find papers on any topic. I'll search across PubMed, Semantic Scholar, and OpenAlex using systematic search strategies.`
- [ ] Copilot AI status indicator shows a pulsing emerald dot (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`) with `AI` text in `text-emerald-500`
- [ ] Copilot header uses `Brain` icon (size 18) in `text-brand` color

### AISynthesisPanel Internals

- [ ] Synthesis streaming uses `ReadableStream.getReader()` with `TextDecoder` `stream: true` option for progressive multi-chunk decoding
- [ ] "Generating..." indicator text appears next to the header during streaming, shown as a pulsing brand dot + `text-[10px] text-brand/70` label
- [ ] Citation `et al.` suffix is added when a paper has more than 1 author (`p.authors.length > 1`), not the 2-author or 3-author threshold used elsewhere in the codebase
- [ ] AISynthesisPanel `paperCount` is computed as `Math.min(results.length, 5)` — if fewer than 5 results exist, the header reads `Answer from top {actual count} papers`
- [ ] Free-plan blur overlay gradient direction is `bg-gradient-to-t from-surface via-surface/90 to-transparent` (bottom-to-top fade)
- [ ] Free-plan upgrade link text reads `Upgrade to Pro` with `text-brand hover:text-brand-hover` styling
- [ ] AISynthesisPanel outer container uses a gradient background: `bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.02]` with `backdrop-blur-sm`
- [ ] `onSynthesisChange` callback is called progressively during streaming with each accumulated text chunk, not just once at the end
- [ ] Skeleton placeholder during initial streaming shows exactly 4 lines with widths `w-full`, `w-[92%]`, `w-[85%]`, `w-[60%]`

### S2 Recommendations API (`/api/search/s2-recommendations`)

- [ ] GET handler requires authentication, returns 401 `{ error: "Authentication required" }` when unauthenticated
- [ ] GET handler applies rate limit with key `"search"` and `RATE_LIMITS.search` (120 req/hour)
- [ ] GET handler returns 400 `{ error: "Query parameter 'paperId' is required" }` when `paperId` query param is missing
- [ ] GET handler accepts optional `paperTitle` query parameter used as fallback for title-based search
- [ ] GET handler defaults `limit` to `10` and caps it at `100` via `Math.min(parseInt(...), 100)`
- [ ] GET handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors
- [ ] POST handler exists on the same endpoint for list-based recommendations using positive/negative paper IDs
- [ ] POST handler requires a non-empty `positivePaperIds` array, returns 400 `{ error: "positivePaperIds is required" }` when empty or missing
- [ ] POST handler accepts optional `negativePaperIds` array (defaults to `[]`) and optional `limit` (defaults to `10`, caps at `100`)
- [ ] POST handler returns 500 `{ error: "S2 recommendations failed" }` on unhandled errors

### Research Agent API (`/api/research-agent`)

- [ ] Research-agent rate limit uses key `"research-agent"` with `RATE_LIMITS.ai` (60 req/hour), not `RATE_LIMITS.search`
- [ ] Research-agent uses `getModel()` (main model) for streaming, not `getSmallModel()`
- [ ] Research-agent response is streamed via `result.toTextStreamResponse()`
- [ ] System prompt defines the agent role as `a medical research librarian AI` that conducts `systematic literature searches`
- [ ] System prompt specifies a 4-phase search strategy: BROAD SWEEP (3-4 tool calls), ASSESS COVERAGE, TARGETED SEARCH (2-3 tool calls), SYNTHESIZE
- [ ] System prompt instructs "Try at least 2 different query formulations per source"
- [ ] System prompt instructs to "ALWAYS include the openAccessUrl if one is available" when saving papers to the library
- [ ] System prompt stopping criterion: "new searches return mostly papers already found, OR all key aspects covered"
- [ ] System prompt instructs to "Always cite paper titles and key findings when discussing results"
- [ ] When `context.savedPaperIds` is provided and non-empty, the system prompt appends only a count (`The user has {N} papers saved in their library.`), not the actual paper IDs or titles

### Synthesize API (`/api/research/synthesize`)

- [ ] Unhandled synthesis errors return 500 `{ error: "Synthesis failed" }` — error is logged via `console.error`, not the structured `logger`
- [ ] Synthesize request body also accepts optional `customInstructions` (string) and `targetWordCount` (number) fields beyond `papers`, `reportType`, and `mode`
- [ ] Synthesize streaming response for generate mode is returned via `result.toTextStreamResponse()`

### Rate Limiting Module

- [ ] Rate limit error response body is exactly `{ error: "Rate limit exceeded. Please try again later." }` with HTTP 429 status
- [ ] Rate limit response includes `X-RateLimit-Remaining` header with the remaining request count as a string
- [ ] Rate limit key format is `${userId}:${endpoint}` — e.g., `user_123:search`
- [ ] `RATE_LIMITS.search` allows 120 requests per 3600 seconds (120/hour)
- [ ] `RATE_LIMITS.ai` allows 60 requests per 3600 seconds (60/hour)
- [ ] In-memory rate limiter (development/Upstash-unavailable fallback) uses a fixed sliding window with a `Map<string, { count, resetAt }>` store
- [ ] In-memory rate limiter cleans up expired entries every 60 seconds via a `setInterval` loop
- [ ] Production rate limiter uses Upstash Redis with `@upstash/ratelimit` sliding window and prefix `"scholarsync"`
- [ ] Rate limiter falls through to in-memory when Upstash Redis env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are missing or when the Upstash request throws

### Evidence Level Mapping

- [ ] `getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I
- [ ] `getEvidenceLevel()` maps `rct` to Level II
- [ ] `getEvidenceLevel()` maps `cohort` and `observational` to Level III
- [ ] `getEvidenceLevel()` maps `case_control` and `case_report` to Level IV
- [ ] `getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V
- [ ] `mapPubMedPublicationType()` maps "clinical trial" publications to `rct` study type
- [ ] `mapPubMedPublicationType()` maps a bare "review" (that doesn't match "systematic review") to `review` study type, which then maps to Level V
- [ ] `mapS2PublicationType()` maps `editorial` and `letter` to `other` study type

### Dedup & Rank Fusion Internals

- [ ] `isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match
- [ ] `normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters
- [ ] `mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields
- [ ] `mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins
- [ ] `mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication
- [ ] `mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary
- [ ] RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list
- [ ] RRF output is sorted by accumulated `rrfScore` descending before pagination

### Cohere Reranking Internals

- [ ] Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || ""}` for each result
- [ ] Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`
- [ ] Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned
- [ ] Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field

### Save Paper Data Flow

- [ ] `handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source
- [ ] `handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields
- [ ] `handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citation_count`
- [ ] `handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`

### Type Definitions & Response Shapes

- [ ] `UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results
- [ ] `UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results
- [ ] `UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active
- [ ] `UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields
- [ ] `SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query
- [ ] `EvidenceLevel` type is defined as the exact union `"I" | "II" | "III" | "IV" | "V"`
- [ ] `UnifiedSearchResult.journalQuartile` type is `"Q1" | "Q2" | "Q3" | "Q4" | null`
- [ ] `SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI

### Page Layout & CSS Behavior

- [ ] Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint
- [ ] Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container
- [ ] Active filter chip styling: `bg-brand/10 text-brand border-brand/30`
- [ ] Inactive filter chip styling: `bg-surface-raised text-ink-muted border-border hover:text-ink`
- [ ] Sort dropdown overlay uses `z-20` z-index
- [ ] Copilot floating toggle button uses `z-40` z-index
- [ ] Pagination total-pages display clamps minimum to 1 via `Math.max(totalPages, 1)`, ensuring "Page 1 of 1" is shown even when there are 0 results in the filtered set
- [ ] Sort dropdown menu has `min-w-[140px]` minimum width

### Accessibility Gaps (Missing Attributes)

- [ ] Search input has no `aria-label` or accessible name attribute
- [ ] Filter chip buttons have no `aria-pressed` attribute to indicate toggle state to assistive technology
- [ ] Sort dropdown trigger has no `aria-expanded` or `aria-haspopup` attribute
- [ ] Sort dropdown menu has no `role="listbox"` or `role="menu"` attribute
- [ ] Sort dropdown items have no `role="option"` or `role="menuitem"` attributes
- [ ] Copilot close button has no `aria-label` attribute
- [ ] Copilot chat input has no `aria-label` attribute
- [ ] Copilot send button has no `aria-label` attribute
- [ ] No `aria-live` region exists for search result count updates or loading/error state transitions
- [ ] Pagination Previous/Next buttons have no `aria-label` attributes (e.g., "Go to previous page")
- [ ] Evidence level badges have no `title` or `aria-label` explaining the evidence level meaning

### Route-Level Loading & Error Verified

- [ ] Route-level `loading.tsx` renders `ResearchLoading` — one `Skeleton` title bar (`h-8 w-48`), one `Skeleton` search bar (`h-12 w-full rounded-xl`), and exactly 3 `SkeletonCard` placeholders
- [ ] Route-level `error.tsx` renders `ErrorDisplay` component with `onRetry={reset}` prop, providing a retry button

### Behavior Corrections (Pass 3)

- [ ] Section 21 line 397 claims "Scroll position — restored from `searchScrollPosition`" — **WRONG**. No scroll position state or restoration logic exists in page.tsx. The `searchScrollPosition` identifier does not appear anywhere in the research page; it exists only in the unused `research-store.ts` and `ResultsTable.tsx` which are not imported by this page.
- [ ] Section 2 lines 71-73 claim "Parsed filter chips — appear below input when natural language filters detected" with sub-items for X buttons and chip types — **WRONG**. No NLP-parsed filter chips exist in the current implementation. Only 6 static toggle chips (Last 5 Years, PDF Available, High Impact, RCTs Only, Reviews, Meta-Analyses) are rendered.
- [ ] Section 5 line 135 claims "Skeleton loader — 5 placeholder cards during search" — **WRONG**. The in-page loading state renders exactly 4 skeleton cards (`Array.from({ length: 4 })`). The route-level `loading.tsx` renders 3 `SkeletonCard`s — neither uses 5.
- [ ] Section 7 line 165 claims authors are truncated with "et al." if >5 — **WRONG**. Result card authors use `r.authors.slice(0, 3)` and show " et al." when `r.authors.length > 3` (threshold is 3, not 5).
- [ ] Section 7 line 169 claims a "Study type badge" is rendered on each result card — **WRONG**. No study type badge is rendered by the current page. The `studyType` field exists on results but is not displayed.
- [ ] Section 7 line 171 claims a "Source badge" (`pubmed`, `semantic_scholar`, or `both`) is rendered — **WRONG**. No source badge is rendered by the current page.
- [ ] Section 7 line 173 claims a "PMID badge" is rendered — **WRONG**. PMID is not displayed anywhere on result cards. It is used internally for title link construction and save payload only.
- [ ] Section 7 line 174 claims a "DOI badge" is rendered — **WRONG**. DOI is rendered as a text link ("DOI") in the metadata row, not as a badge component.
- [ ] Section 17 line 345 claims "Temperature — 0.3 for consistent output" for synthesis generation — **MISLEADING**. Plan mode uses temperature 0.3, but the primary streaming synthesis (generate mode) uses temperature 0.4 (correctly documented at lines 788-789 from Pass 2).
- [ ] Section 20 (Verification System) claims "Per-paper verification — calls `/api/research/verify`" — **WRONG for this page**. The `/research` page never calls `/api/research/verify`. The verification endpoint and VerificationBadge exist in the codebase but are not imported or invoked by `page.tsx`.

*Document generated from source code analysis. Last updated: 2026-03-10.*
