import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateThreadForm } from "../_components/CreateThreadForm";

export const metadata = {
  title: "New Thread — NomadBridge",
};

export default function NewThreadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/forum"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Forum
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New Thread</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <CreateThreadForm userId="user-alice" />
      </div>
    </div>
  );
}
