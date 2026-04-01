# T.1.05: Build EventFeed Page Layout

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.1.03, T.1.04
**Spec References:** EVT-FEED-01, EVT-FEED-05

## Description
Build the main `/events` page as a server component that renders the event feed layout. For the M1 mockup milestone, this page imports seed data directly from Prisma (server-side query) and renders a responsive grid of `EventCard` components. The page includes a header section with the page title ("Discover Events") and a slot for the EventFilterBar (rendered as a placeholder until T.1.06). The card grid uses CSS Grid: single column on mobile, 2 columns on tablet, 3 columns on desktop. Add the route to the app directory following Next.js App Router conventions.

## Acceptance Criteria
- [ ] Page is accessible at `/events`
- [ ] Page fetches events from Prisma directly (server component, no API call needed for M1)
- [ ] Events are sorted by date ascending (nearest upcoming first)
- [ ] Renders a responsive grid: 1 column on mobile, 2 on `md:`, 3 on `lg:`
- [ ] Each event renders as an `EventCard` component with all required props
- [ ] Page has a header with title "Discover Events" and subtitle text
- [ ] Includes a placeholder area for the EventFilterBar
- [ ] Page handles the case of zero events gracefully (empty state message)
- [ ] Tags string is passed through to EventCard as-is (parsing happens in EventCard)

## Files to Create/Modify
- `app/events/page.tsx` — Main event feed page (server component)
- `app/events/layout.tsx` — Optional: layout wrapper for events section with consistent padding

## Implementation Notes
- Use `prisma.event.findMany({ orderBy: { date: 'asc' }, where: { date: { gte: new Date() } } })` to fetch upcoming events.
- Import prisma client from the shared instance (typically `app/lib/prisma.ts` or `lib/prisma.ts`).
- If no shared Prisma client exists yet, create one using the singleton pattern to avoid multiple instances in dev.
- Grid classes: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- For M1, hardcode a simple empty state: "No upcoming events. Check back soon!"
- Consider adding `export const dynamic = 'force-dynamic'` to prevent stale data in development.

## Commit Message
`feat: build event feed page with responsive card grid`
