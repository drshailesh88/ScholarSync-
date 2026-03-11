# deep-research — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Page Overview & States
#### Header (Always Visible)
- [ ] Title: "Deep Research" with Microscope icon (blue accent)
- [ ] Subtitle: "Multi-perspective literature synthesis"
- [ ] Sticky top positioning
- [ ] Export buttons visible only in `done` state
- [ ] Save to Library button visible only in `done` state
- [ ] Stop button visible in `running` and `plan-preview` states (red accent)

### Idle State — Topic Input & Mode Selection
#### Hero Section
- [ ] Heading: "What would you like to research?"
- [ ] Description: "Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations."
#### Topic Input
- [ ] Text input field with placeholder: "e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
- [ ] Client-side validation only checks for a non-empty trimmed topic; 5–500 character validation is enforced server-side in the plan route
- [ ] Empty input disables "Start Deep Research" button
- [ ] Enter key submits (when topic filled, no Shift key held)
#### Mode Selector (Segmented Control)
- [ ] Default mode pre-selected
- [ ] Clicking a mode highlights it
- [ ] Selected mode passed to API on submit
#### Start Button
- [ ] Label: "Start Deep Research"
- [ ] Disabled when topic is empty
- [ ] Triggers plan generation on click
- [ ] Starting research transitions the page into the plan-loading state; the button itself does not show a spinner or loading label

### Past Research Sessions
- [ ] "Past Research" label with Clock icon in header (styled uppercase via CSS tracking)
- [ ] Fetches from `GET /api/deep-research/sessions` on mount
- [ ] Shows up to 20 past sessions (latest first)
#### Session Cards
- [ ] Topic text (truncated)
- [ ] Mode label (capitalized)
- [ ] Papers found count
- [ ] Relative date: "2h ago", "3d ago", "Jan 5"
- [ ] Hover effect with blue icon
- [ ] ChevronRight icon on hover
- [ ] Clicking loads full session in `done` state
#### States
- [ ] Loading spinner while fetching sessions
- [ ] Hidden if no sessions exist
- [ ] Hidden on fetch error (fails silently)

### Plan Preview State
- [ ] Header with Sparkles icon (purple) and "Research Plan" title
- [ ] Subtitle: "Review and customize the research perspectives before starting"
#### Perspective List
- [ ] Numbered badges (1, 2, 3, etc.) in blue circles
