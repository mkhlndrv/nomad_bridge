# SF3: Trust Score System

**Feature:** [Participant Profile & Verification](overview.md)
**Prefix:** PRF-TRUST
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-TRUST-01 | Score starts at 0 for new users | Must |
| PRF-TRUST-02 | Attending an event (checked in via QR): +5 | Must |
| PRF-TRUST-03 | Completing a guest lecture: +10 | Must |
| PRF-TRUST-04 | Receiving a positive rating (4-5 stars): +3 per rating | Should |
| PRF-TRUST-05 | Consistent booking attendance (no no-shows for 5 bookings): +5 bonus | Could |
| PRF-TRUST-06 | No-show at an event (RSVP but didn't check in): -3 | Must |
| PRF-TRUST-07 | Late booking cancellation (< 24 hours): -2 | Should |
| PRF-TRUST-08 | Receiving a negative rating (1-2 stars): -2 per rating | Should |
| PRF-TRUST-09 | Score cannot go below -10 (floor) | Must |
| PRF-TRUST-10 | Score is visible to the user on their profile and to others viewing their profile | Must |

## Frontend Components

- `TrustScoreCard` (Server) — Also referenced in SF1
  - `TrustScoreHistory` (Client) — Paginated timeline of score changes with reason, delta, date, running total

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/profile/trust-history` | GET | Paginated trust score change log for current user |
