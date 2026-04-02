import { PreferencesForm } from "./_components/PreferencesForm";

export const metadata = {
  title: "Notification Preferences — NomadBridge",
};

export default function PreferencesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Notification Preferences</h1>
      <p className="mb-6 text-sm text-gray-500">
        Choose how you want to be notified for each category.
      </p>
      <PreferencesForm userId="user-alice" />
    </div>
  );
}
