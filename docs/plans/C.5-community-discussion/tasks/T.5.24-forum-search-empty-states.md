# T.5.24: Forum Search and Empty States

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.5.06
**Spec References:** FRM-FEED-05

## Description
Implement full-text search across forum thread titles and content, and add polished empty state UI for various scenarios. The search should work via the existing `?search=` URL param, filtering threads whose title or content contains the search term. Add three empty state designs: (1) empty forum with no threads at all — show a friendly "Be the first to start a discussion!" prompt with suggested topics and a "Create Thread" CTA, (2) no results for the current search — show "No threads found for [query]" with suggestions to try different keywords, and (3) no results for the selected category — show "No threads in [category] yet" with a prompt to create one.

## Acceptance Criteria
- [ ] Search input in ForumFilterBar filters threads by title and content
- [ ] Search is case-insensitive
- [ ] Empty forum state: "Be the first to start a discussion!" message with suggested topics
- [ ] Empty forum state includes a "Start a Discussion" button linking to `/forum/new`
- [ ] Suggested topics shown: "Best coworking spaces", "Visa tips", "Upcoming events", "Housing recommendations"
- [ ] No search results state: "No threads found for [query]" with a prompt to try different keywords
- [ ] No category results state: "No threads in [category] yet" with a "Create Thread" CTA
- [ ] Empty state illustrations or icons for visual appeal (use lucide-react icons)
- [ ] All empty states are responsive and well-centered on the page

## Files to Create/Modify
- `app/forum/_components/ForumEmptyState.tsx` — New component for empty state displays
- `app/forum/page.tsx` — Integrate empty states based on thread count and filter context
- `app/forum/_components/ForumFilterBar.tsx` — Ensure search param is properly passed through

## Implementation Notes
- The GET /api/forum endpoint (T.5.06) already supports `?search=` filtering with Prisma `contains`.
- Create a single `ForumEmptyState` component that accepts a `variant` prop: "empty" | "no-results" | "no-category-results", plus optional `query` and `category` props for contextual messaging.
- Use lucide-react icons for visual flair: `MessageSquarePlus` for empty forum, `SearchX` for no results.
- Suggested topics in the empty state can be rendered as clickable tags that pre-fill the create thread form with a category.
- Ensure the empty state properly accounts for combined filters (e.g., category + search with no results).
- Test with an empty database and with filters that return no matches.

## Commit Message
`feat: add forum search integration and empty state designs`
