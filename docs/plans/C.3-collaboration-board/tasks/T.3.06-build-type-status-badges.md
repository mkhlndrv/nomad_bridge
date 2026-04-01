# T.3.06: Build Type + Status Badge Components

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** COL-BOARD-02, COL-POST-01, COL-POST-08

## Description
Build two small server components: `CollaborationTypeBadge` that renders a pill with a lucide icon and label for each of the 5 collaboration types, and `CollaborationStatusBadge` that renders a color-coded status pill. Type badge mappings: LECTURE = Mic icon + "Lecture", WORKSHOP = Users icon + "Workshop", RESEARCH = FlaskConical icon + "Research", MENTORSHIP = GraduationCap icon + "Mentorship", PROJECT = Handshake icon + "Project". Status badge colors: OPEN = green, IN_DISCUSSION = yellow, MATCHED = blue, COMPLETED = gray, CANCELLED = red.

## Acceptance Criteria
- [ ] `CollaborationTypeBadge` accepts a `type` prop and renders correct icon + label
- [ ] All 5 type variants render with distinct lucide icons: Mic, Users, FlaskConical, GraduationCap, Handshake
- [ ] `CollaborationStatusBadge` accepts a `status` prop and renders color-coded pill
- [ ] Status colors: OPEN=green, IN_DISCUSSION=yellow, MATCHED=blue, COMPLETED=gray, CANCELLED=red
- [ ] Both badges are compact pills with rounded corners and appropriate padding
- [ ] TypeScript-typed props (no `any`); accepts enum string values
- [ ] Icons are sized consistently (e.g., `w-4 h-4`)

## Files to Create/Modify
- `app/collaborations/components/CollaborationTypeBadge.tsx` — Server component mapping type to icon + label
- `app/collaborations/components/CollaborationStatusBadge.tsx` — Server component mapping status to color-coded pill

## Implementation Notes
- Use a `Record<CollaborationType, { icon: LucideIcon, label: string, colorClass: string }>` lookup for type badges. Each type can also have a subtle background color (e.g., LECTURE = purple-50, WORKSHOP = blue-50).
- For status badges, use a similar `Record<CollaborationStatus, { label: string, bgClass: string, textClass: string }>` lookup.
- Status label display: "OPEN" -> "Open", "IN_DISCUSSION" -> "In Discussion", "MATCHED" -> "Matched", etc.
- Keep the badge components pure — no client-side logic needed, server components only.
- These components are imported by `CollaborationCard` (T.3.03) and `CollaborationDetail` (T.3.12).

## Commit Message
`feat: build CollaborationTypeBadge and CollaborationStatusBadge components`
