# T.5.14: Build Reply Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FRM-REPLY-01, FRM-REPLY-03, FRM-INTERACT-02, FRM-INTERACT-04, FRM-INTERACT-05

## Description
Create a `Reply` server component that renders a single reply within a thread. Display the author's name with their trust score badge, the reply content with proper formatting, the creation timestamp in Asia/Bangkok timezone, and the net score. If the reply is marked as Best Answer, show a green "Best Answer" badge with a CheckCircle icon. If the reply's net score is below -5, dim the content and collapse it with a "Show reply" toggle. Include a slot area for VoteButtons (to be wired up separately).

## Acceptance Criteria
- [ ] Author name displayed with TrustScoreBadge
- [ ] Reply content rendered with proper formatting (paragraphs, line breaks)
- [ ] Creation timestamp shown in Asia/Bangkok timezone
- [ ] Net score displayed prominently
- [ ] Best Answer replies show a green "Best Answer" badge with CheckCircle icon
- [ ] Replies with net score < -5 are dimmed with reduced opacity and collapsed content
- [ ] Collapsed replies show a "Show reply" clickable text to expand
- [ ] Deleted replies show "[removed]" as content with no author info
- [ ] Component has a designated area/slot for VoteButtons and MarkBestAnswerButton
- [ ] Visual separation between replies (border or spacing)

## Files to Create/Modify
- `app/forum/_components/Reply.tsx` — New server component for individual reply display

## Implementation Notes
- Reuse `TrustScoreBadge` from C.2.
- Use lucide-react `CheckCircle` icon in green for the Best Answer badge.
- The collapse/expand behavior for dimmed posts can use a client wrapper or `<details>` element.
- Deleted replies (`isDeleted: true`) should show "[removed]" with a muted style, similar to Reddit's deleted comments.
- Add subtle left-border or top-border styling to visually separate replies.
- The VoteButtons and MarkBestAnswerButton will be integrated in T.5.15 and T.5.20 respectively.

## Commit Message
`feat: add Reply component with best answer badge and dimmed-post support`
