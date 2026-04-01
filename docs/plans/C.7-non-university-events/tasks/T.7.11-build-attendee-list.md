# T.7.11: Build AttendeeList + ManualCheckinToggle

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** COM-DISC-06, COM-DISC-07, COM-DASH-02

## Description
Build an attendee list component that shows names with check-in status, used within the OrganizerEventCard. Each attendee row has a ManualCheckinToggle — a simple toggle switch the organizer clicks to mark someone as checked in. Checking in triggers a POST to the check-in API which also awards +5 trust to the attendee.

## Acceptance Criteria
- [ ] Renders list of attendee names with check-in toggles
- [ ] Toggle switches between checked-in (green checkmark) and not checked-in
- [ ] Optimistic UI update on toggle
- [ ] Shows total checked-in count: "X/Y checked in"
- [ ] No email addresses displayed (names only)
- [ ] Calls POST /api/events/[id]/checkin on toggle

## Files to Create/Modify
- `components/community/AttendeeList.tsx` — Server component rendering the list
- `components/community/ManualCheckinToggle.tsx` — Client component for the toggle

## Implementation Notes
- ManualCheckinToggle is a `"use client"` component with local state
- Green Check icon (lucide) when checked in, gray Circle when not
- Keep the list scrollable if many attendees

## Commit Message
`feat: add attendee list with manual check-in toggle`
