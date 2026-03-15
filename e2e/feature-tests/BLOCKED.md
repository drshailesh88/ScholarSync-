# Blocked Features

| Module | Feature | Why blocked | What was tried |
|---|---|---|---|
| Editor | Pending citation notice on `/editor/[id]` | `scholarsync_pending_citation` is consumed, but the blue banner never renders in-browser. | Tested direct reload, cross-page `/library` -> `/editor/new` navigation, and two minimal client-state fixes; no browser-visible banner after 3 attempts. |
