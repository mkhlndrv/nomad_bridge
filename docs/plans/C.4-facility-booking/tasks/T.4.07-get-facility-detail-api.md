# T.4.07: GET /api/facilities/[id] — Facility Detail

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.06
**Spec References:** FAC-DIR-05, FAC-DIR-06, FAC-REQ-03

## Description
Create a GET API route at `/api/facilities/[id]` that returns full facility details including the venue manager information and a list of active booking requests for that facility. Include the manager's name and trust score. For each active booking request (status OPEN or UNDER_REVIEW), include the requester's name and trust score, interest count, and the request details. This endpoint powers the venue detail page where users can see existing requests and decide whether to express interest or create a new one.

## Acceptance Criteria
- [ ] GET `/api/facilities/[id]` returns full facility details
- [ ] Response includes all Facility fields plus manager relation (id, name, trustScore)
- [ ] Response includes `activeRequests` array (BookingRequests with status OPEN or UNDER_REVIEW)
- [ ] Each active request includes: id, title, description, desiredDate, startTime, endTime, expectedAttendance, status, interestCount, requester (id, name, trustScore)
- [ ] Active requests are sorted by interestCount descending (most popular first)
- [ ] Returns 404 with error message if facility not found
- [ ] Returns 404 if facility exists but is not available
- [ ] If facility has no manager, includes `manager: null`

## Files to Create/Modify
- `app/api/facilities/[id]/route.ts` — New GET handler

## Implementation Notes
- Use `prisma.facility.findUnique()` with nested includes.
- Filter active requests: `where: { status: { in: ['OPEN', 'UNDER_REVIEW'] } }`.
- Include requester relation on each BookingRequest: `{ select: { id: true, name: true, trustScore: true } }`.
- Sort requests: `orderBy: { interestCount: 'desc' }`.
- When facility has no manager (`managerId` is null), show this state so UI can display "Contact university directly".

## Commit Message
`feat: add GET /api/facilities/[id] with active requests`
