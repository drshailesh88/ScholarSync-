# presentation — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Store & State Management
#### Key State Fields
- [ ] **24.6** `customThemes` -- user-defined theme storage
- [ ] **24.7** `mode` -- edit vs. preview mode
- [ ] **24.8** `rightPanel` -- which right panel is active
- [ ] **24.9** `agentMode` -- agent panel state
- [ ] **24.10** `transition` -- current transition type
- [ ] **24.11** `isPresenting` -- presenter mode flag
- [ ] **24.12** `saveStatus` -- saved/saving/unsaved indicator
#### Undo/Redo
- [ ] **24.13** Undo reverts the last state change
- [ ] **24.14** Redo re-applies a reverted change
- [ ] **24.15** Undo/redo history caps at 50 entries
- [ ] **24.16** Exceeding 50 entries drops the oldest entry

### Loading, Error & Edge Cases
- [ ] **25.1** Error banner: "Presentations unavailable" renders on module-level failure
- [ ] **25.2** Error message: "We couldn't load the presentation builder. Please try again." renders on editor load failure
- [ ] **25.3** Retry action on error state reloads the editor
- [ ] **25.4** Network timeout during AI generation shows timeout error
- [ ] **25.5** Concurrent edits do not corrupt slide data
- [ ] **25.6** Large deck (50+ slides) renders without performance degradation
- [ ] **25.7** Navigating away from unsaved changes prompts a warning
- [ ] **25.8** Exporting empty deck is handled gracefully
- [ ] **25.9** Invalid theme key falls back to default theme
- [ ] **25.10** Missing deckId in URL shows meaningful error

### Custom Theme Builder
#### Modal & Header
- [ ] **26.1** Modal renders with title "Custom Theme Builder" (`custom-theme-builder.tsx:205`)
- [ ] **26.2** "Start from" dropdown with scratch option and preset entries (`custom-theme-builder.tsx:208`, `:214`, `:215`)
#### Colors Section
- [ ] **26.3** Colors section header displays "Colors" (`custom-theme-builder.tsx:226`)
- [ ] **26.4** Primary picker via ThemeColorField (`custom-theme-builder.tsx:228`)
- [ ] **26.5** Secondary picker via ThemeColorField (`custom-theme-builder.tsx:229`)
- [ ] **26.6** Background picker via ThemeColorField (`custom-theme-builder.tsx:230`)
- [ ] **26.7** Text picker via ThemeColorField (`custom-theme-builder.tsx:231`)
- [ ] **26.8** Accent picker via ThemeColorField (`custom-theme-builder.tsx:232`)
- [ ] **26.9** Surface picker via ThemeColorField (`custom-theme-builder.tsx:233`)
#### Typography Section
- [ ] **26.10** Typography section header "Typography" (`custom-theme-builder.tsx:239`)
- [ ] **26.11** Heading Font dropdown with FONT_OPTIONS (`custom-theme-builder.tsx:242`, `:245`, `:248`)
- [ ] **26.12** Body Font dropdown with FONT_OPTIONS (`custom-theme-builder.tsx:254`, `:257`, `:260`)
- [ ] **26.13** Font Size Scale label "Font Size Scale" and button group (`custom-theme-builder.tsx:266`, `:268`, `:272`)
- [ ] **26.14** Selected font size scale shows active style `bg-brand/10 border-brand` (`custom-theme-builder.tsx:275`)
