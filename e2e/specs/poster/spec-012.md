# poster — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### Source Card Descriptions
- [x] PASS: "From Papers" source card description reads "Select papers from your library"
- [x] PASS: "From Document" source card description reads "Use a synthesis document"
- [x] PASS: "From Text" source card description reads "Paste content directly"
- [x] PASS: "Reference Library" source card description reads "Import from Zotero, BibTeX, DOI"
- [x] PASS: "From URL" source card description reads "Paste a link to any web page"
- [x] PASS: "Import Deck" source card description reads "Upload an existing PowerPoint"
- [x] PASS: Source card descriptions render at `text-[10px] opacity-60` below the label
#### Deep Research Card Details
- [x] PASS: Deep Research card description text reads "Import findings from a Deep Research session"
- [x] PASS: Deep Research active state: icon and label text change to `text-brand`
- [x] PASS: Deep Research inactive state: icon uses `text-ink-muted`, label uses `text-ink`
#### Wizard Field Labels
- [x] PASS: Step 1 "Poster Size" field label renders as `text-sm font-medium text-ink`
- [x] PASS: Step 1 "Grid Layout" field label renders as `text-sm font-medium text-ink`
- [x] PASS: Step 1 "Poster Template" label appends `(optional)` in `text-ink-muted font-normal`
- [x] PASS: Step 2 "Theme" field label renders as `text-sm font-medium text-ink`
- [x] PASS: Step 2 "Additional Instructions" label appends `(optional)` in `text-ink-muted font-normal`
- [x] PASS: Step 2 "Poster Title" field label renders as `text-sm font-medium text-ink`
#### Poster Size Exact Labels
- [x] PASS: `a0_portrait` label string is "A0 Portrait (841 x 1189 mm)"
- [x] PASS: `a0_landscape` label string is "A0 Landscape (1189 x 841 mm)"
- [x] PASS: `a1_portrait` label string is "A1 Portrait (594 x 841 mm)"
- [x] PASS: `a1_landscape` label string is "A1 Landscape (841 x 594 mm)"
- [x] PASS: `48x36` label string is "48 x 36 inches (US Standard)"
- [x] PASS: `36x24` label string is "36 x 24 inches (Small)"
#### Grid Layout Exact Labels & Descriptions
- [x] PASS: `three_column` label is "Three Column" with description "Classic 3-column academic poster layout"
- [x] PASS: `two_column_wide` label is "Two Column (Wide)" with description "Two wide columns for text-heavy posters"
- [x] PASS: `four_column` label is "Four Column" with description "Four narrow columns for data-dense posters"
- [x] PASS: `two_plus_one` label is "2 + 1 Split" with description "Two narrow columns + one wide results column"
#### Template Exact Descriptions
- [x] PASS: Clinical Research template description is "Standard IMRAD poster for clinical studies with emphasis on results"
- [x] PASS: Basic Science template description is "Lab research poster with detailed methodology and data visualization"
- [x] PASS: Systematic Review template description is "PRISMA-compliant poster for systematic reviews and meta-analyses"
- [x] PASS: Engineering/CS template description is "Technical poster for engineering and computer science research"
- [x] PASS: Engineering/CS template key in `POSTER_TEMPLATES` is `engineering` (not `engineering_cs`)
#### Step Indicator Rendering Details
- [x] PASS: Non-completed steps display their 1-based number (`i + 1`) inside the circle
- [x] PASS: Future step circles use `bg-surface-raised text-ink-muted border border-border`
- [x] PASS: Current step circle uses `bg-brand/10 text-brand border border-brand`
- [x] PASS: Steps are separated by `w-8 h-px bg-border mx-1` horizontal divider lines
