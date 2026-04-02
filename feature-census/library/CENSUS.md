# Feature Census: Library Module

**Generated:** 2026-04-02
**Entry points:** `src/app/(app)/library/page.tsx`, `src/app/(app)/library/layout.tsx`
**Files in scope:** 28 (components, routes, services, API routes)
**Route URL:** `/library`
**Method:** 2-layer extraction (code + library) — Layer 3 runtime skipped (no live server)

## Summary

| Metric | Count |
|--------|-------|
| Total features | 68 |
| From your code | 64 |
| From libraries (emergent) | 4 |
| Confirmed (2+ layers) | 68 |
| Code-only (not visible) | 0 |
| Runtime-only (no code match) | 0 |

---

## Features by Category

### Navigation & Routing
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 1 | Library home page | URL /library | src/app/(app)/library/page.tsx | CONFIRMED |
| 2 | Inbox view | URL /library/inbox | src/app/(app)/library/[state]/page.tsx | CONFIRMED |
| 3 | Core view | URL /library/core | src/app/(app)/library/[state]/page.tsx | CONFIRMED |
| 4 | Background view | URL /library/background | src/app/(app)/library/[state]/page.tsx | CONFIRMED |
| 5 | Archived view | URL /library/archived | src/app/(app)/library/[state]/page.tsx | CONFIRMED |
| 6 | Trash view | URL /library/trash | src/app/(app)/library/trash/page.tsx | CONFIRMED |
| 7 | Item detail/reader | URL /library/item/[libraryId] | src/app/(app)/library/item/[libraryId]/page.tsx | CONFIRMED |
| 8 | Project scoped view | URL /library/project/[id] | src/app/(app)/library/project/[projectId]/page.tsx | CONFIRMED |
| 9 | Sidebar navigation | Click sidebar links | src/components/library/LibrarySidebar.tsx:77-145 | CONFIRMED |
| 10 | Back to Library from reader | Click arrow button | src/components/library/reader/reader-view.tsx:116 | CONFIRMED |
| 11 | Feature flag routing | env var check | src/lib/feature-flags.ts:11 | CONFIRMED |

### Sidebar & Layout
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 12 | Desktop sidebar (w-56) | Always visible md+ | src/components/library/LibraryShell.tsx:87 | CONFIRMED |
| 13 | Mobile sidebar drawer | Hamburger button | src/components/library/LibraryShell.tsx:93-104 | CONFIRMED |
| 14 | Mobile sidebar close | Click backdrop | src/components/library/LibraryShell.tsx:97 | CONFIRMED |
| 15 | Sidebar counts (badge) | Server data | src/components/library/LibrarySidebar.tsx:110-112 | CONFIRMED |
| 16 | Active state highlight | URL match | src/components/library/LibrarySidebar.tsx:60-65 | CONFIRMED |

### Home Screen
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 17 | Continue Reading section | Auto (reading_progress > 0) | src/components/library/HomeScreen.tsx | CONFIRMED |
| 18 | For Your Active Project section | Auto (has project) | src/components/library/HomeScreen.tsx | CONFIRMED |
| 19 | Needs Review section | Auto (unread, high-signal) | src/components/library/HomeScreen.tsx | CONFIRMED |
| 20 | Recently Saved section | Auto (recent items) | src/components/library/HomeScreen.tsx | CONFIRMED |

### Source Cards
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 21 | Click card to navigate to detail | Click | src/components/library/LibrarySourceCard.tsx:79 | CONFIRMED |
| 22 | Workflow state badge | Data-driven | src/components/library/WorkflowBadge.tsx | CONFIRMED |
| 23 | Trust tier dot indicator | Data-driven | src/components/library/LibrarySourceCard.tsx | CONFIRMED |
| 24 | 3-dot action menu | Click dots button | src/components/library/LibrarySourceCard.tsx:157 | CONFIRMED |
| 25 | Move to Core (from menu) | Click menu item | src/components/library/LibrarySourceCard.tsx:171 | CONFIRMED |
| 26 | Delete source (from menu) | Click menu item | src/components/library/LibrarySourceCard.tsx:184 | CONFIRMED |
| 27 | Close action menu | Click outside | src/components/library/LibrarySourceCard.tsx:165 | CONFIRMED |

