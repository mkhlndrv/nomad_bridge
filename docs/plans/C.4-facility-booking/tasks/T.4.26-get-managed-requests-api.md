# T.4.26: GET /api/booking-requests/managed API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.4.01
**Spec References:** FAC-MGR-01, FAC-MGR-02

## Description
Create an API route handler for `GET /api/booking-requests/managed` that returns all booking requests for venues managed by the authenticated user. This endpoint powers the venue manager dashboard (T.4.16). It returns requests across all venues the manager is responsible for, with filtering by status and venue. Each request includes requester info with trust score, facility details, and interest count. Results are ordered to prioritize actionable items (UNDER_REVIEW first, then OPEN, then terminal states).

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/managed/route.ts`
- [ ] Accepts GET with query parameters: `status` (optional, comma-separated), `facilityId` (optional), `page` (default 1), `limit` (default 20)
- [ ] Returns only requests for facilities where the authenticated user is the `managerId`
- [ ] Returns 403 if the user does not have `VENUE_MANAGER` role
- [ ] Returns 401 if user is not authenticated
- [ ] Each request includes: id, title, description, desiredDate, startTime, endTime, expectedAttendance, purpose, status, interestCount, qrCode, rejectionReason, createdAt
- [ ] Each request includes nested `requester` with id, name, trustScore, and image/avatar
- [ ] Each request includes nested `facility` with id, name, type, interestThreshold, and capacity
- [ ] Results are ordered: UNDER_REVIEW first, then OPEN, then APPROVED, then REJECTED/CANCELLED, within each group by createdAt descending
- [ ] Paginated response: `{ requests: [...], total: number, page: number, totalPages: number }`
- [ ] Returns empty array when no requests exist (not an error)

## Files to Create/Modify
- `app/api/booking-requests/managed/route.ts` — GET handler returning requests for the manager's venues with filtering and prioritized ordering

## Implementation Notes
- First fetch the manager's facility IDs: `prisma.facility.findMany({ where: { managerId: userId }, select: { id: true } })`.
- Then fetch booking requests where `facilityId` is in the manager's facility IDs.
- Prisma doesn't support custom ordering by enum value directly — fetch all and sort in JS, or use `orderBy: [{ status: 'asc' }, { createdAt: 'desc' }]` with a post-query re-sort for the desired priority.
- Include `_count: { bookingInterests: true }` as an alternative to the denormalized `interestCount` for verification.
- The `facilityId` query parameter allows filtering to a specific venue when the manager selects one from the dashboard dropdown.

## Commit Message
`feat: add managed booking requests API for venue managers`
