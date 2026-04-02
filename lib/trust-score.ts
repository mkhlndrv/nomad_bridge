import { prisma } from "./prisma";

export const TRUST_DELTAS = {
  EVENT_ATTENDANCE: 5,
  LECTURE_COMPLETED: 10,
  POSITIVE_RATING: 3,
  NO_SHOW: -3,
  LATE_CANCELLATION: -2,
  NEGATIVE_RATING: -2,
} as const;

const TRUST_SCORE_FLOOR = -10;
const COMMUNITY_VERIFIED_THRESHOLD = 30;

export type VerificationLevelValue = "unverified" | "email_verified" | "community_verified";

export function calculateVerificationLevel(user: {
  emailVerified: boolean;
  trustScore: number;
}): VerificationLevelValue {
  if (user.emailVerified && user.trustScore >= COMMUNITY_VERIFIED_THRESHOLD) {
    return "community_verified";
  }
  if (user.emailVerified) {
    return "email_verified";
  }
  return "unverified";
}

export async function adjustTrustScore(
  userId: string,
  delta: number,
  reason: string
): Promise<{ newScore: number }> {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const newScore = Math.max(user.trustScore + delta, TRUST_SCORE_FLOOR);

    await tx.user.update({
      where: { id: userId },
      data: { trustScore: newScore },
    });

    await tx.trustScoreLog.create({
      data: {
        userId,
        delta,
        reason,
        newScore,
      },
    });

    return { newScore };
  });
}
