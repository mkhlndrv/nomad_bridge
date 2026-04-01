# T.5.20: Build MarkBestAnswerButton Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** FRM-INTERACT-02

## Description
Create a `MarkBestAnswerButton` client component that allows the thread author to mark a reply as the Best Answer. The button displays a CheckCircle icon and is only visible to the thread author. When clicked, it calls the best answer API endpoint and updates the UI to show the green "Best Answer" badge on the selected reply. If another reply was previously marked as Best Answer, the old one is unmarked. Only one Best Answer per thread is allowed.

## Acceptance Criteria
- [ ] CheckCircle icon button displayed on each reply (only visible to thread author)
- [ ] Clicking marks the reply as Best Answer with optimistic UI update
- [ ] If another reply was previously Best Answer, it is visually unmarked
- [ ] Calls POST `/api/forum/replies/[id]/best-answer` on click
- [ ] Button shows a tooltip or text "Mark as Best Answer" on hover
- [ ] When a reply is already Best Answer, clicking the button unmarks it
- [ ] Component accepts props: `replyId`, `threadAuthorId`, `isBestAnswer` (boolean)
- [ ] Hidden or disabled for users who are not the thread author
- [ ] Accessible: button has appropriate aria-label

## Files to Create/Modify
- `app/forum/_components/MarkBestAnswerButton.tsx` — New client component for best answer marking

## Implementation Notes
- Use `"use client"` directive.
- Use lucide-react `CheckCircle` icon; green when active, gray when inactive.
- Compare the current user's ID with `threadAuthorId` to determine visibility.
- Use `useState` for optimistic best answer state.
- After a successful API call, use `useRouter().refresh()` to update the full thread view (since other replies may need to lose their Best Answer badge).
- The toggling behavior (mark/unmark) is handled server-side — just POST and let the server respond with the new state.

## Commit Message
`feat: add MarkBestAnswerButton for thread authors`
