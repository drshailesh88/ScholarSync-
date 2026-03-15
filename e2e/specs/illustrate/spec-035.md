# illustrate — Spec 035

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Background Removal Tool — Full UI Details (`BackgroundRemovalTool.tsx`)
- [ ] Panel title text is `Background Removal` preceded by a MagicWandIcon SVG
- [ ] Close button has `aria-label="Close"`
- [ ] Browser support check via `isBackgroundRemovalSupported()` renders error if unsupported
- [ ] Unsupported browser error text: `Background removal is not supported in this browser. Please use a modern browser with WebAssembly support.`
- [ ] Drop zone has `role="button"`, `tabIndex={0}`, and `aria-label="Drop zone for image upload"`
- [ ] Drop zone default text: `Drag & drop an image, or` followed by styled `browse` link
- [ ] Drop zone drag-active text: `Drop your image here`
- [ ] Supported formats text below drop zone: `PNG, JPG, WebP up to 10MB`
- [ ] Privacy info box text: `AI-powered background removal runs entirely in your browser. No data is sent to any server.`
- [ ] Hidden file input accepts: `image/png,image/jpeg,image/webp`
- [ ] Non-image file error: `Please select an image file (PNG, JPG, WebP)`
- [ ] Processing stages: `loading-model` → `Loading AI model...`, `processing` → `Removing background...`, `encoding` → `Encoding result...`, `complete` → `Complete!`, null → `Processing...`
- [ ] Preview shows side-by-side: `ORIGINAL` label (left) and `RESULT` label (right)
- [ ] Result placeholder text before processing: `Click "Remove Background"`
- [ ] Result placeholder text during processing: `Processing...`
- [ ] Result preview image background uses checkerboard pattern (transparency indicator)
- [ ] Generic processing error: `Failed to remove background. Please try again.`
- [ ] `BackgroundRemovalError` instances use their own `.message`
- [ ] Result stats show: `Size: width x heightpx`, `Processed in {time}`, `Output: {fileSize}`
- [ ] `formatFileSize` outputs bytes as `B`, `KB`, or `MB`
- [ ] `formatTime` outputs ms as `Nms` or `N.Ns`
- [ ] Before processing: `Reset` button (secondary, disabled during processing) and `Remove Background` button (primary, with MagicWandIcon)
- [ ] After processing: `Reset` button and `Apply to Canvas` button (primary, with CheckIcon)
- [ ] Processing button text toggles: `Remove Background` → `Processing...`
- [ ] Apply to Canvas scales to 80% of canvas, capped at 1.0, centers, sets active
- [ ] Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [ ] useEffect cleanup revokes both `originalPreview` and `resultPreview` URLs on unmount
- [ ] File input value is reset to `''` after each selection to allow re-selecting same file
#### Document Settings Dialog — Full Details (`DocumentSettings.tsx`, `document-settings.ts`)
- [ ] Dialog has `role="dialog"`, `aria-modal="true"`, `aria-label="Document settings"`
- [ ] Clicking backdrop (outside dialog) calls `onCancel`
- [ ] Dialog header text is `Document Settings`
- [ ] Canvas presets: `A4` (2480×3508), `A3` (3508×4960), `Letter` (2550×3300), `1080 x 1080 (Instagram)` (1080×1080), `1920 x 1080 (HD)` (1920×1080), `Custom`
- [ ] Preset select has `id="canvas-preset-select"` with associated `<label>`
- [ ] Orientation toggle buttons: `Portrait` and `Landscape`
- [ ] Changing orientation swaps width and height values
