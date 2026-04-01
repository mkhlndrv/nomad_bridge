# T.2.12: Implement lib/trust-score.ts

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 30m
**Dependencies:** T.2.01
**Spec References:** PRF-TRUST-01, PRF-TRUST-02, PRF-TRUST-03, PRF-TRUST-04, PRF-TRUST-05, PRF-TRUST-06, PRF-TRUST-07, PRF-TRUST-08, PRF-TRUST-09, PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03

## Description
Implement the core trust score logic in `lib/trust-score.ts`. This file exports two main functions: `adjustTrustScore(userId, delta, reason)` and `calculateVerificationLevel(user)`. The `adjustTrustScore` function atomically updates a user's trust score by the given delta, enforces the floor of -10 (PRF-TRUST-09), and creates a `TrustScoreLog` entry recording the change, reason, and resulting score. It should use a Prisma transaction to ensure atomicity. The `calculateVerificationLevel` function returns the user's verification level based on their email verification status and trust score: "unverified" (default), "email_verified" (email confirmed), or "community_verified" (email confirmed AND trust score >= 30). Include comprehensive unit tests for both functions.

## Acceptance Criteria
- [ ] `adjustTrustScore(userId, delta, reason)` exported from `lib/trust-score.ts`
- [ ] Positive delta increases trust score correctly
- [ ] Negative delta decreases trust score correctly
- [ ] Score cannot go below -10 (floor enforcement)
- [ ] Each adjustment creates a TrustScoreLog entry with `delta`, `reason`, `newScore`
- [ ] Update and log creation happen in a Prisma transaction (atomic)
- [ ] `calculateVerificationLevel(user)` returns correct level for all 3 cases
- [ ] Unit tests cover: positive delta, negative delta, floor enforcement, all 3 verification levels
- [ ] Functions handle edge cases: delta of 0, user not found

## Files to Create/Modify
- `lib/trust-score.ts` — Create trust score utility functions
- `lib/__tests__/trust-score.test.ts` — Create unit tests

## Implementation Notes
- Use `prisma.$transaction()` to wrap the score update and log creation.
- Floor enforcement: calculate `newScore = Math.max(currentScore + delta, -10)`.
- The `adjustTrustScore` function should read the current score first, compute the new score with floor, then update and log.
- Define trust score delta constants for common actions: `TRUST_DELTAS = { EVENT_ATTENDANCE: 5, LECTURE_COMPLETED: 10, POSITIVE_RATING: 3, NO_SHOW: -3, LATE_CANCELLATION: -2, NEGATIVE_RATING: -2 }`.
- `calculateVerificationLevel` signature: `(user: { emailVerified: boolean; trustScore: number }) => "unverified" | "email_verified" | "community_verified"`.
- Use `lib/prisma.ts` for the Prisma client instance.

## Commit Message
`feat: implement trust score adjustment and verification level logic`
