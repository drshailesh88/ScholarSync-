# research — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Augmented Queries
- [x] PASS: **Toggle** — "Show augmented queries" / hide toggle
- [x] PASS: Displays AI-expanded query variations from search response
- [x] PASS: Helps users understand how their query was interpreted

### AI Summary
- [x] PASS: **AISynthesisPanel component** — displays AI-generated summary of search results
- [x] PASS: **Loading state** — shown during generation
- [x] PASS: **Generated after search** — summarizes key findings across results
- [x] PASS: **Persisted** — saved in session storage

### Suggested Searches
- [x] PASS: "SGLT2 inhibitors cardiovascular outcomes"
- [x] PASS: "CAR-T cell therapy solid tumors"
- [x] PASS: "GLP-1 agonists weight management"
- [x] PASS: "mRNA vaccine technology advances"
- [x] PASS: "AI-assisted diagnostic imaging accuracy"
- [x] PASS: Clicking a suggestion populates query and triggers search

### Recent Search History
- [x] PASS: **Loaded on mount** — `getRecentSearches()` server action
- [x] PASS: **Saved on each search** — `saveSearchQuery()` server action
- [x] PASS: **ClockCounterClockwise icon** — history indicator
- [x] PASS: **Click to re-run** — clicking a past search populates and executes it

### Paper Saving to Library
- [x] PASS: **Save button** — FloppyDisk/BookmarkSimple icon on each result card
- [x] PASS: **Calls `savePaper()`** — server action to persist to database
- [x] PASS: **Visual state** — saved papers show filled/highlighted bookmark
- [x] PASS: **Tracked in `saved` Set** — prevents duplicate saves
- [x] PASS: **Library loaded on mount** — `getUserPapers()` fetches existing library

### Similar Papers (Find Similar)
- [x] PASS: **Per-paper "Find Similar" action** — triggers search for related papers
- [x] PASS: **Loading state** — tracked per paper ID in `loadingSimilar` Set
- [x] PASS: **Results** — stored in `similarResults` record by paper ID
- [x] PASS: **Error handling** — tracked in `similarErrors` Set
- [x] PASS: **Empty results** — tracked in `similarEmpty` Set
- [x] PASS: **Display** — similar papers shown inline below the originating result

### AI Copilot / Synthesis Panel
- [x] PASS: **Toggle button** — shows/hides copilot panel
- [x] PASS: **AISynthesisPanel component** — renders synthesis interface
- [x] PASS: **Uses `useChat` hook** — from `@ai-sdk/react` with `TextStreamChatTransport`
- [x] PASS: **Streaming responses** — token-by-token display

### Synthesis Report
#### Live Synthesis Behavior (`POST /api/research/synthesize`)
- [x] PASS: **Streaming response** — text streams progressively via TextDecoder
- [x] PASS: **Markdown output** — with `[N]` citation markers
- [x] PASS: **Temperature** — generate mode uses `0.4`; plan mode uses `0.3`
