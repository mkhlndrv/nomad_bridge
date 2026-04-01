# T.6.15: GET /api/notifications/preferences Endpoint

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.6.01
**Spec References:** NTF-CENTER-06, NTF-CENTER-07, NTF-CENTER-08

## Description
Create the `GET /api/notifications/preferences` route handler that returns the current user's notification preference matrix. The endpoint queries the `NotificationPreference` model for all rows belonging to the authenticated user. If the user has no preferences yet (first visit), the endpoint returns the default matrix with all 5 categories and all channels enabled (NTF-CENTER-08) — it does NOT create the records in the database on read (that happens on first write in T.6.16). The response is an array of 5 objects, one per category, each containing the category name and three boolean channel flags.

## Acceptance Criteria
- [ ] Route handler at `app/api/notifications/preferences/route.ts` responds to GET
- [ ] Returns the preference matrix for the authenticated user
- [ ] Response shape: `{ preferences: [{ category: string, emailEnabled: boolean, lineEnabled: boolean, telegramEnabled: boolean }] }`
- [ ] Always returns exactly 5 categories in consistent order: EVENTS, BOOKINGS, LECTURES, COMMUNITY, TRUST
- [ ] If user has no saved preferences, returns default matrix with all channels enabled (true)
- [ ] If user has partial preferences (e.g., only 3 of 5 categories saved), fills in missing categories with defaults
- [ ] Returns 401 if user is not authenticated
- [ ] Response includes no extra fields or sensitive data

## Files to Create/Modify
- `app/api/notifications/preferences/route.ts` — Create new route handler for GET

## Implementation Notes
- Define the 5 categories as a constant array: `['EVENTS', 'BOOKINGS', 'LECTURES', 'COMMUNITY', 'TRUST']`.
- Query existing preferences: `prisma.notificationPreference.findMany({ where: { userId } })`.
- Merge existing preferences with defaults: iterate over the 5 categories, use saved values if found, otherwise use `{ emailEnabled: true, lineEnabled: true, telegramEnabled: true }`.
- This pattern avoids creating database records on read, keeping the GET endpoint side-effect-free.
- Use the existing auth pattern from other API routes in the project.

## Commit Message
`feat: add GET /api/notifications/preferences endpoint with default matrix`
