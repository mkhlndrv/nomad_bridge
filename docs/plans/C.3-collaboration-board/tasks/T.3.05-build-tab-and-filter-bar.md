# T.3.05: Build CollaborationTabBar + FilterBar

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COL-BOARD-01, COL-BOARD-03, COL-BOARD-04, COL-BOARD-05, COL-BOARD-06

## Description
Build two client components: `CollaborationTabBar` with three tabs ("Requests from Universities", "Offers from Nomads", "All Opportunities") that update the URL search params on click, and `CollaborationFilterBar` with filter dropdowns for collaboration type (5 types), format (in-person/online/hybrid), compensation (paid/free/facility access), status (open/in discussion/matched/completed), and a search input. The filter bar is built as a UI shell in this task — the actual filtering logic is wired in T.3.23. Both components use `useRouter` and `useSearchParams` from `next/navigation` to manage state via URL params.

## Acceptance Criteria
- [ ] `CollaborationTabBar` renders 3 tabs with correct labels
- [ ] Active tab is visually highlighted (underline or background color)
- [ ] Clicking a tab updates `?tab=` search param without full page reload
- [ ] `CollaborationFilterBar` renders dropdowns for: type, format, compensation, status
- [ ] `CollaborationFilterBar` includes a search input with placeholder text
- [ ] Filter controls are styled but not yet wired to API (placeholder onChange)
- [ ] Both components use `"use client"` directive
- [ ] Responsive: filters wrap or collapse on mobile

## Files to Create/Modify
- `app/collaborations/components/CollaborationTabBar.tsx` — Client component with 3 tab buttons
- `app/collaborations/components/CollaborationFilterBar.tsx` — Client component with filter dropdowns and search input

## Implementation Notes
- Use `useSearchParams()` to read current tab/filter state and `useRouter().replace()` to update without history push.
- Tab values: `requests`, `offers`, `all` (default: `all`).
- Filter param names: `type`, `format`, `compensation`, `status`, `search` — all as URL search params.
- Style the active tab with a bottom border (e.g., `border-b-2 border-blue-600 text-blue-600`).
- On mobile, consider stacking the filter dropdowns or using a collapsible "Filters" button.
- Use `<select>` elements for dropdowns for simplicity; can upgrade to custom dropdowns later.

## Commit Message
`feat: build CollaborationTabBar and CollaborationFilterBar components`
