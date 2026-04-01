# C.3: Collaboration Board — Test Map

## Unit Tests (`__tests__/unit/collaboration-logic.test.ts`)

| # | Test Case | Input | Expected |
|---|-----------|-------|----------|
| 1 | UNIVERSITY can create request | role=UNIVERSITY, type=request | valid |
| 2 | NOMAD can create offer | role=NOMAD, type=offer | valid |
| 3 | NOMAD cannot create request | role=NOMAD, type=request | invalid |
| 4 | Status: OPEN → IN_DISCUSSION | current=OPEN, next=IN_DISCUSSION | valid |
| 5 | Status: OPEN → MATCHED (skip) | current=OPEN, next=MATCHED | invalid |
| 6 | Status: MATCHED → COMPLETED | current=MATCHED, next=COMPLETED | valid |
| 7 | Feedback trust: 5 stars | rating=5 | delta=+3 |
| 8 | Feedback trust: 4 stars | rating=4 | delta=+3 |
| 9 | Feedback trust: 3 stars | rating=3 | delta=0 |
| 10 | Feedback trust: 1 star | rating=1 | delta=-2 |
| 11 | Rate limit: 3rd post this week | postsThisWeek=2 | allowed |
| 12 | Rate limit: 4th post this week | postsThisWeek=3 | rejected |

## Integration Tests (`__tests__/integration/collaboration-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | List collaborations | GET /api/collaborations | 200, paginated |
| 2 | Filter by type | GET /api/collaborations?type=LECTURE | 200, filtered |
| 3 | Filter tab (requests) | GET /api/collaborations?tab=requests | 200, university only |
| 4 | Create posting (valid) | POST /api/collaborations | 201 |
| 5 | Create posting (wrong role) | POST (NOMAD as request) | 403 |
| 6 | Rate limit exceeded | POST 4th in week | 429 |
| 7 | Get detail | GET /api/collaborations/[id] | 200, with profile |
| 8 | Apply as nomad | POST /api/collaborations/[id]/apply | 201 |
| 9 | Apply as university | POST apply (UNIVERSITY) | 403 |
| 10 | Invite as university | POST /api/collaborations/[id]/invite | 201 |
| 11 | Accept application | POST /api/collaborations/[id]/respond {accept} | 200, MATCHED |
| 12 | Reject application | POST respond {reject} | 200, stays IN_DISCUSSION |
| 13 | Complete collaboration | POST /api/collaborations/[id]/complete | 200, trust +10 |
| 14 | Submit feedback | POST /api/collaborations/[id]/feedback | 201 |
| 15 | Duplicate feedback | POST feedback again | 409 |
| 16 | Skip status step | PATCH OPEN→COMPLETED | 400 |
