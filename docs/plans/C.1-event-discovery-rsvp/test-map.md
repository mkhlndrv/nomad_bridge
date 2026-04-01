# C.1: Event Discovery & RSVP — Test Map

## Unit Tests (`__tests__/unit/rsvp-logic.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Allow RSVP with spots available | event(cap=50, count=30, future) | allowed=true |
| 2 | Reject at full capacity | event(cap=50, count=50, future) | allowed=false, "full capacity" |
| 3 | Reject zero-capacity event | event(cap=0, count=0) | allowed=false |
| 4 | Reject duplicate RSVP | existingRsvps includes userId | allowed=false, "already registered" |
| 5 | Allow if different event | existingRsvps for event-1, target=event-2 | allowed=true |
| 6 | Reject past event | event(date=past) | allowed=false, "past events" |
| 7 | Allow future event | event(date=future) | allowed=true |
| 8 | Spots remaining calc | cap=50, count=47 | 3 |
| 9 | Spots remaining at cap | cap=50, count=50 | 0 |
| 10 | Waitlist position | 3rd waitlisted user | position=3 |

## Integration Tests (`__tests__/integration/event-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | List events | GET /api/events | 200, array with pagination |
| 2 | Filter by university | GET /api/events?university=Chula | 200, filtered |
| 3 | Filter by category | GET /api/events?category=WORKSHOP | 200, filtered |
| 4 | Search events | GET /api/events?search=AI | 200, matching |
| 5 | Get event detail | GET /api/events/[id] | 200, rsvpCount included |
| 6 | Get missing event | GET /api/events/missing | 404 |
| 7 | RSVP happy path | POST /api/events/[id]/rsvp | 201, count incremented |
| 8 | RSVP duplicate | POST same user+event | 409 |
| 9 | RSVP at capacity | POST full event | 409 |
| 10 | RSVP past event | POST past event | 400 |
| 11 | Cancel RSVP | DELETE /api/events/[id]/rsvp | 200, count decremented |
| 12 | Cancel non-existent | DELETE no RSVP | 404 |
| 13 | Create event | POST /api/events | 201 |
| 14 | Create past event | POST /api/events (past date) | 400 |
| 15 | Waitlist join | POST full event (waitlist) | 201, status=WAITLISTED |
| 16 | Waitlist promote | DELETE first RSVP on full | waitlisted user promoted |

## Component Tests

| # | Component | Test |
|---|-----------|------|
| 1 | CapacityBar | Shows green at 50% fill |
| 2 | CapacityBar | Shows yellow at 80% fill |
| 3 | CapacityBar | Shows red at 100% fill |
| 4 | RsvpButton | Shows "RSVP Now" when not registered |
| 5 | RsvpButton | Shows "Cancel RSVP" when registered |
| 6 | RsvpButton | Shows "Join Waitlist" when full |
| 7 | RsvpButton | Disabled for past events |
| 8 | EventCard | Renders all required fields |
| 9 | EventFilterBar | Category pills toggle correctly |
