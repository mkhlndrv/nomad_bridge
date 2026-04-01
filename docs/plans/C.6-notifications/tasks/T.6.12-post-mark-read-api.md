# T.6.12: POST /api/notifications/mark-read Endpoint

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.6.10
**Spec References:** NTF-CENTER-04, NTF-CENTER-05

## Description
Create the `POST /api/notifications/mark-read` route handler that marks notifications as read for the current user. The endpoint supports two modes: (1) marking specific notifications by passing `{ ids: string[] }` in the request body, and (2) marking all unread notifications by passing `{ all: true }`. For specific IDs, it updates only notifications that belong to the authenticated user (preventing unauthorized access). For "mark all", it bulk-updates all unread notifications for the user. Returns the count of notifications that were marked as read. This endpoint is called when a user clicks a notification (NTF-CENTER-04) or clicks "Mark all read" (NTF-CENTER-05).

## Acceptance Criteria
- [ ] Route handler at `app/api/notifications/mark-read/route.ts` responds to POST
- [ ] Accepts `{ ids: string[] }` to mark specific notifications as read
- [ ] Accepts `{ all: true }` to mark all unread notifications as read
- [ ] Only marks notifications belonging to the authenticated user
- [ ] Returns `{ updated: number }` with the count of marked notifications
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 400 if request body is invalid (neither ids nor all provided)
- [ ] Ignores IDs that don't exist or don't belong to the user (no error)
- [ ] Already-read notifications are not re-updated (idempotent)

## Files to Create/Modify
- `app/api/notifications/mark-read/route.ts` — Create new route handler for POST

## Implementation Notes
- For specific IDs: `prisma.notification.updateMany({ where: { id: { in: ids }, userId, read: false }, data: { read: true } })`.
- For mark all: `prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } })`.
- Validate that the request body contains either `ids` (non-empty array of strings) or `all: true`, not both.
- The `updateMany` return value includes `count` which gives the number of updated records.

## Commit Message
`feat: add POST /api/notifications/mark-read endpoint for single and bulk marking`
