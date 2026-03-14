# presentation — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Coach Panel
- [ ] **12.2** Clicking "Run Coach" triggers evaluation API call
- [ ] **12.3** Overall score displays as X/10
- [ ] **12.4** Structure dimension bar renders with score
- [ ] **12.5** Evidence dimension bar renders with score
- [ ] **12.6** Narrative dimension bar renders with score
- [ ] **12.7** Design dimension bar renders with score
- [ ] **12.8** Audience Fit dimension bar renders with score
- [ ] **12.9** Suggestions are grouped per slide
- [ ] **12.10** Each suggestion is actionable/readable
- [ ] **12.11** Re-running coach updates the scores

### Defense Prep Panel
#### Configuration
- [ ] **13.1** DefensePrepPanel renders
#### Focus Areas
- [ ] **13.12** Multiple focus areas can be selected simultaneously
- [ ] **13.13** Starting a session generates a question
- [ ] **13.14** User can submit an answer to the question
- [ ] **13.15** Evaluation of the answer is returned
- [ ] **13.16** Follow-up questions are generated based on conversation
- [ ] **13.17** Session summary is available after ending the session
- [ ] **13.18** Conversation history is maintained during the session
#### Defense Prep Panel UI Details
- [ ] **13.19** Panel header shows "Defense Prep" with GraduationCap icon (`defense-prep-panel.tsx:282`, `:283`)
- [ ] **13.20** Descriptive help text below header (`defense-prep-panel.tsx:288`)
- [ ] **13.21** Difficulty section labeled "Difficulty" (`defense-prep-panel.tsx:295`)
- [ ] **13.22** Difficulty buttons rendered from DIFFICULTIES array (`defense-prep-panel.tsx:298`, `:301`)
- [ ] **13.23** Selected difficulty shows `border-brand bg-brand/5` (`defense-prep-panel.tsx:304`)
- [ ] **13.24** Focus areas labeled "Focus Areas (optional)" (`defense-prep-panel.tsx:319`)
- [ ] **13.25** Focus area buttons rendered from FOCUS_AREAS array (`defense-prep-panel.tsx:322`, `:325`)
- [ ] **13.26** Selected focus area shows `border-brand bg-brand/10 text-brand` (`defense-prep-panel.tsx:328`)
- [ ] **13.27** "Start Session" button with Play icon (`defense-prep-panel.tsx:343`, `:352`, `:353`)
- [ ] **13.28** Start button disabled when slides.length === 0 (`defense-prep-panel.tsx:344`, `:347`)
- [ ] **13.29** Default difficulty is "moderate" (`defense-prep-panel.tsx:95`)
- [ ] **13.30** Default focus areas is empty array (`defense-prep-panel.tsx:96`)
- [ ] **13.31** Session summary screen shows Trophy icon and "Session Complete" header (`defense-prep-panel.tsx:365`, `:366`)
- [ ] **13.32** Summary score displays a large numeric score with separate "out of 10" label (`defense-prep-panel.tsx:371-374`)
- [ ] **13.33** "Strengths" list with Target icon (`defense-prep-panel.tsx:379`, `:381`, `:385`)
- [ ] **13.34** "Areas for Improvement" list with Lightning icon (`defense-prep-panel.tsx:399`, `:401`, `:405`)
- [ ] **13.35** "Suggested Talking Points" list shown when talkingPoints > 0 (`defense-prep-panel.tsx:417`, `:420`, `:423`)
