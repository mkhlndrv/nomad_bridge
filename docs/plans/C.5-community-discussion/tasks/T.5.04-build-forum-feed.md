# T.5.04: Build ForumFeed Page

**Component:** C.5 — Community Discussion Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.5.03
**Spec References:** FRM-FEED-01, FRM-FEED-03

## Description
Create the main forum page at `app/forum/page.tsx` as a server component. The page should display a list of discussion threads with pinned threads appearing first, followed by remaining threads sorted by `lastActivity` descending. Include the ForumFilterBar at the top and ThreadCard components for each thread. Add pagination controls at the bottom (20 threads per page). For Sprint 1 this uses mock/seed data directly via Prisma queries; the API route will be added in Sprint 2.

## Acceptance Criteria
- [ ] Page is accessible at `/forum`
- [ ] Pinned threads render at the top of the list with visual distinction
- [ ] Non-pinned threads are sorted by `lastActivity` descending (most recent first)
- [ ] ForumFilterBar is rendered above the thread list
- [ ] Each thread renders as a ThreadCard component
- [ ] Pagination controls appear at the bottom (20 per page)
- [ ] Page title and header are clear ("Community Discussion" or similar)
- [ ] Layout is responsive on mobile and desktop
- [ ] Page reads `category` and `page` from URL search params for filtering/pagination

## Files to Create/Modify
- `app/forum/page.tsx` — New server page component for the forum feed
- `app/forum/layout.tsx` — Optional layout wrapper for forum section

## Implementation Notes
- Use Prisma `findMany` with `orderBy: [{ pinned: 'desc' }, { lastActivity: 'desc' }]` for correct sort order.
- Accept `searchParams` for `category` and `page` query parameters.
- For pagination, use `skip` and `take` in Prisma with `take: 20`.
- Include `_count: { replies: true }` in the Prisma query to get reply counts efficiently.
- The filter bar will be wired up in T.5.05; for now, just render it and pass the current category as a prop.

## Commit Message
`feat: add forum feed page with pinned-first sorting and pagination`
