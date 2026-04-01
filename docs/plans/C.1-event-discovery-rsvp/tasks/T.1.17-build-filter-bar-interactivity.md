# T.1.17: Build EventFilterBar Interactivity

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.1.07
**Spec References:** EVT-FEED-03, EVT-FEED-04

## Description
Add full interactivity to the EventFilterBar component built in T.1.06. Each filter control (university dropdown, category pills, date range, search input) now updates the URL search params using Next.js `useRouter` and `useSearchParams`. When filters change, the URL updates which triggers a server re-render of the EventFeed page, fetching fresh filtered results from the API. Implement debounced search input (300ms delay) to avoid excessive API calls on every keystroke. Add a "Clear Filters" button that resets all params.

## Acceptance Criteria
- [ ] University dropdown changes update `?university=` URL param
- [ ] Category pill clicks toggle `?category=` URL param (click active pill to deselect)
- [ ] Date range inputs update `?from=` and `?to=` URL params
- [ ] Search input updates `?search=` URL param with 300ms debounce
- [ ] All filter changes preserve existing params (don't clear other filters)
- [ ] "Clear Filters" button removes all filter params and resets UI state
- [ ] Active filters are visually indicated (filled pills, values in inputs)
- [ ] Filters are initialized from current URL params on mount (supports sharing filtered URLs)
- [ ] Browser back/forward navigation restores filter state correctly
- [ ] Page number resets to 1 when any filter changes

## Files to Create/Modify
- `app/components/events/EventFilterBar.tsx` — Add state management and URL param updates
- `app/lib/hooks/useDebounce.ts` — Custom debounce hook for search input

## Implementation Notes
- Use `useSearchParams()` to read current params and `useRouter().push()` to update them.
- Build the new URL with `URLSearchParams`: `const params = new URLSearchParams(searchParams.toString()); params.set('university', value); router.push(`/events?${params.toString()}`);`.
- For the debounce hook: `useDebounce(value, delay)` returns the debounced value. Use `useEffect` to update the URL when the debounced search value changes.
- Initialize local state from URL params: `const [university, setUniversity] = useState(searchParams.get('university') || '')`.
- Use `router.push()` instead of `router.replace()` so that filter changes create history entries for back navigation.
- Category pills: a second click on an active category should clear the category filter.
- Clear Filters: `router.push('/events')` with no params.

## Commit Message
`feat: add interactive filtering with URL params and debounced search`
