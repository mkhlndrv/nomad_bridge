# SF3: Replies & Discussion

**Feature:** [Community Discussion Board](overview.md)
**Prefix:** FRM-REPLY

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-REPLY-01 | Threaded replies displayed below the original post in chronological order | Must |
| FRM-REPLY-02 | Reply form: simple text area with basic formatting | Must |
| FRM-REPLY-03 | Show reply author name, timestamp, and trust score badge | Must |
| FRM-REPLY-04 | Users must be logged in to reply | Must |
| FRM-REPLY-05 | Very long threads (50+ replies): paginate replies, 20 per page | Should |

## Frontend Components

- `ThreadView` (Server) — Original post + paginated replies (20/page). Best Answer highlighted. Reply form at bottom
  - `ThreadPost` (Server) — Author avatar + name + trust badge, formatted content, net score, timestamp. Dimmed if score < -5
  - `Reply` (Server) — Author info, content, timestamp, net score. Green badge if Best Answer. Dimmed if score < -5
  - `ReplyForm` (Client) — Inline reply: RichTextEditor (5000 char limit). Rate limited (30s)

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum/[id]` | GET | Thread with paginated replies (20/page). Includes upvote/bookmark status |
| `app/api/forum/[id]/replies` | POST | Create reply. Rate limit: 30s. Update thread lastActivity. Notify thread author |
