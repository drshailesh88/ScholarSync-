# library — Spec 008

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Zoom out is disabled at the lower bound of `50%`
- [x] PASS: Zoom in is disabled at the upper bound of `300%`
- [x] PASS: `Fit width` resets zoom to exactly `100%`
- [x] PASS: `Escape` key closes the PDF viewer overlay
- [x] PASS: Close icon button unmounts the PDF viewer overlay
- [x] PASS: `PDFViewer` returns `null` if neither `url` nor `file` is provided
- [x] PASS: Document-level loading UI shows a spinner plus the text `Loading PDF...`
- [x] PASS: Page-level loading UI shows a spinner with no extra text
- [x] PASS: Generic document error slot renders `Failed to load PDF document.`
- [x] PASS: 404 / `Not Found` / `Missing` load errors are normalized to the unavailable-PDF explanation text
- [x] PASS: Non-404 PDF load errors show top line `Failed to load PDF` with the raw error message below it
- [x] PASS: Arrow-key page navigation is not implemented in the current `PDFViewer`
- [x] PASS: Route-level `loading.tsx` renders a sidebar skeleton, a search skeleton, a sort skeleton, and five `SkeletonCard` placeholders
- [x] PASS: Route-level error boundary title reads `Library unavailable`
- [x] PASS: Route-level error boundary message reads `We couldn't load your paper library. Please try again.`
- [x] PASS: A client-side fetch failure in `fetchPapers()` logs an error and drops back to non-loading UI; it does not trip the route-level error boundary by itself
- [x] PASS: Library results are rendered as a simple scrolling column; infinite scroll is not implemented in the current page component
- [x] PASS: Shared Citation Dialog and Reference Store UI described later in the original document are not rendered by `/library` in the current implementation
#### Behavior Corrections (Pass 2)
- [x] PASS: Paper title uses `font-medium` class, not `font-bold` — original section 5 says "bold" but code renders `<h3 className="font-medium ...">` (page.tsx:539)
- [x] PASS: Paper title has NO truncation — original says "truncated to 1 line" but the `<h3>` has no `truncate` or `line-clamp` class; only the authors `<p>` has `truncate` (page.tsx:542)
- [x] PASS: Error boundary retry button reads `Try Again` (with ArrowCounterClockwise icon), not `Retry` — original section 15 says "Retry" (error-display.tsx:43)
- [x] PASS: Clear Filters uses translucent red styling `bg-red-500/10 hover:bg-red-500/20`, not solid red background — original says "Red background/hover" (page.tsx:503)
- [x] PASS: Cite button icon is `BookOpen` (size 14), not a clipboard or citation-specific icon (page.tsx:561)
- [x] PASS: Sidebar heading source text is `Collections` (first-letter capitalized), transformed to "COLLECTIONS" by the CSS `uppercase` class — not a literal "COLLECTIONS" string in markup (page.tsx:334)
- [x] PASS: `toPaperData()` only passes `title`, `authors`, `journal`, `year`, `doi` to the citation formatter — `volume`, `issue`, and `pages` are never mapped even though `PaperData` supports them (page.tsx:79-87, citations.ts:18-27)
- [x] PASS: `View PDF` button condition does NOT check `open_access_url`, only `source === "user_upload" || pdf_storage_path || pdf_url` — yet the GET API route falls back to `open_access_url` if no other PDF source exists (page.tsx:581 vs route.ts:74)
#### Citation Modal — Modal Component Behaviors
- [x] PASS: Escape key closes the citation modal — inherited from Modal component keydown listener (modal.tsx:17-21)
- [x] PASS: Clicking the dark backdrop overlay closes the citation modal — backdrop div has `onClick={onClose}` (modal.tsx:39)
- [x] PASS: Body scroll is locked when citation modal is open — `document.body.style.overflow = "hidden"` set in Modal useEffect, restored on unmount (modal.tsx:27-30)
- [x] PASS: Modal header renders a close X button (Phosphor `X` icon, size 18) on the right side (modal.tsx:50-55)
- [x] PASS: Modal max width is `max-w-lg` with `mx-4` horizontal margin (modal.tsx:43-45)
- [x] PASS: Citation formatted text uses `whitespace-pre-wrap` class — preserves line breaks in multi-line output like BibTeX (page.tsx:642)
#### Search Input Component Details
- [x] PASS: Search input renders a `MagnifyingGlass` icon (size 18) absolutely positioned on the left (search-input.tsx:21-24)
- [x] PASS: Search input has `pl-10` left padding to accommodate the icon (search-input.tsx:30)
- [x] PASS: Search input shows focus ring: `focus:ring-2 focus:ring-brand/40` (search-input.tsx:30)
