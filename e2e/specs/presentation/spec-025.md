# presentation — Spec 025

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)
- [ ] Completed steps show `Check` icon; current step: `bg-brand/10 text-brand border-brand`; future: `bg-surface-raised text-ink-muted`
- [ ] Steps separated by `w-8 h-px bg-border` dividers
- [ ] Heading `"Select Source Material"` with subheading `"Choose where to generate your presentation from"`
- [ ] Deep Research: full-width card with `Sparkle` icon, text `"From Deep Research"`, description `"Import findings from a Deep Research session"`
- [ ] Deep Research input: `type="number"` placeholder `"Deep Research session ID"`; only renders when `sourceType === "deep_research"`
- [ ] Text validation: `rawText.trim().length > 50`; URL validation: at least one fetched source; Import deck: `importedDeck != null`
- [ ] Disabled Next: `bg-surface-raised text-ink-muted cursor-not-allowed`
- [ ] Heading `"Template & Audience"` sub `"Choose a presentation template and target audience"`
- [ ] Template label: `"Presentation Template"` with `"(optional)"`; uses `TemplateSelector` with `onAudienceChange`
- [ ] 10 audience pill buttons: General, Thesis Defense, Conference, Journal Club, Classroom, Grant Presentation, Poster Session, Systematic Review, Patient Case, Grand Rounds
- [ ] Selected audience: `border-brand bg-brand/5 text-brand`; Next always enabled; Back preserves source state
- [ ] Heading `"Configure Presentation"` sub `"Set title, theme, and generation preferences"`
- [ ] Title placeholder `"Presentation title"` with `autoFocus`; slide count label `"Target Slide Count: {slideCount}"` range min=5 max=30
- [ ] Citation style label `"Citation Style"` as pill buttons; theme label `"Theme"` in `grid grid-cols-7 gap-2`
- [ ] Theme tiles: `aspect-video` with name at `text-[8px] font-bold`; selected: `border-brand ring-1 ring-brand/30`
- [ ] Structure preview toggle: `"Template Structure Preview ({name})"` with CaretUp/CaretDown; `max-h-64 overflow-y-auto`; shows numeric slot index, title, (optional), guidance (line-clamp-1), layout name
- [ ] Instructions label `"Additional Instructions"` `"(optional)"`; placeholder `"e.g., Focus on methodology, include more charts..."`; 3 rows; empty sent as `undefined`
- [ ] Generate button: `Sparkle` icon + `"Generate"`; disabled when `title.trim().length === 0`
- [ ] Heading `"Generating Presentation"` sub `"AI is creating your slide deck"`
- [ ] Progress rows: `"Preprocessing content"`, `"Generating slides"`, `"Generating bibliography"`
- [ ] 4 states: pending (empty circle), loading (CircleNotch brand spin), done (green Check bold), error (red Warning)
- [ ] `handleStartGeneration` calls `setStep(3)` then `handlePreprocess()` — step changes before preprocess
- [ ] `AutoTrigger`: 500ms setTimeout fires `handleGenerate` when `preprocessedData && !generating && !generationResult && !error`
- [ ] Bibliography: simulated 1500ms timeout after slides succeed
- [ ] Success: `"Generated {slideCount} slides successfully"` + optional `" using the {name} template"`; green `bg-green-500/10`; CTA `"Open Presentation"` with ArrowRight
- [ ] Error: red `bg-red-500/10` with Warning; Retry reruns preprocess if empty else handleGenerate; Back resets error+data+result to step 2
- [ ] References → `"text"` + `formatReferencesAsContent`; URL → `"text"` + fetch `/api/slides/fetch-url` per source + concatenate `"--- Source: {title} ---"`; Import → `"text"` + `importedDeck.sourceText`
- [ ] Stream: `getReader()` + `TextDecoder`; only `"0:"` prefixed lines parsed via `JSON.parse`; malformed skipped silently
- [ ] Generate request sends: `preprocessedData`, `title`, `audienceType`, `slideCount`, `themeKey`, optional `additionalInstructions`, optional `templateId`, `citationStyle`
#### ReferenceImportPanel — Reference Import (`reference-import-panel.tsx`)
- [ ] 3 tabs: `File Upload`, `Zotero`, `DOI Lookup` in `bg-surface-raised rounded-xl` bar
- [ ] Active tab: `bg-white text-ink shadow-sm` / dark `bg-surface text-ink`; inactive: `text-ink-muted hover:text-ink`
- [ ] Switching tabs clears error
- [ ] `FileArrowUp` icon size 28; text: `"Drop a .bib or .ris file here"` (bold) / `"or click to browse"`
- [ ] Format text: `"Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)"`; accepts `.bib,.ris,.json,.txt`
- [ ] Tip: `"Tip: Export your Mendeley library as BibTeX, then upload here."`
