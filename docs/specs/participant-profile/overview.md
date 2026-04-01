# Participant Profile & Verification

> Last updated: 2026-04-01

## Intent / Vibe

Every nomad on NomadBridge should feel like a trusted, visible member of the community — not an anonymous visitor. The profile should tell a story: who they are, what skills they bring, where they've been active, and how reliable they are. University staff reviewing an RSVP or guest lecture application should be able to glance at a profile and feel confident about who they're inviting onto campus. The trust score should feel fair, transparent, and motivating — rewarding good behavior rather than punishing mistakes.

## Sub-Features

- [SF1: Profile Display](profile-display.md)
- [SF2: Profile Editing](profile-editing.md)
- [SF3: Trust Score System](trust-score.md)
- [SF4: Verification Levels](verification-levels.md)

## Page Components

### Shared Logic

**`lib/trust-score.ts`:**
- `adjustTrustScore(userId, delta, reason)` — atomic update with floor of -10, creates log entry
- `calculateVerificationLevel(user)` — returns level based on email verified + trust score >= 30

## Edge Cases & Constraints

- New users with score 0 should not feel penalized — use encouraging language ("Build your reputation!").
- Users with negative trust score (< 0) should see a warning and suggestions for improvement.
- Trust score changes should be logged for transparency (user can see history).
- Profile photo upload: max 2MB, JPEG/PNG only, square crop suggested.
- Empty profiles should show helpful prompts ("Add your bio to stand out").
- Prevent display of email addresses to other users (privacy).

## Acceptance Criteria

- Users can view and edit their own profile (PRF-DISPLAY-01, PRF-EDIT-01).
- Trust score updates automatically based on platform activity (PRF-TRUST-02 through PRF-TRUST-08).
- Verification badges display correctly at each level (PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03).
- Activity summary counts are accurate (PRF-DISPLAY-04).
- Other users can view profiles but not edit them (PRF-DISPLAY-07, PRF-EDIT-02, PRF-EDIT-03).
- Profile is responsive on mobile and desktop.
- Trust score breakdown is accessible to the profile owner (PRF-DISPLAY-09, PRF-TRUST-10).

## Definition of Done

- Profile page renders correctly with all sections
- Edit flow saves changes and shows confirmation
- Trust score calculation is correct and automated
- Verification levels display appropriate badges
- Activity counts match actual database records
- Responsive design on all screen sizes
- Atomic commits used throughout implementation
