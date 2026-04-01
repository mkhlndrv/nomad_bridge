# T.4.16: Build VenueManagerDashboard Page

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.4.15
**Spec References:** FAC-MGR-01, FAC-MGR-02

## Description
Build the venue manager dashboard page at `app/facilities/manage/page.tsx`. This server component page is accessible to users with the `VENUE_MANAGER` role and displays an overview of all booking requests across the manager's venues. The page should show summary statistics at the top (total requests, pending review count, approval rate, upcoming confirmed events) and below it a list of requests grouped by status: "Under Review" first (requires action), then "Open" (gathering interest), then "Approved" and "Rejected". Each request is rendered using the `ManagerRequestCard` component (T.4.17).

## Acceptance Criteria
- [ ] Page exists at `app/facilities/manage/page.tsx`
- [ ] Page is only accessible to users with `VENUE_MANAGER` role — redirects others to `/facilities`
- [ ] Displays summary stats section: total requests, awaiting review, approved this month, upcoming events
- [ ] Requests are grouped by status with clear section headers
- [ ] "Under Review" section appears first with a visual indicator (e.g., yellow border or badge count)
- [ ] Each request is rendered using `ManagerRequestCard` component
- [ ] Shows empty state message per section when no requests exist for that status
- [ ] If the manager has multiple venues, shows a venue filter/dropdown to narrow the view
- [ ] Page is responsive: stats cards in a grid on desktop, stacked on mobile
- [ ] Fetches data from `GET /api/booking-requests/managed` (T.4.26) with appropriate filters

## Files to Create/Modify
- `app/facilities/manage/page.tsx` — Server component: venue manager dashboard with stats and grouped request list

## Implementation Notes
- Check the user's role server-side before rendering. Use `redirect()` from `next/navigation` for unauthorized access.
- Stats can be computed from the fetched requests on the server side — no separate API needed.
- Group requests using a simple `reduce` or `Object.groupBy` by status field.
- Use lucide-react icons in stat cards: `BarChart3` for total, `Clock` for pending, `CheckCircle` for approved, `Calendar` for upcoming.
- The venue manager can manage multiple venues — the dashboard aggregates all of them by default.

## Commit Message
`feat: add venue manager dashboard page with stats and grouped requests`
