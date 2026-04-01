# T.3.18: POST /api/collaborations/[id]/complete

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.3.15
**Spec References:** COL-MATCH-05, COL-FEEDBACK-01

## Description
Implement the `POST /api/collaborations/[id]/complete` API route that marks a matched collaboration as completed. Either party (poster or matched applicant) can trigger completion. Validate that the collaboration exists, is in MATCHED status, and the requesting user is one of the two matched parties. On completion: update the collaboration status to COMPLETED and award +10 trust score to the nomad participant. If both participants are nomads (unlikely given the request/offer model, but handle gracefully), award +10 to the applicant nomad. Return the updated collaboration with 200 status.

## Acceptance Criteria
- [ ] `POST /api/collaborations/[id]/complete` marks collaboration as COMPLETED
- [ ] Only matched parties can complete (poster or accepted applicant) — returns 403 for others
- [ ] Collaboration must be in MATCHED status (returns 400 for OPEN, IN_DISCUSSION, etc.)
- [ ] Collaboration status updated to COMPLETED
- [ ] Nomad participant receives +10 trust score
- [ ] Trust score update uses Prisma `increment` to avoid race conditions
- [ ] Returns 200 with updated collaboration object
- [ ] Returns 404 if collaboration doesn't exist
- [ ] Idempotent: completing an already COMPLETED collaboration returns 400 with clear message

## Files to Create/Modify
- `app/api/collaborations/[id]/complete/route.ts` — New route file with POST handler

## Implementation Notes
- Find the matched application: `prisma.collaborationApplication.findFirst({ where: { collaborationId, status: 'ACCEPTED' } })`.
- Determine the nomad: check poster's role and applicant's role. The NOMAD party gets the trust bonus.
- Use a Prisma transaction:
  1. Update collaboration status to COMPLETED
  2. Update nomad's trust score: `prisma.user.update({ where: { id: nomadUserId }, data: { trustScore: { increment: 10 } } })`
- Validate the requesting user is either `collaboration.userId` (poster) or `acceptedApplication.applicantId`.
- In Next.js 15, `params` is a Promise — use `const { id } = await params`.

## Commit Message
`feat: add POST /api/collaborations/[id]/complete with trust score award`
