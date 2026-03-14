# presentation — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)
#### Step 0 -- Select Source
- [ ] **3.52** Document path: numeric ID input with placeholder "Enter document ID" (`source-selector.tsx:162`, `:164`, `:168`, `:169`)
- [ ] **3.53** Document helper: "Enter the ID of a synthesis document to generate slides from" (`source-selector.tsx:173`)
- [ ] **3.54** Text path: textarea with placeholder "Paste your research content, abstract, or notes here..." and character count (`source-selector.tsx:178`, `:180`, `:183-184`, `:188`)
- [ ] **3.55** URL path: UrlSourceInput component with per-URL rows (`source-selector.tsx:192-193`)
- [ ] **3.56** URL helper: "Paste a URL to any article, blog post, or documentation page" (`source-selector.tsx:450`)
- [ ] **3.57** URL input placeholder: "https://example.com/article" (`source-selector.tsx:503`)
- [ ] **3.58** URL "Add" button disabled until valid URL (`source-selector.tsx:507-508`, `:511`, `:516`)
- [ ] **3.59** Each URL row shows Globe icon and fetched title/word count (`source-selector.tsx:453`, `:458`, `:461`, `:466`)
- [ ] **3.60** URL fetch error shown inline per-source (`source-selector.tsx:470`)
- [ ] **3.61** "Fetch Preview" button per unfetched URL (`source-selector.tsx:473`, `:478`)
- [ ] **3.62** Fetching state shows CircleNotch spinner (`source-selector.tsx:481`)
- [ ] **3.63** Remove URL button with Trash icon (`source-selector.tsx:483`, `:486`)
- [ ] **3.64** Max 3 URLs: input area replaced by "Maximum of 3 URLs reached" (`source-selector.tsx:492`, `:521`, `:522`)
- [ ] **3.65** Import Deck path: ImportDeckInput component with .pptx file upload (`source-selector.tsx:196-197`)
- [ ] **3.66** Import upload button: "Choose .pptx file" / "Parsing presentation..." while loading (`source-selector.tsx:311`, `:314-315`)
- [ ] **3.67** Import errors: WarningCircle icon with error text (`source-selector.tsx:318`, `:320`)
- [ ] **3.68** Password-protected PPTX error: "Password-protected files are not supported" (`source-selector.tsx:264`)
- [ ] **3.69** Import preview: shows deck title plus "N slides from {fileName}" with Clear button (`source-selector.tsx:325`, `:329-331`, `:337`, `:343`)
- [ ] **3.70** Import slide preview: up to 6 slides shown with "Slide N" label (`source-selector.tsx:348`, `:351`)
- [ ] **3.71** Import preview text truncated per slide (`source-selector.tsx:356`)
- [ ] **3.72** "Showing 6 of N imported slide previews." when > 6 slides (`source-selector.tsx:363`, `:365`)
- [ ] **3.73** Import warnings rendered when present (`source-selector.tsx:369`)
- [ ] **3.74** References path: shows selected count and "Clear & re-import" button (`source-selector.tsx:204`, `:206`, `:210`, `:213`, `:216`)
- [ ] **3.75** References selected summary renders per-reference with BookBookmark icon (`source-selector.tsx:220`, `:225`)
- [ ] **3.76** References fallback: opens ReferenceImportPanel when none selected (`source-selector.tsx:239`)
- [ ] **3.77** API: POST /api/slides/fetch-url for URL preview (`source-selector.tsx:406`)
#### Step 1 -- Template & Audience
- [ ] **3.11** Step 1 header displays "Template & Audience"
- [ ] **3.12** TemplateSelector component renders
- [ ] **3.23** Selecting audience and template advances to Step 2
#### Step 2 -- Configure
- [ ] **3.24** Step 2 header displays "Configure"
- [ ] **3.25** Title field is editable
- [ ] **3.26** Slide count field defaults to 12
- [ ] **3.27** Theme key selector is functional
- [ ] **3.28** Instructions textarea is available
- [ ] **3.29** Citation style: APA
