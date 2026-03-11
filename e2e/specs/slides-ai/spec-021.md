# slides-ai — Spec 021

STATUS: PENDING
TESTED: 0/16
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### BlockInserterMenu — Additional Details (`block-inserter-menu.tsx`)
- [ ] Category labels: `content → "Content"`, `media → "Media & Data"`, `academic → "Academic"`
#### Behavior Corrections (Pass 2)
- [ ] Slides-agent quick-action chips SET INPUT TEXT only and do NOT auto-send; original Section 3 line 96 ("Clicking a chip sends the action as a message") is incorrect for SlidesAgentPanel — behavior matches GammaAgentPanel
- [ ] GammaAgentPanel uses local React `useState` for messages, NOT the store-backed `agentChatHistory` (which is only used by SlidesAgentPanel)
- [ ] ThemeCustomizer small theme swatches (64×36px) show the check badge in the BOTTOM-RIGHT corner, not top-right as stated
- [ ] Outline wizard theme step uses `flex-wrap justify-center gap-3`, not a `4-column grid` as original Section 16 claims
- [ ] Card accent bar in CardStack is `h-1` (4px), not `1px` as original Section 10 claims
- [ ] Active card in CardStack uses `ring-1 ring-brand/30`, not `ring-2` + blue border as original Section 10 claims
- [ ] CardSparkleMenu silently swallows API errors — there is no user-facing error message (original Section 12 says "Error messages displayed on failure" for other panels but sparkle menu has empty `catch {}`)
- [ ] PDF export in Slides mode opens `HandoutExportDialog` with layout/options before downloading (not a direct single-click download like PPTX)
- [ ] Only PPTX export receives `themeConfig` from Gamma mode's `export-deck.ts`; PDF export does not send theme
- [ ] Server-side `cardCount` validation allows up to 30 (`z.number().int().min(3).max(30)`), while UI slider limits to 20
- [ ] No `loading.tsx` or `error.tsx` route-level files exist under `src/app/(app)/slides/`; all loading/error UI is handled within `SlidesWorkspace` component
- [ ] `HandoutExportDialog` opens with UI defaults `layout="three_up_notes"` and `paperSize="letter"` even though the PDF route schema defaults `layout` to `"full_slide"`
- [ ] `HandoutExportDialog` disables the `Include speaker notes` checkbox unless `layout === "three_up_notes"`
- [ ] Slides-mode PPTX/PDF export failures only log to `console.error`; unlike Gamma export, there is no user-facing alert, toast, or inline error state
- [ ] `CardBackgroundPicker` always renders the image URL input; only image-position and overlay controls are conditional on a populated `imageUrl`
