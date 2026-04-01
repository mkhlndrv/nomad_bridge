# T.1.07: GET /api/events — List with Filters

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 30m
**Dependencies:** T.1.01
**Spec References:** EVT-FEED-01, EVT-FEED-03, EVT-FEED-04, EVT-FEED-05

## Description
Build the GET `/api/events` API route that returns a paginated, filterable list of published events. The endpoint accepts query parameters for filtering by university, category, date range (from/to), and keyword search (across title, description, and tags). Results are sorted by date ascending (upcoming first) and paginated with cursor-based or offset pagination. Only events with status PUBLISHED are returned. The response includes total count for UI pagination controls. Each event in the list includes the creator's name and university for display.

## Acceptance Criteria
- [ ] GET `/api/events` returns a JSON array of events sorted by date ascending
- [ ] Supports query params: `university` (string), `category` (EventCategory), `from` (ISO date), `to` (ISO date), `search` (string), `page` (number, default 1), `limit` (number, default 12)
- [ ] `search` param filters across title, description, and tags using Prisma `contains` (case-insensitive via `mode: 'insensitive'`)
- [ ] Only returns events with status PUBLISHED (excludes DRAFT and CANCELLED)
- [ ] Response shape: `{ events: Event[], total: number, page: number, totalPages: number }`
- [ ] Each event includes `creator: { name, id }` via Prisma `include`
- [ ] Returns 200 with empty array if no events match (not 404)
- [ ] Invalid category or date params return 400 with descriptive error message
- [ ] Handles pagination correctly: skip = (page - 1) * limit

## Files to Create/Modify
- `app/api/events/route.ts` — GET handler for event list

## Implementation Notes
- Build the Prisma `where` clause dynamically: start with `{ status: 'PUBLISHED' }` and conditionally add filters.
- For date range: `date: { gte: new Date(from), lte: new Date(to) }`.
- For search: use `OR` with `contains` on title, description, and tags: `{ OR: [{ title: { contains: search } }, { description: { contains: search } }, { tags: { contains: search } }] }`.
- SQLite does not support `mode: 'insensitive'` in Prisma — use `.toLowerCase()` on the search term and store/search accordingly, or accept case-sensitive search for now with a TODO.
- Use `prisma.event.count()` with the same `where` clause for total count.
- Include `creator: { select: { id: true, name: true } }` in the Prisma query.
- Wrap in try/catch and return 500 for unexpected errors.

## Commit Message
`feat: add GET /api/events with filtering and pagination`
