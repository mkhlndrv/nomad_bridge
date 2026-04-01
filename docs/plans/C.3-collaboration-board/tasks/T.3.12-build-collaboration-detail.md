# T.3.12: Build CollaborationDetail Page

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.3.09
**Spec References:** COL-BOARD-02, COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05, COL-POST-08, COL-MATCH-01, COL-MATCH-02

## Description
Build the `/collaborations/[id]` detail page as a server component that fetches collaboration data from the GET detail API and renders a comprehensive view. The page displays: full title, description, type badge, status badge, poster profile card (name, role, trust score), preferred date range, format, compensation type, tags, and type-specific fields (lecture fields for LECTURE, research fields for RESEARCH, mentorship fields for MENTORSHIP). Include an "Apply" button for nomads viewing university requests and an "Invite" button for universities viewing nomad offers. Show the current applications/invitations list if the viewer is the poster. Include a "Back to Board" link.

## Acceptance Criteria
- [ ] `/collaborations/[id]` page renders full collaboration details
- [ ] Type badge and status badge displayed prominently
- [ ] Poster profile card shows name, role, trust score
- [ ] All shared fields rendered: description, date range, format, compensation, tags
- [ ] Type-specific fields rendered conditionally (lecture, research, mentorship sections)
- [ ] "Apply" button visible to nomads on university requests (COL-MATCH-02)
- [ ] "Invite" button visible to universities on nomad offers (COL-MATCH-01)
- [ ] Applications/invitations list shown to the poster
- [ ] "Back to Board" navigation link
- [ ] 404 page or redirect if collaboration not found
- [ ] Responsive layout: single column on mobile, two-column on desktop (details + sidebar)

## Files to Create/Modify
- `app/collaborations/[id]/page.tsx` — Server component detail page
- `app/collaborations/components/ApplyButton.tsx` — Client component with modal for apply message
- `app/collaborations/components/InviteButton.tsx` — Client component with modal for invite message

## Implementation Notes
- Fetch data server-side using `fetch()` to the detail API or directly via Prisma for better performance.
- For the poster profile card, display a simple card with the user's name, role badge, and trust score.
- Type-specific sections: use a switch on `collaborationType` to render the appropriate fields section.
- Apply/Invite buttons are client components that open a modal with a message textarea. They POST to the respective endpoints (T.3.13, T.3.14).
- Show/hide buttons based on the current user's role vs. the poster's role. A nomad cannot apply to another nomad's offer.
- Use `notFound()` from `next/navigation` if the fetch returns 404.

## Commit Message
`feat: build CollaborationDetail page with apply and invite buttons`
