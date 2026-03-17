# illustrate — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Scientific Shape Generator
- [x] PASS: "Insert" button adds shape to canvas at center
- [x] PASS: Inserted shapes are editable vector objects
- [x] PASS: Quick insert via keyboard shortcuts:
- [x] PASS: `Ctrl+Shift+D` inserts DNA Helix directly
- [x] PASS: `Ctrl+Shift+M` inserts Cell Membrane directly

### AI Image Generation Tool
- [x] PASS: Opens via Image menu → AI Generate Image (`Ctrl+Shift+A`)
- [x] PASS: Text prompt input for describing desired image
- [x] PASS: Model selection (e.g., FLUX Pro, FLUX Realism)
- [x] PASS: Image size/quality configuration
- [x] PASS: API key configuration field (for fal.ai)
- [x] PASS: "Generate" button starts AI image generation
- [x] PASS: Progress indicator during generation
- [x] PASS: Generated image displayed as preview
- [x] PASS: "Add to Canvas" button inserts generated image onto canvas
- [x] PASS: Error handling for invalid prompts, API failures, missing keys
- [x] PASS: Cancel button to abort generation

### Background Removal Tool
- [x] PASS: Opens via Image menu → Remove Background (`Ctrl+Shift+B`)
- [x] PASS: Requires an image to be selected on canvas (or prompts image upload)
- [x] PASS: Uses MediaPipe for client-side background removal
- [x] PASS: Before/after preview of background removal
- [x] PASS: "Apply" button replaces original image with background-removed version
- [x] PASS: "Export" options for saving the result separately
- [x] PASS: Processing indicator while MediaPipe runs
- [x] PASS: Error handling for unsupported image formats

### Save & Persistence System
#### Manual Save
- [x] PASS: `Ctrl+S` triggers save — downloads `diagram.finnish` file
- [x] PASS: `Ctrl+Shift+S` triggers Save As — prompts for filename
- [x] PASS: `.finnish` format stores canvas JSON (objects, viewport, settings)
- [x] PASS: `.json` format also supported for open/save
#### File Open
- [x] PASS: `Ctrl+O` opens file picker
- [x] PASS: Accepts `.finnish`, `.json`, `.svg` files
- [x] PASS: Loading a file replaces current canvas content
- [x] PASS: Confirm dialog shown if canvas has unsaved changes
#### Recent Diagrams Tracking
- [x] PASS: Saved diagrams added to `localStorage['finnish-recent-diagrams']`
- [x] PASS: Entry format: `{ id, name, thumbnail (data URL), updatedAt (timestamp) }`
- [x] PASS: Maximum of 6 recent entries stored
