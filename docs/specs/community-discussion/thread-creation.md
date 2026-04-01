# SF2: Thread Creation

**Feature:** [Community Discussion Board](overview.md)
**Prefix:** FRM-CREATE

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-CREATE-01 | Simple form: title, category (dropdown), content (rich text with basic formatting: bold, italic, links, lists) | Must |
| FRM-CREATE-02 | Author info auto-populated from user profile | Must |
| FRM-CREATE-03 | Thread is immediately visible in the feed after posting | Must |
| FRM-CREATE-04 | Users must be logged in to create threads | Must |
| FRM-CREATE-05 | Thread titles limited to 120 characters | Must |
| FRM-CREATE-06 | Content limited to 5000 characters per post | Must |

## Frontend Components

- `CreateThreadForm` (Client) — Title (120 char limit), category dropdown, content (RichTextEditor, 5000 char limit). Rate limited (30s)

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum` | POST | Create thread. Validate title <= 120, content <= 5000. Rate limit: 30s |
| `app/api/forum/[id]` | PATCH | Edit thread (author only, within 15 min) |
| `app/api/forum/[id]` | DELETE | Soft-delete: set content to "[removed]" (admin or author) |
