# presentation — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Presenter Mode
#### Presenter Mode UI Details
- [ ] **19.27** Main slide area width: 70% with panel, 100% without (`presenter-mode.tsx:656`)
- [ ] **19.28** "Audience" button opens separate audience window (`presenter-mode.tsx:763`, `:767`)
- [ ] **19.29** Speaker notes section labeled "Speaker Notes" (`presenter-mode.tsx:830`)
- [ ] **19.30** Notes font size selector: Small/Medium/Large buttons with active state (`presenter-mode.tsx:842-867`)
- [ ] **19.31** Notes render via ReactMarkdown when present, "No speaker notes for this slide." otherwise (`presenter-mode.tsx:885`, `:911`)
- [ ] **19.32** Notes links rendered as clickable anchors (`presenter-mode.tsx:894`)
- [ ] **19.33** Build progress: "Build X of Y" display with reveal status (`presenter-mode.tsx:833`)
- [ ] **19.34** Reveal sequence complete hint: "Next click advances slide" (`presenter-mode.tsx:837`)
- [ ] **19.35** Next slide preview labeled "Next Slide" with SlideRenderer at small scale (`presenter-mode.tsx:918`, `:921`, `:927`)
- [ ] **19.36** "End of presentation" shown when on last slide (`presenter-mode.tsx:941`)
- [ ] **19.37** Prev button disabled when currentIndex <= 0 (`presenter-mode.tsx:950`, `:954`)
- [ ] **19.38** Next button disabled when on the last slide and `maxRevealOrder === 0 || revealedOrder >= maxRevealOrder` (`presenter-mode.tsx:958-960`, `:964`)
- [ ] **19.39** Jump-to-slide form: input with placeholder "Slide #", "Jump" button (`presenter-mode.tsx:970`, `:981`, `:987`, `:988`, `:995`)
- [ ] **19.40** Jump input accepts only digits (`presenter-mode.tsx:981`)
- [ ] **19.41** Keyboard help text rendered at bottom (`presenter-mode.tsx:1000`)
- [ ] **19.42** Black screen overlay: "Black Screen" text on black bg (`presenter-mode.tsx:710`, `:716`, `:719`)
- [ ] **19.43** White screen overlay: "White Screen" text on white bg (`presenter-mode.tsx:710`, `:716`, `:719`)
- [ ] **19.44** Black (B) toggle button with Moon icon (`presenter-mode.tsx:796`, `:799`, `:805`, `:806`)
- [ ] **19.45** White (W) toggle button with Sun icon (`presenter-mode.tsx:810`, `:813`, `:819`, `:820`)
- [ ] **19.46** Fullscreen toggle button with ArrowsOut icon (`presenter-mode.tsx:735`, `:737-738`, `:740`)
- [ ] **19.47** Exit button with X icon (`presenter-mode.tsx:743`, `:745-746`, `:748`)
- [ ] **19.48** Morph transition uses LayoutGroup + AnimatePresence + motion.div (`presenter-mode.tsx:659-661`)
- [ ] **19.49** Morph transition assigns MORPH_TITLE_ID to matching titles (`presenter-mode.tsx:702`)
- [ ] **19.50** Morph transition assigns MORPH_SUBTITLE_ID to matching subtitles (`presenter-mode.tsx:703`)
- [ ] **19.51** Slide transition direction: enter from right (100%) when forward, from left (-100%) when backward (`presenter-mode.tsx:92`, `:97`)
- [ ] **19.52** Slide area click triggers goNext (`presenter-mode.tsx:682`)
- [ ] **19.53** Reveal order state tracks animation progress (revealedOrder, activeRevealOrder, currentStepIndex) (`presenter-mode.tsx:232-234`)

### Audience View (`/presentation/audience`)
- [ ] **20.1** Audience view page renders
- [ ] **20.2** Receives slide index via BroadcastChannel
- [ ] **20.3** Receives screen-mode messages
- [ ] **20.4** Receives init message on connection
- [ ] **20.5** Loading state shows "Waiting for presenter connection..." on black screen
- [ ] **20.6** Normal mode displays the current slide
- [ ] **20.7** Black screen mode renders black overlay
- [ ] **20.8** White screen mode renders white overlay
