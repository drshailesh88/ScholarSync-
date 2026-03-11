# presentation — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Custom Theme Builder
#### Style Section
- [ ] **26.15** Style section header "Style" (`custom-theme-builder.tsx:290`)
- [ ] **26.16** Border Radius button group from BORDER_RADIUS_OPTIONS (`custom-theme-builder.tsx:293`, `:295`, `:299`)
- [ ] **26.17** Shadow Style button group from SHADOW_OPTIONS (`custom-theme-builder.tsx:314`, `:316`, `:320`)
- [ ] **26.18** Card Spacing button group from CARD_SPACING_OPTIONS (`custom-theme-builder.tsx:334`, `:336`, `:340`)
#### Advanced Section
- [ ] **26.19** "Advanced" toggle button (`custom-theme-builder.tsx:364`, `:360`)
- [ ] **26.20** Advanced panel visibility conditional on `showAdvanced` (`custom-theme-builder.tsx:366`)
- [ ] **26.21** Code Background color picker (`custom-theme-builder.tsx:368`)
- [ ] **26.22** Callout Background color picker (`custom-theme-builder.tsx:369`)
- [ ] **26.23** Gradient From color picker (`custom-theme-builder.tsx:370`)
- [ ] **26.24** Gradient To color picker (`custom-theme-builder.tsx:371`)
- [ ] **26.25** Border Color picker (`custom-theme-builder.tsx:372`)
- [ ] **26.26** Border Style button group from BORDER_STYLE_OPTIONS (`custom-theme-builder.tsx:374`, `:376`, `:380`)
#### Preview Section
- [ ] **26.27** Preview section header "Preview" (`custom-theme-builder.tsx:400`)
- [ ] **26.28** Sample Title text renders (`custom-theme-builder.tsx:416`)
- [ ] **26.29** Body text preview renders (`custom-theme-builder.tsx:426`)
- [ ] **26.30** Accent callout block renders (`custom-theme-builder.tsx:444`)
- [ ] **26.31** Code sample `const x = 42;` renders (`custom-theme-builder.tsx:455`)
#### Theme Name & Actions
- [ ] **26.32** Theme Name label and input with placeholder "My Custom Theme" (`custom-theme-builder.tsx:465`, `:470`)
- [ ] **26.33** Name validation: empty name shows "Theme name is required" error (`custom-theme-builder.tsx:476`)
- [ ] **26.34** Name error highlights input border red (`custom-theme-builder.tsx:473`)
- [ ] **26.35** Cancel button closes builder (`custom-theme-builder.tsx:484`, `:481`)
- [ ] **26.36** "Apply Without Saving" button applies theme without persisting (`custom-theme-builder.tsx:491`, `:488`)
- [ ] **26.37** "Save as Custom Theme" button saves and applies (`custom-theme-builder.tsx:498`, `:495`)
#### State
- [ ] **26.38** Initial state: config=defaultThemeConfig, themeName="", startFrom="scratch", showAdvanced=false, nameError=false, fontSizeScale="default" (`custom-theme-builder.tsx:118-123`)

### Social Export
#### Format Selection
- [ ] **27.1** Modal opens with no format selected (`social-export-modal.tsx:61`)
- [ ] **27.2** Format grid renders SOCIAL_FORMATS entries (`social-export-modal.tsx:198`)
- [ ] **27.3** Each format card shows icon (when available) and aspect ratio badge (`social-export-modal.tsx:207`, `:217`)
- [ ] **27.4** Clicking format card selects it (`social-export-modal.tsx:204`)
- [ ] **27.5** Header shows "Export for Social Media" when no format selected, "Export as {name}" when selected (`social-export-modal.tsx:180`)
- [ ] **27.6** Back button returns to format grid (`social-export-modal.tsx:173`)
- [ ] **27.7** Close button dismisses modal (`social-export-modal.tsx:163`, `:186`)
#### Twitter Thread
- [ ] **27.8** Thread editor shows per-tweet textarea with editable content (`social-export-modal.tsx:236`, `:257`)
- [ ] **27.9** Each tweet shows "Tweet N of M" label (`social-export-modal.tsx:240`)
- [ ] **27.10** Character count shows "/280" suffix (`social-export-modal.tsx:252`)
- [ ] **27.11** Count turns red when > 280 characters (`social-export-modal.tsx:245`)
