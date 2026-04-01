# T.6.07: Build NotificationBell Component

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.6.01
**Spec References:** NTF-CENTER-01

## Description
Create a `NotificationBell` client component that renders a bell icon (lucide-react `Bell`) in the navbar with an unread notification count badge. The component polls `GET /api/notifications/unread-count` every 30 seconds to keep the badge updated. When the unread count is 0, no badge is shown. When clicked, it toggles the `NotificationDropdown` component (T.6.08). The bell should have a subtle animation (scale pulse) when new notifications arrive (count increases from previous poll). Use React state to track the dropdown open/close state and a click-outside handler to close the dropdown.

## Acceptance Criteria
- [ ] Bell icon renders in the navbar using lucide-react `Bell` icon
- [ ] Unread count badge displays when count > 0 (red circle with white number)
- [ ] Badge is hidden when unread count is 0
- [ ] Component polls `/api/notifications/unread-count` every 30 seconds
- [ ] Clicking the bell toggles the dropdown open/closed
- [ ] Clicking outside the dropdown closes it
- [ ] Bell icon has a subtle pulse animation when new notifications arrive
- [ ] Component is a client component (`"use client"`)
- [ ] Responsive: works on mobile (smaller bell) and desktop

## Files to Create/Modify
- `components/notification-bell.tsx` — Create new NotificationBell client component
- `components/navbar.tsx` (or equivalent header component) — Add NotificationBell to the navbar

## Implementation Notes
- Use `useEffect` with `setInterval` for polling. Clean up the interval on unmount.
- Store previous unread count in a ref to detect increases for the pulse animation.
- Badge positioning: absolute positioned over the bell icon, top-right corner.
- For click-outside detection, use a ref on the container and a `mousedown` event listener.
- Consider using `useSWR` or a simple `fetch` in the polling interval — keep it lightweight.

## Commit Message
`feat: add NotificationBell component with unread badge and polling`
