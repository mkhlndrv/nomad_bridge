# T.7.14: POST /api/events/[id]/announce

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.7.10
**Spec References:** COM-DASH-03

## Description
Create a POST endpoint for event organizers to send announcements to all RSVPed attendees. Only the event creator can call this. Body contains `{ message: string }`. Creates a notification for each RSVPed user using the sendNotification function from C.6. The notification type is EVENT_ANNOUNCEMENT.

## Acceptance Criteria
- [ ] Only event creator can send announcements (403 for others)
- [ ] Validates message is non-empty and <= 500 chars
- [ ] Creates a notification for each RSVPed user (not the organizer themselves)
- [ ] Notification includes event title and the announcement message
- [ ] Returns 200 with count of notifications sent
- [ ] Returns 404 if event not found

## Files to Create/Modify
- `app/api/events/[id]/announce/route.ts` — POST handler with organizer auth and bulk notifications

## Implementation Notes
- Use sendNotification from lib/notifications.ts for each attendee
- Fire-and-forget pattern — don't wait for all notifications to complete before responding
- Query EventRsvp for all RSVPed users (status=CONFIRMED), exclude the organizer
- The notification link should point to the event detail page

## Commit Message
`feat: add event announcement API with attendee notifications`
