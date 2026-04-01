# T.3.07: GET /api/collaborations — List with Filters

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.3.01
**Spec References:** COL-BOARD-01, COL-BOARD-02, COL-BOARD-03, COL-BOARD-04, COL-BOARD-05, COL-BOARD-06

## Description
Implement the `GET /api/collaborations` API route that returns a paginated list of collaboration opportunities with filtering support. Accept query parameters: `tab` (requests/offers/all), `type` (CollaborationType), `format` (CollaborationFormat), `compensation` (CompensationType), `status` (CollaborationStatus), `university` (string), and `search` (full-text search across title, description, tags). The `tab` filter maps to the poster's role: "requests" = poster.role is UNIVERSITY, "offers" = poster.role is NOMAD. Return collaborations ordered by createdAt descending, with pagination via `page` and `limit` params (default 12 per page). Include the poster's basic info (name, role) in the response. By default, only show OPEN/IN_DISCUSSION items with future preferred dates; past items are excluded unless `status` is explicitly set.

## Acceptance Criteria
- [ ] `GET /api/collaborations` returns JSON array of collaborations
- [ ] `?tab=requests` filters to university-posted items; `?tab=offers` filters to nomad-posted items
- [ ] `?type=LECTURE` filters by collaboration type (and similarly for all 5 types)
- [ ] `?format=IN_PERSON` filters by format
- [ ] `?compensation=PAID` filters by compensation type
- [ ] `?status=OPEN` filters by status
- [ ] `?search=keyword` searches across title, description, and tags
- [ ] Pagination with `?page=1&limit=12`; response includes `total` count
- [ ] Each item includes poster info (name, role) via Prisma `include`
- [ ] Default excludes past preferred dates and CANCELLED/COMPLETED items
- [ ] Returns 200 with empty array when no results match

## Files to Create/Modify
- `app/api/collaborations/route.ts` — GET handler with filter/search/pagination logic

## Implementation Notes
- Build the Prisma `where` clause dynamically: start with an empty object and conditionally add filters.
- For tab filtering, join through the `user` relation: `user: { role: 'UNIVERSITY' }` for requests.
- For search, use Prisma `contains` on title, description, and tags with `OR` logic. SQLite's `contains` is case-insensitive by default.
- Default filter: `preferredDateEnd: { gte: new Date() }` and `status: { notIn: ['CANCELLED', 'COMPLETED'] }` unless overridden.
- Pagination: use `skip: (page - 1) * limit` and `take: limit`. Return `{ data: [...], total, page, limit }`.
- Include `user: { select: { id: true, name: true, role: true } }` for poster info.

## Commit Message
`feat: add GET /api/collaborations with filters and pagination`
