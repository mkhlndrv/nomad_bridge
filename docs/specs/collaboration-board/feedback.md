# SF4: Feedback System

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-FEEDBACK

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
