# onboarding — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Step 2 — Goals
#### Goals List
- [ ] "Search Literature" goal has GlobeHemisphereWest icon (20px), correct label and description
- [ ] "Check Plagiarism & AI" goal has ShieldCheck icon (20px), correct label and description
- [ ] "Create Presentations" goal has Presentation icon (20px), correct label and description
- [ ] "Learn Research Methods" goal has BookOpen icon (20px), correct label and description
- [ ] Each goal card shows icon + label + description
- [ ] Clicking a goal toggles it to selected state
- [ ] Selected goal shows `bg-brand/5 border-brand/30` styling
- [ ] Selected goal shows Check icon (18px) on the right side
- [ ] Clicking a selected goal deselects it
- [ ] Multiple goals can be selected simultaneously
- [ ] Continue button is disabled when 0 goals are selected
- [ ] Continue button is enabled when 1 or more goals are selected
- [ ] Selecting all 5 goals works correctly

### Step 3 — Feature Tour
#### Features List
- [ ] Heading text matches: "Here's what you can do"
- [ ] Description text matches exactly
- [ ] 5 feature rows are rendered from the `FEATURES` array with numbered badges
- [ ] Feature 1: "Literature Search" with description "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex"
- [ ] Feature 2: "The Studio" with description "AI-powered editor with Learn Mode and Draft Mode"
- [ ] Feature 3: "Citation Manager" with description "Auto-format citations in 10,000+ styles"
- [ ] Feature 4: "Final Checks" with description "Plagiarism detection and AI content analysis"
- [ ] Feature 5: "Slides Generator" with description "Turn your paper into a presentation in minutes"
- [ ] Features are numbered 1-5
- [ ] Complete button is always enabled (no validation required)

### Navigation Controls
#### Back Button
- [ ] Back button shows "Back" text with ArrowLeft icon (16px)
- [ ] Back button is disabled on step 0
- [ ] Back button has `opacity-0` when disabled (hidden but present in DOM)
- [ ] Back button is enabled on steps 1, 2, 3
- [ ] Clicking Back on step 1 navigates to step 0
- [ ] Clicking Back on step 2 navigates to step 1
- [ ] Clicking Back on step 3 navigates to step 2
- [ ] Selections are preserved when navigating back and forward
#### Continue Button (Steps 0-2)
- [ ] Continue button shows "Continue" text with ArrowRight icon (16px)
- [ ] Continue button uses `bg-brand text-white` styling
- [ ] Continue button is disabled with `opacity-50` when canNext is false
- [ ] On step 0: Continue is always enabled
