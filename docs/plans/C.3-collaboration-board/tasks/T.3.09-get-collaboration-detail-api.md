# T.3.09: GET /api/collaborations/[id] — Detail

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.3.07
**Spec References:** COL-BOARD-02, COL-POST-08, COL-MATCH-03

## Description
Implement the `GET /api/collaborations/[id]` API route that returns a single collaboration opportunity with full details. Include the poster's profile info (name, role, bio, trustScore), all type-specific fields, the list of applications/invitations (with applicant basic info), and any feedback if the collaboration is COMPLETED. This endpoint powers the CollaborationDetail page. Return 404 if the collaboration ID does not exist.

## Acceptance Criteria
- [ ] `GET /api/collaborations/[id]` returns full collaboration detail
- [ ] Response includes poster info: name, role, bio, trustScore
- [ ] Response includes all type-specific fields (lecture, research, mentorship fields)
- [ ] Response includes applications array with applicant info and message
- [ ] Response includes feedback array if status is COMPLETED
- [ ] Returns 404 with error message for non-existent ID
- [ ] Returns 200 with full collaboration object on success

## Files to Create/Modify
- `app/api/collaborations/[id]/route.ts` — New route file with GET handler

## Implementation Notes
- Use `prisma.collaborationOpportunity.findUnique()` with `include` for nested relations:
  ```
  include: {
    user: { select: { id, name, role, bio, trustScore } },
    applications: { include: { applicant: { select: { id, name, role } } } },
    feedback: { include: { fromUser: { select: { id, name } } } }
  }
  ```
- The `[id]` comes from `params.id` in the Next.js App Router dynamic route.
- In Next.js 15, `params` is a Promise — use `const { id } = await params`.
- Return applications sorted by createdAt descending (most recent first).
- Only include feedback if the collaboration status is COMPLETED to avoid data leaks.

## Commit Message
`feat: add GET /api/collaborations/[id] detail endpoint`
