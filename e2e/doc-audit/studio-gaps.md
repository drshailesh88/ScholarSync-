# Studio — Feature Doc Gaps

**Original doc:** `STUDIO_FEATURES_TESTING.md`
**Original checkbox count:** 214
**After Codex pass 1:** 350
**After Claude Code pass 2:** 523 (173 new checks + 14 behavior corrections)
**Completeness estimate:** ~95% of Studio page.tsx import tree covered

## Pass 2 — New Coverage Areas

### Entirely New Components Documented
- **KeyboardShortcutsDialog** — modal showing 24 shortcuts across 4 categories (17 checks)
- **CommentSidebar** — inline commenting with threading, resolution, filtering (21 checks)
- **AcademicKeyboardShortcuts** — 13 additional keyboard bindings not in original section 15
- **Slash commands full list** — 19 commands across 4 categories with exact titles, descriptions, icons (18 checks)
- **SlashMenu UI** — positioning, styling, grouping, empty state (10 checks)
- **Chat API route** — Zod schema, error messages, rate limiting, system prompts (11 checks)

### Significant Corrections Found
- Left sidebar is 256px (w-64), not 264px
- Heading levels 1–6 supported, not 1–4
- Chat messages are plain text, not rendered markdown
- Heading shortcuts are Cmd+Shift+1-4, not Cmd+Opt+1-4
- Redo is Cmd+Shift+Z, not Ctrl+Y
- 5 slash commands in original doc do NOT exist (Summarize, Find Sources, Check Integrity renamed or absent)
- IntegrityPanel DOES receive `sources` prop (contradicts Codex check #767)
- `getEditorText` uses `view.dom.innerText` primary with `getText` fallback (not just `getText()`)
- Cmd+Shift+C keyboard shortcut dispatches unhandled event action

## Features in doc that DON'T EXIST in the app
- The title input does not show a placeholder when empty in the current implementation.
- Write/Learn mode does not persist across refreshes unless the URL explicitly includes `?mode=learn`.
- The Export dropdown does not currently dismiss on outside click.
- The right-panel `Research` tab does not render inline search results; it launches the external Research Sidebar.
- The right-panel `Checks` tab does not render the full `/compliance` page UI; it renders the compact `IntegrityPanel`.
- PDF export does not directly download a PDF from Studio; it opens returned HTML in a new window.
- Word export currently downloads a `.doc` file, not `.docx`.
- Chat history is not restored after page refresh in the current Studio route.
- Section 7 "AI Summarize Selection" is not a slash command — no such entry in `structuralCommands`.
- Section 7 "Find Sources" is not a slash command — triggered from SelectionToolbar, not slash menu.
- Section 7 "Check Integrity" is not a slash command — triggered from SelectionToolbar, not slash menu.
- Section 8 "Messages render markdown content" — messages are plain text in `<p>` tags.
