# T.3.13: POST /api/collaborations/[id]/apply

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.3.08
**Spec References:** COL-MATCH-02, COL-MATCH-04, COL-MATCH-05

## Description
Implement the `POST /api/collaborations/[id]/apply` API route that allows a nomad to apply to a university's collaboration request. Validate that: the collaboration exists and is OPEN, the current user has the NOMAD role, the user hasn't already applied to this collaboration, and the user is not the poster. Create a `CollaborationApplication` record with type APPLY, the nomad's message, and status PENDING. Update the collaboration status to IN_DISCUSSION if this is the first application. Return the created application with 201 status. Optionally trigger a notification to the university poster (depends on C.6 notification system).

## Acceptance Criteria
- [ ] `POST /api/collaborations/[id]/apply` creates an application record
- [ ] Only NOMAD role users can apply (returns 403 for UNIVERSITY users)
- [ ] Collaboration must be OPEN or IN_DISCUSSION (returns 400 otherwise)
- [ ] Duplicate applications prevented (returns 409 if already applied)
- [ ] Self-application prevented (poster cannot apply to own collaboration)
- [ ] Application record created with type=APPLY, status=PENDING, message stored
- [ ] Collaboration status updated to IN_DISCUSSION on first application
- [ ] Returns 201 with created application object
- [ ] Returns 404 if collaboration ID doesn't exist
- [ ] Request body includes optional `message` field (string, max 500 chars)

## Files to Create/Modify
- `app/api/collaborations/[id]/apply/route.ts` — New route file with POST handler

## Implementation Notes
- Use a Prisma transaction to atomically create the application and update the collaboration status.
- Check for existing application: `prisma.collaborationApplication.findFirst({ where: { collaborationId, applicantId, type: 'APPLY' } })`.
- Only update collaboration status to IN_DISCUSSION if current status is OPEN (not if already IN_DISCUSSION from a previous application).
- Message validation: trim whitespace, max 500 characters, optional (can be null).
- For notification integration (C.6 dependency), add a TODO comment where the notification should be sent.
- In Next.js 15, `params` is a Promise — use `const { id } = await params`.

## Commit Message
`feat: add POST /api/collaborations/[id]/apply for nomad applications`
