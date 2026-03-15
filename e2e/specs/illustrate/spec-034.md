# illustrate — Spec 034

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### AI Image Generation Tool — Full UI Details (`AIGenerationTool.tsx`)
- [x] PASS: API key section is shown only when `!isApiKeyConfigured`; once configured, it hides
- [x] PASS: API key hint links to `https://fal.ai/dashboard/keys` with `target="_blank"` and `rel="noopener noreferrer"`
- [x] PASS: API key label text is `fal.ai API Key` preceded by KeyIcon
- [x] PASS: `configureFalClient(apiKey)` is called in useEffect; failure sets `isApiKeyConfigured` to false
- [x] PASS: Prompt textarea placeholder is `e.g., Human heart anatomy with labeled chambers and valves, detailed cross-section view`
- [x] PASS: Prompt textarea is disabled during generation (`generatingState.isGenerating`)
- [x] PASS: Style options are 5 buttons in a 3-column grid: `Clean Vector`, `Detailed`, `Sketch`, `Diagram`, `Realistic`
- [x] PASS: Style option values are `clean`, `detailed`, `sketch`, `diagram`, `photorealistic`
- [x] PASS: Default style is `clean` (not `flat` as in the agent mode API)
- [x] PASS: Style buttons are disabled during generation
- [x] PASS: Size options in dropdown: `Square (1024x1024)`, `Landscape 4:3`, `Portrait 4:3`, `Landscape 16:9`, `Portrait 16:9`
- [x] PASS: Size option values: `square_hd`, `landscape_4_3`, `portrait_4_3`, `landscape_16_9`, `portrait_16_9`
- [x] PASS: Default size is `square_hd`
- [x] PASS: Model options in dropdown: `Fast (~$0.008)`, `Quality (~$0.012)`, `Pro (~$0.03)`
- [x] PASS: Model option values: `fal-ai/flux/schnell`, `fal-ai/flux/dev`, `fal-ai/flux-pro`
- [x] PASS: Default model is `fal-ai/flux/schnell`
- [x] PASS: Cost estimate info box text: `Estimated cost: $X.XXX per image (averageTime)`
- [x] PASS: Empty prompt error message: `Please enter a prompt`
- [x] PASS: Missing API key error message: `Please enter your fal.ai API key`
- [x] PASS: Generic generation error message: `Failed to generate image. Please try again.`
- [x] PASS: `ImageGenerationError` instances use their own `.message` instead of generic fallback
- [x] PASS: Progress bar shows during generation with status text and percentage (`Math.round(progress * 100)%`)
- [x] PASS: Initial progress status text is `Starting...`; completion status text is `Complete!`
- [x] PASS: Single image result renders as one full-width preview; multiple images render in 2-column grid
- [x] PASS: Multiple image previews are selectable via click (sets `selectedImageIndex`)
- [x] PASS: Selected image gets blue border (`borderColor: var(--accent-primary)`, `borderWidth: 2px`)
- [x] PASS: Result stats show: `width x heightpx`, `Seed: {seed}`, `Generated in {seconds}s`
- [x] PASS: Generate button disabled when `isGenerating || !prompt.trim() || !isApiKeyConfigured`
- [x] PASS: Generate button text toggles: `Generate Image` → `Generating...`
- [x] PASS: After result: two buttons appear — `New Generation` (secondary) and `Apply to Canvas` (primary with CheckIcon)
- [x] PASS: Apply to Canvas scales image to fit 80% of canvas dimensions, capped at scale 1.0
- [x] PASS: Apply to Canvas centers image, adds to canvas, sets as active object, then calls `onClose`
- [x] PASS: Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [x] PASS: `handleReset` clears prompt, result, selectedImageIndex, and generatingState
- [x] PASS: Object URL from blob is revoked after FabricImage creation via `URL.revokeObjectURL`
