# T.6.06: Implement sendNotification Orchestrator

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 30m
**Dependencies:** T.6.01, T.6.02, T.6.03, T.6.04, T.6.05
**Spec References:** NTF-CENTER-08, NTF-CENTER-09, NTF-TRIGGER-01 through NTF-TRIGGER-13

## Description
Create `lib/notifications.ts` with the main `sendNotification(userId, type, payload)` function that orchestrates the entire notification flow. This function: (1) looks up the notification type in `NOTIFICATION_TYPE_MAP` to get the category and default channels, (2) checks the user's `NotificationPreference` for that category — if no preference exists, creates one with all channels enabled (NTF-CENTER-08), (3) creates an in-app `Notification` record in the database, (4) dispatches to each enabled channel by calling `mockSendEmail`, `mockSendLine`, and/or `mockSendTelegram` based on the intersection of default channels and user preferences (NTF-CENTER-09), and (5) implements idempotency by checking for duplicate notifications (same userId + type + linkUrl within the last 5 minutes). Include basic rate limiting: no more than 10 notifications per user per hour.

## Acceptance Criteria
- [ ] `sendNotification(userId, type, payload)` function is exported
- [ ] Function creates a Notification record in the database for every notification
- [ ] Function checks NotificationPreference before dispatching to channels
- [ ] If no preference exists for the category, one is created with all channels enabled
- [ ] Only channels that are both in defaultChannels AND enabled in preferences receive the notification
- [ ] Duplicate detection prevents the same notification (userId + type + linkUrl) within 5 minutes
- [ ] Rate limiting blocks more than 10 notifications per user per hour
- [ ] Function returns a result object with: notificationId, channelsDispatched, channelsSkipped
- [ ] Errors in individual channel dispatches are caught and logged but don't fail the whole operation
- [ ] Gracefully handles missing LINE/Telegram setup (skips channel without error)

## Files to Create/Modify
- `lib/notifications.ts` — Create new file with sendNotification function and helper utilities

## Implementation Notes
- Use Prisma transactions where appropriate (creating notification + checking preferences).
- For idempotency, query for existing notifications: `where: { userId, type, linkUrl, createdAt: { gte: fiveMinutesAgo } }`.
- For rate limiting, count notifications: `where: { userId, createdAt: { gte: oneHourAgo } }`.
- Channel dispatch should be done in parallel using `Promise.allSettled` for resilience.
- This is the single entry point for all notification sending — every trigger in T.6.18 will call this function.

## Commit Message
`feat: implement sendNotification orchestrator with preferences and rate limiting`
