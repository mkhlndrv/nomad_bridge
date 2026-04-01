# T.3.14: POST /api/collaborations/[id]/invite

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.3.08
**Spec References:** COL-MATCH-01, COL-MATCH-04, COL-MATCH-05

## Description
Implement the `POST /api/collaborations/[id]/invite` API route that allows a university to invite a nomad to collaborate on a nomad's posted offer. Validate that: the collaboration exists and is OPEN (or IN_DISCUSSION), the current user has the UNIVERSITY role, the collaboration was posted by a NOMAD (not another university), and no duplicate invite exists for this collaboration from this university. Create a `CollaborationApplication` record with type INVITE, the university's message, a `targetNomadId` (the nomad being invited), and status PENDING. Update the collaboration status to IN_DISCUSSION if currently OPEN. Return the created invitation with 201 status.

## Acceptance Criteria
- [ ] `POST /api/collaborations/[id]/invite` creates an invitation record
- [ ] Only UNIVERSITY role users can invite (returns 403 for NOMAD users)
- [ ] Collaboration must be posted by a NOMAD (returns 400 if posted by UNIVERSITY)
- [ ] Collaboration must be OPEN or IN_DISCUSSION (returns 400 otherwise)
- [ ] Duplicate invites from same university to same collaboration prevented (returns 409)
- [ ] Invitation record created with type=INVITE, status=PENDING, message stored
- [ ] Collaboration status updated to IN_DISCUSSION on first invitation
- [ ] Returns 201 with created invitation object
- [ ] Returns 404 if collaboration ID doesn't exist
- [ ] Request body includes `message` (optional, max 500 chars)

## Files to Create/Modify
- `app/api/collaborations/[id]/invite/route.ts` — New route file with POST handler

## Implementation Notes
- The invite flow is the mirror of apply: universities reach out to nomads instead of the other way around.
- The `applicantId` on the CollaborationApplication stores the university user who is sending the invite.
- Use a Prisma transaction to create the invitation and update status atomically.
- Validate that the collaboration's poster (`user.role`) is NOMAD — universities only invite on nomad offers.
- For notification integration (C.6), add a TODO comment for sending notification to the nomad.
- In Next.js 15, `params` is a Promise — use `const { id } = await params`.

## Commit Message
`feat: add POST /api/collaborations/[id]/invite for university invitations`
