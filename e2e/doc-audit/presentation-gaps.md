# Presentation — Feature Doc Gaps

**Original doc:** `PRESENTATION_FEATURES_TESTING.md`
**Original checkbox count:** 232
**Features found in UI:** 347
**Features found in source code:** 438
**Missing from doc:** 206
**Completeness of original doc:** 53.0%

## Missing Features

### Detailed QA Coverage
- [ ] Real list-page loading, empty-state, deck-preview, and delete-confirm behavior, including the exact hover-only delete affordance and the distinction between route-level `loading.tsx` and in-page loading
- [ ] Blank presentation creation defaults, trimmed payloads, seeded first-slide behavior, disabled-state rules, and the lack of inline validation messaging on empty title
- [ ] AI generation wizard defaults and gating for references, URL sources, imported decks, deep-research sessions, template-driven audience changes, range-based slide count, and template-structure preview rendering
- [ ] Preprocess/generate request shaping, URL-content concatenation, streamed `0:` parsing, 500 ms auto-trigger generation, simulated bibliography timing, and retry branching
- [ ] Editor-shell behavior for redirect-on-missing-deck, optimistic slide add/delete/reorder, 800 ms autosave debounce, theme persistence through `updateDeck`, and the exact exclusivity rules for right-side slide-over panels
- [ ] Actual toolbar, sidebar, canvas, notes panel, AI tools dropdown, coach, agent, defense prep, comments, share, analytics, version history, presenter mode, and audience-view interactions
- [ ] Current export behavior, custom-theme integration through `ThemePicker`, and real route-level loading/error coverage for the presentation module

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
