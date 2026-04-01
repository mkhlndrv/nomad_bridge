# T.4.15: GET /api/booking-requests API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 3 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.4.10
**Spec References:** FAC-REQ-03, FAC-REQ-05

## Description
Create an API route handler for `GET /api/booking-requests` that returns a paginated list of booking requests. Support filtering by venue (`facilityId`), status, and optionally by the requesting user. Include the interest count, requester info (name, trust score), and facility info (name, type) in each response item. This endpoint powers the venue detail page's active requests list, the general requests feed, and any filtered views.

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/route.ts` (GET handler)
- [ ] Accepts query parameters: `facilityId`, `status`, `requesterId`, `page` (default 1), `limit` (default 10)
- [ ] Returns paginated results: `{ requests: [...], total: number, page: number, totalPages: number }`
- [ ] Each request object includes: id, title, description, desiredDate, startTime, endTime, expectedAttendance, purpose, status, interestCount, createdAt
- [ ] Each request includes nested `requester` with id, name, and trustScore
- [ ] Each request includes nested `facility` with id, name, type, and interestThreshold
- [ ] Results are ordered by `createdAt` descending (newest first) by default
- [ ] When filtering by `status`, accepts comma-separated values (e.g., `status=OPEN,UNDER_REVIEW`)
- [ ] Returns empty array (not error) when no results match the filters
- [ ] Handles invalid page/limit values gracefully (defaults to 1/10)

## Files to Create/Modify
- `app/api/booking-requests/route.ts` — Add GET handler alongside existing POST handler from T.4.10

## Implementation Notes
- Use `prisma.bookingRequest.findMany()` with `where`, `include`, `skip`, `take`, and `orderBy`.
- Calculate `skip` as `(page - 1) * limit`. Use `prisma.bookingRequest.count()` for total.
- Include `requester: { select: { id: true, name: true, trustScore: true } }` and `facility: { select: { id: true, name: true, type: true, interestThreshold: true } }`.
- For comma-separated status filter, split the string and use Prisma `in` operator.
- No authentication required for reading public requests — this data is visible to all users.

## Commit Message
`feat: add GET booking requests API with filters and pagination`
