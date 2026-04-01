# T.3.23: Wire Filter Bar Interactivity

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.3.07
**Spec References:** COL-BOARD-04, COL-BOARD-05, COL-BOARD-06

## Description
Wire the `CollaborationFilterBar` (built in T.3.05) to actually filter the collaboration list by updating URL search params and triggering a data refetch. When any filter dropdown changes or the search input is submitted, update the URL params (type, format, compensation, status, search) which causes the server component page to re-render with the filtered data from the GET API. Add debounced search (300ms delay) to avoid excessive API calls on keystroke. Ensure filters are composable — multiple filters can be active simultaneously. Add a "Clear Filters" button that resets all filters and search. Show active filter count on the filter bar.

## Acceptance Criteria
- [ ] Changing the type dropdown filters collaborations by type
- [ ] Changing the format dropdown filters by format
- [ ] Changing the compensation dropdown filters by compensation type
- [ ] Changing the status dropdown filters by status
- [ ] Search input filters across title, description, and tags
- [ ] Search is debounced (300ms) to avoid excessive requests
- [ ] Multiple filters composable (e.g., type=LECTURE + status=OPEN)
- [ ] "Clear Filters" button resets all filters and search
- [ ] Active filter count displayed (e.g., "Filters (3)")
- [ ] Filter state persisted in URL params (shareable, bookmarkable)
- [ ] Page re-renders with filtered data when params change
- [ ] Empty state shown when filters produce no results

## Files to Create/Modify
- `app/collaborations/components/CollaborationFilterBar.tsx` — Update with actual onChange handlers and debounced search
- `app/collaborations/page.tsx` — Update to read filter params and pass to API/data fetching

## Implementation Notes
- Use `useSearchParams()` and `useRouter().replace()` to update URL params without navigation.
- For debounced search, use a custom `useDebounce` hook or `setTimeout`/`clearTimeout` pattern:
  ```
  const [searchInput, setSearchInput] = useState(initialSearch)
  useEffect(() => {
    const timer = setTimeout(() => updateParam('search', searchInput), 300)
    return () => clearTimeout(timer)
  }, [searchInput])
  ```
- Build a helper function `updateSearchParams(key, value)` that preserves existing params while updating one.
- On the server page, read all filter params from `searchParams` and pass them to the data fetch.
- If fetching client-side with SWR/fetch, pass params as query string to GET /api/collaborations.
- "Clear Filters" removes all filter-related params but keeps the `tab` param.
- Active filter count: count non-empty filter params (excluding `tab` and `page`).

## Commit Message
`feat: wire CollaborationFilterBar with debounced search and composable filters`
