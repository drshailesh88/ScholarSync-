# illustrate — Spec 033

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### API Route: `/api/illustration/icons` (GET)
- [ ] No rate limiting applied
- [ ] Input validation: requires `.svg` extension, rejects names containing `..` or `/`
- [ ] Error for missing name: `{ error: "Missing 'name' parameter" }` (400)
- [ ] Error for unsafe name: `{ error: "Invalid icon name" }` (400)
- [ ] Response `Content-Type: image/svg+xml` with `Cache-Control: public, max-age=31536000, immutable`
- [ ] Production: serves from R2 bucket at path `icons/bioicons/{name}`
- [ ] Development: serves from local `.data/icons/bioicons/{name}` directory
- [ ] Dev 404 message: `Icon not found (run upload script first)`; production 404: `Icon not found`
#### API Route: `/api/illustration/icons/search` (GET)
- [ ] No rate limiting applied (unlike other illustration API routes)
- [ ] Query parameter `q` is optional; empty/missing returns empty results
- [ ] `expand_synonyms` parameter: boolean, default `true`
- [ ] `include_scores` parameter: boolean, default `false`
- [ ] Scoring algorithm: `100` (exact name match), `50` (starts-with), `25` (contains), `20` (category match), `30`/`15`/`10` (keyword exact/starts/contains), `3` (synonym match)
- [ ] Response includes `expanded_terms` array when `expand_synonyms` is true
- [ ] Category `medical` matches libraries `health`, `bioicons`, `bioicons-full`, or categories `anatomy`, `equipment`, `diagnostics`, `conditions`, `services`, and `biology`
#### API Route: `/api/illustration/icons/generate` (POST)
- [ ] Schema: `name` (1–100 chars), `style` (`flat`/`outline`/`filled`/`minimal`), `category` (`scientific`/`medical`/`ui`/`arrows`/`shapes`)
- [ ] `color` is optional, `size` range 16–512 (default 64), `useGemini` boolean (default false)
- [ ] Rate limited with `RATE_LIMITS.ai`
- [ ] Response includes `metadata.pathCount` and `metadata.palette`
- [ ] `extractSVG()` strips markdown code block wrappers before returning SVG
- [ ] `cleanSVG()` adds `xmlns` and `viewBox` attributes to malformed SVGs
- [ ] Gemini generation failure falls back to LLM-based SVG generation
#### API Route: `/api/illustration/save` (POST) — Full Schema
- [ ] Schema includes optional fields: `description`, `svgContent`, `canvasJson` (any), `mermaidSyntax`, `domain`, `sourceBackend`, `sourcePrompt`, `width` (number), `height` (number)
- [ ] Mock success response includes `userId` field alongside echoed illustration data
#### API Route: `/api/illustration/generate` (POST) — Additional Details
- [ ] `traceGeneration()` called for observability tracing with `tier`, `modelId`, `feature`, `userId`
- [ ] Gemini vectorization `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` again for `schematic` or `photorealistic`
#### Editor Store Details (`editorStore.ts`)
- [ ] Editor store uses `subscribeWithSelector` middleware
- [ ] Editor store devtools name is `finnish-editor-store`
- [ ] `selectObjects(objectIds)` action replaces entire selection array
- [ ] `addToSelection(objectId)` action appends to selection array
- [ ] `removeFromSelection(objectId)` action filters from selection array
#### AI Image Generation Tool — Full UI Details (`AIGenerationTool.tsx`)
- [ ] Panel title text is `AI Image Generation` preceded by a SparklesIcon SVG
- [ ] Close button has `aria-label="Close"`
- [ ] API key is persisted to `localStorage['finnish_fal_api_key']`
- [ ] API key input is `type="password"` with placeholder `Enter your fal.ai API key`
