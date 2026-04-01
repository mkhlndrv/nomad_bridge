# C.2: Participant Profile — Test Map

## Unit Tests (`__tests__/unit/trust-score.test.ts`)

| # | Test Case | Input | Expected Output |
|---|-----------|-------|-----------------|
| 1 | Positive trust adjustment | user(score=10), delta=+5, reason="event_attendance" | score=15, log entry created |
| 2 | Negative trust adjustment | user(score=5), delta=-3, reason="no_show" | score=2, log entry created |
| 3 | Floor enforcement | user(score=-8), delta=-5 | score=-10 (not -13) |
| 4 | Floor at exactly -10 | user(score=-10), delta=-1 | score=-10 (unchanged) |
| 5 | Zero delta (no-op) | user(score=20), delta=0 | score=20, no log entry |
| 6 | Verification: unverified | emailVerified=false, score=50 | "unverified" |
| 7 | Verification: email verified | emailVerified=true, score=15 | "email_verified" |
| 8 | Verification: community | emailVerified=true, score=30 | "community_verified" |
| 9 | Verification: high score no email | emailVerified=false, score=50 | "unverified" |
| 10 | Verification: exactly 30 | emailVerified=true, score=30 | "community_verified" |

## Integration Tests (`__tests__/integration/profile-api.test.ts`)

| # | Test Case | Method | Expected |
|---|-----------|--------|----------|
| 1 | Get own profile | GET /api/profile | 200, includes email + activity counts |
| 2 | Get other profile | GET /api/profile/[id] | 200, excludes email |
| 3 | Get missing profile | GET /api/profile/missing-id | 404 |
| 4 | Update valid fields | PATCH /api/profile {name, bio} | 200, fields updated |
| 5 | Reject long name | PATCH /api/profile {name: 200chars} | 400 |
| 6 | Cannot change email | PATCH /api/profile {email: "new"} | 200, email unchanged |
| 7 | Cannot change role | PATCH /api/profile {role: "ADMIN"} | 200, role unchanged |
| 8 | Trust history pagination | GET /api/profile/trust-history?page=1 | 200, max 20 items |
| 9 | Avatar upload valid | POST /api/profile/avatar (1MB JPEG) | 200, avatarUrl set |
| 10 | Avatar too large | POST /api/profile/avatar (3MB) | 400 |
| 11 | Avatar wrong type | POST /api/profile/avatar (PDF) | 400 |
| 12 | Activity counts accurate | GET /api/profile (user with activity) | counts match DB |

## Component Tests

| # | Component | Test |
|---|-----------|------|
| 1 | TrustScoreBadge | Renders green for score=50 |
| 2 | TrustScoreBadge | Renders yellow for score=15 |
| 3 | TrustScoreBadge | Renders red for score=-3 |
| 4 | VerificationBadge | Renders gray for unverified |
| 5 | VerificationBadge | Renders blue for email_verified |
| 6 | VerificationBadge | Renders green shield for community_verified |
| 7 | ProfileEditForm | Shows save confirmation on submit |
| 8 | ProfileEditForm | Prevents email field editing |
