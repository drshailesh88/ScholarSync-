# editor — Spec 022

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Footnotes, Outline Plugin, Citation Nodes, and Bibliography
- [ ] Citation nodes also support an `overrides` attribute that defaults to `null`
- [ ] Citation keyboard shortcut `Mod-Shift-C` dispatches `scholarsync:open-citation-dialog`
- [ ] Citation chip hover waits 400 ms before opening the tooltip
- [ ] Citation chip click toggles the popover open state and suppresses the hover tooltip
- [ ] Citation chip fallback text is `[?]` when a numeric citation has no assigned numbers
- [ ] Citation chip fallback text is `(?)` when an author-year citation has no resolved reference objects
- [ ] Numeric citation chips compress consecutive numbers into ranges such as `1-3`
- [ ] Citation popover `View` action opens the reference sidebar through the Zustand store before dispatching scroll-to-reference
- [ ] Citation popover `Remove` appears only when the citation node contains more than one `referenceId`
- [ ] Removing the final reference from a citation chip deletes the entire citation node
- [ ] Citation popover footer action label is `Delete citation`
- [ ] Citation numbering plugin debounces renumbering by 100 ms after editor updates
- [ ] Citation numbering assigns numbers on order of first appearance in the document
- [ ] Bibliography insert command refuses to insert a second bibliography node when one already exists
- [ ] Empty bibliography node view text reads `References will appear here when you add citations to your text.`
- [ ] Bibliography node view heading label is `References`
- [ ] Bibliography view uses pre-formatted CSL bibliography entries when `bibliographyEntries.length > 0`
- [ ] Bibliography view falls back to Vancouver-style text formatting when CSL bibliography entries are absent
#### Citation Dialog: Shared Modal and Search Tab
- [ ] Citation dialog default active tab is `search` every time the modal opens
- [ ] Citation dialog clears `searchQuery`, `selectedIds`, DOI state, search results, and search errors on every open
- [ ] Citation dialog focuses the search input shortly after opening via a 50 ms timeout
- [ ] Citation dialog closes on backdrop click
- [ ] Citation dialog closes on `Escape`
- [ ] Citation dialog header title is `Insert Citation`
- [ ] Citation dialog tab labels are `Your References`, `Library`, `Paste DOI/PMID`, and `Manual Entry`
- [ ] Citation dialog search-input placeholder is `Search references or paste DOI/PMID...`
- [ ] Search queries starting with `10.` or containing `doi.org/` are treated as DOI identifiers
- [ ] Search queries that are 1 to 8 digits only are treated as PMID identifiers
- [ ] Search-tab non-identifier PubMed search waits 350 ms after typing before requesting `/api/references/search-pubmed`
- [ ] Search-tab PubMed request body includes `query`, `page: 1`, `pageSize: 10`, and `documentId`
- [ ] Search-tab search spinner shows while the PubMed request is pending
- [ ] Search-tab error fallback string is `PubMed search failed. Please try again.`
- [ ] Search-tab empty state text is `No PubMed or reference matches found.` when a typed non-identifier query returns nothing
- [ ] Search-tab empty state text is `No references yet. Add one using DOI/PMID or manual entry.` when there are no saved references and no active text query
- [ ] Search-tab empty state text is `No matching references found.` when local references exist but filtering returns nothing
