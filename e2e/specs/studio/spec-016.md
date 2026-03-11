# studio — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)
- [ ] Replies indented with `ml-4`
- [ ] Enter key submits comment or reply (without Shift); `e.preventDefault()` blocks newline
- [ ] Comments stored via `document-comments-local` localStorage functions — NOT database API
- [ ] Comment user ID is hardcoded as `"local-user"`
- [ ] Clicking a comment's quoted text calls `scrollToComment` which sets editor text selection to the comment's `textRangeStart`/`textRangeEnd` and scrolls into view
- [ ] New comment input at bottom of sidebar is hidden when inline comment form is active (`replyTo === "new-inline"`)
#### Research Reference Builder (`toCitationAuthors` + `buildResearchReference` in page.tsx)
- [ ] `toCitationAuthors`: empty or whitespace-only author string maps to `{ family: "Unknown", given: "" }`
- [ ] `toCitationAuthors`: author with comma (e.g. "Smith, John") splits on first comma — first part is family, second is given
- [ ] `toCitationAuthors`: author without comma splits on spaces — last word is family, rest is given
- [ ] `toCitationAuthors`: single-word author name maps to `{ family: name, given: "" }`
- [ ] `buildResearchReference` creates ID `ref-research-${stableKey}` where stableKey is trimmed DOI, trimmed PMID, or slugified title (`toLowerCase().replace(/[^a-z0-9]+/g, "-")`)
- [ ] Research reference sets `type: "article"`, CSL type `"article-journal"`, and `year` defaults to `0` when missing
#### useStudioDocument Hook (`src/hooks/use-studio-document.ts`)
- [ ] Default document title initialized as `"Untitled Document"`
- [ ] Document load failure without doc: error set to `"Failed to load or create document."`
- [ ] Document load network error: error set to `"Failed to load document. Please try again."` and logged as `"Failed to load document:"` to console
- [ ] After first load (`hasLoadedRef`), `listUserProjects` is re-fetched to catch projects created during `loadStudioDocument`
- [ ] Title save timer cleaned up on unmount via `useEffect` cleanup
#### Guide Types (`src/types/guide.ts`)
- [ ] `REPORTING_GUIDELINES` constant maps document types to guideline arrays: `case_report` → `["CARE"]`, `original_article` → `["CONSORT", "STROBE", "STARD", "TRIPOD"]`, `review_article` → `["PRISMA", "Narrative review best practices"]`, `meta_analysis` → `["PRISMA 2020", "Cochrane Handbook"]`
- [ ] `book_chapter`, `academic_draft`, and `letter` have empty reporting guidelines arrays
#### Draft Types (`src/types/draft.ts`)
- [ ] `PrecisionEditAction` type defines 14 precision edit actions: `rephrase`, `shorten`, `expand`, `make_academic`, `active_voice`, `simplify`, `strengthen_claim`, `add_transition`, `split_paragraph`, `merge_paragraphs`, `reorder`, `add_citation`, `flag_unsupported`, `check_guidelines`
- [ ] `ScholarRules` interface defines project-level AI configuration including `dialect` (British/American English), `voice` options, `tense` per section, `max_sentence_length`, `avoid_terms`, `prefer_terms`, and `ghost_text` settings
#### Behavior Corrections (Pass 2)
- [ ] **Section 1 check "264px"**: Left sidebar is `w-64` which is **256px** (16rem), not 264px.
- [ ] **Section 6 check "Heading levels 1–4"**: `StarterKit` is configured with `heading: { levels: [1, 2, 3, 4, 5, 6] }` — **6 heading levels**, not 4.
- [ ] **Section 8 check "Messages render markdown content"**: Messages are rendered as **plain text** inside `<p className="whitespace-pre-wrap">`, not as rendered markdown.
- [ ] **Section 15 checks "Cmd+Opt+1-4" for headings**: `AcademicKeyboardShortcuts` binds `Mod-Shift-1` through `Mod-Shift-4` (i.e., **Cmd+Shift+1-4**). The slash command metadata labels show "Cmd+Opt+1-4" but the actual keyboard bindings are Cmd+Shift.
- [ ] **Section 15 check "Redo Ctrl+Y"**: Redo is bound as **Cmd+Shift+Z** (from StarterKit and shown in KeyboardShortcutsDialog). No `Ctrl+Y` binding exists.
- [ ] **Section 7 "AI Summarize Selection"**: This is **NOT a slash command**. No entry named "AI Summarize Selection" or "Summarize" exists in `structuralCommands`. The `summarize` action exists in the page handler but is triggered from elsewhere (e.g., SelectionToolbar), not the slash menu.
- [ ] **Section 7 "Find Sources"**: This is **NOT a slash command**. No entry named "Find Sources" exists in `structuralCommands`. The `find-sources` action is triggered from elsewhere, not the slash menu.
- [ ] **Section 7 "Check Integrity"**: This is **NOT a slash command**. No entry named "Check Integrity" exists in `structuralCommands`. The `integrity-check` action is triggered from elsewhere, not the slash menu.
- [ ] **Section 7 "Add Citation"**: The actual slash command title is **"Cite"**, not "Add Citation".
- [ ] **Section 7 "AI Continue Writing"**: The actual slash command title is **"Continue Writing"**, not "AI Continue Writing".
- [ ] **Check #759 `getEditorText`**: Actual code is `() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""` — uses `view.dom.innerText` as primary with `getText` as fallback, not just `getText()`.
- [ ] **Check #767 "no sources prop"**: IntegrityPanel IS passed `sources={integritySources}` — a computed array assembled from `referenceNumberMap` with title, doi, pmid, authors (as strings), and year for each reference.
- [ ] **Check #730 "Cmd+Shift+C emits scholarsync:open-citation-dialog"**: The keyboard-shortcuts.ts extension dispatches `scholarsync:editor-action` with `action: "insert-citation"`, NOT `scholarsync:open-citation-dialog`. The page's `scholarsync:editor-action` listener does not handle `insert-citation`. Only the slash command "Cite" dispatches `scholarsync:open-citation-dialog`.
- [ ] `/studio` renders `KeyboardShortcutsDialog`, but `Cmd+Shift+C` is still a broken route-level shortcut because `action: "insert-citation"` is never handled by the page listener.
