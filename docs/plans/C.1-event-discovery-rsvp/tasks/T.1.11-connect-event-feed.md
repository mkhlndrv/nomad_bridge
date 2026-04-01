# T.1.11: Connect EventFeed to API

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.1.07
**Spec References:** EVT-FEED-01, EVT-FEED-05

## Description
Refactor the `/events` page to fetch data from the GET `/api/events` API route instead of directly querying Prisma. Since this is a server component, use `fetch()` with the internal API URL. Pass filter parameters from URL search params through to the API. Add a loading state using Next.js `loading.tsx` convention with a skeleton grid that matches the EventCard layout. This establishes the pattern for all server-to-API communication in the app.

## Acceptance Criteria
- [ ] EventFeed page fetches from `/api/events` instead of direct Prisma queries
- [ ] URL search params (university, category, search, from, to, page) are forwarded to the API
- [ ] Loading state renders a skeleton grid matching the card layout (3 skeleton cards)
- [ ] Error state renders a user-friendly message if the API call fails
- [ ] Pagination info from the API response is available (total, page, totalPages) for future pagination UI
- [ ] Page re-fetches when URL search params change (naturally handled by server component re-render)
- [ ] The fetch uses `{ cache: 'no-store' }` to always get fresh data in development

## Files to Create/Modify
- `app/events/page.tsx` — Refactor to fetch from API instead of direct Prisma
- `app/events/loading.tsx` — Loading skeleton page with card grid placeholders

## Implementation Notes
- In a server component, use `fetch()` with the full URL: `fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events?${params}`)`.
- Alternatively, since this is a server component, it CAN call Prisma directly (which is simpler and avoids the API round-trip). The plan says "connect to API" for separation of concerns, but if the team prefers direct Prisma, that's valid too. Default to the API approach for consistency.
- For the skeleton loader, create 6 animated placeholder cards using Tailwind `animate-pulse` with gray bars matching the card's title, date, description, and capacity bar areas.
- Access search params via the `searchParams` prop of the page component.
- Type the API response: `{ events: EventCardProps[], total: number, page: number, totalPages: number }`.

## Commit Message
`feat: connect event feed to API with loading skeleton`
