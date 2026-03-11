# editor — Spec 037

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Chat UI Specifics
- [ ] Chat input has `rounded-xl` border radius with `focus:ring-2 focus:ring-brand/40` focus ring
- [ ] Chat form uses `<form onSubmit>` pattern — Enter key in the input triggers form submission
#### Studio Export Dropdown Icon Details
- [ ] Export dropdown container uses `glass-panel` class with `w-48` (192px) width
- [ ] PDF export button icon `FilePdf` uses `text-red-400` color class
- [ ] Word export button icon `FileDoc` uses `text-blue-400` color class
- [ ] PDF export button has `rounded-t-lg` border radius; Word export button has `rounded-b-lg`
#### Editor Page Fallback Values and Conditions
- [ ] `CitationDialog` receives `documentId={String(dbDocumentId || "default")}` — falls back to literal string `"default"` when no DB document ID exists
- [ ] `ExportDialog` receives `content={dbContent || editorContent || { type: "doc", content: [] }}` — ultimate fallback is an empty Tiptap document node
- [ ] `VersionHistory` panel only renders when all three conditions are true: `showVersionHistory && dbDocumentId && sectionId !== null`
#### Editor Page Reference Sidebar Dual-Store Sync
- [ ] Editor page computes `sidebarOpen` as logical OR of `editorReferenceSidebarOpen` (editor store) and `referenceSidebarOpen` (reference store)
- [ ] `handleSetReferenceSidebarOpen` updates BOTH the editor store and the reference store simultaneously
- [ ] A `useEffect` syncs the two stores when they fall out of sync — if either store value changes, both are set to the OR of their current values
- [ ] Reference sidebar container on editor page uses `w-80 border-l border-border bg-surface shrink-0`
#### AcademicEditor Internal Save Status vs External Persistence
- [ ] `AcademicEditor.onUpdate` sets editor store `saveStatus` to `{ state: "saving" }` immediately on every content change (before debounce fires)
- [ ] After debounce timer fires, `AcademicEditor` sets `{ state: "saved", lastSavedAt: new Date() }` — this happens before the parent's actual DB persistence completes
- [ ] This means the TopBar save indicator shows "Saved" after the debounce delay, even though the actual server save triggered by `handleEditorUpdate` may still be in progress or may fail
#### Footnote Node HTML Serialization
- [ ] Footnote node `parseHTML` matches selector `span[data-footnote-id]`
- [ ] Footnote `id` attribute maps to `data-footnote-id` HTML attribute
- [ ] Footnote `text` attribute maps to `data-footnote-text` HTML attribute
- [ ] Footnote `number` attribute maps to `data-footnote-number` HTML attribute, parsed with `parseInt(value, 10)` defaulting to string `"1"`
- [ ] Footnote `renderHTML` outputs: `<span class="footnote-marker" contenteditable="false"><sup>{number}</sup></span>`
#### Citation Node HTML Serialization
- [ ] Citation node `parseHTML` matches selector `span[data-type="citation"]`
- [ ] `referenceIds` attribute serialized as JSON string in `data-reference-ids` HTML attribute
- [ ] `overrides` attribute serialized as JSON string in `data-overrides` HTML attribute; omitted entirely from HTML when `overrides` is null
- [ ] Both `referenceIds` and `overrides` use `JSON.parse()` with fallback (`[]` and `null` respectively) on parse error
- [ ] Citation extension `addKeyboardShortcuts` registers `"Mod-Shift-c"` (lowercase `c`), not uppercase `C`
#### Studio Research Citation Author Parsing
- [ ] `toCitationAuthors()` handles comma-separated names (e.g. `"Smith, John"`) by splitting on `","` with first part as family name
- [ ] `toCitationAuthors()` handles space-separated names (e.g. `"John Smith"`) by taking the last word as family name and remaining words as given name
- [ ] Single-word author names use the word as family name with empty string for given name
- [ ] Empty or whitespace-only author strings return `{ family: "Unknown", given: "" }`
- [ ] `buildResearchReference()` always creates CSL data with `type: "article-journal"` regardless of actual source type
- [ ] Research reference `stableKey` falls back to a slugified title (`title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")`) when neither DOI nor PMID is available
#### Document Outline Header and Styling Details
- [ ] Outline panel header text is `"Document Outline"` (full phrase, not abbreviated)
- [ ] Outline header uses `text-xs font-semibold text-ink-muted uppercase tracking-wider` styling
- [ ] Collapsed outline toggle button `title` attribute is `"Document Outline"`
