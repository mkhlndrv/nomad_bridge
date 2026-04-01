# T.5.05: Build ForumFilterBar Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FRM-FEED-04, FRM-FEED-05

## Description
Create a `ForumFilterBar` client component that provides category filtering and search functionality for the forum feed. Display category pills for all five categories (General, Tips, Events, Housing, Coworking) plus an "All" option. Include a search input for searching thread titles and content. The component should update URL search params when a category is selected or a search term is entered, triggering a server-side re-render of the feed with the applied filters.

## Acceptance Criteria
- [ ] Category pills rendered for: All, General, Tips, Events, Housing, Coworking
- [ ] Active category pill is visually highlighted
- [ ] Clicking a category pill updates the URL `?category=` search param
- [ ] "All" pill clears the category filter
- [ ] Search input is present with a Search icon and placeholder text
- [ ] Search input updates URL `?search=` param with debounce (300ms)
- [ ] Filter bar is responsive: pills wrap on mobile, search input full-width on small screens
- [ ] Selecting a category resets pagination to page 1

## Files to Create/Modify
- `app/forum/_components/ForumFilterBar.tsx` — New client component with category pills and search input

## Implementation Notes
- Use `"use client"` directive since this component handles user interactions.
- Use `useRouter`, `useSearchParams`, and `usePathname` from `next/navigation` to manage URL state.
- Category pills should match the `ForumCategory` enum values from the schema.
- Debounce the search input to avoid excessive URL updates; use a `setTimeout`-based debounce or a lightweight hook.
- Use lucide-react `Search` icon for the search input.
- Style category pills with the same color coding as ThreadCard category badges for visual consistency.

## Commit Message
`feat: add ForumFilterBar with category pills and search input`
