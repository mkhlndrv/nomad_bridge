# T.6.01: Create Notification + Preference Models

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** NTF-CENTER-01, NTF-CENTER-02, NTF-CENTER-03, NTF-CENTER-06, NTF-CENTER-07, NTF-CENTER-08

## Description
Add two new Prisma models to `schema.prisma`: `Notification` and `NotificationPreference`. The `Notification` model stores in-app notifications with fields for userId, type (string matching the 13 trigger types), category (Events/Bookings/Lectures/Community/Trust), title, message, linkUrl (for click-through navigation), read status, and timestamps. The `NotificationPreference` model stores per-user channel toggles with a unique constraint on (userId, category) — each row has boolean columns for emailEnabled, lineEnabled, and telegramEnabled, all defaulting to true (NTF-CENTER-08). Add the corresponding relations to the User model and run `prisma db push` to sync the schema.

## Acceptance Criteria
- [ ] `Notification` model exists with fields: id, userId, type, category, title, message, linkUrl, read (default false), createdAt
- [ ] `NotificationPreference` model exists with fields: id, userId, category, emailEnabled (default true), lineEnabled (default true), telegramEnabled (default true)
- [ ] `NotificationPreference` has a `@@unique([userId, category])` constraint
- [ ] Both models have relations back to User model
- [ ] User model has `notifications Notification[]` and `notificationPreferences NotificationPreference[]` relations
- [ ] `prisma db push` succeeds with no errors
- [ ] SQLite database contains the new tables

## Files to Create/Modify
- `prisma/schema.prisma` — Add Notification and NotificationPreference models, update User model with new relations

## Implementation Notes
- SQLite doesn't support enums natively, so use String type for `type` and `category` fields. Validation happens at the application layer via the types defined in T.6.02.
- The 5 category values are: `EVENTS`, `BOOKINGS`, `LECTURES`, `COMMUNITY`, `TRUST`.
- Index on `userId` and `read` for efficient unread count queries.
- Consider adding `@@index([userId, read])` on Notification for the polling endpoint performance.

## Commit Message
`chore: add Notification and NotificationPreference prisma models`
