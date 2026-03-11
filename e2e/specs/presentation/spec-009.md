# presentation — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Defense Prep Panel
#### Defense Prep Panel UI Details
- [ ] **13.36** "New Session" button with ArrowRight icon resets to config (`defense-prep-panel.tsx:439`, `:442`, `:443`)
- [ ] **13.37** Q&A session header: "Q&A Session" with GraduationCap icon (`defense-prep-panel.tsx:456`, `:458`)
- [ ] **13.38** "End" button with Stop icon (`defense-prep-panel.tsx:465`, `:469`, `:470`)
- [ ] **13.39** End button disabled while loading (`defense-prep-panel.tsx:466`)
- [ ] **13.40** Presenter messages right-aligned with brand bg and white text (`defense-prep-panel.tsx:481`, `:492`)
- [ ] **13.41** Reviewer messages left-aligned with surface bg and border (`defense-prep-panel.tsx:481`, `:484`, `:486`, `:492`)
- [ ] **13.42** Reviewer messages show GraduationCap icon (`defense-prep-panel.tsx:486`)
- [ ] **13.43** Category badge shown on reviewer messages when category exists (`defense-prep-panel.tsx:498`, `:500`)
- [ ] **13.44** Slide reference badge "Slide N" shown when relatedSlideIndex exists (`defense-prep-panel.tsx:505`, `:507`)
- [ ] **13.45** Suggested answer reveal uses "Show suggested answer" / "Hide suggested answer" toggle text with Eye/EyeSlash icons (`defense-prep-panel.tsx:525`, `:528`, `:531`, `:536`)
- [ ] **13.46** Revealed answer content shown when toggle active (`defense-prep-panel.tsx:538`)
- [ ] **13.47** Loading state "Reviewing your response..." with CircleNotch spinner (`defense-prep-panel.tsx:550`, `:553`, `:557`)
- [ ] **13.48** Error state shows Warning icon with error message (`defense-prep-panel.tsx:567`, `:570`)
- [ ] **13.49** Answer input: placeholder "Type your answer...", disabled while loading (`defense-prep-panel.tsx:581-583`)
- [ ] **13.50** Send button: PaperPlaneRight when idle, CircleNotch when loading (`defense-prep-panel.tsx:592`, `:595`, `:600-603`)
- [ ] **13.51** Send button disabled when loading or input empty (`defense-prep-panel.tsx:592`)
- [ ] **13.52** Footer shows "Question N · {difficulty} difficulty" (`defense-prep-panel.tsx:608`)
- [ ] **13.53** API calls to /api/presentations/defense-prep (`defense-prep-panel.tsx:139`)
- [ ] **13.54** Focus areas omitted from request when none selected (`defense-prep-panel.tsx:152`)

### Comments Panel
- [ ] **14.1** CommentsPanel renders
- [ ] **14.2** Filter: All comments
- [ ] **14.3** Filter: Unresolved comments
- [ ] **14.4** Filter: Resolved comments
- [ ] **14.5** Comments are grouped by slide
- [ ] **14.6** Adding a new comment on a slide
- [ ] **14.7** Replying to an existing comment
- [ ] **14.8** Resolving a comment marks it as resolved
- [ ] **14.9** Deleting a comment removes it
- [ ] **14.10** Comment count badge in toolbar updates accordingly

### Analytics Panel
- [ ] **15.1** AnalyticsPanel renders
- [ ] **15.2** Total Views metric displays
- [ ] **15.3** Unique Viewers metric displays
- [ ] **15.4** Average Duration metric displays
- [ ] **15.5** Completion Rate metric displays
- [ ] **15.6** Slide heatmap shows per-slide engagement
