# T.7.10: GET /api/events/dashboard

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 2 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.7.01
**Spec References:** COM-DASH-01, COM-DASH-02, COM-DISC-06

## Description
Create a GET endpoint that returns the current user's organized events with attendee data. Each event includes RSVP count, attendee names (not emails — privacy), and check-in status. Events are sorted with upcoming first, then past. Only returns events where the current user is the creator.

## Acceptance Criteria
- [ ] Returns 200 with array of organizer's events
- [ ] Each event includes: event details, rsvpCount, attendees array
- [ ] Attendees have: id, name, rsvpStatus, checkedIn (boolean)
- [ ] Attendee emails are NOT included (privacy requirement)
- [ ] Events sorted: upcoming first (by date ASC), then past (by date DESC)
- [ ] Returns empty array if user has no events (not 404)
- [ ] Requires authentication

## Files to Create/Modify
- `app/api/events/dashboard/route.ts` — GET handler with organizer auth check

## Implementation Notes
- Use Prisma include: `rsvps: { include: { user: { select: { id: true, name: true } } } }`
- Explicitly exclude email from the user select
- Add a computed `checkedIn` field from EventRsvp (may need to add this field to schema)
- Auth via mock userId header (same pattern as other endpoints)

## Commit Message
`feat: add organizer dashboard API with attendee data`
