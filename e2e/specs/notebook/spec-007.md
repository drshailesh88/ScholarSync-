# notebook — Spec 007

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Source Notes Panel
#### Opening
- [ ] Opens as a fixed overlay with backdrop blur
- [ ] Closes other overlays (PDF viewer, share dialog)
- [ ] **Slide-in animation** — translates from right (200ms)
- [ ] **Backdrop** — black/40 with backdrop-blur-sm, click to close
- [ ] **Escape key** — closes panel
- [ ] **Body scroll lock** — prevents background scrolling while open
#### Header
- [ ] **Notebook icon** (brand) + "Source Notes" title
- [ ] **Paper count badge** — "N papers"
- [ ] **Close button** — X icon
#### Generate All Banner
- [ ] **Shown when** — papers exist without generated overviews
- [ ] **Text** — "N of M papers need notes generated"
- [ ] **"Generate All" button** — brand text, disabled during generation
- [ ] **Batch processing** — generates in batches of 3 for controlled concurrency
#### Paper Cards
- [ ] **Expandable** — click header to toggle expand/collapse
- [ ] **Article icon** — brand/10 background, brand icon
- [ ] **Title** — truncated to 2 lines (line-clamp-2)
- [ ] **Authors** — first 3 authors + "et al." if more
- [ ] **Selected indicator** — unselected papers show "Not selected for chat" (italic, muted)
- [ ] **Sorting** — selected papers sorted before unselected papers
#### Paper Card — With Overview
- [ ] **Summary** — AI-generated text summary
- [ ] **Key Topics** — tag pills with Tag icon (brand/10 background, brand text)
- [ ] **Suggested Questions** — clickable questions that send to chat and close panel
- [ ] Arrow icon + question text
- [ ] Hover highlights with brand/5 background
- [ ] **Generation timestamp** — "Generated [date]" in small text
#### Paper Card — Without Overview
- [ ] **Abstract** — shows paper abstract (line-clamp-3) if available
- [ ] **No abstract** — "No summary available yet."
- [ ] **"Generate Notes" button** — brand text, triggers single paper generation
- [ ] **Generating state** — spinning CircleNotch + "Analyzing paper..."
- [ ] **Generation error** — red error text below generate button
#### Loading & Error States
- [ ] **Loading** — centered spinner + "Loading paper notes..."
- [ ] **Error** — centered Warning icon + error message
- [ ] **Empty** — Notebook icon + "No papers loaded yet." + upload hint

### Audio Overview Panel
#### Opening
- [ ] **Headphones button** — in chat header toolbar
- [ ] **Disabled** — when no papers are selected (opacity-30, cursor-not-allowed)
