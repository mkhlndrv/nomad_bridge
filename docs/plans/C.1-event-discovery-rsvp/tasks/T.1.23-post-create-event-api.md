# T.1.23: POST /api/events — Create Event

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.1.01
**Spec References:** EVT-FEED-06, EVT-RSVP-02

## Description
Build the POST `/api/events` API route that allows authenticated users to create new events. The endpoint validates all required fields (title, description, date, venue, capacity, university, category), enforces business rules (capacity > 0, date must be in the future), and applies trust-based restrictions for community events: nomads with trustScore < 10 cannot create events, and no user can have more than 5 active (future, non-cancelled) events simultaneously. University-role users bypass the trust score check. The created event has status PUBLISHED by default (DRAFT for board photo uploads is handled separately in T.1.19).

## Acceptance Criteria
- [ ] POST `/api/events` creates a new event with all required fields
- [ ] Required fields validated: title, description, date, venue, capacity, university, category
- [ ] Returns 400 if any required field is missing with specific field name in error
- [ ] Returns 400 if capacity <= 0 with message "Capacity must be greater than zero"
- [ ] Returns 400 if date is in the past with message "Event date must be in the future"
- [ ] Returns 403 if NOMAD user has trustScore < 10: "Trust score too low to create events (minimum: 10)"
- [ ] Returns 403 if user has >= 5 active future events: "Maximum 5 active events allowed"
- [ ] UNIVERSITY and ADMIN roles bypass the trust score check
- [ ] Event is created with status PUBLISHED and rsvpCount 0
- [ ] Tags field accepts comma-separated string (optional)
- [ ] Returns 201 with the created event record
- [ ] Returns 401 if user is not authenticated

## Files to Create/Modify
- `app/api/events/route.ts` — Add POST handler alongside existing GET handler

## Implementation Notes
- Parse the request body with `request.json()`.
- Validate required fields first, then business rules. Return the first validation error found.
- Trust score check: `const user = await prisma.user.findUnique({ where: { id: userId }, select: { trustScore: true, role: true } })`.
- Active event count: `const activeCount = await prisma.event.count({ where: { creatorId: userId, date: { gt: new Date() }, status: { not: 'CANCELLED' } } })`.
- The date should be validated as a parseable ISO string: `const eventDate = new Date(body.date); if (isNaN(eventDate.getTime())) return 400`.
- Sanitize the tags field: trim whitespace around each tag in the comma-separated string.
- The capacity is stored as an integer — validate with `parseInt` and check `Number.isInteger`.
- Category must be a valid EventCategory enum value — validate against the list.
- Set `creatorId` from the authenticated user's ID.

## Commit Message
`feat: add POST /api/events with trust score and capacity validation`
