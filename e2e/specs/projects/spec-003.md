# projects — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### New Project Modal
#### Type Dropdown Options
- [x] PASS: Literature Review
- [x] PASS: Case Report
- [x] PASS: Thesis
- [x] PASS: Dissertation
- [x] PASS: Book Chapter
#### Citation Style Dropdown Options
- [x] PASS: Vancouver (default)
- [x] PASS: APA 7th
- [x] PASS: AMA
- [x] PASS: Chicago
- [x] PASS: Harvard
- [x] PASS: IEEE
- [x] PASS: MLA
#### Submit Behavior
- [x] PASS: **"Create Project"** button spans full width
- [x] PASS: Button disabled when Project Name is empty
- [x] PASS: Button disabled while `creating` state is true
- [x] PASS: Button text changes to **"Creating..."** during submission
- [x] PASS: Pressing **Enter** inside the Project Name input submits the create action
- [x] PASS: Successful creation navigates to `/editor/new?project={newProjectId}`
- [x] PASS: Modal closes after successful creation
- [x] PASS: Failed creation logs an error and leaves the modal open
- [x] PASS: Created project defaults to `status="planning"`

### Status Update Modal
#### Modal Trigger
- [x] PASS: Clicking the status badge or `CaretDown` icon on a project row opens the modal
- [x] PASS: Modal displays for the correct project
#### Modal Header
- [x] PASS: Title: **"Update Status"**
- [x] PASS: Subtitle: **"Change status for {project title}"**
- [x] PASS: Project title matches the selected project
#### Status Pipeline (4 primary buttons)
- [x] PASS: **Archived** displayed separately from the pipeline row
- [x] PASS: Currently active status shows brand border + background with **"Selected"** label
- [x] PASS: Clicking a different status changes the selection
- [x] PASS: Clicking the already-selected status keeps it selected
#### Submit Behavior
- [x] PASS: **"Update Status"** button displayed
- [x] PASS: Button disabled when selected status matches current status (no change)
- [x] PASS: Clicking **"Update Status"** closes the modal before the `"Updating..."` label can render
- [x] PASS: Successful update reflects immediately in the project list
- [x] PASS: Modal closes immediately on submit, before awaiting the server action
