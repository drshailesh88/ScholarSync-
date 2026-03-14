# presentation — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Content Block Types (20+)
#### Content Block Editor -- Inline Editing UI
- [ ] **9.32** Delete block button with Trash icon (`content-block-editor.tsx:117`, `:120`)
- [ ] **9.33** Add block menu shows content categories (BLOCK_CATEGORIES.content) (`content-block-editor.tsx:135`)
- [ ] **9.34** Add block menu shows media categories (BLOCK_CATEGORIES.media) (`content-block-editor.tsx:145`)
- [ ] **9.35** "More" toggle button expands academic block categories (`content-block-editor.tsx:156`, `:159`, `:170`)
- [ ] **9.36** Academic categories visible when showAllBlocks=true (`content-block-editor.tsx:172`)
- [ ] **9.37** Style selector dropdown (Title/Subtitle/Body/Caption) shown when active (`content-block-editor.tsx:204`, `:210-213`)
- [ ] **9.38** Text content editable via EditableText component (`content-block-editor.tsx:218`)
- [ ] **9.39** "Numbered" checkbox to toggle ordered/unordered (`content-block-editor.tsx:232`, `:237`, `:240`)
- [ ] **9.40** Each bullet item editable via EditableText (`content-block-editor.tsx:244`, `:251`)
- [ ] **9.41** Remove bullet button shown when active and items > 1 (`content-block-editor.tsx:258`, `:260`)
- [ ] **9.42** "+ Add item" button to append new bullet (`content-block-editor.tsx:271`, `:273`, `:276`)
- [ ] **9.43** Quote text editable via EditableText (`content-block-editor.tsx:288`)
- [ ] **9.44** Attribution field with placeholder "Attribution" (`content-block-editor.tsx:291`, `:293`, `:295`)
- [ ] **9.45** Citation text editable (`content-block-editor.tsx:303`, `:305`)
- [ ] **9.46** Source field with placeholder "Source" (`content-block-editor.tsx:308`, `:310`, `:312`)
- [ ] **9.47** DOI field with placeholder "DOI (e.g., 10.1000/xyz123)" (`content-block-editor.tsx:318`, `:320`)
- [ ] **9.48** Year field with placeholder "Year" (`content-block-editor.tsx:324`, `:326`)
- [ ] **9.49** Image preview when URL exists (`content-block-editor.tsx:336`)
- [ ] **9.50** Alt text field with placeholder "Alt text" shown when active (`content-block-editor.tsx:343-344`, `:346`, `:348`)
- [ ] **9.51** Header cells editable via EditableText when active (`content-block-editor.tsx:370`, `:372`, `:375`)
- [ ] **9.52** Body cells editable via EditableText when active (`content-block-editor.tsx:388`, `:390`, `:392`, `:395`)
- [ ] **9.53** "LaTeX Math" label with MathOperations icon (`content-block-editor.tsx:420`, `:421`)
- [ ] **9.54** "Display mode" checkbox when active (`content-block-editor.tsx:422`, `:427`, `:430`)
- [ ] **9.55** Expression textarea with placeholder `e.g., E = mc^2 or \frac{a}{b}` (`content-block-editor.tsx:436`, `:439`)
- [ ] **9.56** Caption field with placeholder "Caption" shown when caption exists and active (`content-block-editor.tsx:441`, `:444`, `:446`)
- [ ] **9.57** "Mermaid Diagram" label with TreeStructure icon (`content-block-editor.tsx:456`, `:457`)
- [ ] **9.58** Diagram type selector with options: Flowchart, Sequence, Class Diagram, Gantt, Mind Map, Timeline, PRISMA Flow (`content-block-editor.tsx:458`, `:461`, `:464-470`)
- [ ] **9.59** Syntax textarea with placeholder (`content-block-editor.tsx:476`, `:479`)
- [ ] **9.60** "Code" label with Code icon (`content-block-editor.tsx:488`, `:489`)
- [ ] **9.61** Language input with placeholder "Language" when active (`content-block-editor.tsx:490`, `:493`, `:495`)
- [ ] **9.62** Code textarea with placeholder "// Your code here" (`content-block-editor.tsx:501`, `:505`)
- [ ] **9.63** Style selector dropdown with options: Info, Warning, Success, Key Finding, Limitation, Methodology, Clinical Note (`content-block-editor.tsx:521`, `:524`, `:527-533`)
- [ ] **9.64** Callout title editable when block has title (`content-block-editor.tsx:536`, `:537`, `:539`)
- [ ] **9.65** Callout body text editable (`content-block-editor.tsx:544`, `:546`)
- [ ] **9.66** Label field with placeholder "Metric name" (`content-block-editor.tsx:557`, `:559`, `:561`)
