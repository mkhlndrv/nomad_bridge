# T.6.10: GET /api/notifications Endpoint

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.6.01
**Spec References:** NTF-CENTER-02

## Description
Create the `GET /api/notifications` route handler that returns the current user's notifications in reverse chronological order with pagination support. The endpoint accepts query parameters: `page` (default 1), `limit` (default 20, max 50), and `unread` (optional boolean filter). It queries the `Notification` model filtered by the authenticated user's ID, applies the unread filter if specified, orders by `createdAt` descending, and returns paginated results along with total count and pagination metadata. Notifications older than 30 days should be excluded from the default query (but accessible via an `includeArchived=true` param).

## Acceptance Criteria
- [ ] Route handler at `app/api/notifications/route.ts` responds to GET requests
- [ ] Returns notifications for the authenticated user only
- [ ] Results are ordered by createdAt descending (newest first)
- [ ] Supports `page` and `limit` query params for pagination
- [ ] Supports `unread=true` query param to filter only unread notifications
- [ ] Excludes notifications older than 30 days by default
- [ ] Response shape: `{ notifications: [...], total: number, page: number, limit: number, hasMore: boolean }`
- [ ] Returns 401 if user is not authenticated
- [ ] Returns empty array (not error) if user has no notifications
- [ ] Limit is capped at 50 to prevent abuse

## Files to Create/Modify
- `app/api/notifications/route.ts` — Create new route handler for GET

## Implementation Notes
- Use the existing auth pattern from other API routes in the project (check for session/user).
- For the 30-day archive cutoff: `createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }`.
- Use Prisma's `skip` and `take` for pagination: `skip: (page - 1) * limit, take: limit`.
- Run a parallel `count` query for total to calculate `hasMore`.
- Return dates as ISO strings (they're stored in UTC, client converts to Bangkok time).

## Commit Message
`feat: add GET /api/notifications endpoint with pagination and filters`
