# T.7.13: Build SendAnnouncementForm

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COM-DASH-03

## Description
Build a modal form for event organizers to send announcements to all RSVPed attendees. The form has a message textarea and a send button. Opens from the OrganizerEventCard's "Announce" action button. Calls the announce API endpoint on submission.

## Acceptance Criteria
- [ ] Renders as a modal overlay
- [ ] Contains message textarea with character limit (500 chars)
- [ ] Send button submits to POST /api/events/[id]/announce
- [ ] Success: closes modal, shows success toast
- [ ] Error: displays error message inline
- [ ] Cancel button closes the modal without sending
- [ ] Loading state on send button during submission

## Files to Create/Modify
- `components/community/SendAnnouncementForm.tsx` — Client component modal with textarea

## Implementation Notes
- Use `"use client"` for modal state and form handling
- Modal can use a simple overlay with backdrop blur
- Accept eventId as prop
- Message should be required and non-empty

## Commit Message
`feat: add announcement modal for event organizers`
