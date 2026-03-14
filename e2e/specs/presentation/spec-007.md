# presentation — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Content Block Types (20+)
#### Infographic Block Rendering Details
- [ ] **9.105** Hierarchy: root node at top with child nodes below, connected by lines (`infographic-block.tsx:216`, `:225`)
- [ ] **9.106** Pyramid: stacked layers narrowing upward (`infographic-block.tsx:256`)
- [ ] **9.107** Comparison grid: side-by-side items for comparison (`infographic-block.tsx:310`)
- [ ] **9.108** Venn diagram: overlapping circles (`infographic-block.tsx:346`)
- [ ] **9.109** Matrix: four-quadrant grid layout (`infographic-block.tsx:404-438`)
- [ ] **9.110** Radial: center node with radiating spokes to outer items (`infographic-block.tsx:442-476`)
- [ ] **9.112** Checklist: items with done/active/pending states, alternating row bands, and checkmark on done (`infographic-block.tsx:521-563`)
- [ ] **9.113** Cause-effect: effect node with branching causes (`infographic-block.tsx:566-600`)
- [ ] **9.114** Icon array: grid of repeated icon items with legend counts (`infographic-block.tsx:604-657`)
- [ ] **9.115** Pictograph: repeated icon units with fractional last unit for ratio display (`infographic-block.tsx:643`, `:674`, `:688`, `:700`)
- [ ] **9.117** Per-item opacity applied when `item.opacity != null` (`infographic-block.tsx:63`, `:136`, `:181`)
- [ ] **9.118** Per-item border when `item.borderColor` present (`infographic-block.tsx:147`, `:183`)
- [ ] **9.119** Per-item bold weight when `item.bold` (`infographic-block.tsx:151`, `:186`)
- [ ] **9.120** Highlighted items get drop-shadow glow effect (`infographic-block.tsx:63`)
- [ ] **9.121** Description text shown conditionally per item (`infographic-block.tsx:154`, `:189`, `:237`, `:392`, `:428`, `:500`)
- [ ] **9.122** Value text shown conditionally (`infographic-block.tsx:196`, `:554`)
- [ ] **9.123** Title shown conditionally above infographic (`infographic-block.tsx:856`)
- [ ] **9.124** Caption shown conditionally below (`infographic-block.tsx:870`)
- [ ] **9.125** Interactive mode renders SvgTooltip for hover details (`infographic-block.tsx:868`)
- [ ] **9.126** Checklist done items show strikethrough text (`infographic-block.tsx:544-550`)
- [ ] **9.127** Checklist active items show filled circle indicator (`infographic-block.tsx:541-542`)

### Toolbar Actions
- [ ] **10.12** Comments badge shows unresolved count
- [ ] **10.13** Only one right panel is open at a time
- [ ] **10.14** Clicking active panel button closes it

### Agent Panel (AI Chat)
- [ ] **11.1** AgentPanel renders as chat interface
- [ ] **11.2** Text input field for custom commands
- [ ] **11.3** Send button submits the command
- [ ] **11.4** Response streams and renders in the chat
#### Quick Actions
- [ ] **11.11** Quick action buttons trigger the corresponding AI command
- [ ] **11.12** Custom command input accepts freeform text (up to 2000 chars)
- [ ] **11.13** Undo action reverts the last agent change
- [ ] **11.14** Redo action re-applies a reverted change
- [ ] **11.15** Agent returns modifiedSlides and summary
- [ ] **11.16** Modified slides are applied to the deck

### Coach Panel
- [ ] **12.1** CoachPanel renders with "Run Coach" button
