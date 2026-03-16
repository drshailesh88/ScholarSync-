# illustrate — Spec 029

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### MenuBar Operation Toast Messages (`MenuBar.tsx`)
- [x] PASS: Release clipping mask on non-clipped object shows warning toast `Select a clipped group to release its clipping mask.`
- [x] PASS: Release clipping mask success toast reads `Clipping mask released`
- [x] PASS: Compound path creation with < 2 objects shows warning toast `Select at least 2 paths to create a compound path.`
- [x] PASS: Compound path creation success toast reads `Compound path created`
- [x] PASS: Release compound path on non-compound object shows warning toast `Select a compound path to release it.`
- [x] PASS: Release compound path success toast reads `Compound path released`
- [x] PASS: `canReleaseClippingMask` checks `activeSelection.length === 1 && isClippingMaskGroup(activeSelection[0])`
- [x] PASS: `canReleaseCompoundPath` checks `activeSelection.length === 1 && isCompoundPath(activeSelection[0])`
- [x] PASS: MenuBar click-outside detection uses `mousedown` event on `document`, not `click`
- [x] PASS: Help > About FINNISH full toast text is `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool. Built with React, Fabric.js, and Zustand.`
#### Quick Export vs Export Dialog Toast Messages
- [x] PASS: MenuBar Quick Export SVG success toast reads `Exported as SVG`
- [x] PASS: MenuBar Quick Export PNG success toast reads `Exported as PNG`
- [x] PASS: MenuBar Quick Export PNG @2x success toast reads `Exported as PNG @2x`
- [x] PASS: MenuBar Quick Export PNG @2x download filename is `diagram@2x.png`
- [x] PASS: Export Dialog PNG export success toast reads `PNG exported successfully!`
- [x] PASS: Export Dialog SVG export success toast reads `SVG exported successfully!`
- [x] PASS: Export Dialog PDF export success toast reads `PDF exported successfully!`
- [x] PASS: Export Dialog PPTX export success toast reads `PowerPoint exported successfully!`
- [x] PASS: Quick Export and Export Dialog produce different toast messages for the same format
#### Scientific Text Toolbar (`ScientificTextToolbar.tsx`)
- [x] PASS: Toolbar header title text is `Scientific Text`
- [x] PASS: Close button title attribute is `Close toolbar`
- [x] PASS: `activeTab` state is initialized to `'greek'` with no setter function exposed, so only Greek letters are ever displayed
- [x] PASS: Superscripts tab (16 symbols), Subscripts tab (15 symbols), and Math Symbols tab (21 symbols) exist in source code but are unreachable dead code
- [x] PASS: Quick-format buttons `x²` (superscript) and `x₂` (subscript) ARE rendered and functional
- [x] PASS: Lowercase Greek letters section title is `Greek Letters (Lowercase)` showing 23 letters (α through ω)
- [x] PASS: Uppercase Greek letters section title is `Greek Letters (Uppercase)` showing 8 letters (Γ, Δ, Θ, Λ, Σ, Φ, Ψ, Ω)
- [x] PASS: Symbol grid uses `gridTemplateColumns: 'repeat(8, 1fr)'` layout
- [x] PASS: Symbol buttons use `fontFamily: 'Times New Roman, serif'`
- [x] PASS: Symbol button hover: background changes to `var(--accent-primary)` with white text
- [x] PASS: Toolbar positioned absolutely with z-index `1000`, min-width `280px`, max-height `400px`, overflowY `auto`
- [x] PASS: `insertSymbol` for IText inserts at cursor position via `insertChars`; for Textbox it appends to text
- [x] PASS: `insertSymbol` fires `object:modified` event after insertion
- [x] PASS: `applySuperscript` calls `setSuperscript(0.6)` on the active text object
- [x] PASS: `applySubscript` calls `setSubscript(0.6)` on the active text object
#### Error Boundary Details (`ErrorBoundary.tsx`)
- [x] PASS: Default fallback title is `Something went wrong` (not scope-specific)
