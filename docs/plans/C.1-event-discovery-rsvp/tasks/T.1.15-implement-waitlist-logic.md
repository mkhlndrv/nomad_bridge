# T.1.15: Implement Waitlist Logic

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.1.09, T.1.10
**Spec References:** EVT-RSVP-02, EVT-RSVP-05

## Description
Enhance the RSVP API routes (POST and DELETE) with complete waitlist management logic. When a user RSVPs to a full event, they are placed on a waitlist with an incrementing position number. When a confirmed attendee cancels, the system automatically promotes the first person on the waitlist to CONFIRMED status. Ensure all waitlist operations maintain consistent position numbering and handle edge cases like multiple rapid cancellations. Add a helper function to compute waitlist statistics (total waitlisted, user's position) that can be reused across API routes.

## Acceptance Criteria
- [ ] POST RSVP to a full event creates WAITLISTED RSVP with correct position (next available number)
- [ ] DELETE RSVP for a CONFIRMED user triggers automatic promotion of the lowest-position waitlisted user
- [ ] Promoted user's status changes from WAITLISTED to CONFIRMED, waitlistPosition set to null
- [ ] After promotion, remaining waitlisted users have their positions re-ordered (no gaps)
- [ ] DELETE RSVP for a WAITLISTED user removes them and re-orders remaining positions
- [ ] Concurrent RSVP/cancel operations don't create duplicate positions (transaction isolation)
- [ ] Waitlist helper function: `getWaitlistInfo(eventId, userId?)` returns `{ totalWaitlisted, userPosition? }`
- [ ] All waitlist operations are within `prisma.$transaction` blocks
- [ ] rsvpCount only reflects CONFIRMED RSVPs, never WAITLISTED ones

## Files to Create/Modify
- `app/api/events/[id]/rsvp/route.ts` — Enhance POST and DELETE with full waitlist logic
- `app/lib/waitlist-utils.ts` — Shared waitlist helper functions

## Implementation Notes
- Waitlist position assignment: `const nextPosition = await tx.eventRsvp.count({ where: { eventId, status: 'WAITLISTED' } }) + 1`.
- Promotion logic in DELETE handler: `tx.eventRsvp.findFirst({ where: { eventId, status: 'WAITLISTED' }, orderBy: { waitlistPosition: 'asc' } })`.
- Re-ordering after removal: fetch all remaining WAITLISTED RSVPs sorted by position, then update each with new sequential positions. This is O(n) but waitlists are typically small.
- Alternative to re-ordering: accept gaps in positions and just use `orderBy: { waitlistPosition: 'asc' }` everywhere. The position shown to users is their rank (1st, 2nd, 3rd) rather than the raw DB value. This is simpler and avoids write amplification.
- Create `getWaitlistInfo` in a shared utils file for reuse in both POST, DELETE, and GET detail routes.
- Edge case: if the event has 0 capacity, RSVP should return "Registration Closed" not add to waitlist.

## Commit Message
`feat: implement full waitlist logic with auto-promotion on cancel`
