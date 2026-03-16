# studio — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Export System
#### PDF Export
- [x] PASS: Academic formatting applied:
- [x] PASS: 1-inch margins
- [x] PASS: Double-spaced text
- [x] PASS: Proper heading hierarchy
- [x] PASS: Opens returned export HTML in a new window for printing or saving
#### DOCX Export
- [x] PASS: Triggered via "Export as Word"
- [x] PASS: Calls `POST /api/export/docx`
- [x] PASS: Styling preserved (headings, lists, formatting)
- [x] PASS: HTML content parsed and converted
- [x] PASS: Downloads a `.doc` file

### Save & Document Persistence
#### Auto-Save
- [x] PASS: Content changes trigger debounced save (2 seconds)
- [x] PASS: Title changes trigger debounced save (1 second)
- [x] PASS: Save status updates in top bar during save lifecycle
- [x] PASS: localStorage backup created on each keystroke via `handleDirty()`
#### useStudioDocument Hook
- [x] PASS: Loads document for selected project on mount
- [x] PASS: `studioDoc` object contains full document state
- [x] PASS: Title saves transition `idle → unsaved → saving → saved/error`; content saves go directly to `saving` after the editor debounce
- [x] PASS: `lastSavedAt` timestamp updates on successful save
- [x] PASS: `docLoading` shows loading state while fetching
- [x] PASS: `docError` captures error messages
- [x] PASS: Project switching loads different document

### Loading & Error States
#### Loading (loading.tsx)
- [x] PASS: Skeleton icon (h-8 w-8 rounded-lg)
- [x] PASS: Skeleton title bar (h-6 w-64)
- [x] PASS: Two skeleton buttons top-right (h-9 w-24)
- [x] PASS: Skeleton toolbar (h-10 full-width)
- [x] PASS: Skeleton editor area (flex-1 rounded-2xl)
- [x] PASS: Pulse animation on all skeletons
- [x] PASS: No layout shift when real content loads
#### Error (error.tsx)
- [x] PASS: `ErrorDisplay` component renders
- [x] PASS: Title: "Studio unavailable"
- [x] PASS: Message: "We couldn't load the editor. Your work is safe — please try again."
- [x] PASS: Error details shown
- [x] PASS: "Retry" button triggers `reset()` to re-load page

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Studio route reads `projectId` and `mode` from URL search params on first render
- [x] PASS: `?mode=learn` opens the page in Learn mode on initial load
