# slides-ai — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 9. Card Outline Sidebar (Left Panel)
- [ ] Drag handle (6-dot icon, visible on hover)
- [ ] Card number (index + 1)
- [ ] Truncated title (max 20 chars + "…")
- [ ] Active card: brand/10 background, brand text, bold font
- [ ] Inactive cards: default text, hover → surface-raised background
- [ ] Drag handle appears on hover
- [ ] Dragging reorders cards with dnd-kit
- [ ] Pointer sensor with 5px activation distance
- [ ] Keyboard sensor for accessibility
- [ ] Dragging card shows opacity-50
- [ ] 3-dot button visible on hover
- [ ] **Duplicate** — creates exact copy of the card
- [ ] **Delete** — removes card (disabled if only 1 card, red text)
- [ ] Menu closes on outside click
- [ ] Small "+" button appears between cards on hover
- [ ] Click inserts a new blank card at that position
- [ ] Opacity transition: invisible → visible on hover
- [ ] "Add card" button at bottom of sidebar
- [ ] Plus icon + label
- [ ] Inserts after the last card
#### 10. Card Stack (Center Panel)
- [ ] Cards displayed as vertically scrollable stack
- [ ] Max width 3xl, centered horizontally
- [ ] Gap between cards (gap-2)
- [ ] Responsive padding (px-4 → px-8 → px-16)
- [ ] Each card has:
- [ ] Rounded corners (xl)
- [ ] Shadow (base)
- [ ] Active card: `border-brand ring-1 ring-brand/30`
- [ ] Primary-colored accent bar at top (`h-1`, 4px)
- [ ] Background from `cardBackground` or theme default
- [ ] **Image positions:**
- [ ] `none` — no image shown
- [ ] `top` — image above content
- [ ] `left` — image on left side
- [ ] `right` — image on right side
