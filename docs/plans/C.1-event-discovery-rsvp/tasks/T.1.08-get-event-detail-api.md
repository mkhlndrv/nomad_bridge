# T.1.08: GET /api/events/[id] — Event Detail

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.1.07
**Spec References:** EVT-FEED-06, EVT-FEED-07, EVT-FEED-08, EVT-FEED-09, EVT-FEED-10

## Description
Build the GET `/api/events/[id]` API route that returns full event details including the creator profile, RSVP list, photos, and materials. The endpoint also computes `isRsvped` (boolean) and `rsvpStatus` (CONFIRMED/WAITLISTED/null) for the currently authenticated user by checking the EventRsvp table. Include the `_count` of RSVPs for accurate capacity display. Materials and photos are only included in the response — materials are visible only after the event date has passed.

## Acceptance Criteria
- [ ] GET `/api/events/[id]` returns a single event with all fields
- [ ] Response includes `creator: { id, name, role }` via Prisma include
- [ ] Response includes `photos: EventPhoto[]` ordered by createdAt desc
- [ ] Response includes `materials: EventMaterial[]` (only if event date is in the past)
- [ ] Response includes `isRsvped: boolean` for the current user (false if not authenticated)
- [ ] Response includes `userRsvpStatus: "CONFIRMED" | "WAITLISTED" | null` for the current user
- [ ] Response includes `waitlistPosition: number | null` if user is waitlisted
- [ ] Returns 404 with `{ error: "Event not found" }` if ID doesn't exist
- [ ] Returns 200 for both past and future events (past events are still viewable)

## Files to Create/Modify
- `app/api/events/[id]/route.ts` — GET handler for single event detail

## Implementation Notes
- Use `prisma.event.findUnique()` with `include: { creator: true, photos: true, materials: true, rsvps: true }`.
- To compute `isRsvped`, check if the current user's ID exists in the RSVPs. For now, get userId from a header or query param (auth middleware comes later from C.2).
- Filter materials in application code: only include if `event.date < new Date()`.
- The `waitlistPosition` comes from the user's EventRsvp record if their status is WAITLISTED.
- Use `select` on rsvps to avoid leaking other users' full data — only return count and the current user's status.
- Consider a helper function `getCurrentUserId(request)` that can be updated when auth is integrated.

## Commit Message
`feat: add GET /api/events/[id] with rsvp status and materials`
