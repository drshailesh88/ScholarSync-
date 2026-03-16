# slides-ai — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 9. Card Outline Sidebar (Left Panel)
- [x] PASS: Drag handle (6-dot icon, visible on hover)
- [x] PASS: Card number (index + 1)
- [x] PASS: Truncated title (max 20 chars + "…")
- [x] PASS: Active card: brand/10 background, brand text, bold font
- [x] PASS: Inactive cards: default text, hover → surface-raised background
- [x] PASS: Drag handle appears on hover
- [x] PASS: Dragging reorders cards with dnd-kit
- [x] PASS: Pointer sensor with 5px activation distance
- [x] PASS: Keyboard sensor for accessibility
- [x] PASS: Dragging card shows opacity-50
- [x] PASS: 3-dot button visible on hover
- [x] PASS: **Duplicate** — creates exact copy of the card
- [x] PASS: **Delete** — removes card (disabled if only 1 card, red text)
- [x] PASS: Menu closes on outside click
- [x] PASS: Small "+" button appears between cards on hover
- [x] PASS: Click inserts a new blank card at that position
- [x] PASS: Opacity transition: invisible → visible on hover
- [x] PASS: "Add card" button at bottom of sidebar
- [x] PASS: Plus icon + label
- [x] PASS: Inserts after the last card
#### 10. Card Stack (Center Panel)
- [x] PASS: Cards displayed as vertically scrollable stack
- [x] PASS: Max width 3xl, centered horizontally
- [x] PASS: Gap between cards (gap-2)
- [x] PASS: Responsive padding (px-4 → px-8 → px-16)
- [x] PASS: Each card has:
- [x] PASS: Rounded corners (xl)
- [x] PASS: Shadow (base)
- [x] PASS: Active card: `border-brand ring-1 ring-brand/30`
- [x] PASS: Primary-colored accent bar at top (`h-1`, 4px)
- [x] PASS: Background from `cardBackground` or theme default
- [x] PASS: **Image positions:**
- [x] PASS: `none` — no image shown
- [x] PASS: `top` — image above content
- [x] PASS: `left` — image on left side
- [x] PASS: `right` — image on right side
