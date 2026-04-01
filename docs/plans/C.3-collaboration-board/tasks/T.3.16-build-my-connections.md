# T.3.16: Build MyConnections Page

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.3.15
**Spec References:** COL-MATCH-03, COL-MATCH-05

## Description
Build the `/collaborations/connections` page as a server component that shows all of the current user's collaboration connections — both as a poster (received applications/invitations) and as an applicant/invitee (sent applications/received invitations). Group connections by status: "Pending" (awaiting response), "Active" (matched, in progress), and "Completed". Each group renders a list of `ConnectionCard` components (T.3.17). The Pending section shows accept/reject action buttons for the poster's received applications. The Active section shows a "Mark Complete" button. Include counts per section and an empty state when no connections exist.

## Acceptance Criteria
- [ ] `/collaborations/connections` page renders grouped connection lists
- [ ] Three sections: Pending, Active (Matched), Completed
- [ ] Each section shows a count badge (e.g., "Pending (3)")
- [ ] Connections include both posted collaborations with applications AND applied/invited collaborations
- [ ] Pending section: poster sees Accept/Reject buttons on received applications
- [ ] Active section: shows "Mark Complete" button for matched collaborations
- [ ] Completed section: shows feedback status (given/not given) with link to feedback form
- [ ] Empty state per section ("No pending connections")
- [ ] Overall empty state if user has no connections at all
- [ ] Page is responsive: stacked sections on mobile

## Files to Create/Modify
- `app/collaborations/connections/page.tsx` — Server component MyConnections page

## Implementation Notes
- Fetch connections server-side: query CollaborationApplication where `applicantId = currentUser` OR where `collaboration.userId = currentUser`.
- Include the collaboration details and the other party's info in the query.
- Group by application status: PENDING -> "Pending", ACCEPTED -> check collaboration status (MATCHED -> "Active", COMPLETED -> "Completed").
- For the poster's view, also include direct collaboration queries where they are the poster with applications.
- Use `ConnectionCard` (T.3.17) for rendering each connection.
- Action buttons are client components that POST to `/api/collaborations/[id]/respond` and `/api/collaborations/[id]/complete`.

## Commit Message
`feat: build MyConnections page with grouped connection lists`
