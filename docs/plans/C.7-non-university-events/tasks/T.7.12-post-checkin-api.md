# T.7.12: POST /api/events/[id]/checkin

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.7.10
**Spec References:** COM-DISC-07

## Description
Create a POST endpoint for manual check-in toggling. Only the event organizer can check in attendees. Body contains `{ userId: string }`. Toggles the check-in status on the attendee's RSVP. When checking IN, awards +5 trust score to the attendee using adjustTrustScore. When checking OUT (unchecking), reverses the +5 trust.

## Acceptance Criteria
- [ ] Only event creator can call this endpoint (403 for others)
- [ ] Toggles checkedIn boolean on the EventRsvp record
- [ ] Check-in awards +5 trust to attendee via adjustTrustScore
- [ ] Un-checking reverses the +5 trust (delta=-5)
- [ ] Returns 404 if userId is not RSVPed to this event
- [ ] Returns 200 with updated check-in status

## Files to Create/Modify
- `app/api/events/[id]/checkin/route.ts` — POST handler with organizer auth
- `prisma/schema.prisma` — Add `checkedIn` Boolean field to EventRsvp (default false) if not already present

## Implementation Notes
- Use lib/trust-score.ts adjustTrustScore for the trust award
- Reason for trust log: "Checked in at community event: {eventTitle}"
- Wrap toggle + trust adjustment in a transaction

## Commit Message
`feat: add manual check-in API with trust score award`
