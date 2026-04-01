# T.7.09: Build OrganizerEventCard

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 2 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** COM-DASH-01, COM-DASH-02, COM-DASH-03

## Description
Build an extended event card for the organizer dashboard. Shows the event title, date, venue, RSVP count with capacity, and quick action buttons (Edit, Cancel, Send Announcement). Includes an expandable attendee list showing names and check-in status. Different from the public EventCard — this is management-focused.

## Acceptance Criteria
- [ ] Shows event title, date (Bangkok TZ), venue, event type badge
- [ ] RSVP count displayed as "X/Y RSVPs" (or "X RSVPs" if unlimited capacity)
- [ ] Expandable attendee list with names (no emails)
- [ ] Action buttons: Edit, Cancel, Send Announcement
- [ ] Edit links to event edit page
- [ ] Cancel shows confirmation dialog
- [ ] Announce opens SendAnnouncementForm modal
- [ ] Visual distinction between upcoming (active) and past events

## Files to Create/Modify
- `components/community/OrganizerEventCard.tsx` — Client component with expand/collapse and action buttons

## Implementation Notes
- Use `"use client"` for interactive expand/collapse and modals
- Attendee list data comes from the dashboard API response
- Check-in toggle per attendee uses ManualCheckinToggle from T.7.11
- Use lucide icons: Pencil (edit), XCircle (cancel), Megaphone (announce)

## Commit Message
`feat: add organizer event card with attendee management`
