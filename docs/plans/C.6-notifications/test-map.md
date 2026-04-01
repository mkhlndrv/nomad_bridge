# C.6: Notifications — Test Map

## Unit Tests (`__tests__/unit/notifications.test.ts`)

| # | Test Case | Expected |
|---|-----------|----------|
| 1 | Map RSVP_CONFIRMATION to category | "events" |
| 2 | Map BOOKING_CONFIRMED to category | "bookings" |
| 3 | Map LECTURE_INVITE to category | "lectures" |
| 4 | Map FORUM_REPLY to category | "community" |
| 5 | Map TRUST_SCORE_CHANGE to category | "trust" |
| 6 | All 13 types mapped | no unmapped types |
| 7 | mockSendEmail logs HTML | console.log called with HTML content |
| 8 | mockSendLine message <200 chars | truncated if exceeds |
| 9 | mockSendTelegram uses Markdown | contains bold/link syntax |
| 10 | sendNotification creates in-app record | Notification row created |
| 11 | sendNotification respects preferences | skips disabled channel |
| 12 | Duplicate prevention | same trigger+user = 1 notification |

## Integration Tests (`__tests__/integration/notification-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | Get notifications (empty) | GET /api/notifications | 200, [] |
| 2 | Get notifications (with data) | GET /api/notifications | 200, sorted by date |
| 3 | Get unread only | GET /api/notifications?unread=true | 200, unread only |
| 4 | Pagination | GET /api/notifications?page=2 | 200, next page |
| 5 | Get unread count | GET /api/notifications/unread-count | 200, { count: N } |
| 6 | Mark single as read | POST /api/notifications/mark-read | 200, read=true |
| 7 | Mark all as read | POST /api/notifications/mark-read {all:true} | 200, all read |
| 8 | Get default preferences | GET /api/notifications/preferences | 200, all enabled |
| 9 | Update preferences | PUT /api/notifications/preferences | 200, saved |
| 10 | Send with email disabled | trigger notification | email skipped, LINE+Telegram sent |
| 11 | Send with all disabled | trigger notification | only in-app created |
