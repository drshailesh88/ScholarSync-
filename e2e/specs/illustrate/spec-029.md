# illustrate — Spec 029

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### MenuBar Operation Toast Messages (`MenuBar.tsx`)
- [ ] Release clipping mask on non-clipped object shows warning toast `Select a clipped group to release its clipping mask.`
- [ ] Release clipping mask success toast reads `Clipping mask released`
- [ ] Compound path creation with < 2 objects shows warning toast `Select at least 2 paths to create a compound path.`
- [ ] Compound path creation success toast reads `Compound path created`
- [ ] Release compound path on non-compound object shows warning toast `Select a compound path to release it.`
- [ ] Release compound path success toast reads `Compound path released`
- [ ] `canReleaseClippingMask` checks `activeSelection.length === 1 && isClippingMaskGroup(activeSelection[0])`
- [ ] `canReleaseCompoundPath` checks `activeSelection.length === 1 && isCompoundPath(activeSelection[0])`
- [ ] MenuBar click-outside detection uses `mousedown` event on `document`, not `click`
- [ ] Help > About FINNISH full toast text is `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool. Built with React, Fabric.js, and Zustand.`
#### Quick Export vs Export Dialog Toast Messages
- [ ] MenuBar Quick Export SVG success toast reads `Exported as SVG`
- [ ] MenuBar Quick Export PNG success toast reads `Exported as PNG`
- [ ] MenuBar Quick Export PNG @2x success toast reads `Exported as PNG @2x`
- [ ] MenuBar Quick Export PNG @2x download filename is `diagram@2x.png`
- [ ] Export Dialog PNG export success toast reads `PNG exported successfully!`
- [ ] Export Dialog SVG export success toast reads `SVG exported successfully!`
- [ ] Export Dialog PDF export success toast reads `PDF exported successfully!`
- [ ] Export Dialog PPTX export success toast reads `PowerPoint exported successfully!`
- [ ] Quick Export and Export Dialog produce different toast messages for the same format
#### Scientific Text Toolbar (`ScientificTextToolbar.tsx`)
- [ ] Toolbar header title text is `Scientific Text`
- [ ] Close button title attribute is `Close toolbar`
- [ ] `activeTab` state is initialized to `'greek'` with no setter function exposed, so only Greek letters are ever displayed
- [ ] Superscripts tab (16 symbols), Subscripts tab (15 symbols), and Math Symbols tab (21 symbols) exist in source code but are unreachable dead code
- [ ] Quick-format buttons `x²` (superscript) and `x₂` (subscript) ARE rendered and functional
- [ ] Lowercase Greek letters section title is `Greek Letters (Lowercase)` showing 23 letters (α through ω)
- [ ] Uppercase Greek letters section title is `Greek Letters (Uppercase)` showing 8 letters (Γ, Δ, Θ, Λ, Σ, Φ, Ψ, Ω)
- [ ] Symbol grid uses `gridTemplateColumns: 'repeat(8, 1fr)'` layout
- [ ] Symbol buttons use `fontFamily: 'Times New Roman, serif'`
- [ ] Symbol button hover: background changes to `var(--accent-primary)` with white text
- [ ] Toolbar positioned absolutely with z-index `1000`, min-width `280px`, max-height `400px`, overflowY `auto`
- [ ] `insertSymbol` for IText inserts at cursor position via `insertChars`; for Textbox it appends to text
- [ ] `insertSymbol` fires `object:modified` event after insertion
- [ ] `applySuperscript` calls `setSuperscript(0.6)` on the active text object
- [ ] `applySubscript` calls `setSubscript(0.6)` on the active text object
#### Error Boundary Details (`ErrorBoundary.tsx`)
- [ ] Default fallback title is `Something went wrong` (not scope-specific)
