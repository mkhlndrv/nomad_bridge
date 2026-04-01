# T.5.06: GET /api/forum — List Threads API

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.5.01
**Spec References:** FRM-FEED-01, FRM-FEED-02, FRM-FEED-03, FRM-FEED-04, FRM-FEED-05

## Description
Create the GET endpoint at `app/api/forum/route.ts` that returns a paginated list of forum threads. Threads should be sorted by `lastActivity` descending with pinned threads always appearing first. Support filtering by category via `?category=` query param and full-text search via `?search=` param (matching against title and content using Prisma `contains`). Return 20 threads per page with `?page=` param support. Each thread in the response should include the author (name, trustScore), reply count, and bookmark/vote status if a user is authenticated.

## Acceptance Criteria
- [ ] GET `/api/forum` returns a JSON response with threads array and pagination metadata
- [ ] Threads sorted by `pinned` desc, then `lastActivity` desc
- [ ] `?category=TIPS` filters to only threads with that category
- [ ] `?search=coworking` filters to threads where title or content contains the search term (case-insensitive)
- [ ] `?page=2` returns the second page of 20 results with correct `skip`
- [ ] Each thread includes: id, title, content, category, pinned, lastActivity, createdAt, netScore, author (id, name, trustScore), replyCount
- [ ] Response includes pagination info: `totalCount`, `page`, `pageSize`, `totalPages`
- [ ] Deleted threads (`isDeleted: true`) are excluded from results
- [ ] Category and search filters can be combined

## Files to Create/Modify
- `app/api/forum/route.ts` — New GET handler for listing forum threads

## Implementation Notes
- Use Prisma `findMany` with `where`, `orderBy`, `skip`, `take`, and `include`.
- For search, use `OR: [{ title: { contains: search } }, { content: { contains: search } }]`. SQLite `contains` is case-insensitive by default.
- Calculate `totalCount` with a separate `count` query using the same `where` clause.
- Include `_count: { select: { replies: true } }` for reply counts.
- Include `user: { select: { id: true, name: true, trustScore: true } }` for author info.
- Parse page number with `parseInt` and default to 1 if missing or invalid.

## Commit Message
`feat: add GET /api/forum endpoint with filtering and pagination`
