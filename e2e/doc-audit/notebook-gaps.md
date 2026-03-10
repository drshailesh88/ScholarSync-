# Notebook — Feature Doc Gaps

**Original doc:** `NOTEBOOK_FEATURES_TESTING.md`
**Original checkbox count:** 374
**After Codex Pass 1:** 564
**After Codex Pass 2:** 678
**After Claude Code Pass 3:** 832
**Net additions in Pass 3:** 154
**Missing from original doc:** 458
**Completeness of original doc:** 45.0%

## Pass 3 Coverage Areas

- `/api/rag-chat` internals: Zod schema constraints (messages min 1 max 50, content max 50000, paperIds max 50), auth 401, rate limiting, validation 400, AI-not-configured deterministic fallback, RAG retrieval failure fallback, stream error fallback, exact 500 error text, system prompt text, 5 citation CRITICAL RULES, default RAG config (topK 8, multiQuery, HyDE, selfQuery, rerank), fallback answer formats
- `/api/chat` internals: Zod schema (messages max 50 no min), auth/rate-limit/validation, AI not configured 503, mode "learn" → guide prompt, mode "notebook" → standard prompt, exact error texts
- `/api/extract-pdf` internals: 20MB file size limit, content-type validation, missing file/non-PDF/oversized error messages with exact text and status codes, response shape
- `/api/embed` internals: positive integer validation, `RATE_LIMITS.embed` tier, exact error messages
- `/api/extract-facts` internals: batch mode with paperIds array, missing paperId error, projectId support
- `/api/audio-overview` internals: Zod schema (paperIds min 1 max 25, customPrompt max 500, length enum), cache key formula, no-source-notes 400, GET streaming endpoint, MIME type detection, TTS voice "nova", R2 storage, author normalization
- `/api/papers/[id]/pdf` internals: GET signed URL → buffer → pdf_url/open_access_url fallback chain, POST storage + pipeline trigger, response headers, exact error messages
- PDF Viewer component: full toolbar (page nav, zoom 0.5-3.0 in 0.25 steps, fit-width, close), page display "N / M", 404-specific error message, loading states, aria-labels (Previous/Next page, Zoom in/out, Fit width, Close PDF viewer), role="dialog" aria-modal="true", initialPage clamping, escape key, title truncation
- Notebook page rendering: learn subtitle "Select your papers and start exploring", conditional plural in research mode, suggestion-loading dot differences (1.5x1.5 brand/30 vs 2x2 brand/40), audio overview auto-creates conversation titled "Audio Overview", history "Untitled" fallback, opacity-50 vs opacity-30 disabled styles, highlightedSource set before null check, copy/feedback on error messages, coverage badge truncation differences
- Share actions: token reuse on re-enable, token preservation on disable, password hashing, legacy plain-text password fallback, no-password returns true, expiration check, title/owner fallbacks, message ordering, share URL env var
- Share dialog: password field type="text" not type="password", shared saving state between toggle and save, toggle aria-label
- Shared notebook: generateMetadata for null tokens, hardcoded hex colors vs design tokens, user message bg-white/5, date format, defensive retrieved_chunks Array.isArray check
- Source Notes panel: default expanded state, getErrorMessage fallback text, backdrop/slide transitions with duration-200, max-w-md, glass-panel shadow-2xl, cancelled flag pattern, Generate All disabled condition, singular/plural paper count, ChatCircleDots + ArrowRight icons, line-clamp-1
- Audio Overview panel: normalizedPaperIds dedup/sort/filter, play/pause fill weight, button titles, preload="auto", seek clamping, formatTime edge cases, speedIndex preserved across resets, no Generate button in idle state, download anchor technique
- Conversation actions: default "New Conversation" title, default empty paper_ids, addMessage updates updated_at, submitMessageFeedback comment param, getConversations desc ordering
- Loading skeleton: w-72 vs w-80 sidebar discrepancy, 3 placeholder rows, SkeletonText lines={6}

## Pass 2 Coverage Areas

- Upload and URL ingestion internals: exact temp-id formats, optimistic row payloads, byte-size to page-count swap, `error` vs `embed_failed` transitions, hostname fallback, and file-input reset timing
- RAG chat internals: `/api/chat` vs `/api/rag-chat` routing, header parsing, request timeout, per-read timeout race, and exact streamed error strings
- Source Notes drawer internals: body scroll lock, `animateIn` timing, `Generate All` batching by 3, selected-first sort, and ask-question auto-close behavior
- Audio Overview internals: first-mount auto-generate, option-change reset behavior, speed cycle order, transcript defaults, fixed download filename, and playback reset on close
- Share dialog internals: mount-time settings fetch, `Loading share settings...`, Escape-to-close, enable/disable toggle behavior, save payload scope, and console-only failures
- Shared notebook viewer internals: metadata title format, `notFound()` path, password-gate disabled states, exact password errors, and non-clickable citation pills
- Conversation-history internals: `max-h-32` dropdown, new-conversation reset scope, last-assistant-message source restore, file-row selected-flag restoration, and learn-mode detection
- Follow-up suggestion internals: 100-character gates, stale-request rejection via `suggestionRequestIdRef`, learn/research chip styling split, and `suggestionsForMessageId` ownership
- Chat message rendering internals: `role="log"` container, citation-chip shortening logic, copy sanitization, feedback toggle-off, fill weights, and DB persistence gate for positive numeric ids
- Extraction card internals: non-null fallback rendering, exact header/badge text, `Level X` evidence formatting, bordered custom sections, and spinner replacement during extraction

## Behavior Corrections (Pass 2)

- Follow-up suggestion requests are not actually cancelled on new sends; stale completions are ignored with `suggestionRequestIdRef`
- The audio overview close button does not currently expose `aria-label="Close audio overview"`; it uses only a `title`
- The file picker accepts `.pdf`, `.txt`, and `.md`, but the page routes every upload through PDF extraction and Docling; there is no separate text/markdown ingestion path

## Behavior Corrections (Pass 3)

- Share Dialog password field uses `type="text"` (visible plaintext), not `type="password"` — this is distinct from the Password Gate which correctly uses `type="password"`
- Coverage badge unused-paper truncation differs from citation truncation: no 40-char colon position cap, no ellipsis on 30-char fallback
- Suggestion-loading dots (1.5x1.5, brand/30, 0/100/200ms) differ from main loading dots (2x2, brand/40, 0/150/300ms)
- Loading skeleton sidebar is `w-72` while the actual notebook sidebar is `w-80` — intentional or not, they differ

## Components Referenced But Not Rendered

- None. Every file in `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component.
