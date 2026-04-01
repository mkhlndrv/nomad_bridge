# T.5.13: Build ReplyForm Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FRM-REPLY-02, FRM-REPLY-04

## Description
Create a `ReplyForm` client component that appears at the bottom of the thread detail page for authenticated users. The form contains an inline text area with basic formatting hints, a 5000-character limit with a live character counter, and a submit button. Display a rate limit indicator showing the remaining cooldown time if the user posted recently (30-second window). On successful submission, POST to `/api/forum/[id]/replies`, clear the form, and append the new reply to the thread view.

## Acceptance Criteria
- [ ] Text area for reply content with placeholder text (e.g., "Share your thoughts...")
- [ ] Live character counter showing "X/5000" that turns red near the limit
- [ ] Submit button labeled "Post Reply" or similar
- [ ] Submit button is disabled while submitting or during rate limit cooldown
- [ ] Rate limit countdown timer displayed when within the 30-second window
- [ ] On success, form clears and the new reply appears in the reply list (via router refresh or optimistic update)
- [ ] Validation errors from the API are shown inline
- [ ] Form is only shown to authenticated users; unauthenticated users see a "Log in to reply" message
- [ ] Form is responsive and fits well on mobile screens

## Files to Create/Modify
- `app/forum/_components/ReplyForm.tsx` — New client component for posting replies

## Implementation Notes
- Use `"use client"` directive for interactive form handling.
- Accept `threadId` as a prop to construct the POST URL: `/api/forum/${threadId}/replies`.
- Use `useRouter().refresh()` after successful submission to re-fetch the thread data from the server.
- For the rate limit countdown, store the last post timestamp in state and use `useEffect` with `setInterval` to count down.
- Keep formatting simple — a plain `<textarea>` is sufficient. Basic formatting (bold, italic) can be enhanced in a later iteration.
- Consider auto-focusing the text area when the user scrolls to the reply form.

## Commit Message
`feat: add ReplyForm component with character limit and rate limiting`
