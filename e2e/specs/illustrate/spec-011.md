# illustrate — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Export Dialog
#### PNG Options
- [x] PASS: DPI selector: 72, 150, 300 (default 300)
- [x] PASS: Quality slider: 0–100 (default 90)
- [x] PASS: Background option: transparent or white
- [x] PASS: Export button downloads PNG file
- [x] PASS: @2x quick export produces double-resolution PNG
#### SVG Options
- [x] PASS: Optimize checkbox (minify paths)
- [x] PASS: Minify checkbox (compress SVG code)
- [x] PASS: Embed Fonts checkbox
- [x] PASS: Export button downloads SVG file
- [x] PASS: Exported SVG renders correctly in browsers and vector editors
#### PDF Options
- [x] PASS: Page Size: A4, Letter, A3, Custom
- [x] PASS: Orientation: Portrait, Landscape
- [x] PASS: Margins: Top, Right, Bottom, Left numeric inputs
- [x] PASS: Export button downloads PDF file
#### PowerPoint (PPTX) Options
- [x] PASS: Layout: 16:9, 16:10, 4:3, Custom
- [x] PASS: Resolution multiplier: 1×–4×
- [x] PASS: Background: white, transparent
- [x] PASS: Center image on slide checkbox
- [x] PASS: Title and author text fields
- [x] PASS: Export button downloads PPTX file
#### LaTeX (TikZ) Options
- [x] PASS: Standalone document checkbox
- [x] PASS: Include preamble checkbox
- [x] PASS: TikZ code preview area
- [x] PASS: Copy button copies TikZ code to clipboard
- [x] PASS: Export button downloads `.tex` file

### Scientific Shape Generator
- [x] PASS: Opens via Insert menu → All Scientific Shapes (`Ctrl+Shift+S`)
- [x] PASS: Panel lists available scientific shapes:
- [x] PASS: DNA Helix
- [x] PASS: Cell Membrane
- [x] PASS: Cell Layer / Tissue
- [x] PASS: Neuron
- [x] PASS: Mitochondria
- [x] PASS: Pathway Arrows
- [x] PASS: Each shape has configurable parameters (scale, color, detail level)
- [x] PASS: Live preview updates as parameters change
