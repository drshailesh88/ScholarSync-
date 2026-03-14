# analysis — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] When document mode has no `activeDoc`, the textarea is replaced by the empty-document state
- [ ] Empty-document state uses a `FileText` icon above the message
- [ ] Empty-document state message reads `No document found. Write something in the Studio first, or switch to paste mode.`
- [ ] Empty-document state hides the textarea and analyze button entirely
- [ ] Document-mode textarea placeholder is `Document content loaded from your project...`
- [ ] Paste-mode textarea placeholder is `Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...`
- [ ] Document-mode textarea is `readOnly`
- [ ] Paste-mode textarea is editable
- [ ] Textarea uses `font-serif`
- [ ] Textarea uses `resize-none`
- [ ] Textarea uses `focus:ring-2 focus:ring-brand/40` when focused
- [ ] Word count text is always computed from `effectiveText.split(/\s+/).filter(Boolean).length`
- [ ] Word count reads `0 words` when the textarea is empty or whitespace-only
- [ ] Paste-mode typing updates `inputText` on every `onChange`
- [ ] Inline error text is rendered directly under the textarea in red when `error` is non-null
- [ ] Forced submission with fewer than 50 characters sets `Please enter at least 50 characters of text to analyze.`
- [ ] New document loads clear prior errors by setting `error` back to `null`
- [ ] Starting a new analysis clears prior errors before the fetch begins
- [ ] Non-OK API responses use `data.error || "Writing analysis failed"` for the inline error
- [ ] Network exceptions set the inline error to `Failed to connect. Check your API key.`
- [ ] Error feedback is inline text only; there is no toast, alert banner, or modal
- [ ] Analyze button label is `Analyze Writing` while idle
- [ ] Analyze button includes a leading `Sparkle` icon while idle
- [ ] Analyze button is disabled when `effectiveText.trim().length < 50`
- [ ] Analyze button is disabled when `loading` is true
- [ ] Disabled button uses the `disabled:opacity-50` style
- [ ] Clicking Analyze serializes the request body as `{ text: inputText, mode: "full" }`
- [ ] Clicking Analyze splits the current text into paragraphs using `/\n\n+/` before the network request
- [ ] While loading, the button label changes to `Analyzing...`
- [ ] While loading, the button still renders the `Sparkle` icon; it does not swap to a spinner in the current implementation
- [ ] Successful responses store the parsed JSON in `result`
- [ ] Successful responses keep the previously computed `clientMetrics` visible for the results summary cards
- [ ] Instant metrics panel is hidden until `clientMetrics` exists and trimmed text length is greater than 0
- [ ] Instant metrics panel appears for loaded document text as well as pasted text
- [ ] Instant metrics analysis is debounced by 500ms after the last text change
