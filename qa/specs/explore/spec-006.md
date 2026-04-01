# explore — Spec 006

STATUS: PARTIAL
TESTED: 17/17
PASS: 16
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### AI Synthesis

#### Trigger
- [x] PASS: **Synthesize button visible** — after search with results, "Synthesize" button with sparkle icon appears `[CODE]`
- [x] PASS: **Q keyboard hint on button** — synthesize button shows Q key badge `[CODE]`
- [x] PASS: **Click opens synthesis** — click Synthesize button, verify synthesis block appears `[CODE]`
- [ ] FAIL: **Q key toggles synthesis** — press Q, verify synthesis opens; press Q again, verify it closes `[CODE]`
- [x] PASS: **Button hidden when open** — while synthesis is open, the Synthesize button disappears `[CODE]`

#### Streaming
- [x] PASS: **Skeleton while loading** — when synthesis starts, pulsing skeleton lines appear `[CODE]`
- [x] PASS: **"Generating..." indicator** — pulsing dot with "Generating..." text during stream `[CODE]`
- [x] PASS: **Text streams progressively** — synthesis text appears incrementally as it streams `[CODE]`
- [x] PASS: **Deduplication** — close and re-open synthesis for same query, verify no re-fetch `[CODE]`

#### Citations
- [x] PASS: **[N] markers rendered** — synthesis text contains colored [1], [2], etc. citation markers `[CODE]`
- [x] PASS: **Citation click scrolls** — click a [N] marker, verify page scrolls to corresponding result card `[CODE]`
- [x] PASS: **Citation tooltip** — hover over [N] marker, verify title attribute shows source title `[CODE]`
- [x] PASS: **Trust-tier colored citations** — citation markers colored by source trust tier `[CODE]`

#### Controls
- [x] PASS: **Collapse synthesis** — click caret-up button, verify synthesis content hides but header remains `[CODE]`
- [x] PASS: **Expand collapsed synthesis** — click caret-down button on collapsed synthesis, verify content reappears `[CODE]`
- [x] PASS: **Close synthesis** — click X button, verify entire synthesis block disappears `[CODE]`

#### Error
- [x] PASS: **Synthesis failure message** — when API fails, shows "Synthesis could not be generated. Try again later." `[CODE]`
