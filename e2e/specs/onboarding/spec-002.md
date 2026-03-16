# onboarding — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/onboarding
MODULE: onboarding

---
### Step 2 — Goals
#### Goals List
- [x] PASS: "Search Literature" goal has GlobeHemisphereWest icon (20px), correct label and description
- [x] PASS: "Check Plagiarism & AI" goal has ShieldCheck icon (20px), correct label and description
- [x] PASS: "Create Presentations" goal has Presentation icon (20px), correct label and description
- [x] PASS: "Learn Research Methods" goal has BookOpen icon (20px), correct label and description
- [x] PASS: Each goal card shows icon + label + description
- [x] PASS: Clicking a goal toggles it to selected state
- [x] PASS: Selected goal shows `bg-brand/5 border-brand/30` styling
- [x] PASS: Selected goal shows Check icon (18px) on the right side
- [x] PASS: Clicking a selected goal deselects it
- [x] PASS: Multiple goals can be selected simultaneously
- [x] PASS: Continue button is disabled when 0 goals are selected
- [x] PASS: Continue button is enabled when 1 or more goals are selected
- [x] PASS: Selecting all 5 goals works correctly

### Step 3 — Feature Tour
#### Features List
- [x] PASS: Heading text matches: "Here's what you can do"
- [x] PASS: Description text matches exactly
- [x] PASS: 5 feature rows are rendered from the `FEATURES` array with numbered badges
- [x] PASS: Feature 1: "Literature Search" with description "Search 282M+ papers across PubMed, Semantic Scholar, and OpenAlex"
- [x] PASS: Feature 2: "The Studio" with description "AI-powered editor with Learn Mode and Draft Mode"
- [x] PASS: Feature 3: "Citation Manager" with description "Auto-format citations in 10,000+ styles"
- [x] PASS: Feature 4: "Final Checks" with description "Plagiarism detection and AI content analysis"
- [x] PASS: Feature 5: "Slides Generator" with description "Turn your paper into a presentation in minutes"
- [x] PASS: Features are numbered 1-5
- [x] PASS: Complete button is always enabled (no validation required)

### Navigation Controls
#### Back Button
- [x] PASS: Back button shows "Back" text with ArrowLeft icon (16px)
- [x] PASS: Back button is disabled on step 0
- [x] PASS: Back button has `opacity-0` when disabled (hidden but present in DOM)
- [x] PASS: Back button is enabled on steps 1, 2, 3
- [x] PASS: Clicking Back on step 1 navigates to step 0
- [x] PASS: Clicking Back on step 2 navigates to step 1
- [x] PASS: Clicking Back on step 3 navigates to step 2
- [x] PASS: Selections are preserved when navigating back and forward
#### Continue Button (Steps 0-2)
- [x] PASS: Continue button shows "Continue" text with ArrowRight icon (16px)
- [x] PASS: Continue button uses `bg-brand text-white` styling
- [x] PASS: Continue button is disabled with `opacity-50` when canNext is false
- [x] PASS: On step 0: Continue is always enabled
