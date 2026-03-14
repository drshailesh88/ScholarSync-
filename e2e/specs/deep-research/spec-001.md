# deep-research — Spec 001

STATUS: PARTIAL
TESTED: 35/35
PASS: 12
FAIL: 23
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Page Overview & States
#### Header (Always Visible)
- [ ] FAIL: Title: "Deep Research" with Microscope icon (blue accent)
- [ ] FAIL: Subtitle: "Multi-perspective literature synthesis"
- [ ] FAIL: Sticky top positioning
- [x] PASS: Export buttons visible only in `done` state
- [x] PASS: Save to Library button visible only in `done` state
- [x] PASS: Stop button visible in `running` and `plan-preview` states (red accent)

### Idle State — Topic Input & Mode Selection
#### Hero Section
- [x] PASS: Heading: "What would you like to research?"
- [ ] FAIL: Description: "Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations."
#### Topic Input
- [x] PASS: Text input field with placeholder: "e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
- [ ] FAIL: Client-side validation only checks for a non-empty trimmed topic; 5–500 character validation is enforced server-side in the plan route
- [x] PASS: Empty input disables "Start Deep Research" button
- [x] PASS: Enter key submits (when topic filled, no Shift key held)
#### Mode Selector (Segmented Control)
- [ ] FAIL: Default mode pre-selected
- [ ] FAIL: Clicking a mode highlights it
- [ ] FAIL: Selected mode passed to API on submit
#### Start Button
- [ ] FAIL: Label: "Start Deep Research"
- [ ] FAIL: Disabled when topic is empty
- [ ] FAIL: Triggers plan generation on click
- [x] PASS: Starting research transitions the page into the plan-loading state; the button itself does not show a spinner or loading label

### Past Research Sessions
- [x] PASS: "Past Research" label with Clock icon in header (styled uppercase via CSS tracking)
- [ ] FAIL: Fetches from `GET /api/deep-research/sessions` on mount
- [x] PASS: Shows up to 20 past sessions (latest first)
#### Session Cards
- [ ] FAIL: Topic text (truncated)
- [ ] FAIL: Mode label (capitalized)
- [ ] FAIL: Papers found count
- [x] PASS: Relative date: "2h ago", "3d ago", "Jan 5"
- [ ] FAIL: Hover effect with blue icon
- [ ] FAIL: ChevronRight icon on hover
- [x] PASS: Clicking loads full session in `done` state
#### States
- [ ] FAIL: Loading spinner while fetching sessions
- [ ] FAIL: Hidden if no sessions exist
- [ ] FAIL: Hidden on fetch error (fails silently)

### Plan Preview State
- [ ] FAIL: Header with Sparkles icon (purple) and "Research Plan" title
- [ ] FAIL: Subtitle: "Review and customize the research perspectives before starting"
#### Perspective List
- [ ] FAIL: Numbered badges (1, 2, 3, etc.) in blue circles
