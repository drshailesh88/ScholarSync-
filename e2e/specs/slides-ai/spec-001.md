# slides-ai — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 1. Mode Selector Toggle
- [ ] Mode selector displayed in toolbar with two buttons: "Slides" and "Create"
- [ ] Active mode highlighted with brand-colored background + white text
- [ ] Inactive mode shows muted text, hover highlights
- [ ] Clicking "Slides" switches to PowerPoint-style editing
- [ ] Clicking "Create" switches to Gamma card-based editing
- [ ] Mode persists across navigation within the deck
#### 2. Mode Selection Screen (First-Time Entry)
- [ ] Full-screen mode selection displayed for new decks
- [ ] "How do you want to work?" heading with subtitle "You can switch anytime"
- [ ] **Slides Mode card:**
- [ ] Slide-layout icon (16x16 rounded, brand colors)
- [ ] "Slides Mode" title
- [ ] "Click and build like PowerPoint" description
- [ ] Hover: border → brand, background → brand/5
- [ ] **Create Mode card:**
- [ ] Star icon (brand colors)
- [ ] "Create Mode" title
- [ ] "AI builds it, you refine" description
- [ ] Hover: same interaction as Slides card
- [ ] Selecting either mode navigates to the appropriate editor
#### 3. Slides Agent Panel (`slides-agent-panel.tsx`)
- [ ] "AI Chat" label with Sparkle icon
- [ ] Panel opens as right sidebar in Slides Mode
- [ ] Toggled via right panel selector (properties → agent)
- [ ] Badge showing selected block type with icon:
- [ ] Text/Bullets/Quote/Callout → TextAa icon
- [ ] Chart → ChartBar icon
- [ ] Image/Illustration → Image icon
- [ ] Table → Table icon
- [ ] No block selected → shows slide-level context
- [ ] Context updates when selection changes
- [ ] **Default actions** (no block or unknown block):
- [ ] "Improve this slide"
- [ ] "Add more detail"
- [ ] "Simplify"
- [ ] "Add citations"
- [ ] "Fix formatting"
