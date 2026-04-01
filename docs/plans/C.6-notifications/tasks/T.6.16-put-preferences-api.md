# T.6.16: PUT /api/notifications/preferences Endpoint

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.6.15
**Spec References:** NTF-CENTER-06, NTF-CENTER-07, NTF-CENTER-09

## Description
Create the `PUT /api/notifications/preferences` route handler that updates the authenticated user's notification channel toggles. The endpoint accepts a request body containing an array of preference objects, each specifying a category and which channels are enabled. It uses Prisma's `upsert` to either update an existing `NotificationPreference` record or create a new one for the (userId, category) pair. The endpoint validates that all categories are from the allowed set and all channel flags are booleans. It supports both full matrix updates (all 5 categories at once, for "Reset to defaults") and partial updates (single category toggle change).

## Acceptance Criteria
- [ ] Route handler at `app/api/notifications/preferences/route.ts` responds to PUT
- [ ] Accepts body: `{ preferences: [{ category: string, emailEnabled: boolean, lineEnabled: boolean, telegramEnabled: boolean }] }`
- [ ] Upserts each preference: creates if missing, updates if exists
- [ ] Only updates preferences for the authenticated user
- [ ] Validates category is one of: EVENTS, BOOKINGS, LECTURES, COMMUNITY, TRUST
- [ ] Validates channel flags are booleans
- [ ] Returns 400 if request body is invalid or contains unknown categories
- [ ] Returns 401 if user is not authenticated
- [ ] Returns the updated preference matrix in the same shape as the GET endpoint
- [ ] Supports partial updates (sending just 1 category) and full updates (sending all 5)

## Files to Create/Modify
- `app/api/notifications/preferences/route.ts` — Add PUT handler to the existing route file

## Implementation Notes
- Use `prisma.notificationPreference.upsert` for each preference in the array, matching on the `@@unique([userId, category])` constraint.
- Wrap multiple upserts in a `prisma.$transaction` for atomicity.
- Validate the request body before any database operations. Reject early with 400 if validation fails.
- After the upsert transaction, re-fetch and return the full preference matrix (same as GET) so the client stays in sync.
- For "Reset to defaults", the client sends all 5 categories with all channels set to true.

## Commit Message
`feat: add PUT /api/notifications/preferences endpoint with upsert and validation`
