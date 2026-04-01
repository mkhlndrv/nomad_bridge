# SF1: Forum Feed

**Feature:** [Community Discussion Board](overview.md)
**Prefix:** FRM-FEED
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FRM-FEED-01 | Show a list of discussion threads sorted by most recent activity (last reply) | Must |
| FRM-FEED-02 | Each thread card shows: title, category badge, author name, reply count, time of last activity | Must |
| FRM-FEED-03 | Pinned threads appear at the top (admin-managed) | Should |
| FRM-FEED-04 | Support filtering by category: General, Tips, Events, Housing, Coworking | Must |
| FRM-FEED-05 | Search across thread titles and content | Must |

## Frontend Components

- `ForumFeed` (Server) — Pinned threads first, then by recent activity. Filter bar + thread cards + pagination
  - `ForumFilterBar` (Client) — Category pills (General/Tips/Events/Housing/Coworking) + search input
  - `ThreadCard` (Server) — Title, category badge, author name + trust badge, reply count, last activity, pinned/bookmarked indicators

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/forum` | GET | List threads with filters (category, search). Sorted by last activity. Pinned first. Paginated |
