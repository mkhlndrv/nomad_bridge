# T.5.22: Implement Collapsed Posts for Low-Score Content

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.5.15
**Spec References:** FRM-INTERACT-05

## Description
Implement the collapse/expand behavior for posts (threads and replies) whose net score falls below -5. These posts should be visually dimmed (reduced opacity) and their content collapsed by default, showing only a brief indicator like "This post has been hidden due to low score" with a "Show post" button to expand. This applies to both the ThreadPost component and the Reply component. The collapse state should be managed client-side so users can expand without a server round-trip.

## Acceptance Criteria
- [ ] Threads with net score < -5 are dimmed and collapsed in the ThreadPost component
- [ ] Replies with net score < -5 are dimmed and collapsed in the Reply component
- [ ] Collapsed content is replaced with a message: "This post has been hidden due to low score"
- [ ] A "Show post" button/link expands the collapsed content
- [ ] Expanded content remains dimmed (reduced opacity) but is fully readable
- [ ] Clicking "Hide post" collapses it again
- [ ] Author info (name, avatar) remains visible even when collapsed
- [ ] Net score and vote buttons remain visible and functional when collapsed
- [ ] Collapse state is per-session (does not persist across page reloads)
- [ ] Smooth transition animation when expanding/collapsing

## Files to Create/Modify
- `app/forum/_components/CollapsibleContent.tsx` — New client component wrapping content with collapse logic
- `app/forum/_components/ThreadPost.tsx` — Integrate CollapsibleContent for low-score threads
- `app/forum/_components/Reply.tsx` — Integrate CollapsibleContent for low-score replies

## Implementation Notes
- Create a reusable `CollapsibleContent` client component that accepts `netScore`, `children` (the content), and a `threshold` prop (default -5).
- Use `useState` to track expanded/collapsed state, defaulting to collapsed when `netScore < threshold`.
- Apply Tailwind classes: `opacity-50` for dimmed state, `max-h-0 overflow-hidden` for collapsed, with `transition-all` for smooth animation.
- The component should be a thin wrapper that can be placed around any content block.
- Keep the component generic so it could potentially be reused in other contexts beyond the forum.

## Commit Message
`feat: implement collapsible posts for content with net score below -5`
