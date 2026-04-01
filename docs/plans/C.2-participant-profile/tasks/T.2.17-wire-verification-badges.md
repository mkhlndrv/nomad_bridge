# T.2.17: Wire Verification Badges Across Profile

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.2.15
**Spec References:** PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03, PRF-DISPLAY-01, PRF-DISPLAY-05

## Description
Integrate the `VerificationBadge` component into all relevant places across the profile UI. Add it as an overlay on the `ProfileAvatar` component (bottom-right corner), display it inline next to the user's name in the `ProfileHeader`, and include it in the `TrustScoreCard` next to the verification level label. Compute the verification level using `calculateVerificationLevel` from `lib/trust-score.ts` and pass it through to each badge instance. Also update the `ProfileHeader` to show the TrustScoreCard section below the bio. Ensure empty profiles (no bio, no skills, score 0) show appropriate encouraging prompts throughout: "Add your bio to stand out," "Add skills to help others find you," and "Build your reputation by attending events!"

## Acceptance Criteria
- [ ] VerificationBadge overlays on ProfileAvatar (bottom-right, `sm` size)
- [ ] VerificationBadge shown inline next to name in ProfileHeader (`md` size)
- [ ] VerificationBadge shown in TrustScoreCard next to level label
- [ ] Verification level computed from user data using `calculateVerificationLevel`
- [ ] All three verification states render correctly across all placements
- [ ] Empty bio shows "Add your bio to stand out" prompt
- [ ] Empty skills shows "Add skills to help others find you" prompt
- [ ] Zero trust score shows "Build your reputation by attending events!" in TrustScoreCard
- [ ] Negative trust score shows warning with improvement suggestions
- [ ] All profile sections cohesive and visually consistent
- [ ] Profile pages pass visual check at 375px and 1280px

## Files to Create/Modify
- `components/profile/ProfileAvatar.tsx` — Add VerificationBadge overlay
- `components/profile/ProfileHeader.tsx` — Add inline VerificationBadge, integrate TrustScoreCard
- `components/profile/TrustScoreCard.tsx` — Add VerificationBadge next to level label
- `app/profile/page.tsx` — Pass verification level data to components
- `app/profile/[id]/page.tsx` — Pass verification level data to components

## Implementation Notes
- Use `calculateVerificationLevel` from `lib/trust-score.ts` in the server components (page level) and pass the level as a prop.
- ProfileAvatar overlay: use `relative` on the avatar container, `absolute bottom-0 right-0` on the badge.
- Empty state prompts should use a muted text color (`text-gray-400`) with italic styling.
- For negative trust score warning, use a yellow/amber alert-style banner with `AlertTriangle` icon from lucide-react.
- This is the final integration task — verify all 26 PRF-* requirements are satisfied after completion.
- Review all profile components together for visual consistency before committing.

## Commit Message
`feat: wire verification badges and empty state prompts across profile`
