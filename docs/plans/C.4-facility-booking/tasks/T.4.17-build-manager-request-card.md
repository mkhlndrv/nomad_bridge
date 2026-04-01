# T.4.17: Build ManagerRequestCard Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.4.16
**Spec References:** FAC-MGR-02, FAC-MGR-03, FAC-MGR-04

## Description
Build a `ManagerRequestCard` client component designed for the venue manager dashboard. This card is an enhanced version of `RequestCard` with additional manager-specific information and action buttons. It displays the requester's profile info and trust score prominently, event details (title, description, desired date/time, expected attendance, purpose), the interest count with `InterestBar`, and Approve/Reject action buttons. The card should make it easy for the manager to assess the quality of the request at a glance.

## Acceptance Criteria
- [ ] `ManagerRequestCard` is a `"use client"` component
- [ ] Displays requester name, profile info, and trust score badge prominently at the top
- [ ] Trust score is color-coded: green (>= 10), yellow (0 to 9), red (< 0) with numeric value shown
- [ ] Shows event title, description (truncated with "show more"), desired date/time in Asia/Bangkok timezone
- [ ] Displays expected attendance and purpose/category
- [ ] Includes `InterestBar` showing current interest vs venue threshold
- [ ] Shows venue name for context (manager may manage multiple venues)
- [ ] Displays "Approve" button (green) and "Reject" button (red) for requests in `UNDER_REVIEW` status
- [ ] For `OPEN` requests, shows "Approve" and "Reject" buttons but with a note that threshold is not yet met
- [ ] Approve button opens `ApproveRequestModal` (T.4.18)
- [ ] Reject button opens `RejectRequestModal` (T.4.19)
- [ ] For `APPROVED` or `REJECTED` requests, action buttons are replaced with status badge and timestamp
- [ ] Shows how long the request has been waiting (e.g., "Submitted 2 days ago")

## Files to Create/Modify
- `app/components/ManagerRequestCard.tsx` — Client component with requester info, event details, interest bar, and approve/reject actions

## Implementation Notes
- Use `useState` to control modal open/close state for approve and reject modals.
- Calculate "time since submission" from `createdAt` — use a simple relative time helper (e.g., "2 hours ago", "3 days ago").
- Description truncation: show first 150 characters with a "Show more" toggle.
- All dates displayed in Asia/Bangkok timezone.
- Card visual hierarchy: requester info + trust at top, event details in middle, interest bar + actions at bottom.

## Commit Message
`feat: add ManagerRequestCard with approve/reject actions`
