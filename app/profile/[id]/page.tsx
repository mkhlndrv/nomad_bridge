import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillTags from "@/components/profile/SkillTags";
import ActivitySummary from "@/components/profile/ActivitySummary";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const headersList = await headers();
  const currentUserId = headersList.get("x-user-id");

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  const isOwnProfile = currentUserId === user.id;

  const [eventsAttended, bookingsMade, forumPosts, collaborationsCreated] =
    await Promise.all([
      prisma.eventRsvp.count({ where: { userId: id } }),
      prisma.bookingRequest.count({ where: { userId: id } }),
      prisma.forumPost.count({ where: { userId: id } }),
      prisma.collaborationOpportunity.count({ where: { userId: id } }),
    ]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
      <SkillTags skills={user.skills} isOwnProfile={isOwnProfile} />
      <ActivitySummary
        eventsAttended={eventsAttended}
        lecturesGiven={collaborationsCreated}
        bookingsMade={bookingsMade}
        forumPosts={forumPosts}
      />
    </main>
  );
}
