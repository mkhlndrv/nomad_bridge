# T.2.03: Build ProfileHeader Mockup

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.2.02
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-02, PRF-DISPLAY-05, PRF-DISPLAY-06

## Description
Build the `ProfileHeader` server component that displays the top section of a user's profile. It should show a circular avatar image (with a fallback placeholder showing the user's initials if no `avatarUrl` is set), the user's display name, a role badge (Nomad / University Staff / Admin) styled distinctly per role, the trust score badge (imported from T.2.04), and the user's bio in an "About Me" section. Below the bio, show the user's location with a `MapPin` lucide icon if provided. For the mockup phase, accept all data as props rather than fetching from an API. The component should be responsive: stacked layout on mobile, horizontal avatar + info layout on desktop.

## Acceptance Criteria
- [ ] Component renders at `components/profile/ProfileHeader.tsx`
- [ ] Circular avatar with fallback initials placeholder when no `avatarUrl`
- [ ] Display name rendered as a heading
- [ ] Role badge rendered with distinct styling per role (e.g., blue for NOMAD, purple for UNIVERSITY, red for ADMIN)
- [ ] TrustScoreBadge integrated from T.2.04
- [ ] Bio displayed in an "About Me" section; shows "Add your bio to stand out" prompt if empty
- [ ] Location displayed with MapPin icon; hidden if not set
- [ ] Responsive: stacked on mobile (375px), side-by-side on desktop (1280px)

## Files to Create/Modify
- `components/profile/ProfileHeader.tsx` — Create ProfileHeader server component
- `components/profile/ProfileAvatar.tsx` — Create ProfileAvatar with image + initials fallback

## Implementation Notes
- Use Tailwind CSS for all styling. Use `rounded-full` for avatar, `aspect-square` for consistent sizing.
- Import lucide icons: `MapPin` for location, `User` as avatar fallback icon alternative.
- Define a `ProfileData` TypeScript interface for the props matching the User model fields needed.
- For the initials fallback, extract first letter of first and last name from `name`.
- This is a Server Component (no `"use client"` directive).

## Commit Message
`feat: build ProfileHeader mockup with avatar and role badge`
