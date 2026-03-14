# presentation — Spec 024

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### SlideRenderer — Layout Rendering (`slide-renderer.tsx`)
- [ ] `divider`: gradient uses `linear-gradient` from `gradientFrom ?? primaryColor` to `gradientTo ?? accentColor`; solid uses border-color background; dashed uses `border-top: 0.08em dashed`
#### ContentBlockEditor — Block Editing (`content-block-editor.tsx`)
- [ ] 3 categories: content (`text`, `bullets`, `quote`, `citation`), media (`image`, `chart`, `table`), academic (`math`, `diagram`, `code`, `callout`, `stat_result`, `bibliography`, `timeline`, `divider`)
- [ ] Content + media render as primary add-block row; academic hidden behind `More` toggle
- [ ] Expanded academic row has `border-l-2 border-brand/20` left accent
- [ ] Block labels: `Text`, `Bullets`, `Image`, `Chart`, `Table`, `Citation`, `Quote`, `Math`, `Diagram`, `Code`, `Callout`, `Stat`, `Bibliography`, `Timeline`, `Divider`
- [ ] Academic icons: MathOperations, TreeStructure, Code, Megaphone, ChartBar, BookOpen, Clock, Minus
- [ ] Controls appear on hover when block is active; move-up only when `i > 0`, move-down only when `i < blocks.length - 1`
- [ ] Delete button: `bg-red-500/10 border-red-500/20 text-red-500`; all controls use `stopPropagation`
- [ ] Moving a block updates `editingIndex` to the new position
- [ ] Selected block: `border-brand/50 bg-surface-raised/50`; unselected: `hover:border-border`
- [ ] `text`: style selector (Title/Subtitle/Body/Caption) only when active; `contentEditable` div commits on `blur`
- [ ] `bullets`: `Numbered` checkbox toggles ordered/unordered; per-item Trash only when active and `items.length > 1`; `+ Add item` appends `"New item"`
- [ ] `quote`: accent-color `border-l-2`; attribution placeholder `"Attribution"`
- [ ] `citation`: text + source + DOI (placeholder `"DOI (e.g., 10.1000/xyz123)"`) + Year (`w-16`) fields; DOI/Year only when active
- [ ] `image`: `next/image` at `max-h-32` with `unoptimized`; no-URL placeholder `border-2 border-dashed` at `h-20` showing `suggestion ?? "Image placeholder"`; alt text field only when active
- [ ] `chart`: read-only showing `"{chartType} chart: {title}"` and `"{labels.length} labels, {datasets.length} dataset(s)"`
- [ ] `table`: editable headers and cells via `contentEditable`; header `border-b-2` in `theme.primaryColor`
- [ ] `math`: header `"LaTeX Math"` with MathOperations icon; `"Display mode"` checkbox; textarea 2 rows placeholder `"e.g., E = mc^2 or \frac{a}{b}"`
- [ ] `diagram`: header `"Mermaid Diagram"` with TreeStructure icon; type selector (Flowchart/Sequence/Class Diagram/Gantt/Mind Map/Timeline/PRISMA Flow); textarea 4 rows
- [ ] `code`: header `"Code"` with Code icon; language input `w-20`; textarea 4 rows with `theme.codeBackground ?? "#1E1E2E"` bg and `#E2E8F0` text; placeholder `"// Your code here"`
- [ ] `callout`: type selector (Info/Warning/Success/Key Finding/Limitation/Methodology/Clinical Note); Megaphone icon; color-coded border + bg; title only when `block.data.title` truthy
- [ ] `stat_result`: label placeholder `"Metric name"`; value at `text-lg font-bold` in `theme.primaryColor`; CI placeholder `"95% CI"`; pValue placeholder `"p-value"`
- [ ] `bibliography`: read-only; style label `"Bibliography ({style.toUpperCase()})"` (e.g., `"Bibliography (APA)"`); entries numbered `[1]`, `[2]`, etc.
- [ ] `timeline`: accent-color `border-l-2`; status dots (completed=#22C55E, in_progress=primaryColor, default=#94A3B8); `+ Add milestone` appends `{ label: "New milestone", status: "upcoming" }`
- [ ] `divider`: three style buttons (solid/dashed/gradient); active button `border-brand text-brand`
- [ ] text: `"Enter text here"`, body | bullets: `["First point","Second point"]`, unordered | image: alt `"Image description"`, suggestion `"Add an image"`
- [ ] chart: bar, `"Chart Title"`, labels A/B/C, data 10/20/30 | table: 2 cols, 1 row | citation: `"Citation text"`, `"Author et al., 2024"`
- [ ] quote: `"Quote text"`, `"Author"` | math: `"E = mc^2"`, displayMode true | diagram: flowchart, default graph syntax
- [ ] code: `"// Your code here"`, python | callout: finding, `"Key Finding"`, `"Key finding or note"`
- [ ] stat_result: `"Primary Outcome"`, `"0.73"`, `"95% CI: 0.65-0.81"`, `"p < 0.001"` | bibliography: single APA entry
- [ ] timeline: Phase 1 (completed, Q1 2024) + Phase 2 (in_progress, Q2 2024) | divider: solid
- [ ] toggle: `"Click to expand"`, `"Hidden content goes here"`, defaultOpen false | embed: empty URL, generic, 16:9
- [ ] nested_card: `"Sub-section"`, one nested text block | infographic: process_flow, `"Infographic"`, one item
- [ ] Unknown types fall back to default text block
#### GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)
- [ ] Labels: `Select Source`, `Template & Audience`, `Configure`, `Generate`
