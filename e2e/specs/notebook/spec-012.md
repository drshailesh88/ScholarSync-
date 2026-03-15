# notebook — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Accessibility
- [x] PASS: **Share button** — `aria-label="Share notebook"`
- [x] PASS: **Close buttons** — `aria-label="Close source notes"` and `aria-label="Close share dialog"` are present; the audio overview close control uses only `title="Close audio overview"`
- [x] PASS: **Remove file** — `aria-label="Remove {filename}"`
- [x] PASS: **Extract PICO** — `aria-label="Extract PICO data from {filename}"`
- [x] PASS: **View extraction** — `aria-label="View extraction for {filename}"`
- [x] PASS: **Retry embed** — `aria-label="Retry embedding for {filename}"`
- [x] PASS: **Copy response** — `aria-label="Copy response to clipboard"`
- [x] PASS: **Feedback** — `aria-label="Mark response as helpful"` / `"Mark response as unhelpful"`

### Quick Test Workflows
#### Route-Level Loading and Error States
- [x] PASS: `/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder
- [x] PASS: Notebook loading skeleton does not render the real upload button, history list, or chat input while loading
- [x] PASS: `/notebook` route-level error display title is `Notebook unavailable`
- [x] PASS: `/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`
- [x] PASS: Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback
#### Initial Library and Conversation Hydration
- [x] PASS: Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen
- [x] PASS: Library-backed source rows default to `selected: true`
- [x] PASS: Library-backed source rows show `size: "Library"` until replaced by upload or URL-specific metadata
- [x] PASS: Library-backed source rows set `status: "ready"` immediately on mount
- [x] PASS: Library-backed source rows set `isExtracted` from `paper.is_extracted`
- [x] PASS: Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present
- [x] PASS: Existing extraction records are fetched only for papers where `is_extracted` is true
- [x] PASS: Failed initial paper hydration is swallowed silently in the UI
- [x] PASS: Past conversations are loaded with `getConversations("notebook")` and trimmed to 20 items
- [x] PASS: Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list
#### Sidebar Header and Mode Switch Details
- [x] PASS: Sidebar title is `Notebook Sources`
- [x] PASS: Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources
- [x] PASS: Back arrow is a link to `/dashboard`, not a button with imperative navigation
- [x] PASS: Notebook mode defaults to `research` on first render
- [x] PASS: Mode toggle container has `role="tablist"` with `aria-label="Notebook mode"`
- [x] PASS: Each mode button uses `role="tab"` and toggles only `aria-selected`, not `tabIndex`
- [x] PASS: Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle
- [x] PASS: Switching notebook mode does not clear existing messages or reset the current conversation by itself
#### Conversation History Details
- [x] PASS: History button label is `Past conversations`
- [x] PASS: History toggle is a full-width button with the caret pushed to the far right by `ml-auto`
- [x] PASS: History dropdown max height is `max-h-32`
- [x] PASS: New conversation action appears as the first row inside the expanded history list
