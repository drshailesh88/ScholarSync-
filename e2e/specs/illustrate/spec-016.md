# illustrate — Spec 016

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Prompt Input and Generation Flow
- [x] PASS: Prompt input placeholder reads "Describe the diagram you want to create..."
- [x] PASS: Prompt input starts empty on initial render
- [x] PASS: Prompt input auto-resizes with content up to 200px height
- [x] PASS: Prompt input is disabled while generation is in progress
- [x] PASS: Send button is disabled when trimmed textarea value is empty
- [x] PASS: Send button becomes enabled as soon as textarea contains non-whitespace text
- [x] PASS: Clicking Send trims leading and trailing whitespace before request submission
- [x] PASS: Successful send clears the textarea value immediately after dispatch
- [x] PASS: Successful send resets textarea inline height back to auto
- [x] PASS: Pressing Enter without Shift submits the prompt
- [x] PASS: Pressing Shift+Enter inserts a newline instead of submitting
- [x] PASS: While generating, the Send button is replaced by a Stop button
- [x] PASS: Stop button title is "Stop generation"
- [x] PASS: Stop button calls `AbortController.abort()` on the in-flight request
- [x] PASS: Aborting generation clears loading state without appending a cancellation assistant message
- [x] PASS: Prompt input footer hint reads "Press Enter to send, Shift + Enter for new line"
- [x] PASS: Live prompt input does not expose a visible character counter
- [x] PASS: Live prompt input does not enforce a local 4000-character limit in the component
- [x] PASS: Live prompt input does not expose a style dropdown in the chat composer
- [x] PASS: Live prompt input does not expose a model dropdown in the chat composer
- [x] PASS: Agent request body always sets `backend: 'auto'`
- [x] PASS: Agent request body defaults `geminiModel` to `flash` when no override is provided
- [x] PASS: Style inference upgrades to `detailed` when prompt includes `detailed`, `intricate`, or `complex`
- [x] PASS: Style inference upgrades to `schematic` when prompt includes `schematic`, `technical`, or `diagram`
- [x] PASS: Style inference upgrades to `photorealistic` when prompt includes `realistic`, `photorealistic`, or `lifelike`
- [x] PASS: Style falls back to `flat` when none of the style keywords are found
- [x] PASS: Domain detection runs before the `/api/illustration/generate` request is sent
- [x] PASS: Error response appends an assistant message beginning with "Sorry, I encountered an error:"
- [x] PASS: Error assistant message is marked with `isError: true`
- [x] PASS: Successful assistant response text includes caption when `illustration.caption` is present
- [x] PASS: Successful assistant response appends vectorization hint when `illustration.vectorized` is true
- [x] PASS: Successful assistant response appends editable path count when `illustration.pathCount` is provided
- [x] PASS: Mermaid backend responses append "You can edit the diagram structure in the Editor mode."
- [x] PASS: Gemini backend responses append "The raster preview is available for reference."
#### Agent Mode — Chat History, Preview, and Message Actions
- [x] PASS: Empty chat state shows welcome title "Welcome to FINNISH"
