# illustrate — Spec 016

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Prompt Input and Generation Flow
- [ ] Prompt input placeholder reads "Describe the diagram you want to create..."
- [ ] Prompt input starts empty on initial render
- [ ] Prompt input auto-resizes with content up to 200px height
- [ ] Prompt input is disabled while generation is in progress
- [ ] Send button is disabled when trimmed textarea value is empty
- [ ] Send button becomes enabled as soon as textarea contains non-whitespace text
- [ ] Clicking Send trims leading and trailing whitespace before request submission
- [ ] Successful send clears the textarea value immediately after dispatch
- [ ] Successful send resets textarea inline height back to auto
- [ ] Pressing Enter without Shift submits the prompt
- [ ] Pressing Shift+Enter inserts a newline instead of submitting
- [ ] While generating, the Send button is replaced by a Stop button
- [ ] Stop button title is "Stop generation"
- [ ] Stop button calls `AbortController.abort()` on the in-flight request
- [ ] Aborting generation clears loading state without appending a cancellation assistant message
- [ ] Prompt input footer hint reads "Press Enter to send, Shift + Enter for new line"
- [ ] Live prompt input does not expose a visible character counter
- [ ] Live prompt input does not enforce a local 4000-character limit in the component
- [ ] Live prompt input does not expose a style dropdown in the chat composer
- [ ] Live prompt input does not expose a model dropdown in the chat composer
- [ ] Agent request body always sets `backend: 'auto'`
- [ ] Agent request body defaults `geminiModel` to `flash` when no override is provided
- [ ] Style inference upgrades to `detailed` when prompt includes `detailed`, `intricate`, or `complex`
- [ ] Style inference upgrades to `schematic` when prompt includes `schematic`, `technical`, or `diagram`
- [ ] Style inference upgrades to `photorealistic` when prompt includes `realistic`, `photorealistic`, or `lifelike`
- [ ] Style falls back to `flat` when none of the style keywords are found
- [ ] Domain detection runs before the `/api/illustration/generate` request is sent
- [ ] Error response appends an assistant message beginning with "Sorry, I encountered an error:"
- [ ] Error assistant message is marked with `isError: true`
- [ ] Successful assistant response text includes caption when `illustration.caption` is present
- [ ] Successful assistant response appends vectorization hint when `illustration.vectorized` is true
- [ ] Successful assistant response appends editable path count when `illustration.pathCount` is provided
- [ ] Mermaid backend responses append "You can edit the diagram structure in the Editor mode."
- [ ] Gemini backend responses append "The raster preview is available for reference."
#### Agent Mode — Chat History, Preview, and Message Actions
- [ ] Empty chat state shows welcome title "Welcome to FINNISH"
