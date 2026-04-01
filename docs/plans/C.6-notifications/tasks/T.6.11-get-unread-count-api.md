# T.6.11: GET /api/notifications/unread-count Endpoint

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 15m
**Dependencies:** T.6.10
**Spec References:** NTF-CENTER-01

## Description
Create the `GET /api/notifications/unread-count` route handler that returns the count of unread notifications for the current user. This is a lightweight endpoint optimized for frequent polling (every 30 seconds from the NotificationBell component). It queries the `Notification` model with a simple count: `where: { userId, read: false }`. The response is minimal to reduce bandwidth. This endpoint must be fast — use the `@@index([userId, read])` index added in T.6.01 for efficient counting.

## Acceptance Criteria
- [ ] Route handler at `app/api/notifications/unread-count/route.ts` responds to GET
- [ ] Returns `{ count: number }` with the unread notification count
- [ ] Only counts notifications for the authenticated user
- [ ] Returns 401 if user is not authenticated
- [ ] Returns `{ count: 0 }` for users with no unread notifications
- [ ] Response is fast (< 50ms) — uses indexed query
- [ ] Excludes notifications older than 30 days from the count

## Files to Create/Modify
- `app/api/notifications/unread-count/route.ts` — Create new route handler

## Implementation Notes
- This is the most frequently called notification endpoint (every 30s per active user), so keep it minimal.
- Use `prisma.notification.count()` instead of fetching full records.
- Consider adding `Cache-Control: no-cache` header since the bell needs real-time accuracy.
- The query: `prisma.notification.count({ where: { userId, read: false, createdAt: { gte: thirtyDaysAgo } } })`.

## Commit Message
`feat: add GET /api/notifications/unread-count endpoint for bell polling`
