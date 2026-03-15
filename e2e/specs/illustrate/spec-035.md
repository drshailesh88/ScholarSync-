# illustrate — Spec 035

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Background Removal Tool — Full UI Details (`BackgroundRemovalTool.tsx`)
- [x] PASS: Panel title text is `Background Removal` preceded by a MagicWandIcon SVG
- [x] PASS: Close button has `aria-label="Close"`
- [x] PASS: Browser support check via `isBackgroundRemovalSupported()` renders error if unsupported
- [x] PASS: Unsupported browser error text: `Background removal is not supported in this browser. Please use a modern browser with WebAssembly support.`
- [x] PASS: Drop zone has `role="button"`, `tabIndex={0}`, and `aria-label="Drop zone for image upload"`
- [x] PASS: Drop zone default text: `Drag & drop an image, or` followed by styled `browse` link
- [x] PASS: Drop zone drag-active text: `Drop your image here`
- [x] PASS: Supported formats text below drop zone: `PNG, JPG, WebP up to 10MB`
- [x] PASS: Privacy info box text: `AI-powered background removal runs entirely in your browser. No data is sent to any server.`
- [x] PASS: Hidden file input accepts: `image/png,image/jpeg,image/webp`
- [x] PASS: Non-image file error: `Please select an image file (PNG, JPG, WebP)`
- [x] PASS: Processing stages: `loading-model` → `Loading AI model...`, `processing` → `Removing background...`, `encoding` → `Encoding result...`, `complete` → `Complete!`, null → `Processing...`
- [x] PASS: Preview shows side-by-side: `ORIGINAL` label (left) and `RESULT` label (right)
- [x] PASS: Result placeholder text before processing: `Click "Remove Background"`
- [x] PASS: Result placeholder text during processing: `Processing...`
- [x] PASS: Result preview image background uses checkerboard pattern (transparency indicator)
- [x] PASS: Generic processing error: `Failed to remove background. Please try again.`
- [x] PASS: `BackgroundRemovalError` instances use their own `.message`
- [x] PASS: Result stats show: `Size: width x heightpx`, `Processed in {time}`, `Output: {fileSize}`
- [x] PASS: `formatFileSize` outputs bytes as `B`, `KB`, or `MB`
- [x] PASS: `formatTime` outputs ms as `Nms` or `N.Ns`
- [x] PASS: Before processing: `Reset` button (secondary, disabled during processing) and `Remove Background` button (primary, with MagicWandIcon)
- [x] PASS: After processing: `Reset` button and `Apply to Canvas` button (primary, with CheckIcon)
- [x] PASS: Processing button text toggles: `Remove Background` → `Processing...`
- [x] PASS: Apply to Canvas scales to 80% of canvas, capped at 1.0, centers, sets active
- [x] PASS: Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [x] PASS: useEffect cleanup revokes both `originalPreview` and `resultPreview` URLs on unmount
- [x] PASS: File input value is reset to `''` after each selection to allow re-selecting same file
#### Document Settings Dialog — Full Details (`DocumentSettings.tsx`, `document-settings.ts`)
- [x] PASS: Dialog has `role="dialog"`, `aria-modal="true"`, `aria-label="Document settings"`
- [x] PASS: Clicking backdrop (outside dialog) calls `onCancel`
- [x] PASS: Dialog header text is `Document Settings`
- [x] PASS: Canvas presets: `A4` (2480×3508), `A3` (3508×4960), `Letter` (2550×3300), `1080 x 1080 (Instagram)` (1080×1080), `1920 x 1080 (HD)` (1920×1080), `Custom`
- [x] PASS: Preset select has `id="canvas-preset-select"` with associated `<label>`
- [x] PASS: Orientation toggle buttons: `Portrait` and `Landscape`
- [x] PASS: Changing orientation swaps width and height values
