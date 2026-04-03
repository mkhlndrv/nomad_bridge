/**
 * adjustTrustScore ensures that the trust score never falls below -10.
 * It takes the current score and a delta, returning the new clamped score.
 */
export function adjustTrustScore(current: number, delta: number): number {
  const newScore = current + delta;
  return newScore < -10 ? -10 : newScore;
}

/**
 * calculateVerificationLevel determines the user's verification status
 * based on email verification and trust score.
 */
export function calculateVerificationLevel(emailVerified: boolean, trustScore: number): string {
  if (trustScore >= 30) {
    return 'COMMUNITY_VERIFIED';
  }
  if (emailVerified) {
    return 'EMAIL_VERIFIED';
  }
  return 'UNVERIFIED';
}
