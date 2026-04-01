# T.6.08: Build NotificationDropdown Component

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.6.07
**Spec References:** NTF-CENTER-02, NTF-CENTER-05

## Description
Create a `NotificationDropdown` client component that renders as an absolutely-positioned panel below the NotificationBell. It fetches and displays the last 10 notifications from `GET /api/notifications?limit=10`, showing each one using the `NotificationItem` component (T.6.09). The dropdown includes a header with "Notifications" title and a "Mark all read" button (NTF-CENTER-05) that calls `POST /api/notifications/mark-read` with `{ all: true }`. At the bottom, a "View all notifications" link navigates to the full NotificationCenter page (`/notifications`). The dropdown should have a max-height with scroll overflow for content, a subtle shadow, and a small arrow/triangle pointing to the bell icon.

## Acceptance Criteria
- [ ] Dropdown panel renders below the bell icon with proper positioning
- [ ] Fetches and displays last 10 notifications on open
- [ ] Each notification renders using the NotificationItem component
- [ ] "Mark all read" button is visible in the header
- [ ] Clicking "Mark all read" calls the mark-read API and updates the UI immediately
- [ ] "View all" link at the bottom navigates to `/notifications`
- [ ] Dropdown has max-height with scroll overflow
- [ ] Empty state shows "No notifications yet" message
- [ ] Loading state shows a spinner or skeleton while fetching
- [ ] Dropdown has subtle box-shadow and rounded corners

## Files to Create/Modify
- `components/notification-dropdown.tsx` — Create new NotificationDropdown client component

## Implementation Notes
- Fetch notifications when the dropdown opens (not on every render). Use a prop like `isOpen` to trigger the fetch.
- After "Mark all read", optimistically update the local state to show all items as read, then refetch.
- Use Tailwind classes for positioning: `absolute right-0 top-full mt-2 w-96`.
- On mobile, the dropdown could be full-width. Use responsive Tailwind classes.
- Pass an `onClose` callback to close the dropdown when navigating away.

## Commit Message
`feat: add NotificationDropdown with recent notifications and mark-all-read`
