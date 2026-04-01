# T.6.09: Build NotificationItem Component

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** NTF-CENTER-03, NTF-CENTER-04

## Description
Create a reusable `NotificationItem` client component that renders a single notification entry. Each item displays: a category-appropriate icon from lucide-react (mapped via `NOTIFICATION_TYPE_MAP`), the notification title and short message, a relative timestamp (e.g., "2 hours ago", "Yesterday"), and visual read/unread styling (NTF-CENTER-03). Unread notifications have a blue left border or dot indicator and slightly bolder text. Clicking the item navigates to the notification's `linkUrl` and calls `POST /api/notifications/mark-read` with the notification ID to mark it as read (NTF-CENTER-04). This component is reused in both the dropdown (T.6.08) and the full NotificationCenter page (T.6.13).

## Acceptance Criteria
- [ ] Renders notification icon based on notification type (using NOTIFICATION_TYPE_MAP icons)
- [ ] Displays notification title (bold) and message (truncated if too long)
- [ ] Shows relative timestamp (e.g., "5m ago", "2h ago", "Yesterday", "Mar 28")
- [ ] Unread notifications have visual distinction (blue dot/border + bolder styling)
- [ ] Read notifications have muted/lighter styling
- [ ] Clicking the item navigates to `linkUrl` using Next.js router
- [ ] Clicking marks the notification as read via API call
- [ ] Component accepts an `onRead` callback prop for parent state updates
- [ ] Hover state shows subtle background highlight
- [ ] Text truncation with ellipsis for long messages (single line in dropdown, two lines in full page)

## Files to Create/Modify
- `components/notification-item.tsx` — Create new NotificationItem client component

## Implementation Notes
- Use a helper function for relative time formatting (e.g., `formatRelativeTime(date: Date): string`). Consider placing this in `lib/utils.ts` if it doesn't already exist.
- Icons map: CalendarCheck (events), Building (bookings), GraduationCap (lectures), MessageCircle (community), Shield (trust).
- Accept a `variant` prop: `"compact"` for dropdown usage (single line message) and `"full"` for the notification center page (two lines).
- Use `useRouter` from `next/navigation` for client-side navigation.
- The mark-read API call should be fire-and-forget (don't await before navigating).

## Commit Message
`feat: add reusable NotificationItem component with read/unread styling`
