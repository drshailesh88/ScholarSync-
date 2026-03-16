# notebook — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Shared Notebook Viewer
#### Messages
- [x] PASS: **Assistant messages** — left-aligned, brand/5 background, sparkle avatar
- [x] PASS: **Citation rendering** — `[N]` markers rendered as read-only styled spans (no click)
- [x] PASS: **Citation badges** — brand/10 background, brand/20 border, brand text
- [x] PASS: **Short title + page label** — same truncation logic as main notebook
#### Empty State
- [x] PASS: "This notebook has no messages yet." centered message
#### Footer
- [x] PASS: **Border-t** separator
- [x] PASS: "Shared from ScholarSync · AI-assisted research analysis" text
#### SEO
- [x] PASS: **Server-side metadata** — title and description generated from conversation
- [x] PASS: **Not found page** — custom 404 for invalid tokens

### Password-Protected Sharing
#### Password Gate
- [x] PASS: **Full-screen dark page** — centered card (max-w-sm)
- [x] PASS: **Lock icon** — brand-colored circle (w-12, h-12)
- [x] PASS: **Title** — "Password Protected"
- [x] PASS: **Subtitle** — "Enter the password to view this notebook."
- [x] PASS: **Password input** — type="password", auto-focused
- [x] PASS: **"View Notebook" button** — brand background, disabled when empty or loading
- [x] PASS: **Loading state** — "Verifying..." button text
- [x] PASS: **Error display** — red-400 text below input
- [x] PASS: "Incorrect password. Please try again."
- [x] PASS: "Something went wrong. Please try again."
- [x] PASS: **Notebook title** — shown at bottom of card
- [x] PASS: **On success** — transitions to SharedNotebookViewer component

### PDF Viewer (Citation Jump-to-Source)
- [x] PASS: **Opens on citation click** — when source is a PDF (no originalUrl)
- [x] PASS: **Dynamically loaded** — `next/dynamic` with `ssr: false`
- [x] PASS: **Props** — URL: `/api/papers/{paperId}/pdf`, initialPage, title
- [x] PASS: **Close handler** — sets `pdfViewerState` to null
- [x] PASS: **Overlay** — renders above chat area
#### Citation Navigation Logic
- [x] PASS: **URL source** — opens external URL in new tab instead of PDF viewer
- [x] PASS: **PDF source** — opens internal PDF viewer at cited page
- [x] PASS: **Page number** — defaults to 1 if not specified in source metadata

### Starter Suggestions (Empty State)
#### Research Mode Suggestions
- [x] PASS: "Summarize Key Themes" — clickable chip
- [x] PASS: "Find Contradictions" — clickable chip
- [x] PASS: "Compare Methodologies" — clickable chip
#### Learn Mode Suggestions
- [x] PASS: "Quiz me on these papers" — clickable chip
- [x] PASS: "What assumptions should I question?" — clickable chip
- [x] PASS: "Help me find gaps in this research" — clickable chip
