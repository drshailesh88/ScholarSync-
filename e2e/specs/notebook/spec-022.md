# notebook — Spec 022

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### `/api/extract-facts/route.ts` — Extract Facts API Internals
- [x] PASS: Optional `projectId` parameter accepted in request body
- [x] PASS: Server error returns 500 with `{ error: "Extraction failed" }`
#### `/api/audio-overview/route.ts` — Audio Overview API Internals
- [x] PASS: Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `["research","learn"]` optional; `customPrompt` string max(500) optional; `length` enum `["brief","default","detailed"]` optional
- [x] PASS: Validation error returns the first Zod issue message as `{ error: message }` with status 400
- [x] PASS: Conversation not found or not owned by user returns 404 with `{ error: "Conversation not found" }`
- [x] PASS: Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(",")}` — customPrompt changes invalidate the cache
- [x] PASS: No paper overviews available returns 400 with `{ error: "No source notes available. Generate source notes first (View Source Notes panel)." }`
- [x] PASS: Server error returns 500 with `{ error: "Failed to generate audio overview. Please try again." }`
- [x] PASS: GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`
- [x] PASS: GET validates conversation ownership via user auth and conversation `user_id` match
- [x] PASS: GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers
- [x] PASS: GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`
- [x] PASS: TTS uses OpenAI provider with voice `"nova"` and format `"mp3"`
- [x] PASS: Audio stored via `uploadAudioOverview(conversationId, audioId, buffer, extension)` from `@/lib/storage/r2` — R2 in Workers, `.data/audio-overviews` on the local Node fallback
- [x] PASS: Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5
#### `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals
- [x] PASS: GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename="paper-{id}.pdf"`, `Cache-Control: private, max-age=3600`
- [x] PASS: GET 404 when no PDF found: `{ error: "PDF not found for this paper" }`
- [x] PASS: GET calls `getSignedPdfUrl(paperId)` first and redirects only if it returns a URL; the current storage helper returns `null`, so the route normally falls through to direct streaming or `pdf_url` / `open_access_url` redirects
- [x] PASS: POST stores PDF via `uploadPdf(paperId, buffer)` from `@/lib/storage/r2` — R2 in Workers, `.data/pdfs` on the local Node fallback — then updates `pdf_storage_path`, sets `full_text_available: true`, and queues background processing
- [x] PASS: POST success returns `{ success: true, paperId, storagePath }`
- [x] PASS: POST failure returns 500 with `{ error: "Failed to store PDF file" }`
- [x] PASS: Both GET and POST validate paper ID as digits-only via regex `/^\d+$/`
#### PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set
- [x] PASS: Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)
- [x] PASS: Page display format: `"{pageNumber} / {numPages}"` when loaded, `"..."` while loading
- [x] PASS: Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click
- [x] PASS: Zoom display: `"{Math.round(scale * 100)}%"` — e.g., "100%", "125%"
- [x] PASS: Fit-width button resets scale to 1.0 (not a responsive width calculation)
- [x] PASS: Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`
- [x] PASS: Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`
- [x] PASS: `initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1
- [x] PASS: Document load error with "404", "Not Found", or "Missing" in message shows specific text: `"The original PDF is not available for this paper. It may have been imported from search without a PDF upload."`
- [x] PASS: Other document load errors show the raw `err.message`, falling back to `"Failed to load PDF"`
- [x] PASS: Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `"Failed to load PDF"` heading + error detail text
- [x] PASS: Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `"Loading PDF..."` text
- [x] PASS: Document component error fallback (react-pdf internal error): `"Failed to load PDF document."`
