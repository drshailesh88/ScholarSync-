# presentation — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### List Page (`/presentation`)
- [x] PASS: **1.10** Loading state renders 3 skeleton cards
- [x] PASS: **1.11** Empty state shows "No presentations yet" message
- [x] PASS: **1.12** Empty state shows "Create Presentation" CTA button
- [x] PASS: **1.13** CTA navigates to `/presentation/new`
- [x] PASS: **1.14** Cards are clickable and navigate to `/presentation/[deckId]`

### New Presentation -- Blank Mode (`/presentation/new`)
- [x] PASS: **2.5** Audience option: General
- [x] PASS: **2.6** Audience option: Thesis Defense
- [x] PASS: **2.7** Audience option: Conference
- [x] PASS: **2.8** Audience option: Journal Club
- [x] PASS: **2.9** Audience option: Classroom
- [x] PASS: **2.10** Only one audience button is selectable at a time
- [x] PASS: **2.11** Theme picker is visible and functional
- [x] PASS: **2.12** "Create Blank Deck" button is present
- [x] PASS: **2.13** Submitting without title shows validation error
- [x] PASS: **2.14** Submitting with valid title creates deck and navigates to editor
- [x] PASS: **2.15** Toggle/link to switch to AI mode

### New Presentation -- AI GenerationWizard (`/presentation/new?mode=ai`)
#### Step 0 -- Select Source
- [x] PASS: **3.1** Step 0 header displays "Select Source"
- [x] PASS: **3.2** SourceSelector component renders
- [x] PASS: **3.3** Source option: Papers
- [x] PASS: **3.4** Source option: Document
- [x] PASS: **3.5** Source option: Text
- [x] PASS: **3.6** Source option: Deep Research
- [x] PASS: **3.7** Source option: References
- [x] PASS: **3.8** Source option: URL
- [x] PASS: **3.9** Source option: Import Deck
- [x] PASS: **3.42** Source option grid renders from SOURCE_OPTIONS array (`source-selector.tsx:121`, `:124`)
- [x] PASS: **3.43** Papers icon: BookOpen (`source-selector.tsx:68`)
- [x] PASS: **3.44** Document icon: FileText (`source-selector.tsx:74`)
- [x] PASS: **3.45** Text icon: TextT (`source-selector.tsx:80`)
- [x] PASS: **3.46** References icon: BookBookmark (`source-selector.tsx:86`)
- [x] PASS: **3.47** URL icon: Globe (`source-selector.tsx:92`)
- [x] PASS: **3.48** Import Deck icon: Presentation (`source-selector.tsx:98`)
- [x] PASS: **3.49** Selected source shows `border-brand bg-brand/5 text-brand` (`source-selector.tsx:127`)
- [x] PASS: **3.50** Papers path: comma-separated IDs input with placeholder "e.g., 1, 2, 3" (`source-selector.tsx:139`, `:142`, `:146`, `:153`)
- [x] PASS: **3.51** Papers helper: "Enter the IDs of papers from your library to generate slides from" (`source-selector.tsx:157`)
