# notebook — Spec 010

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Shared Notebook Viewer
#### Messages
- [ ] **Assistant messages** — left-aligned, brand/5 background, sparkle avatar
- [ ] **Citation rendering** — `[N]` markers rendered as read-only styled spans (no click)
- [ ] **Citation badges** — brand/10 background, brand/20 border, brand text
- [ ] **Short title + page label** — same truncation logic as main notebook
#### Empty State
- [ ] "This notebook has no messages yet." centered message
#### Footer
- [ ] **Border-t** separator
- [ ] "Shared from ScholarSync · AI-assisted research analysis" text
#### SEO
- [ ] **Server-side metadata** — title and description generated from conversation
- [ ] **Not found page** — custom 404 for invalid tokens

### Password-Protected Sharing
#### Password Gate
- [ ] **Full-screen dark page** — centered card (max-w-sm)
- [ ] **Lock icon** — brand-colored circle (w-12, h-12)
- [ ] **Title** — "Password Protected"
- [ ] **Subtitle** — "Enter the password to view this notebook."
- [ ] **Password input** — type="password", auto-focused
- [ ] **"View Notebook" button** — brand background, disabled when empty or loading
- [ ] **Loading state** — "Verifying..." button text
- [ ] **Error display** — red-400 text below input
- [ ] "Incorrect password. Please try again."
- [ ] "Something went wrong. Please try again."
- [ ] **Notebook title** — shown at bottom of card
- [ ] **On success** — transitions to SharedNotebookViewer component

### PDF Viewer (Citation Jump-to-Source)
- [ ] **Opens on citation click** — when source is a PDF (no originalUrl)
- [ ] **Dynamically loaded** — `next/dynamic` with `ssr: false`
- [ ] **Props** — URL: `/api/papers/{paperId}/pdf`, initialPage, title
- [ ] **Close handler** — sets `pdfViewerState` to null
- [ ] **Overlay** — renders above chat area
#### Citation Navigation Logic
- [ ] **URL source** — opens external URL in new tab instead of PDF viewer
- [ ] **PDF source** — opens internal PDF viewer at cited page
- [ ] **Page number** — defaults to 1 if not specified in source metadata

### Starter Suggestions (Empty State)
#### Research Mode Suggestions
- [ ] "Summarize Key Themes" — clickable chip
- [ ] "Find Contradictions" — clickable chip
- [ ] "Compare Methodologies" — clickable chip
#### Learn Mode Suggestions
- [ ] "Quiz me on these papers" — clickable chip
- [ ] "What assumptions should I question?" — clickable chip
- [ ] "Help me find gaps in this research" — clickable chip
