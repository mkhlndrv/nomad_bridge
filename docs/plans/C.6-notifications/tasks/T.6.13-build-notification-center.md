# T.6.13: Build NotificationCenter Full Page

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.6.09
**Spec References:** NTF-CENTER-02, NTF-CENTER-03, NTF-CENTER-04, NTF-CENTER-05

## Description
Create the full `/notifications` page as a server component that displays all notifications with pagination and date grouping. The page shows a header with "Notifications" title and filter tabs (All / Unread). Notifications are grouped by date ("Today", "Yesterday", "This Week", "Earlier") with date separator labels. Each notification renders using the reusable `NotificationItem` component in its `"full"` variant (two-line message). The page fetches the initial set of notifications server-side via `GET /api/notifications` and supports "Load more" pagination (not traditional page numbers). Include a "Mark all read" button in the page header and a link to notification preferences (`/notifications/preferences`). The page should be responsive with full-width cards on mobile.

## Acceptance Criteria
- [ ] Page at `app/notifications/page.tsx` renders the notification center
- [ ] Notifications are grouped by date: "Today", "Yesterday", "This Week", "Earlier"
- [ ] Filter tabs: "All" and "Unread" filter the notification list
- [ ] Each notification uses the NotificationItem component in full variant
- [ ] "Load more" button at the bottom fetches the next page of notifications
- [ ] "Mark all read" button in the header marks all notifications as read
- [ ] Link to notification preferences page is visible in the header
- [ ] Empty state: "You're all caught up!" message with an illustration placeholder
- [ ] Responsive layout: full-width on mobile, centered max-width on desktop
- [ ] Page title and metadata are set correctly

## Files to Create/Modify
- `app/notifications/page.tsx` — Create new NotificationCenter page
- `app/notifications/layout.tsx` — Create layout with metadata (optional, if needed)

## Implementation Notes
- Server-side initial fetch, then client-side "Load more" using a client component wrapper.
- Date grouping logic: compare notification date to today's date in Asia/Bangkok timezone.
- For "Load more", increment the page param and append results to the existing list.
- The Unread filter can use the `unread=true` query param on the API.
- Use Tailwind `max-w-2xl mx-auto` for centered content on desktop.
- Consider a `NotificationList` client component that handles the interactive parts (filtering, pagination, mark-all-read).

## Commit Message
`feat: add NotificationCenter full page with date grouping and pagination`
