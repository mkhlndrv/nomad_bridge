# T.1.10: DELETE /api/events/[id]/rsvp — Cancel RSVP

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.1.09
**Spec References:** EVT-RSVP-05

## Description
Build the DELETE `/api/events/[id]/rsvp` API route that cancels the authenticated user's RSVP. The operation must run inside a Prisma `$transaction`: delete the EventRsvp record, decrement the event's `rsvpCount` (only if the cancelled RSVP was CONFIRMED), and promote the next waitlisted person to CONFIRMED status (updating their status and incrementing rsvpCount back). The waitlist promotion finds the EventRsvp with the lowest `waitlistPosition` and status WAITLISTED for this event.

## Acceptance Criteria
- [ ] DELETE `/api/events/[id]/rsvp` removes the user's EventRsvp record
- [ ] If the cancelled RSVP was CONFIRMED: decrement `rsvpCount` by 1
- [ ] If the cancelled RSVP was WAITLISTED: do NOT change `rsvpCount`, but re-number remaining waitlist positions
- [ ] After a CONFIRMED cancellation, promote the next waitlisted person: update their status to CONFIRMED, clear their waitlistPosition, and re-increment rsvpCount
- [ ] All operations happen in a single `prisma.$transaction`
- [ ] Returns 404 if the user has no RSVP for this event
- [ ] Returns 404 if the event does not exist
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 200 with `{ message: "RSVP cancelled", promoted?: { userId: string } }`
- [ ] After promotion, remaining waitlisted RSVPs have their positions decremented by 1

## Files to Create/Modify
- `app/api/events/[id]/rsvp/route.ts` — Add DELETE handler alongside POST

## Implementation Notes
- Inside the transaction: (1) find the user's RSVP, (2) delete it, (3) if CONFIRMED: decrement rsvpCount, (4) find the lowest-position waitlisted RSVP, (5) if found: update to CONFIRMED + set waitlistPosition to null + increment rsvpCount.
- Use `tx.eventRsvp.findFirst({ where: { eventId, status: 'WAITLISTED' }, orderBy: { waitlistPosition: 'asc' } })` to find next in waitlist.
- After promotion, update remaining waitlist positions: `tx.eventRsvp.updateMany({ where: { eventId, status: 'WAITLISTED' }, data: ... })` — but SQLite doesn't support `decrement` in updateMany easily, so consider fetching and updating individually or leaving positions as-is (gaps are acceptable).
- Guard against negative rsvpCount with `Math.max(0, rsvpCount - 1)` or a check before decrement.
- The route file already has POST from T.1.09 — add the DELETE export to the same file.

## Commit Message
`feat: add DELETE /api/events/[id]/rsvp with waitlist promotion`
