# T.6.18: Integrate Notification Triggers with RSVP + Booking Endpoints

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.6.06, C.1, C.4
**Spec References:** NTF-TRIGGER-01, NTF-TRIGGER-03, NTF-TRIGGER-04, NTF-TRIGGER-06, NTF-TRIGGER-08

## Description
Add `sendNotification` calls to the existing RSVP and booking API endpoints so that real user actions trigger the appropriate notifications. This task covers the highest-priority triggers: RSVP confirmation (NTF-TRIGGER-01), event cancellation (NTF-TRIGGER-03), waitlist promotion (NTF-TRIGGER-04), booking confirmation (NTF-TRIGGER-06), and booking cancellation (NTF-TRIGGER-08). Each trigger is placed after the successful database operation in the relevant route handler, using a fire-and-forget pattern (await but don't block the response on notification failure). The `sendNotification` call includes the appropriate notification type, a human-readable payload (title, message), and a `linkUrl` pointing to the relevant detail page. Notification failures are logged but never cause the parent action to fail.

## Acceptance Criteria
- [ ] RSVP creation triggers `RSVP_CONFIRMATION` notification to the user who RSVPed
- [ ] Event cancellation triggers `EVENT_CANCELLED` notification to all RSVPed users
- [ ] Waitlist-to-confirmed promotion triggers `WAITLIST_PROMOTED` notification to the promoted user
- [ ] Booking confirmation triggers `BOOKING_CONFIRMATION` notification to the user who booked
- [ ] Booking cancellation triggers `BOOKING_CANCELLED` notification to the user who booked
- [ ] Each notification includes a meaningful title, message, and linkUrl
- [ ] linkUrl points to the correct detail page (e.g., `/events/{id}`, `/bookings/{id}`)
- [ ] Notification errors are caught and logged, never causing the parent request to return an error
- [ ] No duplicate notifications for the same action (handled by sendNotification idempotency)
- [ ] All existing RSVP and booking endpoint tests still pass
- [ ] Console shows mock email/LINE/Telegram output when triggers fire in development

## Files to Create/Modify
- `app/api/events/[id]/rsvp/route.ts` — Add sendNotification call after successful RSVP creation
- `app/api/events/[id]/route.ts` — Add sendNotification call for event cancellation (if cancel action exists here)
- `app/api/bookings/route.ts` — Add sendNotification call after successful booking creation
- `app/api/bookings/[id]/route.ts` — Add sendNotification call for booking cancellation
- `lib/notification-payloads.ts` — Create helper functions that build notification payloads for each trigger type

## Implementation Notes
- Import `sendNotification` from `lib/notifications.ts` in each route handler.
- Create payload builders in `lib/notification-payloads.ts` to keep route handlers clean:
  - `buildRsvpConfirmation(event, user)` returns `{ type, title, message, linkUrl }`.
  - `buildBookingConfirmation(booking, facility)` returns `{ type, title, message, linkUrl }`.
  - Similar builders for cancellation and waitlist promotion.
- For event cancellation, loop through all RSVPed users and call `sendNotification` for each. Use `Promise.allSettled` to dispatch in parallel without failing if one user's notification fails.
- For waitlist promotion, the trigger fires inside the RSVP cancellation flow when the next waitlisted user gets promoted.
- Use fire-and-forget pattern: `sendNotification(...).catch(err => console.error('Notification failed:', err))` to avoid blocking the API response.
- Remaining triggers (NTF-TRIGGER-02 reminders, NTF-TRIGGER-05 materials, NTF-TRIGGER-09 through NTF-TRIGGER-13) will be added in future tasks as their parent features are built.

## Commit Message
`feat: integrate notification triggers into RSVP and booking endpoints`
