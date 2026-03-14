# illustrate — Spec 023

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Export Pipeline
- [ ] PNG export settings expose DPI presets `72`, `150`, `300`, and `600`, quality range `1..100`, and background choices `transparent` and `white`
- [ ] SVG export settings expose toggles for `Optimize SVG`, `Minify Output`, and `Embed Fonts`
- [ ] PDF export settings expose page sizes `A4`, `Letter`, and `Custom`, orientation `Portrait` or `Landscape`, custom width and height clamped to `50..1000` mm, and per-edge margins clamped to `0..100` mm
- [ ] PPTX export settings expose layouts `16:9`, `16:10`, `4:3`, and `Custom`, resolution choices `1x`, `2x`, and `4x`, background `white` or `transparent`, `centerImage`, plus optional title and author
- [ ] LaTeX export settings expose `standalone` and `includePreamble` toggles plus a TikZ preview textarea
- [ ] The LaTeX preview copy button enters a copied-success state for `2000` ms before resetting
- [ ] Editor-mode export hardcodes the basename `diagram` for every format, so the editable filename field in `ExportDialog` is currently ignored by the actual export handler
- [ ] Editor-mode PNG export uses `exportAsPng()` with `scale = dpi / 72`
- [ ] Editor-mode PNG export maps `background: 'transparent'` to `backgroundColor: undefined` and any non-transparent choice to `#ffffff`
- [ ] The PNG quality slider value is collected in the dialog but ignored by the editor export handler
- [ ] Editor-mode SVG export passes only `minify` and `embedFonts` into `exportAsSvg()`, and the helper currently ignores those options internally
- [ ] The SVG `optimize` toggle is UI-only in the current editor flow; it is never consumed by the export helper
- [ ] `exportAsSvg()` prepends an XML declaration and downloads a serialized clone of the SVG but does not actually implement optimization, minification, font embedding, or text-to-path conversion
- [ ] Editor-mode PDF export passes page size, orientation, and margins into `exportAsPdf()`
- [ ] `exportAsPdf()` uses a local `svg2pdf` stub that only warns and resolves when the full SVG-to-PDF library is not installed
- [ ] Editor-mode PPTX export calls `exportAsPptx(canvas, 'diagram', ...)` and therefore rasterizes the Fabric canvas instead of exporting vectors
- [ ] `exportAsPptx()` converts the canvas to a PNG data URL using `canvas.toDataURL({ format: 'png', quality, multiplier })`
- [ ] PPTX export defaults to slide layout `16x9`, multiplier `2`, quality `1`, company `FINNISH`, subject `Scientific Illustration`, and slide padding `0.5` inches
- [ ] PPTX export normalizes background `transparent` to an undefined slide background and `white` to hex `FFFFFF`
- [ ] Editor-mode LaTeX export does not generate or download a `.tex` file; it only shows success toast `LaTeX code ready!`
- [ ] The live editor export path has no empty-canvas guard and will still attempt to export the serialized empty canvas SVG
- [ ] Editor-mode export appends the temporary SVG element to `document.body` and removes it only on the success path; an exception before cleanup leaves no `finally` block to guarantee removal
#### Scientific Shapes
- [ ] The scientific shapes panel exposes exactly 15 generator categories: `dna`, `membrane`, `cellLayer`, `arrow`, `neuron`, `mitochondria`, `nucleus`, `ribosome`, `vesicle`, `virus`, `bacteria`, `golgi`, `er`, `microtubule`, and `protein`
- [ ] DNA defaults are `length: 200`, `basePairs: 10`, `twist: 36`, `width: 40`, `style: 'simple'`, `showBasePairs: true`, `stroke: '#3B82F6'`, and `strokeWidth: 2`
- [ ] Membrane defaults are `length: 300`, `phospholipidCount: 15`, `bilayer: true`, `showHeadGroups: true`, `showTails: true`, `stroke: '#6B7280'`, and `fill: '#FEF3C7'`
- [ ] Cell-layer defaults are `rows: 2`, `columns: 5`, `cellWidth: 40`, `cellHeight: 50`, `cellType: 'cuboidal'`, `showNuclei: true`, `junctions: true`, `stroke: '#6B7280'`, and `fill: '#FEF3C7'`
- [ ] Scientific arrow defaults are `type: 'activation'`, `curved: false`, `start: { x: 10, y: 50 }`, `end: { x: 190, y: 50 }`, `stroke: '#374151'`, and `strokeWidth: 2`
- [ ] Neuron defaults are `type: 'pyramidal'`, `dendrites: 5`, `axonLength: 150`, `showMyelin: true`, `stroke: '#374151'`, and `fill: '#FEF3C7'`
- [ ] Mitochondria defaults are `width: 120`, `height: 60`, `cristaCount: 5`, `showMatrix: true`, `stroke: '#374151'`, and `fill: '#FEF3C7'`
- [ ] Nucleus defaults are `diameter: 100`, `pores: 8`, `envelopeStyle: 'solid'`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#e2e8f0'`
- [ ] Ribosome defaults are `size: 60`, `subunits: 'both'`, `showRna: true`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#fcd34d'`
- [ ] Vesicle defaults are `diameter: 80`, `cargo: 'dots'`, `membraneStyle: 'solid'`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#c4b5fd'`
- [ ] Virus defaults are `diameter: 100`, `type: 'icosahedral'`, `spikeLength: 15`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#10b981'`
- [ ] Bacteria defaults are `type: 'bacillus'`, `length: 100`, `width: 40`, `flagella: 2`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#34d399'`
- [ ] Golgi defaults are `size: 120`, `cisternae: 5`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#f472b6'`
