# T.8.22: Build RecordingAccessGate Component

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** REC-VIEW-07, REC-UPLOAD-06

## Description
Build a component displayed when a user lacks permission to view a recording. Shows a clear message explaining why access is restricted and provides a link to the event page where they can RSVP to gain access. Used for ATTENDEES_ONLY recordings when the user hasn't RSVPed.

## Acceptance Criteria
- [ ] Displays "Recording Restricted" message with Lock icon
- [ ] Explains: "This recording is only available to event attendees"
- [ ] Shows link to the event page: "RSVP to {eventTitle} to watch this recording"
- [ ] Link navigates to `/events/[eventId]`
- [ ] Clean, centered layout with appropriate spacing
- [ ] Does not reveal any recording content

## Files to Create/Modify
- `components/recordings/RecordingAccessGate.tsx` — Server component with restriction message

## Implementation Notes
- Accept eventId and eventTitle as props
- Use lucide Lock icon prominently
- Keep the message friendly and actionable (not just "Access Denied")
- Used by the recording detail page when access check fails

## Commit Message
`feat: add recording access gate with RSVP call-to-action`
