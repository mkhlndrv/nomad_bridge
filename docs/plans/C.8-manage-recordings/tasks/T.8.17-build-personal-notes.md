# T.8.17: Build PersonalNotes Component

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** REC-VIEW-05

## Description
Build a client component for timestamped note-taking while watching recordings. Users can add notes that are automatically timestamped with the current player position. Notes are displayed as a chronological list with clickable timestamps. Each note can be deleted.

## Acceptance Criteria
- [ ] Text input with "Add Note" button
- [ ] Notes auto-stamped with current player time
- [ ] Chronological list of existing notes
- [ ] Each note shows: timestamp (clickable), content, delete button
- [ ] Clicking timestamp seeks player to that time
- [ ] Notes saved via POST /api/recordings/[id]/notes
- [ ] Notes loaded via GET /api/recordings/[id]/notes
- [ ] Only shows current user's notes (private)

## Files to Create/Modify
- `components/recordings/PersonalNotes.tsx` — Client component with note input and list

## Implementation Notes
- Use `"use client"` for form and player time integration
- Accept currentTime prop from player for auto-timestamping
- Format timestamp as MM:SS in the display
- Optimistic UI: add note to list immediately, rollback on error

## Commit Message
`feat: add personal timestamped notes for recordings`
