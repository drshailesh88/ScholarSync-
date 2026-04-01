# explore — Spec 004

STATUS: COMPLETE
TESTED: 20/20
PASS: 20
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Result Cards

#### Display
- [x] PASS: **Title renders as link** — result with URL shows title as clickable link opening in new tab `[CODE]`
- [x] PASS: **Title renders as text** — result without URL/DOI/PMID shows title as plain heading `[CODE]`
- [x] PASS: **Trust tier left border** — each card has colored left border matching trust tier (green=gov, blue=journalism, amber=community, gray=other) `[CODE]`
- [x] PASS: **Evidence level border (academic)** — academic results with evidence level show corresponding border color `[CODE]`
- [x] PASS: **Breadcrumb display** — below title, shows domain > path breadcrumb in brand color `[CODE]`
- [x] PASS: **Author metadata (academic)** — academic results show "Author1, Author2, et al." format `[CODE]`
- [x] PASS: **News metadata** — news results show outlet name and relative time (e.g., "2h ago") `[EMERGENT: Intl.RelativeTimeFormat]`
- [x] PASS: **Discussion metadata** — discussion results show platform, community, and engagement `[CODE]`
- [x] PASS: **Date label** — results with date show formatted date; year-only results show just year `[EMERGENT: Intl.DateTimeFormat]`
- [x] PASS: **Snippet with line clamp** — abstract/tldr truncates to 3 lines with overflow hidden `[CODE]`

#### Save Interaction
- [x] PASS: **Save button (plus icon)** — click + icon, verify spinner appears then check icon replaces it `[CODE]`
- [x] PASS: **Save disabled after saved** — after saving, button is disabled and shows check icon `[CODE]`
- [x] PASS: **"Saved to Library" toast** — after saving, success toast appears at bottom `[CODE]`
- [x] PASS: **"Already in Library" toast** — save a result that's already saved, verify info toast `[CODE]`

#### Source Info Panel
- [x] PASS: **Toggle source info** — click shield icon, verify SourceInfoPanel expands inline below card `[CODE]`
- [x] PASS: **Close source info** — click shield again or X button in panel, verify it closes `[CODE]`
- [x] PASS: **Domain name in panel** — panel shows domain name with globe icon `[CODE]`
- [x] PASS: **Trust tier in panel** — panel shows trust tier label (e.g., "Government / Institutional") with colored icon `[CODE]`
- [x] PASS: **Domain preference control** — expand "Domain Preference" section, verify 5 levels: Prefer/Higher/Neutral/Lower/Mute `[CODE]`
- [x] PASS: **Set domain preference** — click a preference level, verify it highlights as selected `[CODE]`
