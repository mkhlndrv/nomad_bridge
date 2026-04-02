import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import TrustScoreCard from "@/components/profile/TrustScoreCard";
import TrustScoreHistory from "@/components/profile/TrustScoreHistory";
import { calculateVerificationLevel } from "@/lib/trust-score";

export default async function TrustHistoryPage() {
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

  const verificationLevel = calculateVerificationLevel(user);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <a href="/profile" className="text-blue-600 hover:text-blue-800 text-sm">← Back to Profile</a>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Trust Score History</h1>
      <TrustScoreCard trustScore={user.trustScore} verificationLevel={verificationLevel} />
      <TrustScoreHistory />
    </main>
  );
}
