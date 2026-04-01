# T.1.09: POST /api/events/[id]/rsvp — Create RSVP

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 30m
**Dependencies:** T.1.08
**Spec References:** EVT-RSVP-01, EVT-RSVP-02, EVT-RSVP-03, EVT-RSVP-04

## Description
Build the POST `/api/events/[id]/rsvp` API route that creates an RSVP for the authenticated user. The entire operation must run inside a Prisma `$transaction` to ensure atomicity: check if the event has remaining capacity, create the EventRsvp record, and increment the event's `rsvpCount`. If the event is at full capacity, create a waitlisted RSVP with the next waitlist position number. Prevent duplicate RSVPs using the database-level unique constraint on `[userId, eventId]`. Return 409 for duplicates, 400 for past events, and 404 for non-existent events.

## Acceptance Criteria
- [ ] POST `/api/events/[id]/rsvp` creates an EventRsvp with status CONFIRMED if capacity is available
- [ ] RSVP creation and rsvpCount increment happen in a single `prisma.$transaction`
- [ ] If event is full (rsvpCount >= capacity), creates EventRsvp with status WAITLISTED and assigns next `waitlistPosition`
- [ ] Returns 409 Conflict if user already has an RSVP for this event (duplicate)
- [ ] Returns 400 Bad Request if event date is in the past with message "Cannot RSVP to past events"
- [ ] Returns 400 Bad Request if event status is CANCELLED
- [ ] Returns 404 if event ID does not exist
- [ ] Returns 401 if user is not authenticated
- [ ] Successful response (201) includes: `{ rsvp: EventRsvp, status: "confirmed" | "waitlisted", waitlistPosition?: number }`
- [ ] The `waitlistPosition` is calculated as max existing waitlist position + 1

## Files to Create/Modify
- `app/api/events/[id]/rsvp/route.ts` — POST handler for RSVP creation

## Implementation Notes
- Use `prisma.$transaction(async (tx) => { ... })` for the interactive transaction.
- Inside the transaction: (1) fetch event with `tx.event.findUnique`, (2) check capacity, (3) create rsvp, (4) increment rsvpCount with `tx.event.update({ data: { rsvpCount: { increment: 1 } } })`.
- For waitlist position: `await tx.eventRsvp.count({ where: { eventId, status: 'WAITLISTED' } })` + 1.
- Catch Prisma P2002 unique constraint error for the duplicate RSVP case and return 409.
- The `rsvpCount` only increments for CONFIRMED RSVPs, not WAITLISTED ones.
- For now, get userId from request headers (e.g., `x-user-id`) until proper auth is integrated.
- Do NOT increment rsvpCount for waitlisted RSVPs — rsvpCount tracks confirmed only.

## Commit Message
`feat: add POST /api/events/[id]/rsvp with transactional capacity check`