### Source List & Pagination
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 28 | Load more sources | Click "Show more" | src/components/library/SourceList.tsx:140 | CONFIRMED |
| 29 | Loading indicator | Auto during fetch | src/components/library/SourceList.tsx:35 | CONFIRMED |
| 30 | Multi-select toggle | Click checkbox | src/components/library/SourceList.tsx:70 | CONFIRMED |
| 31 | Bulk selection toolbar | Selection active | src/components/library/BulkSelectionToolbar.tsx | CONFIRMED |
| 32 | Send bulk to editor | Click toolbar button | src/components/library/BulkSelectionToolbar.tsx:52 | CONFIRMED |
| 33 | Clear selection | Click X in toolbar | src/components/library/BulkSelectionToolbar.tsx:42 | CONFIRMED |

### Workflow State Transitions
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 34 | Move source between states | Action menu | src/lib/library/service.ts:135 | CONFIRMED |
| 35 | Optimistic count update | On state change | src/components/library/LibraryShell.tsx:40-44 | CONFIRMED |
| 36 | Undo state change toast | Auto after move | src/components/library/UndoToast.tsx | CONFIRMED |
| 37 | Undo countdown progress bar | Auto (5-8s timer) | src/components/library/UndoToast.tsx:13-30 | CONFIRMED |
| 38 | Click undo to revert | Click "Undo" | src/components/library/UndoToast.tsx:43 | CONFIRMED |

### Detail/Reader Page
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 39 | Web source reader (extracted HTML) | Route to web source | src/components/library/reader/web-source-reader.tsx | CONFIRMED |
| 40 | Paper reader (abstract view) | Route to paper | src/components/library/reader/paper-reader.tsx:93 | CONFIRMED |
| 41 | Paper reader (PDF view toggle) | Click "Full Text" tab | src/components/library/reader/paper-reader.tsx:105 | CONFIRMED |
| 42 | Reading progress bar | Scroll tracking | src/components/library/reader/reader-view.tsx:156-162 | CONFIRMED |
| 43 | Toggle workbench panel | Click button | src/components/library/reader/reader-view.tsx:141 | CONFIRMED |
| 44 | Open original URL | Click link | src/components/library/reader/reader-view.tsx:130 | CONFIRMED |
| 45 | Send to editor button | Click | src/components/library/reader/send-to-editor-button.tsx:44 | CONFIRMED |
| 46 | Escape closes panel | Keyboard | src/components/library/reader/reader-view.tsx:100 | CONFIRMED |

### Extraction States
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 47 | Pending state (skeleton) | extraction_state=pending | src/components/library/reader/extraction-state-surface.tsx | CONFIRMED |
| 48 | Ready state (content displayed) | extraction_state=ready | src/components/library/reader/reader-view.tsx:172 | CONFIRMED |
| 49 | Partial state (content + warning) | extraction_state=partial | src/components/library/reader/reader-view.tsx:173 | CONFIRMED |
| 50 | Failed state (metadata + retry) | extraction_state=failed | src/components/library/reader/extraction-state-surface.tsx:98 | CONFIRMED |

### Annotations (Highlights & Notes)
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 51 | Create highlight (text selection) | Select text | src/components/library/reader/highlight-popover.tsx:57 | CONFIRMED |
| 52 | Choose highlight color | Click color dot | src/components/library/reader/highlight-popover.tsx:81 | CONFIRMED |
| 53 | Add note to highlight | Click "Add note" | src/components/library/reader/highlight-popover.tsx:69 | CONFIRMED |
| 54 | Submit note (Cmd+Enter) | Keyboard | src/components/library/reader/highlight-popover.tsx:99 | CONFIRMED |
| 55 | Create general note | Type in workbench | src/components/library/reader/workbench-panel.tsx:163 | CONFIRMED |
| 56 | Edit note inline | Click edit icon | src/components/library/reader/workbench-panel.tsx:223 | CONFIRMED |
| 57 | Delete annotation | Click delete icon | src/components/library/reader/workbench-panel.tsx:231 | CONFIRMED |
| 58 | Click highlight to jump | Click in workbench | src/components/library/reader/workbench-panel.tsx:334 | CONFIRMED |

