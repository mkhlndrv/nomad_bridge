# T.3.15: POST /api/collaborations/[id]/respond

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.3.13
**Spec References:** COL-MATCH-05

## Description
Implement the `POST /api/collaborations/[id]/respond` API route that allows a collaboration poster to accept or reject an application/invitation. The request body includes `applicationId` and `action` (ACCEPT or REJECT). On ACCEPT: update the application status to ACCEPTED, update the collaboration status to MATCHED, and reject all other pending applications for this collaboration. On REJECT: update the application status to REJECTED; if no other pending applications remain, revert the collaboration status to OPEN. Only the collaboration poster can respond to applications on their posting. Validate that the application belongs to this collaboration and is in PENDING status.

## Acceptance Criteria
- [ ] `POST /api/collaborations/[id]/respond` handles accept/reject actions
- [ ] Only the collaboration poster can respond (returns 403 for others)
- [ ] Request body requires `applicationId` and `action` (ACCEPT or REJECT)
- [ ] On ACCEPT: application status -> ACCEPTED, collaboration status -> MATCHED
- [ ] On ACCEPT: all other PENDING applications for this collaboration -> REJECTED
- [ ] On REJECT: application status -> REJECTED
- [ ] On REJECT with no remaining PENDING apps: collaboration status reverts to OPEN
- [ ] Application must be PENDING (returns 400 if already ACCEPTED/REJECTED)
- [ ] Application must belong to this collaboration (returns 400 if mismatched)
- [ ] Returns 200 with updated application and collaboration status

## Files to Create/Modify
- `app/api/collaborations/[id]/respond/route.ts` — New route file with POST handler

## Implementation Notes
- Use a Prisma transaction for the accept flow since multiple records are updated atomically:
  1. Update the accepted application status
  2. Update collaboration status to MATCHED
  3. Reject all other PENDING applications (`updateMany` where collaborationId matches and id != accepted)
- For reject: after rejecting, count remaining PENDING applications. If zero, update collaboration status back to OPEN.
- Validate ownership: `collaboration.userId === currentUserId`.
- The respond endpoint handles responses to both APPLY and INVITE type applications — the logic is the same for both directions.
- Add TODO for notification to the applicant about accept/reject outcome (C.6 dependency).

## Commit Message
`feat: add POST /api/collaborations/[id]/respond for accept/reject flow`
