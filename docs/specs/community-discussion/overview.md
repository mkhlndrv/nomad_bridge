# Community Discussion Board

> Last updated: 2026-04-01

## Intent / Vibe

Give the NomadBridge community a casual, friendly space to share tips, ask questions, discuss events, and connect with each other. The forum should feel like a cozy coworking lounge conversation — low-pressure, helpful, and organized enough to find what you need without being buried in noise. Think Reddit-lite for Bangkok nomads: categorized threads, easy posting, and just enough structure to keep things useful.

## Sub-Features

- [SF1: Forum Feed](forum-feed.md) — Thread listing, category filtering, search, pinned threads
- [SF2: Thread Creation](thread-creation.md) — Create form, rich text, category selection, rate limiting
- [SF3: Replies & Discussion](replies.md) — Threaded replies, chronological, formatting
- [SF4: Thread Interactions](thread-interactions.md) — Upvotes, downvotes, bookmarks, best answer marking

## Edge Cases & Constraints

- Empty forum (first launch): show a friendly "Be the first to start a discussion!" prompt with suggested topics.
- Very long threads (50+ replies): paginate replies, 20 per page.
- Prevent rapid-fire posting: minimum 30 seconds between posts from the same user.
- Thread titles limited to 120 characters.
- Content limited to 5000 characters per post/reply.
- Deleted threads/replies should show "[removed]" placeholder, not disappear (preserves conversation context).
- Only the author can edit their post within 15 minutes of posting. The window is measured from `createdAt` (UTC). The server compares `Date.now()` against `createdAt.getTime() + 15 * 60 * 1000`. After expiry, the PATCH endpoint returns 403 `"Edit window has expired"`. The frontend hides the Edit button when the local clock exceeds `createdAt + 15 minutes`.
- Admin can delete or pin any thread.
- User can only upvote OR downvote a post (clicking one removes the other).
- Author cannot vote on their own posts.
- Downvotes do NOT affect the author's trust score — only post ranking/visibility.
- Collapsed posts (net score below -5) are still accessible via "Show collapsed" click.

## Acceptance Criteria

- Users can browse threads without logging in [FRM-FEED-01, FRM-FEED-04]
- Logged-in users can create threads, reply, upvote, downvote, and bookmark [FRM-CREATE-01, FRM-REPLY-02, FRM-INTERACT-01, FRM-INTERACT-04]
- Categories filter correctly [FRM-FEED-04]
- Search returns relevant threads [FRM-FEED-05]
- Thread sorting by recent activity works correctly [FRM-FEED-01]
- Reply count and last activity timestamps are accurate [FRM-FEED-02]
- The interface is responsive on mobile and desktop
- Content formatting (bold, italic, links) renders correctly [FRM-CREATE-01]

## Definition of Done

- Forum feed with category filtering and search works
- Thread creation and reply flow works end-to-end
- Upvotes, downvotes, bookmarks, and "Best Answer" marking functional
- Pagination for long threads
- Responsive design on all devices
- Basic spam prevention (rate limiting, character limits)
- Atomic commits used throughout implementation
