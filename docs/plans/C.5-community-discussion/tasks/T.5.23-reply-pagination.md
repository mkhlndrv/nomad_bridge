# T.5.23: Reply Pagination for Long Threads

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.5.08
**Spec References:** FRM-REPLY-05

## Description
Add pagination controls for replies in threads that have more than 20 replies. The thread detail page should display 20 replies per page with page navigation controls (Previous/Next and page numbers) at the bottom of the reply list. The current page is tracked via URL search params (`?page=N`). The API endpoint (GET /api/forum/[id]) already supports reply pagination; this task focuses on the client-side pagination UI and wiring it to the existing API.

## Acceptance Criteria
- [ ] Replies are paginated at 20 per page
- [ ] Pagination controls appear below the reply list when total replies exceed 20
- [ ] "Previous" and "Next" buttons for page navigation
- [ ] Page numbers displayed for quick navigation (with ellipsis for many pages)
- [ ] Current page is highlighted in the pagination controls
- [ ] Clicking a page updates the URL `?page=N` search param
- [ ] Page 1 is the default when no page param is present
- [ ] Pagination controls are hidden when total replies are 20 or fewer
- [ ] Scrolls to top of reply section when changing pages
- [ ] Pagination info shown: "Showing 21-40 of 53 replies" or similar

## Files to Create/Modify
- `app/forum/_components/ReplyPagination.tsx` — New client component for reply pagination controls
- `app/forum/[id]/page.tsx` — Wire pagination controls to the reply section

## Implementation Notes
- Reuse or adapt any existing pagination component from the codebase (e.g., from the events or forum feed page).
- Use `useRouter` and `useSearchParams` to manage the page param in the URL.
- The GET /api/forum/[id] endpoint (T.5.08) already accepts `?page=` for reply pagination and returns `totalReplies`, `page`, `pageSize`, `totalPages`.
- For the page number display, show at most 5 page numbers with ellipsis (e.g., 1 2 3 ... 10).
- Use `window.scrollTo` or `scrollIntoView` to scroll to the reply section header when changing pages.
- Consider adding a "Jump to last page" shortcut for very long threads.

## Commit Message
`feat: add reply pagination controls for long threads`
