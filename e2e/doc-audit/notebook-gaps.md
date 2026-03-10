# Notebook — Feature Doc Gaps

**Original doc:** `NOTEBOOK_FEATURES_TESTING.md`
**Original checkbox count:** 374
**After Codex Pass 1:** 564
**After Codex Pass 2:** 678
**Net additions in Pass 2:** 114
**Missing from original doc:** 304
**Completeness of original doc:** 55.2%

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

## Components Referenced But Not Rendered

- None. Every file in `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component.
