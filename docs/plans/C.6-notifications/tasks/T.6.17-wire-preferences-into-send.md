# T.6.17: Wire Preferences into sendNotification

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.6.06, T.6.16
**Spec References:** NTF-CENTER-09, NTF-CENTER-06, NTF-CENTER-08

## Description
Update the `sendNotification` function in `lib/notifications.ts` to fully integrate with persisted user preferences from the `NotificationPreference` model. In Sprint 1 (T.6.06), the function was implemented with basic preference checking — this task ensures the preference lookup uses the same logic and data as the preferences API endpoints (T.6.15/T.6.16). Specifically: when `sendNotification` is called, it queries the user's `NotificationPreference` for the notification's category. If no preference record exists, it treats all channels as enabled (NTF-CENTER-08 default). For each channel in the notification type's default channels, it only dispatches if the corresponding preference flag is true (NTF-CENTER-09). Extract the preference lookup into a shared helper function (`getUserPreference(userId, category)`) that both `sendNotification` and the API endpoints can reuse, ensuring consistent default behavior.

## Acceptance Criteria
- [ ] `sendNotification` reads from `NotificationPreference` model before dispatching to channels
- [ ] If user has disabled email for a category, no email is sent for that category's notifications
- [ ] If user has disabled LINE for a category, no LINE message is sent for that category's notifications
- [ ] If user has disabled Telegram for a category, no Telegram message is sent for that category's notifications
- [ ] If no preference record exists, all channels default to enabled
- [ ] Shared helper `getUserPreference(userId, category)` is extracted and reusable
- [ ] The GET /api/notifications/preferences endpoint uses the same shared helper for defaults
- [ ] The in-app notification record is always created regardless of channel preferences
- [ ] Channel dispatch results accurately reflect which channels were skipped due to preferences
- [ ] All existing mock channel tests still pass after the refactor

## Files to Create/Modify
- `lib/notifications.ts` — Update sendNotification to use shared preference helper
- `lib/notification-preferences.ts` — Create shared helper for preference lookup with defaults
- `app/api/notifications/preferences/route.ts` — Refactor to use the shared helper

## Implementation Notes
- The shared helper signature: `getUserPreference(userId: string, category: string): Promise<{ emailEnabled: boolean, lineEnabled: boolean, telegramEnabled: boolean }>`.
- The helper queries `prisma.notificationPreference.findUnique({ where: { userId_category: { userId, category } } })` and returns defaults if null.
- In `sendNotification`, the preference check should happen after duplicate detection and rate limiting, but before channel dispatch.
- The `channelsDispatched` and `channelsSkipped` arrays in the return value should distinguish between "skipped due to preference" and "skipped due to not being a default channel for this type".
- This is primarily a refactor for consistency — the behavior should match what was already implemented in T.6.06, but now backed by the actual database records managed through T.6.15/T.6.16.

## Commit Message
`refactor: extract shared preference helper and wire into sendNotification`
