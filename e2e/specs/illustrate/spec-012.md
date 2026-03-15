# illustrate — Spec 012

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Scientific Shape Generator
- [ ] "Insert" button adds shape to canvas at center
- [ ] Inserted shapes are editable vector objects
- [ ] Quick insert via keyboard shortcuts:
- [ ] `Ctrl+Shift+D` inserts DNA Helix directly
- [ ] `Ctrl+Shift+M` inserts Cell Membrane directly

### AI Image Generation Tool
- [ ] Opens via Image menu → AI Generate Image (`Ctrl+Shift+A`)
- [ ] Text prompt input for describing desired image
- [ ] Model selection (e.g., FLUX Pro, FLUX Realism)
- [ ] Image size/quality configuration
- [ ] API key configuration field (for fal.ai)
- [ ] "Generate" button starts AI image generation
- [ ] Progress indicator during generation
- [ ] Generated image displayed as preview
- [ ] "Add to Canvas" button inserts generated image onto canvas
- [ ] Error handling for invalid prompts, API failures, missing keys
- [ ] Cancel button to abort generation

### Background Removal Tool
- [ ] Opens via Image menu → Remove Background (`Ctrl+Shift+B`)
- [ ] Requires an image to be selected on canvas (or prompts image upload)
- [ ] Uses MediaPipe for client-side background removal
- [ ] Before/after preview of background removal
- [ ] "Apply" button replaces original image with background-removed version
- [ ] "Export" options for saving the result separately
- [ ] Processing indicator while MediaPipe runs
- [ ] Error handling for unsupported image formats

### Save & Persistence System
#### Manual Save
- [ ] `Ctrl+S` triggers save — downloads `diagram.finnish` file
- [ ] `Ctrl+Shift+S` triggers Save As — prompts for filename
- [ ] `.finnish` format stores canvas JSON (objects, viewport, settings)
- [ ] `.json` format also supported for open/save
#### File Open
- [ ] `Ctrl+O` opens file picker
- [ ] Accepts `.finnish`, `.json`, `.svg` files
- [ ] Loading a file replaces current canvas content
- [ ] Confirm dialog shown if canvas has unsaved changes
#### Recent Diagrams Tracking
- [ ] Saved diagrams added to `localStorage['finnish-recent-diagrams']`
- [ ] Entry format: `{ id, name, thumbnail (data URL), updatedAt (timestamp) }`
- [ ] Maximum of 6 recent entries stored
