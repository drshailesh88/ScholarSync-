# presentation — Spec 024

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### SlideRenderer — Layout Rendering (`slide-renderer.tsx`)
- [x] PASS: `divider`: gradient uses `linear-gradient` from `gradientFrom ?? primaryColor` to `gradientTo ?? accentColor`; solid uses border-color background; dashed uses `border-top: 0.08em dashed`
#### ContentBlockEditor — Block Editing (`content-block-editor.tsx`)
- [x] PASS: 3 categories: content (`text`, `bullets`, `quote`, `citation`), media (`image`, `chart`, `table`), academic (`math`, `diagram`, `code`, `callout`, `stat_result`, `bibliography`, `timeline`, `divider`)
- [x] PASS: Content + media render as primary add-block row; academic hidden behind `More` toggle
- [x] PASS: Expanded academic row has `border-l-2 border-brand/20` left accent
- [x] PASS: Block labels: `Text`, `Bullets`, `Image`, `Chart`, `Table`, `Citation`, `Quote`, `Math`, `Diagram`, `Code`, `Callout`, `Stat`, `Bibliography`, `Timeline`, `Divider`
- [x] PASS: Academic icons: MathOperations, TreeStructure, Code, Megaphone, ChartBar, BookOpen, Clock, Minus
- [x] PASS: Controls appear on hover when block is active; move-up only when `i > 0`, move-down only when `i < blocks.length - 1`
- [x] PASS: Delete button: `bg-red-500/10 border-red-500/20 text-red-500`; all controls use `stopPropagation`
- [x] PASS: Moving a block updates `editingIndex` to the new position
- [x] PASS: Selected block: `border-brand/50 bg-surface-raised/50`; unselected: `hover:border-border`
- [x] PASS: `text`: style selector (Title/Subtitle/Body/Caption) only when active; `contentEditable` div commits on `blur`
- [x] PASS: `bullets`: `Numbered` checkbox toggles ordered/unordered; per-item Trash only when active and `items.length > 1`; `+ Add item` appends `"New item"`
- [x] PASS: `quote`: accent-color `border-l-2`; attribution placeholder `"Attribution"`
- [x] PASS: `citation`: text + source + DOI (placeholder `"DOI (e.g., 10.1000/xyz123)"`) + Year (`w-16`) fields; DOI/Year only when active
- [x] PASS: `image`: `next/image` at `max-h-32` with `unoptimized`; no-URL placeholder `border-2 border-dashed` at `h-20` showing `suggestion ?? "Image placeholder"`; alt text field only when active
- [x] PASS: `chart`: read-only showing `"{chartType} chart: {title}"` and `"{labels.length} labels, {datasets.length} dataset(s)"`
- [x] PASS: `table`: editable headers and cells via `contentEditable`; header `border-b-2` in `theme.primaryColor`
- [x] PASS: `math`: header `"LaTeX Math"` with MathOperations icon; `"Display mode"` checkbox; textarea 2 rows placeholder `"e.g., E = mc^2 or \frac{a}{b}"`
- [x] PASS: `diagram`: header `"Mermaid Diagram"` with TreeStructure icon; type selector (Flowchart/Sequence/Class Diagram/Gantt/Mind Map/Timeline/PRISMA Flow); textarea 4 rows
- [x] PASS: `code`: header `"Code"` with Code icon; language input `w-20`; textarea 4 rows with `theme.codeBackground ?? "#1E1E2E"` bg and `#E2E8F0` text; placeholder `"// Your code here"`
- [x] PASS: `callout`: type selector (Info/Warning/Success/Key Finding/Limitation/Methodology/Clinical Note); Megaphone icon; color-coded border + bg; title only when `block.data.title` truthy
- [x] PASS: `stat_result`: label placeholder `"Metric name"`; value at `text-lg font-bold` in `theme.primaryColor`; CI placeholder `"95% CI"`; pValue placeholder `"p-value"`
- [x] PASS: `bibliography`: read-only; style label `"Bibliography ({style.toUpperCase()})"` (e.g., `"Bibliography (APA)"`); entries numbered `[1]`, `[2]`, etc.
- [x] PASS: `timeline`: accent-color `border-l-2`; status dots (completed=#22C55E, in_progress=primaryColor, default=#94A3B8); `+ Add milestone` appends `{ label: "New milestone", status: "upcoming" }`
- [x] PASS: `divider`: three style buttons (solid/dashed/gradient); active button `border-brand text-brand`
- [x] PASS: text: `"Enter text here"`, body | bullets: `["First point","Second point"]`, unordered | image: alt `"Image description"`, suggestion `"Add an image"`
- [x] PASS: chart: bar, `"Chart Title"`, labels A/B/C, data 10/20/30 | table: 2 cols, 1 row | citation: `"Citation text"`, `"Author et al., 2024"`
- [x] PASS: quote: `"Quote text"`, `"Author"` | math: `"E = mc^2"`, displayMode true | diagram: flowchart, default graph syntax
- [x] PASS: code: `"// Your code here"`, python | callout: finding, `"Key Finding"`, `"Key finding or note"`
- [x] PASS: stat_result: `"Primary Outcome"`, `"0.73"`, `"95% CI: 0.65-0.81"`, `"p < 0.001"` | bibliography: single APA entry
- [x] PASS: timeline: Phase 1 (completed, Q1 2024) + Phase 2 (in_progress, Q2 2024) | divider: solid
- [x] PASS: toggle: `"Click to expand"`, `"Hidden content goes here"`, defaultOpen false | embed: empty URL, generic, 16:9
- [x] PASS: nested_card: `"Sub-section"`, one nested text block | infographic: process_flow, `"Infographic"`, one item
- [x] PASS: Unknown types fall back to default text block
#### GenerationWizard — AI Wizard Details (`generation-wizard.tsx`)
- [x] PASS: Labels: `Select Source`, `Template & Audience`, `Configure`, `Generate`
