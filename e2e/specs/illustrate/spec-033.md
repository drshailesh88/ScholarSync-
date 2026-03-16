# illustrate — Spec 033

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### API Route: `/api/illustration/icons` (GET)
- [x] PASS: No rate limiting applied
- [x] PASS: Input validation: requires `.svg` extension, rejects names containing `..` or `/`
- [x] PASS: Error for missing name: `{ error: "Missing 'name' parameter" }` (400)
- [x] PASS: Error for unsafe name: `{ error: "Invalid icon name" }` (400)
- [x] PASS: Response `Content-Type: image/svg+xml` with `Cache-Control: public, max-age=31536000, immutable`
- [x] PASS: Production: serves from R2 bucket at path `icons/bioicons/{name}`
- [x] PASS: Development: serves from local `.data/icons/bioicons/{name}` directory
- [x] PASS: Dev 404 message: `Icon not found (run upload script first)`; production 404: `Icon not found`
#### API Route: `/api/illustration/icons/search` (GET)
- [x] PASS: No rate limiting applied (unlike other illustration API routes)
- [x] PASS: Query parameter `q` is optional; empty/missing returns empty results
- [x] PASS: `expand_synonyms` parameter: boolean, default `true`
- [x] PASS: `include_scores` parameter: boolean, default `false`
- [x] PASS: Scoring algorithm: `100` (exact name match), `50` (starts-with), `25` (contains), `20` (category match), `30`/`15`/`10` (keyword exact/starts/contains), `3` (synonym match)
- [x] PASS: Response includes `expanded_terms` array when `expand_synonyms` is true
- [x] PASS: Category `medical` matches libraries `health`, `bioicons`, `bioicons-full`, or categories `anatomy`, `equipment`, `diagnostics`, `conditions`, `services`, and `biology`
#### API Route: `/api/illustration/icons/generate` (POST)
- [x] PASS: Schema: `name` (1–100 chars), `style` (`flat`/`outline`/`filled`/`minimal`), `category` (`scientific`/`medical`/`ui`/`arrows`/`shapes`)
- [x] PASS: `color` is optional, `size` range 16–512 (default 64), `useGemini` boolean (default false)
- [x] PASS: Rate limited with `RATE_LIMITS.ai`
- [x] PASS: Response includes `metadata.pathCount` and `metadata.palette`
- [x] PASS: `extractSVG()` strips markdown code block wrappers before returning SVG
- [x] PASS: `cleanSVG()` adds `xmlns` and `viewBox` attributes to malformed SVGs
- [x] PASS: Gemini generation failure falls back to LLM-based SVG generation
#### API Route: `/api/illustration/save` (POST) — Full Schema
- [x] PASS: Schema includes optional fields: `description`, `svgContent`, `canvasJson` (any), `mermaidSyntax`, `domain`, `sourceBackend`, `sourcePrompt`, `width` (number), `height` (number)
- [x] PASS: Mock success response includes `userId` field alongside echoed illustration data
#### API Route: `/api/illustration/generate` (POST) — Additional Details
- [x] PASS: `traceGeneration()` called for observability tracing with `tier`, `modelId`, `feature`, `userId`
- [x] PASS: Gemini vectorization `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` again for `schematic` or `photorealistic`
#### Editor Store Details (`editorStore.ts`)
- [x] PASS: Editor store uses `subscribeWithSelector` middleware
- [x] PASS: Editor store devtools name is `finnish-editor-store`
- [x] PASS: `selectObjects(objectIds)` action replaces entire selection array
- [x] PASS: `addToSelection(objectId)` action appends to selection array
- [x] PASS: `removeFromSelection(objectId)` action filters from selection array
#### AI Image Generation Tool — Full UI Details (`AIGenerationTool.tsx`)
- [x] PASS: Panel title text is `AI Image Generation` preceded by a SparklesIcon SVG
- [x] PASS: Close button has `aria-label="Close"`
- [x] PASS: API key is persisted to `localStorage['finnish_fal_api_key']`
- [x] PASS: API key input is `type="password"` with placeholder `Enter your fal.ai API key`
