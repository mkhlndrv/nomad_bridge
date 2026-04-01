# Specification: Community Discussion Board

## Intent / Vibe

Give the NomadBridge community a casual, friendly space to share tips, ask questions, discuss events, and connect with each other. The forum should feel like a cozy coworking lounge conversation — low-pressure, helpful, and organized enough to find what you need without being buried in noise. Think Reddit-lite for Bangkok nomads: categorized threads, easy posting, and just enough structure to keep things useful.

## Core Requirements

### SF1: Forum Feed

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-FEED-01 | Show a list of discussion threads sorted by most recent activity (last reply) | Must |
| FRM-FEED-02 | Each thread card shows: title, category badge, author name, reply count, time of last activity | Must |
| FRM-FEED-03 | Pinned threads appear at the top (admin-managed) | Should |
| FRM-FEED-04 | Support filtering by category: General, Tips, Events, Housing, Coworking | Must |
| FRM-FEED-05 | Search across thread titles and content | Must |

### SF2: Thread Creation

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-CREATE-01 | Simple form: title, category (dropdown), content (rich text with basic formatting: bold, italic, links, lists) | Must |
| FRM-CREATE-02 | Author info auto-populated from user profile | Must |
| FRM-CREATE-03 | Thread is immediately visible in the feed after posting | Must |
| FRM-CREATE-04 | Users must be logged in to create threads | Must |
| FRM-CREATE-05 | Thread titles limited to 120 characters | Must |
| FRM-CREATE-06 | Content limited to 5000 characters per post | Must |

### SF3: Replies & Discussion

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-REPLY-01 | Threaded replies displayed below the original post in chronological order | Must |
| FRM-REPLY-02 | Reply form: simple text area with basic formatting | Must |
| FRM-REPLY-03 | Show reply author name, timestamp, and trust score badge | Must |
| FRM-REPLY-04 | Users must be logged in to reply | Must |
| FRM-REPLY-05 | Very long threads (50+ replies): paginate replies, 20 per page | Should |

### SF4: Thread Interactions

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-INTERACT-01 | Upvote and downvote threads and replies (Reddit-style net score voting) | Must |
| FRM-INTERACT-02 | Author of a thread can mark one reply as "Best Answer" (highlighted with a badge) | Should |
| FRM-INTERACT-03 | Users can bookmark threads for quick access later | Should |
| FRM-INTERACT-04 | Display net score (upvotes minus downvotes) on threads and replies | Must |
| FRM-INTERACT-05 | Posts with net score below -5 are visually dimmed/collapsed but still expandable | Should |

## Component Breakdown

### SF1: Forum Feed

- `ForumFeed` (Server) — Pinned threads first, then by recent activity. Filter bar + thread cards + pagination
  - `ForumFilterBar` (Client) — Category pills (General/Tips/Events/Housing/Coworking) + search input
  - `ThreadCard` (Server) — Title, category badge, author name + trust badge, reply count, last activity, pinned/bookmarked indicators

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum` | GET | List threads with filters (category, search). Sorted by last activity. Pinned first. Paginated |

### SF2: Thread Creation

- `CreateThreadForm` (Client) — Title (120 char limit), category dropdown, content (RichTextEditor, 5000 char limit). Rate limited (30s)

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum` | POST | Create thread. Validate title <= 120, content <= 5000. Rate limit: 30s |
| `app/api/forum/[id]` | PATCH | Edit thread (author only, within 15 min) |
| `app/api/forum/[id]` | DELETE | Soft-delete: set content to "[removed]" (admin or author) |

### SF3: Replies & Discussion

- `ThreadView` (Server) — Original post + paginated replies (20/page). Best Answer highlighted. Reply form at bottom
  - `ThreadPost` (Server) — Author avatar + name + trust badge, formatted content, net score, timestamp. Dimmed if score < -5
  - `Reply` (Server) — Author info, content, timestamp, net score. Green badge if Best Answer. Dimmed if score < -5
  - `ReplyForm` (Client) — Inline reply: RichTextEditor (5000 char limit). Rate limited (30s)

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum/[id]` | GET | Thread with paginated replies (20/page). Includes upvote/bookmark status |
| `app/api/forum/[id]/replies` | POST | Create reply. Rate limit: 30s. Update thread lastActivity. Notify thread author |

### SF4: Thread Interactions

- `VoteButtons` (Client) — Up arrow + net score + down arrow. User can upvote OR downvote (clicking one removes the other). Optimistic update
- `BookmarkButton` (Client) — Toggle bookmark. Bookmark icon
- `MarkBestAnswerButton` (Client) — Thread author only. CheckCircle icon. One best answer per thread

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum/[id]/vote` | POST | Vote on thread: body `{ direction: "up" | "down" | "none" }`. Tracks upvotes and downvotes separately. No trust score impact from downvotes |
| `app/api/forum/[id]/bookmark` | POST | Toggle bookmark |
| `app/api/forum/replies/[id]/vote` | POST | Vote on reply: same direction body. No trust score impact from downvotes |
| `app/api/forum/replies/[id]/best-answer` | POST | Mark as best answer (thread author only) |

## Edge Cases & Constraints
- Empty forum (first launch): show a friendly "Be the first to start a discussion!" prompt with suggested topics.
- Very long threads (50+ replies): paginate replies, 20 per page.
- Prevent rapid-fire posting: minimum 30 seconds between posts from the same user.
- Thread titles limited to 120 characters.
- Content limited to 5000 characters per post/reply.
- Deleted threads/replies should show "[removed]" placeholder, not disappear (preserves conversation context).
- Only the author can edit their post (within 15 minutes of posting).
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
