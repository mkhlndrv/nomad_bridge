# SF4: Thread Interactions

**Feature:** [Community Discussion Board](overview.md)
**Prefix:** FRM-INTERACT
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-INTERACT-01 | Upvote and downvote threads and replies (Reddit-style net score voting) | Must |
| FRM-INTERACT-02 | Author of a thread can mark one reply as "Best Answer" (highlighted with a badge) | Should |
| FRM-INTERACT-03 | Users can bookmark threads for quick access later | Should |
| FRM-INTERACT-04 | Display net score (upvotes minus downvotes) on threads and replies | Must |
| FRM-INTERACT-05 | Posts with net score below -5 are visually dimmed/collapsed but still expandable | Should |

## Frontend Components

- `VoteButtons` (Client) — Up arrow + net score + down arrow. User can upvote OR downvote (clicking one removes the other). Optimistic update
- `BookmarkButton` (Client) — Toggle bookmark. Bookmark icon
- `MarkBestAnswerButton` (Client) — Thread author only. CheckCircle icon. One best answer per thread

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum/[id]/vote` | POST | Vote on thread: body `{ direction: "up" | "down" | "none" }`. Tracks upvotes and downvotes separately. No trust score impact from downvotes |
| `app/api/forum/[id]/bookmark` | POST | Toggle bookmark |
| `app/api/forum/replies/[id]/vote` | POST | Vote on reply: same direction body. No trust score impact from downvotes |
| `app/api/forum/replies/[id]/best-answer` | POST | Mark as best answer (thread author only) |
