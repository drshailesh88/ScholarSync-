# slides-ai — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 10. Card Stack (Center Panel)
- [x] PASS: `background` — full card background
- [x] PASS: Overlay types: frosted (backdrop blur), faded (gradient), clear (light tint)
- [x] PASS: Overlay intensity controls opacity
- [x] PASS: Click to activate a card
- [x] PASS: Active card shows `CardEditor` (inline editing)
- [x] PASS: Inactive cards show read-only content
- [x] PASS: **Sparkle Menu** (CardSparkleMenu) — AI quick actions
- [x] PASS: **Background Picker** (CardBackgroundButton) — per-card styling
- [x] PASS: "+" button appears between cards on hover
- [x] PASS: Click adds a new blank card at that position
- [x] PASS: "Add your first card" button with PlusCircle icon
- [x] PASS: Dashed border, hover transitions to brand colors
#### 11. Card Editor (Inline Editing)
- [x] PASS: Click title to enter edit mode (Tiptap `EditableTextBlock`)
- [x] PASS: HTML stripped — stored as plain text
- [x] PASS: Placeholder: "Card title..."
- [x] PASS: Styled with theme heading font and primary color
- [x] PASS: Existing subtitle becomes editable when card is active
- [x] PASS: `EditableTextBlock` with subtitle style
- [x] PASS: Placeholder: "Subtitle..."
- [x] PASS: **Text blocks** — inline Tiptap rich text editing
- [x] PASS: Supports style variants: title, subtitle, body, caption
- [x] PASS: Custom font family, font size, and color
- [x] PASS: **Bullets blocks** — inline Tiptap bullets editing
- [x] PASS: Toggle ordered/unordered
- [x] PASS: Add/remove bullet points
- [x] PASS: **All other blocks** — rendered read-only via BLOCK_REGISTRY
- [x] PASS: Click a block to select it (ring-2 ring-brand/40 + brand/5 background)
- [x] PASS: Hover on unselected blocks shows ring-1 ring-border
- [x] PASS: Click event stopped from propagating (doesn't deselect card)
- [x] PASS: Appears at bottom of active card
- [x] PASS: Opens Block Inserter Menu (see Section 14)
- [x] PASS: "Click here to start typing, or type / for commands"
- [x] PASS: Italic, muted text
#### 12. Card Sparkle Menu (Per-Card AI Actions)
- [x] PASS: Sparkle icon button appears on hover of active card
- [x] PASS: Button: 8x8 background, rounded-lg, surface-raised/80
