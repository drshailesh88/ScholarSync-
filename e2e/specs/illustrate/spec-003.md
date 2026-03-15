# illustrate — Spec 003

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Agent Mode — AI Diagram Generation (`/illustrate/agent`)
#### Style & Model Selection
- [ ] "schematic", "technical", "diagram" → `schematic`
- [ ] "realistic", "photorealistic", "lifelike" → `photorealistic`
- [ ] Default fallback → `flat`
#### Domain Detection (21+ Domains)
- [ ] Cardiology detected: heart, cardiac, coronary, ECG, arrhythmia
- [ ] Neurology detected: brain, neural, neuron, synapse, dementia, Alzheimer
- [ ] Pulmonology detected: lung, pulmonary, respiratory, alveoli, asthma
- [ ] Gastroenterology detected: stomach, intestine, liver, pancreas
- [ ] Endocrinology detected: hormone, thyroid, diabetes, insulin, metabolism
- [ ] Nephrology detected: kidney, renal, dialysis, ureter
- [ ] Hematology/Oncology detected: blood, leukemia, cancer, tumor, hemoglobin
- [ ] Infectious Disease detected: virus, bacteria, infection, antibiotic, pathogen
- [ ] Additional domains (Orthopedics, Dermatology, Ophthalmology, Physics, Chemistry, etc.) detected correctly
- [ ] Domain passed to API in request body
#### Preview Pane (Right Sidebar)
- [ ] Preview pane visible when diagram is generated
- [ ] SVG renders correctly in the preview area
- [ ] Zoom controls work (range: 25%–400%)
- [ ] Zoom in/out buttons increment/decrement correctly
- [ ] Close button collapses preview pane
- [ ] Preview pane toggle button restores collapsed pane
#### Generation Backends
- [ ] `auto` mode — intelligently selects backend based on prompt
- [ ] `mermaid` backend — produces Mermaid diagram syntax
- [ ] `svg` backend — produces direct SVG markup
- [ ] `gemini` backend — AI image generation + vectorization
- [ ] All backends return valid renderable content
#### API Request (`POST /api/illustration/generate`)
- [ ] Request includes: `prompt`, `backend`, `domain`, `style`, `geminiModel`
- [ ] Optional fields: `slideContext`, `existingDiagram`
- [ ] Response returns `illustration.content` (SVG or Mermaid string)
- [ ] Response includes `illustration.backend`, `illustration.format`
- [ ] Error response returns `error` and optional `details` fields
#### State Management (`useAgentStore`)
- [ ] Messages array persists (last 50) via localStorage
- [ ] `currentDiagram` stores current SVG
- [ ] `isLoading` toggles correctly during generation
- [ ] `selectedCategory` persists
- [ ] `previewZoom` updates on zoom controls (25–400)
- [ ] `isSidebarCollapsed` toggles on sidebar collapse
