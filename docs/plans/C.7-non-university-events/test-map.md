# C.7: Non-University Events Organizer — Test Map

## Unit Tests (`__tests__/unit/community-events.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Can create: trust OK | trust=15 | allowed |
| 2 | Cannot create: low trust | trust=5 | rejected, "trust >= 10 required" |
| 3 | Cannot create: at limit | activeEvents=5 | rejected, "max 5 active" |
| 4 | Can create: below limit | activeEvents=4 | allowed |
| 5 | Check-in trust award | attendee checked in | delta=+5 |

## Integration Tests (`__tests__/integration/community-events-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | Create community event | POST /api/events | 201, isCommunity=true |
| 2 | Create with low trust | POST (trust < 10) | 403 |
| 3 | Create 6th active event | POST (5 active) | 400, limit reached |
| 4 | List with community filter | GET /api/events?isCommunity=true | 200, only community |
| 5 | Get organizer dashboard | GET /api/events/dashboard | 200, organizer's events |
| 6 | Non-organizer dashboard | GET /api/events/dashboard (other) | 200, empty |
| 7 | Manual check-in | POST /api/events/[id]/checkin | 200, trust +5 |
| 8 | Check-in non-attendee | POST checkin (not RSVPed) | 404 |
| 9 | Send announcement | POST /api/events/[id]/announce | 200, notifications created |
| 10 | Announce non-organizer | POST announce (other user) | 403 |
