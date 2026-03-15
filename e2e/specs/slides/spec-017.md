# slides — Spec 017

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Initial title slide is created as `title_slide` with a subtitle-style text block instead of using the slide `subtitle` field
- [x] PASS: Initial title slide body text is description content or fallback text `Click to add subtitle`
- [x] PASS: After the initial slide is created, the route redirects to `/slides/{deckId}` without waiting for AI generation
- [x] PASS: Background AI generation is only triggered when description text is non-empty
- [x] PASS: Background generation posts to `/api/slides/generate-stream` with `deckId`, `title`, `description`, `audienceType`, and `themeKey`
- [x] PASS: Background generation failures are swallowed and do not interrupt deck creation or navigation
- [x] PASS: New-deck creation failures show inline error text `Failed to create presentation. Please try again.` and return the wizard to the `theme` step
- [x] PASS: `/slides/[deckId]` rejects invalid numeric params locally and shows inline red text `Invalid deck ID`
- [x] PASS: Valid deck IDs mount `CollaborationProvider` with empty initial deck meta and then load the real deck through `SlidesWorkspace`
- [x] PASS: `SlidesWorkspace` shows a centered spinner and `Loading presentation...` while `loadDeck(deckId)` is running
- [x] PASS: `SlidesWorkspace` error state shows red text `Deck not found or access denied.` plus a `Back to presentations` link
- [x] PASS: Empty decks do not open directly into the slides editor; they first show `ModeSelectionScreen`
- [x] PASS: `ModeSelectionScreen` title is `How do you want to work?`
- [x] PASS: Mode-selection helper copy says `You can switch anytime with the toggle`
- [x] PASS: Mode-selection cards are `Slides Mode` and `Create Mode`
- [x] PASS: `Slides Mode` card helper text is `Click and build like PowerPoint`
- [x] PASS: `Create Mode` card helper text is `AI builds it, you refine`
- [x] PASS: Once a deck has at least one slide, mode selection is skipped on later loads
- [x] PASS: `SlidesWorkspace` wraps the editor in `ThemeProvider theme={themeConfig}`
- [x] PASS: Presenter mode in `SlidesWorkspace` filters out hidden slides before constructing the presenter slide list
- [x] PASS: Presenter start index is derived from the currently active non-hidden slide, falling back to 0
- [x] PASS: Presenter mode fallback is a full-screen black overlay with `Loading presenter mode...`
- [x] PASS: `SlidesModeLayout` registers global keyboard shortcuts on mount
- [x] PASS: `SlidesModeLayout` keeps export state local with a single `exporting` boolean shared across all export actions
- [x] PASS: `SlidesModeLayout` opens a handout-export dialog for PDF instead of exporting immediately
- [x] PASS: Current-slide PNG export looks up the canvas via `[data-testid="slide-ruler-surface"]`
- [x] PASS: Shift+Click on PNG export raises output scale from 2x to 3x
- [x] PASS: Current-slide PNG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.png`
- [x] PASS: Current-slide SVG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.svg`
- [x] PASS: Export-all-PNG renders hidden off-screen `SlideRendererV2` instances for every slide before zipping them
- [x] PASS: Export-all-PNG waits for two animation frames, `document.fonts.ready`, and an additional timeout before capture
- [x] PASS: Export-all-PNG downloads `{safeTitle}_slides_png.zip`
- [x] PASS: Export errors for PNG/SVG/ZIP are logged to console only
- [x] PASS: The slides layout always renders `PresenceBridgeSlot` above the workspace
- [x] PASS: Right-side panels in slides mode are controlled exclusively through `rightPanel` store state
