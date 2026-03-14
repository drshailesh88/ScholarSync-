# settings — Spec 006

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
- [ ] While saving, the button shows text-only loading feedback with no spinner icon
- [ ] Successful profile saves render the inline message `Profile saved successfully.` next to the button
- [ ] Failed profile saves render the inline message `Failed to save profile. Please try again.` next to the button
- [ ] Save success/error feedback is inline text, not a toast or modal
- [ ] Save messages auto-clear after 3 seconds through `showSaveMessage`
- [ ] Profile save payload includes `full_name`, `specialty`, `country`, `bio`, `research_interests`, and `orcid_id`
- [ ] Profile save payload does not include `email`, `plan`, `preferred_language`, or `default_citation_style`
- [ ] Successful profile saves update the local `user` state so the account summary reflects returned values
- [ ] Failed profile saves leave the current form field values intact for retry
- [ ] Billing tab main heading reads `Plans & Billing`
- [ ] Current plan heading is rendered as `{Capitalized plan} Plan`
- [ ] Free plan pricing renders as the standalone text `Free`
- [ ] Basic plan pricing renders `₹1,000` with `/month` in muted text
- [ ] Pro plan pricing renders `₹2,500` with `/month` in muted text
- [ ] Token quota text uses `toLocaleString("en-IN")` formatting for the numeric limit
- [ ] `ACTIVE` badge is always shown in the current plan card
- [ ] `Manage Plan` button has no disabled or loading state in the current page component
- [ ] Payment Method section always shows the hard-coded card text `Visa •••• •••• •••• 4242`
- [ ] `Razorpay Secure` helper text is rendered under the card details
- [ ] `Update` button has no disabled or loading state in the current page component
- [ ] Invoice History heading renders directly above the `DataTable`
- [ ] Invoice table actions header cell is intentionally blank
- [ ] Every invoice row renders a `Download` button with a `DownloadSimple` icon and text label
- [ ] Invoice table container uses horizontal overflow handling and a rounded bordered wrapper
- [ ] Usage tab main heading reads `Usage Tracking`
- [ ] AI Tokens progress row shows the label on the left and `{used} / {max}` text on the right
- [ ] AI Tokens progress fill uses `var(--brand)` as its bar color
- [ ] Finite progress bars clamp their fill width to 100% maximum
- [ ] Deep Searches row shows `{value} (Unlimited)` instead of `{value} / {max}`
- [ ] Deep Searches fill width is fixed to 30% when `max < 0`
- [ ] Deep Searches helper text reads `Fair use policy applies for unlimited searches`
- [ ] Plagiarism Checks progress fill uses `#f59e0b`
- [ ] `This Month at a Glance` heading renders above the 2x2 usage summary grid
- [ ] Summary cards render label text, a bold primary value, and a smaller helper line as separate rows
- [ ] `Exports` summary falls back to `0` when `usageStats?.exports_used` is nullish
