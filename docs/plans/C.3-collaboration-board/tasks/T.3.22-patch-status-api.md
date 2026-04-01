# T.3.22: PATCH /api/collaborations/[id] — Status Update

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.3.08
**Spec References:** COL-POST-06, COL-POST-07, COL-POST-08, COL-MATCH-05

## Description
Implement the `PATCH /api/collaborations/[id]` API route that allows the collaboration poster to update their posting. Support two operations: editing fields (title, description, tags, date range, etc.) and changing status (specifically cancelling a posting). Enforce the status lifecycle: OPEN can go to CANCELLED; IN_DISCUSSION can go to CANCELLED; MATCHED cannot be directly cancelled (must complete first). Only the poster can edit their collaboration. Universities can edit/close their requests (COL-POST-06); nomads can edit/withdraw their offers (COL-POST-07). Validate that the new status is a valid transition from the current status.

## Acceptance Criteria
- [ ] `PATCH /api/collaborations/[id]` updates collaboration fields
- [ ] Only the poster can update (returns 403 for others)
- [ ] Editable fields: title, description, tags, preferredDateStart, preferredDateEnd, format, compensationType, type-specific fields
- [ ] Status change to CANCELLED allowed from OPEN and IN_DISCUSSION
- [ ] Status change to CANCELLED blocked from MATCHED or COMPLETED (returns 400)
- [ ] Cannot edit a COMPLETED or CANCELLED collaboration (returns 400)
- [ ] Returns 200 with updated collaboration object
- [ ] Returns 404 if collaboration doesn't exist
- [ ] Returns 400 for invalid status transitions with descriptive error message

## Files to Create/Modify
- `app/api/collaborations/[id]/route.ts` — Add PATCH handler alongside existing GET handler

## Implementation Notes
- Define valid status transitions as a map:
  ```
  OPEN -> [IN_DISCUSSION, CANCELLED]
  IN_DISCUSSION -> [MATCHED, CANCELLED]
  MATCHED -> [COMPLETED]
  COMPLETED -> [] (terminal)
  CANCELLED -> [] (terminal)
  ```
- If `status` is in the request body, validate the transition before applying.
- For field updates, only apply fields that are present in the request body (partial update).
- If cancelling, also reject all PENDING applications for this collaboration and add a TODO for notifying applicants.
- Use `prisma.collaborationOpportunity.update()` with the validated fields.
- In Next.js 15, `params` is a Promise — use `const { id } = await params`.

## Commit Message
`feat: add PATCH /api/collaborations/[id] for editing and status changes`
