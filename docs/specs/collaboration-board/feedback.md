# SF4: Feedback System

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-FEEDBACK
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COL-FEEDBACK-01 | After a collaboration is marked Completed, both sides can leave feedback | Must |
| COL-FEEDBACK-02 | Rating: 1-5 stars + optional written comment | Must |
| COL-FEEDBACK-03 | Nomad ratings contribute to their trust score (+3 per 4-5 star, -2 per 1-2 star rating) | Must |
| COL-FEEDBACK-04 | Feedback is visible on the nomad's profile (aggregated average + recent comments) | Should |

## Frontend Components

- `FeedbackForm` (Client) — Post-completion: StarRating (1-5) + comment textarea
- `FeedbackDisplay` (Server) — Aggregated average rating + recent comments

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations/[id]/feedback` | POST | Submit rating. One per party. Trust: +3 for 4-5 stars, -2 for 1-2 stars |

## Precision Clarifications

- **Bidirectional feedback:** Both parties can leave feedback after a collaboration is COMPLETED. Each party submits exactly one review per collaboration (enforced by `@@unique([collaborationId, reviewerId])` on CollaborationFeedback)
- **Comment limit:** Optional written comment is limited to 1,000 characters. Enforce in frontend (character counter) and backend (400 `"Comment must be under 1000 characters"` if exceeded)
- **Trust score impact:** Only applies to the NOMAD party. University admins' trust scores are not affected by ratings. Rating from university to nomad: +3 for 4-5 stars, -2 for 1-2 stars, 0 for 3 stars. Rating from nomad to university: recorded but no trust score impact
- **Timing:** Feedback can only be submitted after the collaboration status is COMPLETED. The `/feedback` endpoint returns 400 `"Collaboration must be completed before leaving feedback"` if status is not COMPLETED
