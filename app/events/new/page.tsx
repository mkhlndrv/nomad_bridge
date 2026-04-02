import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateEventForm } from "./_components/CreateEventForm";

export const metadata = { title: "Create Community Event — NomadBridge" };

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/events" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Community Event</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <CreateEventForm userId="user-bob" />
      </div>
    </div>
  );
}
