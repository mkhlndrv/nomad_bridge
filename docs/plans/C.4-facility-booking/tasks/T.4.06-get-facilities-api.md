# T.4.06: GET /api/facilities — List with Filters

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.01
**Spec References:** FAC-DIR-01, FAC-DIR-03, FAC-DIR-04

## Description
Create a GET API route at `/api/facilities` that returns a paginated list of facilities with support for filtering and search. The endpoint should accept query parameters for type (FacilityType), university (string), priceMax (number), capacityMin (number), search (text search on name and university), page (default 1), and limit (default 12). Return facilities with their manager name included. Only return available facilities (where `available` is true). Sort by university name, then facility name.

## Acceptance Criteria
- [ ] GET `/api/facilities` returns paginated facility list
- [ ] `type` query param filters by FacilityType enum value
- [ ] `university` query param filters by exact university match
- [ ] `priceMax` filters facilities with pricePerHour <= value (priceMax=0 returns only free)
- [ ] `capacityMin` filters facilities with capacity >= value
- [ ] `search` performs case-insensitive search on name and university
- [ ] Only facilities with `available: true` are returned
- [ ] Response includes `data` (facility array), `total`, `page`, `totalPages`
- [ ] Each facility includes `manager` relation (id, name) when assigned
- [ ] Default pagination: page=1, limit=12
- [ ] Returns 200 with empty array when no results match

## Files to Create/Modify
- `app/api/facilities/route.ts` — New GET handler

## Implementation Notes
- Use Prisma `where` clause with conditional filters: only add filter if query param is present.
- For search, use `contains` with `mode: 'insensitive'` on name and university (use OR).
- Note: SQLite `mode: 'insensitive'` may not be supported — use Prisma raw query or `.toLowerCase()` workaround.
- Include manager with `include: { manager: { select: { id: true, name: true } } }`.
- Use `skip` and `take` for pagination: `skip: (page - 1) * limit, take: limit`.
- Return `totalPages: Math.ceil(total / limit)`.

## Commit Message
`feat: add GET /api/facilities with filters and pagination`
