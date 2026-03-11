# illustrate — Spec 034

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### AI Image Generation Tool — Full UI Details (`AIGenerationTool.tsx`)
- [ ] API key section is shown only when `!isApiKeyConfigured`; once configured, it hides
- [ ] API key hint links to `https://fal.ai/dashboard/keys` with `target="_blank"` and `rel="noopener noreferrer"`
- [ ] API key label text is `fal.ai API Key` preceded by KeyIcon
- [ ] `configureFalClient(apiKey)` is called in useEffect; failure sets `isApiKeyConfigured` to false
- [ ] Prompt textarea placeholder is `e.g., Human heart anatomy with labeled chambers and valves, detailed cross-section view`
- [ ] Prompt textarea is disabled during generation (`generatingState.isGenerating`)
- [ ] Style options are 5 buttons in a 3-column grid: `Clean Vector`, `Detailed`, `Sketch`, `Diagram`, `Realistic`
- [ ] Style option values are `clean`, `detailed`, `sketch`, `diagram`, `photorealistic`
- [ ] Default style is `clean` (not `flat` as in the agent mode API)
- [ ] Style buttons are disabled during generation
- [ ] Size options in dropdown: `Square (1024x1024)`, `Landscape 4:3`, `Portrait 4:3`, `Landscape 16:9`, `Portrait 16:9`
- [ ] Size option values: `square_hd`, `landscape_4_3`, `portrait_4_3`, `landscape_16_9`, `portrait_16_9`
- [ ] Default size is `square_hd`
- [ ] Model options in dropdown: `Fast (~$0.008)`, `Quality (~$0.012)`, `Pro (~$0.03)`
- [ ] Model option values: `fal-ai/flux/schnell`, `fal-ai/flux/dev`, `fal-ai/flux-pro`
- [ ] Default model is `fal-ai/flux/schnell`
- [ ] Cost estimate info box text: `Estimated cost: $X.XXX per image (averageTime)`
- [ ] Empty prompt error message: `Please enter a prompt`
- [ ] Missing API key error message: `Please enter your fal.ai API key`
- [ ] Generic generation error message: `Failed to generate image. Please try again.`
- [ ] `ImageGenerationError` instances use their own `.message` instead of generic fallback
- [ ] Progress bar shows during generation with status text and percentage (`Math.round(progress * 100)%`)
- [ ] Initial progress status text is `Starting...`; completion status text is `Complete!`
- [ ] Single image result renders as one full-width preview; multiple images render in 2-column grid
- [ ] Multiple image previews are selectable via click (sets `selectedImageIndex`)
- [ ] Selected image gets blue border (`borderColor: var(--accent-primary)`, `borderWidth: 2px`)
- [ ] Result stats show: `width x heightpx`, `Seed: {seed}`, `Generated in {seconds}s`
- [ ] Generate button disabled when `isGenerating || !prompt.trim() || !isApiKeyConfigured`
- [ ] Generate button text toggles: `Generate Image` → `Generating...`
- [ ] After result: two buttons appear — `New Generation` (secondary) and `Apply to Canvas` (primary with CheckIcon)
- [ ] Apply to Canvas scales image to fit 80% of canvas dimensions, capped at scale 1.0
- [ ] Apply to Canvas centers image, adds to canvas, sets as active object, then calls `onClose`
- [ ] Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [ ] `handleReset` clears prompt, result, selectedImageIndex, and generatingState
- [ ] Object URL from blob is revoked after FabricImage creation via `URL.revokeObjectURL`
