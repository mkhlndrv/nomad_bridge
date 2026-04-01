# T.6.02: Define Notification Types

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** NTF-TRIGGER-01 through NTF-TRIGGER-13, NTF-CENTER-07

## Description
Create `lib/notification-types.ts` to define the complete type system for notifications. This file maps all 13 notification trigger types to their 5 categories and defines TypeScript types/interfaces used throughout the notification system. Define a `NotificationType` union type with values like `RSVP_CONFIRMATION`, `EVENT_REMINDER`, `EVENT_CANCELLED`, etc. Create a `NotificationCategory` union type with values `EVENTS`, `BOOKINGS`, `LECTURES`, `COMMUNITY`, `TRUST`. Export a `NOTIFICATION_TYPE_MAP` constant that maps each type to its category, default channels (which channels fire by default per the spec), icon name (for lucide-react), and a human-readable label. Also export a `NotificationPayload` interface describing the data shape passed to `sendNotification`.

## Acceptance Criteria
- [ ] `NotificationType` union covers all 13 trigger types: RSVP_CONFIRMATION, EVENT_REMINDER, EVENT_CANCELLED, WAITLIST_PROMOTED, POST_EVENT_MATERIALS, BOOKING_CONFIRMATION, BOOKING_REMINDER, BOOKING_CANCELLED, LECTURE_INVITE, LECTURE_APPLICATION, LECTURE_FEEDBACK, TRUST_SCORE_CHANGE, FORUM_REPLY
- [ ] `NotificationCategory` union has 5 values: EVENTS, BOOKINGS, LECTURES, COMMUNITY, TRUST
- [ ] `NOTIFICATION_TYPE_MAP` maps each type to { category, defaultChannels, icon, label }
- [ ] `defaultChannels` per type matches the spec (e.g., RSVP_CONFIRMATION = email + LINE + Telegram, POST_EVENT_MATERIALS = email only, FORUM_REPLY = LINE + Telegram only)
- [ ] `NotificationPayload` interface includes: userId, type, title, message, linkUrl, metadata (optional Record)
- [ ] All types are exported for use across the codebase

## Files to Create/Modify
- `lib/notification-types.ts` — Create new file with all type definitions and mappings

## Implementation Notes
- Reference the spec trigger table closely: some triggers only fire on specific channels (e.g., NTF-TRIGGER-05 is email-only, NTF-TRIGGER-07 is LINE + Telegram only, NTF-TRIGGER-13 is LINE + Telegram only).
- Use `as const` for the map to get strong typing.
- Icons suggestion: CalendarCheck for RSVP, Clock for reminders, XCircle for cancellations, Bell for general, Mail for materials, MessageCircle for forum.

## Commit Message
`feat: define notification types and category mappings`
