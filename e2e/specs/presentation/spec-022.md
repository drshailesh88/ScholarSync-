# presentation — Spec 022

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [ ] Analytics error state is a compact inline red banner saying `Failed to load analytics data`
- [ ] Slide heatmap and time-series charts are rendered only when corresponding data arrays are non-empty
- [ ] `VersionHistoryPanel` auto-clears success messages after three seconds
- [ ] First click on `Restore` or `Delete` enters a confirm state; the destructive action happens on the second click
- [ ] Compare selection caps at two versions and replaces the oldest selected version when a third is chosen
- [ ] In this editor, version comparison is not shown; `onCompareVersions` simply closes the panel
- [ ] Presenter mode is lazily imported and wrapped in a full-screen `Loading presenter mode...` fallback
- [ ] Audience view waits for an `init` message on `BroadcastChannel("presenter-slide-sync")` before rendering slides
- [ ] Audience view posts `{ type: "audience-ready" }` to the broadcast channel on mount
- [ ] Audience view waiting screen is full-screen black with spinner and text `Waiting for presenter connection...`
- [ ] Audience view applies `screenMode` overlays for `black` and `white` on top of the current slide
- [ ] Audience view never renders presenter notes or toolbar controls
- [ ] Module-level error route uses `ErrorDisplay` title `Presentations unavailable` and retry callback `reset`
#### Actual Current Behavior Corrections
- [ ] The editor page does not render a visible saved/saving/unsaved status indicator even though autosave is debounced in code
- [ ] Invalid `deckId` navigation redirects to `/presentation` instead of showing a dedicated in-editor error state
- [ ] The main editor implementation does not read from `slides-store.ts`; it keeps its own local React state and only uses the store indirectly through `ThemePicker` custom themes
- [ ] Undo/redo, right-panel store state, and many `slides-store.ts` fields listed in the original doc are not wired into this specific page component
- [ ] Blank-mode submission does not show an inline validation error when title is empty; the primary button is simply disabled
- [ ] AI wizard step 0 does not auto-advance when a source is selected; the user must click `Next`
- [ ] AI generation success does not auto-redirect; it waits for the user to click `Open Presentation`
- [ ] The editor right sidebar is always the design panel; agent/comments/analytics/defense/history mount as additional slide-over columns, not tabs inside the design panel
- [ ] `Social Export` is implemented in `SlideToolbar` but is not reachable from this editor because no `socialSlides` prop is supplied
- [ ] Agent-panel undo currently reports success in chat but does not restore the prior slide snapshot client-side
- [ ] Version comparison is not implemented in the editor; choosing two versions and invoking compare only closes the panel
- [ ] Share-panel failures, export failures, and list-page load failures are console-only in the current UI
#### SlideRenderer — Layout Rendering (`slide-renderer.tsx`)
- [ ] Every slide renders inside an `aspect-video` container with `overflow-hidden`
- [ ] Slide background uses `theme.backgroundColor`, text uses `theme.textColor`, font uses `theme.fontFamily`
- [ ] Top accent bar height is `scale * 4px` using `theme.primaryColor`
- [ ] Base font size is `scale * 16px`; all child sizes use relative `em` units
- [ ] Slide number renders at `bottom-[3%] right-[4%]` with `text-[0.6em] opacity-50` only when `showSlideNumber && slideNumber != null`
- [ ] Theme resolution falls back to `PRESET_THEMES[themeKey]` then `PRESET_THEMES.modern`
- [ ] Slide content area is inset by `p-[6%] pt-[8%]` in a flex-col container
- [ ] `title_slide`: title at `text-[2em] font-bold` in `theme.primaryColor` and `theme.headingFontFamily`; subtitle at `text-[1em] opacity-70`; centered vertically
- [ ] `section_header`: accent divider bar (`w-[3em] h-[0.15em] rounded-full`) above title using `theme.accentColor`; title at `text-[1.8em] font-bold`
- [ ] `two_column`: blocks split at `Math.ceil(blocks.length / 2)` into `grid grid-cols-2 gap-[1em]`
