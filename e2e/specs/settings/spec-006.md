# settings — Spec 006

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
- [x] PASS: While saving, the button shows text-only loading feedback with no spinner icon
- [x] PASS: Successful profile saves render the inline message `Profile saved successfully.` next to the button
- [x] PASS: Failed profile saves render the inline message `Failed to save profile. Please try again.` next to the button
- [x] PASS: Save success/error feedback is inline text, not a toast or modal
- [x] PASS: Save messages auto-clear after 3 seconds through `showSaveMessage`
- [x] PASS: Profile save payload includes `full_name`, `specialty`, `country`, `bio`, `research_interests`, and `orcid_id`
- [x] PASS: Profile save payload does not include `email`, `plan`, `preferred_language`, or `default_citation_style`
- [x] PASS: Successful profile saves update the local `user` state so the account summary reflects returned values
- [x] PASS: Failed profile saves leave the current form field values intact for retry
- [x] PASS: Billing tab main heading reads `Plans & Billing`
- [x] PASS: Current plan heading is rendered as `{Capitalized plan} Plan`
- [x] PASS: Free plan pricing renders as the standalone text `Free`
- [x] PASS: Basic plan pricing renders `₹1,000` with `/month` in muted text
- [x] PASS: Pro plan pricing renders `₹2,500` with `/month` in muted text
- [x] PASS: Token quota text uses `toLocaleString("en-IN")` formatting for the numeric limit
- [x] PASS: `ACTIVE` badge is always shown in the current plan card
- [x] PASS: `Manage Plan` button has no disabled or loading state in the current page component
- [x] PASS: Payment Method section always shows the hard-coded card text `Visa •••• •••• •••• 4242`
- [x] PASS: `Razorpay Secure` helper text is rendered under the card details
- [x] PASS: `Update` button has no disabled or loading state in the current page component
- [x] PASS: Invoice History heading renders directly above the `DataTable`
- [x] PASS: Invoice table actions header cell is intentionally blank
- [x] PASS: Every invoice row renders a `Download` button with a `DownloadSimple` icon and text label
- [x] PASS: Invoice table container uses horizontal overflow handling and a rounded bordered wrapper
- [x] PASS: Usage tab main heading reads `Usage Tracking`
- [x] PASS: AI Tokens progress row shows the label on the left and `{used} / {max}` text on the right
- [x] PASS: AI Tokens progress fill uses `var(--brand)` as its bar color
- [x] PASS: Finite progress bars clamp their fill width to 100% maximum
- [x] PASS: Deep Searches row shows `{value} (Unlimited)` instead of `{value} / {max}`
- [x] PASS: Deep Searches fill width is fixed to 30% when `max < 0`
- [x] PASS: Deep Searches helper text reads `Fair use policy applies for unlimited searches`
- [x] PASS: Plagiarism Checks progress fill uses `#f59e0b`
- [x] PASS: `This Month at a Glance` heading renders above the 2x2 usage summary grid
- [x] PASS: Summary cards render label text, a bold primary value, and a smaller helper line as separate rows
- [x] PASS: `Exports` summary falls back to `0` when `usageStats?.exports_used` is nullish
