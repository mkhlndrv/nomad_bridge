# C.8: Manage Recordings — Test Map

## Unit Tests (`__tests__/unit/recording-logic.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Validate source: valid YouTube | url="youtube.com/watch?v=..." | valid |
| 2 | Validate source: valid tl;dv | url="tldv.io/app/..." | valid |
| 3 | Validate source: invalid URL | url="not-a-url" | invalid |
| 4 | Access: PUBLIC, any user | visibility=PUBLIC, any | allowed |
| 5 | Access: ATTENDEES_ONLY, attendee | visibility=ATTENDEES_ONLY, hasRsvp=true | allowed |
| 6 | Access: ATTENDEES_ONLY, non-attendee | visibility=ATTENDEES_ONLY, hasRsvp=false | denied |
| 7 | Access: UNLISTED, direct link | visibility=UNLISTED | allowed |
| 8 | Can upload: organizer | role=organizer of event | allowed |
| 9 | Can upload: non-organizer | role=attendee | denied |

## Integration Tests (`__tests__/integration/recording-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | Create recording (organizer) | POST /api/recordings | 201 |
| 2 | Create recording (non-organizer) | POST (attendee) | 403 |
| 3 | tl;dv metadata mock | POST /api/recordings/tldv-metadata | 200, placeholder |
| 4 | List recordings (public) | GET /api/recordings | 200, public visible |
| 5 | List with access check | GET (non-attendee) | 200, attendees-only filtered |
| 6 | Search by transcript | GET /api/recordings?search=keyword | 200, matches |
| 7 | Get recording detail | GET /api/recordings/[id] | 200, viewCount+1 |
| 8 | Get restricted recording | GET (non-attendee, ATTENDEES_ONLY) | 403 |
| 9 | Upload file (valid) | POST /api/recordings/upload | 201 |
| 10 | Upload file (too large) | POST (>500MB) | 400 |
| 11 | Create note | POST /api/recordings/[id]/notes | 201 |
| 12 | Get notes | GET /api/recordings/[id]/notes | 200, user's only |
| 13 | Delete recording (organizer) | DELETE /api/recordings/[id] | 200 |
| 14 | Delete recording (other) | DELETE (non-organizer) | 403 |
