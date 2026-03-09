# Notebook — Feature Doc Gaps

**Original doc:** `NOTEBOOK_FEATURES_TESTING.md`
**Original checkbox count:** 374
**Features found in UI:** 456
**Features found in source code:** 564
**Missing from doc:** 190
**Completeness of original doc:** 66.3%

## Missing Features

### Route and Initial Hydration
- [ ] `/notebook` has dedicated route-level loading and error screens separate from the in-page chat UI
- [ ] The notebook preloads existing library papers from `getUserPapers()` rather than starting from an empty source list
- [ ] Existing extraction records are pre-hydrated for already extracted papers
- [ ] Past conversations are loaded and capped at 20 entries on mount

### Sidebar and Source-Row Details
- [ ] Sidebar count pill reflects total source rows, including failed and unselected rows
- [ ] Conversation history toggle and new-conversation reset clear multiple overlay states in addition to messages
- [ ] Upload and URL rows have precise temporary-id formats and optimistic processing states
- [ ] URL-ready rows show `hostname · size` when the original URL parses cleanly
- [ ] Remove actions delete rows locally with no confirmation dialog or server-side delete call

### Upload, RAG, and Chat Request Behavior
- [ ] Uploaded files update from byte size to page count after `/api/extract-pdf` succeeds
- [ ] Raw PDF storage failures are logged but do not block Docling extraction and embedding
- [ ] Notebook switches between `/api/chat` and `/api/rag-chat` based on selected paper ids
- [ ] Streaming uses both a 30 second request abort and a per-read 30 second timeout race
- [ ] Coverage and source metadata are driven by `X-RAG-Coverage` and `X-RAG-Sources` response headers

### Overlays and Secondary Panels
- [ ] Source Notes locks body scroll, slides in from the right, and batches `Generate All` requests in groups of 3
- [ ] Audio Overview auto-generates on first open, supports cached results, speed cycling, transcript toggling, and regeneration with options
- [ ] Share dialog loads saved settings on mount, supports Escape-to-close, and saves only password/expiration settings once sharing is enabled
- [ ] Citation clicks branch between opening original URLs in a new tab and opening the PDF viewer at a page number

### Shared Notebook Viewer
- [ ] Shared notebook route can render either a password gate or the read-only viewer based on `hasPassword`
- [ ] Password gate has exact incorrect-password and generic-failure messages
- [ ] Shared viewer citations are read-only pills and do not support jump-to-source interactions
- [ ] Shared page metadata title and description are derived from the resolved shared notebook

## Features in doc that DON'T EXIST in the app
- The main notebook upload area is clickable but does not implement drag-and-drop event handling in the current page component.
- Source-row remove actions do not currently call a server-side delete action; they only remove rows from local page state.
- Notebook mode switching does not persist by itself; it affects the UI immediately, but persistence happens only when a conversation is created or updated by later actions.
- Sharing is not available before a conversation exists because the share button is disabled when `conversationIdRef.current` is null.
- Shared notebook citations are visual labels only; the shared viewer has no interactive PDF jump-to-source behavior.