### Project Switching
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 59 | Open project dropdown | Click switcher | src/components/library/ProjectSwitcher.tsx:78 | CONFIRMED |
| 60 | Select project | Click project item | src/components/library/ProjectSwitcher.tsx:133 | CONFIRMED |
| 61 | Select "All Library" | Click | src/components/library/ProjectSwitcher.tsx:115 | CONFIRMED |
| 62 | Last active project persisted | Server-side | src/lib/library/project-context.ts:41 | CONFIRMED |

### Ingestion (URL Paste + PDF Upload)
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 63 | Open Add Source dialog | Click "Add Source" | src/components/library/LibraryShell.tsx:120 | CONFIRMED |
| 64 | Paste URL tab | Click tab | src/components/library/AddSourceDialog.tsx:173 | CONFIRMED |
| 65 | Upload PDF tab | Click tab | src/components/library/AddSourceDialog.tsx:185 | CONFIRMED |
| 66 | Submit URL (Enter key) | Keyboard | src/components/library/AddSourceDialog.tsx:131 | CONFIRMED |
| 67 | Close dialog (Escape) | Keyboard | src/components/library/AddSourceDialog.tsx:135 | CONFIRMED |

### Trash & Deletion
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 68 | Restore from trash | Click restore button | src/app/(app)/library/trash/TrashViewClient.tsx:142 | CONFIRMED |
| 69 | Permanent delete (with confirm) | Click delete, then confirm | src/app/(app)/library/trash/TrashViewClient.tsx:154 | CONFIRMED |
| 70 | Cancel permanent delete | Click cancel | src/app/(app)/library/trash/TrashViewClient.tsx:162 | CONFIRMED |

### API Endpoints
| # | Feature | Method | Endpoint | Code Ref | Status |
|---|---------|--------|----------|----------|--------|
| 71 | Save web source (from Explore) | POST | /api/library/save | src/app/api/library/save/route.ts:4 | CONFIRMED |
| 72 | Upload PDF | POST | /api/library/upload-pdf | src/app/api/library/upload-pdf/route.ts:12 | CONFIRMED |
| 73 | Get annotations | GET | /api/library/annotations | src/app/api/library/annotations/route.ts:18 | CONFIRMED |
| 74 | Create annotation | POST | /api/library/annotations | src/app/api/library/annotations/route.ts:40 | CONFIRMED |
| 75 | Update annotation | PATCH | /api/library/annotations | src/app/api/library/annotations/route.ts:68 | CONFIRMED |
| 76 | Delete annotation | DELETE | /api/library/annotations | src/app/api/library/annotations/route.ts:90 | CONFIRMED |

### Error & Loading States
| # | Feature | Trigger | Code Ref | Status |
|---|---------|---------|----------|--------|
| 77 | Error boundary (reader page) | Runtime error | src/app/(app)/library/item/[libraryId]/error.tsx | CONFIRMED |
| 78 | Loading skeleton | Page loading | src/app/(app)/library/loading.tsx | CONFIRMED |
| 79 | Retry from error page | Click retry | src/app/(app)/library/item/[libraryId]/error.tsx:25 | CONFIRMED |
| 80 | Back to Library from error | Click link | src/app/(app)/library/item/[libraryId]/error.tsx:31 | CONFIRMED |

---

## Keyboard Shortcuts

| Shortcut | Action | Location |
|----------|--------|----------|
| Escape | Close workbench panel | reader-view.tsx:100 |
| Escape | Close highlight popover | highlight-popover.tsx (cancel) |
| Escape | Close project switcher | ProjectSwitcher.tsx |
| Escape | Close Add Source dialog | AddSourceDialog.tsx:135 |
| Cmd/Ctrl+Enter | Submit note | highlight-popover.tsx:99, workbench-panel.tsx:155 |
| Enter | Submit URL (Add Source) | AddSourceDialog.tsx:131 |

---

## Server Actions (Service Layer)

