# SF4: Verification Levels

**Feature:** [Participant Profile & Verification](overview.md)
**Prefix:** PRF-VERIFY
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| PRF-VERIFY-01 | Unverified: Default state. Can browse and RSVP | Must |
| PRF-VERIFY-02 | Email Verified: Confirmed email address. Required to create posts or apply for lectures | Must |
| PRF-VERIFY-03 | Community Verified: Trust score >= 30. Gets a verification badge on profile. Can access premium facilities | Must |

## Frontend Components

- `VerificationBadge` (Server) — Also referenced in SF1

## Precision Clarifications

- **Recalculation trigger:** Verification level is recalculated every time `adjustTrustScore()` is called in `lib/trust-score.ts`. The function updates `user.verificationLevel` as part of the same database transaction
- **No grace period:** If a user's trust score drops below 30, Community Verified status is removed immediately. There is no grace period or notification before downgrade
- **Level determination logic:**
  - `emailVerified === false` → `NONE`
  - `emailVerified === true && trustScore < 30` → `EMAIL_VERIFIED`
  - `emailVerified === true && trustScore >= 30` → `COMMUNITY_VERIFIED`
- **Badge display:** The `VerificationBadge` component reads `user.verificationLevel` directly from the database. No client-side recalculation
- **Feature gating:** Unverified (NONE) → can browse + RSVP to events. Email Verified → can create forum posts, apply to collaborations. Community Verified → access premium facilities
