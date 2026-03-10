# Slides — Feature Doc Gaps

**Original doc:** `SLIDES_FEATURES_TESTING.md`
**Original checkbox count:** 383
**After Codex pass 1:** 536
**After Claude Code pass 2:** 698
**After Codex verification pass:** 697
**New checks added in pass 2:** 162
**Pass-2 verification result:** 160 verified, 1 inaccurate, 1 partial

## Codex Verification Findings

- Pass 2 was mostly source-accurate, but one checkbox was wrong and one was only partially right.
- The inaccurate checkbox was the Slide Sorter breakpoint mapping. The implementation is `base -> 2`, `sm -> 3`, `md -> 4`, `lg -> 5`, `xl -> 6`.
- The partial checkbox was the presenter `init` BroadcastChannel message. It sends a render payload (`slides`, `masters`, `themeKey`, `themeConfig`, `screenMode`), not "all slide data".
- Claude's meta-claim of "11 behavior corrections" was overstated. The pass-2 section actually contains 10 behavior-correction checkboxes.
- The pass-2 API section title overstated Zod coverage. `regenerate` and `generate-image` use Zod; `import-pptx` uses manual `FormData` validation.
- One out-of-scope checklist item was removed: the orphaned `SlideCanvasEditor` no-slide empty state is real source code, but the component is not imported anywhere in the rendered slides-mode tree.

## Original-Pass Cleanup Applied
- Deck cards were corrected from "thumbnail" to "generic presentation placeholder".
- PPTX import copy was corrected from `Import PPTX` / modal-dialog wording to the actual inline `Import Presentation` flow.
- Import preview wording was corrected from "slide thumbnails" to "slide preview cards".
- New-presentation generation wording was corrected so background slide generation is conditional on a non-empty description.

## Remaining Gaps
- No additional uncovered behaviors remained in `e2e/extracted/slides/import-tree.json`; that extracted tree only covers the `/slides` list/import page and its conditions are already represented after cleanup.
