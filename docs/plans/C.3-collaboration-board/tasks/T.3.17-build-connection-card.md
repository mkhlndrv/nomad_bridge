# T.3.17: Build ConnectionCard Component

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COL-MATCH-03, COL-MATCH-04, COL-MATCH-05

## Description
Build a `ConnectionCard` client component that displays a single collaboration connection with the other party's info and contextual action buttons. The card shows: collaboration title, collaboration type badge, the other party's name and role, the application/invitation message, the connection status, and timestamps. Action buttons vary by state: Pending connections show Accept/Reject for the poster; Active (Matched) connections show "Mark Complete"; Completed connections show "Leave Feedback" if not yet submitted. The card links to the collaboration detail page for full context.

## Acceptance Criteria
- [ ] `ConnectionCard` renders collaboration title and type badge
- [ ] Shows other party's name and role
- [ ] Displays the application/invitation message (truncated if long)
- [ ] Shows connection status with appropriate styling (consistent with status badges)
- [ ] Pending state: Accept and Reject buttons for the collaboration poster
- [ ] Active state: "Mark Complete" button
- [ ] Completed state: "Leave Feedback" link/button (hidden if feedback already given)
- [ ] Card links to `/collaborations/[id]` for full detail
- [ ] Handles loading state for action button clicks
- [ ] Uses `"use client"` directive for interactive buttons

## Files to Create/Modify
- `app/collaborations/components/ConnectionCard.tsx` — Client component for connection display

## Implementation Notes
- Props interface: `{ connection: ConnectionData, currentUserId: string, onAction: (action, applicationId) => void }`.
- Determine the "other party" by comparing `currentUserId` with both the applicant and the poster.
- Action buttons call the parent's `onAction` handler which delegates to the appropriate API endpoint.
- Show loading spinner on the button while the action is in progress; disable other buttons.
- Message display: truncate to ~100 chars with "Show more" toggle or tooltip.
- Reuse `CollaborationTypeBadge` and `CollaborationStatusBadge` from T.3.06.
- The "Leave Feedback" button navigates to the collaboration detail page with a `#feedback` hash or opens an inline form.

## Commit Message
`feat: build ConnectionCard component with contextual action buttons`
