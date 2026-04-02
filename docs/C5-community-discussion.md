# C.5 — Community Discussion Board

## Overview
A forum-style discussion board where nomads can post threads, reply, vote, bookmark, and mark best answers. Supports category filtering, search, and pagination.

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/forum` | Page | Forum feed with filtering, search, pagination |
| `/forum/new` | Page | Create new thread form |
| `/forum/[id]` | Page | Thread detail with replies |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/forum` | List threads (filter by category, search, paginate) |
| POST | `/api/forum` | Create thread (auth, rate-limited 30s) |
| GET | `/api/forum/[id]` | Thread detail with paginated replies, user vote/bookmark status |
| POST | `/api/forum/[id]/replies` | Create reply (auth, rate-limited 30s) |
| POST | `/api/forum/[id]/vote` | Toggle upvote/downvote on thread |
| POST | `/api/forum/[id]/bookmark` | Toggle bookmark on thread |
| POST | `/api/forum/replies/[id]/vote` | Toggle upvote/downvote on reply |
| POST | `/api/forum/replies/[id]/best-answer` | Mark/unmark best answer (thread author only) |

## Components

- **ThreadCard** — Displays thread in feed with score, category badge, reply count, pinned indicator
- **ForumFilterBar** — Category pills + debounced search input (client component)
- **ThreadPost** — Full thread display with author info, trust badge, collapsed low-score posts
- **ReplyItem** — Reply with best answer highlight, collapsed low-score support
- **ReplyForm** — Reply textarea with character counter
- **CreateThreadForm** — Thread creation with title, category, content, validation
- **VoteButtons** — Shared upvote/downvote component with optimistic updates

## Models

- **ForumPost** — Thread with title, content, category, netScore, pinned, lastActivity
- **ForumReply** — Reply with content, netScore, isBestAnswer
- **ForumVote** — Polymorphic vote (THREAD/REPLY, UP/DOWN)
- **ForumBookmark** — User bookmark on thread

## Features
- Category filtering (General, Tips, Events, Housing, Coworking)
- Debounced search across title and content
- Rate limiting: 30s between posts/replies per user
- Self-vote prevention
- Low-score post dimming (netScore < -5)
- Best answer marking (thread author only, one per thread)
- Pagination (20 items per page)
