# T.3.21: Build FeedbackDisplay Component

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COL-FEEDBACK-02, COL-FEEDBACK-04

## Description
Build a `FeedbackDisplay` server component that shows aggregated and individual feedback for a collaboration or a user's profile. For the collaboration detail page, show both feedback entries (one from each party) with star ratings and comments. For the profile display (COL-FEEDBACK-04), show the aggregated average rating (e.g., "4.2 / 5.0") with a visual star display, total feedback count, and a list of recent comments with the reviewer's name and date. The component is reusable: it accepts either a collaboration ID (for detail page) or a user ID (for profile) to fetch the appropriate feedback.

## Acceptance Criteria
- [ ] Renders star rating visually (filled/partial stars for average)
- [ ] Shows aggregated average rating as number (e.g., "4.2 / 5.0")
- [ ] Shows total feedback count (e.g., "Based on 12 collaborations")
- [ ] Lists individual feedback entries with reviewer name, rating, comment, date
- [ ] Comments displayed in reverse chronological order
- [ ] Empty state: "No feedback yet" message
- [ ] Works in two modes: collaboration-specific (detail page) and user-aggregate (profile)
- [ ] Dates displayed in Asia/Bangkok timezone
- [ ] Responsive layout

## Files to Create/Modify
- `app/collaborations/components/FeedbackDisplay.tsx` — Server component for feedback rendering

## Implementation Notes
- Two usage modes based on props:
  - `{ collaborationId: string }` — shows feedback for a specific collaboration (max 2 entries)
  - `{ userId: string }` — shows aggregated feedback for a user (for profile page, COL-FEEDBACK-04)
- For average calculation: sum of ratings / count. Display with 1 decimal place.
- Visual stars: for average 4.2, show 4 filled stars + 1 partially filled (or just use filled/unfilled with the numeric average).
- Use `Star` icon from lucide-react, consistent with FeedbackForm.
- For the user-aggregate mode, fetch with: `prisma.collaborationFeedback.findMany({ where: { toUserId }, orderBy: { createdAt: 'desc' }, take: 5 })` for recent comments.
- Calculate average on the server side for performance.

## Commit Message
`feat: build FeedbackDisplay component with ratings and comments`
