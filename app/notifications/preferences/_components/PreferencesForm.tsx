"use client";

import { useState, useEffect } from "react";
import { Mail, MessageCircle, Send, Save } from "lucide-react";

interface Preference {
  id: string;
  category: string;
  emailEnabled: boolean;
  lineEnabled: boolean;
  telegramEnabled: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  EVENTS: "Events & RSVPs",
  BOOKINGS: "Facility Bookings",
  LECTURES: "Lecture Opportunities",
  COMMUNITY: "Community & Forum",
  TRUST: "Trust Score",
};

export function PreferencesForm({ userId }: { userId: string }) {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications/preferences", {
          headers: { "x-user-id": userId },
        });
        if (res.ok) {
          const data = await res.json();
          setPreferences(data.preferences);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  function toggleChannel(category: string, channel: "emailEnabled" | "lineEnabled" | "telegramEnabled") {
    setPreferences((prev) =>
      prev.map((p) =>
        p.category === category ? { ...p, [channel]: !p[channel] } : p
      )
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/notifications/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-user-id": userId },
        body: JSON.stringify({ preferences }),
      });
      if (res.ok) {
        const data = await res.json();
        setPreferences(data.preferences);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // Silently fail
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-8 text-center text-sm text-gray-500">Loading preferences...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Email</span>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> LINE</span>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1"><Send className="h-3.5 w-3.5" /> Telegram</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {preferences.map((pref) => (
              <tr key={pref.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {CATEGORY_LABELS[pref.category] ?? pref.category}
                </td>
                <td className="px-4 py-3 text-center">
                  <ToggleSwitch
                    checked={pref.emailEnabled}
                    onChange={() => toggleChannel(pref.category, "emailEnabled")}
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <ToggleSwitch
                    checked={pref.lineEnabled}
                    onChange={() => toggleChannel(pref.category, "lineEnabled")}
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <ToggleSwitch
                    checked={pref.telegramEnabled}
                    onChange={() => toggleChannel(pref.category, "telegramEnabled")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Preferences"}
      </button>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
