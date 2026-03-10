# Presentation — Feature Doc Gaps

**Original doc:** `PRESENTATION_FEATURES_TESTING.md`
**Original checkbox count:** 232
**After Codex pass 1:** 774
**After Claude Code pass 2:** 942 (168 new checks)
**Features found in source code:** 438
**Remaining undocumented:** ~38
**Completeness:** ~96%

## Missing Features (remaining after pass 2)

### Mostly Covered — minor gaps remain
- [ ] Source-selector.tsx internal grid layout and per-source-type input rendering (papers selector, document selector, raw text area)
- [ ] Template-selector.tsx card grid, No Template card, default slide count / estimated duration metadata
- [ ] Speaker-notes-panel.tsx layout and interaction details
- [ ] Recordings-panel.tsx MediaRecorder integration, recording library, and playback controls
- [ ] Custom-theme-builder color pickers and font selectors (partially covered in section 26)

### Previously Missing — now covered by pass 2
- ~~AI generation wizard defaults and gating~~ → GenerationWizard section
- ~~Preprocess/generate request shaping, streaming, retry~~ → Preprocessing section
- ~~Presenter mode transitions, timer, keyboard, broadcast~~ → PresenterMode section
- ~~Slide renderer layout rendering, chart types, academic blocks~~ → SlideRenderer section
- ~~Content block editor categories, controls, defaults~~ → ContentBlockEditor section
- ~~Reference import panel tabs, file upload, Zotero, DOI~~ → ReferenceImportPanel section

## Features in doc that DON'T EXIST in the app
- The editor does not show a visible saved/saving/unsaved indicator even though it debounces writes in code.
- Invalid or inaccessible deck IDs redirect to `/presentation`; the editor does not render a dedicated in-place error state for that case.
- The page component does not consume `slides-store.ts` for deck editing; most of the store-level fields listed in the original doc are not wired into this route.
- Blank-mode submission does not show an inline validation error when the title is empty; the primary action is simply disabled.
- Step 0 of the AI wizard does not auto-advance when a source card is selected; the user must still click `Next`.
- AI generation success does not auto-redirect to the editor; it waits for the user to click `Open Presentation`.
- Agent-panel undo does not actually restore the previous slide snapshot in the current client implementation.
- Version comparison is not implemented inside the editor; compare currently just closes the panel.
- `Social Export` exists in `SlideToolbar`, but it is not reachable from this editor because the required `socialSlides` prop is never passed.
- Share-panel failures, export failures, and list-page load failures do not surface inline UI errors in the current implementation.
