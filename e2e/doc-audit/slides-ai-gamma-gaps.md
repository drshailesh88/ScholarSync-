# Slides AI / Gamma — Feature Doc Gaps

**Source doc:** `SLIDES_AI_GAMMA_FEATURES_TESTING.md`
**After Claude Code pass 2:** 604 checks
**After Codex verification pass:** 608 checks
**Claude pass 2 review:** 189 assertions reviewed, 182 exact, 0 hallucinated, 7 partials corrected in doc

## Corrections Applied To The Main Doc

- Slides-mode quick-action chips do not auto-send; they prefill the input and focus the textarea.
- Card background image URL input is always visible; only image-position and overlay controls are conditional.
- CardStack active styling is `border-brand ring-1 ring-brand/30`, and the accent bar is `h-1` (4px).
- CardEditor only renders the subtitle editor when a subtitle already exists.
- Gamma agent textarea starts at `rows=1` and does not auto-resize.
- Outline editor is a scrollable vertical list, not a grid.
- Outline theme step uses a flex-wrapped swatch row, not a 4-column grid.
- Gamma PDF export sends title + mapped slides, but no `themeConfig`.
- Workflow steps for SlidesAgentPanel and GammaAgentPanel now reflect chip-prefill behavior instead of auto-send.
- Route model assertions were corrected to provider-dependent `getModel()` / `getSmallModel()` behavior.
- Coach response docs now note that `suggestions[].autoFixAvailable` is optional and not Zod-validated.

## Remaining High-Value Discoveries Added

- `HandoutExportDialog` opens with UI defaults `layout="three_up_notes"` and `paperSize="letter"`, even though the PDF route schema default layout is `"full_slide"`.
- `HandoutExportDialog` disables `Include speaker notes` unless `layout === "three_up_notes"`.
- Slides-mode PPTX/PDF export failures only log to `console.error`; unlike Gamma export, there is no user-facing alert, toast, or inline error.
- `CardBackgroundPicker` conditionally reveals image-position and overlay controls only after `imageUrl` is populated.
