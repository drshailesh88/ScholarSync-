# editor — Spec 022

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Footnotes, Outline Plugin, Citation Nodes, and Bibliography
- [x] Citation nodes also support an `overrides` attribute that defaults to `null`
- [x] Citation keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:editor-action` with `insert-citation`
- [x] Citation chip hover waits 400 ms before opening the tooltip
- [x] Citation chip click toggles the popover open state and suppresses the hover tooltip
- [x] Citation chip fallback text is `[?]` when a numeric citation has no assigned numbers
- [x] Citation chip fallback text is `(?)` when an author-year citation has no resolved reference objects
- [x] Numeric citation chips compress consecutive numbers into ranges such as `1-3`
- [x] Citation popover `View` action opens the reference sidebar through the Zustand store before dispatching scroll-to-reference
- [x] Citation popover `Remove` appears only when the citation node contains more than one `referenceId`
- [x] Removing the final reference from a citation chip deletes the entire citation node
- [x] Citation popover footer action label is `Delete citation`
- [x] Citation numbering plugin debounces renumbering by 100 ms after editor updates
- [x] Citation numbering assigns numbers on order of first appearance in the document
- [x] Bibliography insert command refuses to insert a second bibliography node when one already exists
- [x] Empty bibliography node view text reads `References will appear here when you add citations to your text.`
- [x] Bibliography node view heading label is `References`
- [x] Bibliography view uses pre-formatted CSL bibliography entries when `bibliographyEntries.length > 0`
- [x] Bibliography view falls back to Vancouver-style text formatting when CSL bibliography entries are absent
#### Citation Dialog: Shared Modal and Search Tab
- [x] Citation dialog default active tab is `search` every time the modal opens
- [x] Citation dialog clears `searchQuery`, `selectedIds`, DOI state, search results, and search errors on every open
- [x] Citation dialog focuses the search input shortly after opening via a 50 ms timeout
- [x] Citation dialog closes on backdrop click
- [x] Citation dialog closes on `Escape`
- [x] Citation dialog header title is `Insert Citation`
- [x] Citation dialog tab labels are `Your References`, `Library`, `Paste DOI/PMID`, and `Manual Entry`
- [x] Citation dialog search-input placeholder is `Search references or paste DOI/PMID...`
- [x] Search queries starting with `10.` or containing `doi.org/` are treated as DOI identifiers
- [x] Search queries that are 1 to 8 digits only are treated as PMID identifiers
- [x] Search-tab non-identifier PubMed search waits 350 ms after typing before requesting `/api/references/search-pubmed`
- [x] Search-tab PubMed request body includes `query`, `page: 1`, `pageSize: 10`, and `documentId`
- [x] Search-tab search spinner shows while the PubMed request is pending
- [x] Search-tab error fallback string is `PubMed search failed. Please try again.`
- [x] Search-tab empty state text is `No PubMed or reference matches found.` when a typed non-identifier query returns nothing
- [x] Search-tab empty state text is `No references yet. Add one using DOI/PMID or manual entry.` when there are no saved references and no active text query
- [x] Search-tab empty state text is `No matching references found.` when local references exist but filtering returns nothing

<!-- Notes:
  - Reaudit completed on 2026-03-12.
  - Updated the citation shortcut wording to match the shared `scholarsync:editor-action` contract with `action: "insert-citation"`.
  - Real issue fixed during the handoff from spec 021: the temporary `Mod-Shift-7` comment-sidebar fallback was removed because it overrode Tiptap's ordered-list shortcut in the live app.
  - Source verification covered citation-node attributes and display fallbacks, citation numbering and bibliography behavior, and shared citation-dialog state/reset/search logic.
  - Live browser verification covered `Mod-Shift-C`, modal reset on open, Escape close, citation-chip hover delay, click-to-popover behavior, footer/action labels, and the `View` action dispatching `scholarsync:scroll-to-reference`.
-->
