# Editor — Feature Doc Gaps

**Original doc:** `EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 231
**After Codex Pass 1:** 389
**After Codex Pass 2:** 989
**After Claude Code Pass 3:** 1203
**After Codex Verification Pass:** 1211
**Hallucinations removed from Claude Pass 3:** 5
**Partially-correct Claude assertions rewritten via Codex verification:** 1
**New checks added in Codex verification:** 14
**Missing from original doc:** 980
**Original doc completeness:** 19.1%

## Verification Summary

- Claude Code Pass 3 accuracy on this module was 97.2%: 208 fully correct, 5 inaccurate, 1 partially correct.
- Removed inaccurate claims about the non-existent lack of command palette support, incorrect outline navigation internals, incorrect footnote-row navigation internals, the `99+` research badge cap, and the claim that `toolbar.tsx` is not rendered.
- Corrected the research-store `clearSearch()` behavior to note that it preserves `hasSearchedBefore`.
- Added missing source-backed checks for the global command palette, real outline and footnote navigation behavior, actual research badge cap behavior, active Studio toolbar rendering, and cleanup/timer behavior that all three prior passes had missed.

## Final Corrected Coverage Areas Added By Verification

- Global `Cmd/Ctrl+K` command palette wiring through `AppShell`
- Actual `DocumentOutline` click behavior (`scrollIntoView` + `setTextSelection(pos + 1)`)
- Actual `FootnoteSection` click behavior (`focus` + `setTextSelection(fn.pos)` + `scrollIntoView`)
- Real `ResearchSidebar` badge cap text (`99`)
- Real `clearSearch()` reset semantics in the research store
- Active `/studio` rendering of `Toolbar`
- Comment-sidebar listener cleanup
- Studio title-save timer cleanup
- Studio citation-notice timer replacement behavior
