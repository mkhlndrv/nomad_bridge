# T.2.15: Build VerificationBadge Component

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.2.12
**Spec References:** PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03

## Description
Build the `VerificationBadge` server component that displays a user's verification level as a visual badge. Three distinct states: Unverified (gray circle or no badge), Email Verified (blue checkmark badge), and Community Verified (green shield badge with checkmark). The badge should be small enough to overlay on the profile avatar corner (as a status indicator) and also usable inline next to the user's name. It should include a tooltip or `title` attribute explaining the verification level (e.g., "Community Verified — Trust Score 30+"). Use `calculateVerificationLevel` from `lib/trust-score.ts` to determine which badge to render based on the user's data.

## Acceptance Criteria
- [ ] Component renders at `components/shared/VerificationBadge.tsx`
- [ ] Unverified state: gray dot or subtle "unverified" indicator
- [ ] Email Verified state: blue checkmark icon
- [ ] Community Verified state: green shield with checkmark icon
- [ ] Each state has a descriptive `title` attribute for hover tooltip
- [ ] Component accepts `level: "unverified" | "email_verified" | "community_verified"` prop
- [ ] Also accepts optional `size: "sm" | "md"` prop for avatar overlay vs. inline use
- [ ] Accessible: proper aria-label describing the verification level
- [ ] Visually distinct and recognizable at small sizes

## Files to Create/Modify
- `components/shared/VerificationBadge.tsx` — Create VerificationBadge server component

## Implementation Notes
- Use lucide icons: `ShieldCheck` for community verified, `BadgeCheck` for email verified, `Circle` or no icon for unverified.
- Color scheme: `text-gray-400` for unverified, `text-blue-500` for email verified, `text-green-500` for community verified.
- For avatar overlay positioning, the parent (`ProfileAvatar`) will use `absolute` positioning — this component just needs to render the icon at the given size.
- `sm` size: 16px icon for avatar overlay. `md` size: 20px icon for inline use.
- This is a shared component that will be used in profile headers, user cards in event RSVP lists, and lecture applications.
- Server Component (no `"use client"` directive).

## Commit Message
`feat: build VerificationBadge with three verification levels`
