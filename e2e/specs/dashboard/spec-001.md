# dashboard — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Page Overview
#### Layout
- [ ] Page renders with all sections visible
- [ ] `force-dynamic` — always fetches fresh data on load
- [ ] Content constrained to `max-w-5xl` width
- [ ] Responsive: stacks to single column on mobile

### Action Cards
- [ ] Section title "What do you want to do today?" displayed
- [ ] Grid layout: 1 column mobile → 2 columns tablet → 4 columns desktop
#### Card: Literature Search (sky accent)
- [ ] Icon: GlobeHemisphereWest with `bg-sky-500/10` background
- [ ] Title: "Literature Search"
- [ ] Description: "Query 200M+ academic papers. Extract consensus."
- [ ] Click navigates to `/research`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-sky-500/30`
- [ ] Icon scales up on hover
#### Card: Write & Draft (indigo accent)
- [ ] Icon: PenNib with `bg-indigo-500/10` background
- [ ] Title: "Write & Draft"
- [ ] Description: "Open the luminous studio. Start writing with focus."
- [ ] Click navigates to `/studio`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-indigo-500/30`
#### Card: Learn Mode (emerald accent)
- [ ] Icon: GraduationCap with `bg-emerald-500/10` background
- [ ] Title: "Learn Mode"
- [ ] Description: "Socratic AI tutor. Think critically, learn deeply."
- [ ] Click navigates to `/studio?mode=learn`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-emerald-500/30`
#### Card: Final Checks (amber accent)
- [ ] Icon: ShieldCheck with `bg-amber-500/10` background
- [ ] Title: "Final Checks"
- [ ] Description: "Run plagiarism and AI-detection compliance audits."
- [ ] Click navigates to `/compliance`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-amber-500/30`
#### Common Card Behavior
- [ ] Glass-panel styling (`glass-panel rounded-2xl`)
- [ ] Smooth `transition-all` on hover
- [ ] Cursor pointer on hover
- [ ] All four cards render at equal height

### Stats Overview
- [ ] Section title "Your Research at a Glance" displayed
- [ ] Grid layout: 2 columns mobile → 4 columns (`sm:` breakpoint, 640px+)
- [ ] Each card shows large bold number
- [ ] Each card shows label text below number
