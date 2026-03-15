# illustrate — Spec 030

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Error Boundary Details (`ErrorBoundary.tsx`)
- [ ] Scope-specific fallback title follows pattern `${scope} failed to load`
- [ ] Default fallback description is `An unexpected error occurred. Try resetting this section or reload the page.`
- [ ] Error message appended in parentheses after description when present: ` (${error.message})`
- [ ] Fallback container has `role="alert"` and `aria-live="assertive"`
- [ ] Primary action button text is `Try Again` (not "Reset" as documented in Section 21)
- [ ] `Reload Page` button appears ONLY in `fullScreen` mode
- [ ] Error details section visible ONLY when `process.env.NODE_ENV === 'development'`
- [ ] Error details toggle button text: `Show Error Details` / `Hide Error Details`
- [ ] Error details display: error name, message, stack trace, and component stack
- [ ] ErrorBoundary supports `resetKeys` prop — auto-resets when any key value changes
- [ ] Inline (non-fullScreen) error container has min-height `280px` with border-radius `12px`
#### Toolbar Accessibility and Structure (`Toolbar.tsx`)
- [ ] Tool buttons are organized into 7 named groups with visual dividers between groups
- [ ] Group aria-labels: `Selection`, `Shapes`, `Lines`, `Draw`, `Text`, `Utility`, `Scientific Shapes`
- [ ] Each tool group uses `role="group"` with its respective aria-label
- [ ] Tool buttons have `aria-pressed` attribute reflecting active state
- [ ] Tool buttons have `data-tool-label` attribute set to the tool label
- [ ] Toolbar width derives from CSS custom property `var(--toolbar-width, 48px)`
- [ ] Shape config popups positioned at `position: 'absolute', left: '100%', top: '50%'` relative to their button
- [ ] Polygon/star numeric input validated with `Number.isFinite(value)` before store update
#### Right Panel Tab Accessibility (`RightPanel.tsx`)
- [ ] Tab buttons use `role="tab"` with `aria-selected` attribute
- [ ] Tab button id follows pattern `tab-${tab.id}`
- [ ] Tab button `aria-controls` follows pattern `panel-${tab.id}`
- [ ] Tab content area uses `role="tabpanel"` with `aria-labelledby` matching the active tab id
- [ ] Tab content area id follows pattern `panel-${activeTab}`
- [ ] Right panel sidebar width derives from CSS custom property `var(--sidebar-width, 280px)`
- [ ] Canvas dimensions default to 800×600 in icon insertion fallback when canvas size is unavailable
#### PointEditingOverlay Visuals and Interaction (`PointEditingOverlay.tsx`)
- [ ] Anchor point visual: border `#0f172a`, background `#ffffff`, cursor `move`
- [ ] Selected anchor: background `#1d4ed8`
- [ ] Handle point visual: border `#0284c7`, background `#bae6fd`, borderRadius `50%`, cursor `crosshair`
- [ ] Guide lines between anchor and handle: stroke color `#94a3b8`
- [ ] Holding `Alt` key during handle drag toggles `mirrorOpposite` behavior for independent handle control
- [ ] Click on path segment adds new anchor point when click is within `8px / zoom` threshold of nearest segment
- [ ] Shift+click on anchor adds or removes it from multi-selection set
- [ ] Double-click on anchor point toggles smooth/corner state via `toggleAnchorSmooth()`
- [ ] Double-click on overlay background exits point editing mode via `onExit()` callback
