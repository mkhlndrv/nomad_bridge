# T.5.11: Build ThreadPost Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FRM-FEED-02, FRM-REPLY-03, FRM-INTERACT-04, FRM-INTERACT-05

## Description
Create a `ThreadPost` server component that renders the original post in a thread detail view. Display the author's avatar placeholder (initials), name, and trust score badge. Show the formatted post content, category badge, net score, and creation timestamp in Asia/Bangkok timezone. If the post's net score is below -5, render the content in a dimmed/collapsed state with a "Show post" toggle. Include a slot area for VoteButtons (to be wired up in Sprint 3).

## Acceptance Criteria
- [ ] Author name displayed with initials avatar and TrustScoreBadge
- [ ] Post content rendered with proper formatting (paragraphs, line breaks)
- [ ] Category badge shown with color coding matching the feed view
- [ ] Net score displayed prominently
- [ ] Creation timestamp shown in Asia/Bangkok timezone
- [ ] Posts with net score < -5 are dimmed with reduced opacity and collapsed content
- [ ] Collapsed posts show a "Show post" clickable text to expand
- [ ] Component has a designated area/slot for VoteButtons component
- [ ] Responsive layout: clean reading experience on mobile and desktop

## Files to Create/Modify
- `app/forum/_components/ThreadPost.tsx` — New server component for original post display

## Implementation Notes
- Reuse `TrustScoreBadge` from C.2 for trust score display.
- For the avatar, use a colored circle with the user's initials (first letter of first and last name).
- Use a `<details>` or client wrapper for the collapse/expand behavior on dimmed posts.
- Format content with `whitespace-pre-wrap` to preserve line breaks, or use a simple markdown renderer if available.
- The VoteButtons component will be connected in T.5.15; for now include a placeholder `div` with the net score.
- Use the same relative time formatting helper as ThreadCard for consistency.

## Commit Message
`feat: add ThreadPost component with author info and dimmed-post support`
