# analysis — Spec 005

STATUS: PARTIAL
TESTED: 35/35
PASS: 31
FAIL: 4
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: When document mode has no `activeDoc`, the textarea is replaced by the empty-document state
- [x] PASS: Empty-document state uses a `FileText` icon above the message
- [x] PASS: Empty-document state message reads `No document found. Write something in the Studio first, or switch to paste mode.`
- [x] PASS: Empty-document state hides the textarea and analyze button entirely
- [x] PASS: Document-mode textarea placeholder is `Document content loaded from your project...`
- [x] PASS: Paste-mode textarea placeholder is `Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...`
- [x] PASS: Document-mode textarea is `readOnly`
- [x] PASS: Paste-mode textarea is editable
- [x] PASS: Textarea uses `font-serif`
- [x] PASS: Textarea uses `resize-none`
- [x] PASS: Textarea uses `focus:ring-2 focus:ring-brand/40` when focused
- [x] PASS: Word count text is always computed from `effectiveText.split(/\s+/).filter(Boolean).length`
- [x] PASS: Word count reads `0 words` when the textarea is empty or whitespace-only
- [x] PASS: Paste-mode typing updates `inputText` on every `onChange`
- [x] PASS: Inline error text is rendered directly under the textarea in red when `error` is non-null
- [x] PASS: Forced submission with fewer than 50 characters sets `Please enter at least 50 characters of text to analyze.`
- [x] PASS: New document loads clear prior errors by setting `error` back to `null`
- [ ] FAIL: Starting a new analysis clears prior errors before the fetch begins
- [x] PASS: Non-OK API responses use `data.error || "Writing analysis failed"` for the inline error
- [x] PASS: Network exceptions set the inline error to `Failed to connect. Check your API key.`
- [ ] FAIL: Error feedback is inline text only; there is no toast, alert banner, or modal
- [x] PASS: Analyze button label is `Analyze Writing` while idle
- [x] PASS: Analyze button includes a leading `Sparkle` icon while idle
- [x] PASS: Analyze button is disabled when `effectiveText.trim().length < 50`
- [x] PASS: Analyze button is disabled when `loading` is true
- [x] PASS: Disabled button uses the `disabled:opacity-50` style
- [x] PASS: Clicking Analyze serializes the request body as `{ text: inputText, mode: "full" }`
- [x] PASS: Clicking Analyze splits the current text into paragraphs using `/\n\n+/` before the network request
- [x] PASS: While loading, the button label changes to `Analyzing...`
- [x] PASS: While loading, the button still renders the `Sparkle` icon; it does not swap to a spinner in the current implementation
- [x] PASS: Successful responses store the parsed JSON in `result`
- [x] PASS: Successful responses keep the previously computed `clientMetrics` visible for the results summary cards
- [x] PASS: Instant metrics panel is hidden until `clientMetrics` exists and trimmed text length is greater than 0
- [ ] FAIL: Instant metrics panel appears for loaded document text as well as pasted text
- [ ] FAIL: Instant metrics analysis is debounced by 500ms after the last text change
