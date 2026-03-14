# slides-ai — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 18. Block Inserter Menu (Gamma Mode)
- [ ] Opens from "Add Block" button at bottom of active card
- [ ] Search bar at top (sticky)
- [ ] **Smart Layouts** entry (dashed border, special styling)
- [ ] **Block categories:**
- [ ] **Content:** Text, Bullets, Quote, Shape, Citation, Divider, Toggle, Nested Card
- [ ] **Media & Data:** Image, Chart, Table, Infographic, Illustration, Media, Embed
- [ ] **Academic:** Equation, Diagram, Code, Callout, Statistic, Bibliography, Timeline
- [ ] Category headers in uppercase
- [ ] Items listed with hover highlight
- [ ] Click inserts block via `createDefaultBlock(type)`
- [ ] Escape or click outside closes menu
#### 19. Gamma-Specific Block Types
- [ ] **Supported services:**
- [ ] YouTube → auto-converts to embed URL
- [ ] Vimeo → auto-converts to embed URL
- [ ] Figma → embed with share URL
- [ ] Google Docs/Sheets → pub URL conversion
- [ ] Twitter/X → link fallback (no iframe)
- [ ] Generic → direct URL in iframe
- [ ] Aspect ratio options: 16:9, 4:3, 1:1
- [ ] Optional title above embed
- [ ] Lazy loading iframes
- [ ] Sandbox: `allow-scripts allow-same-origin`
- [ ] Empty state: "No embed URL provided" with globe icon
- [ ] Clickable header with Cards icon + title + chevron
- [ ] Collapse/expand with Framer Motion animation (250ms)
- [ ] Nested blocks rendered via BLOCK_REGISTRY
- [ ] Visual nesting: darker background, divider on expand
- [ ] Default state: collapsed
- [ ] Clickable header with rotating chevron
- [ ] Content rendered from HTML (dangerouslySetInnerHTML)
- [ ] `defaultOpen` prop (defaults false)
- [ ] Framer Motion expand/collapse animation
- [ ] Left padding for visual hierarchy
#### 20. Spotlight Mode (Presentation Feature)
- [ ] Activated from presentation controls
- [ ] Progressive reveal: one block at a time
