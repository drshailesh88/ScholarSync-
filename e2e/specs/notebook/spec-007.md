# notebook — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Source Notes Panel
#### Opening
- [x] PASS: Opens as a fixed overlay with backdrop blur
- [x] PASS: Closes other overlays (PDF viewer, share dialog)
- [x] PASS: **Slide-in animation** — translates from right (200ms)
- [x] PASS: **Backdrop** — black/40 with backdrop-blur-sm, click to close
- [x] PASS: **Escape key** — closes panel
- [x] PASS: **Body scroll lock** — prevents background scrolling while open
#### Header
- [x] PASS: **Notebook icon** (brand) + "Source Notes" title
- [x] PASS: **Paper count badge** — "N papers"
- [x] PASS: **Close button** — X icon
#### Generate All Banner
- [x] PASS: **Shown when** — papers exist without generated overviews
- [x] PASS: **Text** — "N of M papers need notes generated"
- [x] PASS: **"Generate All" button** — brand text, disabled during generation
- [x] PASS: **Batch processing** — generates in batches of 3 for controlled concurrency
#### Paper Cards
- [x] PASS: **Expandable** — click header to toggle expand/collapse
- [x] PASS: **Article icon** — brand/10 background, brand icon
- [x] PASS: **Title** — truncated to 2 lines (line-clamp-2)
- [x] PASS: **Authors** — first 3 authors + "et al." if more
- [x] PASS: **Selected indicator** — unselected papers show "Not selected for chat" (italic, muted)
- [x] PASS: **Sorting** — selected papers sorted before unselected papers
#### Paper Card — With Overview
- [x] PASS: **Summary** — AI-generated text summary
- [x] PASS: **Key Topics** — tag pills with Tag icon (brand/10 background, brand text)
- [x] PASS: **Suggested Questions** — clickable questions that send to chat and close panel
- [x] PASS: Arrow icon + question text
- [x] PASS: Hover highlights with brand/5 background
- [x] PASS: **Generation timestamp** — "Generated [date]" in small text
#### Paper Card — Without Overview
- [x] PASS: **Abstract** — shows paper abstract (line-clamp-3) if available
- [x] PASS: **No abstract** — "No summary available yet."
- [x] PASS: **"Generate Notes" button** — brand text, triggers single paper generation
- [x] PASS: **Generating state** — spinning CircleNotch + "Analyzing paper..."
- [x] PASS: **Generation error** — red error text below generate button
#### Loading & Error States
- [x] PASS: **Loading** — centered spinner + "Loading paper notes..."
- [x] PASS: **Error** — centered Warning icon + error message
- [x] PASS: **Empty** — Notebook icon + "No papers loaded yet." + upload hint

### Audio Overview Panel
#### Opening
- [x] PASS: **Headphones button** — in chat header toolbar
- [x] PASS: **Disabled** — when no papers are selected (opacity-30, cursor-not-allowed)
