# T.4.23: Build MyBookings Page

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.4.20
**Spec References:** FAC-MYBK-01, FAC-MYBK-02

## Description
Build the "My Bookings" page at `app/bookings/page.tsx`. This server component page shows the current user's booking activity split into two sections: "Active Requests" (booking requests in any non-terminal status) and "Confirmed Bookings" (approved bookings with QR codes). Each section uses its respective card component — `MyRequestCard` for requests and `BookingCard` for confirmed bookings. The page should clearly communicate the request lifecycle and make it easy for users to track the status of their proposals.

## Acceptance Criteria
- [ ] Page exists at `app/bookings/page.tsx`
- [ ] Requires authentication — redirects unauthenticated users to login
- [ ] "Active Requests" section shows all user's booking requests with status OPEN, UNDER_REVIEW (not terminal states)
- [ ] "Confirmed Bookings" section shows approved bookings with upcoming events first
- [ ] Past bookings are shown in a collapsed "Past" subsection or separated below upcoming
- [ ] Each request is rendered with `MyRequestCard` component (T.4.24)
- [ ] Each confirmed booking is rendered with `BookingCard` component (T.4.24)
- [ ] Shows empty state messages: "No active requests" / "No confirmed bookings" when sections are empty
- [ ] Displays a lifecycle legend/guide: Open -> Under Review -> Approved / Rejected
- [ ] Page is responsive: sections stack vertically, cards are full-width on mobile
- [ ] Fetches requests from `GET /api/booking-requests?requesterId={userId}` and bookings from the bookings endpoint

## Files to Create/Modify
- `app/bookings/page.tsx` — Server component: My Bookings page with Active Requests and Confirmed Bookings sections

## Implementation Notes
- Fetch the user's requests and bookings server-side using Prisma directly (server component).
- Sort active requests by `createdAt` descending, confirmed bookings by event date ascending (upcoming first).
- The lifecycle legend can be a simple horizontal step indicator with colored dots and labels.
- Include rejected and cancelled requests in a collapsible "Past Requests" area so users can reference them.
- Use lucide-react icons: `FileText` for requests section, `Ticket` for bookings section.

## Commit Message
`feat: add My Bookings page with requests and confirmed bookings`
