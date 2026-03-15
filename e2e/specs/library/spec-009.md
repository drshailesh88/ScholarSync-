# library — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Search Input Component Details
- [x] PASS: Search input uses `rounded-xl bg-surface-raised border border-border` base styling (search-input.tsx:30)
#### Error Display Component Details
- [x] PASS: ErrorDisplay reports the error to Sentry via `Sentry.captureException(error)` on mount (error-display.tsx:24-26)
- [x] PASS: ErrorDisplay renders a `WarningCircle` icon (red, size 32) in a `bg-red-500/10` rounded container (error-display.tsx:35-36)
- [x] PASS: ErrorDisplay retry button shows `ArrowCounterClockwise` icon (size 16) next to "Try Again" text, styled as `bg-brand text-white` (error-display.tsx:41-45)
#### Paper Card Action Button Icons
- [x] PASS: Cite in Editor button uses `ClipboardText` icon (size 14) and has `title="Cite in Editor"` tooltip attribute (page.tsx:576-577)
- [x] PASS: View PDF button uses `Eye` icon (size 14) from Phosphor icons (page.tsx:586)
- [x] PASS: DOI link uses `GlobeSimple` icon (size 14), same icon as the non-upload paper card left indicator (page.tsx:596)
- [x] PASS: Favorite button uses `Star` with `weight="fill"` when favorited, `weight="regular"` (outlined) when not (page.tsx:610)
- [x] PASS: Delete button uses `Trash` icon (size 16) with `hover:text-red-500 hover:bg-red-500/10` (page.tsx:614)
#### PDF Viewer Additional Details
- [x] PASS: PDF viewer `aria-label` is `"PDF Viewer"` when no title prop is passed — Library does not pass `title` (pdf-viewer.tsx:122, page.tsx:685)
- [x] PASS: PDF viewer accepts `initialPage` prop to set starting page, clamped to 1..numPages range (pdf-viewer.tsx:55-57)
- [x] PASS: PDF viewer close button only renders when `onClose` prop is provided (pdf-viewer.tsx:183)
- [x] PASS: PDF content area uses `overflow-auto` for scrolling when zoomed beyond viewport (pdf-viewer.tsx:195)
- [x] PASS: PDF page element rendered with `shadow-xl rounded-lg` class (pdf-viewer.tsx:228)
- [x] PASS: PDF viewer uses `pdfjs-dist/build/pdf.worker.min.mjs` as the PDF.js web worker (pdf-viewer.tsx:18-21)
- [x] PASS: PDF viewer toolbar background is `bg-surface border-b border-border` (pdf-viewer.tsx:125)
- [x] PASS: Previous/Next page buttons use `disabled:opacity-30 disabled:cursor-not-allowed` styling (pdf-viewer.tsx:130-131)
- [x] PASS: Page counter uses `tabular-nums min-w-[5rem] text-center` for fixed-width numeric display (pdf-viewer.tsx:135)
- [x] PASS: Zoom percentage uses `tabular-nums min-w-[3rem] text-center` for fixed-width display (pdf-viewer.tsx:163)
#### Skeleton Loading Composition Details
- [x] PASS: `loading.tsx` sidebar skeleton: one `h-4 w-20` heading placeholder + 5 `h-9 w-full rounded-lg` row placeholders (loading.tsx:7-12)
- [x] PASS: `loading.tsx` search skeleton: `h-11 flex-1 rounded-xl` placeholder (loading.tsx:16)
- [x] PASS: `loading.tsx` sort skeleton: `h-11 w-40 rounded-xl` placeholder (loading.tsx:17)
- [x] PASS: `SkeletonCard` composition: `glass-panel rounded-2xl p-6` container with `h-12 w-12 rounded-xl` icon + `h-4 w-3/4` title + `h-3 w-1/2` subtitle + 2-line `SkeletonText` (skeleton.tsx:26-38)
- [x] PASS: `SkeletonText` last line renders at `60%` width, all others at `100%` (skeleton.tsx:19)
#### Layout & Styling Extras
- [x] PASS: Filter row uses `flex-wrap` so filter controls wrap to next line on narrow viewports (page.tsx:427)
- [x] PASS: Paper card hover effect uses `hover:bg-surface-raised/30 transition-all` (page.tsx:529)
- [x] PASS: Sidebar bottom section has `border-t border-border-subtle` divider above Upload/New Collection buttons (page.tsx:387)
- [x] PASS: Sidebar nav uses `space-y-0.5` for minimal gap between collection items (page.tsx:336)
- [x] PASS: Upload button disabled styling uses `disabled:opacity-50` (page.tsx:392)
- [x] PASS: Sort dropdown styling: `rounded-xl bg-surface-raised border border-border text-ink text-sm` (page.tsx:417)
- [x] PASS: Paper card left icon container: `w-10 h-10 rounded-lg bg-surface-raised` (page.tsx:531)
- [x] PASS: `All Papers` active state: `bg-surface-raised text-ink font-medium`; inactive: `text-ink-muted hover:text-ink hover:bg-surface-raised/50` (page.tsx:341-344)
#### `/api/extract-pdf` Route Details
- [x] PASS: Requires authentication; returns 401 `"Authentication required"` if unauthenticated (extract-pdf/route.ts:27-29)
- [x] PASS: Applies rate limiting with `RATE_LIMITS.ai` bucket (extract-pdf/route.ts:34)
- [x] PASS: Validates Content-Type header must include `multipart/form-data`; returns 400 `"Content-Type must be multipart/form-data"` (extract-pdf/route.ts:41-46)
