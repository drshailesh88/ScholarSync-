# Slides — Feature Doc Gaps

**Original doc:** `SLIDES_FEATURES_TESTING.md`
**Original checkbox count:** 383
**Features found in UI:** 454
**Features found in source code:** 536
**Missing from doc:** 153
**Completeness of original doc:** 71.5%

## Missing Features

### Detailed QA Coverage
- [ ] Real `/slides` list-page behavior for loading, empty state, inline PPTX import workflow, preview/warning limits, import progress chips, and the exact create/import CTA labels
- [ ] Real `/slides/new` step content, including the exact audience labels, first-eight-theme restriction, inline generating state, initial title-slide structure, and the fact that background AI generation is conditional on non-empty description
- [ ] Route-level deck loading, invalid-deck handling, mode-selection behavior for empty decks, and presenter-mode wiring in `SlidesWorkspace`
- [ ] Toolbar-level behavior for save indicator states, hover-based view/export menus, bulk image generation progress, share-state mismatch, and handout PDF export dialog flow
- [ ] Filmstrip context-menu specifics, regenerate dialog targeting, off-screen slide export rendering, sanitized filenames, and hidden-slide overlay behavior
- [ ] Speaker-notes default collapse state, properties-panel defaults, accessibility-panel scoring, and other store-backed UI states that the original checklist did not cover concretely

## Features in doc that DON'T EXIST in the app
- Deck cards on `/slides` do not show real slide thumbnails; they use a generic `Presentation` icon placeholder.
- PPTX import does not open a modal dialog; it renders as an inline import panel inside the `/slides` page.
- `/slides/new` does not always generate remaining slides in the background; that background request only runs when description text is non-empty.
- `/slides/new` does not persist the chosen theme in `createDeck`; the theme key is only used by the optional background generation request.
- `/slides/[deckId]` with an invalid parameter does not redirect; it shows inline `Invalid deck ID` text.
- Empty decks do not open directly into the three-panel workspace; they first show the mode-selection screen.
- The visible filmstrip in slides mode is `w-48`, not the wider size implied by the original checklist.
- The slides toolbar does include a visible save-status indicator; it is not absent.
- The slides toolbar `Share` button currently only flips store state; `SlidesModeLayout` does not render a share panel from that state.
- PDF export in slides mode is a configurable handout dialog, not a one-click immediate download.
- Toolbar export/view menus are hover-based in the current UI, not click-to-open menus.
