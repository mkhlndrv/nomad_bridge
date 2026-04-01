# T.3.20: Build FeedbackForm Component

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COL-FEEDBACK-01, COL-FEEDBACK-02

## Description
Build a `FeedbackForm` client component that allows users to submit a star rating (1-5) and optional written comment after a collaboration is completed. The form displays the collaboration title and the other party's name for context. The star rating uses 5 clickable star icons — filled stars for the selected rating, outlined for unselected. Hovering over stars shows a preview of the rating. The comment textarea has a 1000-character limit with a live character counter. On submit, POST to `/api/collaborations/[id]/feedback`. Show success confirmation or error message. The form is disabled/hidden if feedback has already been submitted.

## Acceptance Criteria
- [ ] Star rating with 5 clickable stars (1-5 selection)
- [ ] Stars fill on hover (preview) and on click (selection)
- [ ] Comment textarea with 1000-char limit and live character counter
- [ ] Shows collaboration title and other party name for context
- [ ] Submit button disabled until a rating is selected
- [ ] Submits to POST /api/collaborations/[id]/feedback
- [ ] Shows success message on successful submission
- [ ] Shows error message for API errors (409 duplicate, 400 validation)
- [ ] Form hidden or shows "Feedback already submitted" if duplicate detected
- [ ] Loading state on submit button
- [ ] Uses `"use client"` directive

## Files to Create/Modify
- `app/collaborations/components/FeedbackForm.tsx` — Client component with star rating and comment form

## Implementation Notes
- Star rating: use `Star` icon from lucide-react. Map over `[1, 2, 3, 4, 5]`; filled = `fill-yellow-400 text-yellow-400`, unfilled = `text-gray-300`.
- Track both `hoveredRating` (for preview) and `selectedRating` (for actual selection) in state.
- Display rating: `hoveredRating || selectedRating` for the visual, `selectedRating` for the submit.
- Props: `{ collaborationId: string, otherPartyName: string, collaborationTitle: string, existingFeedback?: boolean }`.
- Character counter: `${comment.length}/1000` shown below the textarea, turns red near limit.
- On successful submit, replace the form with a "Thank you for your feedback!" message and show the submitted rating.

## Commit Message
`feat: build FeedbackForm component with star rating and comment`
