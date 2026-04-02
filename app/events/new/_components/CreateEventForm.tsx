"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EVENT_TYPES = [
  { value: "MEETUP", label: "Meetup" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SKILL_SHARE", label: "Skill Share" },
  { value: "SOCIAL", label: "Social" },
  { value: "COWORKING_SESSION", label: "Coworking Session" },
];

export function CreateEventForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("20");
  const [eventType, setEventType] = useState("MEETUP");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/events/community", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": userId },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          venue: venue.trim(),
          date,
          capacity: parseInt(capacity, 10),
          eventType,
          tags: tags.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create event");
        setSubmitting(false);
        return;
      }

      router.push("/events?tab=community");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Event Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} required
          placeholder="Community Tech Meetup" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
      </div>

      <div>
        <label htmlFor="eventType" className="mb-1 block text-sm font-medium text-gray-700">Event Type</label>
        <select id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
          {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
          placeholder="What's the event about?" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="venue" className="mb-1 block text-sm font-medium text-gray-700">Venue</label>
          <input id="venue" type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required
            placeholder="Cafe XYZ, Bangkok" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">Date & Time</label>
          <input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="capacity" className="mb-1 block text-sm font-medium text-gray-700">Capacity</label>
          <input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} min={2} max={500} required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
        <div>
          <label htmlFor="tags" className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)}
            placeholder="tech, networking" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
        <strong>Trust Gate:</strong> You need a trust score of at least 10 to create community events. Earn trust by participating in the community.
      </div>

      <button type="submit" disabled={submitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {submitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
