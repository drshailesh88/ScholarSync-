# studio — Spec 016

STATUS: COMPLETE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Quick Test Workflows
#### Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)
- [x] Replies indented with `ml-4`
  RESULT: PASS — Component audit confirmed reply threads render inside `div.ml-4.space-y-2`.
- [x] Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline
  RESULT: PASS — New Comment Sidebar tests now cover Enter-submit for both inline comments and replies, and the handlers call `e.preventDefault()` before saving.
- [x] Comments stored via `document-comments-local` localStorage functions — NOT database API
  RESULT: PASS — Component audit confirmed the sidebar uses `getDocumentCommentsLocal`, `addDocumentCommentLocal`, `resolveDocumentCommentLocal`, `unresolveDocumentCommentLocal`, and `deleteDocumentCommentLocal`; live browser inspection captured the saved `scholarsync_comments_0` localStorage entry.
- [x] Comment user ID is hardcoded as `"local-user"`
  RESULT: PASS — Code audit of `document-comments-local.ts` confirmed new comments are created with `userId: "local-user"`, and both new Comment Sidebar tests assert that stored value.
- [x] Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view
  RESULT: PASS — The existing Comment Sidebar test verified the quoted-text click calls `chain().focus().setTextSelection({ from, to }).scrollIntoView().run()`.
- [x] New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === "new-inline"`)
  RESULT: PASS — Live browser automation confirmed only one `Add a comment...` input is present while the inline comment composer is active.
#### Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)
- [x] `toCitationAuthors`: empty or whitespace-only author string maps to `{ family: "Unknown", given: "" }`
  RESULT: PASS — Code audit of `toCitationAuthors()` confirmed blank author strings map to `{ family: "Unknown", given: "" }`.
- [x] `toCitationAuthors`: author with comma (e.g. "Smith, John") splits on first comma — first part is family, second is given
  RESULT: PASS — Code audit confirmed comma-form names use the first split part as `family` and the second as `given`.
- [x] `toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given
  RESULT: PASS — Code audit confirmed multi-word author names without commas use the final token as `family` and the preceding tokens as `given`.
- [x] `toCitationAuthors`: single-word author name maps to `{ family: name, given: "" }`
  RESULT: PASS — Code audit confirmed the single-token branch returns `{ family: parts[0], given: "" }`.
- [x] `buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, "-")`)
  RESULT: PASS — Code audit confirmed the exact `stableKey` precedence and the `ref-research-${stableKey}` ID format.
- [x] Research reference sets `type: "article"`, CSL type `"article-journal"`, and `year` defaults to `0` when missing
  RESULT: PASS — Code audit confirmed `buildResearchReference()` sets `type: "article"`, CSL `type: "article-journal"`, and falls back to `year: 0`.
#### useStudioDocument Hook (`src/hooks/use-studio-document.ts`)
- [x] Default document title initialized as `"Untitled Document"`
  RESULT: PASS — The new `useStudioDocument` hook test verified the initial `docTitle` default is `Untitled Document`.
- [x] Document load failure without doc: error set to `"Failed to load or create document."`
  RESULT: PASS — The new hook test covers the `loadStudioDocument() -> null` path and confirmed the exact error string.
- [x] Document load network error: error set to `"Failed to load document. Please try again."` and logged as `"Failed to load document:"` to console
  RESULT: PASS — The new hook test covers a non-`DATABASE_URL` rejection and verified both the user-facing error string and the `console.error("Failed to load document:", err)` log path.
- [x] After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`
  RESULT: PASS — The new hook test verified `listUserProjects()` is called twice on the first successful load so newly created projects are picked up.
- [x] Title save timer cleaned up on unmount via `useEffect` cleanup
  RESULT: PASS — The new hook test set a pending title save, unmounted the hook, advanced timers, and verified `updateDocumentTitle()` was not called.
#### Guide Types (`src/types/guide.ts`)
- [x] `REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `["CARE"]`, `original_article` → `["CONSORT", "STROBE", "STARD", "TRIPOD"]`, `review_article` → `["PRISMA", "Narrative review best practices"]`, `meta_analysis` → `["PRISMA 2020", "Cochrane Handbook"]`
  RESULT: PASS — Code audit confirmed the exact `REPORTING_GUIDELINES` mapping, and the corrected `ralph-studio-053` test now verifies those populated document types directly.
