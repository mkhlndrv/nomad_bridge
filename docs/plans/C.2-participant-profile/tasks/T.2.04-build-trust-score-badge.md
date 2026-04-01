# T.2.04: Build TrustScoreBadge Shared Component

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** PRF-DISPLAY-05, PRF-TRUST-01, PRF-TRUST-09, PRF-TRUST-10

## Description
Build a reusable `TrustScoreBadge` server component that displays a user's trust score as a color-coded badge. The badge should show the numeric score and apply a background/text color based on three bands: green for scores >= 30 (trusted/community verified), yellow for scores 0-29 (new/building trust), and red for scores < 0 (restricted). The component should be small and inline-friendly so it can be embedded in profile headers, user cards, RSVP lists, and other contexts across the app. Include a small shield or star icon from lucide-react to visually reinforce the trust concept.

## Acceptance Criteria
- [ ] Component renders at `components/shared/TrustScoreBadge.tsx`
- [ ] Displays numeric trust score value
- [ ] Green background/styling when score >= 30
- [ ] Yellow/amber background/styling when score is 0-29
- [ ] Red background/styling when score < 0
- [ ] Includes a lucide icon (Shield or Star) next to the score
- [ ] Compact size suitable for inline use in cards and headers
- [ ] Accessible: includes `aria-label` with score description

## Files to Create/Modify
- `components/shared/TrustScoreBadge.tsx` — Create TrustScoreBadge server component

## Implementation Notes
- Use Tailwind color classes: `bg-green-100 text-green-800`, `bg-yellow-100 text-yellow-800`, `bg-red-100 text-red-800` (or similar).
- Accept a single `score: number` prop.
- Consider adding a `size` prop (`sm` | `md`) for flexibility, defaulting to `sm`.
- This is a shared component used across multiple features — keep the interface minimal and the styling self-contained.
- Server Component (no `"use client"` directive needed).
- Write a simple unit test to verify correct color band selection for scores: 50, 15, -3.

## Commit Message
`feat: build TrustScoreBadge shared component with color bands`
