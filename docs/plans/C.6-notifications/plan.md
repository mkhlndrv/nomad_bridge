# C.6: Notifications (Email, LINE & Telegram) — Implementation Plan

**Spec:** `docs/specs/notifications/overview.md`
**Prefix:** NTF | **Sub-features:** 5 | **Requirements:** 35
**Dependencies:** None (infrastructure)
**Sprints:** 3 | **Tasks:** 18

---

## Sprint 1 — Models + Mock Services [M1: Infrastructure Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.6.01](tasks/T.6.01-create-notification-models.md) | Create Notification + Preference models | 25m | — |
| [T.6.02](tasks/T.6.02-define-notification-types.md) | Define lib/notification-types.ts | 20m | — |
| [T.6.03](tasks/T.6.03-implement-mock-email.md) | Implement lib/mock-email.ts | 20m | — |
| [T.6.04](tasks/T.6.04-implement-mock-line.md) | Implement lib/mock-line.ts | 15m | — |
| [T.6.05](tasks/T.6.05-implement-mock-telegram.md) | Implement lib/mock-telegram.ts | 15m | — |
| [T.6.06](tasks/T.6.06-implement-send-notification.md) | Implement lib/notifications.ts | 30m | T.6.01-T.6.05 |

### M1 DOD
- [ ] Notification and NotificationPreference models in Prisma
- [ ] 13 notification types mapped to 5 categories
- [ ] Mock email logs HTML template to console
- [ ] Mock LINE logs <200 char message to console
- [ ] Mock Telegram logs Markdown <300 char message to console
- [ ] sendNotification: checks preferences, creates in-app record, dispatches channels

---

## Sprint 2 — In-App Notification Center [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.6.07](tasks/T.6.07-build-notification-bell.md) | Build NotificationBell component | 20m | T.6.01 |
| [T.6.08](tasks/T.6.08-build-notification-dropdown.md) | Build NotificationDropdown | 25m | T.6.07 |
| [T.6.09](tasks/T.6.09-build-notification-item.md) | Build NotificationItem component | 20m | — |
| [T.6.10](tasks/T.6.10-get-notifications-api.md) | GET /api/notifications | 25m | T.6.01 |
| [T.6.11](tasks/T.6.11-get-unread-count-api.md) | GET /api/notifications/unread-count | 15m | T.6.10 |
| [T.6.12](tasks/T.6.12-post-mark-read-api.md) | POST /api/notifications/mark-read | 20m | T.6.10 |

### M2 DOD
- [ ] Bell icon shows unread count badge in navbar
- [ ] Dropdown shows last 10 notifications
- [ ] Click notification navigates to relevant page + marks read
- [ ] "Mark all read" clears unread count
- [ ] Polling updates badge every 30s

---

## Sprint 3 — Preferences + Integration [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.6.13](tasks/T.6.13-build-notification-center.md) | Build NotificationCenter full page | 25m | T.6.09 |
| [T.6.14](tasks/T.6.14-build-notification-preferences.md) | Build NotificationPreferences | 30m | — |
| [T.6.15](tasks/T.6.15-get-preferences-api.md) | GET /api/notifications/preferences | 15m | T.6.01 |
| [T.6.16](tasks/T.6.16-put-preferences-api.md) | PUT /api/notifications/preferences | 20m | T.6.15 |
| [T.6.17](tasks/T.6.17-wire-preferences-into-send.md) | Wire preferences into sendNotification | 20m | T.6.06, T.6.16 |
| [T.6.18](tasks/T.6.18-integrate-triggers.md) | Integrate triggers with RSVP + booking | 25m | T.6.06, C.1, C.4 |

### M3 DOD
- [ ] Full notification page with pagination and date grouping
- [ ] Preferences grid: 5 rows (Events/Bookings/Lectures/Community/Trust) x 3 cols (Email/LINE/Telegram)
- [ ] Disabled channels never receive notifications
- [ ] RSVP and booking actions trigger appropriate notifications
- [ ] All 35 NTF-* requirements satisfied
- [ ] All tests passing
