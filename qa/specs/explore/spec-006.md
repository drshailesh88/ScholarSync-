# explore — Spec 006

STATUS: PENDING
TESTED: 0/15
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### AI Synthesis

#### Trigger
- [ ] **Synthesize button visible** — after search with results, "Synthesize" button with sparkle icon appears `[CODE]`
- [ ] **Q keyboard hint on button** — synthesize button shows Q key badge `[CODE]`
- [ ] **Click opens synthesis** — click Synthesize button, verify synthesis block appears `[CODE]`
- [ ] **Q key toggles synthesis** — press Q, verify synthesis opens; press Q again, verify it closes `[CODE]`
- [ ] **Button hidden when open** — while synthesis is open, the Synthesize button disappears `[CODE]`

#### Streaming
- [ ] **Skeleton while loading** — when synthesis starts, pulsing skeleton lines appear `[CODE]`
- [ ] **"Generating..." indicator** — pulsing dot with "Generating..." text during stream `[CODE]`
- [ ] **Text streams progressively** — synthesis text appears incrementally as it streams `[CODE]`
- [ ] **Deduplication** — close and re-open synthesis for same query, verify no re-fetch `[CODE]`

#### Citations
- [ ] **[N] markers rendered** — synthesis text contains colored [1], [2], etc. citation markers `[CODE]`
- [ ] **Citation click scrolls** — click a [N] marker, verify page scrolls to corresponding result card `[CODE]`
- [ ] **Citation tooltip** — hover over [N] marker, verify title attribute shows source title `[CODE]`
- [ ] **Trust-tier colored citations** — citation markers colored by source trust tier `[CODE]`

#### Controls
- [ ] **Collapse synthesis** — click caret-up button, verify synthesis content hides but header remains `[CODE]`
- [ ] **Expand collapsed synthesis** — click caret-down button on collapsed synthesis, verify content reappears `[CODE]`
- [ ] **Close synthesis** — click X button, verify entire synthesis block disappears `[CODE]`

#### Error
- [ ] **Synthesis failure message** — when API fails, shows "Synthesis could not be generated. Try again later." `[CODE]`
