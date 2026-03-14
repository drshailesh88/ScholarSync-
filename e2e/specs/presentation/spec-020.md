# presentation — Spec 020

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
- [ ] Slide thumbnails are rendered through `SlideRenderer` at `scale={0.35}` and wrapped in `pointer-events-none`
- [ ] Drag-reordering visual feedback lowers opacity for the dragged slide and adds a brand ring on the hovered drop target
- [ ] Delete-slide affordance only appears on hover and only when the deck contains more than one slide
- [ ] Sidebar comment badges show total comment count and switch color based on unresolved count
- [ ] Sidebar slide label format is `{index}. {title || "Untitled"}`
- [ ] `SlideCanvas` empty state copy is `Select a slide to start editing`
- [ ] Preview mode shows only the rendered slide inside a centered `max-w-3xl` frame
- [ ] Edit mode shows both the rendered slide preview and a form/editor card beneath it
- [ ] Subtitle input is only rendered for `title_slide`, `title_content`, and `section_header` layouts
- [ ] Content-block editing is delegated entirely to `ContentBlockEditor`
- [ ] `SpeakerNotesPanel` is always mounted below the slide canvas within the center column
- [ ] Toolbar edit toggle label flips between `Editing` and `Preview`
- [ ] Toolbar edit toggle icon flips between `PencilSimple` and `Eye`
- [ ] Toolbar comments button shows an unresolved-count badge only when the count is greater than zero
- [ ] Toolbar `PDF` export button renders only because the editor passes `onExportPdf`
- [ ] `Export PPTX` and `PDF` share the same `exporting` disabled state
- [ ] `Export PPTX` changes its label to `Exporting...` while either export path is active
- [ ] `PDF` button text does not change while exporting; only its disabled styling updates
- [ ] Toolbar `Social Export` button is not rendered in the current editor because no `socialSlides` prop is passed
- [ ] Export PPTX posts to `/api/export/pptx` using the current local slide state
- [ ] Export PDF posts to `/api/export/presentation-pdf` using the current local slide state
- [ ] Successful PPTX export downloads `{deck title}.pptx` without title sanitization
- [ ] Successful PDF export downloads `{deck title}_handout.pdf` without title sanitization at the editor layer
- [ ] Export failures are logged to console only and do not show inline error UI
- [ ] Opening AI Agent closes Defense Prep, Analytics, and Comments if they were open
- [ ] Opening Defense Prep closes AI Agent, Analytics, and Comments if they were open
- [ ] Opening Analytics closes Comments, AI Agent, and Defense Prep if they were open
- [ ] Opening Comments closes Analytics, AI Agent, Defense Prep, and Version History if they were open
- [ ] Opening Version History closes Comments, Analytics, AI Agent, and Defense Prep if they were open
- [ ] Comments, Analytics, Agent, Defense Prep, and Version History slide-over panels each mount as a `w-80` right column
- [ ] `AiToolsDropdown` disables all actions while one AI slide edit is in progress
- [ ] AI slide tools endpoint payload includes `title`, `subtitle`, `contentBlocks`, and `speakerNotes` for the active slide
- [ ] Successful AI slide edits may update both `contentBlocks` and `speakerNotes`
- [ ] `AiToolsDropdown` shows one inline red error line when an action fails
- [ ] `CoachPanel` run button is disabled when the deck has zero slides
