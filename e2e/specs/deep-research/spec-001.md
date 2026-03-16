# deep-research — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Page Overview & States
#### Header (Always Visible)
- [x] PASS: Title: "Deep Research" with Microscope icon (blue accent)
- [x] PASS: Subtitle: "Multi-perspective literature synthesis"
- [x] PASS: Sticky top positioning
- [x] PASS: Export buttons visible only in `done` state
- [x] PASS: Save to Library button visible only in `done` state
- [x] PASS: Stop button visible in `running` and `plan-preview` states (red accent)

### Idle State — Topic Input & Mode Selection
#### Hero Section
- [x] PASS: Heading: "What would you like to research?"
- [x] PASS: Description: "Enter a research topic and we will synthesize findings from multiple academic perspectives with full citations."
#### Topic Input
- [x] PASS: Text input field with placeholder: "e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
- [x] PASS: Client-side validation only checks for a non-empty trimmed topic; 5–500 character validation is enforced server-side in the plan route
- [x] PASS: Empty input disables "Start Deep Research" button
- [x] PASS: Enter key submits (when topic filled, no Shift key held)
#### Mode Selector (Segmented Control)
- [x] PASS: Default mode pre-selected
- [x] PASS: Clicking a mode highlights it
- [x] PASS: Selected mode passed to API on submit
#### Start Button
- [x] PASS: Label: "Start Deep Research"
- [x] PASS: Disabled when topic is empty
- [x] PASS: Triggers plan generation on click
- [x] PASS: Starting research transitions the page into the plan-loading state; the button itself does not show a spinner or loading label

### Past Research Sessions
- [x] PASS: "Past Research" label with Clock icon in header (styled uppercase via CSS tracking)
- [x] PASS: Fetches from `GET /api/deep-research/sessions` on mount
- [x] PASS: Shows up to 20 past sessions (latest first)
#### Session Cards
- [x] PASS: Topic text (truncated)
- [x] PASS: Mode label (capitalized)
- [x] PASS: Papers found count
- [x] PASS: Relative date: "2h ago", "3d ago", "Jan 5"
- [x] PASS: Hover effect with blue icon
- [x] PASS: ChevronRight icon on hover
- [x] PASS: Clicking loads full session in `done` state
#### States
- [x] PASS: Loading spinner while fetching sessions
- [x] PASS: Hidden if no sessions exist
- [x] PASS: Hidden on fetch error (fails silently)

### Plan Preview State
- [x] PASS: Header with Sparkles icon (purple) and "Research Plan" title
- [x] PASS: Subtitle: "Review and customize the research perspectives before starting"
#### Perspective List
- [x] PASS: Numbered badges (1, 2, 3, etc.) in blue circles
