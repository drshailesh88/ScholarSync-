# settings — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [ ] Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [ ] `Bio` label is rendered above the textarea
- [ ] Bio textarea placeholder is `A short bio about your research background...`
- [ ] Bio textarea is prefilled from `user.bio` when profile data exists
- [ ] Bio textarea falls back to an empty string when `user.bio` is null
- [ ] Bio textarea uses `rows={3}`
- [ ] Bio textarea is a controlled field bound to `bio`
- [ ] Bio textarea is `resize-none` in the current implementation
- [ ] Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [ ] `Research Interests` label is rendered above the chip area and entry controls
- [ ] Existing research interests render as chips before the add-interest input
- [ ] Each existing chip renders the interest text plus an `X` remove button
- [ ] Add-interest input placeholder is `Type an interest and press Enter`
- [ ] Add-interest control row contains one text input and one icon-only `Plus` button
- [ ] Pressing `Enter` inside the interest input prevents default form submission
- [ ] Pressing `Enter` with a non-empty value adds a new chip immediately in local state
- [ ] Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state
- [ ] Interest values are trimmed before duplicate/blank checks run
- [ ] Blank or whitespace-only interest values are ignored
- [ ] Duplicate interest values are ignored
- [ ] Adding a new interest clears the interest input back to an empty string
- [ ] Removing a chip updates the chip row immediately without waiting for a save
- [ ] Chip changes are not persisted until `Save Changes` is clicked
- [ ] `ORCID iD` label is rendered above the ORCID text input
- [ ] ORCID input placeholder is `0000-0002-1825-0097`
- [ ] ORCID input is prefilled from `user.orcid_id` when profile data exists
- [ ] ORCID input falls back to an empty string when `user.orcid_id` is null
- [ ] ORCID input helper text reads `Your unique researcher identifier from orcid.org`
- [ ] ORCID input is a controlled input bound to `orcidId`
- [ ] ORCID input has no `required` attribute in the current implementation
- [ ] ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [ ] `Save Changes` button is rendered only on the `My Account` tab
- [ ] `Save Changes` is enabled on initial render even when no fields have changed
- [ ] `Save Changes` is disabled only while `saving` is true
- [ ] While saving, the button label changes from `Save Changes` to `Saving...`
