"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PURPOSES = [
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "STUDY_GROUP", label: "Study Group" },
  { value: "MEETUP", label: "Meetup" },
  { value: "OTHER", label: "Other" },
];

interface BookingRequestFormProps {
  facilityId: string;
  facilityName: string;
}

export default function BookingRequestForm({ facilityId, facilityName }: BookingRequestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    desiredDate: "",
    startTime: "",
    endTime: "",
    expectedAttendance: "",
    purpose: "WORKSHOP",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  function validate(): string | null {
    if (!form.title.trim()) return "Title is required";
    if (form.title.length > 120) return "Title must be 120 characters or less";
    if (!form.description.trim()) return "Description is required";
    if (form.description.length > 2000) return "Description must be 2000 characters or less";
    if (!form.desiredDate) return "Date is required";
    if (new Date(form.desiredDate) <= new Date()) return "Date must be in the future";
    if (!form.startTime) return "Start time is required";
    if (!form.endTime) return "End time is required";
    if (form.startTime >= form.endTime) return "Start time must be before end time";
    if (!form.expectedAttendance || parseInt(form.expectedAttendance) <= 0) return "Expected attendance must be positive";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityId,
          eventTitle: form.title.trim(),
          eventDescription: form.description.trim(),
          proposedDate: form.desiredDate,
          startTime: form.startTime,
          endTime: form.endTime,
          expectedAttendance: parseInt(form.expectedAttendance),
          purpose: form.purpose,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create booking request");
        return;
      }

      router.push(`/facilities/${facilityId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Venue info */}
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
        <p className="text-xs text-gray-500">Requesting venue</p>
        <p className="font-medium text-gray-900">{facilityName}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Title * <span className="text-gray-400 font-normal">({form.title.length}/120)</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          maxLength={120}
          placeholder="e.g., Python Workshop for Beginners"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description * <span className="text-gray-400 font-normal">({form.description.length}/2000)</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="Describe your event and what you need from the venue..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            value={form.desiredDate}
            onChange={(e) => update("desiredDate", e.target.value)}
            min={minDate}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            step={1800}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
          <input
            type="time"
            value={form.endTime}
            onChange={(e) => update("endTime", e.target.value)}
            step={1800}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Attendance *</label>
          <input
            type="number"
            value={form.expectedAttendance}
            onChange={(e) => update("expectedAttendance", e.target.value)}
            min={1}
            placeholder="e.g., 25"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose *</label>
          <select
            value={form.purpose}
            onChange={(e) => update("purpose", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {PURPOSES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Submit Booking Request"}
      </button>
    </form>
  );
}
