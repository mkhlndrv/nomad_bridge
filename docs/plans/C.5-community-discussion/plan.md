# C.5: Community Discussion Board — Implementation Plan

**Spec:** `docs/specs/community-discussion-board-2026-03-31.md`
**Prefix:** FRM | **Sub-features:** 4 | **Requirements:** 21
**Dependencies:** C.2 (TrustScoreBadge)
**Sprints:** 4 | **Tasks:** 24

---

## Sprint 1 — Schema + Feed Mockup [M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.5.01](tasks/T.5.01-update-forum-schema.md) | Update Prisma schema for forum | 30m | — |
| [T.5.02](tasks/T.5.02-create-forum-seed-data.md) | Create forum seed data | 20m | T.5.01 |
| [T.5.03](tasks/T.5.03-build-thread-card.md) | Build ThreadCard mockup | 20m | — |
| [T.5.04](tasks/T.5.04-build-forum-feed.md) | Build ForumFeed page | 25m | T.5.03 |
| [T.5.05](tasks/T.5.05-build-forum-filter-bar.md) | Build ForumFilterBar mockup | 20m | — |

### M1 DOD
- [ ] ForumReply, ForumVote, ForumBookmark models in Prisma
- [ ] `/forum` page renders thread list sorted by lastActivity
- [ ] Pinned threads appear first
- [ ] Category badges (General/Tips/Events/Housing/Coworking)
- [ ] Responsive layout

---

## Sprint 2 — Thread Creation + Viewing [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.5.06](tasks/T.5.06-get-forum-list-api.md) | GET /api/forum — list threads | 25m | T.5.01 |
| [T.5.07](tasks/T.5.07-post-forum-create-api.md) | POST /api/forum — create thread | 25m | T.5.01 |
| [T.5.08](tasks/T.5.08-get-thread-detail-api.md) | GET /api/forum/[id] — thread + replies | 25m | T.5.06 |
| [T.5.09](tasks/T.5.09-build-create-thread-form.md) | Build CreateThreadForm | 25m | — |
| [T.5.10](tasks/T.5.10-build-thread-view.md) | Build ThreadView page | 25m | T.5.08 |
| [T.5.11](tasks/T.5.11-build-thread-post.md) | Build ThreadPost component | 20m | — |

### M2 DOD
- [ ] Thread list with category filtering and search
- [ ] Thread creation: title <=120, content <=5000, rate limit 30s
- [ ] Thread detail with paginated replies (20/page)
- [ ] Author info with trust badges

---

## Sprint 3 — Voting + Replies [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.5.12](tasks/T.5.12-post-reply-api.md) | POST /api/forum/[id]/replies — create reply | 25m | T.5.01 |
| [T.5.13](tasks/T.5.13-build-reply-form.md) | Build ReplyForm component | 20m | — |
| [T.5.14](tasks/T.5.14-build-reply-component.md) | Build Reply component | 20m | — |
| [T.5.15](tasks/T.5.15-build-vote-buttons.md) | Build VoteButtons shared component | 25m | — |
| [T.5.16](tasks/T.5.16-post-thread-vote-api.md) | POST /api/forum/[id]/vote — thread vote | 20m | T.5.01 |
| [T.5.17](tasks/T.5.17-post-reply-vote-api.md) | POST /api/forum/replies/[id]/vote — reply vote | 20m | T.5.16 |

---

## Sprint 4 — Bookmarks, Best Answer, Polish [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.5.18](tasks/T.5.18-build-bookmark-button.md) | Build BookmarkButton component | 15m | — |
| [T.5.19](tasks/T.5.19-post-bookmark-api.md) | POST /api/forum/[id]/bookmark — toggle | 15m | T.5.01 |
| [T.5.20](tasks/T.5.20-build-best-answer-button.md) | Build MarkBestAnswerButton | 15m | — |
| [T.5.21](tasks/T.5.21-post-best-answer-api.md) | POST /api/forum/replies/[id]/best-answer | 20m | T.5.01 |
| [T.5.22](tasks/T.5.22-implement-collapsed-posts.md) | Implement collapsed posts (score < -5) | 20m | T.5.15 |
| [T.5.23](tasks/T.5.23-reply-pagination.md) | Reply pagination (50+ replies) | 15m | T.5.08 |
| [T.5.24](tasks/T.5.24-forum-search-empty-states.md) | Forum search + empty states | 20m | T.5.06 |

### M3 DOD
- [ ] Full flow: browse → create → reply → vote → bookmark
- [ ] Reddit-style voting: up/down with net score display
- [ ] Best answer marking by thread author
- [ ] Collapsed posts for net score < -5
- [ ] Pagination for threads (20/page) and replies (20/page)
- [ ] Rate limiting: 30s between posts
- [ ] No self-voting, no trust score impact from votes
- [ ] All 21 FRM-* requirements satisfied
