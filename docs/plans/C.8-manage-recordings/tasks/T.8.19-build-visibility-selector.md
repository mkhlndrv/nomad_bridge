# T.8.19: Build VisibilitySelector + EventRecordingsSection

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** REC-UPLOAD-06, REC-UPLOAD-05

## Description
Build the VisibilitySelector dropdown component (Public/Attendees Only/Unlisted) used in the upload form. Also build the EventRecordingsSection that displays on the event detail page — listing all recordings for that event with an "Add Recording" button for the organizer.

## Acceptance Criteria
- [ ] VisibilitySelector: dropdown with 3 options, each with icon and description
- [ ] Public (Globe): "Visible to all users"
- [ ] Attendees Only (Lock): "Only RSVPed users can view"
- [ ] Unlisted (Link): "Accessible only with direct link"
- [ ] EventRecordingsSection: lists recordings for the event
- [ ] Shows "Add Recording" button for event organizer
- [ ] Empty state: "No recordings yet" (organizer sees add button)
- [ ] Recording cards link to `/recordings/[id]`

## Files to Create/Modify
- `components/recordings/VisibilitySelector.tsx` — Client dropdown component
- `components/recordings/EventRecordingsSection.tsx` — Server component for event detail page

## Implementation Notes
- VisibilitySelector uses lucide icons: Globe, Lock, Link2
- EventRecordingsSection fetches recordings filtered by eventId
- Organizer detection: compare event.creatorId with current userId

## Commit Message
`feat: add visibility selector and event recordings section`