- [x] `book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays
  RESULT: PASS — Code audit confirmed those three document types map to empty arrays, and `ralph-studio-053` was corrected to assert that real behavior instead of a stale “all types have guidelines” assumption.
#### Draft Types (`src/types/draft.ts`)
- [x] `PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`
  RESULT: PASS — Code audit confirmed `PrecisionEditAction` includes the full 14-action union exactly as listed.
- [x] `ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings
  RESULT: PASS — Code audit confirmed `ScholarRules` includes the expected dialect, voice, tense, sentence-length, term-preference, and `ghost_text` configuration fields.
#### Behavior Corrections (Pass 2)
- [x] **Section 1 check "264px"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.
  RESULT: PASS — Live DOM inspection and page audit confirmed the left sidebar uses `w-64`, which is 256 px.
- [x] **Section 6 check "Heading levels 1–4"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.
  RESULT: PASS — `tiptap-editor.tsx` config audit confirmed six heading levels, and the stale `feature-ralph-editor` test was corrected to match.
- [x] **Section 8 check "Messages render markdown content"**: Messages are rendered as **plain text** inside `<p className="whitespace-pre-wrap">`, not as rendered markdown.
  RESULT: PASS — Live chat-panel inspection and prior `spec-015` audit confirmed messages render as plain text paragraphs, not markdown HTML.
- [x] **Section 15 checks "Cmd+Opt+1-4" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show "Cmd+Opt+1-4" but the actual keyboard bindings are Cmd+Shift.
  RESULT: PASS — Keyboard-shortcut extension audit confirmed the real bindings are `Mod-Shift-1` through `Mod-Shift-4`.
- [x] **Section 15 check "Redo Ctrl+Y"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.
  RESULT: PASS — `KeyboardShortcutsDialog` and editor extension audit confirmed Redo is shown as `Cmd+Shift+Z`; there is no `Ctrl+Y` binding in the Studio editor.
- [x] **Section 7 "AI Summarize Selection"**: This is **NOT a slash command**. No entry named "AI Summarize Selection" or "Summarize" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.
  RESULT: PASS — Slash-command audit confirmed there is no slash-menu item named `Summarize`, while the page still contains a `summarize` AI action handler for non-slash callers.
- [x] **Section 7 "Find Sources"**: This is **NOT a slash command**. No entry named "Find Sources" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.
  RESULT: PASS — Slash-command audit confirmed `Find Sources` is not a slash entry; the page AI-action switch still supports `find-sources` from other UI entry points.
- [x] **Section 7 "Check Integrity"**: This is **NOT a slash command**. No entry named "Check Integrity" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.
  RESULT: PASS — Slash-command audit confirmed `Check Integrity` is not a slash entry; the page AI-action switch still supports `integrity-check` from other UI entry points.
- [x] **Section 7 "Add Citation"**: The actual slash command title is **"Cite"**, not "Add Citation".
  RESULT: PASS — Slash-command audit confirmed the academic citation command title is `Cite`.
- [x] **Section 7 "AI Continue Writing"**: The actual slash command title is **"Continue Writing"**, not "AI Continue Writing".
  RESULT: PASS — Slash-command audit confirmed the AI continuation command title is `Continue Writing`.
- [x] **Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.
  RESULT: PASS — Page audit confirmed the `IntegrityPanel` `getEditorText` prop uses `view.dom.innerText` first and the `getText({ blockSeparator: "\n\n" })` fallback second.
- [x] **Check #767 "no sources prop"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.
  RESULT: PASS — Page audit confirmed the `integritySources` memo is passed into `IntegrityPanel` and is assembled from the citation reference store data.
- [x] **Check #730 "Cmd+Shift+C emits scholarsync:open-citation-dialog"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: "insert-citation"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command "Cite" dispatches `scholarsync:open-citation-dialog`.
  RESULT: PASS — The first sentence is correct, but the rest is stale: `keyboard-shortcuts.ts` dispatches `scholarsync:editor-action` with `action: "insert-citation"`, and the Studio page now explicitly handles that action.
- [x] `/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: "insert-citation"` is never handled by the page listener.
  RESULT: PASS — This is stale. `KeyboardShortcutsDialog` is rendered, and the page listener now handles `insert-citation` by calling `openCitationDialogWithSelection()`; the broken-shortcut claim no longer applies.
