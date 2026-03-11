# notebook — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Accessibility
- [ ] **Share button** — `aria-label="Share notebook"`
- [ ] **Close buttons** — `aria-label="Close source notes"` and `aria-label="Close share dialog"` are present; the audio overview close control uses only `title="Close audio overview"`
- [ ] **Remove file** — `aria-label="Remove {filename}"`
- [ ] **Extract PICO** — `aria-label="Extract PICO data from {filename}"`
- [ ] **View extraction** — `aria-label="View extraction for {filename}"`
- [ ] **Retry embed** — `aria-label="Retry embedding for {filename}"`
- [ ] **Copy response** — `aria-label="Copy response to clipboard"`
- [ ] **Feedback** — `aria-label="Mark response as helpful"` / `"Mark response as unhelpful"`

### Quick Test Workflows
#### Route-Level Loading and Error States
- [ ] `/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder
- [ ] Notebook loading skeleton does not render the real upload button, history list, or chat input while loading
- [ ] `/notebook` route-level error display title is `Notebook unavailable`
- [ ] `/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`
- [ ] Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback
#### Initial Library and Conversation Hydration
- [ ] Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen
- [ ] Library-backed source rows default to `selected: true`
- [ ] Library-backed source rows show `size: "Library"` until replaced by upload or URL-specific metadata
- [ ] Library-backed source rows set `status: "ready"` immediately on mount
- [ ] Library-backed source rows set `isExtracted` from `paper.is_extracted`
- [ ] Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present
- [ ] Existing extraction records are fetched only for papers where `is_extracted` is true
- [ ] Failed initial paper hydration is swallowed silently in the UI
- [ ] Past conversations are loaded with `getConversations("notebook")` and trimmed to 20 items
- [ ] Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list
#### Sidebar Header and Mode Switch Details
- [ ] Sidebar title is `Notebook Sources`
- [ ] Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources
- [ ] Back arrow is a link to `/dashboard`, not a button with imperative navigation
- [ ] Notebook mode defaults to `research` on first render
- [ ] Mode toggle container has `role="tablist"` with `aria-label="Notebook mode"`
- [ ] Each mode button uses `role="tab"` and toggles only `aria-selected`, not `tabIndex`
- [ ] Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle
- [ ] Switching notebook mode does not clear existing messages or reset the current conversation by itself
#### Conversation History Details
- [ ] History button label is `Past conversations`
- [ ] History toggle is a full-width button with the caret pushed to the far right by `ml-auto`
- [ ] History dropdown max height is `max-h-32`
- [ ] New conversation action appears as the first row inside the expanded history list
