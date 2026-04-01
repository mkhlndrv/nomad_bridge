# T.5.15: Build VoteButtons Shared Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** FRM-INTERACT-01, FRM-INTERACT-04

## Description
Create a `VoteButtons` client component that provides Reddit-style upvote/downvote functionality, shared between threads and replies. The component displays an up arrow, the net score, and a down arrow in a vertical or horizontal layout. Clicking upvote when not voted adds an upvote; clicking it again removes the vote. Clicking downvote when upvoted switches to downvote (and vice versa). The component uses optimistic updates for immediate UI feedback and calls the appropriate API endpoint (thread vote or reply vote). Prevent self-voting by comparing the current user ID with the post author ID.

## Acceptance Criteria
- [ ] Upvote arrow, net score number, and downvote arrow are displayed
- [ ] Clicking upvote when not voted: score increments, arrow highlights (e.g., orange)
- [ ] Clicking upvote when already upvoted: removes vote, score decrements
- [ ] Clicking downvote when upvoted: switches to downvote, score changes by -2
- [ ] Clicking downvote when already downvoted: removes vote, score increments
- [ ] Optimistic update: UI changes immediately, reverts on API error
- [ ] Self-voting is disabled: buttons are disabled or hidden when the post belongs to the current user
- [ ] Component accepts props: `targetId`, `targetType` ("THREAD" | "REPLY"), `initialScore`, `initialVote`, `authorId`
- [ ] Calls POST to appropriate endpoint based on targetType
- [ ] Accessible: arrow buttons have aria-labels

## Files to Create/Modify
- `app/forum/_components/VoteButtons.tsx` — New shared client component for voting

## Implementation Notes
- Use `"use client"` directive for interactive behavior.
- Use lucide-react `ChevronUp` and `ChevronDown` (or `ArrowBigUp`/`ArrowBigDown`) icons.
- For the API call, route to `/api/forum/${targetId}/vote` for threads and `/api/forum/replies/${targetId}/vote` for replies.
- Send `{ direction: "up" | "down" | "none" }` in the request body based on the toggle logic.
- Use `useState` for optimistic score and vote direction tracking.
- Wrap the API call in a try/catch; on error, revert the optimistic update and optionally show a toast.
- Highlight colors: upvote active = orange/amber, downvote active = blue/purple, neutral = gray.

## Commit Message
`feat: add VoteButtons component with optimistic updates and self-vote prevention`
