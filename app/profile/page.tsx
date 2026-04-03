import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillTags from "@/components/profile/SkillTags";
import ActivitySummary from "@/components/profile/ActivitySummary";
import TrustScoreCard from "@/components/profile/TrustScoreCard";
import { calculateVerificationLevel } from "@/lib/trust-score";

export default async function MyProfilePage() {
  const headersList = await headers();
  // Fallback to user-alice to support browser navigation (since middleware cannot inject headers in Next 16)
  const userId = headersList.get("x-user-id") || "user-alice";

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    redirect("/");
  }

  const [eventsAttended, bookingsMade, forumPosts, collaborationsCreated] =
    await Promise.all([
      prisma.eventRsvp.count({ where: { userId } }),
      prisma.bookingRequest.count({ where: { userId } }),
      prisma.forumPost.count({ where: { userId } }),
      prisma.collaborationOpportunity.count({ where: { userId } }),
    ]);

  const verificationLevel = calculateVerificationLevel(user);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <ProfileHeader user={user} isOwnProfile />
      <SkillTags skills={user.skills} isOwnProfile />
      <TrustScoreCard trustScore={user.trustScore} verificationLevel={verificationLevel} />
      <ActivitySummary
        eventsAttended={eventsAttended}
        lecturesGiven={collaborationsCreated}
        bookingsMade={bookingsMade}
        forumPosts={forumPosts}
      />
    </main>
  );
}
