# studio — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Export System
#### PDF Export
- [ ] Academic formatting applied:
- [ ] 1-inch margins
- [ ] Double-spaced text
- [ ] Proper heading hierarchy
- [ ] Opens returned export HTML in a new window for printing or saving
#### DOCX Export
- [ ] Triggered via "Export as Word"
- [ ] Calls `POST /api/export/docx`
- [ ] Styling preserved (headings, lists, formatting)
- [ ] HTML content parsed and converted
- [ ] Downloads a `.doc` file

### Save & Document Persistence
#### Auto-Save
- [ ] Content changes trigger debounced save (2 seconds)
- [ ] Title changes trigger debounced save (1 second)
- [ ] Save status updates in top bar during save lifecycle
- [ ] localStorage backup created on each keystroke via `handleDirty()`
#### useStudioDocument Hook
- [ ] Loads document for selected project on mount
- [ ] `studioDoc` object contains full document state
- [ ] Title saves transition `idle → unsaved → saving → saved/error`; content saves go directly to `saving` after the editor debounce
- [ ] `lastSavedAt` timestamp updates on successful save
- [ ] `docLoading` shows loading state while fetching
- [ ] `docError` captures error messages
- [ ] Project switching loads different document

### Loading & Error States
#### Loading (loading.tsx)
- [ ] Skeleton icon (h-8 w-8 rounded-lg)
- [ ] Skeleton title bar (h-6 w-64)
- [ ] Two skeleton buttons top-right (h-9 w-24)
- [ ] Skeleton toolbar (h-10 full-width)
- [ ] Skeleton editor area (flex-1 rounded-2xl)
- [ ] Pulse animation on all skeletons
- [ ] No layout shift when real content loads
#### Error (error.tsx)
- [ ] `ErrorDisplay` component renders
- [ ] Title: "Studio unavailable"
- [ ] Message: "We couldn't load the editor. Your work is safe — please try again."
- [ ] Error details shown
- [ ] "Retry" button triggers `reset()` to re-load page

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Studio route reads `projectId` and `mode` from URL search params on first render
- [ ] `?mode=learn` opens the page in Learn mode on initial load
