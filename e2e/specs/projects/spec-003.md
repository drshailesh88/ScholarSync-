# projects — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### New Project Modal
#### Type Dropdown Options
- [ ] Literature Review
- [ ] Case Report
- [ ] Thesis
- [ ] Dissertation
- [ ] Book Chapter
#### Citation Style Dropdown Options
- [ ] Vancouver (default)
- [ ] APA 7th
- [ ] AMA
- [ ] Chicago
- [ ] Harvard
- [ ] IEEE
- [ ] MLA
#### Submit Behavior
- [ ] **"Create Project"** button spans full width
- [ ] Button disabled when Project Name is empty
- [ ] Button disabled while `creating` state is true
- [ ] Button text changes to **"Creating..."** during submission
- [ ] Pressing **Enter** inside the Project Name input submits the create action
- [ ] Successful creation navigates to `/editor/new?project={newProjectId}`
- [ ] Modal closes after successful creation
- [ ] Failed creation logs an error and leaves the modal open
- [ ] Created project defaults to `status="planning"`

### Status Update Modal
#### Modal Trigger
- [ ] Clicking the status badge or `CaretDown` icon on a project row opens the modal
- [ ] Modal displays for the correct project
#### Modal Header
- [ ] Title: **"Update Status"**
- [ ] Subtitle: **"Change status for {project title}"**
- [ ] Project title matches the selected project
#### Status Pipeline (4 primary buttons)
- [ ] **Archived** displayed separately from the pipeline row
- [ ] Currently active status shows brand border + background with **"Selected"** label
- [ ] Clicking a different status changes the selection
- [ ] Clicking the already-selected status keeps it selected
#### Submit Behavior
- [ ] **"Update Status"** button displayed
- [ ] Button disabled when selected status matches current status (no change)
- [ ] Clicking **"Update Status"** closes the modal before the `"Updating..."` label can render
- [ ] Successful update reflects immediately in the project list
- [ ] Modal closes immediately on submit, before awaiting the server action