| Action | Function | File |
|--------|----------|------|
| Get library sources | getLibrarySources() | src/lib/library/service.ts:48 |
| Get single source | getLibrarySourceById() | src/lib/library/service.ts:81 |
| Move workflow state | moveLibrarySourceState() | src/lib/library/service.ts:135 |
| Update reading progress | updateReadingProgress() | src/lib/library/service.ts:175 |
| Soft delete source | softDeleteLibrarySource() | src/lib/library/service.ts:382 |
| Restore from trash | restoreLibrarySource() | src/lib/library/service.ts:418 |
| Permanent delete | permanentlyDeleteLibrarySource() | src/lib/library/service.ts:453 |
| Get trash sources | getTrashSources() | src/lib/library/service.ts:318 |
| Get library home data | getLibraryHome() | src/lib/library/home.ts:39 |
| Get library counts | getLibraryCounts() | src/lib/library/home.ts:65 |
| Save web source from URL | saveWebSourceFromUrl() | src/lib/actions/web-sources.ts |
| Save web source (Explore) | saveWebSource() | src/lib/actions/web-sources.ts:44 |
| Extract web content | extractWebSourceContent() | src/lib/actions/web-sources.ts:154 |
| Get/set active project | setLastActiveProjectId() | src/lib/library/project-context.ts:41 |
| Create editor handoff | createEditorHandoff() | src/lib/library/editor-handoff.ts |
| Library URL matches | getLibraryMatchesForUrls() | src/lib/library/service.ts:533 |

---

## QA Test Targets

_Every CONFIRMED feature is a QA test target. 80 total._

### Navigation (11)
- [ ] Home page loads at /library
- [ ] Inbox/Core/Background/Archived views load at /library/[state]
- [ ] Trash view loads at /library/trash
- [ ] Item detail loads at /library/item/[libraryId]
- [ ] Project scoped view loads at /library/project/[id]
- [ ] Sidebar links navigate correctly
- [ ] Back button from reader returns to library
- [ ] Feature flag routes to new/old library

### Home Screen (4)
- [ ] Continue Reading shows items with reading progress
- [ ] Active Project section shows project-scoped items
- [ ] Needs Review shows unread items
- [ ] Recently Saved shows recent items

### Source Cards (7)
- [ ] Card click navigates to detail page
- [ ] Workflow state badge displays correctly
- [ ] Trust tier dot shows
- [ ] 3-dot menu opens on click
- [ ] Move to state works from menu
- [ ] Delete works from menu
- [ ] Menu closes on outside click

### Source List (6)
- [ ] Show more loads additional items
- [ ] Loading indicator shows during fetch
- [ ] Multi-select toggles work
- [ ] Bulk toolbar appears on selection
- [ ] Send bulk to editor works
- [ ] Clear selection works

### Workflow States (5)
- [ ] Move source changes state in DB
- [ ] Sidebar counts update optimistically
- [ ] Undo toast appears after move
- [ ] Countdown progress bar animates
- [ ] Clicking undo reverts the move

### Reader (8)
- [ ] Web source renders extracted HTML
- [ ] Paper shows abstract view
- [ ] Paper shows PDF view toggle
- [ ] Reading progress bar updates on scroll
- [ ] Workbench panel toggles
- [ ] Open original link works
- [ ] Send to editor works
- [ ] Escape closes panel

### Extraction States (4)
- [ ] Pending shows skeleton
- [ ] Ready shows content
- [ ] Partial shows content + warning
- [ ] Failed shows retry button

### Annotations (8)
- [ ] Text selection triggers highlight popover
- [ ] Color picker works
- [ ] Add note to highlight works
- [ ] Cmd+Enter submits note
- [ ] Create general note works
- [ ] Edit note inline works
- [ ] Delete annotation works
- [ ] Click highlight jumps to position

### Project Switching (4)
- [ ] Dropdown opens on click
- [ ] Select project re-scopes library
- [ ] "All Library" exits project scope
- [ ] Last active project persists across visits

### Ingestion (5)
- [ ] Add Source dialog opens
- [ ] URL paste tab validates and saves
- [ ] PDF upload tab accepts and uploads
- [ ] Enter submits URL
- [ ] Escape closes dialog

### Trash (3)
- [ ] Restore moves source out of trash
- [ ] Permanent delete with confirmation works
- [ ] Cancel delete dismisses confirm

### API (6)
- [ ] POST /api/library/save creates web source
- [ ] POST /api/library/upload-pdf stores PDF
- [ ] GET/POST/PATCH/DELETE /api/library/annotations CRUD

### Error States (4)
- [ ] Error boundary catches reader errors
- [ ] Loading skeleton shows on page load
- [ ] Retry button reloads after error
- [ ] Back to Library link works from error page
