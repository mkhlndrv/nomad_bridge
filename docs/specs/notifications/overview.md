# Specification: Notifications (Email, LINE & Telegram)

> Last updated: 2026-04-01

## Intent / Vibe

Keep users informed without overwhelming them. Notifications should feel helpful and timely — like a friend tapping your shoulder to say "Hey, that workshop you wanted is tomorrow" or "Your booking is confirmed, here's your QR code." The system supports three channels: email (reliable, always works), LINE (popular in Thailand, feels instant and personal), and Telegram (popular globally among digital nomads, great for rich messages). Users should feel in control of what they receive and how.

## Sub-Features

- [SF1: Notification Triggers](triggers.md)
- [SF2: Email Notifications](email.md)
- [SF3: LINE Notifications](line.md)
- [SF4: Telegram Notifications](telegram.md)
- [SF5: In-App Notification Center](notification-center.md)

## Page Components

### Shared Logic

**`lib/notifications.ts`:**
- `sendNotification(userId, type, payload)` — check preferences, create in-app record, mock email, mock LINE, mock Telegram

**`lib/mock-email.ts`:**
- `mockSendEmail()` — log formatted HTML template to console

**`lib/mock-line.ts`:**
- `mockSendLine()` — log short conversational message (<200 chars) to console

**`lib/mock-telegram.ts`:**
- `mockSendTelegram()` — log Telegram Markdown message (<300 chars) to console

**`lib/notification-types.ts`:**
- Maps 13 notification types to 5 categories (Events, Bookings, Lectures, Community, Trust)

## Edge Cases & Constraints

- Never send duplicate notifications for the same event (idempotency).
- If email, LINE, or Telegram delivery fails, log the failure but don't retry indefinitely (max 2 retries).
- Rate limit: no more than 10 notifications per user per hour (prevent spam from bulk actions).
- Notification content should never contain sensitive data (no full email addresses of other users).
- Handle users who haven't set up LINE — gracefully skip LINE delivery, don't error.
- Handle users who haven't set up Telegram — gracefully skip Telegram delivery, don't error.
- Notification preferences should persist across sessions.
- Old notifications (> 30 days) can be archived/hidden from the notification center.
- Duplicate detection is by `(userId, type, referenceId)` tuple. Before inserting a new Notification record, query for an existing match. If found, skip the insert silently.
- Archive is automatic: notifications older than 30 days are soft-deleted (`archived: true`) by the scheduled cron job. Archived notifications are hidden from the default notification center view but remain in the database and are accessible via `?includeArchived=true`.

## Acceptance Criteria

- All notification events from the trigger list fire correctly [NTF-TRIGGER-01 through NTF-TRIGGER-13]
- Email, LINE, and Telegram mock implementations log realistic output to console [NTF-EMAIL-05, NTF-LINE-04, NTF-TG-04]
- Users can toggle notification preferences per channel (Email/LINE/Telegram) and they are respected [NTF-CENTER-06, NTF-CENTER-09]
- In-app notification center shows unread count and notification list [NTF-CENTER-01, NTF-CENTER-02]
- Clicking a notification navigates to the correct page [NTF-CENTER-04]
- No duplicate notifications sent for the same trigger
- Responsive design for the notification center on mobile and desktop

## Definition of Done

- Notification trigger system covers all events in the table
- Mock email, LINE, and Telegram implementations produce realistic console output
- Notification preferences UI works with 3 channel columns and persists settings
- In-app notification center with unread count
- No duplicate notifications
- Responsive design
- Atomic commits per notification type or subsystem
