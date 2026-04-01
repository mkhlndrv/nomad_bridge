# T.3.19: POST /api/collaborations/[id]/feedback

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.3.18
**Spec References:** COL-FEEDBACK-01, COL-FEEDBACK-02, COL-FEEDBACK-03

## Description
Implement the `POST /api/collaborations/[id]/feedback` API route that allows either matched party to submit feedback after a collaboration is completed. Accept a rating (1-5 integer) and optional comment (string, max 1000 chars). Validate that: the collaboration is COMPLETED, the user is one of the matched parties, and the user hasn't already submitted feedback for this collaboration. Create a `CollaborationFeedback` record with fromUserId, toUserId (the other party), rating, and comment. Apply trust score impact to the nomad recipient: +3 for ratings of 4-5 stars, -2 for ratings of 1-2 stars, 0 for 3 stars. Return the created feedback with 201 status.

## Acceptance Criteria
- [ ] `POST /api/collaborations/[id]/feedback` creates a feedback record
- [ ] Collaboration must be COMPLETED (returns 400 otherwise)
- [ ] Only matched parties can submit feedback (returns 403 for others)
- [ ] One feedback per user per collaboration enforced (returns 409 on duplicate)
- [ ] Rating validated: integer 1-5 (returns 400 for out-of-range)
- [ ] Comment optional, max 1000 characters
- [ ] Trust score updated on the nomad recipient: +3 for 4-5 stars, -2 for 1-2 stars, 0 for 3 stars
- [ ] `toUserId` correctly set to the other party in the collaboration
- [ ] Returns 201 with created feedback object
- [ ] Returns 404 if collaboration doesn't exist

## Files to Create/Modify
- `app/api/collaborations/[id]/feedback/route.ts` — New route file with POST handler

## Implementation Notes
- Determine `toUserId`: if `fromUserId` is the poster, `toUserId` is the accepted applicant; vice versa.
- Trust impact logic:
  - Rating 4 or 5: `trustScore: { increment: 3 }`
  - Rating 1 or 2: `trustScore: { increment: -2 }` (decrement)
  - Rating 3: no change
- Only apply trust changes if the `toUser` is a NOMAD (universities don't have trust scores in the current model).
- Use a Prisma transaction to create feedback and update trust atomically.
- Check for existing feedback: `prisma.collaborationFeedback.findFirst({ where: { collaborationId, fromUserId } })`.
- The `@@unique([collaborationId, fromUserId])` constraint on the model also prevents duplicates at the DB level.

## Commit Message
`feat: add POST /api/collaborations/[id]/feedback with trust score impact`
