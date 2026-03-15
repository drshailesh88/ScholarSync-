# presentation — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [x] PASS: Slide thumbnails are rendered through `SlideRenderer` at `scale={0.35}` and wrapped in `pointer-events-none`
- [x] PASS: Drag-reordering visual feedback lowers opacity for the dragged slide and adds a brand ring on the hovered drop target
- [x] PASS: Delete-slide affordance only appears on hover and only when the deck contains more than one slide
- [x] PASS: Sidebar comment badges show total comment count and switch color based on unresolved count
- [x] PASS: Sidebar slide label format is `{index}. {title || "Untitled"}`
- [x] PASS: `SlideCanvas` empty state copy is `Select a slide to start editing`
- [x] PASS: Preview mode shows only the rendered slide inside a centered `max-w-3xl` frame
- [x] PASS: Edit mode shows both the rendered slide preview and a form/editor card beneath it
- [x] PASS: Subtitle input is only rendered for `title_slide`, `title_content`, and `section_header` layouts
- [x] PASS: Content-block editing is delegated entirely to `ContentBlockEditor`
- [x] PASS: `SpeakerNotesPanel` is always mounted below the slide canvas within the center column
- [x] PASS: Toolbar edit toggle label flips between `Editing` and `Preview`
- [x] PASS: Toolbar edit toggle icon flips between `PencilSimple` and `Eye`
- [x] PASS: Toolbar comments button shows an unresolved-count badge only when the count is greater than zero
- [x] PASS: Toolbar `PDF` export button renders only because the editor passes `onExportPdf`
- [x] PASS: `Export PPTX` and `PDF` share the same `exporting` disabled state
- [x] PASS: `Export PPTX` changes its label to `Exporting...` while either export path is active
- [x] PASS: `PDF` button text does not change while exporting; only its disabled styling updates
- [x] PASS: Toolbar `Social Export` button is not rendered in the current editor because no `socialSlides` prop is passed
- [x] PASS: Export PPTX posts to `/api/export/pptx` using the current local slide state
- [x] PASS: Export PDF posts to `/api/export/presentation-pdf` using the current local slide state
- [x] PASS: Successful PPTX export downloads `{deck title}.pptx` without title sanitization
- [x] PASS: Successful PDF export downloads `{deck title}_handout.pdf` without title sanitization at the editor layer
- [x] PASS: Export failures are logged to console only and do not show inline error UI
- [x] PASS: Opening AI Agent closes Defense Prep, Analytics, and Comments if they were open
- [x] PASS: Opening Defense Prep closes AI Agent, Analytics, and Comments if they were open
- [x] PASS: Opening Analytics closes Comments, AI Agent, and Defense Prep if they were open
- [x] PASS: Opening Comments closes Analytics, AI Agent, Defense Prep, and Version History if they were open
- [x] PASS: Opening Version History closes Comments, Analytics, AI Agent, and Defense Prep if they were open
- [x] PASS: Comments, Analytics, Agent, Defense Prep, and Version History slide-over panels each mount as a `w-80` right column
- [x] PASS: `AiToolsDropdown` disables all actions while one AI slide edit is in progress
- [x] PASS: AI slide tools endpoint payload includes `title`, `subtitle`, `contentBlocks`, and `speakerNotes` for the active slide
- [x] PASS: Successful AI slide edits may update both `contentBlocks` and `speakerNotes`
- [x] PASS: `AiToolsDropdown` shows one inline red error line when an action fails
- [x] PASS: `CoachPanel` run button is disabled when the deck has zero slides
