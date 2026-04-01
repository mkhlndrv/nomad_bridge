# T.5.18: Build BookmarkButton Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** FRM-INTERACT-03

## Description
Create a `BookmarkButton` client component that allows authenticated users to toggle bookmarking a thread. The button displays a bookmark icon that is filled/highlighted when the thread is bookmarked and outlined when not. Use optimistic updates for immediate visual feedback when toggling. On click, POST to `/api/forum/[id]/bookmark` to toggle the bookmark server-side. The button should be placed on the ThreadCard in the feed and on the ThreadPost in the detail view.

## Acceptance Criteria
- [ ] Bookmark icon displayed (outlined when not bookmarked, filled when bookmarked)
- [ ] Clicking toggles the bookmark state with optimistic UI update
- [ ] Calls POST `/api/forum/[id]/bookmark` on toggle
- [ ] Reverts optimistic update if API call fails
- [ ] Button is only functional for authenticated users
- [ ] Component accepts props: `threadId`, `initialBookmarked` (boolean)
- [ ] Accessible: button has aria-label indicating action ("Bookmark thread" / "Remove bookmark")
- [ ] Subtle animation or transition on toggle (e.g., scale or color transition)

## Files to Create/Modify
- `app/forum/_components/BookmarkButton.tsx` — New client component for bookmark toggle

## Implementation Notes
- Use `"use client"` directive.
- Use lucide-react `Bookmark` icon; use the `fill` prop or swap between `Bookmark` (outline) and a filled variant.
- Use `useState` for optimistic bookmark state.
- The API endpoint (T.5.19) will handle the toggle logic server-side, so just POST without a body — the server determines whether to add or remove.
- Add a small CSS transition on the icon color change for polish.
- This component can be reused wherever a thread reference appears (feed cards, thread detail view).

## Commit Message
`feat: add BookmarkButton component with optimistic toggle`
