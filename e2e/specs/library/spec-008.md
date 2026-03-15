# library — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Zoom out is disabled at the lower bound of `50%`
- [ ] Zoom in is disabled at the upper bound of `300%`
- [ ] `Fit width` resets zoom to exactly `100%`
- [ ] `Escape` key closes the PDF viewer overlay
- [ ] Close icon button unmounts the PDF viewer overlay
- [ ] `PDFViewer` returns `null` if neither `url` nor `file` is provided
- [ ] Document-level loading UI shows a spinner plus the text `Loading PDF...`
- [ ] Page-level loading UI shows a spinner with no extra text
- [ ] Generic document error slot renders `Failed to load PDF document.`
- [ ] 404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text
- [ ] Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it
- [ ] Arrow-key page navigation is not implemented in the current `PDFViewer`
- [ ] Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders
- [ ] Route-level error boundary title reads `Library unavailable`
- [ ] Route-level error boundary message reads `We couldn't load your paper library. Please try again.`
- [ ] A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself
- [ ] Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component
- [ ] Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation
#### Behavior Corrections (Pass 2)
- [ ] Paper title uses `font-medium` class, not `font-bold` — original section 5 says "bold" but code renders `<h3 className="font-medium ...">` (page.tsx:539)
- [ ] Paper title has NO truncation — original says "truncated to 1 line" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)
- [ ] Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says "Retry" (error-display.tsx:43)
- [ ] Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says "Red background/hover" (page.tsx:503)
- [ ] Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)
- [ ] Sidebar heading source text is `Collections` (first-letter capitalized), transformed to "COLLECTIONS" by the CSS `uppercase` class — not a literal "COLLECTIONS" string in markup (page.tsx:334)
- [ ] `toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)
- [ ] `View PDF` button condition does NOT check `open_access_url`, only `source === "user_upload" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)
#### Citation Modal — Modal Component Behaviors
- [ ] Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)
- [ ] Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)
- [ ] Body scroll is locked when citation modal is open — `document.body.style.overflow = "hidden"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)
- [ ] Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)
- [ ] Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)
- [ ] Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)
#### Search Input Component Details
- [ ] Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)
- [ ] Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)
- [ ] Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)
