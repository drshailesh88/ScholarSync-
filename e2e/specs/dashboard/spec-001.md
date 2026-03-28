# dashboard — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Page Overview
#### Layout
- [x] PASS: Page renders with all sections visible
- [x] PASS: `force-dynamic` — always fetches fresh data on load
- [x] PASS: Content constrained to `max-w-5xl` width
- [x] PASS: Responsive: stacks to single column on mobile

### Action Cards
- [x] PASS: Section title "What do you want to do today?" displayed
- [x] PASS: Grid layout: 1 column mobile → 2 columns tablet → 4 columns desktop
#### Card: Literature Search (sky accent)
- [x] PASS: Icon: GlobeHemisphereWest with `bg-sky-500/10` background
- [x] PASS: Title: "Literature Search"
- [x] PASS: Description: "Query 200M+ academic papers. Extract consensus."
- [x] PASS: Click navigates to `/research`
- [x] PASS: Hover: -translate-y-1 (moves UP), glow shadow, `border-sky-500/30`
- [x] PASS: Icon scales up on hover
#### Card: Write & Draft (indigo accent)
- [x] PASS: Icon: PenNib with `bg-indigo-500/10` background
- [x] PASS: Title: "Write & Draft"
- [x] PASS: Description: "Open the luminous studio. Start writing with focus."
- [x] PASS: Click navigates to `/studio`
- [x] PASS: Hover: -translate-y-1 (moves UP), glow shadow, `border-indigo-500/30`
#### Card: Learn Mode (emerald accent)
- [x] PASS: Icon: GraduationCap with `bg-emerald-500/10` background
- [x] PASS: Title: "Learn Mode"
- [x] PASS: Description: "Socratic AI tutor. Think critically, learn deeply."
- [x] PASS: Click navigates to `/studio?mode=learn`
- [x] PASS: Hover: -translate-y-1 (moves UP), glow shadow, `border-emerald-500/30`
#### Card: Final Checks (amber accent)
- [x] PASS: Icon: ShieldCheck with `bg-amber-500/10` background
- [x] PASS: Title: "Final Checks"
- [x] PASS: Description: "Run plagiarism and AI-detection compliance audits."
- [x] PASS: Click navigates to `/compliance`
- [x] PASS: Hover: -translate-y-1 (moves UP), glow shadow, `border-amber-500/30`
#### Common Card Behavior
- [x] PASS: Glass-panel styling (`glass-panel rounded-2xl`)
- [x] PASS: Smooth `transition-all` on hover
- [x] PASS: Cursor pointer on hover
- [x] PASS: All four cards render at equal height

### Stats Overview
- [x] PASS: Section title "Your Research at a Glance" displayed
- [x] PASS: Grid layout: 2 columns mobile → 4 columns (`sm:` breakpoint, 640px+)
- [x] PASS: Each card shows large bold number
- [x] PASS: Each card shows label text below number
