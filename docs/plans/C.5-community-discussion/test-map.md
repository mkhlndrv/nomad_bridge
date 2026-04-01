# C.5: Community Discussion Board — Test Map

## Unit Tests (`__tests__/unit/forum-logic.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | Compute net score: positive | 10 up, 3 down | 7 |
| 2 | Compute net score: negative | 0 up, 5 down | -5 |
| 3 | Compute net score: zero | 4 up, 4 down | 0 |
| 4 | Should collapse: below threshold | netScore=-6 | true |
| 5 | Should collapse: at threshold | netScore=-5 | false |
| 6 | Should collapse: above threshold | netScore=-4 | false |
| 7 | Can vote: own post | authorId=userId | false |
| 8 | Can vote: other's post | authorId≠userId | true |
| 9 | Toggle vote: upvote then downvote | existing=UP, new=DOWN | removes up, adds down |
| 10 | Toggle vote: same direction | existing=UP, new=UP | removes vote |
| 11 | Validate title: within limit | 120 chars | valid |
| 12 | Validate title: exceeds limit | 121 chars | invalid |
| 13 | Validate content: within limit | 5000 chars | valid |
| 14 | Validate content: exceeds limit | 5001 chars | invalid |

## Integration Tests (`__tests__/integration/forum-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | List threads | GET /api/forum | 200, pinned first |
| 2 | Filter by category | GET /api/forum?category=TIPS | 200, filtered |
| 3 | Search threads | GET /api/forum?search=bangkok | 200, matching results |
| 4 | Create thread | POST /api/forum | 201, appears in feed |
| 5 | Create thread (rate limited) | POST within 30s | 429 |
| 6 | Create thread (title too long) | POST title=121 chars | 400 |
| 7 | Create thread (content too long) | POST content=5001 chars | 400 |
| 8 | Get thread with replies | GET /api/forum/[id] | 200, paginated replies |
| 9 | Create reply | POST /api/forum/[id]/replies | 201, lastActivity updated |
| 10 | Upvote thread | POST /api/forum/[id]/vote {up} | 200, net score +1 |
| 11 | Downvote thread | POST /api/forum/[id]/vote {down} | 200, net score -1 |
| 12 | Vote own post | POST vote (own thread) | 403 |
| 13 | Toggle vote direction | POST vote (switch up→down) | 200, net changed by 2 |
| 14 | Bookmark toggle ON | POST /api/forum/[id]/bookmark | 200, bookmarked=true |
| 15 | Bookmark toggle OFF | POST again | 200, bookmarked=false |
| 16 | Mark best answer (author) | POST /api/forum/replies/[id]/best-answer | 200 |
| 17 | Mark best answer (non-author) | POST (not thread author) | 403 |
| 18 | Reply vote | POST /api/forum/replies/[id]/vote | 200 |
| 19 | Self-vote on reply | POST vote (own reply) | 403 |
| 20 | Pagination (20 per page) | GET /api/forum?page=2 | 200, max 20 items |
