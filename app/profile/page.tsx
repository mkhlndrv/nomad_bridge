import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillTags from "@/components/profile/SkillTags";
import ActivitySummary from "@/components/profile/ActivitySummary";

export default async function MyProfilePage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

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

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <ProfileHeader user={user} isOwnProfile />
      <SkillTags skills={user.skills} isOwnProfile />
      <ActivitySummary
        eventsAttended={eventsAttended}
        lecturesGiven={collaborationsCreated}
        bookingsMade={bookingsMade}
        forumPosts={forumPosts}
      />
    </main>
  );
}
