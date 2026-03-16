# settings — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [x] PASS: Country input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [x] PASS: `Bio` label is rendered above the textarea
- [x] PASS: Bio textarea placeholder is `A short bio about your research background...`
- [x] PASS: Bio textarea is prefilled from `user.bio` when profile data exists
- [x] PASS: Bio textarea falls back to an empty string when `user.bio` is null
- [x] PASS: Bio textarea uses `rows={3}`
- [x] PASS: Bio textarea is a controlled field bound to `bio`
- [x] PASS: Bio textarea is `resize-none` in the current implementation
- [x] PASS: Bio textarea uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [x] PASS: `Research Interests` label is rendered above the chip area and entry controls
- [x] PASS: Existing research interests render as chips before the add-interest input
- [x] PASS: Each existing chip renders the interest text plus an `X` remove button
- [x] PASS: Add-interest input placeholder is `Type an interest and press Enter`
- [x] PASS: Add-interest control row contains one text input and one icon-only `Plus` button
- [x] PASS: Pressing `Enter` inside the interest input prevents default form submission
- [x] PASS: Pressing `Enter` with a non-empty value adds a new chip immediately in local state
- [x] PASS: Clicking the `Plus` button with a non-empty value adds a new chip immediately in local state
- [x] PASS: Interest values are trimmed before duplicate/blank checks run
- [x] PASS: Blank or whitespace-only interest values are ignored
- [x] PASS: Duplicate interest values are ignored
- [x] PASS: Adding a new interest clears the interest input back to an empty string
- [x] PASS: Removing a chip updates the chip row immediately without waiting for a save
- [x] PASS: Chip changes are not persisted until `Save Changes` is clicked
- [x] PASS: `ORCID iD` label is rendered above the ORCID text input
- [x] PASS: ORCID input placeholder is `0000-0002-1825-0097`
- [x] PASS: ORCID input is prefilled from `user.orcid_id` when profile data exists
- [x] PASS: ORCID input falls back to an empty string when `user.orcid_id` is null
- [x] PASS: ORCID input helper text reads `Your unique researcher identifier from orcid.org`
- [x] PASS: ORCID input is a controlled input bound to `orcidId`
- [x] PASS: ORCID input has no `required` attribute in the current implementation
- [x] PASS: ORCID input uses the shared `focus:ring-2 focus:ring-brand/40` focus style
- [x] PASS: `Save Changes` button is rendered only on the `My Account` tab
- [x] PASS: `Save Changes` is enabled on initial render even when no fields have changed
- [x] PASS: `Save Changes` is disabled only while `saving` is true
- [x] PASS: While saving, the button label changes from `Save Changes` to `Saving...`
