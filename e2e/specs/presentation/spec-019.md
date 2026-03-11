# presentation — Spec 019

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [ ] Step 3 renders three progress rows: `Preprocessing content`, `Generating slides`, and `Generating bibliography`
- [ ] `Generating bibliography` is a simulated client-side step driven by a 1500 ms timeout after slide generation succeeds
- [ ] For `references` source, preprocess rewrites the effective source type to `text` and sends `formatReferencesAsContent(selectedReferences)` as `rawText`
- [ ] For `url` source, preprocess fetches full content from `/api/slides/fetch-url` for each fetched source before calling `/api/presentations/preprocess`
- [ ] URL preprocess concatenates fetched sources into `--- Source: {title} ---` text sections
- [ ] For imported decks, preprocess rewrites the effective source type to `text` and sends `importedDeck.sourceText`
- [ ] Streaming preprocess parsing appends only lines prefixed with `0:`
- [ ] Malformed streamed chunks are skipped without failing the entire preprocess step
- [ ] Step-3 auto-trigger waits 500 ms after preprocess success before starting generation
- [ ] Generation request sends `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, and `citationStyle`
- [ ] Step-3 success banner reads `Generated {slideCount} slides successfully`
- [ ] Step-3 success banner appends `using the {template} template` only when a template is selected
- [ ] Step-3 success CTA label is `Open Presentation`
- [ ] Step-3 error path shows a single inline red banner with the error message and a `Retry` button
- [ ] Retry reruns preprocess only when `preprocessedData` is still empty; otherwise it jumps straight to `handleGenerate()`
- [ ] Step-3 `Back` from the error state resets `error`, `preprocessedData`, and `generationResult`
- [ ] AI wizard does not show a local spinner on the step-2 `Generate` button; progress only becomes visible on step 3
- [ ] Deck editor starts with `isEditing = true`, `exporting = false`, and all slide-over panels closed
- [ ] Editor loads deck data via `getDeck(deckId)` and redirects to `/presentation` on null response or thrown error
- [ ] Initial active slide is always the first returned slide when the deck has at least one slide
- [ ] Editor keeps local `themeKey` and `themeConfig` in sync with the loaded deck theme
- [ ] Autosave for slide title/subtitle/content/speaker notes is debounced by 800 ms through `debouncedSaveSlide`
- [ ] Local slide state updates happen optimistically before `updateSlideAction` is called
- [ ] Debounced save does not expose any visible save-status UI in the editor shell
- [ ] Adding a slide creates a `title_content` slide titled `New Slide`
- [ ] New slide creation seeds content with one body text block: `Click to add content`
- [ ] Adding a slide sets the newly created slide as the active slide
- [ ] Deleting the active slide automatically selects the first remaining slide, or clears selection if no slides remain
- [ ] Slide reordering is optimistic and persists by calling `reorderSlides(deckId, slideIds)`
- [ ] Theme changes in the editor immediately call `updateDeck(deckId, { theme, themeConfig })`
- [ ] Layout changes are applied only to the active slide
- [ ] The editor back link in the left rail header is icon-only and returns to `/presentation`
- [ ] Left rail title is truncated to `max-w-[160px]`
- [ ] `SlideOutlineSidebar` width is fixed by `w-64` on the component root
- [ ] Sidebar header shows live slide count and a plus-icon add button with title `Add slide`
