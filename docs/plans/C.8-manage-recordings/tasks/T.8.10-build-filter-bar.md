# T.8.10: Build RecordingFilterBar

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** REC-LIB-03, REC-LIB-04

## Description
Build a client component for filtering the recording library. Includes: university dropdown, event category pills, speaker text input, date range picker, and a transcript search toggle. Updates URL search params for server-side filtering.

## Acceptance Criteria
- [ ] University dropdown populated from available recordings
- [ ] Event category filter pills
- [ ] Speaker name text input with debounce
- [ ] Date range inputs (from/to)
- [ ] Search input for titles and transcripts
- [ ] "Search transcripts" toggle checkbox
- [ ] All filters update URL search params
- [ ] Clear all filters button

## Files to Create/Modify
- `components/recordings/RecordingFilterBar.tsx` — Client component with filter state

## Implementation Notes
- Use `"use client"` with useRouter and useSearchParams
- Debounce text inputs (300ms) before updating params
- Similar pattern to EventFilterBar and other filter components

## Commit Message
`feat: add recording filter bar with transcript search toggle`
