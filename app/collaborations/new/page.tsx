import CreateCollaborationForm from "@/components/collaborations/CreateCollaborationForm";

export const metadata = { title: "Post Collaboration — NomadBridge" };

export default function NewCollaborationPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Post a Collaboration</h1>
      <p className="text-sm text-gray-500 mb-6">
        Share an opportunity to connect with universities or nomads
      </p>
      <CreateCollaborationForm />
    </main>
  );
}
