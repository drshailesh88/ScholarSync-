# slides — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Initial title slide is created as `title_slide` with a subtitle-style text block instead of using the slide `subtitle` field
- [ ] Initial title slide body text is description content or fallback text `Click to add subtitle`
- [ ] After the initial slide is created, the route redirects to `/slides/{deckId}` without waiting for AI generation
- [ ] Background AI generation is only triggered when description text is non-empty
- [ ] Background generation posts to `/api/slides/generate-stream` with `deckId`, `title`, `description`, `audienceType`, and `themeKey`
- [ ] Background generation failures are swallowed and do not interrupt deck creation or navigation
- [ ] New-deck creation failures show inline error text `Failed to create presentation. Please try again.` and return the wizard to the `theme` step
- [ ] `/slides/[deckId]` rejects invalid numeric params locally and shows inline red text `Invalid deck ID`
- [ ] Valid deck IDs mount `CollaborationProvider` with empty initial deck meta and then load the real deck through `SlidesWorkspace`
- [ ] `SlidesWorkspace` shows a centered spinner and `Loading presentation...` while `loadDeck(deckId)` is running
- [ ] `SlidesWorkspace` error state shows red text `Deck not found or access denied.` plus a `Back to presentations` link
- [ ] Empty decks do not open directly into the slides editor; they first show `ModeSelectionScreen`
- [ ] `ModeSelectionScreen` title is `How do you want to work?`
- [ ] Mode-selection helper copy says `You can switch anytime with the toggle`
- [ ] Mode-selection cards are `Slides Mode` and `Create Mode`
- [ ] `Slides Mode` card helper text is `Click and build like PowerPoint`
- [ ] `Create Mode` card helper text is `AI builds it, you refine`
- [ ] Once a deck has at least one slide, mode selection is skipped on later loads
- [ ] `SlidesWorkspace` wraps the editor in `ThemeProvider theme={themeConfig}`
- [ ] Presenter mode in `SlidesWorkspace` filters out hidden slides before constructing the presenter slide list
- [ ] Presenter start index is derived from the currently active non-hidden slide, falling back to 0
- [ ] Presenter mode fallback is a full-screen black overlay with `Loading presenter mode...`
- [ ] `SlidesModeLayout` registers global keyboard shortcuts on mount
- [ ] `SlidesModeLayout` keeps export state local with a single `exporting` boolean shared across all export actions
- [ ] `SlidesModeLayout` opens a handout-export dialog for PDF instead of exporting immediately
- [ ] Current-slide PNG export looks up the canvas via `[data-testid="slide-ruler-surface"]`
- [ ] Shift+Click on PNG export raises output scale from 2x to 3x
- [ ] Current-slide PNG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.png`
- [ ] Current-slide SVG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.svg`
- [ ] Export-all-PNG renders hidden off-screen `SlideRendererV2` instances for every slide before zipping them
- [ ] Export-all-PNG waits for two animation frames, `document.fonts.ready`, and an additional timeout before capture
- [ ] Export-all-PNG downloads `{safeTitle}_slides_png.zip`
- [ ] Export errors for PNG/SVG/ZIP are logged to console only
- [ ] The slides layout always renders `PresenceBridgeSlot` above the workspace
- [ ] Right-side panels in slides mode are controlled exclusively through `rightPanel` store state
