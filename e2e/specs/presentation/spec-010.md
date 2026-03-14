# presentation — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Analytics Panel
- [ ] **15.7** Views over time chart renders
- [ ] **15.8** Data updates on panel open/refresh

### Share Panel
- [ ] **16.1** SharePanel renders
- [ ] **16.2** Public toggle switches between public and private
- [ ] **16.3** Share URL is displayed when public
- [ ] **16.4** Copy URL button copies link to clipboard
- [ ] **16.5** Password field allows setting an access password
- [ ] **16.6** Expiration setting allows time-limited sharing
- [ ] **16.7** Toggling off public disables the share link

### Version History Panel
- [ ] **17.1** VersionHistoryPanel renders
- [ ] **17.2** Save current version creates a snapshot
- [ ] **17.3** Version list shows saved versions with timestamps
- [ ] **17.4** Restore version replaces current deck with selected version
- [ ] **17.5** Delete version removes it from the list

### Recordings Panel
- [ ] **18.1** RecordingsPanel renders
- [ ] **18.2** Recording setup UI (mic/camera permissions)
- [ ] **18.3** Start recording begins capture
- [ ] **18.4** Pause/Resume toggles recording state
- [ ] **18.5** Mute/Unmute toggles audio capture
- [ ] **18.6** Stop recording ends and saves the recording
- [ ] **18.7** Recording library lists saved recordings
- [ ] **18.8** Playback of saved recordings

### Presenter Mode
#### Display & Layout
- [ ] **19.2** Two-panel layout: main slide (2/3) + presenter panel (1/3)
- [ ] **19.3** Presenter panel shows speaker notes
- [ ] **19.4** Presenter panel shows timer
- [ ] **19.5** Presenter panel shows next slide preview
#### Broadcasting
- [ ] **19.18** BroadcastChannel "presenter-slide-sync" is created on enter
- [ ] **19.19** Slide index changes are broadcast to audience view
- [ ] **19.20** Screen mode changes (black/white/normal) are broadcast
- [ ] **19.21** Init message is sent when audience connects
#### Presenter Mode UI Details
- [ ] **19.22** Empty slide state shows "No visible slides to present." with "Exit Presentation" button (`presenter-mode.tsx:634`, `:636`, `:639`)
- [ ] **19.23** Timer auto-starts on mount (elapsed=0, running=true) (`presenter-mode.tsx:129-130`)
- [ ] **19.24** Timer section labeled "Timer" with Clock icon (`presenter-mode.tsx:773`, `:774`)
- [ ] **19.25** Timer pause/resume button toggles between Pause and Play icons (`presenter-mode.tsx:781`, `:783`, `:785-788`)
- [ ] **19.26** Presenter panel toggle: "Hide Panel (N)" / "Show Panel (N)" text (`presenter-mode.tsx:729`, `:732`)
