# Specification: Community Discussion Board

## Intent / Vibe

Give the NomadBridge community a casual, friendly space to share tips, ask questions, discuss events, and connect with each other. The forum should feel like a cozy coworking lounge conversation — low-pressure, helpful, and organized enough to find what you need without being buried in noise. Think Reddit-lite for Bangkok nomads: categorized threads, easy posting, and just enough structure to keep things useful.

## Core Requirements

### Forum Feed
- Show a list of discussion threads sorted by most recent activity (last reply).
- Each thread card shows: title, category badge, author name, reply count, time of last activity.
- Pinned threads appear at the top (admin-managed).
- Support filtering by category: General, Tips, Events, Housing, Coworking.
- Search across thread titles and content.

### Thread Categories
- **General** — anything that doesn't fit elsewhere.
- **Tips** — practical advice for living and working in Bangkok.
- **Events** — informal discussion about upcoming or past events (links to event pages encouraged).
- **Housing** — accommodation recommendations, roommate searches, area guides.
- **Coworking** — reviews of coworking spaces, cafe recommendations, productivity tips.

### Creating a Thread
- Simple form: title, category (dropdown), content (rich text with basic formatting: bold, italic, links, lists).
- Author info auto-populated from user profile.
- Thread is immediately visible in the feed after posting.
- Users must be logged in to create threads.

### Replying to Threads
- Threaded replies displayed below the original post in chronological order.
- Reply form: simple text area with basic formatting.
- Show reply author name, timestamp, and trust score badge.
- Users must be logged in to reply.

### Thread Interactions
- Upvote threads and replies (simple count, no downvotes — keep it positive).
- Author of a thread can mark one reply as "Best Answer" (highlighted with a badge).
- Users can bookmark threads for quick access later.

## Edge Cases & Constraints
- Empty forum (first launch): show a friendly "Be the first to start a discussion!" prompt with suggested topics.
- Very long threads (50+ replies): paginate replies, 20 per page.
- Prevent rapid-fire posting: minimum 30 seconds between posts from the same user.
- Thread titles limited to 120 characters.
- Content limited to 5000 characters per post/reply.
- Deleted threads/replies should show "[removed]" placeholder, not disappear (preserves conversation context).
- Only the author can edit their post (within 15 minutes of posting).
- Admin can delete or pin any thread.

## Acceptance Criteria
- Users can browse threads without logging in.
- Logged-in users can create threads, reply, upvote, and bookmark.
- Categories filter correctly.
- Search returns relevant threads.
- Thread sorting by recent activity works correctly.
- Reply count and last activity timestamps are accurate.
- The interface is responsive on mobile and desktop.
- Content formatting (bold, italic, links) renders correctly.

## Definition of Done
- Forum feed with category filtering and search works
- Thread creation and reply flow works end-to-end
- Upvotes, bookmarks, and "Best Answer" marking functional
- Pagination for long threads
- Responsive design on all devices
- Basic spam prevention (rate limiting, character limits)
- Atomic commits used throughout implementation
