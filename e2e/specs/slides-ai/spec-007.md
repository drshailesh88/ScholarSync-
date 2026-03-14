# slides-ai — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 10. Card Stack (Center Panel)
- [ ] `background` — full card background
- [ ] Overlay types: frosted (backdrop blur), faded (gradient), clear (light tint)
- [ ] Overlay intensity controls opacity
- [ ] Click to activate a card
- [ ] Active card shows `CardEditor` (inline editing)
- [ ] Inactive cards show read-only content
- [ ] **Sparkle Menu** (CardSparkleMenu) — AI quick actions
- [ ] **Background Picker** (CardBackgroundButton) — per-card styling
- [ ] "+" button appears between cards on hover
- [ ] Click adds a new blank card at that position
- [ ] "Add your first card" button with PlusCircle icon
- [ ] Dashed border, hover transitions to brand colors
#### 11. Card Editor (Inline Editing)
- [ ] Click title to enter edit mode (Tiptap `EditableTextBlock`)
- [ ] HTML stripped — stored as plain text
- [ ] Placeholder: "Card title..."
- [ ] Styled with theme heading font and primary color
- [ ] Existing subtitle becomes editable when card is active
- [ ] `EditableTextBlock` with subtitle style
- [ ] Placeholder: "Subtitle..."
- [ ] **Text blocks** — inline Tiptap rich text editing
- [ ] Supports style variants: title, subtitle, body, caption
- [ ] Custom font family, font size, and color
- [ ] **Bullets blocks** — inline Tiptap bullets editing
- [ ] Toggle ordered/unordered
- [ ] Add/remove bullet points
- [ ] **All other blocks** — rendered read-only via BLOCK_REGISTRY
- [ ] Click a block to select it (ring-2 ring-brand/40 + brand/5 background)
- [ ] Hover on unselected blocks shows ring-1 ring-border
- [ ] Click event stopped from propagating (doesn't deselect card)
- [ ] Appears at bottom of active card
- [ ] Opens Block Inserter Menu (see Section 14)
- [ ] "Click here to start typing, or type / for commands"
- [ ] Italic, muted text
#### 12. Card Sparkle Menu (Per-Card AI Actions)
- [ ] Sparkle icon button appears on hover of active card
- [ ] Button: 8x8 background, rounded-lg, surface-raised/80
