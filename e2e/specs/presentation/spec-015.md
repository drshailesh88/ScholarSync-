# presentation — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Social Export
#### Twitter Thread
- [x] PASS: **27.12** Count turns amber when > 260 characters (`social-export-modal.tsx:247`)
- [x] PASS: **27.13** Download .txt button for thread (`social-export-modal.tsx:383`, `:387`)
- [x] PASS: **27.14** Copy Thread button toggles to "Copied!" with Check icon for 2 seconds (`social-export-modal.tsx:390`, `:393`, `:394`)
#### Export Options
- [x] PASS: **27.15** "Show “Created with ScholarSync” branding" checkbox (`social-export-modal.tsx:278`, `:281`)
- [x] PASS: **27.16** Slide limit warning when format has maxSlides < total slides (`social-export-modal.tsx:283`)
- [x] PASS: **27.17** Preview grid shows "Preview (N slides)" header (`social-export-modal.tsx:292`)
- [x] PASS: **27.18** Preview uses SocialSlideRenderer component (`social-export-modal.tsx:329`, `:358`)
- [x] PASS: **27.19** Grid columns adapt: portrait formats use 2-3 cols, landscape use 2 (`social-export-modal.tsx:298`)
- [x] PASS: **27.20** Aspect ratio applied from format config (`social-export-modal.tsx:310`)
- [x] PASS: **27.21** Download button shows "Download Images" or "Download PDF" for LinkedIn carousel (`social-export-modal.tsx:412`)
- [x] PASS: **27.22** Exporting state disables download button and shows "Exporting..." with spinner (`social-export-modal.tsx:400`, `:403`, `:406`)
- [x] PASS: **27.23** Export errors logged to console (`social-export-modal.tsx:100`)
#### Social Slide Renderer
- [x] PASS: **27.24** Slide number indicator shown when totalSlides > 1 (`social-slide-renderer.tsx:95`)
- [x] PASS: **27.25** Vertical format uses larger padding/gaps than horizontal (`social-slide-renderer.tsx:88`, `:117-119`)
- [x] PASS: **27.26** Title conditionally rendered (`social-slide-renderer.tsx:124`)
- [x] PASS: **27.27** Subtitle conditionally rendered (`social-slide-renderer.tsx:141`)
- [x] PASS: **27.28** Bullet lists support ordered (numbered) and unordered (bullet) (`social-slide-renderer.tsx:199`)
- [x] PASS: **27.29** Excess bullets show `+N more...` text (`social-slide-renderer.tsx:204`, `:212`)
- [x] PASS: **27.30** Quote attribution conditionally shown (`social-slide-renderer.tsx:262`)
- [x] PASS: **27.31** Callout title conditionally shown (`social-slide-renderer.tsx:289`)
- [x] PASS: **27.32** Stat result interpretation conditionally shown (`social-slide-renderer.tsx:346`)
- [x] PASS: **27.33** Branding footer "Created with ScholarSync" conditionally shown (`social-slide-renderer.tsx:368`, `:387`)

### Reference Import Panel
#### Tabs
- [x] PASS: **28.1** Three import tabs: File Upload, Zotero, DOI Lookup (`reference-import-panel.tsx:299`, `:302`)
- [x] PASS: **28.2** Active tab shows white bg with shadow (`reference-import-panel.tsx:308`)
#### File Tab
- [x] PASS: **28.3** Drag-and-drop zone for file upload (`reference-import-panel.tsx:321`, `:329-330`)
- [x] PASS: **28.4** Drop zone highlights on drag: `border-brand bg-brand/5` (`reference-import-panel.tsx:333`)
- [x] PASS: **28.5** FileArrowUp icon changes color on drag (`reference-import-panel.tsx:338`, `:341`)
- [x] PASS: **28.6** Drop text: "Drop a .bib or .ris file here" (`reference-import-panel.tsx:346`)
- [x] PASS: **28.7** "or click to browse" sub-text (`reference-import-panel.tsx:349`)
- [x] PASS: **28.8** Format support text: "Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)" (`reference-import-panel.tsx:352`)
- [x] PASS: **28.9** Hidden file input for click-to-browse (`reference-import-panel.tsx:358`)
- [x] PASS: **28.10** Mendeley tip: "Tip: Export your Mendeley library as BibTeX, then upload here." (`reference-import-panel.tsx:363`)
- [x] PASS: **28.11** Parse errors show error message or fallback "Parse failed" (`reference-import-panel.tsx:100`)
- [x] PASS: **28.12** API: POST /api/references/parse (`reference-import-panel.tsx:75`)
#### Zotero Tab
- [x] PASS: **28.13** Instructions with link to zotero.org/settings/keys (`reference-import-panel.tsx:369`, `:372`, `:374`, `:379`)
