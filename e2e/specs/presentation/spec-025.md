# presentation — Spec 025

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)
- [x] PASS: Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`
- [x] PASS: Steps separated by `w-8 h-px bg-border` dividers
- [x] PASS: Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`
- [x] PASS: Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`
- [x] PASS: Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`
- [x] PASS: Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`
- [x] PASS: Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`
- [x] PASS: Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`
- [x] PASS: Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`
- [x] PASS: 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds
- [x] PASS: Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state
- [x] PASS: Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`
- [x] PASS: Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30
- [x] PASS: Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`
- [x] PASS: Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`
- [x] PASS: Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name
- [x] PASS: Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`
- [x] PASS: Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`
- [x] PASS: Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`
- [x] PASS: Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`
- [x] PASS: 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)
- [x] PASS: `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess
- [x] PASS: `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`
- [x] PASS: Bibliography: simulated 1500ms timeout after slides succeed
- [x] PASS: Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight
- [x] PASS: Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2
- [x] PASS: References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`
- [x] PASS: Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently
- [x] PASS: Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`
#### ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)
- [x] PASS: 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar
- [x] PASS: Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`
- [x] PASS: Switching tabs clears error
- [x] PASS: `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`
- [x] PASS: Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`
- [x] PASS: Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`
