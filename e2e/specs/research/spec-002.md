# research — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Augmented Queries
- [ ] **Toggle** — "Show augmented queries" / hide toggle
- [ ] Displays AI-expanded query variations from search response
- [ ] Helps users understand how their query was interpreted

### AI Summary
- [ ] **AISynthesisPanel component** — displays AI-generated summary of search results
- [ ] **Loading state** — shown during generation
- [ ] **Generated after search** — summarizes key findings across results
- [ ] **Persisted** — saved in session storage

### Suggested Searches
- [ ] "SGLT2 inhibitors cardiovascular outcomes"
- [ ] "CAR-T cell therapy solid tumors"
- [ ] "GLP-1 agonists weight management"
- [ ] "mRNA vaccine technology advances"
- [ ] "AI-assisted diagnostic imaging accuracy"
- [ ] Clicking a suggestion populates query and triggers search

### Recent Search History
- [ ] **Loaded on mount** — `getRecentSearches()` server action
- [ ] **Saved on each search** — `saveSearchQuery()` server action
- [ ] **ClockCounterClockwise icon** — history indicator
- [ ] **Click to re-run** — clicking a past search populates and executes it

### Paper Saving to Library
- [ ] **Save button** — FloppyDisk/BookmarkSimple icon on each result card
- [ ] **Calls `savePaper()`** — server action to persist to database
- [ ] **Visual state** — saved papers show filled/highlighted bookmark
- [ ] **Tracked in `saved` Set** — prevents duplicate saves
- [ ] **Library loaded on mount** — `getUserPapers()` fetches existing library

### Similar Papers (Find Similar)
- [ ] **Per-paper "Find Similar" action** — triggers search for related papers
- [ ] **Loading state** — tracked per paper ID in `loadingSimilar` Set
- [ ] **Results** — stored in `similarResults` record by paper ID
- [ ] **Error handling** — tracked in `similarErrors` Set
- [ ] **Empty results** — tracked in `similarEmpty` Set
- [ ] **Display** — similar papers shown inline below the originating result

### AI Copilot / Synthesis Panel
- [ ] **Toggle button** — shows/hides copilot panel
- [ ] **AISynthesisPanel component** — renders synthesis interface
- [ ] **Uses `useChat` hook** — from `@ai-sdk/react` with `TextStreamChatTransport`
- [ ] **Streaming responses** — token-by-token display

### Synthesis Report
#### Live Synthesis Behavior (`POST /api/research/synthesize`)
- [ ] **Streaming response** — text streams progressively via TextDecoder
- [ ] **Markdown output** — with `[N]` citation markers
- [ ] **Temperature** — generate mode uses `0.4`; plan mode uses `0.3`
