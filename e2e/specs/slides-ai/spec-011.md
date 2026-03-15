# slides-ai — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 18. Block Inserter Menu (Gamma Mode)
- [x] PASS: Opens from "Add Block" button at bottom of active card
- [x] PASS: Search bar at top (sticky)
- [x] PASS: **Smart Layouts** entry (dashed border, special styling)
- [x] PASS: **Block categories:**
- [x] PASS: **Content:** Text, Bullets, Quote, Shape, Citation, Divider, Toggle, Nested Card
- [x] PASS: **Media & Data:** Image, Chart, Table, Infographic, Illustration, Media, Embed
- [x] PASS: **Academic:** Equation, Diagram, Code, Callout, Statistic, Bibliography, Timeline
- [x] PASS: Category headers in uppercase
- [x] PASS: Items listed with hover highlight
- [x] PASS: Click inserts block via `createDefaultBlock(type)`
- [x] PASS: Escape or click outside closes menu
#### 19. Gamma-Specific Block Types
- [x] PASS: **Supported services:**
- [x] PASS: YouTube → auto-converts to embed URL
- [x] PASS: Vimeo → auto-converts to embed URL
- [x] PASS: Figma → embed with share URL
- [x] PASS: Google Docs/Sheets → pub URL conversion
- [x] PASS: Twitter/X → link fallback (no iframe)
- [x] PASS: Generic → direct URL in iframe
- [x] PASS: Aspect ratio options: 16:9, 4:3, 1:1
- [x] PASS: Optional title above embed
- [x] PASS: Lazy loading iframes
- [x] PASS: Sandbox: `allow-scripts allow-same-origin`
- [x] PASS: Empty state: "No embed URL provided" with globe icon
- [x] PASS: Clickable header with Cards icon + title + chevron
- [x] PASS: Collapse/expand with Framer Motion animation (250ms)
- [x] PASS: Nested blocks rendered via BLOCK_REGISTRY
- [x] PASS: Visual nesting: darker background, divider on expand
- [x] PASS: Default state: collapsed
- [x] PASS: Clickable header with rotating chevron
- [x] PASS: Content rendered from HTML (dangerouslySetInnerHTML)
- [x] PASS: `defaultOpen` prop (defaults false)
- [x] PASS: Framer Motion expand/collapse animation
- [x] PASS: Left padding for visual hierarchy
#### 20. Spotlight Mode (Presentation Feature)
- [x] PASS: Activated from presentation controls
- [x] PASS: Progressive reveal: one block at a time
