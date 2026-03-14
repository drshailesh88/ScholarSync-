# illustrate — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Export Dialog
#### PNG Options
- [ ] DPI selector: 72, 150, 300 (default 300)
- [ ] Quality slider: 0–100 (default 90)
- [ ] Background option: transparent or white
- [ ] Export button downloads PNG file
- [ ] @2x quick export produces double-resolution PNG
#### SVG Options
- [ ] Optimize checkbox (minify paths)
- [ ] Minify checkbox (compress SVG code)
- [ ] Embed Fonts checkbox
- [ ] Export button downloads SVG file
- [ ] Exported SVG renders correctly in browsers and vector editors
#### PDF Options
- [ ] Page Size: A4, Letter, A3, Custom
- [ ] Orientation: Portrait, Landscape
- [ ] Margins: Top, Right, Bottom, Left numeric inputs
- [ ] Export button downloads PDF file
#### PowerPoint (PPTX) Options
- [ ] Layout: 16:9, 16:10, 4:3, Custom
- [ ] Resolution multiplier: 1×–4×
- [ ] Background: white, transparent
- [ ] Center image on slide checkbox
- [ ] Title and author text fields
- [ ] Export button downloads PPTX file
#### LaTeX (TikZ) Options
- [ ] Standalone document checkbox
- [ ] Include preamble checkbox
- [ ] TikZ code preview area
- [ ] Copy button copies TikZ code to clipboard
- [ ] Export button downloads `.tex` file

### Scientific Shape Generator
- [ ] Opens via Insert menu → All Scientific Shapes (`Ctrl+Shift+S`)
- [ ] Panel lists available scientific shapes:
- [ ] DNA Helix
- [ ] Cell Membrane
- [ ] Cell Layer / Tissue
- [ ] Neuron
- [ ] Mitochondria
- [ ] Pathway Arrows
- [ ] Each shape has configurable parameters (scale, color, detail level)
- [ ] Live preview updates as parameters change
